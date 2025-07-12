
-- Update saved_scholarships table to use scholarship_data instead of scholarship_id
ALTER TABLE public.saved_scholarships DROP COLUMN scholarship_id;
ALTER TABLE public.saved_scholarships ADD COLUMN scholarship_data JSONB NOT NULL;

-- Update the unique constraint to prevent duplicate bookmarks based on scholarship name
DROP INDEX IF EXISTS saved_scholarships_user_id_scholarship_id_key;
CREATE UNIQUE INDEX saved_scholarships_user_scholarship_unique 
ON public.saved_scholarships (user_id, (scholarship_data->>'name'));
