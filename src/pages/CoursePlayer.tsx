import { useState, useEffect } from 'react'
import type { Route } from '../App'
import { CONTENT, GUIDE, SCENE, MOTIF, ROLE_PART, ROLES, ORDER, type StepId } from '../data/courseContent'
import Portrait from '../components/Portrait'
import cesCardCover from '../imports/coordinated-entry-cover.png'

type Props = { navigate: (r: Route) => void; courseId: string }

function GuideAvatar({ initials, color, large }: { initials: string; color: string; large?: boolean }) {
  const size = large ? '8em' : '4.2em'
  const fs = large ? '2em' : '1.3em'
  return (
    <div style={{ flexShrink: 0, width: size, height: size, borderRadius: large ? 16 : 12, border: `${large ? 4 : 3}px solid rgba(255,255,255,.75)`, background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fs, fontWeight: 700, letterSpacing: '.04em', boxShadow: '0 8px 18px rgba(6,48,79,.22)', overflow: 'hidden' }}>
      <Portrait initials={initials} alt="" />
    </div>
  )
}

const MOCK_FIELDS = [
  { label: 'Unique identifier', value: 'A4F19C82', warn: false },
  { label: 'Date of birth', value: '03 / 14 / 1959  (age 67)', warn: false },
  { label: 'Social security number', value: 'xxx-xx-4417', warn: false },
  { label: 'Race and ethnicity', value: 'Black or African American', warn: false },
  { label: 'Gender', value: 'Female', warn: false },
  { label: 'Veteran status', value: 'No', warn: false },
  { label: 'Primary phone', value: '(510) 555-0182', warn: false },
  { label: 'Backup contact or caregiver', value: 'Not recorded', warn: true },
  { label: 'Release of information', value: 'None on file', warn: true },
]

const MOCK_TABS = ['PROFILE', 'HISTORY', 'SERVICES', 'PROGRAMS', 'ASSESSMENTS', 'NOTES', 'FILES', 'LOCATION', 'REFERRALS']

