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
  },
  {
    "name": "Narotam Sekhsaria Scholarship",
    "provider": "Narotam Sekhsaria Foundation",
    "eligibility": "Graduates seeking funding for postgraduate studies in India or abroad, with strong academic record and financial need",
    "amount": "Interest-free loan up to ₹75 lakh (forfeit portion based on performance)",
    "application_deadline": "Varies (annual applications)",
    "official_website": "https://www.narotamsekhsaria.org",
    "level": "UG/PG",
    "category": "General",
    "description": "Prestigious merit-cum-means scholarship (structured as loan) for Indian postgraduates; recipients receive an interest-free loan (up to ₹75 lakh) which is partly forgivable depending on performance.",
    "requirements": {
      "level": "PG",
      "academic_record": "strong"
    }
  },
  {
    "name": "Fulbright-Nehru Master's Fellowship",
    "provider": "United States-India Educational Foundation (USIEF)",
    "eligibility": "Outstanding Indian students (usually under 35) with leadership potential for 1-year Master's study in the USA",
    "amount": "Tuition, living stipend, visa fees, airfare (varies)",
    "application_deadline": "Varies (annual cycles)",
    "official_website": "https://www.usief.org.in",
    "level": "UG/PG (Abroad)",
    "category": "General",
    "description": "International fellowship supporting Indian citizens for a 1-year Master's degree in the USA, covering tuition, living expenses, and travel for outstanding candidates.",
    "requirements": {
      "age": 35,
      "level": "PG",
      "citizenship": "Indian"
    }
  },
  {
    "name": "Commonwealth Scholarship (India)",
    "provider": "Commonwealth Scholarship Commission (UK)",
    "eligibility": "Indian citizens pursuing select Masters or PhD programs in the UK",
    "amount": "Tuition fees, airfare, living allowance (per CSC guidelines)",
    "application_deadline": "Varies (annual calls)",
    "official_website": "https://cscuk.fcdo.gov.uk",
    "level": "PG (Abroad)",
    "category": "General",
    "description": "International scholarship funded by the UK (CSC) and Indian Government, enabling Indian students to pursue approved courses in the UK (often graduate level) with full support.",
    "requirements": {
      "level": "PG",
      "citizenship": "Indian"
    }
  },
  {
    "name": "Mahindra All India Talent Scholarship (MAITS)",
    "provider": "Mahindra Group",
    "eligibility": "Students in Class 1–12 from low-income families across India",
    "amount": "Tuition assistance (e.g., Rs 500 per month for classes 3–10, Rs 1,000 per month for 11–12)",
    "application_deadline": "Varies",
    "official_website": "https://www.mahindra.com",
    "level": "School",
    "category": "General",
    "description": "Corporate scholarship for meritorious school students from low-income families, providing monthly tuition assistance through classes 3–12.",
    "requirements": {
      "class": "1-12",
      "income": "low"
    }
  },
  {
    "name": "Sitaram Jindal Foundation Scholarship",
    "provider": "Jindal Foundation",
    "eligibility": "Underprivileged students (often orphans) enrolling in professional courses (engineering, medicine, etc.)",
    "amount": "Varies (tuition, stipend in some cases)",
    "application_deadline": "Varies",
    "official_website": "https://www.jindalfoundation.org",
    "level": "UG/PG",
    "category": "General",
    "description": "Charitable scholarship providing support to underprivileged youth (often orphans) for pursuing professional degrees, with grants for tuition and sometimes living expenses.",
    "requirements": {
      "background": "underprivileged",
      "course_type": "professional"
    }
  },
  {
    "name": "Lilly Graduate Scholarship",
    "provider": "Eli Lilly and Company (India)",
    "eligibility": "Indian nationals enrolling in graduate (2-year) programs in science or management",
    "amount": "Up to ₹50,000 per year",
    "application_deadline": "Varies (typically closing in July)",
    "official_website": "https://www.lillyindia.co.in",
    "level": "UG/PG",
    "category": "General",
    "description": "Company-sponsored scholarship for graduate students in science or management, offering financial assistance up to ₹50,000 annually.",
    "requirements": {
      "level": "PG",
      "course": ["science", "management"],
      "citizenship": "Indian"
    }
  },
  {
    "name": "NTSE Scholarship (National Talent Search Exam)",
    "provider": "NCERT (Government of India)",
    "eligibility": "Students who qualify in the National Talent Search Examination (after class 10)",
    "amount": "₹1,250 per month (for class 11–12); ₹2,000 per month (for UG/PG)",
    "application_deadline": "Varies (exam in Nov, results mid-year)",
    "official_website": "https://ncert.nic.in",
    "level": "School/UG/PG",
    "category": "All",
    "description": "Merit-based scholarship for talented students clearing NTSE; awards a monthly scholarship to support their education through higher secondary and college levels.",
    "requirements": {
      "exam": "NTSE_qualified"
    }
  },
  {
    "name": "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    "provider": "Department of Science & Technology, Government of India",
    "eligibility": "Students (Class 11, 12 or undergraduate) with aptitude for research in science (top performers in school or national exams)",
    "amount": "₹5,000 per month (for Class 11/12) and ₹7,000 per month (for UG/PG) plus annual contingency",
    "application_deadline": "Varies (exam annually, though scheme is currently phased out)",
    "official_website": "https://www.kvpy.iisc.ernet.in",
    "level": "UG/PG",
    "category": "All",
    "description": "National fellowship program for outstanding science talent; provides monthly stipends and contingency grants to students pursuing degrees in science (note: scheme replaced by INSPIRE fellowship).",
    "requirements": {
      "class": "11-12-UG",
      "stream": "science",
      "exam": "KVPY_qualified"
    }
  },
  {
    "name": "Akashvani (All India Radio) Scholarship",
    "provider": "Prasar Bharati (AIR)",
    "eligibility": "Students who have cleared Class 10 with ≥60% marks and have passed Fine Arts as a subject",
    "amount": "Up to ₹2,000 per month",
    "application_deadline": "Aug–Sep (annually, via schools)",
    "official_website": "https://prasarbharati.gov.in",
    "level": "School",
    "category": "All",
    "description": "Scholarship scheme for meritorious Class 10 students with Fine Arts distinction, offering a monthly stipend (up to ₹2,000) through higher secondary education.",
    "requirements": {
      "class": "10",
      "percentage": 60,
      "subject": "fine_arts"
    }
  },
  {
    "name": "CBSE Merit Scholarship Scheme",
    "provider": "Central Board of Secondary Education (CBSE)",
    "eligibility": "Top-performing students who have passed Class 12 under CBSE",
    "amount": "One-time stipend (around ₹5,000)",
    "application_deadline": "Varies",
    "official_website": "https://cbse.nic.in",
    "level": "UG",
    "category": "General",
    "description": "Scholarship by CBSE Board for high-achieving Class 12 students, offering a one-time financial award to support their university education.",
    "requirements": {
      "class": "12",
      "board": "CBSE",
      "performance": "top"
    }
  },
  {
    "name": "Lok Sabha Scholarship Scheme for Toppers",
    "provider": "Parliament of India / Lok Sabha Secretariat",
    "eligibility": "Class 12 toppers (any stream) from all states, admitted to first-year UG programs",
    "amount": "₹20,000 per year",
    "application_deadline": "Varies",
    "official_website": "https://loksabha.nic.in",
    "level": "UG",
    "category": "All",
    "description": "Scholarship by the Lok Sabha Secretariat for meritorious students, providing ₹20,000 annually to Class 12 toppers from each state to support their college studies.",
    "requirements": {
      "class": "12",
      "rank": "state_topper",
      "level": "UG"
    }
  },
  {
    "name": "AICTE Vidya Lakshmi Education Loan Scheme",
    "provider": "AICTE / Banks",
    "eligibility": "AICTE-approved college students in need of educational loans",
    "amount": "Up to the approved tuition fee and maintenance",
    "application_deadline": "Varies",
    "official_website": "https://www.vidyalakshmi.co.in",
    "level": "UG/PG",
    "category": "All",
    "description": "Not a scholarship but a loan portal (Vidya Lakshmi) offering education loans to AICTE students; facilitates access to government scholarships and bank loans.",
    "requirements": {
      "college_type": "AICTE_approved"
    }
  },
  {
    "name": "Post-Matric Scholarship for OBC Students (State)",
    "provider": "Social Welfare Department, Government of Karnataka",
    "eligibility": "OBC students from Karnataka in classes 11–PhD, family income ≤ ₹2 lakh",
    "amount": "Full fee reimbursement plus maintenance allowance (approx ₹15,000/year)",
    "application_deadline": "Varies (through NSP/SSP portal)",
    "official_website": "https://ssp.postmatric.karnataka.gov.in",
    "level": "School/UG/PG/PhD",
    "category": "OBC",
    "description": "State scholarship for OBC students of Karnataka continuing education after matriculation, covering tuition, exam fees and monthly maintenance support.",
    "requirements": {
      "caste": "OBC",
      "state": "Karnataka",
      "class": "11+",
      "income": 200000
    }
  },
  {
    "name": "Merit Scholarship for SC/ST/OBC (State)",
    "provider": "Social Welfare Department, Government of Karnataka",
    "eligibility": "Top-performing students from SC/ST or OBC communities in Karnataka (e.g., top scorers in board exams)",
    "amount": "Varies by rank (e.g., ₹10,000–₹20,000 per year)",
    "application_deadline": "Varies (announced with exam results)",
    "official_website": "https://ssp.postmatric.karnataka.gov.in",
    "level": "School/UG",
    "category": "SC/ST/OBC",
    "description": "Karnataka government awards to outstanding SC/ST/OBC students (such as board exam toppers), providing annual scholarships to encourage academic excellence.",
    "requirements": {
      "caste": ["SC", "ST", "OBC"],
      "state": "Karnataka",
      "performance": "top"
    }
  },
  {
    "name": "Central Sector Scholarship for Physically Handicapped (CSSPH)",
    "provider": "Department of Empowerment of Persons with Disabilities, Government of India",
    "eligibility": "Students with ≥40% disability pursuing UG or PG",
    "amount": "₹12,000 per year",
    "application_deadline": "Varies (NSP portal)",
    "official_website": "https://scholarships.gov.in",
    "level": "UG/PG",
    "category": "All",
    "description": "Central scholarship for physically disabled students in higher education, providing ₹12,000 per year to meet academic expenses.",
    "requirements": {
      "disability": 40,
      "level": "UG-PG"
    }
  },
  {
    "name": "Prime Minister's Scholarship Scheme (PMSS) for Wards of Armed Forces",
    "provider": "Ministry of Defence, Government of India",
    "eligibility": "Wards of Indian Armed Forces personnel (including Ex-Servicemen) and their widows/orphans",
    "amount": "Up to ₹20,000 per year for professional courses, ₹2,000 per month for other courses",
    "application_deadline": "Varies",
    "official_website": "https://www.indiangovt.nic.in",
    "level": "UG/PG",
    "category": "All",
    "description": "Central scholarship for children of armed forces personnel and martyrs, providing financial assistance for higher education (higher awards for professional/technical courses).",
    "requirements": {
      "parent_occupation": "armed_forces"
    }
  },
  {
    "name": "GAIL Scholarship",
    "provider": "GAIL (India) Limited",
    "eligibility": "Students from local communities of GAIL operations and meritorious students in relevant fields",
    "amount": "Education support (tuition fee reimbursement, living expense assistance)",
    "application_deadline": "Varies",
    "official_website": "https://www.gailonline.com",
    "level": "UG",
    "category": "All",
    "description": "CSR scholarship scheme by GAIL providing financial support to deserving students from areas near its operations and to meritorious students.",
    "requirements": {
      "location": "GAIL_operations"
    }
  },
  {
    "name": "ONGC Technical Scholarship",
    "provider": "ONGC (Oil and Natural Gas Corporation)",
    "eligibility": "Meritorious students obtaining admission to specified engineering colleges or through GATE (national selection)",
    "amount": "Full tuition fees waiver plus monthly stipend",
    "application_deadline": "Varies",
    "official_website": "https://www.ongcindia.com",
    "level": "UG",
    "category": "All",
    "description": "ONGC scholarship awarding full tuition and stipend to high-performing engineering students at select institutions (often through GATE selection).",
    "requirements": {
      "course_type": "technical",
      "exam": "GATE_qualified"
    }
  },
  {
    "name": "Ishan Uday Scholarship",
    "provider": "University Grants Commission (UGC), Government of India",
    "eligibility": "Students from North Eastern states admitted to general degree courses",
    "amount": "₹5,000 per month (for 8 months each year)",
    "application_deadline": "July (annual)",
    "official_website": "https://www.ugc.ac.in",
    "level": "UG",
    "category": "Minority (North East)",
    "description": "Central scholarship providing ₹5,000 per month to students from North Eastern states pursuing general degree courses, to encourage higher education.",
    "requirements": {
      "region": "North_East",
      "course_type": "general"
    }
  }
];

export type Scholarship = typeof scholarshipsData[0];
