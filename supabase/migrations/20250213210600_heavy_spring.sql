/*
  # Add RLS Policies for User Data Protection

  1. Changes
    - Add policies for users to manage their own data
    - Fix INSERT policy syntax by removing USING clause
  
  2. Security
    - Ensure proper RLS policies for all operations
    - Maintain data isolation between users
*/

-- Function to safely create policies
CREATE OR REPLACE FUNCTION create_policy_if_not_exists(
  policy_name text,
  table_name text,
  action text,
  role_name text,
  using_expr text DEFAULT NULL,
  check_expr text DEFAULT NULL
) RETURNS void AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE policyname = policy_name
    AND tablename = table_name
  ) THEN
    EXECUTE format(
      'CREATE POLICY %I ON %I FOR %s TO %I %s %s',
      policy_name,
      table_name,
      action,
      role_name,
      CASE 
        WHEN action = 'INSERT' THEN ''
        WHEN using_expr IS NOT NULL THEN format('USING (%s)', using_expr)
        ELSE ''
      END,
      CASE 
        WHEN check_expr IS NOT NULL THEN format('WITH CHECK (%s)', check_expr)
        ELSE ''
      END
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Apply SELECT and UPDATE policies
SELECT create_policy_if_not_exists(
  'Users can view own profile',
  'profiles',
  'SELECT',
  'authenticated',
  'auth.uid() = id'
);

SELECT create_policy_if_not_exists(
  'Users can update own profile',
  'profiles',
  'UPDATE',
  'authenticated',
  'auth.uid() = id'
);

-- Apply INSERT policy (without USING clause)
SELECT create_policy_if_not_exists(
  'Users can insert own profile',
  'profiles',
  'INSERT',
  'authenticated',
  NULL,
  'auth.uid() = id'
);

-- Apply policies for bookings
SELECT create_policy_if_not_exists(
  'Users can view own bookings',
  'class_bookings',
  'SELECT',
  'authenticated',
  'student_id = auth.uid()'
);

SELECT create_policy_if_not_exists(
  'Users can create own bookings',
  'class_bookings',
  'INSERT',
  'authenticated',
  NULL,
  'student_id = auth.uid()'
);

-- Apply policy for payments
SELECT create_policy_if_not_exists(
  'Users can view own payments',
  'payments',
  'SELECT',
  'authenticated',
  'student_id = auth.uid()'
);

-- Drop the helper function
DROP FUNCTION create_policy_if_not_exists;