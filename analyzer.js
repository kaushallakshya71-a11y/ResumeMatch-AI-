// ============================================================
// analyzer.js — Skill Taxonomy, Scoring Engine & AI Matching v3
// All 9 Modules: Smart Match Score, Skills Gap, ATS, Company
// Optimization, Resume Tips, Career Roadmap, Interview Prep,
// Video/Soft Skills, Final Verdict
// ============================================================

const SKILL_TAXONOMY = {
    frontend: {
        label: "Frontend Development",
        skills: [
            "html", "html5", "css", "css3", "javascript", "js", "typescript", "ts",
            "react", "reactjs", "react.js", "vue", "vuejs", "vue.js", "angular", "angularjs",
            "svelte", "nextjs", "next.js", "nuxt", "gatsby", "redux", "zustand", "mobx",
            "tailwind", "tailwindcss", "bootstrap", "sass", "scss", "less", "styled-components",
            "webpack", "vite", "rollup", "parcel", "babel", "eslint", "prettier",
            "responsive design", "figma", "webflow", "jquery", "ajax", "dom", "spa", "pwa"
        ]
    },
    backend: {
        label: "Backend Development",
        skills: [
            "node", "nodejs", "node.js", "express", "expressjs", "nestjs", "fastapi",
            "django", "flask", "spring", "spring boot", "laravel", "rails", "ruby on rails",
            "php", "python", "java", "golang", "go", "rust", "c#", ".net", "asp.net",
            "graphql", "rest", "restful", "rest api", "grpc", "websockets", "microservices",
            "api", "authentication", "oauth", "jwt", "mvc", "orm"
        ]
    },
    databases: {
        label: "Databases",
        skills: [
            "sql", "mysql", "postgresql", "postgres", "sqlite", "oracle", "mssql", "sql server",
            "mongodb", "mongoose", "redis", "firebase", "firestore", "dynamodb", "cassandra",
            "elasticsearch", "neo4j", "supabase", "prisma", "sequelize", "typeorm",
            "database design", "nosql", "data modeling", "stored procedures", "indexing", "query optimization"
        ]
    },
    devops: {
        label: "Cloud & DevOps",
        skills: [
            "aws", "amazon web services", "azure", "gcp", "google cloud", "heroku", "digitalocean",
            "docker", "kubernetes", "k8s", "terraform", "ansible", "jenkins", "github actions",
            "gitlab ci", "circleci", "travis ci", "ci/cd", "devops", "linux", "bash",
            "shell scripting", "nginx", "apache", "load balancing", "cloudflare",
            "s3", "ec2", "lambda", "cloudwatch", "iam", "vpc"
        ]
    },
    data: {
        label: "Data Science & AI",
        skills: [
            "python", "pandas", "numpy", "scipy", "matplotlib", "seaborn", "plotly",
            "machine learning", "ml", "deep learning", "dl", "neural networks", "nlp",
            "tensorflow", "keras", "pytorch", "scikit-learn", "sklearn", "xgboost",
            "data analysis", "data visualization", "statistics", "r", "jupyter", "notebook",
            "power bi", "tableau", "excel", "data pipeline", "etl", "feature engineering",
            "model deployment", "mlops", "bigquery", "spark", "hadoop", "databricks"
        ]
    },
    mobile: {
        label: "Mobile Development",
        skills: [
            "ios", "android", "react native", "flutter", "dart", "swift", "objective-c",
            "kotlin", "java android", "xamarin", "ionic", "expo", "app development",
            "mobile ui", "push notifications", "firebase", "app store", "play store"
        ]
    },
    tools: {
        label: "Tools & Practices",
        skills: [
            "git", "github", "gitlab", "bitbucket", "version control", "agile", "scrum",
            "kanban", "jira", "confluence", "trello", "notion", "slack", "linear",
            "tdd", "unit testing", "integration testing", "jest", "mocha", "pytest",
            "cypress", "selenium", "postman", "swagger", "openapi", "code review",
            "pair programming", "debugging", "performance optimization", "seo"
        ]
    },
    soft: {
        label: "Soft Skills",
        skills: [
            "communication", "teamwork", "leadership", "problem solving", "critical thinking",
            "time management", "adaptability", "creativity", "collaboration", "presentation",
            "mentoring", "project management", "stakeholder management", "documentation",
            "analytical thinking", "attention to detail", "self-motivated", "fast learner"
        ]
    },
    design: {
        label: "UI/UX Design",
        skills: [
            "figma", "adobe xd", "sketch", "invision", "ui design", "ux design",
            "user research", "wireframing", "prototyping", "design systems", "usability testing",
            "accessibility", "wcag", "information architecture", "user flows", "heuristic evaluation",
            "canva", "illustrator", "photoshop", "zeplin"
        ]
    },
    certs: {
        label: "Certifications",
        skills: [
            "aws certified", "google certified", "azure certified", "pmp", "prince2",
            "scrum master", "csm", "safe", "comptia", "ccna", "cissp", "ceh",
            "google analytics", "hubspot", "salesforce certified", "data science certification"
        ]
    }
};

