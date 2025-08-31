-- REMOÇÃO COMPLETA DO KIWIFY - MANTER APENAS DISRUPTY

-- 1. Remover a tabela kiwify_purchases completamente
DROP TABLE IF EXISTS public.kiwify_purchases CASCADE;

-- 2. Remover a função process_kiwify_purchase
DROP FUNCTION IF EXISTS public.process_kiwify_purchase(text, text, text, numeric, jsonb);

-- 3. Remover as colunas kiwify da tabela user_accounts
ALTER TABLE public.user_accounts 
DROP COLUMN IF EXISTS kiwify_customer_id,
DROP COLUMN IF EXISTS kiwify_sale_id;

-- 4. Atualizar a função get_dashboard_statistics para remover referências ao kiwify
CREATE OR REPLACE FUNCTION public.get_dashboard_statistics()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  stats JSONB;
BEGIN
  -- Verificar se o usuário é administrador
  IF NOT is_admin_user(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem executar esta função';
  END IF;
  
  -- Log da ação administrativa
  PERFORM admin_action_log('dashboard_stats', NULL, '{}');
  
  SELECT jsonb_build_object(
    'totalUsers', COUNT(*),
    'premiumUsers', COUNT(*) FILTER (WHERE is_premium = true),
    'adminUsers', COUNT(*) FILTER (WHERE is_admin = true),
    'monthlyRevenue', COUNT(*) FILTER (WHERE is_premium = true) * 19.90,
    'conversionRate', CASE 
      WHEN COUNT(*) > 0 THEN ROUND((COUNT(*) FILTER (WHERE is_premium = true)::DECIMAL / COUNT(*)::DECIMAL) * 100, 2)
      ELSE 0 
    END,
    -- Agora conta apenas compras do Disrupty
    'totalPurchases', (
      SELECT COUNT(*) FROM disrupty_purchases WHERE payment_status = 'paid'
    )
  ) INTO stats
  FROM user_accounts;
  
  RETURN stats;
END;
$function$;

-- 5. Atualizar função get_all_users_admin para remover colunas kiwify  
CREATE OR REPLACE FUNCTION public.get_all_users_admin()
 RETURNS TABLE(
   id uuid, 
   email text, 
   full_name text, 
   created_at timestamp with time zone, 
   updated_at timestamp with time zone, 
   is_premium boolean, 
   is_admin boolean, 
   total_readings integer, 
   disrupty_customer_id text, 
   last_login timestamp with time zone, 
   email_verified boolean, 
   birth_date date, 
   source text, 
   cosmic_energy integer, 
   max_cosmic_energy integer, 
   last_energy_regen timestamp with time zone, 
   energy_regen_rate integer
 )
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Verificar se o usuário é administrador
  IF NOT is_admin_user(auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem executar esta função';
  END IF;
  
  -- Log da ação administrativa
  PERFORM admin_action_log('list_users', NULL, '{"users_count": (SELECT COUNT(*) FROM user_accounts)}');
  
  RETURN QUERY
  SELECT 
    ua.id,
    ua.email,
    ua.full_name,
    ua.created_at,
    ua.updated_at,
    ua.is_premium,
    ua.is_admin,
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

-- 6. Atualizar source padrão para 'disrupty' em vez de 'supabase'
ALTER TABLE public.user_accounts 
ALTER COLUMN source SET DEFAULT 'disrupty';

-- 7. Corrigir status das compras disrupty para usar 'paid' em vez de 'active'
UPDATE public.disrupty_purchases 
SET payment_status = 'paid' 
WHERE payment_status = 'active';

-- 8. Adicionar índices para melhorar performance nas consultas do Disrupty
CREATE INDEX IF NOT EXISTS idx_disrupty_purchases_customer_email 
ON public.disrupty_purchases(customer_email);

CREATE INDEX IF NOT EXISTS idx_disrupty_purchases_payment_status 
ON public.disrupty_purchases(payment_status);

CREATE INDEX IF NOT EXISTS idx_user_accounts_disrupty_customer_id 
ON public.user_accounts(disrupty_customer_id) 
WHERE disrupty_customer_id IS NOT NULL;