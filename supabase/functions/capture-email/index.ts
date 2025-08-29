import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Edge function called with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Request body received:', body);
    
    const { email, name, source, utm_source, utm_medium, utm_campaign } = body;
    
    console.log('Extracted data:', { email, name, source, utm_source, utm_medium, utm_campaign });

    // Validar dados obrigatórios
    if (!email || !name) {
      console.error('Missing required fields:', { email, name });
      return new Response(
        JSON.stringify({ error: 'Email e nome são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verificar variáveis de ambiente
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('Environment variables check:', { 
      hasUrl: !!supabaseUrl, 
      hasKey: !!serviceRoleKey,
      urlLength: supabaseUrl?.length || 0,
      keyLength: serviceRoleKey?.length || 0
    });

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Configuração do servidor incompleta',
          details: 'Variáveis de ambiente não configuradas'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Criar cliente Supabase com service role key para bypass RLS
    console.log('Creating Supabase client...');
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Testar conexão básica
    console.log('Testing basic connection...');
    const { data: testData, error: testError } = await supabase
      .from('user_accounts')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Basic connection test failed:', testError);
      return new Response(
        JSON.stringify({ 
          error: 'Erro na conexão com banco de dados',
          details: testError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Basic connection test successful');

    // Verificar se usuário já existe
    console.log('Checking if user exists...');
    const { data: existingUser, error: selectError } = await supabase
      .from('user_accounts')
      .select('id, email')
      .eq('email', email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing user:', selectError);
      return new Response(
        JSON.stringify({ 
          error: 'Erro ao verificar usuário existente',
          details: selectError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    let userId = null;

    if (existingUser) {
      console.log('Updating existing user:', existingUser.id);
      // Atualizar usuário existente com informações do UTM se não existirem
      const { data: updatedUser, error: updateError } = await supabase
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
      
      if (updateError) {
        console.error('Error updating user:', updateError);
        return new Response(
          JSON.stringify({ 
            error: 'Erro ao atualizar usuário',
            details: updateError.message 
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      userId = updatedUser?.id;
      console.log('Updated existing user:', userId);
    } else {
      console.log('Creating new user...');
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
          JSON.stringify({ 
            error: 'Erro ao criar usuário', 
            details: insertError.message 
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      userId = newUser?.id;
      console.log('Created new user:', userId);
    }

    // Tentar registrar evento de analytics (opcional)
    try {
      console.log('Registering analytics event...');
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
      console.log('Analytics event registered successfully');
    } catch (analyticsError) {
      console.warn('Analytics event registration failed (non-critical):', analyticsError);
      // Não falhar se analytics falhar
    }

    console.log('Email capture successful, returning success response');
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
      JSON.stringify({ 
        error: 'Erro interno do servidor', 
        details: error.message || 'Erro desconhecido',
        stack: error.stack 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});