const ALIASES = {
    "js": "javascript", "ts": "typescript", "react.js": "react", "reactjs": "react",
    "vue.js": "vue", "vuejs": "vue", "node.js": "node", "nodejs": "node", "next.js": "nextjs",
    "postgres": "postgresql", "sklearn": "scikit-learn", "k8s": "kubernetes",
    "ml": "machine learning", "dl": "deep learning", "nlp": "natural language processing",
    "rest api": "restful", "rest": "restful", "amazon web services": "aws",
    "google cloud": "gcp", "ci/cd": "continuous integration", "tdd": "test driven development",
    "oop": "object oriented programming", "api": "rest api", "nosql": "mongodb"
};

const TRENDING_SKILLS = {
    frontend: ["TypeScript", "Next.js 14", "React Server Components", "Tailwind CSS", "Web3", "WebAssembly"],
    backend: ["Go (Golang)", "Rust", "GraphQL", "gRPC", "Kafka", "Microservices Architecture"],
    devops: ["Kubernetes", "Terraform IaC", "GitHub Actions", "ArgoCD", "eBPF", "Platform Engineering"],
    data: ["LLMs", "LangChain", "RAG", "Vector Databases", "MLOps", "Hugging Face", "PyTorch"],
    mobile: ["Flutter", "React Native (New Arch)", "SwiftUI", "Jetpack Compose"],
    design: ["AI-assisted design", "Figma Dev Mode", "Motion Design", "Design Systems"],
    databases: ["CockroachDB", "PlanetScale", "Supabase", "Convex", "Neon Postgres"],
    tools: ["GitHub Copilot", "AI-Assisted Development", "Playwright", "Vitest"],
};

const LEARNING_RESOURCES = {
    "TypeScript": "typescriptlang.org / Total TypeScript",
    "Docker": "Docker Official Docs / Play with Docker",
    "Kubernetes": "Kubernetes.io / KubeAcademy",
    "AWS": "AWS Skill Builder (free tier)",
    "React": "react.dev (official)",
    "Next.js": "nextjs.org/learn",
    "Python": "Python.org / Real Python",
    "Machine Learning": "fast.ai / Coursera ML Specialization",
    "GraphQL": "howtographql.com",
    "PostgreSQL": "postgresqltutorial.com",
    "Figma": "figma.com/resources",
    "Go": "go.dev/tour",
    "Rust": "rust-lang.org/learn",
    "Redis": "redis.io/docs",
    "MongoDB": "mongodb.com/docs / mongodbuniversity.com",
    "Spring Boot": "spring.io/quickstart",
    "Flutter": "flutter.dev/docs",
    "Terraform": "developer.hashicorp.com/terraform/tutorials",
    "GitHub Actions": "docs.github.com/actions",
};

// Next-role suggestions by current role level
const NEXT_ROLES = {
    entry: ["Junior Developer", "Associate Engineer", "Software Engineer I"],
    mid: ["Senior Developer", "Tech Lead", "Software Engineer II / III"],
    senior: ["Staff Engineer", "Engineering Manager", "Principal Engineer"],
    lead: ["Director of Engineering", "VP Engineering", "CTO (Startup)"],
    exec: ["Board Advisor", "CTO", "Chief Architect"]
};

// Company culture optimization profiles
const COMPANY_PROFILES = {
    startup: {
        label: "Startup",
        tone: "entrepreneurial, fast-paced",
        resumeLength: "1 page (concise & punchy)",
        focusAreas: ["Ownership mindset", "Full-stack versatility", "Speed of delivery", "Self-starter attitude"],
        toneKeywords: ["built from scratch", "ownership", "shipped", "scaled", "zero to one", "cross-functional"],
        avoid: ["corporate jargon", "committee processes", "excessively formal language"],
        tips: [
            "Emphasize products you owned end-to-end",
            "Highlight speed: 'Shipped MVP in 3 weeks'",
            "Show startup or side project experience",
            "Use casual but professional language",
            "Focus on impact, not processes"
        ]
    },
    mnc: {
        label: "MNC / Large Enterprise",
        tone: "professional, process-oriented",
        resumeLength: "1–2 pages",
        focusAreas: ["Process compliance", "Team collaboration", "Scalability", "Stakeholder management"],
        toneKeywords: ["collaborated", "led cross-functional", "implemented", "optimized", "managed stakeholders"],
        avoid: ["informal language", "vague metrics", "missing dates"],
        tips: [
            "Align with company values (check their website)",
            "Quantify everything: 'Reduced costs by 30%'",
            "Show team leadership and cross-team work",
            "Mention compliance, process improvement",
            "Use industry-standard terminology"
        ]
    },
    product: {
        label: "Product Company",
        tone: "user-centric, impact-driven",
        resumeLength: "1 page (outcome-focused)",
        focusAreas: ["Product thinking", "User impact", "A/B testing", "Data-driven decisions"],
        toneKeywords: ["user engagement", "retention", "conversion", "A/B tested", "improved UX", "shipped feature"],
        avoid: ["too technical without business context", "listing tools without outcomes"],
        tips: [
            "Frame everything in terms of user impact",
            "Mention metrics: DAU, retention, conversion rates",
            "Show product intuition alongside technical skill",
            "Highlight collaboration with Product Managers",
            "Discuss A/B tests or experiments you ran"
        ]
    }
};

