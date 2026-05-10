// Comprehensive Physics Career Data — Real-World Aligned
// All salary ranges, exam info, eligibility criteria are based on actual Indian context (2024-2025 data)

const physicsCareerData = {
  subject: "Physics",
  description: "Physics is the fundamental science that studies matter, energy, and their interactions. Choosing physics opens doors to an incredibly diverse range of careers spanning from pure research to cutting-edge technology, defense, space exploration, and even unconventional paths like law and journalism.",
  
  careers: [
    // ===== PURE SCIENCE / RESEARCH =====
    {
      id: "physicist",
      title: "Physicist / Research Scientist",
      category: "Pure Science & Research",
      icon: "⚛️",
      shortDesc: "Explore the fundamental laws of the universe through theoretical and experimental research.",
      description: "Physicists investigate the fundamental nature of the universe — from subatomic particles to cosmic structures. They develop theories, design experiments, and use advanced mathematics to explain natural phenomena. Work environments include universities, national labs like TIFR, IISER, and international organizations like CERN.",
      dailyLife: "A typical day involves analyzing experimental data, running simulations, writing research papers, attending seminars, mentoring students, and collaborating with international teams. The work is intellectually demanding but deeply satisfying for curious minds.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "Take PCM (Physics, Chemistry, Mathematics). Score well in board exams. Build strong conceptual foundation in Mechanics, Thermodynamics, Optics, and Modern Physics." },
        { step: 2, title: "Bachelor's Degree", detail: "B.Sc. Physics (3 years) from a reputed university OR Integrated M.Sc. from IISERs, NISER, IISc, or Central Universities. Focus on Mathematical Physics, Quantum Mechanics, Electrodynamics." },
        { step: 3, title: "Master's Degree", detail: "M.Sc. Physics (2 years). Specialize in a subfield: Condensed Matter, High Energy Physics, Astrophysics, etc. Publish at least one research paper." },
        { step: 4, title: "PhD", detail: "Ph.D. in Physics (4-6 years). Join a research group at IISc, TIFR, IITs, or go abroad to universities like MIT, Cambridge, Caltech. Publish multiple papers." },
        { step: 5, title: "Post-Doctoral Research", detail: "1-3 years of postdoc at international labs. Build independent research profile." },
        { step: 6, title: "Faculty/Scientist Position", detail: "Apply for permanent positions at universities or national research labs." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Chemistry (for 11-12)"],
      keyExams: [
        { name: "IIT JAM", description: "Joint Admission test for M.Sc. at IITs. Conducted in February annually.", difficulty: "Moderate-Hard" },
        { name: "JEST", description: "Joint Entrance Screening Test for Ph.D. admissions at premier research institutes.", difficulty: "Hard" },
        { name: "CSIR NET/JRF", description: "National Eligibility Test by CSIR for Junior Research Fellowship and lectureship.", difficulty: "Hard" },
        { name: "GATE Physics", description: "Graduate Aptitude Test. Opens doors to M.Tech, PSU jobs, and research fellowships.", difficulty: "Moderate-Hard" },
        { name: "IISER Aptitude Test", description: "For admission to 5-year Integrated MS program at IISERs.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "TIFR GS", description: "TIFR Graduate School entrance for Ph.D. program." },
        { name: "NBHM Scholarship", description: "National Board for Higher Mathematics scholarship for math-oriented physics students." },
        { name: "Inspire Scholarship (DST)", description: "Government scholarship awarded based on board exam rank for pursuing basic sciences." }
      ],
      perks: [
        "Intellectual fulfillment — you literally unravel the universe",
        "Salary: ₹6-15 LPA (early career), ₹15-40 LPA (established researcher/professor)",
        "International travel for conferences and collaborations",
        "Job security in government positions (IITs, IISERs, DRDO labs)",
        "Contribute to humanity's understanding of nature",
        "Highly respected in academic circles globally"
      ],
      risks: [
        "Very long education path (10-15 years post school)",
        "Limited industry positions in India for pure physics",
        "High competition for permanent academic positions",
        "Initial stipends are modest (₹25,000-37,000/month during PhD)",
        "Publish or perish culture can be stressful",
        "May need to relocate internationally for best opportunities"
      ],
      socialImpact: "Physicists drive technological revolutions. From MRI machines to solar cells to the internet — all originated from physics research. Climate modeling, renewable energy, and quantum computing are current frontiers.",
      eligibility: {
        minQualification: "Ph.D. in Physics for research/faculty positions",
        ageLimit: "No strict age limit for academic positions",
        physicalReq: "None specific",
        other: "Strong mathematical aptitude essential"
      },
      salaryRange: { entry: "₹6-8 LPA", mid: "₹12-25 LPA", senior: "₹25-50+ LPA" }
    },

    {
      id: "astrophysicist",
      title: "Astrophysicist / Space Scientist",
      category: "Pure Science & Research",
      icon: "🔭",
      shortDesc: "Study stars, galaxies, black holes, and the cosmos using physics and mathematics.",
      description: "Astrophysicists study celestial objects and phenomena — from nearby planets to the most distant galaxies. They use telescopes, satellites, and computer simulations to understand the birth, life, and death of stars, the structure of galaxies, dark matter, dark energy, and the origin of the universe itself.",
      dailyLife: "Analyzing telescope data (radio, optical, X-ray), writing simulation code in Python/C++, interpreting results, writing research papers, presenting at international conferences. Some nights may involve telescope observations. Collaboration with ISRO, NASA, ESA teams.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM with strong focus on Physics and Mathematics. Practice problems from HC Verma and Irodov." },
        { step: 2, title: "Bachelor's Degree", detail: "B.Sc. Physics/Astronomy from top universities. IISERs and IISc offer excellent programs." },
        { step: 3, title: "Master's Degree", detail: "M.Sc. in Physics/Astronomy. IIA Bangalore, ARIES Nainital, IUCAA Pune offer specialized programs." },
        { step: 4, title: "PhD", detail: "Ph.D. in Astrophysics at TIFR, IIA, IUCAA, RRI, or international universities." },
        { step: 5, title: "Postdoc & Faculty", detail: "Postdoctoral research followed by permanent positions at research institutes." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Computer Programming"],
      keyExams: [
        { name: "JEST", description: "For PhD admissions at IUCAA, IIA, RRI, HRI, etc.", difficulty: "Hard" },
        { name: "IIT JAM", description: "For M.Sc. at IITs in Physics.", difficulty: "Moderate-Hard" },
        { name: "CSIR NET", description: "For JRF and lectureship eligibility.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "ISRO Centralized Recruitment", description: "For scientist positions at ISRO centers." },
        { name: "IIA Joint Astronomy Programme", description: "Specialized entry to IIA Bangalore's PhD program." }
      ],
      perks: [
        "Work on the most awe-inspiring questions in science",
        "Salary: ₹8-15 LPA (early), ₹20-45 LPA (senior scientist)",
        "Access to world-class telescopes and satellites",
        "Active Indian space program (ISRO) offers exciting opportunities",
        "International collaborations with NASA, ESA, CERN"
      ],
      risks: [
        "Very niche field with limited positions",
        "Long academic journey required",
        "Most opportunities concentrated in few cities",
        "Need strong programming skills alongside physics"
      ],
      socialImpact: "Astrophysics research has led to GPS technology, satellite communications, medical imaging innovations, and understanding climate change from a planetary perspective.",
      eligibility: {
        minQualification: "Ph.D. in Physics/Astrophysics",
        ageLimit: "Variable by institution",
        physicalReq: "None",
        other: "Programming skills (Python, C++) essential"
      },
      salaryRange: { entry: "₹8-12 LPA", mid: "₹15-30 LPA", senior: "₹30-50+ LPA" }
    },

    {
      id: "quantum_computing",
      title: "Quantum Computing Researcher",
      category: "Emerging Technology",
      icon: "🔮",
      shortDesc: "Build the next generation of computers using quantum mechanics principles.",
      description: "Quantum computing researchers work at the intersection of physics, computer science, and mathematics. They develop quantum algorithms, design quantum hardware (qubits), and explore applications in cryptography, drug discovery, financial modeling, and AI. This is one of the hottest career paths globally.",
      dailyLife: "Writing quantum algorithms using Qiskit/Cirq, experimenting with quantum hardware, collaborating with tech companies (IBM, Google, Microsoft), publishing papers, and teaching. Mix of theoretical and experimental work.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Extra focus on Physics (Modern Physics, Quantum concepts) and Mathematics." },
        { step: 2, title: "Bachelor's", detail: "B.Tech CS/Physics from IITs/IISc or B.Sc. Physics from IISERs. Take electives in quantum mechanics." },
        { step: 3, title: "Master's", detail: "M.Tech in Quantum Computing (IISc, IIT Madras offer programs) or M.Sc. Physics with quantum info specialization." },
        { step: 4, title: "PhD/Industry", detail: "PhD at top labs or join quantum computing startups/MNCs (IBM, Google, Microsoft, TCS Quantum Lab)." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Computer Science", "Linear Algebra"],
      keyExams: [
        { name: "JEE Advanced", description: "For IITs B.Tech programs.", difficulty: "Very Hard" },
        { name: "GATE CS/Physics", description: "For M.Tech/PhD admissions and PSU recruitment.", difficulty: "Hard" },
        { name: "IISER Aptitude Test", description: "For integrated MS in basic sciences.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "IBM Quantum Certifications", description: "Industry certifications for quantum computing." },
        { name: "Google Quantum AI Internships", description: "Competitive but excellent entry point." }
      ],
      perks: [
        "Salaries among the highest in tech: ₹15-40 LPA entry, ₹50-2 Cr internationally",
        "Working on technology that will transform the world",
        "High demand, very few qualified professionals",
        "Opportunities at top global companies",
        "Field is growing exponentially"
      ],
      risks: [
        "Still an emerging field — commercial applications are limited currently",
        "Requires extremely strong mathematical background",
        "Most cutting-edge work is outside India currently",
        "Technology is evolving rapidly — need to constantly upskill"
      ],
      socialImpact: "Quantum computing will revolutionize drug discovery (simulating molecules), optimize logistics, break and create new encryption, and solve currently unsolvable problems.",
      eligibility: {
        minQualification: "M.Tech/M.Sc. or PhD in relevant field",
        ageLimit: "None",
        physicalReq: "None",
        other: "Strong programming and math skills mandatory"
      },
      salaryRange: { entry: "₹15-30 LPA", mid: "₹30-80 LPA", senior: "₹80 LPA - 2 Cr+" }
    },

    {
      id: "nuclear_physicist",
      title: "Nuclear Physicist / Nuclear Engineer",
      category: "Pure Science & Research",
      icon: "☢️",
      shortDesc: "Work with nuclear energy, reactors, and particle physics.",
      description: "Nuclear physicists study atomic nuclei, nuclear reactions, and their applications. They work in nuclear power plants, research reactors (BARC), particle accelerators, and medical physics. India's nuclear program under DAE (Department of Atomic Energy) is a major employer.",
      dailyLife: "Running experiments at nuclear reactors, analyzing radiation data, designing safety protocols, working with isotopes for medical/industrial uses, and collaborating on nuclear energy policy.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Strong understanding of Atomic Physics and Nuclear Physics chapters." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics or B.E./B.Tech in Nuclear Engineering (select IITs offer this)." },
        { step: 3, title: "BARC Training School", detail: "Clear BARC OCES/DGFS exam → 1-year training at BARC Training School in Mumbai." },
        { step: 4, title: "Scientist at DAE/BARC", detail: "Appointed as Scientific Officer at BARC, IGCAR, or other DAE facilities." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Chemistry"],
      keyExams: [
        { name: "BARC OCES/DGFS", description: "Online exam + interview for BARC Training School. Based on GATE score.", difficulty: "Hard" },
        { name: "GATE", description: "Required for BARC entry and other PSU positions.", difficulty: "Hard" },
        { name: "JEST", description: "For PhD at nuclear research institutes.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "NPCIL Recruitment", description: "Nuclear Power Corporation of India recruitment through GATE." },
        { name: "AERB Recruitment", description: "Atomic Energy Regulatory Board positions." }
      ],
      perks: [
        "Government job with excellent benefits and job security",
        "Salary: ₹8-12 LPA (starting), ₹20-50 LPA (senior scientist)",
        "BARC provides heavily subsidized housing, medical, education",
        "Work on nationally important projects",
        "Prestigious and impactful career"
      ],
      risks: [
        "Radiation safety concerns (well-managed but present)",
        "Limited number of positions annually",
        "Work locations may be remote (Kalpakkam, Tarapur, etc.)",
        "Highly classified work — limited academic freedom"
      ],
      socialImpact: "Nuclear energy is key to India's clean energy future. Nuclear medicine saves millions of lives through cancer treatment and diagnostics. Nuclear technology is also critical for national security.",
      eligibility: {
        minQualification: "B.E./B.Tech or M.Sc. Physics",
        ageLimit: "Generally below 26 years for BARC Training School",
        physicalReq: "Medical fitness certificate required",
        other: "Valid GATE score required for BARC entry"
      },
      salaryRange: { entry: "₹8-12 LPA", mid: "₹15-30 LPA", senior: "₹30-50+ LPA" }
    },

    // ===== ENGINEERING PATHS =====
    {
      id: "mechanical_engineer",
      title: "Mechanical Engineer",
      category: "Engineering",
      icon: "⚙️",
      shortDesc: "Design, analyze, and manufacture mechanical systems — from tiny sensors to massive power plants.",
      description: "Mechanical Engineering is the broadest engineering discipline, deeply rooted in physics (especially mechanics, thermodynamics, and material science). Mechanical engineers design everything from automobiles and aircraft to HVAC systems and robotics.",
      dailyLife: "CAD modeling, stress analysis, prototyping, factory floor visits, team meetings, testing products, working with manufacturing teams. Mix of desk work and hands-on engineering.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Focus on Mechanics, Thermodynamics, Waves, and Properties of Matter." },
        { step: 2, title: "B.Tech Mechanical", detail: "4-year degree from IITs, NITs, or other AICTE-approved colleges. Core subjects: Fluid Mechanics, Thermodynamics, Manufacturing, Machine Design." },
        { step: 3, title: "Industry/Higher Studies", detail: "Join companies like Tata Motors, L&T, Mahindra or pursue M.Tech/MBA for specialization." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Chemistry"],
      keyExams: [
        { name: "JEE Main", description: "For admission to NITs, IIITs, and government engineering colleges.", difficulty: "Hard" },
        { name: "JEE Advanced", description: "For admission to IITs. Only top 2.5 lakh from JEE Main can attempt.", difficulty: "Very Hard" },
        { name: "GATE ME", description: "For M.Tech admissions and PSU recruitment.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "BITSAT", description: "For BITS Pilani admission." },
        { name: "State CETs", description: "State-level engineering entrance exams (MHT-CET, KCET, WBJEE, etc.)." },
        { name: "VITEEE", description: "VIT entrance exam." }
      ],
      perks: [
        "Extremely versatile — work in any industry",
        "Salary: ₹4-10 LPA (entry), ₹15-40 LPA (experienced)",
        "Can transition to management, consulting, or entrepreneurship",
        "Strong demand domestically and internationally",
        "Hands-on satisfying work — you see things you build"
      ],
      risks: [
        "Core mechanical jobs may have lower starting salaries than IT",
        "Some roles require relocation to factory/plant locations",
        "Market is competitive — tier matters for placements",
        "Automation may change some traditional roles"
      ],
      socialImpact: "Mechanical engineers build infrastructure, vehicles, energy systems, and medical devices that directly improve quality of life. They are central to India's manufacturing and defense sectors.",
      eligibility: {
        minQualification: "B.Tech/B.E. in Mechanical Engineering",
        ageLimit: "None for private sector",
        physicalReq: "None",
        other: "Strong foundation in physics and mathematics"
      },
      salaryRange: { entry: "₹4-10 LPA", mid: "₹12-25 LPA", senior: "₹25-60+ LPA" }
    },

    {
      id: "aerospace_engineer",
      title: "Aerospace Engineer",
      category: "Engineering",
      icon: "🚀",
      shortDesc: "Design aircraft, spacecraft, satellites, and missiles.",
      description: "Aerospace engineers apply physics (aerodynamics, propulsion, orbital mechanics) to design and build flying machines and space vehicles. In India, ISRO, HAL, DRDO, and private companies like Skyroot Aerospace offer exciting opportunities.",
      dailyLife: "CFD simulations, wind tunnel testing, structural analysis, designing propulsion systems, testing components, reviewing safety protocols. Highly technical and team-oriented work.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Master Mechanics, Fluid Dynamics concepts, and Gravitation." },
        { step: 2, title: "B.Tech Aerospace", detail: "From IIT Bombay, IIT Madras, IIT Kanpur, IISc. Also available at IIST Trivandrum (ISRO's own institute)." },
        { step: 3, title: "Career Entry", detail: "Join ISRO (through IIST placement or ISRO recruitment), HAL, DRDO, NAL, or private aerospace startups." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Computer Science"],
      keyExams: [
        { name: "JEE Advanced", description: "For IITs.", difficulty: "Very Hard" },
        { name: "IIST Admission (via JEE Advanced)", description: "Indian Institute of Space Science and Technology — direct pathway to ISRO.", difficulty: "Very Hard" },
        { name: "ISRO Centralized Recruitment", description: "For Scientist/Engineer positions at ISRO centers.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "GATE AE", description: "For M.Tech admission and PSU recruitment." },
        { name: "DRDO SET", description: "Scientists' Entry Test for DRDO." },
        { name: "HAL Management Trainee", description: "Through GATE score." }
      ],
      perks: [
        "Work on India's space missions, fighter jets, missiles",
        "Salary: ₹8-15 LPA (entry), ₹20-50 LPA (senior)",
        "National pride and prestige",
        "Government benefits if at ISRO/DRDO/HAL",
        "Growing private space industry in India"
      ],
      risks: [
        "Limited seats in aerospace engineering programs",
        "Major employers are government — slower growth path",
        "Security clearances required for defense work",
        "Work locations may be in specific cities only"
      ],
      socialImpact: "Aerospace engineers build communication satellites, weather monitoring systems, GPS, defense systems, and enable space exploration — directly impacting national security and connectivity.",
      eligibility: {
        minQualification: "B.Tech Aerospace/Mechanical Engineering",
        ageLimit: "Varies by organization (28-35 for ISRO/DRDO)",
        physicalReq: "None",
        other: "Indian citizenship required for defense/space organizations"
      },
      salaryRange: { entry: "₹8-15 LPA", mid: "₹18-35 LPA", senior: "₹35-60+ LPA" }
    },

    {
      id: "electrical_engineer",
      title: "Electrical / Electronics Engineer",
      category: "Engineering",
      icon: "⚡",
      shortDesc: "Design circuits, power systems, semiconductors, and electronic devices.",
      description: "Deeply connected to Electromagnetism and Quantum Physics, electrical/electronics engineers design everything from microchips to power grids. This is one of the most versatile engineering branches with applications across all industries.",
      dailyLife: "Circuit design and simulation, PCB layout, embedded systems programming, power system analysis, semiconductor fabrication oversight, testing and quality assurance.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Master Electrostatics, Current Electricity, Magnetism, EMI, and Semiconductor Physics." },
        { step: 2, title: "B.Tech EE/ECE", detail: "4-year degree from IITs, NITs, BITS. Core: Circuit Theory, Signals & Systems, Digital Electronics, Power Systems." },
        { step: 3, title: "Industry", detail: "Join companies like Intel, Qualcomm, Texas Instruments, BHEL, NTPC, or startups. Or pursue M.Tech/MBA." }
      ],
      requiredSubjects: ["Physics", "Mathematics"],
      keyExams: [
        { name: "JEE Main + Advanced", description: "For IITs and NITs.", difficulty: "Very Hard" },
        { name: "GATE EE/ECE", description: "For M.Tech and PSU jobs (BHEL, NTPC, PGCIL, etc.).", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "ESE (Engineering Services Exam)", description: "For Class-1 government engineering positions." },
        { name: "State Electricity Board exams", description: "For state-level power sector jobs." }
      ],
      perks: [
        "Very high demand across industries",
        "Salary: ₹5-12 LPA (entry), ₹15-50 LPA (experienced)",
        "PSU jobs offer excellent stability and benefits",
        "Semiconductor industry boom in India (₹76,000 Cr investment)",
        "Can work in power, telecom, IT, automotive, or research"
      ],
      risks: [
        "Competitive field with many graduates",
        "Keep up with rapidly evolving technology",
        "Core EE jobs may require working at plant sites"
      ],
      socialImpact: "Electrification, telecommunications, renewable energy, and the entire digital revolution are built by electrical engineers.",
      eligibility: {
        minQualification: "B.Tech/B.E. in EE/ECE",
        ageLimit: "None for private sector; 21-30 for ESE",
        physicalReq: "None",
        other: "Strong analytical and mathematical skills"
      },
      salaryRange: { entry: "₹5-12 LPA", mid: "₹12-30 LPA", senior: "₹30-70+ LPA" }
    },

    {
      id: "robotics_engineer",
      title: "Robotics Engineer",
      category: "Engineering",
      icon: "🤖",
      shortDesc: "Build intelligent machines that can interact with the physical world.",
      description: "Robotics combines physics (mechanics, kinematics), electronics, and computer science to build autonomous machines. From industrial robots to surgical robots to Mars rovers — this field is exploding with possibilities.",
      dailyLife: "Designing robotic mechanisms, programming robot controllers, sensor integration, testing prototypes, working with AI teams for autonomous behavior, 3D printing parts.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Build hobby robots, participate in robotics competitions." },
        { step: 2, title: "Bachelor's", detail: "B.Tech in Mechanical/Electrical/CS from IITs/NITs. Some colleges offer B.Tech Robotics." },
        { step: 3, title: "Specialization", detail: "M.Tech in Robotics (IIT Kanpur, IISc offer programs) or MS abroad at CMU/MIT/ETH Zurich." },
        { step: 4, title: "Industry/Research", detail: "Join companies like Boston Dynamics, ABB, Kuka, or Indian startups. Or pursue PhD research." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Computer Science", "Electronics"],
      keyExams: [
        { name: "JEE Main + Advanced", description: "For engineering admission.", difficulty: "Very Hard" },
        { name: "GATE (ME/EE/CS)", description: "For M.Tech admissions.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "RoboCup / Robocon", description: "International robotics competitions that boost your profile." },
        { name: "GRE", description: "For MS programs abroad.", difficulty: "Moderate" }
      ],
      perks: [
        "One of the fastest growing fields globally",
        "Salary: ₹8-20 LPA (entry), ₹30-80 LPA (experienced globally)",
        "Creative and hands-on — you build things that move",
        "Interdisciplinary — never boring",
        "High demand in manufacturing, healthcare, defense, agriculture"
      ],
      risks: [
        "Requires expertise in multiple domains (hard to master all)",
        "Indian robotics industry is still developing",
        "Best opportunities may be abroad initially",
        "Requires continuous learning"
      ],
      socialImpact: "Robots assist in surgery, disaster rescue, agriculture automation, elderly care, and manufacturing — directly improving human safety and productivity.",
      eligibility: {
        minQualification: "B.Tech in relevant engineering",
        ageLimit: "None",
        physicalReq: "None",
        other: "Programming and hands-on building skills essential"
      },
      salaryRange: { entry: "₹8-15 LPA", mid: "₹20-50 LPA", senior: "₹50 LPA - 1 Cr+" }
    },

    // ===== TECHNOLOGY PATHS =====
    {
      id: "data_scientist",
      title: "Data Scientist / AI Researcher",
      category: "Technology",
      icon: "📊",
      shortDesc: "Use physics thinking and mathematical rigor to extract insights from data and build AI.",
      description: "Physics graduates are exceptionally well-suited for data science and AI because of their strong mathematical foundation (linear algebra, calculus, statistics, differential equations). Many top AI researchers have physics backgrounds. The analytical thinking trained in physics directly translates to machine learning.",
      dailyLife: "Analyzing large datasets, building ML models, writing Python code, presenting findings, A/B testing, deploying models to production, collaborating with product teams.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Learn basic programming (Python)." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics or B.Tech CS/EE. Take statistics and programming courses." },
        { step: 3, title: "Skills Building", detail: "Learn Machine Learning, Deep Learning, NLP, Computer Vision. Online courses + projects." },
        { step: 4, title: "Career Entry", detail: "Join as Data Analyst → Data Scientist → Lead/Principal. Or pursue MS in AI/DataSci abroad." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Statistics", "Computer Science (Python/R)"],
      keyExams: [
        { name: "JEE/University Entrance", description: "For B.Tech/B.Sc. admission.", difficulty: "Varies" },
        { name: "GRE", description: "For MS abroad if taking that path.", difficulty: "Moderate" }
      ],
      alternativeExams: [
        { name: "Google/AWS/Azure ML Certifications", description: "Industry-recognized credentials." },
        { name: "Kaggle Competitions", description: "Build portfolio through competitive data science." }
      ],
      perks: [
        "Among the highest-paying careers: ₹10-25 LPA (entry India), $120-200K (US entry)",
        "Remote work opportunities",
        "Physics background gives you an edge in mathematical modeling",
        "Applicable across every industry",
        "Rapidly growing demand — not enough qualified professionals"
      ],
      risks: [
        "Field is becoming competitive as more people enter",
        "Need to continuously learn new tools and techniques",
        "Pure physics degree may need supplementation with CS/ML skills",
        "Hype cycle — some roles may be repackaged analytics"
      ],
      socialImpact: "AI and data science are transforming healthcare (disease prediction), climate science (weather modeling), education (personalized learning), and governance (evidence-based policy).",
      eligibility: {
        minQualification: "Bachelor's degree (any quantitative field)",
        ageLimit: "None",
        physicalReq: "None",
        other: "Strong programming and statistics skills"
      },
      salaryRange: { entry: "₹8-20 LPA", mid: "₹20-50 LPA", senior: "₹50 LPA - 1.5 Cr+" }
    },

    {
      id: "software_developer",
      title: "Software Developer",
      category: "Technology",
      icon: "💻",
      shortDesc: "Build applications and systems using computational thinking rooted in physics.",
      description: "Many physicists transition into software development because problem-solving, logical thinking, and mathematical modeling are core to both fields. Physics graduates work at Google, Microsoft, Goldman Sachs, and top startups. Companies value the rigorous analytical training.",
      dailyLife: "Writing code, debugging, system design, code reviews, sprint planning, deploying features, collaborating with designers and product managers.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Start learning programming — Python, C++, or JavaScript." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics + self-learn CS, or B.Tech CS. Build projects and contribute to open source." },
        { step: 3, title: "Skills + Portfolio", detail: "Master DSA, System Design. Build real projects. Intern at tech companies." },
        { step: 4, title: "Career", detail: "Join as SDE → Senior SDE → Tech Lead → Architect. Many paths available." }
      ],
      requiredSubjects: ["Physics/Mathematics", "Computer Science", "Data Structures"],
      keyExams: [
        { name: "Coding Contests", description: "Codeforces, LeetCode, CodeChef — build competitive programming profile.", difficulty: "Varies" },
        { name: "Company-specific OAs", description: "Online assessments by Google, Amazon, Microsoft, etc.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "Google Kickstart", description: "Programming competition for hiring." },
        { name: "ICPC", description: "International Collegiate Programming Contest." }
      ],
      perks: [
        "High salaries: ₹6-25 LPA (entry India), much higher at top companies",
        "Remote work flexibility",
        "Creative problem solving every day",
        "Huge job market — always in demand",
        "Easy to freelance or start own company"
      ],
      risks: [
        "Competitive entry to top companies",
        "Technology changes rapidly — continuous learning needed",
        "Can be sedentary — health considerations",
        "Burnout risk under tight deadlines"
      ],
      socialImpact: "Software powers everything from UPI payments to telemedicine to online education, directly impacting billions of lives.",
      eligibility: {
        minQualification: "Any degree + strong programming skills",
        ageLimit: "None",
        physicalReq: "None",
        other: "Portfolio and coding skills matter more than degree"
      },
      salaryRange: { entry: "₹6-20 LPA", mid: "₹20-50 LPA", senior: "₹50 LPA - 1 Cr+" }
    },

    // ===== DEFENSE & GOVERNMENT =====
    {
      id: "isro_scientist",
      title: "ISRO Scientist",
      category: "Defense & Government",
      icon: "🛰️",
      shortDesc: "Build rockets, satellites, and space missions for India.",
      description: "Working at ISRO (Indian Space Research Organisation) is a dream for many physics students. ISRO scientists design launch vehicles, satellites, navigation systems (NavIC), and deep space missions (Chandrayaan, Mangalyaan, Aditya-L1). It's one of the most prestigious scientific careers in India.",
      dailyLife: "Designing spacecraft subsystems, testing rocket engines, mission planning, satellite integration, ground station operations, data analysis from space missions.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Strong conceptual understanding of all physics topics." },
        { step: 2, title: "Bachelor's", detail: "B.Tech from IIST Trivandrum (direct ISRO placement) or B.Tech/B.E. from IITs/NITs or B.Sc. Physics." },
        { step: 3, title: "ISRO Entry", detail: "Through IIST placement OR ISRO Centralized Recruitment exam OR through GATE score." },
        { step: 4, title: "Career Growth", detail: "Scientist/Engineer 'SC' → SD → SE → SF → SG → 'H' → Distinguished Scientist." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Computer Science (helpful)"],
      keyExams: [
        { name: "ISRO Centralized Recruitment", description: "Written exam + interview for Scientist/Engineer positions. Conducted periodically.", difficulty: "Hard" },
        { name: "JEE Advanced (for IIST)", description: "IIST admission is through JEE Advanced.", difficulty: "Very Hard" },
        { name: "GATE", description: "Alternative pathway through GATE score.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "ISRO Research Fellowship", description: "For PhD scholars at ISRO centers." },
        { name: "RESPOND Program", description: "University collaboration with ISRO." }
      ],
      perks: [
        "National pride — you literally launch rockets",
        "Salary: ₹8-12 LPA (entry Scientist SC), ₹20-40 LPA (senior)",
        "Government benefits: housing, pension, medical, LTC",
        "Work on Chandrayaan, Gaganyaan, and future Moon/Mars missions",
        "Highly respected career in India"
      ],
      risks: [
        "Limited positions — very competitive",
        "Salary lower than private sector IT for same qualifications",
        "Work locations: primarily Bengaluru, Thiruvananthapuram, Sriharikota, Ahmedabad",
        "Classified projects — can't discuss work publicly"
      ],
      socialImpact: "ISRO's work in remote sensing, disaster management, telemedicine, tele-education, and navigation (NavIC) directly benefits 1.4 billion Indians. India's space program costs less per mission than a Hollywood movie budget.",
      eligibility: {
        minQualification: "B.E./B.Tech or M.Sc. Physics",
        ageLimit: "Generally below 28-35 years",
        physicalReq: "Medical fitness",
        other: "Indian citizenship mandatory"
      },
      salaryRange: { entry: "₹8-12 LPA", mid: "₹15-30 LPA", senior: "₹30-50+ LPA" }
    },

    {
      id: "drdo_scientist",
      title: "DRDO Scientist (Defense Research)",
      category: "Defense & Government",
      icon: "🛡️",
      shortDesc: "Develop weapons systems, radar, missiles, and defense technologies.",
      description: "DRDO (Defence Research and Development Organisation) is India's premier defense research body. Physicists work on missile systems (BrahMos, Agni), radar technology, electronic warfare, naval systems, and materials science for defense applications.",
      dailyLife: "Research and development of defense systems, testing prototypes, simulation and modeling, field trials, collaboration with armed forces, classified project management.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Strong foundation in all physics branches." },
        { step: 2, title: "Bachelor's", detail: "B.E./B.Tech or B.Sc. Physics with distinction." },
        { step: 3, title: "DRDO Entry", detail: "Clear DRDO SET (Scientists Entry Test) OR get recruited through GATE score." },
        { step: 4, title: "Career Growth", detail: "Scientist B → C → D → E → F → G → H → Distinguished Scientist." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Electronics/CS (helpful)"],
      keyExams: [
        { name: "DRDO SET", description: "DRDO Scientists Entry Test — comprehensive exam covering engineering/science.", difficulty: "Hard" },
        { name: "GATE", description: "Alternative pathway.", difficulty: "Hard" },
        { name: "RAC Interview", description: "Recruitment and Assessment Centre interview after written test.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "DRDO JRF", description: "Junior Research Fellowship at DRDO labs." },
        { name: "DRDO Apprenticeship", description: "1-year apprenticeship program for graduates." }
      ],
      perks: [
        "Serve the nation's defense — deeply meaningful work",
        "Salary: ₹8-12 LPA (entry), ₹20-50 LPA (senior)",
        "Government benefits: housing, pension, medical",
        "Work on cutting-edge technology",
        "50+ labs across India with diverse research areas"
      ],
      risks: [
        "Classified work — no publications or public recognition",
        "Government bureaucracy can be slow",
        "Transfers possible across India",
        "Some labs in remote locations"
      ],
      socialImpact: "DRDO ensures India's national security and strategic autonomy. Spin-off technologies benefit civilian sectors including healthcare, agriculture, and communications.",
      eligibility: {
        minQualification: "B.E./B.Tech or M.Sc.",
        ageLimit: "Below 28 years (relaxable for reserved categories)",
        physicalReq: "Medical fitness, security clearance",
        other: "Indian citizenship mandatory"
      },
      salaryRange: { entry: "₹8-12 LPA", mid: "₹15-30 LPA", senior: "₹30-50+ LPA" }
    },

    {
      id: "ias_officer",
      title: "IAS / Civil Services Officer",
      category: "Government & Administration",
      icon: "🏛️",
      shortDesc: "Become an administrator who governs and shapes policies for the nation.",
      description: "Many physics graduates crack UPSC and become IAS, IPS, or IFS officers. Physics is one of the most popular optional subjects for UPSC Civil Services Exam. The analytical thinking and problem-solving skills from physics translate directly to administrative capabilities.",
      dailyLife: "As a District Magistrate: overseeing administration, law and order, development programs, meeting citizens, coordinating with police/health/education departments, handling crises. At center: policy making and implementation.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Start developing general awareness and reading habits." },
        { step: 2, title: "Bachelor's (any)", detail: "Any degree qualifies. B.Sc. Physics or B.Tech + optional coaching." },
        { step: 3, title: "UPSC Preparation", detail: "1-2 years dedicated preparation. Optional subject: Physics (popular choice). Cover GS, CSAT, Essay, Interview." },
        { step: 4, title: "Service Entry", detail: "Training at LBSNAA Mussoorie → IAS/IPS/IFS/IRS posting." }
      ],
      requiredSubjects: ["Any graduate degree", "Physics optional is counted as advantage"],
      keyExams: [
        { name: "UPSC CSE", description: "Three-stage exam: Prelims (MCQ), Mains (written), Interview. India's toughest exam.", difficulty: "Extremely Hard" }
      ],
      alternativeExams: [
        { name: "State PSC", description: "State-level civil services — similar but less competitive." },
        { name: "UPSC CDS", description: "Combined Defence Services exam for military officer entry." },
        { name: "UPSC CAPF", description: "Central Armed Police Forces exam." }
      ],
      perks: [
        "Power and authority to make real change",
        "Salary: ₹8-12 LPA (entry) + massive perks (bungalow, car, staff, medical)",
        "Total compensation including perks: ₹20-50 LPA equivalent",
        "Highest social prestige in India",
        "Job security for life",
        "Opportunity to impact millions of lives directly"
      ],
      risks: [
        "Extremely competitive — success rate < 0.1%",
        "Takes 2-4 attempts typically (age limit: 32 for general)",
        "Transfers every 2-3 years across the state",
        "Political interference in work",
        "High stress and responsibility"
      ],
      socialImpact: "IAS officers govern districts, implement welfare schemes, manage disaster relief, and shape national policy. One officer can impact the lives of millions of citizens.",
      eligibility: {
        minQualification: "Any Bachelor's degree",
        ageLimit: "21-32 years (General), up to 37 (OBC), 37 (SC/ST). Max 6 attempts (General).",
        physicalReq: "Physical and medical fitness standards as prescribed",
        other: "Indian citizenship mandatory"
      },
      salaryRange: { entry: "₹8-12 LPA + perks", mid: "₹15-25 LPA + perks", senior: "₹25-40 LPA + perks" }
    },

    // ===== MEDICAL PHYSICS =====
    {
      id: "medical_physicist",
      title: "Medical Physicist",
      category: "Healthcare",
      icon: "🏥",
      shortDesc: "Apply physics to medicine — radiation therapy, MRI, CT scans, and nuclear medicine.",
      description: "Medical physicists ensure that radiation is used safely and effectively in hospitals for cancer treatment (radiation oncology), diagnostic imaging, and nuclear medicine. This is a niche but growing field in India with excellent career prospects.",
      dailyLife: "Calibrating radiation therapy machines, creating treatment plans for cancer patients, quality assurance of imaging equipment, radiation safety monitoring, collaborating with oncologists and radiologists.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Strong foundation in Modern Physics, Nuclear Physics, and Optics." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics from a good university." },
        { step: 3, title: "Master's", detail: "M.Sc. Medical Physics (offered by select institutions like BARC, Manipal University, Anna University)." },
        { step: 4, title: "Certification", detail: "AERB certification for clinical medical physics. 2 years residency training." },
        { step: 5, title: "Career", detail: "Join as Medical Physicist at major hospitals (AIIMS, Tata Memorial, Apollo, etc.)." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Biology (basic understanding helpful)"],
      keyExams: [
        { name: "University Entrance Exams", description: "For M.Sc. Medical Physics programs.", difficulty: "Moderate" },
        { name: "AERB Certification", description: "Mandatory for clinical practice in India.", difficulty: "Moderate" }
      ],
      alternativeExams: [
        { name: "AMPI Membership", description: "Association of Medical Physicists of India — professional certification." },
        { name: "CAMPEP Certification", description: "International standard for medical physics (US/Canada)." }
      ],
      perks: [
        "Directly save lives through cancer treatment",
        "Salary: ₹6-12 LPA (entry), ₹15-35 LPA (experienced)",
        "Growing demand with more cancer treatment centers opening",
        "Stable healthcare sector employment",
        "International opportunities — globally recognized skills"
      ],
      risks: [
        "Radiation exposure (well-managed with safety protocols)",
        "Limited training institutions in India",
        "Emotionally demanding — working with cancer patients",
        "Need to keep up with rapidly evolving medical technology"
      ],
      socialImpact: "Medical physicists ensure safe and effective radiation treatment for cancer patients. With cancer rates increasing, this field directly impacts life-saving treatment quality.",
      eligibility: {
        minQualification: "M.Sc. Medical Physics",
        ageLimit: "None for private hospitals",
        physicalReq: "Radiation health monitoring required",
        other: "AERB license mandatory for clinical work"
      },
      salaryRange: { entry: "₹6-12 LPA", mid: "₹12-25 LPA", senior: "₹25-40+ LPA" }
    },

    // ===== TEACHING =====
    {
      id: "professor",
      title: "Physics Professor / Teacher",
      category: "Education",
      icon: "📚",
      shortDesc: "Inspire the next generation by teaching physics at schools or universities.",
      description: "Teaching is one of the most fulfilling careers for physics enthusiasts. From school teachers who ignite curiosity in young minds to university professors who push the boundaries of knowledge — educators shape futures. India needs quality physics teachers desperately.",
      dailyLife: "Preparing lectures, teaching classes, designing experiments, grading, mentoring students, conducting research (for professors), creating study materials, departmental duties.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Develop strong communication skills alongside physics." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics with high grades." },
        { step: 3, title: "For School Teaching", detail: "B.Ed. (1-2 years) → CTET/TET exam → School teacher position." },
        { step: 4, title: "For College/Univ", detail: "M.Sc. Physics → NET/JRF → Ph.D. → Assistant Professor at universities." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Education (B.Ed.)"],
      keyExams: [
        { name: "CSIR NET/JRF", description: "For university/college lectureship eligibility.", difficulty: "Hard" },
        { name: "CTET/State TET", description: "Central/State Teacher Eligibility Test for school teaching.", difficulty: "Moderate" },
        { name: "KVS/NVS Recruitment", description: "Kendriya Vidyalaya / Navodaya Vidyalaya Sangathan recruitment.", difficulty: "Moderate" }
      ],
      alternativeExams: [
        { name: "SLET/SET", description: "State Level Eligibility Test for state university positions." },
        { name: "DSSSB", description: "Delhi Subordinate Services Selection Board for Delhi schools." }
      ],
      perks: [
        "Shape young minds — immense satisfaction",
        "Salary: ₹4-8 LPA (school), ₹8-15 LPA (assistant prof), ₹15-30 LPA (senior prof)",
        "Government teachers get excellent benefits and pension",
        "Long vacations, work-life balance",
        "Continuous intellectual engagement",
        "University professors can also do research"
      ],
      risks: [
        "School teaching salaries can be low in private schools",
        "University positions are very competitive",
        "Administrative burden alongside teaching",
        "Dealing with difficult students/parents"
      ],
      socialImpact: "One good teacher changes thousands of lives. Physics teachers inspire future scientists, engineers, doctors, and innovators. Education is the most direct way to impact society.",
      eligibility: {
        minQualification: "B.Sc. + B.Ed. (school) | M.Sc. + NET (college)",
        ageLimit: "Varies by recruitment body (25-40 typically)",
        physicalReq: "None",
        other: "Teaching aptitude and communication skills essential"
      },
      salaryRange: { entry: "₹3-8 LPA", mid: "₹8-20 LPA", senior: "₹20-35+ LPA" }
    },

    // ===== UNCONVENTIONAL =====
    {
      id: "patent_attorney",
      title: "Patent Attorney / IP Lawyer",
      category: "Unconventional",
      icon: "⚖️",
      shortDesc: "Protect inventions and innovations using your physics knowledge and legal expertise.",
      description: "Patent attorneys with a physics background are highly valued because they can understand complex technical inventions and protect them legally. This unique combination of science and law is lucrative and intellectually stimulating.",
      dailyLife: "Reading patent applications, writing technical claims, prior art searches, client consultations, court proceedings, patent prosecution, IP strategy advising.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Develop strong writing and analytical skills." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics or B.Tech." },
        { step: 3, title: "Law Degree", detail: "LLB (3 years) or switch to 5-year integrated law program. Specialize in IP law." },
        { step: 4, title: "Patent Agent Exam", detail: "Clear the Indian Patent Agent Examination conducted by Patent Office." },
        { step: 5, title: "Career", detail: "Join law firms, corporate IP departments, or set up independent practice." }
      ],
      requiredSubjects: ["Physics", "Law (LLB)", "Strong writing skills"],
      keyExams: [
        { name: "Indian Patent Agent Exam", description: "Conducted by Indian Patent Office to register as a patent agent.", difficulty: "Moderate" },
        { name: "CLAT", description: "Law entrance exam if pursuing law after 12th.", difficulty: "Moderate" },
        { name: "Bar Council Exam", description: "For practicing as an advocate.", difficulty: "Moderate" }
      ],
      alternativeExams: [
        { name: "USPTO Patent Bar", description: "US Patent Bar — if doing international patent work." }
      ],
      perks: [
        "Unique combination of science and law — very few people have this",
        "Salary: ₹8-15 LPA (entry), ₹25-80 LPA (experienced)",
        "US patent attorneys earn $150-300K+",
        "Growing IP awareness in India means growing demand",
        "Intellectually diverse work"
      ],
      risks: [
        "Need both science AND law education (long study period)",
        "Detail-oriented work — can be tedious",
        "Indian IP law market is still developing",
        "Need to keep up with both scientific and legal developments"
      ],
      socialImpact: "Patent attorneys protect innovation, enabling inventors to monetize their ideas and driving technological progress. Strong IP protection is crucial for economic development.",
      eligibility: {
        minQualification: "Science degree + LLB + Patent Agent registration",
        ageLimit: "None",
        physicalReq: "None",
        other: "Strong technical writing and analytical skills"
      },
      salaryRange: { entry: "₹8-15 LPA", mid: "₹20-50 LPA", senior: "₹50-80+ LPA" }
    },

    {
      id: "science_journalist",
      title: "Science Journalist / Communicator",
      category: "Unconventional",
      icon: "📝",
      shortDesc: "Translate complex physics into stories that the world can understand.",
      description: "Science journalists bridge the gap between scientific research and public understanding. With a physics background, you can explain complex topics like quantum mechanics, space exploration, and climate change to general audiences through articles, documentaries, podcasts, and social media.",
      dailyLife: "Researching scientific papers, interviewing scientists, writing articles/scripts, creating social media content, attending scientific conferences, fact-checking, producing video/audio content.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Start a science blog, participate in science fairs." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics (gives you credibility as a science writer)." },
        { step: 3, title: "Journalism Training", detail: "PG Diploma in Journalism/Mass Communication, or self-learn through practice." },
        { step: 4, title: "Build Portfolio", detail: "Freelance for science magazines, start YouTube channel, write for science websites." },
        { step: 5, title: "Career", detail: "Join media houses, research institutions' communication teams, or freelance independently." }
      ],
      requiredSubjects: ["Physics", "English", "Communication Skills"],
      keyExams: [
        { name: "No mandatory exam", description: "Portfolio and published work matter most.", difficulty: "N/A" }
      ],
      alternativeExams: [
        { name: "IIMC Entrance", description: "Indian Institute of Mass Communication entrance for journalism." }
      ],
      perks: [
        "Every day is different — cover diverse topics",
        "Salary: ₹4-10 LPA (entry), ₹15-40 LPA (established/international)",
        "Meet and interview world-class scientists",
        "Growing demand for science content creators",
        "Can work independently as content creator"
      ],
      risks: [
        "Media industry can be unstable",
        "Lower starting salaries compared to technical roles",
        "Deadline pressure and fast-paced environment",
        "Need strong writing skills beyond just science knowledge"
      ],
      socialImpact: "Science journalists combat misinformation, promote scientific literacy, and help citizens make informed decisions about health, environment, and technology.",
      eligibility: {
        minQualification: "Bachelor's degree (science preferred) + writing portfolio",
        ageLimit: "None",
        physicalReq: "None",
        other: "Excellent communication and writing skills essential"
      },
      salaryRange: { entry: "₹4-10 LPA", mid: "₹10-25 LPA", senior: "₹25-50+ LPA" }
    },

    {
      id: "meteorologist",
      title: "Meteorologist / Climate Scientist",
      category: "Environmental Science",
      icon: "🌤️",
      shortDesc: "Predict weather, study climate change, and protect communities.",
      description: "Meteorologists use atmospheric physics, fluid dynamics, and computational methods to forecast weather and study climate patterns. With climate change becoming critical, this field is more important than ever. India's IMD and IITM are major employers.",
      dailyLife: "Analyzing satellite/radar data, running weather models, preparing forecasts, issuing warnings for cyclones/floods, climate research, presenting weather on TV/radio.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Interest in weather patterns, earth sciences." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics/Atmospheric Science/Earth Science." },
        { step: 3, title: "Master's", detail: "M.Sc. Atmospheric Science/Meteorology from IIT Delhi, Cochin University, Andhra University." },
        { step: 4, title: "Career", detail: "Join IMD (India Meteorological Department), IITM Pune, NCMRWF, defense forces, or media." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Geography/Earth Science"],
      keyExams: [
        { name: "IMD Recruitment (via UPSC)", description: "For India Meteorological Department positions.", difficulty: "Hard" },
        { name: "GATE (PH/Atmospheric)", description: "For M.Tech/research positions.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "IITM JRF", description: "Junior Research Fellowship at Indian Institute of Tropical Meteorology." },
        { name: "NCMRWF Recruitment", description: "National Centre for Medium Range Weather Forecasting positions." }
      ],
      perks: [
        "Your forecasts save lives during natural disasters",
        "Salary: ₹6-12 LPA (govt), growing in private sector too",
        "Climate change ensures growing demand",
        "Prestigious government positions available",
        "Combination of field work and analytical work"
      ],
      risks: [
        "Limited positions in India",
        "Government recruitment cycles can be slow",
        "Need strong computational skills",
        "Forecast errors face public scrutiny"
      ],
      socialImpact: "Accurate weather forecasting saves thousands of lives during cyclones, floods, and heat waves. Climate research guides national policy on climate adaptation and mitigation.",
      eligibility: {
        minQualification: "M.Sc. Meteorology/Atmospheric Science/Physics",
        ageLimit: "Varies by recruitment body",
        physicalReq: "None",
        other: "Programming skills (Python, Fortran) very helpful"
      },
      salaryRange: { entry: "₹6-12 LPA", mid: "₹12-25 LPA", senior: "₹25-40+ LPA" }
    },

    {
      id: "quant_analyst",
      title: "Quantitative Analyst (Finance)",
      category: "Unconventional",
      icon: "📈",
      shortDesc: "Use physics math to model financial markets and build trading strategies.",
      description: "Quant analysts (or 'quants') use the same mathematical tools from physics — differential equations, stochastic calculus, statistical mechanics — to model financial markets, price derivatives, manage risk, and build algorithmic trading strategies. Wall Street and Dalal Street actively recruit physicists.",
      dailyLife: "Building mathematical models, writing code (Python/C++), analyzing market data, backtesting trading strategies, risk management, working with traders and portfolio managers.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Strong mathematical foundation." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics/Math or B.Tech from top institutions." },
        { step: 3, title: "Master's/PhD (preferred)", detail: "MSc/PhD in Physics/Math/Computational Finance. MFE programs if available." },
        { step: 4, title: "Career", detail: "Join investment banks, hedge funds, proprietary trading firms (Goldman Sachs, Morgan Stanley, Tower Research, Quadeye)." }
      ],
      requiredSubjects: ["Physics", "Mathematics (Advanced)", "Programming", "Statistics"],
      keyExams: [
        { name: "CFA", description: "Chartered Financial Analyst — globally recognized finance credential.", difficulty: "Hard" },
        { name: "FRM", description: "Financial Risk Manager certification.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "Quantitative Finance Interviews", description: "Brainteaser and math-heavy interviews at quant firms." }
      ],
      perks: [
        "Among the highest paying careers: ₹20-60 LPA entry in India, $200-500K+ internationally",
        "Intellectually stimulating — apply physics math to real-world markets",
        "Performance bonuses can be massive",
        "Physics background gives unique edge",
        "Work with brilliant minds"
      ],
      risks: [
        "High pressure environment",
        "Long working hours, especially during market volatility",
        "Performance-dependent compensation — job insecurity if underperforming",
        "Need very strong math — not just basic physics",
        "Ethical questions around algorithmic trading"
      ],
      socialImpact: "Quant models enable efficient capital allocation, risk management, and financial stability. However, poorly managed models can also cause market instability.",
      eligibility: {
        minQualification: "Strong quantitative degree (Physics/Math/CS) + programming",
        ageLimit: "None",
        physicalReq: "None",
        other: "Exceptional mathematical ability required"
      },
      salaryRange: { entry: "₹15-40 LPA", mid: "₹40-1 Cr", senior: "₹1-5 Cr+" }
    },

    {
      id: "game_developer",
      title: "Game Developer (Physics Engine)",
      category: "Unconventional",
      icon: "🎮",
      shortDesc: "Create realistic game physics — gravity, collisions, fluid dynamics in virtual worlds.",
      description: "Physics engine developers create the realistic motion, collisions, and interactions in video games. Understanding real-world physics is essential to simulate it digitally. Companies like Ubisoft, EA, Epic Games, and Indian studios need physics-savvy developers.",
      dailyLife: "Writing physics simulation code, optimizing performance, integrating with game engines (Unity/Unreal), testing physics interactions, collaborating with artists and designers.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Start learning game development with Unity/Unreal Engine." },
        { step: 2, title: "Bachelor's", detail: "B.Tech CS or B.Sc. Physics + game dev courses." },
        { step: 3, title: "Portfolio Building", detail: "Build games, contribute to open-source physics engines, publish on Steam/itch.io." },
        { step: 4, title: "Industry", detail: "Join game studios, VR/AR companies, or simulation companies." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Computer Science", "Linear Algebra"],
      keyExams: [
        { name: "No mandatory exam", description: "Portfolio and skills matter most.", difficulty: "N/A" }
      ],
      alternativeExams: [
        { name: "Game Jams", description: "Participate in Global Game Jam, Ludum Dare to build portfolio." }
      ],
      perks: [
        "Fun and creative work environment",
        "Salary: ₹6-15 LPA (India), $80-150K (US/Europe)",
        "Growing gaming industry in India (₹16,000+ Cr market)",
        "Your work is enjoyed by millions of players",
        "Can work remotely or as indie developer"
      ],
      risks: [
        "Crunch culture in gaming industry (long hours before launches)",
        "Indian gaming industry salaries lower than global average",
        "Competitive entry to established studios",
        "Need both physics AND strong programming skills"
      ],
      socialImpact: "Games are increasingly used for education, healthcare rehabilitation, military training, and architecture visualization. Physics simulation extends beyond games to scientific computing.",
      eligibility: {
        minQualification: "Relevant degree + strong portfolio",
        ageLimit: "None",
        physicalReq: "None",
        other: "C++, linear algebra, and game engine proficiency essential"
      },
      salaryRange: { entry: "₹6-15 LPA", mid: "₹15-40 LPA", senior: "₹40-80+ LPA" }
    },

    {
      id: "geophysicist",
      title: "Geophysicist",
      category: "Earth Sciences",
      icon: "🌍",
      shortDesc: "Study Earth's interior using physics — earthquakes, oil exploration, groundwater.",
      description: "Geophysicists apply physics to study the Earth's structure and processes. They work in earthquake monitoring, oil and gas exploration, ground water detection, and mining. This career combines field work with analytical skills.",
      dailyLife: "Seismic data acquisition and processing, gravity and magnetic surveys, writing reports, fieldwork at exploration sites, computer modeling of subsurface structures.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Interest in geology and earth sciences." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics/Geology/Geophysics." },
        { step: 3, title: "Master's", detail: "M.Sc./M.Tech Geophysics (IIT Kharagpur, BHU, Andhra Univ, ISM Dhanbad)." },
        { step: 4, title: "Career", detail: "Join ONGC, Oil India, GSPC, mining companies, or earthquake monitoring agencies." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Geology"],
      keyExams: [
        { name: "GATE Geophysics", description: "For M.Tech admission and PSU recruitment (ONGC, Oil India).", difficulty: "Hard" },
        { name: "ONGC Through GATE", description: "Recruitment through GATE score.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "GSI Recruitment", description: "Geological Survey of India scientist positions." }
      ],
      perks: [
        "Mix of field work and office work — not desk-bound",
        "Salary: ₹8-15 LPA (entry at PSUs), ₹20-50 LPA (senior at oil companies)",
        "ONGC/Oil India offer excellent PSU benefits",
        "International opportunities in oil exploration",
        "Contribute to natural disaster preparedness"
      ],
      risks: [
        "Field work can be in remote/harsh locations",
        "Oil industry is cyclical — job stability depends on oil prices",
        "Physical demands of field surveys",
        "Limited positions compared to other engineering fields"
      ],
      socialImpact: "Geophysicists enable safe construction through ground surveys, predict earthquakes, find water resources, and manage natural resources sustainably.",
      eligibility: {
        minQualification: "M.Sc./M.Tech Geophysics",
        ageLimit: "Varies by PSU (usually below 30)",
        physicalReq: "Physical fitness for field work",
        other: "Willingness to work in remote locations"
      },
      salaryRange: { entry: "₹8-15 LPA", mid: "₹15-35 LPA", senior: "₹35-60+ LPA" }
    },

    {
      id: "vfx_artist",
      title: "VFX Artist / Cinematographer (Physics of Light)",
      category: "Unconventional",
      icon: "🎬",
      shortDesc: "Create stunning visual effects for films using knowledge of optics, light, and motion.",
      description: "Understanding the physics of light (optics), motion (mechanics), and materials helps create realistic VFX. Many VFX studios value people who understand real-world physics to create believable digital effects. India's VFX industry is growing rapidly.",
      dailyLife: "Creating particle effects, simulating explosions and water, lighting 3D scenes, compositing, colour grading, working with directors, using software like Houdini/Maya/Nuke.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Learn basic photography and video editing." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics or specialized VFX/Animation diploma from MAAC, Arena, NFDC." },
        { step: 3, title: "Skills Development", detail: "Master Houdini (physics simulations), Maya/Blender (3D), Nuke (compositing)." },
        { step: 4, title: "Industry", detail: "Join studios like DNEG, MPC, Prime Focus, Red Chillies VFX." }
      ],
      requiredSubjects: ["Physics (Optics, Mechanics)", "Mathematics", "Computer Graphics"],
      keyExams: [
        { name: "No mandatory exam", description: "Showreel and portfolio are your resume.", difficulty: "N/A" }
      ],
      alternativeExams: [],
      perks: [
        "Salary: ₹5-12 LPA (entry), ₹20-50 LPA (senior/lead)",
        "Work on blockbuster movies and shows",
        "Creative and dynamic work environment",
        "Growing Indian VFX industry ($1.5 billion market)",
        "International opportunities"
      ],
      risks: [
        "Deadline pressure and long hours during productions",
        "Project-based work — gaps between projects",
        "Need artistic skills alongside physics",
        "Rapidly evolving software — continuous learning"
      ],
      socialImpact: "VFX enables storytelling that inspires millions. It's also used in architectural visualization, medical imaging visualization, and educational content.",
      eligibility: {
        minQualification: "Relevant training + strong portfolio",
        ageLimit: "None",
        physicalReq: "None",
        other: "Artistic eye and attention to detail essential"
      },
      salaryRange: { entry: "₹5-12 LPA", mid: "₹15-35 LPA", senior: "₹35-60+ LPA" }
    },

    {
      id: "civil_engineer",
      title: "Civil Engineer",
      category: "Engineering",
      icon: "🏗️",
      shortDesc: "Design and build infrastructure — bridges, buildings, dams, roads, and cities.",
      description: "Civil engineering is deeply rooted in physics principles like structural mechanics, fluid dynamics, and soil mechanics. Civil engineers design the physical infrastructure of civilization and ensure it is safe, efficient, and sustainable.",
      dailyLife: "Structural analysis, site inspections, project management, reviewing designs, working with architects and contractors, soil testing, concrete mix design, ensuring safety compliance.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM. Strong understanding of Mechanics, Properties of Matter." },
        { step: 2, title: "B.Tech Civil", detail: "4-year degree from IITs/NITs. Core: Structural Analysis, Geotechnical, Hydraulics, Transportation." },
        { step: 3, title: "Career", detail: "Join construction companies (L&T, Tata Projects), government (PWD, NHAI), or pursue M.Tech/MBA." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Chemistry (materials)"],
      keyExams: [
        { name: "JEE Main + Advanced", description: "For engineering admission.", difficulty: "Very Hard" },
        { name: "GATE CE", description: "For M.Tech and PSU recruitment (NHAI, NHPC, etc.).", difficulty: "Hard" },
        { name: "ESE", description: "Indian Engineering Services for Class-1 government positions.", difficulty: "Very Hard" }
      ],
      alternativeExams: [
        { name: "SSC JE", description: "Staff Selection Commission Junior Engineer." },
        { name: "State PWD exams", description: "State Public Works Department recruitment." }
      ],
      perks: [
        "Build tangible things — bridges, buildings, highways",
        "Salary: ₹4-10 LPA (entry), ₹15-40 LPA (experienced)",
        "Government jobs (NHAI, PWD) offer excellent stability",
        "Can start own construction/consulting firm",
        "India's infrastructure boom means massive demand"
      ],
      risks: [
        "Site work can be physically demanding and in remote areas",
        "Project delays and cost overruns are common",
        "Private sector starting salaries lower than IT",
        "Need to deal with regulatory and compliance challenges"
      ],
      socialImpact: "Civil engineers build the infrastructure that enables economic development — roads, bridges, water supply, sanitation, housing — directly improving quality of life for millions.",
      eligibility: {
        minQualification: "B.Tech/B.E. Civil Engineering",
        ageLimit: "None for private sector",
        physicalReq: "Ability to visit construction sites",
        other: "Site management and project management skills"
      },
      salaryRange: { entry: "₹4-10 LPA", mid: "₹10-25 LPA", senior: "₹25-60+ LPA" }
    },

    {
      id: "biophysicist",
      title: "Biophysicist",
      category: "Interdisciplinary",
      icon: "🧬",
      shortDesc: "Apply physics techniques to understand biological systems — from DNA to brain function.",
      description: "Biophysics sits at the intersection of physics and biology. Biophysicists use physical techniques (X-ray crystallography, spectroscopy, computational modeling) to understand how biological molecules work, how proteins fold, how nerves transmit signals, and how drugs bind to targets.",
      dailyLife: "Running experiments with biological samples, computational modeling of protein structures, publishing research, collaborating with biologists and chemists, attending conferences, mentoring students.",
      roadmap: [
        { step: 1, title: "Class 11-12", detail: "PCM or PCB. Consider both Physics and Biology." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics with biology electives, or BSc Biophysics (select universities)." },
        { step: 3, title: "Master's", detail: "M.Sc. Biophysics/Biotechnology from JNU, All India Institute of Medical Sciences, IISc." },
        { step: 4, title: "PhD", detail: "Ph.D. in Biophysics from top institutes. Focus on structural biology, neuroscience, or computational biology." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Biology", "Chemistry"],
      keyExams: [
        { name: "CSIR NET Life Sciences", description: "For JRF and lectureship.", difficulty: "Hard" },
        { name: "GATE Biotechnology/Life Science", description: "For M.Tech/PhD admissions.", difficulty: "Hard" },
        { name: "JEST", description: "For PhD at NCBS, InStem, etc.", difficulty: "Hard" }
      ],
      alternativeExams: [
        { name: "DBT JRF", description: "Department of Biotechnology Junior Research Fellowship." }
      ],
      perks: [
        "Work at the frontier of scientific understanding",
        "Salary: ₹6-12 LPA (entry research), ₹15-40 LPA (established)",
        "Interdisciplinary — never boring",
        "Pharma industry offers lucrative positions",
        "International research opportunities"
      ],
      risks: [
        "Very niche — limited positions in India",
        "Long academic path (PhD required for most positions)",
        "Need expertise in BOTH physics and biology",
        "Research can be slow and uncertain"
      ],
      socialImpact: "Biophysics research leads to new drugs, understanding of diseases (Alzheimer's, cancer), better medical diagnostics, and advances in food science and agriculture.",
      eligibility: {
        minQualification: "M.Sc./PhD in Biophysics or related field",
        ageLimit: "None for academic positions",
        physicalReq: "None",
        other: "Comfort with both physics and biology concepts"
      },
      salaryRange: { entry: "₹6-12 LPA", mid: "₹12-30 LPA", senior: "₹25-50+ LPA" }
    },

    // ===== DEFENSE & ARMED FORCES (NEW) =====
    {
      id: "nda_officer", title: "NDA Officer (Army/Navy/Air Force)", category: "Defense & Armed Forces", icon: "🎖️",
      shortDesc: "Join India's elite military through the National Defence Academy — open after Class 10+2.",
      description: "The National Defence Academy (NDA) is India's premier joint services military academy. Cadets train for Army, Navy, and Air Force simultaneously. Physics students excel here due to strong analytical and problem-solving skills. NDA produces officers who lead in combat, strategy, and national security.",
      dailyLife: "Rigorous physical training, academic classes (BSc), weapons training, drill parades, adventure activities, leadership exercises. Life is disciplined, structured, and deeply rewarding.",
      roadmap: [
        { step: 1, title: "Class 10-12", detail: "Study PCM. Maintain physical fitness. Start preparing for NDA written exam from Class 11." },
        { step: 2, title: "NDA Exam (UPSC)", detail: "Appear after Class 12. Written exam (Maths + GAT) followed by SSB Interview (5 days)." },
        { step: 3, title: "NDA Training", detail: "3 years at NDA Khadakwasla, Pune. BSc degree + military training." },
        { step: 4, title: "Service Academy", detail: "1 year at IMA (Army), INA (Navy), or AFA (Air Force) for specialized training." },
        { step: 5, title: "Commission", detail: "Commissioned as Lieutenant. Serve the nation in your chosen service." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "General Knowledge"],
      keyExams: [
        { name: "NDA Exam (UPSC)", description: "Written exam twice a year (April & September). Maths (300 marks) + GAT (600 marks).", difficulty: "Hard" },
        { name: "SSB Interview", description: "5-day Services Selection Board assessment — psychological, physical, group tasks.", difficulty: "Very Hard" }
      ],
      alternativeExams: [
        { name: "CDS Exam", description: "Combined Defence Services — for graduates to join military." },
        { name: "AFCAT", description: "Air Force Common Admission Test — graduate entry to IAF." }
      ],
      perks: ["Salary: ₹8-12 LPA (Lieutenant) → ₹25-50 LPA (Colonel/Captain)", "Free housing, medical, canteen, travel concessions", "Highest respect and prestige in Indian society", "Adventure: mountaineering, skydiving, scuba diving", "Pension for life after 20 years of service", "Opportunity to serve and protect the nation"],
      risks: ["Life-threatening situations in combat zones", "Postings in remote/harsh areas (Siachen, deserts)", "Long separations from family", "Strict discipline — limited personal freedom", "Physical injuries are common"],
      socialImpact: "Armed forces officers protect 1.4 billion Indians. They serve during natural disasters, maintain internal security, and represent India globally in UN peacekeeping missions.",
      eligibility: { minQualification: "Class 12 pass (PCM for Air Force/Navy technical)", ageLimit: "16.5 to 19.5 years at time of NDA exam", physicalReq: "Strict physical and medical standards — eyesight, height, weight", other: "Unmarried Indian male citizens (women via CDS/AFCAT)" },
      salaryRange: { entry: "₹8-12 LPA", mid: "₹15-30 LPA", senior: "₹30-50+ LPA" }
    },
    {
      id: "iaf_officer", title: "Indian Air Force Officer / Pilot", category: "Defense & Armed Forces", icon: "✈️",
      shortDesc: "Fly fighter jets, transport aircraft, or helicopters for the Indian Air Force.",
      description: "IAF officers with physics backgrounds excel as pilots and technical officers. Physics understanding of aerodynamics, propulsion, and navigation is directly applicable. Fly Sukhoi-30MKI, Rafale, Tejas, or command air defense systems.",
      dailyLife: "Flying missions, simulator training, aircraft maintenance oversight, mission planning, physical training, squadron leadership, emergency response readiness.",
      roadmap: [
        { step: 1, title: "Class 10-12", detail: "PCM mandatory for flying branch. Maintain excellent physical fitness and eyesight." },
        { step: 2, title: "Entry Route", detail: "NDA (after 12th) OR AFCAT (after graduation) OR CDS exam." },
        { step: 3, title: "Flying Training", detail: "1.5 years at Air Force Academy, Dundigal. Basic → Intermediate → Advanced flying." },
        { step: 4, title: "Commission & Posting", detail: "Wings ceremony → posted to operational squadrons across India." }
      ],
      requiredSubjects: ["Physics", "Mathematics"],
      keyExams: [
        { name: "AFCAT", description: "Air Force Common Admission Test — twice yearly for graduates.", difficulty: "Hard" },
        { name: "NDA (Air Force)", description: "Through NDA exam for 12th pass candidates.", difficulty: "Hard" },
        { name: "AFSB Interview", description: "Air Force Selection Board — rigorous 5-day assessment.", difficulty: "Very Hard" }
      ],
      alternativeExams: [{ name: "CDS Exam", description: "Combined Defence Services for graduate entry." }],
      perks: ["Fly multi-million dollar fighter jets", "Salary: ₹10-15 LPA (Flying Officer) → ₹30-60 LPA (Air Marshal)", "Free accommodation, medical, travel", "One of the most respected professions in India", "Adventure and adrenaline every day"],
      risks: ["High-risk profession — flying combat aircraft", "Strict medical requirements especially eyesight", "Postings across India including remote air bases", "Long training period before operational flying"],
      socialImpact: "IAF protects India's airspace, provides disaster relief, and conducts humanitarian missions. Pilots are national heroes during conflicts.",
      eligibility: { minQualification: "Class 12 PCM (NDA) or Graduation (AFCAT)", ageLimit: "16.5-19.5 (NDA), 20-24 (AFCAT Flying)", physicalReq: "6/6 eyesight for pilots, strict medical standards", other: "Indian citizen, unmarried for NDA" },
      salaryRange: { entry: "₹10-15 LPA", mid: "₹20-35 LPA", senior: "₹35-60+ LPA" }
    },
    {
      id: "navy_officer", title: "Indian Navy Officer", category: "Defense & Armed Forces", icon: "⚓",
      shortDesc: "Command warships, submarines, and naval aviation for India's maritime security.",
      description: "Navy officers with physics backgrounds serve in executive, engineering, and technical branches. Understanding of sonar physics, radar, navigation, propulsion systems, and nuclear submarine technology makes physics students ideal candidates.",
      dailyLife: "Ship operations, navigation watches, weapons systems management, submarine operations, fleet exercises, port visits to foreign countries, naval aviation.",
      roadmap: [
        { step: 1, title: "Class 10-12", detail: "PCM is essential. Build swimming skills — mandatory for Navy." },
        { step: 2, title: "Entry", detail: "NDA (Naval Academy) after 12th OR INET/CDS after graduation." },
        { step: 3, title: "Training", detail: "Training at Indian Naval Academy, Ezhimala, Kerala. 4 years (NDA entry) or 1 year (graduate entry)." },
        { step: 4, title: "Specialization", detail: "Choose: Executive, Engineering, Electrical, Naval Aviation, or Submarine branch." }
      ],
      requiredSubjects: ["Physics", "Mathematics"],
      keyExams: [
        { name: "NDA (Navy)", description: "Through UPSC NDA exam.", difficulty: "Hard" },
        { name: "INET", description: "Indian Navy Entrance Test for graduates.", difficulty: "Hard" },
        { name: "SSB Interview", description: "5-day selection process.", difficulty: "Very Hard" }
      ],
      alternativeExams: [{ name: "10+2 B.Tech Entry", description: "Direct entry to Naval Academy for PCM students after 12th." }],
      perks: ["Travel the world — port visits to 30+ countries", "Salary: ₹8-12 LPA (Sub Lieutenant) → ₹30-50 LPA (Admiral)", "Free housing, medical, canteen for life", "Submarine officers get extra submarine pay", "Prestigious uniform and social respect"],
      risks: ["Months away from family during deployments", "Seasickness and harsh sea conditions", "Swimming proficiency mandatory", "Submarine service is claustrophobic"],
      socialImpact: "Indian Navy protects maritime borders, combats piracy, provides disaster relief during tsunamis and cyclones, and maintains peace in the Indian Ocean region.",
      eligibility: { minQualification: "Class 12 PCM or Engineering degree", ageLimit: "16.5-19.5 (NDA), 19-24 (INET)", physicalReq: "Swimming ability mandatory, strict medical", other: "Indian citizen" },
      salaryRange: { entry: "₹8-12 LPA", mid: "₹15-30 LPA", senior: "₹30-50+ LPA" }
    },
    {
      id: "army_tes", title: "Indian Army (Technical Entry Scheme)", category: "Defense & Armed Forces", icon: "🪖",
      shortDesc: "Join the Indian Army as a technical officer directly after Class 12 PCM.",
      description: "The 10+2 Technical Entry Scheme (TES) is a unique opportunity for PCM students to join the Indian Army as officers without any entrance exam — selection is based on JEE Main cutoff and SSB interview. You get a B.Tech degree from CME Pune while serving.",
      dailyLife: "Technical training, weapons systems maintenance, combat engineering, bridge building, mine clearance, leading soldiers, adventure training.",
      roadmap: [
        { step: 1, title: "Class 12 (PCM)", detail: "Score 70%+ in PCM aggregate. Apply through Indian Army website." },
        { step: 2, title: "Shortlisting", detail: "Based on JEE Main marks or PCM percentage. No separate written exam." },
        { step: 3, title: "SSB Interview", detail: "5-day Services Selection Board assessment." },
        { step: 4, title: "Training", detail: "5 years: 1 year OTA Gaya + 4 years B.Tech at CME Pune/MCTE Mhow." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Chemistry"],
      keyExams: [{ name: "SSB Interview", description: "Only selection stage — no written exam. Based on JEE/board marks.", difficulty: "Very Hard" }],
      alternativeExams: [{ name: "NDA", description: "Alternative army entry through NDA exam." }, { name: "CDS", description: "For graduates." }],
      perks: ["Free B.Tech degree while earning salary", "Salary starts from training period", "All army benefits — housing, medical, canteen", "Fast career progression", "No entrance exam — based on JEE/board marks"],
      risks: ["Combat deployments in conflict zones", "Rigorous 5-year commitment minimum", "Strict military discipline", "Remote postings"],
      socialImpact: "Army technical officers maintain critical defense infrastructure, build bridges in disaster zones, and ensure combat readiness of India's land forces.",
      eligibility: { minQualification: "Class 12 PCM with 70%+", ageLimit: "16.5-19.5 years", physicalReq: "Army physical standards", other: "Unmarried male Indian citizens" },
      salaryRange: { entry: "₹8-10 LPA", mid: "₹15-25 LPA", senior: "₹25-45+ LPA" }
    },
    {
      id: "coast_guard", title: "Indian Coast Guard Officer", category: "Defense & Armed Forces", icon: "🚢",
      shortDesc: "Protect India's coastline, conduct sea rescue, and combat maritime crimes.",
      description: "The Coast Guard is India's maritime law enforcement and search-and-rescue agency. Physics knowledge is used in navigation, radar, communication systems, and pollution control technology. Less combat-focused than Navy but equally important.",
      dailyLife: "Coastal patrol, search and rescue operations, anti-smuggling operations, pollution response, fishermen assistance, maritime surveillance.",
      roadmap: [
        { step: 1, title: "Class 12 PCM", detail: "Score well in Physics and Mathematics." },
        { step: 2, title: "CGECT", detail: "Coast Guard Exam — written test based on Maths, Physics, English, GK." },
        { step: 3, title: "Training", detail: "Training at Indian Coast Guard Academy, Mangalore." },
        { step: 4, title: "Posting", detail: "Posted to Coast Guard stations along India's 7,500km coastline." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "English"],
      keyExams: [{ name: "Coast Guard Assistant Commandant Exam", description: "Written + physical + interview.", difficulty: "Moderate-Hard" }],
      alternativeExams: [{ name: "Navik (GD/DB)", description: "Non-officer entry into Coast Guard." }],
      perks: ["Meaningful work — save lives at sea", "Salary: ₹7-10 LPA (entry) → ₹25-40 LPA (senior)", "Government benefits and pension", "Less combat risk than Army/Navy", "Coastal city postings"],
      risks: ["Sea operations in rough weather", "Away from family during patrols", "Limited positions annually", "Swimming ability essential"],
      socialImpact: "Coast Guard saves thousands of fishermen annually, prevents smuggling, protects marine environment, and secures India's maritime borders.",
      eligibility: { minQualification: "Class 12 PCM or Engineering degree", ageLimit: "Varies by entry (typically 21-25)", physicalReq: "Swimming, medical fitness", other: "Indian citizen" },
      salaryRange: { entry: "₹7-10 LPA", mid: "₹12-25 LPA", senior: "₹25-40+ LPA" }
    },
    {
      id: "ips_officer", title: "IPS Officer (Indian Police Service)", category: "Government & Administration", icon: "👮",
      shortDesc: "Lead law enforcement, investigate crimes, and maintain public safety.",
      description: "IPS officers lead police forces across India. Physics optional in UPSC is popular and scoring. Physics thinking helps in forensics, cyber crime investigation, and scientific approach to policing. IPS officers command respect and authority.",
      dailyLife: "Law and order management, crime investigation, VIP security, traffic management, community policing, cyber crime units, anti-terrorism operations.",
      roadmap: [
        { step: 1, title: "Class 10-12", detail: "Any stream. Start building general awareness early." },
        { step: 2, title: "Graduation", detail: "Any Bachelor's degree. Physics optional in UPSC is advantageous." },
        { step: 3, title: "UPSC CSE", detail: "Clear Prelims, Mains, and Interview. Physics as optional subject." },
        { step: 4, title: "Training", detail: "1 year at SVPNPA (Sardar Vallabhbhai Patel National Police Academy), Hyderabad." }
      ],
      requiredSubjects: ["Any graduate degree", "Physics optional is advantageous"],
      keyExams: [{ name: "UPSC Civil Services", description: "India's toughest exam — Prelims + Mains + Interview.", difficulty: "Extremely Hard" }],
      alternativeExams: [{ name: "State PSC", description: "State police service through state public service commissions." }],
      perks: ["Power to maintain law and order", "Salary: ₹8-12 LPA + massive perks (car, bungalow, staff)", "Highest social prestige", "Job security for life", "Directly impact public safety"],
      risks: ["Extremely competitive exam (0.1% success rate)", "Dangerous situations regularly", "Political pressure", "Frequent transfers"],
      socialImpact: "IPS officers protect citizens, fight organized crime, investigate corruption, and ensure justice. One good police officer can transform an entire district.",
      eligibility: { minQualification: "Any Bachelor's degree", ageLimit: "21-32 years (General)", physicalReq: "Physical fitness test mandatory", other: "Indian citizenship required" },
      salaryRange: { entry: "₹8-12 LPA + perks", mid: "₹15-25 LPA + perks", senior: "₹25-40 LPA + perks" }
    },
    {
      id: "forensic_scientist", title: "Forensic Scientist", category: "Interdisciplinary", icon: "🔍",
      shortDesc: "Use physics and science to solve crimes — ballistics, fingerprints, digital forensics.",
      description: "Forensic scientists apply physics principles (ballistics, optics, spectroscopy, material analysis) to analyze crime scene evidence. They work in government forensic labs, CBI, state police forensic departments, and private agencies.",
      dailyLife: "Analyzing evidence (bullets, bloodstains, fibers), operating lab instruments, writing expert reports, testifying in court, crime scene investigation, digital forensics.",
      roadmap: [
        { step: 1, title: "Class 10-12", detail: "PCM or PCB. Interest in science and investigation." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Forensic Science (LNJN NICFS Delhi, Gujarat Forensic Sciences Univ) or B.Sc. Physics." },
        { step: 3, title: "Master's", detail: "M.Sc. Forensic Science with specialization in Physics/Ballistics/Digital Forensics." },
        { step: 4, title: "Career", detail: "Join CFSL, State FSLs, CBI, NIA, or private forensic consultancies." }
      ],
      requiredSubjects: ["Physics", "Chemistry", "Biology (helpful)"],
      keyExams: [{ name: "CFSL Recruitment", description: "Central Forensic Science Lab recruitment through UPSC/SSC.", difficulty: "Moderate-Hard" }],
      alternativeExams: [{ name: "State FSL Recruitment", description: "State forensic lab positions." }],
      perks: ["Fascinating work — solve real crimes", "Salary: ₹5-10 LPA (entry) → ₹15-30 LPA (senior)", "Government job security", "Growing demand with increasing crime complexity", "TV-show-like exciting work"],
      risks: ["Graphic crime scene evidence", "Court appearances and legal pressure", "Limited positions in India", "Emotionally taxing cases"],
      socialImpact: "Forensic scientists ensure justice by providing scientific evidence in criminal cases. They help convict the guilty and free the innocent.",
      eligibility: { minQualification: "M.Sc. Forensic Science", ageLimit: "Varies by recruitment", physicalReq: "None", other: "Attention to detail essential" },
      salaryRange: { entry: "₹5-10 LPA", mid: "₹10-20 LPA", senior: "₹20-35+ LPA" }
    },
    {
      id: "nanotechnologist", title: "Nanotechnologist", category: "Emerging Technology", icon: "🔬",
      shortDesc: "Engineer materials at the atomic level — create revolutionary materials and devices.",
      description: "Nanotechnology operates at the scale of atoms and molecules. Physicists design nanomaterials for solar cells, drug delivery, water purification, and electronics. India's Nano Mission and IITs are investing heavily in this field.",
      dailyLife: "Synthesizing nanomaterials, electron microscopy, characterization of nanostructures, publishing research, collaborating with industry for applications.",
      roadmap: [
        { step: 1, title: "Class 10-12", detail: "PCM. Strong foundation in Modern Physics and Chemistry." },
        { step: 2, title: "Bachelor's", detail: "B.Sc. Physics or B.Tech in relevant engineering." },
        { step: 3, title: "Master's/PhD", detail: "M.Tech/PhD in Nanotechnology from IITs, IISc, or JNCASR." },
        { step: 4, title: "Career", detail: "Research labs, semiconductor companies, pharma, or academia." }
      ],
      requiredSubjects: ["Physics", "Chemistry", "Mathematics"],
      keyExams: [{ name: "GATE (Physics/Nano)", description: "For M.Tech admissions.", difficulty: "Hard" }],
      alternativeExams: [{ name: "CSIR NET", description: "For research fellowships." }],
      perks: ["Work on the next industrial revolution", "Salary: ₹8-15 LPA (entry) → ₹25-60 LPA (senior)", "Growing global demand", "Interdisciplinary and innovative work"],
      risks: ["Still emerging — limited industry jobs in India", "Long academic path (PhD often needed)", "Safety concerns with nanoparticles", "Requires both physics and chemistry expertise"],
      socialImpact: "Nanotechnology enables clean water purification, targeted cancer treatment, efficient solar energy, and stronger/lighter materials for construction and defense.",
      eligibility: { minQualification: "M.Tech/PhD Nanotechnology", ageLimit: "None", physicalReq: "None", other: "Lab skills essential" },
      salaryRange: { entry: "₹8-15 LPA", mid: "₹15-35 LPA", senior: "₹35-60+ LPA" }
    },
    {
      id: "renewable_energy", title: "Renewable Energy Engineer", category: "Emerging Technology", icon: "☀️",
      shortDesc: "Design solar panels, wind turbines, and clean energy systems for a sustainable future.",
      description: "Renewable energy engineers apply physics of photovoltaics, thermodynamics, and fluid mechanics to design clean energy solutions. India targets 500 GW renewable energy by 2030 — massive job opportunities.",
      dailyLife: "Designing solar/wind farm layouts, energy yield analysis, grid integration, project management, R&D on new materials, policy advisory.",
      roadmap: [
        { step: 1, title: "Class 10-12", detail: "PCM. Focus on Thermodynamics, Optics, Electricity." },
        { step: 2, title: "Bachelor's", detail: "B.Tech in Electrical/Mechanical/Energy Engineering." },
        { step: 3, title: "Specialization", detail: "M.Tech in Renewable Energy or Solar Technology (IIT Bombay, IIT Delhi)." },
        { step: 4, title: "Career", detail: "Join Adani Green, Tata Power Solar, ReNew Power, NTPC, or startups." }
      ],
      requiredSubjects: ["Physics", "Mathematics", "Environmental Science"],
      keyExams: [{ name: "JEE/GATE", description: "For engineering admissions.", difficulty: "Hard" }],
      alternativeExams: [{ name: "MNRE Certifications", description: "Ministry of New & Renewable Energy certifications." }],
      perks: ["Save the planet while earning well", "Salary: ₹6-12 LPA (entry) → ₹20-50 LPA (senior)", "India's fastest growing energy sector", "Government incentives and subsidies", "Global career opportunities"],
      risks: ["Project-based work in remote solar/wind farm locations", "Policy changes can affect industry", "Technology evolving rapidly", "Initial salaries may be moderate"],
      socialImpact: "Renewable energy engineers directly combat climate change, reduce air pollution, and provide clean electricity to millions of homes.",
      eligibility: { minQualification: "B.Tech/M.Tech in relevant field", ageLimit: "None", physicalReq: "Ability to visit field sites", other: "Environmental awareness" },
      salaryRange: { entry: "₹6-12 LPA", mid: "₹12-30 LPA", senior: "₹30-50+ LPA" }
    }
  ],

  categories: [
    { id: "research", name: "Pure Science & Research", icon: "🔬", color: "from-violet-500 to-purple-600" },
    { id: "emerging", name: "Emerging Technology", icon: "🔮", color: "from-cyan-500 to-blue-600" },
    { id: "engineering", name: "Engineering", icon: "⚙️", color: "from-orange-500 to-red-500" },
    { id: "technology", name: "Technology", icon: "💻", color: "from-green-500 to-emerald-600" },
    { id: "armed_forces", name: "Defense & Armed Forces", icon: "🎖️", color: "from-red-600 to-orange-600" },
    { id: "defense", name: "Defense & Government", icon: "🛡️", color: "from-blue-600 to-indigo-700" },
    { id: "healthcare", name: "Healthcare", icon: "🏥", color: "from-rose-500 to-pink-600" },
    { id: "education", name: "Education", icon: "📚", color: "from-amber-500 to-yellow-600" },
    { id: "unconventional", name: "Unconventional Paths", icon: "🌈", color: "from-fuchsia-500 to-pink-500" },
    { id: "earth", name: "Earth Sciences", icon: "🌍", color: "from-teal-500 to-green-600" },
    { id: "interdisciplinary", name: "Interdisciplinary", icon: "🧬", color: "from-indigo-500 to-blue-500" }
  ]
};

export default physicsCareerData;
