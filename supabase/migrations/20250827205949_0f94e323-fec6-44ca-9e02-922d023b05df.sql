-- Corrigir funções restantes e verificar RLS na tabela profiles
-- Primeiro, habilitar RLS na tabela profiles que está sem proteção
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para a tabela profiles
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid()::text = id::text);

-- Corrigir funções restantes com search_path
CREATE OR REPLACE FUNCTION public.get_all_users_for_admin()
 RETURNS TABLE(id uuid, email text, full_name text, created_at timestamp with time zone, is_premium boolean, total_readings integer, disrupty_customer_id text, premium_activated_at timestamp with time zone, last_login timestamp with time zone, email_verified boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    ua.id,
    ua.email,
    ua.full_name,
    ua.created_at,
    ua.is_premium,
    ua.total_readings,
    ua.disrupty_customer_id,
    ua.premium_activated_at,
    ua.last_login,
    ua.email_verified
  FROM user_accounts ua
  ORDER BY ua.created_at DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_advanced_analytics()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_analytics JSONB;
BEGIN
  SELECT jsonb_build_object(
    'users', jsonb_build_object(
      'total', COUNT(*),
      'premium', COUNT(*) FILTER (WHERE is_premium = true),
      'active', COUNT(*) FILTER (WHERE status = 'active'),
      'inactive', COUNT(*) FILTER (WHERE status = 'inactive'),
      'suspended', COUNT(*) FILTER (WHERE status = 'suspended'),
      'new_this_month', COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW()))
    ),
    'revenue', jsonb_build_object(
      'monthly', COUNT(*) FILTER (WHERE is_premium = true) * 19.90,
      'total_spent', COALESCE(SUM(total_spent), 0),
      'average_per_user', CASE WHEN COUNT(*) > 0 THEN COALESCE(SUM(total_spent), 0) / COUNT(*) ELSE 0 END
    ),
    'readings', jsonb_build_object(
      'total', (SELECT COUNT(*) FROM readings),
      'this_month', (SELECT COUNT(*) FROM readings WHERE created_at >= date_trunc('month', NOW())),
      'average_satisfaction', (SELECT AVG(user_satisfaction) FROM readings WHERE user_satisfaction IS NOT NULL),
      'favorites', (SELECT COUNT(*) FROM readings WHERE is_favorite = true)
    ),
    'engagement', jsonb_build_object(
      'active_users', COUNT(*) FILTER (WHERE last_activity >= NOW() - INTERVAL '7 days'),
      'average_energy', AVG(cosmic_energy),
      'total_tags', (SELECT COUNT(DISTINCT unnest(tags)) FROM user_accounts WHERE tags IS NOT NULL)
    )
  ) INTO v_analytics
  FROM user_accounts;
  
  RETURN v_analytics;
END;
$function$;

CREATE OR REPLACE FUNCTION public.record_analytics_event(p_event_type text, p_event_data jsonb, p_user_id uuid DEFAULT NULL::uuid, p_session_id text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  INSERT INTO analytics_events (event_type, event_data, user_id, session_id)
  VALUES (p_event_type, p_event_data, p_user_id, p_session_id);
  
  RETURN jsonb_build_object('success', true, 'message', 'Evento registrado com sucesso');
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_dashboard_statistics()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_stats JSONB;
BEGIN
  SELECT jsonb_build_object(
    'totalUsers', COUNT(*),
    'premiumUsers', COUNT(*) FILTER (WHERE is_premium = true),
    'monthlyRevenue', COUNT(*) FILTER (WHERE is_premium = true) * 19.90,
    'totalPurchases', (
      SELECT COUNT(*) FROM kiwify_purchases WHERE status = 'active'
    ) + (
      SELECT COUNT(*) FROM disrupty_purchases WHERE status = 'active'
    ),
    'averageEnergy', AVG(cosmic_energy),
    'totalReadings', (SELECT COUNT(*) FROM readings)
  ) INTO v_stats
  FROM user_accounts;
  
  RETURN v_stats;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_cosmic_energy(user_id uuid, new_energy integer, energy_consumed integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_current_energy INTEGER;
  v_max_energy INTEGER;
BEGIN
  SELECT cosmic_energy, max_cosmic_energy INTO v_current_energy, v_max_energy
  FROM user_accounts WHERE id = user_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User not found'
    );
  END IF;
  
  IF new_energy < 0 OR new_energy > v_max_energy THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid energy value'
    );
  END IF;
  
  UPDATE user_accounts 
  SET cosmic_energy = new_energy, last_energy_regen = NOW(), updated_at = NOW()
  WHERE id = user_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'old_energy', v_current_energy,
    'new_energy', new_energy,
    'energy_consumed', energy_consumed,
    'message', 'Energy updated successfully'
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'error', SQLERRM,
    'message', 'Failed to update energy'
  );
END;
$function$;