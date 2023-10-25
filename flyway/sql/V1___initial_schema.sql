CREATE TABLE programming_assignments (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  assignment_order INTEGER NOT NULL,
  handout TEXT NOT NULL,
  test_code TEXT NOT NULL
);

CREATE TYPE SUBMISSION_STATUS AS ENUM ('pending', 'processed');

CREATE TABLE programming_assignment_submissions (
  id SERIAL PRIMARY KEY,
  programming_assignment_id INTEGER REFERENCES programming_assignments(id),
  code TEXT NOT NULL,
  user_uuid TEXT NOT NULL,
  status SUBMISSION_STATUS NOT NULL DEFAULT 'pending',
  grader_feedback TEXT,
  correct BOOLEAN DEFAULT FALSE,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX pas_code_pa_id_idx ON 
  programming_assignment_submissions (code, programming_assignment_id);

CREATE INDEX pas_user_uuid_pa_id_idx ON 
  programming_assignment_submissions (user_uuid, programming_assignment_id);