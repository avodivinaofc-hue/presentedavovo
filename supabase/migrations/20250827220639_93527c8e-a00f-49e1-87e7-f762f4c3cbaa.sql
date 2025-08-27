-- Corrigir as últimas funções restantes com search_path
CREATE OR REPLACE FUNCTION public.update_user_activity(user_email text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  UPDATE user_accounts 
  SET last_activity = NOW(), login_count = login_count + 1
  WHERE email = user_email;
END;
$function$;

CREATE OR REPLACE FUNCTION public.process_disrupty_purchase(p_customer_id text, p_customer_email text, p_customer_name text, p_amount numeric DEFAULT 19.90, p_webhook_data jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_user_id uuid;
  v_temp_password text;
  v_result jsonb;
BEGIN
  -- Insert or get user
  INSERT INTO user_accounts (
    email, 
    full_name, 
    is_premium, 
    premium_activated_at, 
    disrupty_customer_id
  ) VALUES (
    p_customer_email, 
    p_customer_name, 
    true, 
    now(), 
    p_customer_id
  )
  ON CONFLICT (email) 
  DO UPDATE SET 
    is_premium = true,
    premium_activated_at = now(),
    disrupty_customer_id = p_customer_id
  RETURNING id INTO v_user_id;

  -- Insert purchase record
  INSERT INTO disrupty_purchases (
    customer_id,
    customer_email,
    customer_name,
    amount,
    user_account_id,
    webhook_data
  ) VALUES (
    p_customer_id,
    p_customer_email,
    p_customer_name,
    p_amount,
    v_user_id,
    p_webhook_data
  );

  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_user_id,
    'message', 'Purchase processed successfully'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.admin_toggle_user_access(user_id uuid, block_access boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  UPDATE user_accounts 
  SET is_premium = NOT block_access, updated_at = NOW()
  WHERE id = user_id;
  
  IF FOUND THEN
    RETURN jsonb_build_object(
      'success', true,
      'message', CASE WHEN block_access THEN 'User blocked' ELSE 'User unblocked' END
    );
  ELSE
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User not found'
    );
  END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_all_users_admin()
 RETURNS TABLE(id uuid, email text, full_name text, created_at timestamp with time zone, updated_at timestamp with time zone, is_premium boolean, total_readings integer, disrupty_customer_id text, last_login timestamp with time zone, email_verified boolean, birth_date date, source text, cosmic_energy integer, max_cosmic_energy integer, last_energy_regen timestamp with time zone, energy_regen_rate integer)
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
    ua.updated_at,
    ua.is_premium,
    ua.total_readings,
    ua.disrupty_customer_id,
    ua.last_login,
    ua.email_verified,
    ua.birth_date,
    ua.source,
    ua.cosmic_energy,
    ua.max_cosmic_energy,
    ua.last_energy_regen,
    ua.energy_regen_rate
  FROM user_accounts ua
  ORDER BY ua.created_at DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.process_kiwify_purchase(p_customer_id text, p_customer_email text, p_customer_name text, p_amount numeric, p_webhook_data jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_user_id UUID;
  v_purchase_id UUID;
BEGIN
  SELECT id INTO v_user_id FROM user_accounts WHERE email = p_customer_email;
  
  IF v_user_id IS NULL THEN
    INSERT INTO user_accounts (
      email, full_name, is_premium, premium_activated_at, source,
      cosmic_energy, max_cosmic_energy, last_energy_regen, energy_regen_rate
    ) VALUES (
      p_customer_email, p_customer_name, true, NOW(), 'kiwify',
      100, 100, NOW(), 10
    ) RETURNING id INTO v_user_id;
  ELSE
    UPDATE user_accounts 
    SET is_premium = true, premium_activated_at = NOW(), updated_at = NOW(),
        cosmic_energy = 100, last_energy_regen = NOW()
    WHERE id = v_user_id;
  END IF;
  
  INSERT INTO kiwify_purchases (
    customer_id, customer_email, customer_name, amount, status,
    purchase_date, next_billing_date, processed
  ) VALUES (
    p_customer_id, p_customer_email, p_customer_name, p_amount, 'active',
    NOW(), NOW() + INTERVAL '1 month', true
  ) RETURNING id INTO v_purchase_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_user_id,
    'purchase_id', v_purchase_id,
    'message', 'Premium activated successfully'
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'error', SQLERRM,
    'message', 'Failed to process purchase'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.admin_create_user(user_email text, user_name text, user_password text, is_premium boolean DEFAULT true)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_user_id UUID;
  v_auth_user_id UUID;
BEGIN
  INSERT INTO auth.users (
    email, encrypted_password, email_confirmed_at, created_at, updated_at
  ) VALUES (
    user_email, crypt(user_password, gen_salt('bf')), NOW(), NOW(), NOW()
  ) RETURNING id INTO v_auth_user_id;
  
  INSERT INTO user_accounts (
    auth_user_id, email, full_name, is_premium, premium_activated_at,
    cosmic_energy, max_cosmic_energy, last_energy_regen, energy_regen_rate
  ) VALUES (
    v_auth_user_id, user_email, user_name, is_premium,
    CASE WHEN is_premium THEN NOW() ELSE NULL END,
    100, 100, NOW(), 10
  ) RETURNING id INTO v_user_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_user_id,
    'auth_user_id', v_auth_user_id,
    'message', 'User created successfully'
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'error', SQLERRM,
    'message', 'Failed to create user'
  );
END;
$function$;