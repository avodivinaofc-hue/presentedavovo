-- Priority 1: Secure Business Intelligence Tables
-- Add restrictive RLS policies for user_tags table
DROP POLICY IF EXISTS "Admin can manage tags" ON user_tags;
CREATE POLICY "Only specific admins can manage tags" 
ON user_tags 
FOR ALL 
USING (auth.uid() IN ( 
  SELECT user_accounts.auth_user_id
  FROM user_accounts
  WHERE user_accounts.email = ANY (ARRAY['admin@avodivina.com'::text, 'lusiane@avodivina.com'::text])
  AND user_accounts.is_admin = true
  AND user_accounts.status = 'active'
));

-- Add restrictive RLS policies for user_segments table
DROP POLICY IF EXISTS "Admin can manage segments" ON user_segments;
CREATE POLICY "Only specific admins can manage segments" 
ON user_segments 
FOR ALL 
USING (auth.uid() IN ( 
  SELECT user_accounts.auth_user_id
  FROM user_accounts
  WHERE user_accounts.email = ANY (ARRAY['admin@avodivina.com'::text, 'lusiane@avodivina.com'::text])
  AND user_accounts.is_admin = true
  AND user_accounts.status = 'active'
));

-- Add UTM tracking columns to user_accounts table
ALTER TABLE user_accounts 
ADD COLUMN IF NOT EXISTS utm_source text,
ADD COLUMN IF NOT EXISTS utm_medium text,
ADD COLUMN IF NOT EXISTS utm_campaign text,
ADD COLUMN IF NOT EXISTS utm_term text,
ADD COLUMN IF NOT EXISTS utm_content text;

-- Priority 2: Secure Database Functions with proper search paths
-- Update add_admin_note function
CREATE OR REPLACE FUNCTION public.add_admin_note(p_user_id uuid, p_note text, p_admin_id uuid, p_admin_name text, p_is_private boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_current_notes JSONB;
  v_new_note JSONB;
BEGIN
  -- Validate inputs
  IF p_note IS NULL OR trim(p_note) = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Note cannot be empty');
  END IF;
  
  IF p_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User ID is required');
  END IF;
  
  SELECT admin_notes INTO v_current_notes FROM user_accounts WHERE id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;
  
  v_new_note := jsonb_build_object(
    'id', gen_random_uuid()::TEXT,
    'note', trim(p_note),
    'admin_id', p_admin_id,
    'admin_name', p_admin_name,
    'is_private', p_is_private,
    'created_at', NOW()::TEXT
  );
  
  UPDATE user_accounts 
  SET admin_notes = COALESCE(v_current_notes, '[]'::JSONB) || v_new_note
  WHERE id = p_user_id;
  
  -- Register action
  INSERT INTO user_actions (user_id, action_type, action_description, admin_id, admin_name, metadata)
  VALUES (p_user_id, 'admin_note_added', 'Administrative note added', p_admin_id, p_admin_name, jsonb_build_object('note', trim(p_note), 'is_private', p_is_private));
  
  RETURN jsonb_build_object('success', true, 'message', 'Note added successfully');
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;

-- Update add_user_tag function
CREATE OR REPLACE FUNCTION public.add_user_tag(p_user_id uuid, p_tag_name text, p_admin_id uuid DEFAULT NULL::uuid, p_admin_name text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_tag_id UUID;
  v_user_tags TEXT[];
BEGIN
  -- Validate inputs
  IF p_tag_name IS NULL OR trim(p_tag_name) = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Tag name cannot be empty');
  END IF;
  
  IF p_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User ID is required');
  END IF;
  
  -- Sanitize tag name
  p_tag_name := trim(lower(p_tag_name));
  
  -- Check if tag exists, if not, create it
  SELECT id INTO v_tag_id FROM user_tags WHERE name = p_tag_name;
  
  IF v_tag_id IS NULL THEN
    INSERT INTO user_tags (name, color, description) 
    VALUES (p_tag_name, '#8B5CF6', 'Tag created automatically')
    RETURNING id INTO v_tag_id;
  END IF;
  
  -- Add tag to user if it doesn't exist
  SELECT tags INTO v_user_tags FROM user_accounts WHERE id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;
  
  IF NOT (p_tag_name = ANY(v_user_tags)) THEN
    UPDATE user_accounts 
    SET tags = array_append(tags, p_tag_name)
    WHERE id = p_user_id;
    
    -- Update tag counter
    UPDATE user_tags SET user_count = user_count + 1 WHERE id = v_tag_id;
    
    -- Register action
    INSERT INTO user_actions (user_id, action_type, action_description, admin_id, admin_name, metadata)
    VALUES (p_user_id, 'tag_added', 'Tag "' || p_tag_name || '" added', p_admin_id, p_admin_name, jsonb_build_object('tag', p_tag_name));
    
    RETURN jsonb_build_object('success', true, 'message', 'Tag added successfully');
  ELSE
    RETURN jsonb_build_object('success', false, 'message', 'User already has this tag');
  END IF;
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;

-- Update remove_user_tag function
CREATE OR REPLACE FUNCTION public.remove_user_tag(p_user_id uuid, p_tag_name text, p_admin_id uuid DEFAULT NULL::uuid, p_admin_name text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Validate inputs
  IF p_tag_name IS NULL OR trim(p_tag_name) = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Tag name cannot be empty');
  END IF;
  
  IF p_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User ID is required');
  END IF;
  
  -- Sanitize tag name
  p_tag_name := trim(lower(p_tag_name));
  
  -- Remove tag from user
  UPDATE user_accounts 
  SET tags = array_remove(tags, p_tag_name)
  WHERE id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;
  
  -- Update tag counter
  UPDATE user_tags SET user_count = GREATEST(user_count - 1, 0) WHERE name = p_tag_name;
  
  -- Register action
  INSERT INTO user_actions (user_id, action_type, action_description, admin_id, admin_name, metadata)
  VALUES (p_user_id, 'tag_removed', 'Tag "' || p_tag_name || '" removed', p_admin_id, p_admin_name, jsonb_build_object('tag', p_tag_name));
  
  RETURN jsonb_build_object('success', true, 'message', 'Tag removed successfully');
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;

-- Update update_user_status function
CREATE OR REPLACE FUNCTION public.update_user_status(p_user_id uuid, p_status text, p_admin_id uuid DEFAULT NULL::uuid, p_admin_name text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_old_status TEXT;
  v_valid_statuses TEXT[] := ARRAY['active', 'inactive', 'suspended', 'banned'];
BEGIN
  -- Validate inputs
  IF p_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User ID is required');
  END IF;
  
  IF p_status IS NULL OR trim(p_status) = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Status cannot be empty');
  END IF;
  
  -- Sanitize and validate status
  p_status := trim(lower(p_status));
  
  IF NOT (p_status = ANY(v_valid_statuses)) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid status. Valid statuses are: ' || array_to_string(v_valid_statuses, ', '));
  END IF;
  
  SELECT status INTO v_old_status FROM user_accounts WHERE id = p_user_id;
  
  IF v_old_status IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;
  
  UPDATE user_accounts 
  SET status = p_status, updated_at = NOW()
  WHERE id = p_user_id;
  
  -- Register action
  INSERT INTO user_actions (user_id, action_type, action_description, admin_id, admin_name, metadata)
  VALUES (p_user_id, 'status_updated', 'Status changed from ' || v_old_status || ' to ' || p_status, p_admin_id, p_admin_name, jsonb_build_object('old_status', v_old_status, 'new_status', p_status));
  
  RETURN jsonb_build_object('success', true, 'message', 'Status updated successfully');
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$function$;