// ============================================================
// features.js — Download Report, Video Resume, Feedback
// ============================================================

// =====================
//   DOWNLOAD REPORT
// =====================
const DownloadReport = {
    generate(result) {
        if (!result) return;

        const score = result.score;
        const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
        const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>ResumeMatch AI — Analysis Report</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; color: #1a1a2e; line-height: 1.6; }
  .wrapper { max-width: 820px; margin: 0 auto; padding: 40px 32px; }
  .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 32px; border-radius: 16px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; }
  .brand { font-size: 24px; font-weight: 800; }
  .brand span { color: #a78bfa; }
  .meta { font-size: 13px; color: #94a3b8; text-align: right; }
  .score-hero { text-align: center; background: white; border: 2px solid ${color}; border-radius: 16px; padding: 32px; margin-bottom: 24px; }
  .score-num { font-size: 72px; font-weight: 900; color: ${color}; line-height: 1; }
  .score-label { font-size: 20px; font-weight: 700; color: #4a5568; margin-top: 8px; }
  .verdict-box { background: ${color}22; border: 2px solid ${color}55; border-radius: 12px; padding: 20px; margin-top: 16px; }
  .verdict-box h3 { color: ${color}; font-size: 18px; margin-bottom: 6px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
  .card h3 { font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #2d3748; padding-bottom: 10px; border-bottom: 2px solid #f0f0f0; }
  .pill { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin: 3px; }
  .pill-g { background: #d1fae5; color: #065f46; }
  .pill-y { background: #fef3c7; color: #92400e; }
  .pill-r { background: #fee2e2; color: #991b1b; }
  .bar-row { margin-bottom: 12px; }
  .bar-label { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px; }
  .bar-track { height: 8px; background: #f0f0f0; border-radius: 8px; }
  .bar-fill { height: 100%; border-radius: 8px; }
  .tip { display: flex; gap: 12px; padding: 14px; background: #f8f9fa; border-radius: 10px; margin-bottom: 10px; }
  .tip-icon { font-size: 20px; }
  .tip-title { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
  .tip-body { font-size: 13px; color: #4a5568; }
  .roadmap-item { display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start; }
  .roadmap-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
  .dot-g { background: #10b981; }
  .dot-p { background: #8b5cf6; }
  .footer { text-align: center; margin-top: 40px; color: #718096; font-size: 12px; }
  @media print { body { background: white; } .wrapper { padding: 20px; } }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <div class="brand">Resume<span>Match</span> AI</div>
    <div class="meta">Analysis Report<br/>${date}</div>
  </div>

  <div class="score-hero">
    <div class="score-num">${score}%</div>
    <div class="score-label">${result.verdict.replace(/[🎉⚡📚]/g, '')}</div>
    <div class="verdict-box">
      <h3>${result.verdict}</h3>
      <p style="font-size:14px;color:#4a5568">${UI ? UI.getVerdictMessage(result.verdictClass, result.score) : ''}</p>
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <h3>📊 Score Breakdown</h3>
      ${[
                { label: 'Skills Match', score: result.skillScore },
                { label: 'Experience', score: result.expScore },
                { label: 'Domain Fit', score: result.domainScore },
                { label: 'ATS Keywords', score: result.keywordScore },
            ].map(b => `
        <div class="bar-row">
          <div class="bar-label"><span>${b.label}</span><strong>${b.score}%</strong></div>
          <div class="bar-track"><div class="bar-fill" style="width:${b.score}%;background:${b.score >= 70 ? '#10b981' : b.score >= 45 ? '#f59e0b' : '#ef4444'}"></div></div>
        </div>
      `).join('')}
    </div>
    <div class="card">
      <h3>🧬 Skill Summary</h3>
      <p style="font-size:13px;color:#718096;margin-bottom:10px">✅ Matched: <strong>${result.strongMatches.length}</strong> &nbsp; ⚠️ Partial: <strong>${result.partialMatches.length}</strong> &nbsp; ❌ Missing: <strong>${result.missingSkills.length}</strong></p>
      <div>${result.strongMatches.slice(0, 8).map(s => `<span class="pill pill-g">${s}</span>`).join('')}</div>
      <div style="margin-top:6px">${result.partialMatches.slice(0, 5).map(s => `<span class="pill pill-y">${s}</span>`).join('')}</div>
      <div style="margin-top:6px">${result.missingSkills.slice(0, 6).map(s => `<span class="pill pill-r">${s}</span>`).join('')}</div>
    </div>
  </div>

  <div class="card" style="margin-bottom:20px">
    <h3>🛠 Resume Improvement Tips</h3>
    ${result.tips.slice(0, 5).map(tip => `
      <div class="tip">
        <div class="tip-icon">${tip.icon}</div>
        <div><div class="tip-title">${tip.title}</div><div class="tip-body">${tip.body.replace(/<[^>]+>/g, '')}</div></div>
      </div>
    `).join('')}
  </div>

  <div class="grid">
    <div class="card">
      <h3>⚡ Short-Term Goals</h3>
      ${result.roadmap.shortTerm.map(r => `
        <div class="roadmap-item"><div class="roadmap-dot dot-g"></div><div><strong style="font-size:13px">${r.skill}</strong><p style="font-size:12px;color:#718096">${r.resource}</p></div></div>
      `).join('')}
    </div>
    <div class="card">
      <h3>🌟 Long-Term Goals</h3>
      ${result.roadmap.longTerm.map(r => `
        <div class="roadmap-item"><div class="roadmap-dot dot-p"></div><div><strong style="font-size:13px">${r.skill}</strong><p style="font-size:12px;color:#718096">${r.resource}</p></div></div>
      `).join('')}
    </div>
  </div>

  <div class="footer">
    Generated by ResumeMatch AI · ${date} · All data processed locally in your browser
  </div>
</div>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ResumeMatch_Report_${new Date().toISOString().slice(0, 10)}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

// =====================
//   VIDEO RESUME
// =====================
const VideoResume = {
    mediaRecorder: null,
    chunks: [],
    stream: null,
    recording: false,

    init() {
        const uploadInput = document.getElementById('video-upload-input');
        const recordBtn = document.getElementById('video-record-btn');

        if (uploadInput) {
            uploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) VideoResume.loadVideo(URL.createObjectURL(file), file.name);
            });
        }

        if (recordBtn) {
            recordBtn.addEventListener('click', () => {
                if (VideoResume.recording) VideoResume.stopRecording();
                else VideoResume.startRecording();
            });
        }
    },

    loadVideo(src, name) {
        const player = document.getElementById('video-player');
        const placeholder = document.getElementById('video-placeholder');
        const info = document.getElementById('video-info');
        if (!player) return;

        player.src = src;
        player.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        if (info) info.textContent = `📹 ${name || 'Recorded video'}`;
    },

    async startRecording() {
        try {
            VideoResume.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const preview = document.getElementById('video-player');
            if (preview) { preview.srcObject = VideoResume.stream; preview.muted = true; preview.play(); preview.style.display = 'block'; }

            VideoResume.chunks = [];
            VideoResume.mediaRecorder = new MediaRecorder(VideoResume.stream);
            VideoResume.mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) VideoResume.chunks.push(e.data); };
            VideoResume.mediaRecorder.onstop = () => {
                const blob = new Blob(VideoResume.chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                VideoResume.stream.getTracks().forEach(t => t.stop());
                const preview = document.getElementById('video-player');
                if (preview) { preview.srcObject = null; preview.src = url; preview.muted = false; preview.controls = true; }
                const info = document.getElementById('video-info');
                if (info) info.textContent = '📹 Recorded video (ready to review)';
            };

            VideoResume.mediaRecorder.start();
            VideoResume.recording = true;

            const recordBtn = document.getElementById('video-record-btn');
            if (recordBtn) {
                recordBtn.textContent = I18N.t('videoStopBtn');
                recordBtn.classList.add('recording');
            }

            // Auto-stop after 60 seconds
            setTimeout(() => { if (VideoResume.recording) VideoResume.stopRecording(); }, 60000);
        } catch (err) {
            alert('Camera access denied. Please allow camera & microphone access to record.');
        }
    },

    stopRecording() {
        if (VideoResume.mediaRecorder && VideoResume.recording) {
            VideoResume.mediaRecorder.stop();
            VideoResume.recording = false;
            const recordBtn = document.getElementById('video-record-btn');
            if (recordBtn) {
                recordBtn.textContent = I18N.t('videoRecordBtn');
                recordBtn.classList.remove('recording');
            }
        }
    }
};

// =====================
//   FEEDBACK & RATING
// =====================
const Feedback = {
    STORAGE_KEY: 'rmFeedback',

    init() {
        // Star rating
        document.querySelectorAll('.star-btn').forEach(star => {
            star.addEventListener('click', () => {
                const val = parseInt(star.dataset.value);
                Feedback.setRating(val);
            });
            star.addEventListener('mouseenter', () => {
                const val = parseInt(star.dataset.value);
                Feedback.highlightStars(val);
            });
            star.addEventListener('mouseleave', () => {
                const saved = Feedback.getCurrentRating();
                Feedback.highlightStars(saved);
            });
        });

        // Submit
        const submitBtn = document.getElementById('feedback-submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', Feedback.submit);
        }

        // Load stats
        Feedback.updateStats();
    },

    getCurrentRating() {
        const data = JSON.parse(localStorage.getItem(Feedback.STORAGE_KEY) || '{}');
        return data.currentRating || 0;
    },

    setRating(val) {
        const data = JSON.parse(localStorage.getItem(Feedback.STORAGE_KEY) || '{}');
        data.currentRating = val;
        localStorage.setItem(Feedback.STORAGE_KEY, JSON.stringify(data));
        Feedback.highlightStars(val);
    },

    highlightStars(count) {
        document.querySelectorAll('.star-btn').forEach(star => {
            const val = parseInt(star.dataset.value);
            star.classList.toggle('active', val <= count);
        });
    },

    submit() {
        const rating = Feedback.getCurrentRating();
        if (rating === 0) { alert('Please select a star rating first!'); return; }

        const comment = document.getElementById('feedback-text')?.value || '';
        const data = JSON.parse(localStorage.getItem(Feedback.STORAGE_KEY) || '{}');
        const entries = data.entries || [];
        entries.push({ rating, comment, date: new Date().toISOString() });
        data.entries = entries;
        data.currentRating = 0;
        localStorage.setItem(Feedback.STORAGE_KEY, JSON.stringify(data));

        // Show thanks
        const form = document.getElementById('feedback-form');
        const thanks = document.getElementById('feedback-thanks');
        if (form) form.style.display = 'none';
        if (thanks) thanks.style.display = 'flex';

        Feedback.highlightStars(0);
        if (document.getElementById('feedback-text')) document.getElementById('feedback-text').value = '';

        Feedback.updateStats();
    },

    updateStats() {
        const data = JSON.parse(localStorage.getItem(Feedback.STORAGE_KEY) || '{}');
        const entries = data.entries || [];
        const countEl = document.getElementById('feedback-count');
        const avgEl = document.getElementById('feedback-avg');

        if (countEl) countEl.textContent = `${entries.length} ${I18N.t('feedbackRatings')}`;
        if (avgEl && entries.length > 0) {
            const avg = (entries.reduce((s, e) => s + e.rating, 0) / entries.length).toFixed(1);
            avgEl.textContent = `⭐ ${avg} avg`;
        }
    },

    reset() {
        const form = document.getElementById('feedback-form');
        const thanks = document.getElementById('feedback-thanks');
        if (form) form.style.display = 'block';
        if (thanks) thanks.style.display = 'none';
    }
};

window.DownloadReport = DownloadReport;
window.VideoResume = VideoResume;
window.Feedback = Feedback;
