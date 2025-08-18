
-- Insert hardcoded scholarships from the data file into the scholarships table
-- This will make them manageable through the admin panel

INSERT INTO public.scholarships (
  name, 
  provider, 
  amount, 
  description, 
  eligibility, 
  category, 
  level, 
  application_deadline, 
  official_website,
  requirements
) VALUES 
(
  'Merit-Based Scholarship',
  'State Education Board',
  '$5,000',
  'A scholarship awarded to students with exceptional academic performance.',
  'Minimum GPA of 3.5, enrolled in accredited institution',
  'Academic Excellence',
  'Undergraduate',
  'March 15, 2024',
  'https://stateeducation.gov/scholarships',
  '{"documents": ["transcript", "recommendation_letter"], "gpa_requirement": 3.5}'
),
(
  'STEM Excellence Award',
  'Tech Innovation Foundation',
  '$10,000',
  'Supporting future innovators in Science, Technology, Engineering, and Mathematics.',
  'STEM major, demonstrated project experience',
  'STEM',
  'Undergraduate',
  'April 30, 2024',
  'https://techinnovation.org/stem-award',
  '{"documents": ["project_portfolio", "transcript"], "major_requirement": "STEM"}'
),
(
  'Community Service Grant',
  'Local Community Foundation',
  '$3,000',
  'Recognizing students who have made significant contributions to their communities.',
  'Minimum 100 volunteer hours, community project leadership',
  'Community Service',
  'High School',
  'May 1, 2024',
  'https://communityfoundation.org/service-grant',
  '{"documents": ["volunteer_log", "project_description"], "volunteer_hours": 100}'
),
(
  'First-Generation College Fund',
  'Education Access Initiative',
  '$7,500',
  'Supporting first-generation college students in their educational journey.',
  'First-generation college student, financial need demonstrated',
  'Financial Need',
  'Undergraduate',
  'June 15, 2024',
  'https://educationaccess.org/first-gen',
  '{"documents": ["fafsa", "family_education_history"], "first_generation": true}'
),
(
  'Arts & Creativity Scholarship',
  'Creative Arts Council',
  '$4,000',
  'Fostering creativity and artistic expression in education.',
  'Portfolio submission, arts-related major or significant involvement',
  'Arts',
  'Undergraduate',
  'February 28, 2024',
  'https://creativeartscouncil.org/scholarship',
  '{"documents": ["portfolio", "artist_statement"], "arts_involvement": true}'
);
