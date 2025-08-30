export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          event_data: Json
          event_type: string
          id: string
          metadata: Json | null
          session_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          event_data: Json
          event_type: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          event_data?: Json
          event_type?: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      disrupty_purchases: {
        Row: {
          amount: number
          created_at: string | null
          customer_email: string
          customer_id: string
          customer_name: string | null
          id: string
          next_billing_date: string | null
          processed: boolean | null
          product_name: string | null
          purchase_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          customer_email: string
          customer_id: string
          customer_name?: string | null
          id?: string
          next_billing_date?: string | null
          processed?: boolean | null
          product_name?: string | null
          purchase_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer_email?: string
          customer_id?: string
          customer_name?: string | null
          id?: string
          next_billing_date?: string | null
          processed?: boolean | null
          product_name?: string | null
          purchase_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      kiwify_purchases: {
        Row: {
          amount: number
          created_at: string | null
          customer_email: string
          customer_id: string
          customer_name: string | null
          id: string
          next_billing_date: string | null
          processed: boolean | null
          product_name: string | null
          purchase_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          customer_email: string
          customer_id: string
          customer_name?: string | null
          id?: string
          next_billing_date?: string | null
          processed?: boolean | null
          product_name?: string | null
          purchase_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer_email?: string
          customer_id?: string
          customer_name?: string | null
          id?: string
          next_billing_date?: string | null
          processed?: boolean | null
          product_name?: string | null
          purchase_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      magical_portal_submissions: {
        Row: {
          birth_date: string
          created_at: string | null
          email: string
          full_name: string
          id: string
          payment_method: string | null
          payment_status: string | null
          state: string
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          birth_date: string
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          state: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          birth_date?: string
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          state?: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      marketing_campaigns: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          metrics: Json | null
          name: string
          start_date: string | null
          status: string | null
          target_segment: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name: string
          start_date?: string | null
          status?: string | null
          target_segment?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name?: string
          start_date?: string | null
          status?: string | null
          target_segment?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          birth_date: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_premium: boolean | null
          premium_activated_at: string | null
          premium_expires_at: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          birth_date?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_premium?: boolean | null
          premium_activated_at?: string | null
          premium_expires_at?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          birth_date?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_premium?: boolean | null
          premium_activated_at?: string | null
          premium_expires_at?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      readings: {
        Row: {
          admin_notes: Json | null
          area: string
          cards: Json
          created_at: string | null
          energy_cost: number | null
          id: string
          interpretation: string
          is_favorite: boolean | null
          question: string | null
          reading_duration: number | null
          reading_quality_score: number | null
          reading_type: string | null
          spread_name: string
          spread_type: string
          user_feedback: string | null
          user_id: string | null
          user_satisfaction: number | null
        }
        Insert: {
          admin_notes?: Json | null
          area: string
          cards: Json
          created_at?: string | null
          energy_cost?: number | null
          id?: string
          interpretation: string
          is_favorite?: boolean | null
          question?: string | null
          reading_duration?: number | null
          reading_quality_score?: number | null
          reading_type?: string | null
          spread_name: string
          spread_type: string
          user_feedback?: string | null
          user_id?: string | null
          user_satisfaction?: number | null
        }
        Update: {
          admin_notes?: Json | null
          area?: string
          cards?: Json
          created_at?: string | null
          energy_cost?: number | null
          id?: string
          interpretation?: string
          is_favorite?: boolean | null
          question?: string | null
          reading_duration?: number | null
          reading_quality_score?: number | null
          reading_type?: string | null
          spread_name?: string
          spread_type?: string
          user_feedback?: string | null
          user_id?: string | null
          user_satisfaction?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "readings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_accounts: {
        Row: {
          admin_notes: Json | null
          auth_user_id: string | null
          birth_date: string | null
          cosmic_energy: number | null
          created_at: string | null
          disrupty_customer_id: string | null
          email: string
          email_verified: boolean | null
          energy_regen_rate: number | null
          favorite_spread: string | null
          full_name: string
          id: string
          is_admin: boolean | null
          is_premium: boolean | null
          kiwify_customer_id: string | null
          kiwify_sale_id: string | null
          last_activity: string | null
          last_energy_regen: string | null
          last_payment_date: string | null
          last_reading_date: string | null
          login_count: number | null
          max_cosmic_energy: number | null
          payment_method: string | null
          premium_activated_at: string | null
          premium_expires_at: string | null
          segment: string | null
          source: string | null
          status: string | null
          subscription_plan: string | null
          tags: string[] | null
          total_readings: number | null
          total_spent: number | null
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          admin_notes?: Json | null
          auth_user_id?: string | null
          birth_date?: string | null
          cosmic_energy?: number | null
          created_at?: string | null
          disrupty_customer_id?: string | null
          email: string
          email_verified?: boolean | null
          energy_regen_rate?: number | null
          favorite_spread?: string | null
          full_name: string
          id?: string
          is_admin?: boolean | null
          is_premium?: boolean | null
          kiwify_customer_id?: string | null
          kiwify_sale_id?: string | null
          last_activity?: string | null
          last_energy_regen?: string | null
          last_payment_date?: string | null
          last_reading_date?: string | null
          login_count?: number | null
          max_cosmic_energy?: number | null
          payment_method?: string | null
          premium_activated_at?: string | null
          premium_expires_at?: string | null
          segment?: string | null
          source?: string | null
          status?: string | null
          subscription_plan?: string | null
          tags?: string[] | null
          total_readings?: number | null
          total_spent?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          admin_notes?: Json | null
          auth_user_id?: string | null
          birth_date?: string | null
          cosmic_energy?: number | null
          created_at?: string | null
          disrupty_customer_id?: string | null
          email?: string
          email_verified?: boolean | null
          energy_regen_rate?: number | null
          favorite_spread?: string | null
          full_name?: string
          id?: string
          is_admin?: boolean | null
          is_premium?: boolean | null
          kiwify_customer_id?: string | null
          kiwify_sale_id?: string | null
          last_activity?: string | null
          last_energy_regen?: string | null
          last_payment_date?: string | null
          last_reading_date?: string | null
          login_count?: number | null
          max_cosmic_energy?: number | null
          payment_method?: string | null
          premium_activated_at?: string | null
          premium_expires_at?: string | null
          segment?: string | null
          source?: string | null
          status?: string | null
          subscription_plan?: string | null
          tags?: string[] | null
          total_readings?: number | null
          total_spent?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      user_actions: {
        Row: {
          action_description: string | null
          action_type: string
          admin_id: string | null
          admin_name: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          action_description?: string | null
          action_type: string
          admin_id?: string | null
          admin_name?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          action_description?: string | null
          action_type?: string
          admin_id?: string | null
          admin_name?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_actions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_actions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_segments: {
        Row: {
          created_at: string | null
          criteria: Json
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          user_count: number | null
        }
        Insert: {
          created_at?: string | null
          criteria: Json
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          user_count?: number | null
        }
        Update: {
          created_at?: string | null
          criteria?: Json
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          user_count?: number | null
        }
        Relationships: []
      }
      user_tags: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          user_count: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          user_count?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          user_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_admin_note: {
        Args: {
          p_admin_id: string
          p_admin_name: string
          p_is_private?: boolean
          p_note: string
          p_user_id: string
        }
        Returns: Json
      }
      add_user_tag: {
        Args: {
          p_admin_id?: string
          p_admin_name?: string
          p_tag_name: string
          p_user_id: string
        }
        Returns: Json
      }
      admin_action_log: {
        Args: { action_type: string; details?: Json; target_id: string }
        Returns: undefined
      }
      admin_create_user: {
        Args: {
          is_premium?: boolean
          user_email: string
          user_name: string
          user_password: string
        }
        Returns: Json
      }
      admin_toggle_user_access: {
        Args: { block_access: boolean; user_id: string }
        Returns: Json
      }
      generate_random_password: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_advanced_analytics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_all_users_admin: {
        Args: Record<PropertyKey, never>
        Returns: {
          birth_date: string
          cosmic_energy: number
          created_at: string
          disrupty_customer_id: string
          email: string
          email_verified: boolean
          energy_regen_rate: number
          full_name: string
          id: string
          is_admin: boolean
          is_premium: boolean
          last_energy_regen: string
          last_login: string
          max_cosmic_energy: number
          source: string
          total_readings: number
          updated_at: string
        }[]
      }
      get_all_users_for_admin: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          disrupty_customer_id: string
          email: string
          email_verified: boolean
          full_name: string
          id: string
          is_premium: boolean
          last_login: string
          premium_activated_at: string
          total_readings: number
        }[]
      }
      get_dashboard_statistics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      increment_reading_counters: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      is_admin_user: {
        Args: { user_id: string }
        Returns: boolean
      }
      process_disrupty_purchase: {
        Args: {
          p_amount?: number
          p_customer_email: string
          p_customer_id: string
          p_customer_name: string
          p_webhook_data?: Json
        }
        Returns: Json
      }
      process_kiwify_purchase: {
        Args: {
          p_amount: number
          p_customer_email: string
          p_customer_id: string
          p_customer_name: string
          p_webhook_data: Json
        }
        Returns: Json
      }
      record_analytics_event: {
        Args: {
          p_event_data: Json
          p_event_type: string
          p_session_id?: string
          p_user_id?: string
        }
        Returns: Json
      }
      remove_user_tag: {
        Args: {
          p_admin_id?: string
          p_admin_name?: string
          p_tag_name: string
          p_user_id: string
        }
        Returns: Json
      }
      reset_daily_readings: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_cosmic_energy: {
        Args: { energy_consumed?: number; new_energy: number; user_id: string }
        Returns: Json
      }
      update_user_activity: {
        Args: { user_email: string }
        Returns: undefined
      }
      update_user_from_magical_portal: {
        Args: {
          p_birth_date: string
          p_full_name: string
          p_state: string
          p_user_id: string
        }
        Returns: undefined
      }
      update_user_status: {
        Args: {
          p_admin_id?: string
          p_admin_name?: string
          p_status: string
          p_user_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
