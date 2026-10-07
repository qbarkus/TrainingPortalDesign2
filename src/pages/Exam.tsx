import smcLogo from '../imports/SMC_Official_Logo_Horizontal.png'
import { useState, useEffect } from 'react'
import type { Route } from '../App'
import { BANKS } from '../data/exams'
import type { ExamQ } from '../data/exams'
import Certificate from '../components/Certificate'
import cesCardCover from '../imports/coordinated-entry-cover.png'
import ceCompleteBanner from '../imports/ce-complete-banner.png'
import roadHomeArrival from '../imports/road-home-arrival.jpg'

type Props = { navigate: (r: Route) => void; examType?: 'rh' | 'ces' }
type Phase = 'intro' | 'question' | 'result'

export const PASS_PCT = 85

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Exam({ navigate, examType = 'ces' }: Props) {
  const isCES = examType === 'ces'
  const examTitle = BANKS[examType].title
  const storageKey = isCES ? 'smc-exam-ces' : 'smc-exam-rh'

  const [phase, setPhase] = useState<Phase>('intro')
  const [questions, setQuestions] = useState(() => shuffle(BANKS[examType].questions))
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [history, setHistory] = useState<{ date: string; pct: number }[]>([])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) setHistory(JSON.parse(raw))
    } catch {}
  }, [storageKey])

  function start(resume = false) {
    if (!resume) {
      setQuestions(shuffle(BANKS[examType].questions))
      setAnswers({})
      setQIdx(0)
      setSubmitted(false)
    }
    setPhase('question')
  }

  function pickAnswer(i: number) {
    const a = { ...answers, [qIdx]: i }
    setAnswers(a)
    try {
      const raw = localStorage.getItem(storageKey + '-answers') || '{}'
      const saved = JSON.parse(raw)
      saved[qIdx] = i
      localStorage.setItem(storageKey + '-answers', JSON.stringify(saved))
    } catch {}
  }

  function submit() {
    const total = questions.length
    const correct = questions.filter((q, i) => answers[i] === q.a).length
    const pct = Math.round((correct / total) * 100)
    const critOk = questions.every((q, i) => !q.critical || answers[i] === q.a)
    const entry = { passed: pct >= PASS_PCT && critOk, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), pct }
    const newHistory = [entry, ...history].slice(0, 5)
    setHistory(newHistory)
    try { localStorage.setItem(storageKey, JSON.stringify(newHistory)) } catch {}
    try { localStorage.removeItem(storageKey + '-answers') } catch {}
    setSubmitted(true)
    setPhase('result')
  }

  function resetHistory() {
    if (!window.confirm('Clear your exam history? This removes all previous attempt records.')) return
    try { localStorage.removeItem(storageKey); localStorage.removeItem(storageKey + '-answers') } catch {}
    setHistory([])
  }

  const qTotal = questions.length
  const passNeeded = Math.ceil(qTotal * (PASS_PCT / 100))
  const critTotal = questions.filter(q => q.critical).length

  if (phase === 'intro') {
    return (
      <ExamIntro
        examTitle={examTitle}
        qTotal={qTotal}
        passNeeded={passNeeded}
        critTotal={critTotal}
        history={history}
        heroImg={isCES ? cesCardCover : roadHomeArrival}
        isCES={isCES}
        onStart={() => start(false)}
        onReset={resetHistory}
        onBack={() => navigate({ page: isCES ? 'academy' : 'home' })}
        onHome={() => navigate({ page: 'home' })}
      />
    )
  }

  if (phase === 'result') {
    const total = questions.length
    const correctCount = questions.filter((q, i) => answers[i] === q.a).length
    const critCorrect = questions.filter((q, i) => q.critical && answers[i] === q.a).length
    const pct = Math.round((correctCount / total) * 100)
    const passed = pct >= PASS_PCT && critCorrect === critTotal

    const categories = [...new Set(questions.map(q => q.category))]
    const catScores = categories.map(cat => {
      const catQs = questions.filter(q => q.category === cat)
      const catCorrect = catQs.filter(q => answers[questions.indexOf(q)] === q.a).length
      const catPct = Math.round((catCorrect / catQs.length) * 100)
      return { name: cat, pct: catPct, total: catQs.length, correct: catCorrect }
    })

    return (
      <ExamResult
        examTitle={examTitle}
        passed={passed}
        pct={pct}
        correctCount={correctCount}
        total={total}
        critCorrect={critCorrect}
        critTotal={critTotal}
        catScores={catScores}
        questions={questions}
        answers={answers}
        onRetake={() => start(false)}
        onAcademy={() => navigate({ page: isCES ? 'academy' : 'home' })}
        onHome={() => navigate({ page: 'home' })}
        onClose={() => navigate({ page: 'closure' })}
      />
    )
  }

  // Question screen
  const q = questions[qIdx]
  const picked = answers[qIdx] ?? -1
  const progressPct = Math.round((Object.keys(answers).length / qTotal) * 100) + '%'

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', display: 'flex', flexDirection: 'column', fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 17, color: '#22333F' }}>
      {/* Header */}
      <header style={{ background: '#fff', color: '#1D6A96', borderBottom: '3px solid #F4941C', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ display: 'inline-flex' }}>
              <img src={smcLogo} alt="St. Mary's Center" style={{ height: 48, width: 'auto' }} />
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: '#1D6A96' }}>Senior Housing Services Academy</span>
            <button onClick={() => navigate({ page: 'home' })} style={{ color: '#1D6A96', fontSize: 13.5, fontWeight: 700, borderBottom: '2px solid rgba(255,255,255,.5)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', borderBottomColor: '#F4941C', textDecoration: 'underline', textUnderlineOffset: 3 }}>← Training home</button>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: '#1D6A96' }}>{examTitle} · Final Exam</div>
            <div style={{ fontSize: 12.5, color: '#8A4E08' }}>Question {qIdx + 1} of {qTotal}</div>
          </div>
        </div>
        <div style={{ height: 7, background: '#E3ECF2' }}>
          <div style={{ height: '100%', width: progressPct, background: '#F4941C', transition: 'width .3s' }} />
        </div>
      </header>

      <main style={{ flex: 1, width: '100%', maxWidth: 900, margin: '0 auto', padding: '30px 24px 20px' }}>
        <div className="animate-up">
          {/* Question meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#22333F' }}>Question {qIdx + 1} of {qTotal}</span>
            {q.critical && (
              <span style={{ background: '#FFF3E4', border: '2px solid #F4941C', color: '#8A4E08', fontWeight: 600, fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '3px 10px', borderRadius: 999 }}>Critical item</span>
            )}
            <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#fff', background: '#2680B3', padding: '3px 10px', borderRadius: 999 }}>{q.category}</span>
          </div>

          {/* Scenario + question */}
          <div style={{ background: '#2680B3', borderRadius: '12px 12px 0 0', padding: '22px 28px' }}>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: '#fff' }}>{q.scenario}</p>
          </div>
          <div style={{ background: '#fff', border: '1.5px solid #C9D6DF', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 28px 26px' }}>
            <h2 style={{ margin: '0 0 16px', fontWeight: 600, fontSize: 19, lineHeight: 1.35, color: '#22333F' }}>{q.opts.length > 0 ? q.q || 'What do you do?' : ''}</h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {q.opts.map((label, i) => (
                <button
                  key={i}
                  onClick={() => pickAnswer(i)}
                  style={{
                    textAlign: 'left', fontFamily: 'inherit', fontSize: 16, lineHeight: 1.5, color: '#22333F',
                    background: picked === i ? '#E7F3FB' : '#fff',
                    border: `2px solid ${picked === i ? '#2680B3' : '#C9D6DF'}`,
                    borderRadius: 10, padding: '13px 16px', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start',
                    transition: 'border-color .15s, background .15s',
                  }}
                >
                  <span style={{ fontWeight: 600, color: picked === i ? '#2680B3' : '#5A6873', minWidth: 20 }}>{String.fromCharCode(65 + i)}.</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer nav */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '12px 24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => qIdx > 0 ? setQIdx(qIdx - 1) : undefined}
          style={{ visibility: qIdx > 0 ? 'visible' : 'hidden', padding: '.75em 1.3em', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#fff', color: '#2680B3', fontFamily: 'inherit', fontSize: '.94em', fontWeight: 600, cursor: 'pointer' }}
        >
          ← Back
        </button>
        <span style={{ fontSize: '.84em', color: '#5A6873' }}>{Object.keys(answers).length} of {qTotal} answered</span>
        {qIdx < qTotal - 1 ? (
          <button
            onClick={() => setQIdx(qIdx + 1)}
            style={{ padding: '.8em 1.5em', border: 'none', borderRadius: 12, background: '#2680B3', color: '#fff', fontFamily: 'inherit', fontSize: '.96em', fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 22px rgba(28,92,122,.26)' }}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={Object.keys(answers).length < qTotal}
            style={{ padding: '.8em 1.6em', border: 'none', borderRadius: 12, background: Object.keys(answers).length < qTotal ? '#C9D6DF' : '#F4941C', color: '#fff', fontFamily: 'inherit', fontSize: '.96em', fontWeight: 600, cursor: Object.keys(answers).length < qTotal ? 'not-allowed' : 'pointer' }}
          >
            Submit exam →
          </button>
        )}
      </div>
    </div>
  )
}

function ExamIntro({ examTitle, qTotal, passNeeded, critTotal, history, heroImg, isCES, onStart, onReset, onBack, onHome }: {
  examTitle: string; qTotal: number; passNeeded: number; critTotal: number; heroImg: string; isCES: boolean
  history: { date: string; pct: number }[]; onStart: () => void; onReset: () => void; onBack: () => void; onHome: () => void
}) {
  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', display: 'flex', flexDirection: 'column', fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 17, color: '#22333F' }}>
      <header style={{ background: '#fff', color: '#1D6A96', borderBottom: '3px solid #F4941C' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ display: 'inline-flex' }}>
              <img src={smcLogo} alt="St. Mary's Center" style={{ height: 48, width: 'auto' }} />
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: '#1D6A96' }}>Senior Housing Services Academy</span>
            <button onClick={onHome} style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>← Training home</button>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: '#1D6A96' }}>{examTitle} · Final Exam</div>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 900, margin: '0 auto', padding: '30px 24px 40px', width: '100%' }}>
        <div style={{ border: '1.5px solid #C9D6DF', borderRadius: 12, overflow: 'hidden' }}>
          <img
            src={heroImg}
            alt={examTitle}
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
          <div style={{ padding: '28px 32px 32px' }}>
            <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: '#8A4E08' }}>{examTitle}</p>
            <h1 style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 'clamp(26px, 3.4vw, 36px)', lineHeight: 1.14, color: '#22333F' }}>Final exam</h1>
            <p style={{ margin: '0 0 20px', fontSize: 16.5, lineHeight: 1.6, color: '#22333F', maxWidth: 640 }}>
              {qTotal} questions drawn in a random order. No feedback appears until you submit. Your answers save as you go, and you may retake as many times as you need.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: 14, marginBottom: 22 }}>
              <div style={{ border: '1.5px solid #C9D6DF', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontWeight: 600, fontSize: 20, color: '#22333F' }}>{qTotal} questions</div>
                <div style={{ fontSize: 13.5, color: '#5A6873' }}>one screen each</div>
              </div>
              <div style={{ border: '1.5px solid #C9D6DF', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontWeight: 600, fontSize: 20, color: '#22333F' }}>85% to pass</div>
                <div style={{ fontSize: 13.5, color: '#5A6873' }}>{passNeeded} correct or better</div>
              </div>
              <div style={{ border: '2px solid #F4941C', borderRadius: 10, padding: '14px 16px', background: '#FFF3E4' }}>
                <div style={{ fontWeight: 600, fontSize: 20, color: '#8A4E08' }}>{critTotal} critical items</div>
                <div style={{ fontSize: 13.5, color: '#22333F' }}>every one must be correct</div>
              </div>
            </div>

            <div style={{ border: '1.5px solid #C9D6DF', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
              <div style={{ background: '#2680B3', padding: '9px 16px', fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#fff' }}>What this exam covers</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15em), 1fr))' }}>
                <div style={{ padding: '14px 18px', borderRight: '2px solid #DCE7EE' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#22333F', marginBottom: 6 }}>The member journey</div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: '#3C4A55' }}>Problem-solving, current living situation, assessment, queue, match, handoffs, documentation, and the exit, all through Ms. Turner’s journey.</p>
                </div>
                <div style={{ padding: '14px 18px', background: '#FFF3E4' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#8A4E08', marginBottom: 6 }}>The rules that decide outcomes</div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: '#3C4A55' }}>HRC first for eviction prevention, no rapid rehousing, flexible funds never cash, CLS at every contact, document readiness over queue date, thresholds as current practice, and what staff may never promise.</p>
                </div>
              </div>
            </div>

            {history.length > 0 && (
              <div style={{ margin: '0 0 22px', padding: '10px 14px', background: '#FFF3E4', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14.5, color: '#8A4E08', fontWeight: 700 }}>
                  Previous attempts: {history.map(h => `${h.pct}% (${h.date})`).join(' · ')}
                </span>
                <button onClick={onReset} style={{ fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, color: '#8A4E08', background: '#fff', border: '2px solid #F4941C', borderRadius: 10, padding: '6px 14px', cursor: 'pointer' }}>Clear my exam history</button>
              </div>
            )}

            <button onClick={onStart} style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 16, color: '#fff', background: '#F4941C', border: 'none', borderRadius: 10, padding: '14px 30px', cursor: 'pointer' }}>
              {history.length > 0 ? 'Retake the exam' : 'Start the exam'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function ExamResult({ examTitle, passed, pct, correctCount, total, critCorrect, critTotal, catScores, questions, answers, onRetake, onAcademy, onHome, onClose }: {
  examTitle: string; passed: boolean; pct: number; correctCount: number; total: number; critCorrect: number; critTotal: number
  catScores: { name: string; pct: number; total: number; correct: number }[]
  questions: ExamQ[]; answers: Record<number, number>
  onRetake: () => void; onAcademy: () => void; onHome: () => void; onClose: () => void
}) {
  const resultRule = passed ? '#1E6B43' : '#B23A22'
  const resultHead = passed ? 'Passed' : 'Not passed yet'
  const resultBody = passed
    ? `You scored ${pct}% and answered every critical item correctly. You are ready to carry the baton. Your Academy certificate is ready.`
    : `You scored ${pct}%. You need ${PASS_PCT}% and every critical item correct to pass. Retake whenever you're ready, as many times as you need.`

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', display: 'flex', flexDirection: 'column', fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 17, color: '#22333F' }}>
      <header style={{ background: '#fff', color: '#1D6A96', borderBottom: '3px solid #F4941C' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ display: 'inline-flex' }}>
              <img src={smcLogo} alt="St. Mary's Center" style={{ height: 48, width: 'auto' }} />
            </span>
            <button onClick={onHome} style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>← Training home</button>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: '#1D6A96' }}>{examTitle} · Final Exam</div>
            <div style={{ fontSize: 12.5, color: '#FFD69A' }}>Results</div>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 900, margin: '0 auto', padding: '30px 24px 40px', width: '100%' }}>
        {/* Result card */}
        <div style={{ border: '1.5px solid #C9D6DF', borderTop: `8px solid ${resultRule}`, borderRadius: 12, padding: '30px 32px', marginBottom: 28 }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: '#8A4E08' }}>Result</p>
          <h1 style={{ margin: '0 0 10px', fontWeight: 600, fontSize: 30, color: '#22333F' }}>{resultHead}</h1>
          <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.6, color: '#22333F', maxWidth: 620 }}>{resultBody}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 14, marginBottom: 22 }}>
            <div style={{ border: '1.5px solid #C9D6DF', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontWeight: 600, fontSize: 22, color: '#22333F' }}>{pct}%</div>
              <div style={{ fontSize: 13.5, color: '#5A6873' }}>{correctCount} of {total} correct</div>
            </div>
            <div style={{ border: '2px solid #F4941C', borderRadius: 10, padding: '14px 16px', background: '#FFF3E4' }}>
              <div style={{ fontWeight: 600, fontSize: 22, color: '#8A4E08' }}>{critCorrect} of {critTotal}</div>
              <div style={{ fontSize: 13.5, color: '#22333F' }}>critical items correct</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={onRetake} style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 16, color: '#fff', background: '#F4941C', border: 'none', borderRadius: 10, padding: '13px 26px', cursor: 'pointer' }}>Retake the exam</button>
            {passed && <button onClick={onClose} style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 16, color: '#fff', background: '#2C7A4B', border: 'none', borderRadius: 10, padding: '13px 26px', cursor: 'pointer' }}>Finish: close out with the team →</button>}
            <button onClick={onAcademy} style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 16, color: '#22333F', border: '1.5px solid #C9D6DF', background: '#fff', borderRadius: 10, padding: '12px 24px', cursor: 'pointer' }}>Back to my learning path</button>
            <button onClick={onHome} style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 16, color: '#22333F', border: '1.5px solid #C9D6DF', background: '#fff', borderRadius: 10, padding: '12px 24px', cursor: 'pointer' }}>Training home</button>
          </div>
        </div>

        {passed && /Coordinated/i.test(examTitle) && <img src={ceCompleteBanner} alt="Great work, SHS team. Coordinated Entry complete." style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14, margin: '0 0 28px' }} />}

        {passed && <Certificate title="St. Mary's Center Academy" passPct={PASS_PCT} />}

        {/* Score by category */}
        <h2 style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 20, color: '#22333F' }}>Score by category</h2>
        <div style={{ display: 'grid', gap: 8, marginBottom: 26 }}>
          {catScores.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '1.5px solid #C9D6DF', borderRadius: 10, padding: '10px 14px' }}>
              <span style={{ flex: '0 0 13em', fontSize: 14.5, fontWeight: 700, color: '#22333F' }}>{c.name}</span>
              <span style={{ flex: 1, height: 10, background: '#EAF3F9', borderRadius: 999, overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: c.pct + '%', background: c.pct >= PASS_PCT ? '#1E6B43' : '#B23A22', transition: 'width .4s' }} />
              </span>
              <span style={{ flex: '0 0 5em', textAlign: 'right', fontSize: 14, fontWeight: 700, color: '#22333F' }}>{c.correct}/{c.total}</span>
            </div>
          ))}
        </div>

        {/* Question review */}
        <h2 style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 20, color: '#22333F' }}>Your answers, reviewed</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {questions.map((q, i) => {
            const userAns = answers[i] ?? -1
            const correct = userAns === q.a
            return (
              <div key={i} style={{ border: `1.5px solid ${correct ? '#BFE0D2' : '#F0B8A6'}`, borderLeft: `5px solid ${correct ? '#1E6B43' : '#B23A22'}`, borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: correct ? '#1E6B43' : '#B23A22' }}>{correct ? '✓ Correct' : '✕ Incorrect'}</span>
                  {q.critical && <span style={{ background: '#FFF3E4', border: '1px solid #F4941C', color: '#8A4E08', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, letterSpacing: '.08em' }}>Critical item</span>}
                  <span style={{ fontSize: 11, color: '#5A6873' }}>{q.category}</span>
                </div>
                <p style={{ margin: '0 0 4px', fontSize: 14.5, lineHeight: 1.5, color: '#22333F' }}>{q.scenario}</p>
                <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, lineHeight: 1.4, color: '#22333F' }}>{q.opts.length > 0 ? q.q || '' : ''}</p>
                {!correct && userAns >= 0 && (
                  <p style={{ margin: '0 0 2px', fontSize: 14, color: '#B23A22' }}>You chose: {q.opts[userAns]}</p>
                )}
                <p style={{ margin: 0, fontSize: 14, color: '#1E6B43', fontWeight: 600 }}>Correct: {q.opts[q.a]}</p>
                {q.why && <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5, color: '#22333F' }}>{q.why}{q.ref ? <span style={{ color: '#5A6873' }}> ({q.ref})</span> : null}</p>}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
