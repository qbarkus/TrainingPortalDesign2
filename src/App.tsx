import Practice from './pages/Practice'
import David from './pages/David'
import Dignity from './pages/Dignity'
import Journey from './pages/RoadHome'
import Notes from './pages/Notes'
import MyRole from './pages/MyRole'
import Paths from './pages/Paths'
import Cover from './pages/Cover'
import Closure from './pages/Closure'
import Masthead from './components/Masthead'
import Celebrate from './pages/Celebrate'
import ModuleIntro from './pages/ModuleIntro'
import { claimCelebration, seedCelebrated, buildModules, currentRole } from './data/modules'
import AskSanjay from './components/AskSanjay'
import { useState, useEffect } from 'react'
import TrainingHome from './pages/TrainingHome'
import Academy from './pages/Academy'
import CoursePlayer from './pages/CoursePlayer'
import Exam from './pages/Exam'
import { CE_STEPS } from './data/ceSection'
import Foundation from './pages/Foundation'
import Documentation from './pages/Documentation'
import Kyp from './pages/Kyp'
import StageCover from './pages/StageCover'

export type Route =
  | { page: 'cover' }
  | { page: 'home' }
  | { page: 'paths' }
  | { page: 'role' }
  | { page: 'kyp'; role?: string }
  | { page: 'foundation'; start?: number }
  | { page: 'documentation' }
  | { page: 'notes' }
  | { page: 'journey' }
  | { page: 'ces' }
  | { page: 'dignity' }
  | { page: 'david' }
  | { page: 'practice' }
  | { page: 'closure' }
  | { page: 'celebrate'; module: string }
  | { page: 'intro'; module: string }
  | { page: 'stage'; n: string }
  | { page: 'academy'; act?: number }
  | { page: 'course'; courseId: string }
  | { page: 'exam'; examType?: 'rh' | 'ces' }
  | { page: 'rh-exam' }
  | { page: 'ces-exam' }

function Pages({ route, navigate }: { route: Route; navigate: (r: Route) => void }) {

  if (route.page === 'cover') {
    return <Cover navigate={navigate} />
  }

  if (route.page === 'intro') {
    return <ModuleIntro navigate={navigate} module={route.module} />
  }

  if (route.page === 'stage') {
    return <StageCover navigate={navigate} n={route.n} />
  }

  if (route.page === 'celebrate') {
    return <Celebrate navigate={navigate} module={route.module} />
  }

  if (route.page === 'closure') {
    return <Closure navigate={navigate} />
  }

  if (route.page === 'kyp') {
    return <Kyp navigate={navigate} role={route.role} />
  }

  if (route.page === 'role') {
    return <MyRole navigate={navigate} />
  }

  if (route.page === 'paths') {
    return <Paths navigate={navigate} />
  }

  if (route.page === 'practice') {
    return <Practice navigate={navigate} />
  }

  if (route.page === 'david') {
    return <David navigate={navigate} />
  }

  if (route.page === 'dignity') {
    return <Dignity navigate={navigate} />
  }

  if (route.page === 'ces') {
    return <Journey navigate={navigate} steps={CE_STEPS} storeKey="smc-ces-journey" label="COORDINATED ENTRY" />
  }

  if (route.page === 'journey') {
    return <Journey navigate={navigate} />
  }

  if (route.page === 'notes') {
    return <Notes navigate={navigate} />
  }

  if (route.page === 'documentation') {
    return <Documentation navigate={navigate} />
  }

  if (route.page === 'foundation') {
    return <Foundation navigate={navigate} start={route.start} />
  }

  if (route.page === 'academy') {
    return <Academy navigate={navigate} initialAct={route.act ?? 0} />
  }

  if (route.page === 'course') {
    return <><Masthead navigate={navigate} /><CoursePlayer navigate={navigate} courseId={route.courseId} /></>
  }

  if (route.page === 'exam') {
    return <Exam navigate={navigate} examType={route.examType} />
  }

  if (route.page === 'rh-exam') {
    return <Exam navigate={navigate} examType="rh" />
  }

  if (route.page === 'ces-exam') {
    return <Exam navigate={navigate} examType="ces" />
  }

  return <TrainingHome navigate={navigate} />
}

export default function App() {
  const [route, setRoute] = useState<Route>({ page: 'cover' })
  useEffect(() => { seedCelebrated() }, [])
  function navigate(r: Route) {
    // Aging With Dignity is the intro: it opens straight in, no cover pages
    const m = buildModules(currentRole())
    if (r.page === 'stage' && r.n === '1') r = m[1].go
    else if (r.page === 'intro' && (r.module === '01' || r.module === '02')) r = m.find(x => x.n === (r as { module: string }).module)!.go
    const fresh = r.page === 'celebrate' || r.page === 'cover' || r.page === 'intro' || r.page === 'stage' ? null : claimCelebration()
    setRoute(fresh ? { page: 'celebrate', module: fresh } : r)
    window.scrollTo(0, 0)
  }
  return (
    <>
      <Pages route={route} navigate={navigate} />
      {route.page !== 'cover' && route.page !== 'home' && (
        <button
          onClick={() => navigate({ page: 'home' })}
          aria-label="Exit to main page"
          className="exit-home"
        >
          <span aria-hidden="true">←</span> Exit to main page
        </button>
      )}
      {route.page !== 'cover' && <AskSanjay />}
    </>
  )
}
