export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
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
  public: {
    Tables: {
      brands: {
        Row: {
          id: number
          image_url: string | null
          name: string
        }
        Insert: {
          id?: number
          image_url?: string | null
          name: string
        }
        Update: {
          id?: number
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      cards: {
        Row: {
          created_at: string | null
          cvv: number
          expiry_date: string
          id: number
          name: string
          number: string
          testing: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          cvv: number
          expiry_date: string
          id?: number
          name: string
          number: string
          testing?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          cvv?: number
          expiry_date?: string
          id?: number
          name?: string
          number?: string
          testing?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_testing_fkey"
            columns: ["testing"]
            referencedRelation: "cards_error"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      cards_error: {
        Row: {
          created_at: string | null
          decline_code: string | null
          error_code: string
          error_description: string
          id: number
        }
        Insert: {
          created_at?: string | null
          decline_code?: string | null
          error_code: string
          error_description: string
          id?: number
        }
        Update: {
          created_at?: string | null
          decline_code?: string | null
          error_code?: string
          error_description?: string
          id?: number
        }
        Relationships: []
      }
      cart: {
        Row: {
          created_at: string
          id: number
          product_id: number
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          quantity: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          description: string
          discount: number
          expiry_date: string
          id: number
          max_use: number
          min_purchase_amount: number
          name: string
          secret: boolean | null
          used: number
        }
        Insert: {
          code: string
          created_at?: string
          description: string
          discount: number
          expiry_date: string
          id?: number
          max_use: number
          min_purchase_amount: number
          name: string
          secret?: boolean | null
          used: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          discount?: number
          expiry_date?: string
          id?: number
          max_use?: number
          min_purchase_amount?: number
          name?: string
          secret?: boolean | null
          used?: number
        }
        Relationships: []
      }
      delivery_addresses: {
        Row: {
          _default: boolean
          address_line2: string
          barangay: string
          city: string
          country: string
          created_at: string
          id: number
          label: string
          name: string
          phone_number: string
          postal_code: string
          province: string
          region: string
          user_id: string
        }
        Insert: {
          _default?: boolean
          address_line2: string
          barangay: string
          city: string
          country: string
          created_at?: string
          id?: number
          label: string
          name: string
          phone_number: string
          postal_code: string
          province: string
          region: string
          user_id: string
        }
        Update: {
          _default?: boolean
          address_line2?: string
          barangay?: string
          city?: string
          country?: string
          created_at?: string
          id?: number
          label?: string
          name?: string
          phone_number?: string
          postal_code?: string
          province?: string
          region?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_addresses_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      delivery_statuses: {
        Row: {
          color_scheme: string
          created_at: string | null
          description: string | null
          id: number
          name: string
          Name: string | null
        }
        Insert: {
          color_scheme?: string
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          Name?: string | null
        }
        Update: {
          color_scheme?: string
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          Name?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string | null
          description: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          delivery_address: number
          fulfillment_date: string | null
          id: number
          merchandise_subtotal: number
          note: string | null
          order_date: string
          payment_option: number
          payment_status: number
          products: Json | null
          shipping_fee: number
          status: number | null
          total_payment: number
          total_payment_discounted: number
          user_id: string
          voucher: number | null
        }
        Insert: {
          delivery_address: number
          fulfillment_date?: string | null
          id?: number
          merchandise_subtotal: number
          note?: string | null
          order_date?: string
          payment_option: number
          payment_status?: number
          products?: Json | null
          shipping_fee: number
          status?: number | null
          total_payment: number
          total_payment_discounted: number
          user_id: string
          voucher?: number | null
        }
        Update: {
          delivery_address?: number
          fulfillment_date?: string | null
          id?: number
          merchandise_subtotal?: number
          note?: string | null
          order_date?: string
          payment_option?: number
          payment_status?: number
          products?: Json | null
          shipping_fee?: number
          status?: number | null
          total_payment?: number
          total_payment_discounted?: number
          user_id?: string
          voucher?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_delivery_address_fkey"
            columns: ["delivery_address"]
            referencedRelation: "delivery_addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_payment_option_fkey"
            columns: ["payment_option"]
            referencedRelation: "payment_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_payment_status_fkey"
            columns: ["payment_status"]
            referencedRelation: "payment_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_status_fkey"
            columns: ["status"]
            referencedRelation: "orders_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_voucher_fkey"
            columns: ["voucher"]
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          }
        ]
      }
      orders_status: {
        Row: {
          approved: string | null
          cancelled: string | null
          delivered: string | null
          delivery_hub: string | null
          delivery_unsuccessful: string | null
          id: number
          in_transit: string | null
          order_id: number
          order_placed: string
          out_for_delivery: string | null
          preparing_to_ship: string | null
        }
        Insert: {
          approved?: string | null
          cancelled?: string | null
          delivered?: string | null
          delivery_hub?: string | null
          delivery_unsuccessful?: string | null
          id?: number
          in_transit?: string | null
          order_id: number
          order_placed?: string
          out_for_delivery?: string | null
          preparing_to_ship?: string | null
        }
        Update: {
          approved?: string | null
          cancelled?: string | null
          delivered?: string | null
          delivery_hub?: string | null
          delivery_unsuccessful?: string | null
          id?: number
          in_transit?: string | null
          order_id?: number
          order_placed?: string
          out_for_delivery?: string | null
          preparing_to_ship?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_status_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_options: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          full_name: string
          id: number
          short_name: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          full_name: string
          id?: number
          short_name: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          full_name?: string
          id?: number
          short_name?: string
        }
        Relationships: []
      }
      payment_statuses: {
        Row: {
          color_scheme: string
          created_at: string | null
          id: number
          status: string
        }
        Insert: {
          color_scheme?: string
          created_at?: string | null
          id?: number
          status?: string
        }
        Update: {
          color_scheme?: string
          created_at?: string | null
          id?: number
          status?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          brand_id: number
          category_id: number
          content: string | null
          created_at: string
          deleted: boolean
          description: string
          fragile: boolean
          id: number
          image_url: string
          last_stock: string
          name: string
          price: number
          sales: number
          stock: number
          unique_name: string | null
          video_url: string | null
        }
        Insert: {
          brand_id?: number
          category_id: number
          content?: string | null
          created_at?: string
          deleted?: boolean
          description: string
          fragile?: boolean
          id?: number
          image_url: string
          last_stock?: string
          name: string
          price: number
          sales?: number
          stock?: number
          unique_name?: string | null
          video_url?: string | null
        }
        Update: {
          brand_id?: number
          category_id?: number
          content?: string | null
          created_at?: string
          deleted?: boolean
          description?: string
          fragile?: boolean
          id?: number
          image_url?: string
          last_stock?: string
          name?: string
          price?: number
          sales?: number
          stock?: number
          unique_name?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      products_media: {
        Row: {
          created_at: string
          id: number
          mime_type: string
          product_id: number
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          mime_type: string
          product_id: number
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          mime_type?: string
          product_id?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_media_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string | null
          gender: string | null
          id: string
          phone_number: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      recently_viewed: {
        Row: {
          created_at: string
          id: number
          product_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recently_viewed_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recently_viewed_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          delivery_rating: number
          downvote: number | null
          id: number
          order_id: number | null
          product_id: number
          product_rating: number
          review_date: string
          upvote: number | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          delivery_rating: number
          downvote?: number | null
          id?: number
          order_id?: number | null
          product_id: number
          product_rating: number
          review_date?: string
          upvote?: number | null
          user_id: string
        }
        Update: {
          comment?: string | null
          delivery_rating?: number
          downvote?: number | null
          id?: number
          order_id?: number | null
          product_id?: number
          product_rating?: number
          review_date?: string
          upvote?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      sales: {
        Row: {
          id: number
          order_id: number | null
          product_id: number | null
          quantity_sold: number
          sale_date: string
          user_id: string | null
        }
        Insert: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          quantity_sold: number
          sale_date: string
          user_id?: string | null
        }
        Update: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          quantity_sold?: number
          sale_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      superchats: {
        Row: {
          created_at: string
          deleted: boolean
          id: number
          message: string
          product: number | null
          profile: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: number
          message: string
          product?: number | null
          profile?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: number
          message?: string
          product?: number | null
          profile?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "superchats_product_fkey"
            columns: ["product"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "superchats_profile_fkey"
            columns: ["profile"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      superchats_reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          profile: string | null
          reason: string
          superchat: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          profile?: string | null
          reason: string
          superchat?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          profile?: string | null
          reason?: string
          superchat?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "superchats_reports_profile_fkey"
            columns: ["profile"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "superchats_reports_superchat_fkey"
            columns: ["superchat"]
            referencedRelation: "superchats"
            referencedColumns: ["id"]
          }
        ]
      }
      superchats_votes: {
        Row: {
          created_at: string | null
          id: number
          profile: string
          superchat: number
          vote: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          profile: string
          superchat: number
          vote?: number
        }
        Update: {
          created_at?: string | null
          id?: number
          profile?: string
          superchat?: number
          vote?: number
        }
        Relationships: [
          {
            foreignKeyName: "superchats_votes_profile_fkey"
            columns: ["profile"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "superchats_votes_superchat_fkey"
            columns: ["superchat"]
            referencedRelation: "superchats"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_average_rating: {
        Args: {
          product_id: number
        }
        Returns: number
      }
      create_user: {
        Args: {
          email: string
          password: string
        }
        Returns: undefined
      }
      get_average_rating: {
        Args: {
          product_id: number
        }
        Returns: number
      }
      get_product: {
        Args: {
          user_id: string
          product_id: number
        }
        Returns: {
          brand_id: number
          category_id: number
          content: string | null
          created_at: string
          deleted: boolean
          description: string
          fragile: boolean
          id: number
          image_url: string
          last_stock: string
          name: string
          price: number
          sales: number
          stock: number
          unique_name: string | null
          video_url: string | null
        }[]
      }
      get_product_review_stats: {
        Args: {
          product_id: number
        }
        Returns: {
          total_reviews: number
          average_rating: number
          rating_1: number
          rating_2: number
          rating_3: number
          rating_4: number
          rating_5: number
        }[]
      }
      get_smartwatches: {
        Args: Record<PropertyKey, never>
        Returns: {
          brand_id: number
          category_id: number
          content: string | null
          created_at: string
          deleted: boolean
          description: string
          fragile: boolean
          id: number
          image_url: string
          last_stock: string
          name: string
          price: number
          sales: number
          stock: number
          unique_name: string | null
          video_url: string | null
        }[]
      }
      json_matches_schema: {
        Args: {
          schema: Json
          instance: Json
        }
        Returns: boolean
      }
      jsonb_matches_schema: {
        Args: {
          schema: Json
          instance: Json
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

