export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          student_id: string | null
          phone: string | null
          avatar_url: string | null
          terms_accepted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          student_id?: string | null
          phone?: string | null
          avatar_url?: string | null
          terms_accepted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          student_id?: string | null
          phone?: string | null
          avatar_url?: string | null
          terms_accepted?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      class_bookings: {
        Row: {
          id: string
          student_id: string
          class_date: string
          status: 'confirmed' | 'cancelled' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          class_date: string
          status: 'confirmed' | 'cancelled' | 'completed'
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          class_date?: string
          status?: 'confirmed' | 'cancelled' | 'completed'
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          student_id: string
          amount: number
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method: string
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          amount: number
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method: string
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          amount?: number
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: string
          created_at?: string
        }
      }
    }
  }
}