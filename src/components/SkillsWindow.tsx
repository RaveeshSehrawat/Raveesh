const skillCategories = [
  {
    category: 'ML / DL',
    skills: ['CNNs', 'Deep Learning', 'Random Forest', 'SMOTE', 'Speaker Diarization', 'pyannote', 'Embeddings', 'LLM Fine-Tuning', 'RAG', 'MCP', 'NLP', 'Vector Databases', 'Prompt Engineering']
  },
  {
    category: 'Languages',
    skills: ['Python', 'C++', 'SQL', 'JavaScript', 'TypeScript']
  },
  {
    category: 'Frameworks',
    skills: ['TensorFlow', 'FastAPI', 'Flask', 'Next.js', 'Node.js', 'Express.js']
  },
  {
    category: 'Data & BI',
    skills: ['Feature Engineering', 'Pandas', 'NumPy', 'Matplotlib', 'Power BI', 'Tableau']
  },
  {
    category: 'DevOps & DB',
    skills: ['Docker', 'Kubernetes', 'PostgreSQL', 'MySQL', 'Git', 'GitHub Actions', 'Google Cloud', 'Streamlit']
  }
]

const headerStyles = {
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 40,
    fontWeight: 800,
    color: 'var(--os-text)',
    lineHeight: 1.1
  } as React.CSSProperties,
  subtitle: {
    color: 'var(--os-accent)',
    fontWeight: 500,
    marginTop: 10,
    fontSize: 18
  } as React.CSSProperties,
  divider: {
    height: 1,
    background: 'linear-gradient(90deg, rgba(13,71,161,0.3), transparent)',
    marginBottom: 20
  } as React.CSSProperties
}

const categoryStyles = {
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--os-accent)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    marginBottom: 12
  } as React.CSSProperties,
  skillTag: {
    display: 'inline-block',
    padding: '14px 20px',
    backgroundColor: 'rgba(13, 71, 161, 0.1)',
    border: '1px solid rgba(13, 71, 161, 0.3)',
    borderRadius: '4px',
    fontSize: 17,
    color: 'var(--os-text)',
    fontWeight: 500,
    transition: 'all 0.2s ease'
  } as React.CSSProperties
}

export default function SkillsWindow() {
  return (
    <div style={{ padding: '40px 48px', fontFamily: 'var(--font-body)', height: '100%', overflowY: 'auto' }}>
      {/* Header Section */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={headerStyles.title}>Skills & Expertise</h1>
        <p style={headerStyles.subtitle}>Technical toolkit and competencies</p>
      </div>

      {/* Divider */}
      <div style={headerStyles.divider} />

      {/* Skills Categories Grid */}
      <div style={{ display: 'grid', gap: 24 }}>
        {skillCategories.map((category) => (
          <section key={category.category}>
            <h2 style={categoryStyles.heading}>// {category.category.toLowerCase()}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, rowGap: 8 }}>
              {category.skills.map((skill) => (
                <span key={skill} style={categoryStyles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}

        {/* Competitive Programming Section */}
        <section>
          <h2 style={categoryStyles.heading}>// competitive programming</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{
              padding: '16px 14px',
              borderRadius: 8,
              background: 'linear-gradient(135deg, rgba(21,101,192,0.08), rgba(37,137,232,0.04))',
              border: '1px solid rgba(21,101,192,0.15)'
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--os-text)' }}>
                700+ Problems Solved
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--os-text-muted)', marginTop: 6, lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--os-text)' }}>Platforms:</strong> LeetCode, CodeChef, HackerRank, Code360, SPOJ, InterviewBit
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--os-text-muted)', marginTop: 8, lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--os-text)' }}>Expertise:</strong> Trees, Graphs, Dynamic Programming, System Design, Data Structures & Algorithms
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  )
}
