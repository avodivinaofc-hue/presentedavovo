import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, source, utm_source, utm_medium, utm_campaign } = await req.json();
    
    console.log('Capturing email:', { email, name, source });

    // Validar dados obrigatórios
    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: 'Email e nome são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Criar cliente Supabase com service role key para bypass RLS
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verificar se usuário já existe
    const { data: existingUser } = await supabase
      .from('user_accounts')
      .select('id, email')
      .eq('email', email)
      .single();

    let userId = null;

    if (existingUser) {
      // Atualizar usuário existente com informações do UTM se não existirem
      const { data: updatedUser } = await supabase
        .from('user_accounts')
        .update({
          full_name: name,
          source: source || 'landing_page',
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
        .select('id')
        .single();
      
      userId = updatedUser?.id;
      console.log('Updated existing user:', userId);
    } else {
      // Criar novo usuário
      const { data: newUser, error: insertError } = await supabase
        .from('user_accounts')
        .insert({
          email,
          full_name: name,
          source: source || 'landing_page',
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          is_premium: false,
          cosmic_energy: 100,
          max_cosmic_energy: 100,
          last_energy_regen: new Date().toISOString(),
          energy_regen_rate: 10
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('Error creating user:', insertError);
        return new Response(
          JSON.stringify({ error: 'Erro ao criar usuário', details: insertError }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      userId = newUser?.id;
      console.log('Created new user:', userId);
    }

    // Registrar evento de captura de email para analytics
    await supabase.from('analytics_events').insert({
      event_type: 'email_captured',
      event_data: {
        source: source || 'landing_page',
        utm_source,
        utm_medium,
        utm_campaign,
        email,
        name
      },
      user_id: userId
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email capturado com sucesso',
        user_id: userId 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in capture-email function:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});