// =====================
//  TEXT PARSING HELPERS
// =====================
function normalizeText(text) {
    return text.toLowerCase().replace(/[^\w\s.+#/]/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractYearsOfExperience(text) {
    const patterns = [
        /(\d+)\+?\s*years?\s*of\s*experience/gi,
        /(\d+)\+?\s*years?\s*experience/gi,
        /experience\s*of\s*(\d+)\+?\s*years?/gi,
        /(\d+)\+?\s*yrs?\s*exp/gi,
    ];
    let maxYears = 0;
    for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(text)) !== null) {
            const years = parseInt(match[1]);
            if (years > maxYears && years < 50) maxYears = years;
        }
    }
    return maxYears;
}

function extractSkillsFromText(text) {
    const normalized = normalizeText(text);
    const found = new Set();
    const allSkills = [];
    Object.values(SKILL_TAXONOMY).forEach(cat => cat.skills.forEach(skill => allSkills.push(skill)));
    allSkills.sort((a, b) => b.length - a.length);
    for (const skill of allSkills) {
        const regex = new RegExp(`\\b${skill.replace(/[.+#]/g, '\\$&')}\\b`, 'i');
        if (regex.test(normalized)) found.add(ALIASES[skill] || skill);
    }
    return [...found];
}

function detectDomain(skills) {
    const domainScores = {};
    for (const [domain, { skills: domainSkills }] of Object.entries(SKILL_TAXONOMY)) {
        domainScores[domain] = skills.filter(s => domainSkills.includes(s)).length;
    }
    return Object.entries(domainScores).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([d]) => d);
}

function detectEducation(resumeText) {
    const text = resumeText.toLowerCase();
    let eduScore = 50; // baseline
    if (text.match(/\b(phd|doctorate|ph\.d)\b/)) eduScore = 100;
    else if (text.match(/\b(master|mtech|msc|mba|m\.tech|m\.sc|m\.e)\b/)) eduScore = 90;
    else if (text.match(/\b(bachelor|btech|bsc|be|b\.tech|b\.sc|b\.e|b\.com|bca)\b/)) eduScore = 75;
    else if (text.match(/\b(diploma|polytechnic|associate)\b/)) eduScore = 60;
    else if (text.match(/\b(12th|hsc|secondary|high school)\b/)) eduScore = 40;
    return eduScore;
}

function detectProjectRelevance(resumeText, jdText) {
    // Check if resume has project section with relevant JD keywords
    const resumeNorm = normalizeText(resumeText);
    const jdWords = normalizeText(jdText).split(/\s+/).filter(w => w.length > 4);
    const hasProjectSection = /\b(projects?|portfolio|built|developed|created|implemented)\b/i.test(resumeText);
    if (!hasProjectSection) return 35;
    const projectMatches = jdWords.filter(w => resumeNorm.includes(w)).length;
    return Math.min(100, 40 + (projectMatches / Math.max(jdWords.length, 1)) * 100);
}

