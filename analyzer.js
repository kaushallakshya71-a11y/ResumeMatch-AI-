// ============================================================
// analyzer.js — Skill Taxonomy, Scoring Engine & AI Matching
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
};

// ======================
//  TEXT PARSING HELPERS
// ======================
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

// ======================
//   CORE SCORING ENGINE
// ======================
function analyzeMatch(resumeText, jdText, options = {}) {
    const { roleLevel = 'mid', industry = 'tech', prioritySkills = [] } = options;

    const resumeSkills = extractSkillsFromText(resumeText);
    const jdSkills = extractSkillsFromText(jdText);
    const resumeYears = extractYearsOfExperience(resumeText);
    const jdYears = extractYearsOfExperience(jdText);
    const resumeDomains = detectDomain(resumeSkills);
    const jdDomains = detectDomain(jdSkills);

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

    const finalScore = Math.round(skillScore * 0.50 + expScore * 0.20 + domainScore * 0.20 + keywordScore * 0.10);
    const clampedScore = Math.min(98, Math.max(5, finalScore));

    let verdict, verdictClass, verdictIcon;
    if (clampedScore >= 75) { verdict = "Ready to Apply! 🎉"; verdictClass = "ready"; verdictIcon = "🚀"; }
    else if (clampedScore >= 50) { verdict = "Needs Some Improvement"; verdictClass = "improve"; verdictIcon = "⚡"; }
    else { verdict = "Keep Learning & Growing"; verdictClass = "learning"; verdictIcon = "📚"; }

    return {
        score: clampedScore,
        skillScore: Math.round(skillScore),
        expScore: Math.round(expScore),
        domainScore: Math.round(domainScore),
        keywordScore: Math.round(keywordScore),
        strongMatches, partialMatches, missingSkills, extraSkills,
        resumeYears, jdYears: expectedYears,
        resumeDomains, jdDomains,
        verdict, verdictClass, verdictIcon,
        tips: generateResumeTips(strongMatches, partialMatches, missingSkills, resumeText, jdText, resumeYears, expectedYears, options),
        roadmap: generateCareerRoadmap(jdDomains, missingSkills),
        atsKeywords: generateATSKeywords(jdText, resumeText),
        options,
    };
}

function generateResumeTips(strong, partial, missing, resumeText, jdText, rYears, jYears, options = {}) {
    const tips = [];
    const roleLabel = { entry: 'Entry Level', mid: 'Mid Level', senior: 'Senior', lead: 'Lead/Manager', exec: 'Executive' }[options.roleLevel || 'mid'] || 'this role';

    if (missing.length > 0) tips.push({ icon: "🎯", title: "Add Missing Keywords to Resume", body: `Include these JD-required skills in your resume (only if you have some knowledge): <strong>${missing.slice(0, 5).map(s => titleCase(s)).join(', ')}</strong>. Add them to your skills section and back them up with project descriptions.` });
    if (partial.length > 0) tips.push({ icon: "✍️", title: "Strengthen Partially Matched Skills", body: `These skills were somewhat matched but not explicitly called out: <strong>${partial.slice(0, 5).map(s => titleCase(s)).join(', ')}</strong>. Add specific versions, project names, or metrics to show depth.` });
    if (jYears > 0 && rYears < jYears) tips.push({ icon: "📅", title: `Bridge the Experience Gap for ${roleLabel}`, body: `This ${roleLabel} role requires <strong>${jYears}+ years</strong>. Highlight freelance projects, open-source, internships, or side projects. Quality of work > years on paper.` });
    if (!resumeText.match(/\d+%|\d+x|\$\d+|increased|reduced|improved|delivered|\d+ (users|clients|projects)/i)) tips.push({ icon: "📈", title: "Add Metrics & Numbers to Your Bullets", body: `Recruiters love numbers! Example: "Improved API response time by 40%" or "Led a team of 5 engineers" or "Reduced load time from 4s to 1.2s".` });
    tips.push({ icon: "🤖", title: "ATS Optimization Tips", body: `Use a clean single-column format. Avoid tables, images, or text boxes. Use exact keywords from the JD. Save as .pdf with standard fonts.` });
    if (!resumeText.toLowerCase().match(/summary|objective|profile|about me/)) tips.push({ icon: "📝", title: "Add a Professional Summary", body: `Start your resume with a 3-line summary tailored to this job. Example: "Full Stack Developer with 3+ years of experience in React & Node.js, passionate about building scalable web apps."` });
    if (!resumeText.match(/\b(built|developed|designed|implemented|led|optimized|launched|created|architected|deployed)\b/i)) tips.push({ icon: "💪", title: "Use Strong Action Verbs", body: `Start each bullet with: <em>Built, Designed, Led, Implemented, Optimized, Launched, Reduced, Integrated, Architected</em>. Avoid passive phrases like "was responsible for".` });
    tips.push({ icon: "🏷️", title: "Organize Your Skills Section", body: `Structure skills by category: <em>Languages | Frameworks | Tools | Cloud | Databases</em>. This makes it easy for both ATS and human recruiters to scan.` });
    return tips;
}

function generateCareerRoadmap(domains, missingSkills) {
    const shortTerm = [];
    const longTerm = [];
    missingSkills.slice(0, 4).forEach(skill => {
        shortTerm.push({ skill: titleCase(skill), resource: LEARNING_RESOURCES[titleCase(skill)] || `Search "${titleCase(skill)} tutorial" on YouTube / Udemy` });
    });
    if (shortTerm.length < 3) {
        shortTerm.push({ skill: "Portfolio Project", resource: "Build 2-3 projects matching this job's stack and push to GitHub" });
        shortTerm.push({ skill: "LinkedIn Profile", resource: "Update LinkedIn with all skills, add 'Open to Work', and connect with target company employees" });
    }
    const trendingPool = [];
    domains.forEach(d => { if (TRENDING_SKILLS[d]) trendingPool.push(...TRENDING_SKILLS[d]); });
    const trending = [...new Set(trendingPool)].slice(0, 5);
    trending.forEach(skill => longTerm.push({ skill, resource: LEARNING_RESOURCES[skill] || `Explore ${skill} on official docs or YouTube` }));
    if (longTerm.length === 0) {
        longTerm.push({ skill: "Cloud Certification (AWS/GCP/Azure)", resource: "AWS Skill Builder — free tier available" });
        longTerm.push({ skill: "System Design", resource: "Grokking System Design / ByteByteGo" });
        longTerm.push({ skill: "Open Source Contribution", resource: "goodfirstissue.dev — beginner-friendly issues" });
    }
    return { shortTerm, longTerm };
}

function generateATSKeywords(jdText, resumeText) {
    const jdNorm = normalizeText(jdText);
    const resumeNorm = normalizeText(resumeText);
    const words = jdNorm.split(/\s+/).filter(w => w.length > 3);
    const freq = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const stopwords = new Set(["that", "this", "with", "have", "will", "from", "they", "your", "should", "about", "which", "their", "been", "into", "more", "also", "must", "would", "than", "through", "work", "role", "team", "able", "using", "like", "some", "experience", "required", "skills", "years", "strong", "looking", "understanding", "knowledge", "working"]);
    return Object.entries(freq).filter(([w]) => !stopwords.has(w)).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([word, count]) => ({ word, count, inResume: resumeNorm.includes(word) }));
}

function titleCase(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

window.ResumeAnalyzer = { analyzeMatch, extractSkillsFromText, titleCase };
