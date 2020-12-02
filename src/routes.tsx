import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import ProfileFeatures from './pages/ProfileFeatures'
import ExperienceAreas from './pages/ExperienceAreas'
import MasteryTools from './pages/MasteryTools'
import CreateProject from './pages/CreateProject'
import ApproveProject from './pages/ApproveProject'
import Projects from './pages/Projects'

import { AuthProvider } from './context/AuthContext'

function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/signup/:step" component={SignUp} />
        <Route path="/profilefeatures" component={ProfileFeatures} />
        <Route path="/experienceareas" component={ExperienceAreas} />
        <Route path="/masterytools" component={MasteryTools} />
        <Route path="/createproject" component={CreateProject} />
        <Route path="/approveproject" component={ApproveProject} />
        <Route path="/projects/:id" component={Projects} />
      </BrowserRouter>
    </AuthProvider>
  )
}
export default Routes