// ======================
//   CORE SCORING ENGINE
// ======================
function analyzeMatch(resumeText, jdText, options = {}) {
    const { roleLevel = 'mid', industry = 'tech', prioritySkills = [], targetRole = '', targetCompany = '' } = options;

    const resumeSkills = extractSkillsFromText(resumeText);
    const jdSkills = extractSkillsFromText(jdText);
    const resumeYears = extractYearsOfExperience(resumeText);
    const jdYears = extractYearsOfExperience(jdText);
    const resumeDomains = detectDomain(resumeSkills);
    const jdDomains = detectDomain(jdSkills);
    const educationScore = detectEducation(resumeText);
    const projectScore = Math.round(detectProjectRelevance(resumeText, jdText));

    // Merge priority skills
    const normalizedPriority = prioritySkills.map(s => s.toLowerCase().trim()).filter(Boolean);
    const allJdSkills = [...new Set([...jdSkills, ...normalizedPriority])];

    // Skill matching
    const strongMatches = [];
    const partialMatches = [];
    const missingSkills = [];

    for (const jdSkill of allJdSkills) {
        if (resumeSkills.includes(jdSkill)) {
            strongMatches.push(jdSkill);
        } else {
            const aliasMatch = resumeSkills.some(rs =>
                ALIASES[rs] === jdSkill || ALIASES[jdSkill] === rs || rs.includes(jdSkill) || jdSkill.includes(rs)
            );
            if (aliasMatch) partialMatches.push(jdSkill);
            else missingSkills.push(jdSkill);
        }
    }

    const extraSkills = resumeSkills.filter(s => !allJdSkills.includes(s)).slice(0, 8);

    // Score calculation
    const totalJdSkills = allJdSkills.length || 1;
    const priorityMatched = normalizedPriority.filter(s => resumeSkills.includes(s) || partialMatches.includes(s)).length;
    const priorityBoost = normalizedPriority.length > 0 ? (priorityMatched / normalizedPriority.length) * 10 : 0;
    const skillScore = Math.min(100, ((strongMatches.length + partialMatches.length * 0.5) / totalJdSkills) * 100 + priorityBoost);

    // Experience — adjusted by roleLevel
    const roleLevelYearsMap = { entry: 1, mid: 3, senior: 5, lead: 7, exec: 10 };
    const expectedYears = jdYears > 0 ? jdYears : (roleLevelYearsMap[roleLevel] || 3);
    let expScore = 100;
    if (resumeYears > 0) {
        expScore = resumeYears >= expectedYears ? 100 : Math.max(20, (resumeYears / expectedYears) * 100);
    } else if (roleLevel === 'entry') {
        expScore = 80;
    } else {
        expScore = 50;
    }

    const domainOverlap = jdDomains.filter(d => resumeDomains.includes(d)).length;
    const domainScore = (domainOverlap / Math.max(jdDomains.length, 1)) * 100;

    const jdWords = normalizeText(jdText).split(' ').filter(w => w.length > 3);
    const resumeWords = normalizeText(resumeText).split(' ');
    const keywordHits = jdWords.filter(w => resumeWords.includes(w)).length;
    const keywordScore = Math.min(100, (keywordHits / Math.max(jdWords.length, 1)) * 150);

    // Final weighted score (now includes education + project)
    const finalScore = Math.round(
        skillScore * 0.38 +
        expScore * 0.18 +
        domainScore * 0.15 +
        keywordScore * 0.10 +
        educationScore * 0.10 +
        projectScore * 0.09
    );
    const clampedScore = Math.min(98, Math.max(5, finalScore));

    // Verdict
    let verdict, verdictClass, verdictIcon, jobReady;
    if (clampedScore >= 75) {
        verdict = "Ready to Apply! 🎉"; verdictClass = "ready"; verdictIcon = "🚀"; jobReady = "Yes";
    } else if (clampedScore >= 50) {
        verdict = "Almost There — Minor Gaps"; verdictClass = "improve"; verdictIcon = "⚡"; jobReady = "Almost";
    } else {
        verdict = "Keep Learning & Growing"; verdictClass = "learning"; verdictIcon = "📚"; jobReady = "Not Yet";
    }

    // Strengths & Weaknesses
    const strengthsWeaknesses = analyzeStrengthsWeaknesses(result => result, {
        skillScore, expScore, domainScore, keywordScore, educationScore, projectScore,
        strongMatches, missingSkills, resumeYears, expectedYears
    });

    // Skills Gap Priority
    const skillsGap = categorizeSkillsGap(missingSkills, partialMatches, jdText, roleLevel);

    // Company Optimization
    const companyOptimization = generateCompanyOptimization(targetCompany, targetRole, roleLevel);

    // ATS Analysis
    const atsKeywords = generateATSKeywords(jdText, resumeText);
    const atsAnalysis = generateATSAnalysis(resumeText, atsKeywords);

    return {
        score: clampedScore,
        skillScore: Math.round(skillScore),
        expScore: Math.round(expScore),
        domainScore: Math.round(domainScore),
        keywordScore: Math.round(keywordScore),
        educationScore: Math.round(educationScore),
        projectScore: Math.round(projectScore),
        strongMatches, partialMatches, missingSkills, extraSkills,
        resumeYears, jdYears: expectedYears,
        resumeDomains, jdDomains,
        verdict, verdictClass, verdictIcon, jobReady,
        strengthsWeaknesses,
        skillsGap,
        companyOptimization,
        tips: generateResumeTips(strongMatches, partialMatches, missingSkills, resumeText, jdText, resumeYears, expectedYears, options),
        roadmap: generateCareerRoadmap(jdDomains, missingSkills, roleLevel, targetRole),
        atsKeywords,
        atsAnalysis,
        interviewPrep: generateInterviewPrep(jdText, resumeText, missingSkills, jdSkills, roleLevel, targetRole),
        softSkillsTips: generateSoftSkillsTips(resumeText, roleLevel),
        options,
        targetRole,
        targetCompany,
    };
}

// ==============================
//  STRENGTHS & WEAKNESSES
// ==============================
function analyzeStrengthsWeaknesses(_, data) {
    const { skillScore, expScore, domainScore, keywordScore, educationScore, projectScore,
        strongMatches, missingSkills, resumeYears, expectedYears } = data;

    const factors = [
        { label: "Technical Skills Match", score: skillScore, detail: `${strongMatches.length} skills matched out of JD requirements` },
        { label: "Industry Domain Alignment", score: domainScore, detail: "How well your domain expertise matches the job domain" },
        { label: "ATS Keyword Coverage", score: keywordScore, detail: "How many JD keywords appear in your resume" },
        { label: "Work Experience", score: expScore, detail: resumeYears > 0 ? `${resumeYears} years detected vs ${expectedYears}+ expected` : "Experience years not detected in resume" },
        { label: "Education Background", score: educationScore, detail: "Detected education level in your resume" },
        { label: "Project Relevance", score: projectScore, detail: "How well your projects align with job requirements" },
    ].sort((a, b) => b.score - a.score);

    const strengths = factors.slice(0, 3).map(f => ({ ...f, type: 'strength' }));
    const weaknesses = factors.slice(-3).reverse().map(f => ({ ...f, type: 'weakness' }));

    return { strengths, weaknesses };
}

