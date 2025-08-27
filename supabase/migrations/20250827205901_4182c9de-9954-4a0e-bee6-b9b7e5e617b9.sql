-- Corrigir funções com search_path mutable para melhorar segurança
-- Estas correções evitam ataques de injection via search_path

-- 1. Corrigir função add_user_tag
CREATE OR REPLACE FUNCTION public.add_user_tag(p_user_id uuid, p_tag_name text, p_admin_id uuid DEFAULT NULL::uuid, p_admin_name text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_tag_id UUID;
  v_user_tags TEXT[];
BEGIN
  -- Verificar se a tag existe, se não, criar
  SELECT id INTO v_tag_id FROM user_tags WHERE name = p_tag_name;
  
  IF v_tag_id IS NULL THEN
    INSERT INTO user_tags (name, color, description) 
    VALUES (p_tag_name, '#8B5CF6', 'Tag criada automaticamente')
    RETURNING id INTO v_tag_id;
  END IF;
  
  -- Adicionar tag ao usuário se não existir
  SELECT tags INTO v_user_tags FROM user_accounts WHERE id = p_user_id;
  
  IF NOT (p_tag_name = ANY(v_user_tags)) THEN
    UPDATE user_accounts 
    SET tags = array_append(tags, p_tag_name)
    WHERE id = p_user_id;
    
    -- Atualizar contador da tag
    UPDATE user_tags SET user_count = user_count + 1 WHERE id = v_tag_id;
    
    -- Registrar ação
    INSERT INTO user_actions (user_id, action_type, action_description, admin_id, admin_name, metadata)
    VALUES (p_user_id, 'tag_added', 'Tag "' || p_tag_name || '" adicionada', p_admin_id, p_admin_name, jsonb_build_object('tag', p_tag_name));
    
    RETURN jsonb_build_object('success', true, 'message', 'Tag adicionada com sucesso');
  ELSE
    RETURN jsonb_build_object('success', false, 'message', 'Usuário já possui esta tag');
  END IF;
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;

-- 2. Corrigir função remove_user_tag
CREATE OR REPLACE FUNCTION public.remove_user_tag(p_user_id uuid, p_tag_name text, p_admin_id uuid DEFAULT NULL::uuid, p_admin_name text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  -- Remover tag do usuário
  UPDATE user_accounts 
  SET tags = array_remove(tags, p_tag_name)
  WHERE id = p_user_id;
  
  -- Atualizar contador da tag
  UPDATE user_tags SET user_count = user_count - 1 WHERE name = p_tag_name;
  
  -- Registrar ação
  INSERT INTO user_actions (user_id, action_type, action_description, admin_id, admin_name, metadata)
  VALUES (p_user_id, 'tag_removed', 'Tag "' || p_tag_name || '" removida', p_admin_id, p_admin_name, jsonb_build_object('tag', p_tag_name));
  
  RETURN jsonb_build_object('success', true, 'message', 'Tag removida com sucesso');
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;

-- 3. Corrigir função add_admin_note
CREATE OR REPLACE FUNCTION public.add_admin_note(p_user_id uuid, p_note text, p_admin_id uuid, p_admin_name text, p_is_private boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_current_notes JSONB;
  v_new_note JSONB;
BEGIN
  SELECT admin_notes INTO v_current_notes FROM user_accounts WHERE id = p_user_id;
  
  v_new_note := jsonb_build_object(
    'id', gen_random_uuid()::TEXT,
    'note', p_note,
    'admin_id', p_admin_id,
    'admin_name', p_admin_name,
    'is_private', p_is_private,
    'created_at', NOW()::TEXT
  );
  
  UPDATE user_accounts 
  SET admin_notes = COALESCE(v_current_notes, '[]'::JSONB) || v_new_note
  WHERE id = p_user_id;
  
  -- Registrar ação
  INSERT INTO user_actions (user_id, action_type, action_description, admin_id, admin_name, metadata)
  VALUES (p_user_id, 'admin_note_added', 'Nota administrativa adicionada', p_admin_id, p_admin_name, jsonb_build_object('note', p_note, 'is_private', p_is_private));
  
  RETURN jsonb_build_object('success', true, 'message', 'Nota adicionada com sucesso');
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;

-- 4. Corrigir função update_user_status
CREATE OR REPLACE FUNCTION public.update_user_status(p_user_id uuid, p_status text, p_admin_id uuid DEFAULT NULL::uuid, p_admin_name text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  v_old_status TEXT;
BEGIN
  SELECT status INTO v_old_status FROM user_accounts WHERE id = p_user_id;
  
  IF v_old_status IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Usuário não encontrado');
  END IF;
  
  UPDATE user_accounts 
  SET status = p_status, updated_at = NOW()
  WHERE id = p_user_id;
  
  -- Registrar ação
  INSERT INTO user_actions (user_id, action_type, action_description, admin_id, admin_name, metadata)
  VALUES (p_user_id, 'status_updated', 'Status alterado de ' || v_old_status || ' para ' || p_status, p_admin_id, p_admin_name, jsonb_build_object('old_status', v_old_status, 'new_status', p_status));
  
  RETURN jsonb_build_object('success', true, 'message', 'Status atualizado com sucesso');
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;

-- 5. Corrigir função generate_random_password
CREATE OR REPLACE FUNCTION public.generate_random_password()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..12 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$function$;