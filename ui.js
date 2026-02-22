// ============================================================
// ui.js — Dynamic UI Rendering & Animations
// ============================================================

const UI = {

    // ---- Score Ring ----
    animateScoreRing(score) {
        const ring = document.getElementById('score-ring-circle');
        const scoreText = document.getElementById('score-number');
        const scoreLabel = document.getElementById('score-label');
        const circumference = 2 * Math.PI * 54;

        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;

        let current = 0;
        const duration = 1800;
        const start = performance.now();

        // Color gradient based on score
        let color;
        if (score >= 75) color = '#10f580';
        else if (score >= 50) color = '#f5a623';
        else color = '#f55c5c';
        ring.style.stroke = color;

        function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.round(eased * score);
            const offset = circumference - (circumference * current / 100);
            ring.style.strokeDashoffset = offset;
            scoreText.textContent = current + '%';

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                scoreText.textContent = score + '%';
                scoreLabel.textContent = UI.getScoreLabel(score);
                scoreLabel.style.color = color;
            }
        }
        requestAnimationFrame(animate);
    },

    getScoreLabel(score) {
        if (score >= 85) return 'Excellent Match!';
        if (score >= 70) return 'Strong Match';
        if (score >= 55) return 'Good Match';
        if (score >= 40) return 'Moderate Match';
        return 'Low Match';
    },

    // ---- Sub Score Bars ----
    renderSubScores(result) {
        const bars = [
            { id: 'bar-skills', score: result.skillScore, label: 'Skills Match' },
            { id: 'bar-exp', score: result.expScore, label: 'Experience' },
            { id: 'bar-domain', score: result.domainScore, label: 'Domain Fit' },
            { id: 'bar-ats', score: result.keywordScore, label: 'ATS Keywords' },
        ];
        bars.forEach(({ id, score }) => {
            const bar = document.getElementById(id);
            if (!bar) return;
            const fill = bar.querySelector('.bar-fill');
            const num = bar.querySelector('.bar-num');
            setTimeout(() => {
                fill.style.width = score + '%';
                fill.style.background = score >= 70 ? 'var(--green)' : score >= 45 ? 'var(--yellow)' : 'var(--red)';
                num.textContent = score + '%';
            }, 400);
        });
    },

    // ---- Skill Pills ----
    renderSkills(result) {
        UI.renderPills('strong-skills-list', result.strongMatches, 'pill-green');
        UI.renderPills('partial-skills-list', result.partialMatches, 'pill-yellow');
        UI.renderPills('missing-skills-list', result.missingSkills, 'pill-red');
        UI.renderPills('extra-skills-list', result.extraSkills, 'pill-blue');

        document.getElementById('strong-count').textContent = result.strongMatches.length;
        document.getElementById('partial-count').textContent = result.partialMatches.length;
        document.getElementById('missing-count').textContent = result.missingSkills.length;
    },

    renderPills(containerId, skills, cls) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (skills.length === 0) {
            container.innerHTML = '<span class="no-skills">None detected</span>';
            return;
        }
        container.innerHTML = skills.map(skill =>
            `<span class="skill-pill ${cls}">${UI.titleCase(skill)}</span>`
        ).join('');
    },

    titleCase(str) {
        return str.replace(/\b\w/g, l => l.toUpperCase());
    },

    // ---- Resume Tips ----
    renderTips(tips) {
        const container = document.getElementById('tips-container');
        if (!container || !tips.length) return;
        container.innerHTML = tips.map((tip, i) => `
      <div class="tip-card" style="animation-delay: ${i * 0.08}s">
        <div class="tip-icon">${tip.icon}</div>
        <div class="tip-content">
          <h4>${tip.title}</h4>
          <p>${tip.body}</p>
        </div>
      </div>
    `).join('');
    },

    // ---- Career Roadmap ----
    renderRoadmap(roadmap) {
        const stContainer = document.getElementById('short-term-list');
        const ltContainer = document.getElementById('long-term-list');

        if (stContainer) {
            stContainer.innerHTML = roadmap.shortTerm.map((item, i) => `
        <div class="roadmap-item" style="animation-delay: ${i * 0.1}s">
          <div class="roadmap-dot"></div>
          <div>
            <strong>${item.skill}</strong>
            <p>${item.resource}</p>
          </div>
        </div>
      `).join('');
        }

        if (ltContainer) {
            ltContainer.innerHTML = roadmap.longTerm.map((item, i) => `
        <div class="roadmap-item future" style="animation-delay: ${i * 0.1}s">
          <div class="roadmap-dot"></div>
          <div>
            <strong>${item.skill}</strong>
            <p>${item.resource}</p>
          </div>
        </div>
      `).join('');
        }
    },

    // ---- ATS Keyword Cloud ----
    renderATSKeywords(keywords) {
        const container = document.getElementById('ats-keywords');
        if (!container) return;
        container.innerHTML = keywords.map(kw => `
      <span class="ats-pill ${kw.inResume ? 'ats-found' : 'ats-missing'}" title="${kw.inResume ? '✅ Found in resume' : '❌ Not in resume — Add this!'}">
        ${kw.word} ${kw.inResume ? '✓' : '✗'}
      </span>
    `).join('');
    },

    // ---- Verdict Banner ----
    renderVerdict(result) {
        const el = document.getElementById('verdict-badge');
        if (!el) return;
        el.className = `verdict-badge verdict-${result.verdictClass}`;
        el.innerHTML = `
      <span class="verdict-icon">${result.verdictIcon}</span>
      <div>
        <div class="verdict-title">${result.verdict}</div>
        <div class="verdict-sub">${UI.getVerdictMessage(result.verdictClass, result.score)}</div>
      </div>
    `;
    },

    getVerdictMessage(cls, score) {
        switch (cls) {
            case 'ready': return `You're a great match! Tailor your cover letter and apply with confidence. Top ${100 - score}% applicants won't have your background.`;
            case 'improve': return `You're on the right track! A few skill additions & resume tweaks will make you a much stronger candidate. Keep going! 💪`;
            case 'learning': return `Every expert was once a beginner! Follow the roadmap below, build projects, and reapply in 2-3 months. You've got this! 🌱`;
        }
    },

    // ---- Experience Info ----
    renderExperienceInfo(result) {
        const el = document.getElementById('exp-info');
        if (!el) return;
        if (result.resumeYears > 0 || result.jdYears > 0) {
            el.innerHTML = `
        <div class="exp-row">
          <span>📋 Job Requires:</span><strong>${result.jdYears > 0 ? result.jdYears + '+ years' : 'Not specified'}</strong>
        </div>
        <div class="exp-row">
          <span>👤 Your Experience:</span><strong>${result.resumeYears > 0 ? result.resumeYears + ' years (detected)' : 'Not detected'}</strong>
        </div>
      `;
        } else {
            el.innerHTML = `<p class="dim">Experience years not explicitly detected. Add "X years of experience" to your resume for better ATS matching.</p>`;
        }
    },

    // ---- Main Render ----
    renderResults(result) {
        // Show results section
        const section = document.getElementById('results-section');
        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Animate score ring
        setTimeout(() => UI.animateScoreRing(result.score), 200);

        // Sub scores
        setTimeout(() => UI.renderSubScores(result), 300);

        // Skills
        UI.renderSkills(result);

        // Verdict
        UI.renderVerdict(result);

        // Experience
        UI.renderExperienceInfo(result);

        // Tips
        UI.renderTips(result.tips);

        // Roadmap
        UI.renderRoadmap(result.roadmap);

        // ATS Keywords
        UI.renderATSKeywords(result.atsKeywords);

        // Nav active
        UI.setActiveNav('match-score');

        // Tab reveals
        document.querySelectorAll('.result-card').forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(24px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + i * 100);
        });
    },

    // ---- Nav ----
    setActiveNav(id) {
        document.querySelectorAll('.side-nav a').forEach(a => a.classList.remove('active'));
        const target = document.querySelector(`.side-nav a[href="#${id}"]`);
        if (target) target.classList.add('active');
    },

    // ---- Loading State ----
    showLoading() {
        const btn = document.getElementById('analyze-btn');
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner"></span> Analyzing...`;
    },

    hideLoading() {
        const btn = document.getElementById('analyze-btn');
        btn.disabled = false;
        btn.innerHTML = `<span>🔍</span> Analyze Match`;
    },

    // ---- Char counts ----
    updateCharCount(id, countId) {
        const el = document.getElementById(id);
        const counter = document.getElementById(countId);
        if (el && counter) {
            counter.textContent = el.value.length + ' characters';
        }
    },
};

window.UI = UI;