// ==============================
//  SKILLS GAP & PRIORITY ANALYSIS
// ==============================
function categorizeSkillsGap(missingSkills, partialSkills, jdText, roleLevel) {
    const jdNorm = normalizeText(jdText);

    // Count frequency of each missing skill in JD
    const skillFreq = {};
    missingSkills.forEach(skill => {
        const count = (jdNorm.match(new RegExp(`\\b${skill.replace(/[.+#]/g, '\\$&')}\\b`, 'gi')) || []).length;
        skillFreq[skill] = count;
    });

    const highPriority = [];
    const mediumPriority = [];
    const optional = [];

    missingSkills.forEach(skill => {
        const freq = skillFreq[skill] || 0;
        const isDevops = SKILL_TAXONOMY.devops?.skills.includes(skill);
        const isCore = SKILL_TAXONOMY.backend?.skills.includes(skill) || SKILL_TAXONOMY.frontend?.skills.includes(skill);

        let improvement = '';
        const tc = titleCase(skill);
        if (LEARNING_RESOURCES[tc]) {
            improvement = `Practice on ${LEARNING_RESOURCES[tc]}`;
        } else if (isCore) {
            improvement = `Build a mini project using ${tc}. Search "${tc} crash course" on YouTube.`;
        } else if (isDevops) {
            improvement = `Complete a hands-on lab. Try "Play with ${tc}" or official sandbox environments.`;
        } else {
            improvement = `Search "${tc} tutorial for beginners" and build one real-world use case.`;
        }

        const entry = { skill: tc, freq, improvement };
        if (freq >= 2 || (isCore && freq >= 1)) highPriority.push(entry);
        else if (freq === 1 || isDevops) mediumPriority.push(entry);
        else optional.push(entry);
    });

    // Partial skills also need improvement
    const partialEntries = partialSkills.map(skill => ({
        skill: titleCase(skill),
        improvement: `Your resume has partial mention of ${titleCase(skill)}. Add concrete project examples, version numbers, or depth of usage.`,
    }));

    return { highPriority, mediumPriority, optional, partialEntries };
}

// ==============================
//  COMPANY & ROLE OPTIMIZATION
// ==============================
function generateCompanyOptimization(targetCompany, targetRole, roleLevel) {
    let companyType = 'product'; // default

    const company = (targetCompany || '').toLowerCase();
    const startupKeywords = ['startup', 'early stage', 'seed', 'series a', 'series b', 'founding'];
    const mncKeywords = ['google', 'microsoft', 'amazon', 'meta', 'apple', 'ibm', 'accenture', 'tcs', 'infosys', 'wipro', 'cognizant', 'capgemini', 'deloitte', 'pwc', 'kpmg'];
    const productKeywords = ['flipkart', 'swiggy', 'zomato', 'uber', 'ola', 'meesho', 'razorpay', 'paytm', 'phonepe', 'cred', 'groww', 'zerodha', 'dream11'];

    if (startupKeywords.some(k => company.includes(k))) companyType = 'startup';
    else if (mncKeywords.some(k => company.includes(k))) companyType = 'mnc';
    else if (productKeywords.some(k => company.includes(k))) companyType = 'product';
    else if (company.length > 0) companyType = 'product'; // assume product for unknown named companies

    const profile = COMPANY_PROFILES[companyType];
    const nextRoles = NEXT_ROLES[roleLevel] || NEXT_ROLES.mid;

    return {
        companyType,
        profile,
        nextRoles,
        targetRole,
        targetCompany,
        structureSuggestions: [
            `Resume Length: ${profile.resumeLength}`,
            `Tone: ${profile.tone}`,
            `Lead with: ${profile.focusAreas[0]} and ${profile.focusAreas[1]}`,
            `Avoid: ${profile.avoid[0]}`
        ]
    };
}

