'use client'
import { useState } from 'react'

const projects = [
  {
    title: 'Handwritten Digit Recognizer (MNIST)',
    emoji: '🔢',
    tags: ['Python', 'TensorFlow', 'CNN', 'NumPy'],
    desc: 'Built CNN from scratch achieving 99% accuracy on 10K test samples. Boosted inference speed 25% via NumPy vectorization and cut validation gap to <1% with Dropout + BatchNorm.',
    date: 'Oct 2025',
    status: 'Completed',
    statusColor: '#28c840',
  },
  {
    title: 'Customer Churn Prediction',
    emoji: '📊',
    tags: ['Python', 'Random Forest', 'SMOTE', 'Feature Engineering'],
    desc: 'Trained Random Forest on 7,000+ records achieving 90% accuracy with 0.88 precision & 0.85 recall. Resolved 85:15 class imbalance with SMOTE and cut training time 18% via feature selection.',
    date: 'Sep 2025',
    status: 'Completed',
    statusColor: '#28c840',
  },
  {
    title: 'FinSight — RAG Financial Q&A',
    emoji: '💰',
    tags: ['Python', 'LangChain', 'ChromaDB', 'BM25', 'Mistral 7B', 'Docker'],
    desc: 'Built hybrid RAG pipeline with BM25 + dense embeddings + RRF fusion over 1,487 S&P 500 records. Deployed Mistral 7B via Ollama with deterministic, hallucination-resistant answers.',
    date: 'Feb–Mar 2026',
    status: 'Completed',
    statusColor: '#28c840',
  },
  {
    title: 'Portfolio OS Website',
    emoji: '🖥️',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    desc: 'OS-inspired portfolio with draggable windows, terminal emulator, and responsive design. Features animated boot screen, cascading window layout, and desktop environment aesthetic.',
    date: 'Jan–Apr 2026',
    status: 'Live',
    statusColor: '#2589e8',
  },
]

export default function ProjectsWindow() {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div style={{ padding: '32px 40px', fontFamily: 'var(--font-body)', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--os-text)' }}>
          Projects
        </h2>
        <span style={{ fontSize: 15, color: 'var(--os-text-muted)', fontFamily: 'var(--font-mono)' }}>
          {projects.length} items
        </span>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {projects.map((p, i) => (
          <div
            key={p.title}
            className="project-card"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            style={{ transform: hover === i ? 'translateY(-2px)' : 'none' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--os-text)' }}>{p.title}</h3>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20,
                background: `${p.statusColor}20`, color: p.statusColor,
                border: `1px solid ${p.statusColor}40`, flexShrink: 0
              }}>{p.status}</span>
            </div>

            <p style={{ fontSize: 13.5, color: 'var(--os-text-muted)', lineHeight: 1.65, marginBottom: 12 }}>
              {p.desc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid rgba(21,101,192,0.1)' }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.tags.map(t => <span key={t} className="skill-tag" style={{ fontSize: 12, padding: '3px 10px' }}>{t}</span>)}
              </div>
              <span style={{ fontSize: 12.5, color: 'var(--os-text-muted)', fontFamily: 'var(--font-mono)' }}>{p.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
