'use client'
import { useState, useRef, useEffect } from 'react'

const commands: Record<string, string | (() => string)> = {
  help: `Available commands:
  whoami      — display user info
  skills      — list technical skills
  education   — academic background
  experience  — work experience
  contact     — contact information
  projects    — list projects
  about       — about me
  fun         — some fun facts
  clear       — clear terminal
  date        — current date/time`,

  whoami: `> Raveesh | Aspiring AI/ML Engineer
> Location: New Delhi, India
> Status: Available for opportunities
> Timezone: IST (UTC+5:30)`,

  skills: `ML / DL:
  CNNs, Deep Learning, Random Forest, SMOTE, Speaker Diarization
  pyannote, Embeddings, LLM Fine-Tuning, RAG, MCP, NLP
  Vector Databases, Prompt Engineering

LANGUAGES:
  Python, C++, SQL, JavaScript, TypeScript

FRAMEWORKS:
  TensorFlow, FastAPI, Flask, Next.js, Node.js, Express.js

DATA & BI:
  Feature Engineering, Pandas, NumPy, Matplotlib, Power BI, Tableau

DEVOPS & DB:
  Docker, Kubernetes, PostgreSQL, MySQL, Git, GitHub Actions
  Google Cloud, Streamlit`,

  education: `🎓 EDUCATION:
  B.Tech / BCA Computer Science
  Specialization: AI & Data Science
  
📚 RELEVANT COURSEWORK:
  → Natural Language Processing (NLP)
  → Machine Learning & Deep Learning
  → Database Management Systems
  → Supply Chain Management
  → Entrepreneurship & Innovation
  
🏆 FOCUS AREAS:
  Software Engineering, Data Science, ML Engineering`,

  experience: `💼 PROFESSIONAL EXPERIENCE:
  → ML & Fullstack Engineering Intern,
    Centre for Development of Telematics (CDoT), Delhi [Jun – Jul 2025]
    
    • API Performance Optimization: Cut API latency by 40% and 
      data-fetch errors by 35% via profiling FastAPI endpoints 
      and refactoring client-server interaction patterns on live 
      government telecom system
    
    • ML Model Engineering: Fine-tuned pyannote speaker diarization 
      model with 3-second audio segmentation + cosine similarity 
      pipeline achieving 92% identification accuracy in production
    
    • Frontend Development: Built React dashboards for real-time 
      API metrics visualization and speaker recognition query UI
    
    • Infrastructure: Modular FastAPI architecture with clean 
      service layer separation improved page-load by 20%
    
    Tech Stack: FastAPI, React, pyannote, Python, PostgreSQL`,

  contact: `📧 GET IN TOUCH:
  Email:        ravseh88@gmail.com
  GitHub:       github.com/raveeshsehrawat
  LinkedIn:     linkedin.com/in/raveeshsehrawat
  Portfolio:    https://raveesh.vercel.app/
  
  Status: 🟢 Open to Opportunities
  Seeking: AI/ML Engineering Roles
  Location: Delhi, India (Remote friendly)`,

  projects: `🚀 FEATURED PROJECTS:
  1. Handwritten Digit Recognizer (MNIST)
     Tags: Python, TensorFlow, CNN, NumPy
     Built CNN achieving 99% accuracy on 10K test samples
     Status: Completed [Oct 2025]
  
  2. Customer Churn Prediction
     Tags: Python, Random Forest, SMOTE
     90% accuracy on 7,000+ records with 0.88 precision
     Status: Completed [Sep 2025]
  
  3. FinSight — RAG Financial Q&A
     Tags: Python, LangChain, ChromaDB, Mistral 7B
     Hybrid RAG pipeline over 1,487 S&P 500 records
     Status: Completed [Feb–Mar 2026]
  
  4. Portfolio OS Website
     Tags: Next.js, TypeScript, Tailwind CSS
     OS-inspired with draggable windows & terminal
     Status: Live [Jan–Apr 2026] 🌐`,

  about: `👋 ABOUT RAVEESH
Full Stack Developer | AI/ML Enthusiast | CS Student
New Delhi, India | IST Timezone (UTC+5:30)

💡 EXPERTISE:
  🤖 AI/ML: TensorFlow, NLP, RAG, LLM Fine-tuning
  ⚙️  Backend: Python, FastAPI, Node.js, Express
  🎨 Frontend: React, Next.js, TypeScript, Tailwind CSS
  🗄️  Data: PostgreSQL, MongoDB, Pandas, NumPy
  ☁️  DevOps: Docker, Kubernetes, AWS, Google Cloud

📈 STATS:
  700+ LeetCode problems solved
  4 Production projects shipped
  Focus: System Design, Data Structures & Algorithms

🎯 INTERESTED IN:
  → AI/ML Engineering roles
  → Building scalable systems
  → Collaborations & interesting conversations`,

  fun: `🎮 FUN FACTS ABOUT ME:
  ☕ Coffee-driven developer (fuel level: critical)
  🦆 Debug using rubber duck method
  🎮 Competitive programmer on LeetCode
  🧗 Rock climbing & trekking enthusiast  
  📚 Manga & anime fan (especially psychological)
  🖥️  Vim user (yes, I can exit it)
  🎹 Occasional pianist & music producer
  📝 Prefer 2 spaces > tabs > any other choice
  💡 Ideas: ∞ | Execution time: potato
  🤔 Stack overflow: both as dev & human`,

  date: () => {
    const now = new Date()
    return now.toLocaleString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  },
}

export default function TerminalWindow() {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'Portfolio OS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands.\n' },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [history])

  const run = () => {
    const cmd = input.trim().toLowerCase()
    setHistory(h => [...h, { type: 'input', text: `raveesh@portfolio:~$ ${input}` }])

    if (!cmd) {
      setInput(''); return
    }

    if (cmd === 'clear') {
      setHistory([])
      setInput(''); return
    }

    const handler = commands[cmd]
    const output = typeof handler === 'function' ? handler() : handler
    const result = output ?? `Command not found: ${cmd}. Type "help" for available commands.`
    setHistory(h => [...h, { type: 'output', text: result }])
    setInput('')
  }

  return (
    <div
      style={{
        height: '100%', background: 'rgba(8,24,48,0.99)',
        fontFamily: 'var(--font-mono)', fontSize: 13.5,
        padding: '16px 20px', color: '#c8e0f8',
        cursor: 'text', lineHeight: 1.8,
        overflow: 'auto', display: 'flex', flexDirection: 'column',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {line.type === 'input' ? (
            <span style={{ color: '#4fa3f7' }}>{line.text}</span>
          ) : (
            <span style={{ color: '#a8c8e8' }}>{line.text}</span>
          )}
        </div>
      ))}

      {/* Input line */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
        <span style={{ color: '#4fa3f7', marginRight: 8 }}>raveesh@portfolio:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') run() }}
          autoFocus
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: '#c8e0f8', fontFamily: 'var(--font-mono)', fontSize: 13.5,
            flex: 1, caretColor: '#4fa3f7',
          }}
        />
      </div>
      <div ref={endRef} />
    </div>
  )
}