// ==============================
//  RESUME IMPROVEMENT TIPS
// ==============================
function generateResumeTips(strong, partial, missing, resumeText, jdText, rYears, jYears, options = {}) {
    const tips = [];
    const roleLabel = { entry: 'Entry Level', mid: 'Mid Level', senior: 'Senior', lead: 'Lead/Manager', exec: 'Executive' }[options.roleLevel || 'mid'] || 'this role';

    if (missing.length > 0) tips.push({ icon: "🎯", title: "Add Missing Keywords to Resume", body: `Include these JD-required skills in your resume (only if you have some knowledge): <strong>${missing.slice(0, 5).map(s => titleCase(s)).join(', ')}</strong>. Add them to your skills section and back them up with project descriptions.` });
    if (partial.length > 0) tips.push({ icon: "✍️", title: "Strengthen Partially Matched Skills", body: `These skills were somewhat matched but not explicitly called out: <strong>${partial.slice(0, 5).map(s => titleCase(s)).join(', ')}</strong>. Add specific versions, project names, or metrics to show depth.` });
    if (jYears > 0 && rYears < jYears) tips.push({ icon: "📅", title: `Bridge the Experience Gap for ${roleLabel}`, body: `This ${roleLabel} role requires <strong>${jYears}+ years</strong>. Highlight freelance projects, open-source, internships, or side projects. Quality of work > years on paper.` });
    if (!resumeText.match(/\d+%|\d+x|\$\d+|increased|reduced|improved|delivered|\d+ (users|clients|projects)/i)) tips.push({ icon: "📈", title: "Add Metrics & Numbers to Your Bullets", body: `Recruiters love numbers! Example: "Improved API response time by 40%" or "Led a team of 5 engineers" or "Reduced load time from 4s to 1.2s. Try to quantify every bullet point."` });
    tips.push({ icon: "🤖", title: "ATS Optimization Tips", body: `Use a clean single-column format. Avoid tables, images, or text boxes. Use exact keywords from the JD. Save as .pdf with standard fonts. No headers/footers with important info.` });
    if (!resumeText.toLowerCase().match(/summary|objective|profile|about me/)) tips.push({ icon: "📝", title: "Add a Professional Summary", body: `Start your resume with a 3-line summary tailored to this job. Example: "Full Stack Developer with 3+ years of experience in React & Node.js, passionate about building scalable web apps."` });
    if (!resumeText.match(/\b(built|developed|designed|implemented|led|optimized|launched|created|architected|deployed)\b/i)) tips.push({ icon: "💪", title: "Use Strong Action Verbs", body: `Start each bullet with: <em>Built, Designed, Led, Implemented, Optimized, Launched, Reduced, Integrated, Architected</em>. Avoid passive phrases like "was responsible for".` });
    tips.push({ icon: "🏷️", title: "Organize Your Skills Section", body: `Structure skills by category: <em>Languages | Frameworks | Tools | Cloud | Databases</em>. This makes it easy for both ATS and human recruiters to scan.` });

    // Weak bullet point rewrite examples
    tips.push({ icon: "✏️", title: "Rewrite Weak Bullet Points", body: `❌ Weak: "Worked on the backend of a project." <br>✅ Strong: "Developed RESTful APIs using Node.js & Express, reducing data retrieval time by 35% for 10,000+ daily users." — Use: Action verb + technology + quantified impact.` });

    return tips;
}

// ==============================
//  CAREER ROADMAP (3 Phases)
// ==============================
function generateCareerRoadmap(domains, missingSkills, roleLevel = 'mid', targetRole = '') {
    const phase1 = []; // 0-3 months
    const phase2 = []; // 3-6 months
    const phase3 = []; // 6-12 months

    // Phase 1: Immediate gaps
    missingSkills.slice(0, 3).forEach(skill => {
        phase1.push({
            skill: titleCase(skill),
            resource: LEARNING_RESOURCES[titleCase(skill)] || `Search "${titleCase(skill)} crash course" on YouTube / Udemy`,
            action: `Learn & build a small project using ${titleCase(skill)}`
        });
    });
    if (phase1.length < 2) {
        phase1.push({ skill: "Resume & Portfolio Update", resource: "github.com (create/update profile)", action: "Add 2 new projects to GitHub + update LinkedIn" });
        phase1.push({ skill: "Apply to 5 Relevant Jobs/Week", resource: "LinkedIn, Naukri, AngelList, Wellfound", action: "Tailor resume for each application — never send generic" });
    }

    // Phase 2: Skill deepening
    const trendingPool = [];
    domains.forEach(d => { if (TRENDING_SKILLS[d]) trendingPool.push(...TRENDING_SKILLS[d]); });
    const trending = [...new Set(trendingPool)].slice(0, 3);
    trending.forEach(skill => {
        phase2.push({ skill, resource: LEARNING_RESOURCES[skill] || `Explore ${skill} official docs`, action: `Build 1 portfolio project showcasing ${skill}` });
    });
    if (phase2.length === 0) {
        phase2.push({ skill: "System Design Fundamentals", resource: "Grokking System Design / ByteByteGo", action: "Study 2 system design patterns per week" });
        phase2.push({ skill: "Open Source Contribution", resource: "goodfirstissue.dev", action: "Contribute to 2–3 open source projects" });
    }
    phase2.push({ skill: "Mock Interviews", resource: "Pramp.com / Interviewing.io", action: "Do 8–10 mock interviews (technical + behavioral)" });

    // Phase 3: Career elevation
    const roleLevelNext = NEXT_ROLES[roleLevel];
    if (roleLevelNext && roleLevelNext.length > 0) {
        phase3.push({ skill: `Target Role: ${roleLevelNext[0]}`, resource: "LinkedIn job search, company careers pages", action: "Research requirements for next level and map your gap" });
    }
    phase3.push({ skill: "Cloud Certification", resource: "AWS Skill Builder / Google Cloud free tier", action: "Complete 1 professional cloud certification" });
    phase3.push({ skill: "Build in Public / Personal Brand", resource: "Twitter/X, LinkedIn, Dev.to, Medium", action: "Share projects, write technical articles monthly" });
    phase3.push({ skill: "Networking & Community", resource: "Local meetups, GitHub, Discord communities", action: "Connect with 50+ professionals in your target domain" });

    return { phase1, phase2, phase3, nextRoles: NEXT_ROLES[roleLevel] || [] };
}

