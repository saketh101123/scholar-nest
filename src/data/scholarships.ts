
export const scholarshipsData = [
  {
    "name": "National Means-cum-Merit Scholarship (NMMS)",
    "provider": "Ministry of Education, Government of India",
    "eligibility": "Students of Class 8 who have passed with ≥55% marks from government/aided schools, family income ≤ ₹1.5 lakh",
    "amount": "₹6,000 per year",
    "application_deadline": "Varies (state-level exam dates)",
    "official_website": "https://www.education.gov.in/nmms",
    "level": "School",
    "category": "All",
    "description": "Centrally sponsored scholarship (launched 2008) to support meritorious students of economically weaker sections in classes IX–XII, offering ₹6,000 per annum.",
    "requirements": {
      "class": "8",
      "percentage": 55,
      "income": 150000,
      "school_type": "government/aided"
    }
  },
  {
    "name": "INSPIRE Scholarship for Higher Education (SHE)",
    "provider": "Department of Science & Technology, Government of India",
    "eligibility": "Top 1% students in Class 12 science stream (India-wide) pursuing B.Sc./Int. M.Sc. or B.S./Int. M.S. in basic/natural sciences",
    "amount": "₹80,000 per year (for 5 years)",
    "application_deadline": "Varies (annual calls)",
    "official_website": "https://www.online-inspire.gov.in",
    "level": "UG/PG",
    "category": "All",
    "description": "DST flagship scheme attracting high-performing science students, providing 12,000 scholarships of ₹80,000 per annum for up to 5 years in basic and natural science courses.",
    "requirements": {
      "class": "12",
      "stream": "science",
      "rank": "top_1_percent",
      "course": "science"
    }
  },
  {
    "name": "Central Sector Scholarship for College and University Students",
    "provider": "Department of Higher Education, Ministry of Education (Government of India)",
    "eligibility": "Students above 80th percentile (approximately top 10,000 rank) in Class 12 exams, admitted to regular UG/PG courses, family income ≤ ₹8 lakh",
    "amount": "₹10,000/year for UG (first 3 years; ₹20,000 in 4th-5th year of integrated courses), ₹20,000/year for PG",
    "application_deadline": "Varies (typically Jul–Nov)",
    "official_website": "https://www.scholarships.gov.in",
    "level": "UG/PG",
    "category": "General",
    "description": "Central merit-cum-means scholarship for top Class 12 graduates from low-income families, providing ₹10,000 per year for undergraduates and ₹20,000 per year for postgraduates.",
    "requirements": {
      "class": "12",
      "percentile": 80,
      "income": 800000
    }
  },
  {
    "name": "Post-Graduate Indira Gandhi Scholarship for Single Girl Child",
    "provider": "University Grants Commission (UGC), Government of India",
    "eligibility": "Single female child (no brothers, or only daughter), up to age 30, admitted to first year of a full-time postgraduate (non-professional) course",
    "amount": "₹3,100 per month for 2 years (10 months per year)",
    "application_deadline": "Varies (UGC announcements)",
    "official_website": "https://www.scholarships.gov.in",
    "level": "PG",
    "category": "Women",
    "description": "Central government scholarship for single girl children pursuing PG studies (non-professional), providing ₹3,100/month for the duration of the 2-year master's program.",
    "requirements": {
      "gender": "female",
      "family_status": "single_girl_child",
      "age": 30,
      "level": "PG"
    }
  },
  {
    "name": "AICTE Pragati Scholarship for Girl Students",
    "provider": "All India Council for Technical Education (AICTE)",
    "eligibility": "Female students admitted to first-year diploma/UG courses in technical education (e.g., engineering, pharmacy)",
    "amount": "₹30,000 per year",
    "application_deadline": "Varies (typically mid-year)",
    "official_website": "https://www.aicte-india.org",
    "level": "UG (Technical)",
    "category": "Women",
    "description": "AICTE scholarship scheme providing ₹30,000 per year to female students pursuing technical education, encouraging women's participation in engineering and allied fields.",
    "requirements": {
      "gender": "female",
      "course_type": "technical",
      "level": "UG"
    }
  },
  {
    "name": "AICTE Saksham Scholarship for Specially Abled Students",
    "provider": "All India Council for Technical Education (AICTE)",
    "eligibility": "Students with ≥40% disability enrolled in first-year diploma/UG courses in technical education",
    "amount": "₹50,000 per year",
    "application_deadline": "Varies (typically mid-year)",
    "official_website": "https://www.aicte-india.org",
    "level": "UG (Technical)",
    "category": "All",
    "description": "AICTE scheme offering ₹50,000 per year to specially-abled students (with ≥40% disability) pursuing technical education (engineering, etc.).",
    "requirements": {
      "disability": 40,
      "course_type": "technical",
      "level": "UG"
    }
  },
  {
    "name": "Pre-Matric Scholarship for Scheduled Castes (SC)",
    "provider": "Department of Social Justice and Empowerment, Government of India",
    "eligibility": "SC students in Class IX–X, family income ≤ ₹2.5 lakh per annum",
    "amount": "₹3,500 per annum (day scholars), ₹7,000 per annum (hostellers)",
    "application_deadline": "Varies (applications via NSP, typically April)",
    "official_website": "https://socialjustice.gov.in/schemes/23",
    "level": "School",
    "category": "SC",
    "description": "Centrally sponsored scheme supporting SC students in classes IX–X from low-income families to continue education and minimize dropouts.",
    "requirements": {
      "caste": "SC",
      "class": "9-10",
      "income": 250000
    }
  },
  {
    "name": "Pre-Matric Scholarship for Minority Students (Central)",
    "provider": "Ministry of Minority Affairs, Government of India",
    "eligibility": "Students of minority communities (Muslim, Christian, Sikh, Buddhist, Parsi, Jain) in classes 1–10, family income ≤ ₹2 lakh",
    "amount": "Up to ₹600/month (classes 1–8) or ₹900/month (classes 9–10)",
    "application_deadline": "Varies (NSP portal)",
    "official_website": "https://scholarships.gov.in",
    "level": "School",
    "category": "Minority",
    "description": "Central scholarship for minority community children in school (up to class 10) from low-income families, covering tuition, books and maintenance.",
    "requirements": {
      "religion": ["Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain"],
      "class": "1-10",
      "income": 200000
    }
  }
];

export type Scholarship = typeof scholarshipsData[0];
