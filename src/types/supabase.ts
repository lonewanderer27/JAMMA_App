export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
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
      orders: {
        Row: {
          amount: number
          fulfillment_date: string | null
          id: number
          notes: string | null
          order_date: string
          payment_method: string
          product_id: number
          shipping_info: number
          status: string
          total_amount: number
          tracking_number: string
          userid: string
        }
        Insert: {
          amount: number
          fulfillment_date?: string | null
          id?: number
          notes?: string | null
          order_date?: string
          payment_method: string
          product_id: number
          shipping_info: number
          status: string
          total_amount: number
          tracking_number: string
          userid: string
        }
        Update: {
          amount?: number
          fulfillment_date?: string | null
          id?: number
          notes?: string | null
          order_date?: string
          payment_method?: string
          product_id?: number
          shipping_info?: number
          status?: string
          total_amount?: number
          tracking_number?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping_info_fkey"
            columns: ["shipping_info"]
            referencedRelation: "shipping_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_userid_fkey"
            columns: ["userid"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          brand_id: number | null
          category_id: number
          description: string
          id: number
          image_url: string
          last_stock: string
          name: string
          price: number
          stock: number
          video_url: string | null
        }
        Insert: {
          brand_id?: number | null
          category_id: number
          description: string
          id?: number
          image_url: string
          last_stock?: string
          name: string
          price: number
          stock?: number
          video_url?: string | null
        }
        Update: {
          brand_id?: number | null
          category_id?: number
          description?: string
          id?: number
          image_url?: string
          last_stock?: string
          name?: string
          price?: number
          stock?: number
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
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
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
      reviews: {
        Row: {
          comment: string | null
          delivery_rating: number
          id: number
          order_id: number | null
          product_id: number
          product_rating: number
          review_date: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          delivery_rating: number
          id?: number
          order_id?: number | null
          product_id: number
          product_rating: number
          review_date?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          delivery_rating?: number
          id?: number
          order_id?: number | null
          product_id?: number
          product_rating?: number
          review_date?: string
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
        }
        Insert: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          quantity_sold: number
          sale_date: string
        }
        Update: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          quantity_sold?: number
          sale_date?: string
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
          }
        ]
      }
      shipping_info: {
        Row: {
          address_line1: string
          address_line2: string
          city: string
          country: string
          created_at: string | null
          id: number
          name: string
          postal_code: string
          province: string
        }
        Insert: {
          address_line1: string
          address_line2: string
          city: string
          country: string
          created_at?: string | null
          id?: number
          name: string
          postal_code: string
          province: string
        }
        Update: {
          address_line1?: string
          address_line2?: string
          city?: string
          country?: string
          created_at?: string | null
          id?: number
          name?: string
          postal_code?: string
          province?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