// ==============================
//  ATS ANALYSIS
// ==============================
function generateATSKeywords(jdText, resumeText) {
    const jdNorm = normalizeText(jdText);
    const resumeNorm = normalizeText(resumeText);
    const words = jdNorm.split(/\s+/).filter(w => w.length > 3);
    const freq = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const stopwords = new Set(["that", "this", "with", "have", "will", "from", "they", "your", "should", "about", "which", "their", "been", "into", "more", "also", "must", "would", "than", "through", "work", "role", "team", "able", "using", "like", "some", "experience", "required", "skills", "years", "strong", "looking", "understanding", "knowledge", "working"]);
    return Object.entries(freq).filter(([w]) => !stopwords.has(w)).sort((a, b) => b[1] - a[1]).slice(0, 24).map(([word, count]) => ({ word, count, inResume: resumeNorm.includes(word) }));
}

function generateATSAnalysis(resumeText, atsKeywords) {
    const found = atsKeywords.filter(k => k.inResume).length;
    const total = atsKeywords.length;
    const passProbability = Math.round((found / Math.max(total, 1)) * 100);

    const formatRisks = [];
    if (/\btable\b/i.test(resumeText)) formatRisks.push("Tables detected — ATS systems often cannot parse table layouts correctly.");
    if (/[^\x00-\x7F]/.test(resumeText) && resumeText.match(/[^\x00-\x7F]{3,}/)) formatRisks.push("Special/Unicode characters detected — use standard ASCII text only.");
    if (resumeText.length > 5000) formatRisks.push("Resume may be too long — keep to 1–2 pages for most roles.");
    if (!resumeText.match(/\b(experience|work history|employment)\b/i)) formatRisks.push("No 'Experience' section heading detected — ATS needs standard section headers.");
    if (!resumeText.match(/\b(education|academic|university|college|degree)\b/i)) formatRisks.push("No 'Education' section detected — include this even if brief.");

    const missingKeywords = atsKeywords.filter(k => !k.inResume).map(k => k.word);
    const overusedWords = detectOverusedWords(resumeText);

    return {
        passProbability,
        passLabel: passProbability >= 70 ? 'High (Likely to Pass)' : passProbability >= 45 ? 'Medium (Possible)' : 'Low (Likely Filtered)',
        passClass: passProbability >= 70 ? 'pass' : passProbability >= 45 ? 'maybe' : 'fail',
        found, total,
        formatRisks,
        missingKeywords: missingKeywords.slice(0, 8),
        overusedWords,
        atsTips: [
            "Use a clean single-column layout — no columns, tables, or text boxes",
            "Save as PDF with standard fonts (Arial, Calibri, Times New Roman)",
            "Use exact keyword phrases from the JD — ATS does literal string matching",
            "Spell out acronyms at least once (e.g., 'Machine Learning (ML)')",
            "Include standard section headings: Summary, Experience, Education, Skills",
        ]
    };
}

function detectOverusedWords(resumeText) {
    const buzzwords = ['hardworking', 'passionate', 'team player', 'detail-oriented', 'synergy', 'guru', 'ninja', 'rockstar', 'wizard', 'dynamic', 'innovative', 'results-driven', 'proactive'];
    return buzzwords.filter(word => resumeText.toLowerCase().includes(word));
}