export default function CoursePlayer({ navigate, courseId }: Props) {
  const id = (CONTENT[courseId as StepId] ? courseId : 'S1') as StepId
  const course = CONTENT[id]
  const scene = SCENE[id]
  const guide = GUIDE[id]

  const pages = course.pages
  const quiz = course.quiz
  const seniorIdx = pages.length + 1
  const quizStart = seniorIdx + 1
  const total = quizStart + quiz.length + 1

  const [pageIdx, setPageIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [quizPicked, setQuizPicked] = useState<number | null>(null)
  const [showExit, setShowExit] = useState(false)
  const [copied, setCopied] = useState(false)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({})

  const posKey = `smc-course-pos-${id}`

  useEffect(() => {
    try {
      const p = parseInt(localStorage.getItem(posKey) || '', 10)
      if (!isNaN(p) && p > 0) setPageIdx(p)
    } catch {}
  }, [posKey])

  function savePos(p: number) {
    try { localStorage.setItem(posKey, String(p)) } catch {}
  }

  function goTo(p: number) {
    const next = Math.max(0, Math.min(p, total - 1))
    setPageIdx(next)
    setPicked(null)
    setQuizPicked(null)
    savePos(next)
    window.scrollTo(0, 0)
  }

  function markComplete() {
    try { localStorage.removeItem(posKey) } catch {}
    try {
      const raw = localStorage.getItem('smc-training-progress')
      const data = raw ? JSON.parse(raw) : { n: '', r: '', d: [] }
      data.d = data.d || []
      if (!data.d.includes(id)) {
        data.d.push(id)
        localStorage.setItem('smc-training-progress', JSON.stringify(data))
      }
    } catch {}
  }

  function getTransferCode() {
    try {
      const raw = localStorage.getItem('smc-training-progress') || '{}'
      return 'SMC-' + btoa(unescape(encodeURIComponent(raw)))
    } catch { return 'SMC-' }
  }

  const idx = Math.min(pageIdx, total - 1)
  const isOpener = idx === 0
  const isSenior = idx === seniorIdx
  const isDone = idx === total - 1
  const beatIdx = idx - 1
  const quizIdx = idx - quizStart
  const isQuiz = quizIdx >= 0 && quizIdx < quiz.length
  const isBeat = !isOpener && !isSenior && !isDone && !isQuiz
  const beat = isBeat ? pages[beatIdx] : null
  const qq = isQuiz ? quiz[quizIdx] : null

  if (isDone) markComplete()

  let role = ''
  try { const raw = localStorage.getItem('smc-training-progress'); if (raw) role = JSON.parse(raw).r || '' } catch {}
  const roleMap = ROLES[role]
  let nextId: StepId | null = null
  if (roleMap) {
    const track = ORDER.filter(c => roleMap[c])
    const pos = track.indexOf(id)
    nextId = pos >= 0 && pos < track.length - 1 ? track[pos + 1] : null
  } else {
    const pos = ORDER.indexOf(id)
    nextId = pos >= 0 && pos < ORDER.length - 1 ? ORDER[pos + 1] : null
  }

  const partsFor = ROLE_PART[id] || {}
  const rolePart = partsFor[role] || partsFor[''] || ''
  const motif = beat ? (MOTIF[beat.motif] || MOTIF.route) : MOTIF.route

  const answered = picked !== null
  const correct = answered && beat ? picked === beat.a : false
  const qAnswered = quizPicked !== null
  const qCorrect = qAnswered && qq ? quizPicked === qq.a : false
  const quizRightCount = Object.values(quizAnswers).filter(Boolean).length
  const quizTotalAnswered = Object.keys(quizAnswers).length

  const progressPct = Math.round((idx / (total - 1)) * 100) + '%'

  const nextEnabled = !((isBeat && !answered) || (isQuiz && !qAnswered))
  const nextLabel = isOpener ? 'Start the step' :
    isBeat && beatIdx === pages.length - 1 ? 'How this affects seniors' :
    isSenior ? 'Start the quiz' :
    isQuiz && quizIdx === quiz.length - 1 ? 'Finish step' : 'Continue'

  const minutesLeft = isDone ? 'Complete' :
    isOpener ? `About ${course.mins} minutes` :
    `About ${Math.max(1, Math.round(course.mins * (total - 1 - idx) / (total - 1)))} minutes left`

  return (
    <div style={{ minHeight: '100vh', background: '#EAF3F9', color: '#22333F', display: 'flex', flexDirection: 'column', fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 17, lineHeight: 1.6 }}>

      {/* Player header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: '#fff', color: '#1D6A96', borderBottom: '3px solid #F4941C', boxShadow: '0 2px 12px rgba(6,48,79,.06)' }}>
        <div style={{ maxWidth: '60em', margin: '0 auto', padding: '.8em 1.3em', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1em', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate({ page: 'academy' })}
            style={{ display: 'flex', alignItems: 'center', gap: '.7em', color: '#3C4A55', fontSize: '.9em', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>← My steps</span>
          </button>
          <div style={{ flex: '1 1 12em', minWidth: 0, textAlign: 'right' }}>
            <div style={{ fontSize: '.98em', fontWeight: 600, color: '#1D6A96' }}>{course.title}</div>
            <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: '#8A4E08' }}>
              {isDone ? 'Step complete' : isOpener ? `${course.mins} minutes` : isSenior ? 'Senior impact' : isQuiz ? `Quiz ${quizIdx + 1} of ${quiz.length}` : `Stop ${beatIdx + 1} of ${pages.length}`}
            </div>
          </div>
          <button
            onClick={() => {
              if (!window.confirm('Restart this step from the beginning? Your answers in this step will be cleared.')) return
              try { localStorage.removeItem(posKey) } catch {}
              setPageIdx(0); setPicked(null); setQuizPicked(null); setShowExit(false); setAnswers({}); setQuizAnswers({})
              window.scrollTo(0, 0)
            }}
            style={{ flexShrink: 0, padding: '.6em 1.1em', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#fff', color: '#1D6A96', fontFamily: 'inherit', fontSize: '.84em', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const }}
          >
            Restart this step
          </button>
          <button
            onClick={() => setShowExit(v => !v)}
            style={{ flexShrink: 0, padding: '.6em 1.1em', border: '1.5px solid #1D6A96', borderRadius: 12, background: '#fff', color: '#1D6A96', fontFamily: 'inherit', fontSize: '.84em', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const }}
          >
            Save and exit
          </button>
        </div>
        <div style={{ height: '.35em', background: '#E3ECF2' }}>
          <div style={{ height: '100%', width: progressPct, background: '#F4941C', transition: 'width .3s' }} />
        </div>
      </div>

      {/* Save/exit panel */}
      {showExit && (
        <div style={{ background: '#FBF6EF', borderBottom: '1px solid #EEDFC7' }}>
          <div style={{ maxWidth: '60em', margin: '0 auto', padding: '1.2em 1.3em' }}>
            <p style={{ margin: '0 0 .3em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }}>Saved</p>
            <h2 style={{ margin: '0 0 .5em', fontSize: '1.2em', fontWeight: 600, color: '#2680B3' }}>You can close this and come back to this exact screen</h2>
            <div style={{ display: 'flex', gap: '.7em', alignItems: 'center', flexWrap: 'wrap' }}>
              <code style={{ flex: '1 1 18em', background: '#fff', border: '1px dashed #C9D6DF', borderRadius: 12, padding: '.7em .9em', fontSize: '.78em', color: '#2680B3', wordBreak: 'break-all' as const }}>{getTransferCode()}</code>
              <button
                onClick={() => { try { navigator.clipboard.writeText(getTransferCode()) } catch {} setCopied(true) }}
                style={{ padding: '.7em 1.2em', border: 'none', borderRadius: 12, background: '#2680B3', color: '#fff', fontFamily: 'inherit', fontSize: '.9em', fontWeight: 600, cursor: 'pointer' }}
              >
                {copied ? 'Copied' : 'Copy code'}
              </button>
              <button
                onClick={() => navigate({ page: 'academy' })}
                style={{ padding: '.65em 1.1em', border: '1.5px solid #2680B3', borderRadius: 12, color: '#2680B3', background: '#fff', fontFamily: 'inherit', fontSize: '.9em', fontWeight: 600, cursor: 'pointer' }}
              >
                Exit to my steps
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main style={{ flex: 1, width: '100%', maxWidth: '52em', margin: '0 auto', padding: '2.2em 1.3em 1em' }}>

        {/* Opener */}
        {isOpener && (
          <div className="animate-up">
            {/* Step visual banner using the CE cover image */}
            <div style={{ borderRadius: 18, border: '1px solid #DCE7EE', boxShadow: '0 18px 44px rgba(6,48,79,.14)', marginBottom: '1.4em', width: '100%', height: 'clamp(11em, 32vw, 15em)', background: '#1D6A96', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }} role="img" aria-label={scene.alt}>
              <img src={cesCardCover} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: .3 }} />
              <div style={{ position: 'relative', zIndex: 1, padding: '1.5em 2em', display: 'flex', flexDirection: 'column', gap: '.6em' }}>
                <div style={{ fontSize: '3.2em', lineHeight: 1 }}>{scene.icon}</div>
                <div style={{ fontSize: '1.6em', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{course.title}</div>
              </div>
            </div>
            <h1 style={{ margin: '0 0 .7em', fontSize: 'clamp(1.7em, 4.2vw, 2.4em)', fontWeight: 600, lineHeight: 1.15, color: '#2680B3' }}>{course.openTitle}</h1>
            <p style={{ margin: '0 0 1.2em', fontSize: '1.02em', lineHeight: 1.6, color: '#3C4A55', maxWidth: '42em' }}>{course.openBody}</p>
            {/* Guide card */}
            <div style={{ display: 'flex', gap: '1.4em', alignItems: 'center', background: '#2680B3', borderRadius: 18, padding: '1.4em 1.6em', marginBottom: '1em', flexWrap: 'wrap' }}>
              <GuideAvatar initials={guide.initials} color={guide.color} large />
              <div style={{ flex: '1 1 14em', minWidth: 0 }}>
                <p style={{ margin: '0 0 .5em', fontSize: '1.14em', lineHeight: 1.5, color: '#fff', fontStyle: 'italic' }}>{guide.line}</p>
                <div style={{ fontSize: '.9em', fontWeight: 600, color: '#FFD69A' }}>{guide.name} · {guide.role}</div>
              </div>
            </div>
            {/* Your part */}
            {rolePart && (
              <div style={{ background: '#fff', border: '1px solid #DCE7EE', borderLeft: '5px solid #2680B3', borderRadius: 14, padding: '1em 1.2em', marginBottom: '1.4em' }}>
                <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#2680B3', marginBottom: '.3em' }}>Your part in this step</div>
                <p style={{ margin: 0, fontSize: '.98em', lineHeight: 1.55, color: '#22333F' }}>{rolePart}</p>
              </div>
            )}
            <p style={{ margin: 0, fontSize: '.92em', color: '#5A6873', textAlign: 'center' }}>{pages.length} decisions · {quiz.length} quiz questions · about {course.mins} minutes, at your own pace</p>
          </div>
        )}

        {/* Beat (decision screen) */}
        {isBeat && beat && (
          <div className="animate-up">
            {beatIdx > 0 && (
              <p style={{ margin: '0 0 1em', paddingLeft: '.9em', borderLeft: '3px solid #F4941C', fontSize: '.9em', lineHeight: 1.5, color: '#6C7A85' }}>Previously: {pages[beatIdx - 1].h}</p>
            )}
            {/* Story band */}
            <div style={{ display: 'flex', gap: '1.4em', alignItems: 'center', flexWrap: 'wrap', background: '#2680B3', borderRadius: 18, padding: '1.5em 1.7em', marginBottom: '1.2em' }}>
              <svg viewBox="0 0 160 100" width="140" height="88" role="img" aria-label={motif.alt} style={{ flexShrink: 0 }}>
                <path d={motif.p} fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d={motif.a} fill="none" stroke="#F4941C" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <div style={{ flex: '1 1 16em', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.8em', marginBottom: '.7em' }}>
                  <GuideAvatar initials={guide.initials} color={guide.color} />
                  <span style={{ fontSize: '.88em', fontWeight: 600, color: '#CFE2EE' }}>Walking this with {guide.name}</span>
                </div>
                <p style={{ margin: '0 0 .35em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#FFD69A' }}>Stop {beatIdx + 1} of {pages.length}</p>
                <h1 style={{ margin: '0 0 .45em', fontSize: 'clamp(1.4em, 3.4vw, 1.9em)', fontWeight: 600, lineHeight: 1.2, color: '#fff' }}>{beat.h}</h1>
                <p style={{ margin: 0, fontSize: '1em', lineHeight: 1.6, color: '#E7F0F6' }}>{beat.body}</p>
              </div>
            </div>

            {/* HMIS mock */}
            {beat.mock && (
              <div style={{ border: '1px solid #C9D6DF', borderRadius: 14, overflow: 'hidden', background: '#fff', marginBottom: '1.3em', boxShadow: '0 12px 30px rgba(6,48,79,.10)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.8em', background: '#123D54', padding: '.7em 1em', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '.78em', fontWeight: 700, letterSpacing: '.14em', color: '#fff' }}>CLARITY HUMAN SERVICES</span>
                  <span style={{ flex: '1 1 8em', minWidth: 0, background: '#E3ECF2', borderRadius: 6, padding: '.35em .7em', fontSize: '.76em', color: '#CFE2EE' }}>Search for a member...</span>
                  <span style={{ fontSize: '.72em', color: '#A9C6D8', whiteSpace: 'nowrap' as const }}>Alameda County CoC</span>
                </div>
                <div style={{ display: 'flex', gap: '1em', alignItems: 'center', padding: '1em 1.2em', borderBottom: '1px solid #E7EEF3', flexWrap: 'wrap' }}>
                  <div style={{ flexShrink: 0, width: '3.4em', height: '3.4em', borderRadius: '50%', background: '#E7F3FB', color: '#2680B3', fontWeight: 700, fontSize: '1.1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ET</div>
                  <div style={{ flex: '1 1 12em', minWidth: 0 }}>
                    <div style={{ fontSize: '1.15em', fontWeight: 700, color: '#123D54' }}>Turner, Evelyn</div>
                    <div style={{ fontSize: '.8em', color: '#6C7A85' }}>Member profile · created today · no duplicate records found</div>
                  </div>
                  <span style={{ flexShrink: 0, background: '#E8F6EF', border: '1px solid #BFE0D2', color: '#1E6B43', fontSize: '.72em', fontWeight: 700, letterSpacing: '.08em', padding: '.3em .7em', borderRadius: 999 }}>ACTIVE</span>
                </div>
                <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #E7EEF3', padding: '0 .6em' }}>
                  {MOCK_TABS.map((t, i) => (
                    <span key={i} style={{ padding: '.5em .9em', borderBottom: i === 0 ? '3px solid #F4941C' : '3px solid transparent', color: i === 0 ? '#123D54' : '#6C7A85', fontWeight: i === 0 ? 700 : 600, fontSize: '.72em', letterSpacing: '.08em', whiteSpace: 'nowrap' as const }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 13em), 1fr))', gap: '.1em', padding: '.4em' }}>
                  {MOCK_FIELDS.map((f, i) => (
                    <div key={i} style={{ padding: '.7em .9em', borderBottom: '1px solid #F0F5F8' }}>
                      <div style={{ fontSize: '.68em', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#8C98A2', marginBottom: '.15em' }}>{f.label}</div>
                      <div style={{ fontSize: '.94em', fontWeight: f.warn ? 700 : 600, color: f.warn ? '#B23A22' : '#123D54' }}>{f.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#FBF6EF', borderTop: '1px solid #EEDFC7', padding: '.7em 1em', fontSize: '.8em', color: '#8A4E08' }}>Illustrative screen for training. Field names follow the Clarity client profile; nothing here is real member data.</div>
              </div>
            )}

            {/* Decision */}
            <p style={{ margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }}>Decide</p>
            <div style={{ background: '#FBF6EF', border: '1px solid #EEDFC7', borderRadius: 16, padding: '1.2em 1.4em', marginBottom: '1.2em' }}>
              <p style={{ margin: 0, fontSize: '1.02em', lineHeight: 1.6, color: '#22333F', fontStyle: 'italic' }}>{beat.q}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.7em' }}>
              {beat.opts.map((label, i) => {
                const isPicked = picked === i
                const isRight = i === beat.a
                let bg = '#fff', border = '#C9D6DF', markColor = '#2680B3', mark = ''
                if (answered) {
                  if (isPicked && isRight) { bg = '#E8F6EF'; border = '#1E7A52'; mark = '✓'; markColor = '#1E7A52' }
                  else if (isPicked && !isRight) { bg = '#FBE6E0'; border = '#B23A22'; mark = '✕'; markColor = '#B23A22' }
                  else if (isRight && !correct) { bg = '#E8F6EF'; border = '#1E7A52'; mark = '✓'; markColor = '#1E7A52' }
                }
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (picked !== null) return
                      const a = { ...answers, [`${id}:${beatIdx}`]: i === beat.a }
                      setAnswers(a)
                      setPicked(i)
                    }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '.7em', textAlign: 'left', padding: '.9em 1.1em', border: `2px solid ${border}`, borderRadius: 12, background: bg, color: '#22333F', fontFamily: 'inherit', fontSize: '.98em', fontWeight: 600, cursor: picked !== null ? 'default' : 'pointer', minHeight: '3em', transition: 'border-color .15s, background .15s' }}
                  >
                    <span style={{ flexShrink: 0, minWidth: '1.2em', fontWeight: 700, color: markColor }}>{mark || String.fromCharCode(65 + i) + '.'}</span>
                    <span style={{ flex: 1 }}>{label}</span>
                  </button>
                )
              })}
            </div>

            {/* Feedback */}
            {answered && (
              <div style={{ marginTop: '1.1em', background: correct ? '#E8F6EF' : '#FBE6E0', borderLeft: `5px solid ${correct ? '#1E7A52' : '#B23A22'}`, borderRadius: 12, padding: '1em 1.2em' }} className="animate-up">
                <p style={{ margin: '0 0 .2em', fontSize: '.9em', fontWeight: 700, color: correct ? '#1E7A52' : '#B23A22' }}>{correct ? 'Correct' : 'Not the one we use here'}</p>
                <p style={{ margin: 0, fontSize: '.98em', lineHeight: 1.55, color: '#22333F' }}>{beat.fb[picked!]}</p>
              </div>
            )}

            {/* Aging with Dignity way panel */}
            {answered && (
              <div style={{ marginTop: '1.4em', border: '1px solid #DCE7EE', borderRadius: 16, overflow: 'hidden', background: '#fff' }} className="animate-up">
                <div style={{ background: '#2680B3', padding: '.6em 1.1em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#fff' }}>What is different here</div>
                <div style={{ background: '#EAF3F8', padding: '.55em 1.1em', fontSize: '.84em', lineHeight: 1.5, color: '#2680B3', borderBottom: '1px solid #DCE7EE' }}>Every St. Mary's Center practice follows county Coordinated Entry policy. Here is how we tailor it for the older adults we serve.</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15em), 1fr))' }}>
                  <div style={{ padding: '1.1em 1.2em', borderRight: '1px solid #E7EEF3' }}>
                    <div style={{ fontSize: '.76em', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: '#6C7A85', marginBottom: '.35em' }}>What we want to avoid</div>
                    <p style={{ margin: 0, fontSize: '.96em', lineHeight: 1.55, color: '#3C4A55' }}>{beat.diffG}</p>
                  </div>
                  <div style={{ padding: '1.1em 1.2em', background: '#E8F3EF' }}>
                    <div style={{ fontSize: '.76em', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: '#1E6B43', marginBottom: '.35em' }}>The Aging with Dignity way</div>
                    <p style={{ margin: 0, fontSize: '.96em', lineHeight: 1.55, color: '#22333F' }}>{beat.diffS}</p>
                  </div>
                </div>
              </div>
            )}
            <p style={{ margin: '1.2em 0 0', paddingTop: '.9em', borderTop: '1px solid #DCE7EE', fontSize: '.82em', lineHeight: 1.5, color: '#6C7A85' }}>Source: {beat.src}</p>
          </div>
        )}

        {/* Senior impact */}
        {isSenior && (
          <div className="animate-up">
            <p style={{ margin: '0 0 .5em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }}>How this step lands for our seniors</p>
            <h1 style={{ margin: '0 0 .7em', fontSize: 'clamp(1.5em, 3.6vw, 2.1em)', fontWeight: 600, lineHeight: 1.18, color: '#2680B3' }}>{course.senior.title}</h1>
            <p style={{ margin: '0 0 1.3em', fontSize: '1.02em', lineHeight: 1.65, color: '#3C4A55', maxWidth: '42em' }}>{course.senior.body}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.7em', marginBottom: '1.3em' }}>
              {course.senior.points.map((p, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #DCE7EE', borderLeft: '5px solid #F4941C', borderRadius: 14, padding: '1em 1.2em' }}>
                  <div style={{ fontSize: '.96em', fontWeight: 600, color: '#2680B3', marginBottom: '.15em' }}>{p.head}</div>
                  <p style={{ margin: 0, fontSize: '.96em', lineHeight: 1.55, color: '#3C4A55' }}>{p.body}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#E8F3EF', border: '1px solid #BFE0D2', borderRadius: 14, padding: '1em 1.2em' }}>
              <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#1E6B43', marginBottom: '.3em' }}>The impact if we get this wrong</div>
              <p style={{ margin: 0, fontSize: '.98em', lineHeight: 1.55, color: '#22333F' }}>{course.senior.risk}</p>
            </div>
          </div>
        )}

        {/* Quiz */}
        {isQuiz && qq && (
          <div className="animate-up">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '.7em', flexWrap: 'wrap', marginBottom: '.6em' }}>
              <p style={{ margin: 0, fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }}>Step quiz</p>
              <span style={{ fontSize: '.86em', color: '#6C7A85' }}>Question {quizIdx + 1} of {quiz.length}</span>
            </div>
            <h1 style={{ margin: '0 0 1.2em', fontSize: 'clamp(1.3em, 3.2vw, 1.75em)', fontWeight: 600, lineHeight: 1.25, color: '#2680B3' }}>{qq.q}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.7em' }}>
              {qq.opts.map((label, i) => {
                const isPicked = quizPicked === i
                const isRight = i === qq.a
                let bg = '#fff', border = '#C9D6DF', markColor = '#2680B3', mark = ''
                if (qAnswered) {
                  if (isPicked && isRight) { bg = '#E8F6EF'; border = '#1E7A52'; mark = '✓'; markColor = '#1E7A52' }
                  else if (isPicked && !isRight) { bg = '#FBE6E0'; border = '#B23A22'; mark = '✕'; markColor = '#B23A22' }
                  else if (isRight && !qCorrect) { bg = '#E8F6EF'; border = '#1E7A52'; mark = '✓'; markColor = '#1E7A52' }
                }
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (quizPicked !== null) return
                      const qa = { ...quizAnswers, [`${id}:${quizIdx}`]: i === qq.a }
                      setQuizAnswers(qa)
                      setQuizPicked(i)
                    }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '.7em', textAlign: 'left', padding: '.9em 1.1em', border: `2px solid ${border}`, borderRadius: 12, background: bg, color: '#22333F', fontFamily: 'inherit', fontSize: '.98em', fontWeight: 600, cursor: quizPicked !== null ? 'default' : 'pointer', minHeight: '3em', transition: 'border-color .15s, background .15s' }}
                  >
                    <span style={{ flexShrink: 0, minWidth: '1.2em', fontWeight: 700, color: markColor }}>{mark || String.fromCharCode(65 + i) + '.'}</span>
                    <span style={{ flex: 1 }}>{label}</span>
                  </button>
                )
              })}
            </div>
            {qAnswered && (
              <div style={{ marginTop: '1.1em', background: qCorrect ? '#E8F6EF' : '#FBE6E0', borderLeft: `5px solid ${qCorrect ? '#1E7A52' : '#B23A22'}`, borderRadius: 12, padding: '1em 1.2em' }} className="animate-up">
                <p style={{ margin: '0 0 .2em', fontSize: '.9em', fontWeight: 700, color: qCorrect ? '#1E7A52' : '#B23A22' }}>{qCorrect ? 'Correct' : 'Not quite'}</p>
                <p style={{ margin: 0, fontSize: '.98em', lineHeight: 1.55, color: '#22333F' }}>{qq.w}</p>
              </div>
            )}
          </div>
        )}

        {/* Step complete */}
        {isDone && (
          <div className="animate-up">
            <div style={{ background: '#fff', border: '1px solid #DCE7EE', borderTop: '6px solid #F4941C', borderRadius: 18, padding: '2em 2.2em', boxShadow: '0 16px 40px rgba(6,48,79,.10)' }}>
              <p style={{ margin: '0 0 .4em', fontSize: '.72em', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: '#F4941C' }}>Step complete</p>
              <h1 style={{ margin: '0 0 .6em', fontSize: 'clamp(1.6em, 3.8vw, 2.1em)', fontWeight: 600, color: '#2680B3' }}>{course.done}</h1>
              <div style={{ background: '#E8F3EF', border: '1px solid #BFE0D2', borderRadius: 14, padding: '1em 1.2em', marginBottom: '1em' }}>
                <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#1E6B43', marginBottom: '.3em' }}>Added to Ms. Turner's care plan</div>
                <div style={{ fontSize: '1.02em', fontWeight: 600, color: '#2680B3' }}>{scene.plan}</div>
              </div>
              <div style={{ background: '#FBF6EF', border: '1px solid #EEDFC7', borderRadius: 14, padding: '1em 1.2em', marginBottom: '1.4em' }}>
                <div style={{ fontSize: '.72em', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#8A4E08', marginBottom: '.3em' }}>Your quiz score</div>
                <div style={{ fontSize: '1.02em', fontWeight: 600, color: '#2680B3' }}>
                  {quizTotalAnswered > 0 ? `${quizRightCount} of ${quizTotalAnswered} correct on the first try.` : 'Quiz answers recorded.'} The graded exams live with the Academy.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '.8em', flexWrap: 'wrap' }}>
                {nextId && (
                  <button
                    onClick={() => navigate({ page: 'course', courseId: nextId! })}
                    style={{ padding: '.85em 1.6em', borderRadius: 12, background: '#F4941C', color: '#fff', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 12px 26px rgba(244,148,28,.32)' }}
                  >
                    Take the baton: {CONTENT[nextId].title} →
                  </button>
                )}
                <button
                  onClick={() => navigate({ page: 'academy' })}
                  style={{ padding: '.8em 1.4em', border: '1.5px solid #2680B3', borderRadius: 12, color: '#2680B3', background: '#fff', fontFamily: 'inherit', fontSize: '1em', fontWeight: 600, cursor: 'pointer' }}
                >
                  Back to my steps
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Nav bar */}
      {!isDone && (
        <div style={{ width: '100%', maxWidth: '52em', margin: '0 auto', padding: '0 1.3em 2.6em', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1em' }}>
          <button
            onClick={() => goTo(idx - 1)}
            style={{ visibility: idx > 0 ? 'visible' : 'hidden', padding: '.75em 1.3em', border: '1.5px solid #C9D6DF', borderRadius: 12, background: '#fff', color: '#2680B3', fontFamily: 'inherit', fontSize: '.94em', fontWeight: 600, cursor: 'pointer', minHeight: '2.9em' }}
          >
            ← Back
          </button>
          <span style={{ fontSize: '.84em', color: '#6C7A85' }}>{minutesLeft}</span>
          <button
            onClick={() => nextEnabled ? goTo(idx + 1) : undefined}
            style={{ padding: '.8em 1.5em', border: 'none', borderRadius: 12, background: '#2680B3', color: '#fff', fontFamily: 'inherit', fontSize: '.96em', fontWeight: 600, cursor: nextEnabled ? 'pointer' : 'default', minHeight: '2.9em', opacity: nextEnabled ? 1 : 0.45, boxShadow: nextEnabled ? '0 10px 22px rgba(28,92,122,.26)' : 'none', transition: 'opacity .2s' }}
          >
            {nextLabel} →
          </button>
        </div>
      )}
    </div>
  )
}
