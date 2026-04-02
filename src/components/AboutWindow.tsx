export default function AboutWindow() {
  return (
    <div style={{ padding: '40px 48px', fontFamily: 'var(--font-body)', height: '100%', overflowY: 'auto' }}>
      {/* Avatar + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 36 }}>
        <div style={{
          width: 110, height: 110, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1565c0, #2589e8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 52, flexShrink: 0,
          boxShadow: '0 6px 20px rgba(21,101,192,0.35)'
        }}>👤</div>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 40, fontWeight: 800,
            color: 'var(--os-text)', lineHeight: 1.1
          }}>Raveesh Sehrawat</h1>
          <p style={{ color: 'var(--os-accent)', fontWeight: 600, marginTop: 8, fontSize: 18 }}>
            Data Science &amp; ML Engineer
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            {['AI/ML', 'RAG', 'NLP', 'Deep Learning', 'LLM'].map(t => (
              <span key={t} className="skill-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(21,101,192,0.3), transparent)', marginBottom: 24 }} />

      {/* Bio sections */}
      <div style={{ display: 'grid', gap: 20 }}>
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--os-accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            // whoami
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--os-text-muted)' }}>
            Data Science &amp; Machine Learning Engineer pursuing <strong style={{ color: 'var(--os-text)' }}>B.Tech in AI &amp; Data Science</strong> (Expected June 2027) from University School of Automation &amp; Robotics, Delhi. Passionate about building intelligent systems with practical impact — from speaker diarization pipelines to RAG-powered financial Q&amp;A systems.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--os-accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
            // work experience
          </h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ padding: '12px 14px', borderRadius: 8, background: 'rgba(21,101,192,0.06)', border: '1px solid rgba(21,101,192,0.1)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--os-text)' }}>ML &amp; Fullstack Engineering Trainee</div>
              <div style={{ fontSize: 13, color: 'var(--os-accent)', marginTop: 2 }}>Centre for Development of Telematics (CDoT), Delhi • Jun–Jul 2025</div>
              <ul style={{ fontSize: 13.5, color: 'var(--os-text-muted)', marginTop: 8, paddingLeft: 20, lineHeight: 1.6 }}>
                <li>Cut API latency by 40% and data-fetch errors by 35% via FastAPI profiling</li>
                <li>Fine-tuned pyannote speaker diarization model achieving 92% identification accuracy</li>
                <li>Improved page-load performance by 20% through modular architecture</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--os-accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            // education
          </h2>
          <div style={{ padding: '12px 14px', borderRadius: 8, background: 'rgba(21,101,192,0.06)', border: '1px solid rgba(21,101,192,0.1)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--os-text)' }}>B.Tech — AI &amp; Data Science</div>
            <div style={{ fontSize: 13, color: 'var(--os-accent)', marginTop: 3 }}>University School of Automation &amp; Robotics, Delhi</div>
            <div style={{ fontSize: 13, color: 'var(--os-text-muted)', marginTop: 6 }}>📊 CGPA: <strong style={{ color: 'var(--os-text)' }}>8.25/10</strong></div>
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--os-accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
            // certifications
          </h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { name: 'Applied Data Science & ML', org: 'IIT Kanpur' },
              { name: 'Agentic AI', org: 'IBM SkillsBuild' },
              { name: 'Data Analysis with Python', org: 'IBM SkillsBuild' }
            ].map(cert => (
              <div key={cert.name} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(37,137,232,0.08)', border: '1px solid rgba(37,137,232,0.2)' }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--os-text)' }}>{cert.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--os-accent)', marginTop: 2 }}>via {cert.org}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--os-accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            // location
          </h2>
          <p style={{ fontSize: 14, color: 'var(--os-text-muted)' }}>📍 Delhi, India</p>
        </section>
      </div>
    </div>
  )
}
