-- Fix remaining function search path issues
CREATE OR REPLACE FUNCTION public.get_advanced_analytics()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
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
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO analytics_events (event_type, event_data, user_id, session_id)
  VALUES (p_event_type, p_event_data, p_user_id, p_session_id);
  
  RETURN jsonb_build_object('success', true, 'message', 'Event recorded successfully');
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_cosmic_energy(user_id uuid, new_energy integer, energy_consumed integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
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