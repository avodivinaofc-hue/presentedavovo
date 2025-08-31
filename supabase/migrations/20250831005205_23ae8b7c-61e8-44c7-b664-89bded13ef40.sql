-- Corrigir os problemas de search_path das funções restantes

-- Atualizar função increment_reading_counters
CREATE OR REPLACE FUNCTION public.increment_reading_counters(user_uuid uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.profiles 
  SET 
    daily_readings_used = daily_readings_used + 1,
    total_readings = total_readings + 1,
    updated_at = timezone('utc'::text, now())
  WHERE id = user_uuid;
END;
$function$;

-- Atualizar função reset_daily_readings
CREATE OR REPLACE FUNCTION public.reset_daily_readings()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.profiles 
  SET daily_readings_used = 0
  WHERE daily_readings_used > 0;
END;
$function$;