// ==============================
//  INTERVIEW PREPARATION
// ==============================
function generateInterviewPrep(jdText, resumeText, missingSkills, jdSkills, roleLevel, targetRole = '') {
    const questions = [];

    // Technical questions based on JD skills
    const topJdSkills = jdSkills.slice(0, 5);
    topJdSkills.forEach(skill => {
        const tc = titleCase(skill);
        questions.push({
            category: "Technical",
            question: `Explain ${tc} and describe a project where you used it.`,
            tip: `Prepare a STAR story (Situation, Task, Action, Result) for your best ${tc} project. Include specific metrics.`,
            difficulty: "Medium"
        });
    });

    // Weakness-based questions (from missing skills)
    missingSkills.slice(0, 2).forEach(skill => {
        const tc = titleCase(skill);
        questions.push({
            category: "Gap Question",
            question: `We see ${tc} is in our requirements. How familiar are you with it, and how would you get up to speed?`,
            tip: `Be honest — say you have foundational understanding or are actively learning. Show eagerness: "I've been following tutorials and plan to complete a project by [date]."`,
            difficulty: "Hard"
        });
    });

    // Role-level behavioral questions
    const behavioralByLevel = {
        entry: [
            "Tell me about a challenging coding problem you solved recently.",
            "How do you approach learning a new technology quickly?",
            "Describe a time you worked effectively in a team on a project.",
        ],
        mid: [
            "Describe a time you improved the performance of a system. What was your approach?",
            "Tell me about a time you disagreed with a technical decision. How did you handle it?",
            "How do you handle technical debt in a fast-moving project?",
        ],
        senior: [
            "How have you mentored junior developers? What was your approach?",
            "Describe a system you designed from scratch. What tradeoffs did you make?",
            "Tell me about a time you had to make a critical technical decision under pressure.",
        ],
        lead: [
            "How do you balance technical work with people management?",
            "Describe how you've built and grown an engineering team.",
            "How do you align engineering priorities with business objectives?",
        ],
        exec: [
            "How do you build an engineering culture at scale?",
            "Describe your approach to long-term technical strategy.",
            "How do you manage relationships between engineering and other business units?",
        ]
    };

    const behavioralQuestions = behavioralByLevel[roleLevel] || behavioralByLevel.mid;
    behavioralQuestions.forEach(q => {
        questions.push({
            category: "Behavioral",
            question: q,
            tip: "Use the STAR method: Situation → Task → Action → Result. Keep answers to 90–120 seconds maximum.",
            difficulty: "Medium"
        });
    });

    // System design (for senior+)
    if (['senior', 'lead', 'exec'].includes(roleLevel)) {
        questions.push({
            category: "System Design",
            question: `Design a scalable ${targetRole || 'web'} system that handles 1 million daily users.`,
            tip: "Cover: Requirements, High-Level Architecture, Database design, Caching strategy, Load balancing, Failure handling, Trade-offs.",
            difficulty: "Hard"
        });
    }

    // Culture fit
    questions.push({
        category: "Culture Fit",
        question: "Why do you want to work here specifically? What excites you about this role?",
        tip: "Research the company beforehand — mention specific products, missions, or engineering blog posts. Show genuine interest, not just 'good salary'.",
        difficulty: "Easy"
    });
    questions.push({
        category: "Culture Fit",
        question: "Where do you see yourself in 3–5 years?",
        tip: "Align your answer with the role's growth path. Show ambition, but be realistic and show you care about the company's mission too.",
        difficulty: "Easy"
    });

    return {
        questions: questions.slice(0, 10),
        quickTips: [
            "Research the company: Read their engineering blog, product, and mission.",
            "Prepare 3 strong STAR stories you can adapt for multiple behavioral questions.",
            "Practice explaining your best project in 2 minutes — clearly and concisely.",
            "Prepare 5 thoughtful questions to ask the interviewer.",
            "Send a thank-you email within 24 hours after the interview.",
        ]
    };
}

// ==============================
//  SOFT SKILLS & VIDEO RESUME TIPS
// ==============================
function generateSoftSkillsTips(resumeText, roleLevel) {
    const hasSoftSkills = /\b(communication|leadership|teamwork|collaboration|mentoring|presentation)\b/i.test(resumeText);

    const videoTips = [
        "Start with a confident greeting: 'Hi, I'm [Name], a [role] with [X] years of experience in [domain]'",
        "Mention your top 3 skills or achievements — be specific with numbers",
        "Express why you're excited about THIS specific role and company",
        "Keep it under 90 seconds — recruiter attention drops fast",
        "Use good lighting, a quiet environment, and dress professionally",
        "Slow down your speech and pause after key points for impact",
        "Look at the camera (not the screen preview) to create eye contact",
        "End with a clear call-to-action: 'I'd love to connect and discuss further'"
    ];

    const softSkillAdvice = [
        { skill: "Communication", tip: "Clearly articulate complex ideas using the 'So What' framework — always connect your point to the listener's concern.", icon: "🗣️" },
        { skill: "Confidence", tip: "Prepare and rehearse. Confidence = preparation + self-awareness. Practice your intro 10+ times before interviews.", icon: "💪" },
        { skill: "Active Listening", tip: "In interviews, pause before answering. Repeat the question back if unclear. It shows thoughtfulness, not weakness.", icon: "👂" },
        { skill: "Storytelling", tip: "Use the STAR method for every behavioral question. Practice until your stories flow naturally under pressure.", icon: "📖" },
        { skill: "Body Language", tip: "Sit upright, make frequent-but-not-constant eye contact, and avoid filler words like 'um', 'like', 'you know'.", icon: "🧍" },
    ];

    const commonMistakes = [
        "Reading from a script — it sounds robotic. Use bullet notes, not a word-for-word script.",
        "Focusing only on responsibilities, not achievements — always show impact.",
        "Poor audio quality — use a headset or external mic if possible.",
        "Background distractions — find a plain, clean wall or use a simple virtual background.",
        "Forgetting to smile — warmth is a soft skill too!"
    ];

    return { videoTips, softSkillAdvice, commonMistakes, hasSoftSkills };
}

// ==============================
//  UTILITIES
// ==============================
function titleCase(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

window.ResumeAnalyzer = { analyzeMatch, extractSkillsFromText, titleCase, COMPANY_PROFILES };
