-- Add is_public column to notes table
ALTER TABLE notes ADD COLUMN is_public BOOLEAN DEFAULT FALSE;

-- Create index for faster lookups of public notes
CREATE INDEX idx_notes_public ON notes(is_public);