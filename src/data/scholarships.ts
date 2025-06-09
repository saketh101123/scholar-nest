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
  },
  {
    "name": "National Overseas Scholarship for SC/ST",
    "provider": "Ministry of Social Justice and Empowerment, Government of India",
    "eligibility": "SC/ST students in Master's or PhD programs seeking to study abroad",
    "amount": "Up to 100% financial assistance (tuition, living expenses) for 2 years",
    "application_deadline": "Varies",
    "official_website": "https://www.nsp.gov.in",
    "level": "PG/PhD (Abroad)",
    "category": "SC/ST",
    "description": "Central scholarship enabling SC/ST students to pursue postgraduate or doctoral studies abroad, providing full funding for approved courses.",
    "requirements": {
      "caste": ["SC", "ST"],
      "level": "PG-PhD"
    }
  },
  {
    "name": "Central Sector Scholarship for SC Students (Social Justice)",
    "provider": "Department of Social Justice and Empowerment, Government of India",
    "eligibility": "SC students with family income ≤ ₹6 lakh pursuing higher education",
    "amount": "50% tuition fee reimbursement or ₹2,000/year (whichever is lower)",
    "application_deadline": "Varies",
    "official_website": "https://scholarships.gov.in",
    "level": "UG/PG",
    "category": "SC",
    "description": "Central sector scholarship providing partial fee reimbursement for meritorious SC students in higher education.",
    "requirements": {
      "caste": "SC",
      "income": 600000,
      "level": "UG-PG"
    }
  },
  {
    "name": "Pragati Scholarship (AICTE) for Physically Handicapped Girls",
    "provider": "All India Council for Technical Education (AICTE)",
    "eligibility": "Female students with ≥40% disability in first year of diploma/degree technical courses",
    "amount": "₹70,000 per year",
    "application_deadline": "Varies",
    "official_website": "https://www.aicte-india.org",
    "level": "UG (Technical)",
    "category": "Women",
    "description": "AICTE scholarship providing ₹70,000 per year to differently-abled female students pursuing technical education.",
    "requirements": {
      "gender": "female",
      "disability": 40,
      "course_type": "technical",
      "level": "UG"
    }
  },
  {
    "name": "NMMS (Karnataka) Secondary Scholarship",
    "provider": "School Education Department, Government of Karnataka",
    "eligibility": "Karnataka students from government schools who cleared NMMS state exam at Class 8, family income ≤ ₹1.5 lakh",
    "amount": "₹6,000 per year",
    "application_deadline": "Varies (State exam schedule)",
    "official_website": "https://samajkalyana.kar.nic.in",
    "level": "School",
    "category": "All",
    "description": "Karnataka state implementation of the NMMS scholarship, providing ₹6,000 per year to eligible Class 9–12 students from low-income families.",
    "requirements": {
      "class": "8",
      "income": 150000,
      "state": "Karnataka",
      "exam": "NMMS_qualified"
    }
  },
  {
    "name": "Post-Matric Scholarship for Karnataka Minorities",
    "provider": "Directorate of Minorities, Government of Karnataka",
    "eligibility": "Karnataka-domicile students of minority communities (Muslims, Christians, etc.) in Class 11 up to PhD, income ≤ ₹2.5 lakh",
    "amount": "Covers tuition fees, admission fees, and maintenance allowance as per rules",
    "application_deadline": "August–September (annually)",
    "official_website": "http://ssps.karnataka.gov.in",
    "level": "School/UG/PG",
    "category": "Minority",
    "description": "State scholarship to encourage minority students of Karnataka (Class XI to PhD) to continue studies, covering tuition, admission and maintenance costs.",
    "requirements": {
      "religion": ["Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain"],
      "state": "Karnataka",
      "class": "11+",
      "income": 250000
    }
  },
  {
    "name": "Merit-cum-Means Scholarship for Karnataka Minorities",
    "provider": "Directorate of Minorities, Government of Karnataka",
    "eligibility": "Karnataka minority students enrolled in professional/technical courses, with ≥50% marks and family income ≤ ₹2.5 lakh",
    "amount": "Up to ₹30,000 (one-time/annual)",
    "application_deadline": "August–September",
    "official_website": "http://ssps.karnataka.gov.in",
    "level": "UG/PG (Technical/Professional)",
    "category": "Minority",
    "description": "State scholarship for minority students in professional courses, requiring ≥50% marks and low income, offering up to ₹30,000 to support their education.",
    "requirements": {
      "religion": ["Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain"],
      "state": "Karnataka",
      "percentage": 50,
      "income": 250000,
      "course_type": "professional"
    }
  },
  {
    "name": "MPhil/PhD Fellowship for Karnataka Minorities",
    "provider": "Directorate of Minorities, Government of Karnataka",
    "eligibility": "Minority community candidates (Muslim, Christian, etc.) from Karnataka pursuing MPhil or PhD, age ≤ 35, income < ₹6 lakh",
    "amount": "Up to ₹25,000 per month + ₹10,000 per year contingency",
    "application_deadline": "May–June (typically)",
    "official_website": "http://ssps.karnataka.gov.in",
    "level": "PG (MPhil/PhD)",
    "category": "Minority",
    "description": "State fellowship scheme providing financial assistance to minority students from Karnataka for MPhil and PhD, with a monthly stipend and contingency grant.",
    "requirements": {
      "religion": ["Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain"],
      "state": "Karnataka",
      "age": 35,
      "income": 600000,
      "level": "PG-PhD"
    }
  },
  {
    "name": "Incentive Scheme for SSLC & 2nd PUC Toppers (Minority), Karnataka",
    "provider": "Minority Welfare Department, Government of Karnataka",
    "eligibility": "Minority students in Karnataka (Muslim, Christian, etc.) who scored ≥85% in SSLC or 2nd PUC",
    "amount": "One-time incentive: ₹10,000 to SSLC toppers; ₹20,000 to 2nd PUC toppers",
    "application_deadline": "After results (typically August–September)",
    "official_website": "http://ssps.karnataka.gov.in",
    "level": "School",
    "category": "Minority",
    "description": "State incentive for high-achieving minority students in Karnataka: ₹10,000 for top SSLC and ₹20,000 for top 2nd PUC performers among minorities.",
    "requirements": {
      "religion": ["Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain"],
      "state": "Karnataka",
      "percentage": 85,
      "class": "10-12"
    }
  },
  {
    "name": "National Overseas Scholarship for Karnataka Minorities",
    "provider": "Directorate of Minorities, Government of Karnataka",
    "eligibility": "Karnataka-domicile minority students (Muslim, Christian, etc.) pursuing Master's or PhD abroad",
    "amount": "Up to ₹20 lakh (for 2 years) covering course and living expenses",
    "application_deadline": "May–July (typically)",
    "official_website": "http://ssps.karnataka.gov.in",
    "level": "PG/PhD (Abroad)",
    "category": "Minority",
    "description": "State scholarship for minority students of Karnataka to pursue Master's/PhD abroad, providing up to ₹20 lakh support for two years.",
    "requirements": {
      "religion": ["Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain"],
      "state": "Karnataka",
      "level": "PG-PhD"
    }
  },
  {
    "name": "Research Guidance Fellowship for PhD (Backward Classes), Karnataka",
    "provider": "Department of Backward Classes Welfare, Government of Karnataka",
    "eligibility": "Karnataka-domicile students (SC/ST/OBC) pursuing full-time PhD in select fields, with ≥55% in Master's",
    "amount": "₹10,000 per month",
    "application_deadline": "October–December (typically)",
    "official_website": "https://www.kadbco.org/",
    "level": "PhD",
    "category": "SC/ST/OBC",
    "description": "Karnataka state fellowship for SC/ST/OBC PhD students in select fields, providing ₹10,000 per month as research guidance support.",
    "requirements": {
      "caste": ["SC", "ST", "OBC"],
      "state": "Karnataka",
      "percentage": 55,
      "level": "PhD"
    }
  },
  {
    "name": "Samagra Shikshana Karnataka Fellowship",
    "provider": "Department of Education, Government of Karnataka",
    "eligibility": "Regular postgraduate/professional degree holders (Social Sciences/Public Policy) with 3–10 years relevant work experience",
    "amount": "Monthly stipend of ₹70,000 for fellowship duration",
    "application_deadline": "February–March (typically)",
    "official_website": "https://samagra.karnataka.gov.in",
    "level": "Postgraduate/Professional",
    "category": "All",
    "description": "State fellowship for experienced social science or public policy professionals in Karnataka, offering a ₹70,000 monthly stipend to work on education initiatives.",
    "requirements": {
      "level": "PG",
      "course": ["social_sciences", "public_policy"],
      "experience": "3-10_years",
      "state": "Karnataka"
    }
  },
  {
    "name": "Vidyanidhi Scholarship (NSP)",
    "provider": "National Scholarship Portal (Government of India)",
    "eligibility": "All Indian students as per various national scholarship criteria",
    "amount": "Varies (depends on specific scholarship)",
    "application_deadline": "Varies (NSP deadlines)",
    "official_website": "https://www.scholarships.gov.in",
    "level": "School/UG/PG",
    "category": "All",
    "description": "Umbrella term for multiple scholarships offered through the National Scholarship Portal; eligibility and benefits depend on individual schemes listed on NSP."
  },
  {
    "name": "Central Sector Scheme of Scholarship for SC Students (CSSS)",
    "provider": "Department of Social Justice and Empowerment, Government of India",
    "eligibility": "SC students with family income ≤ ₹6 lakh pursuing higher education",
    "amount": "50% tuition fee reimbursement or ₹2,000/year (whichever is lower)",
    "application_deadline": "Varies",
    "official_website": "https://www.socialjustice.gov.in",
    "level": "UG/PG",
    "category": "SC",
    "description": "Central sector scholarship providing partial fee reimbursement for meritorious SC students in higher education.",
    "requirements": {
      "caste": "SC",
      "income": 600000,
      "level": "UG-PG"
    }
  },
  {
    "name": "Minister's Scholarship for SC/ST (Karnataka)",
    "provider": "Backward Classes Welfare Department, Government of Karnataka",
    "eligibility": "SC/ST students of Karnataka in professional courses (engineering, medicine, etc.)",
    "amount": "50% or 100% fee reimbursement (depending on income and category)",
    "application_deadline": "Varies",
    "official_website": "http://scholarships.karnataka.gov.in",
    "level": "UG/PG",
    "category": "SC/ST",
    "description": "State scholarship covering 50% or 100% of tuition fees for SC/ST students of Karnataka in professional education, based on income criteria.",
    "requirements": {
      "caste": ["SC", "ST"],
      "state": "Karnataka",
      "course_type": "professional"
    }
  }
];

export type Scholarship = typeof scholarshipsData[0];
