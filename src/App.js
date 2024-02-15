import {Switch, Route, Redirect} from 'react-router-dom'

import TechEra from './components/TechEra'
import NotFound from './components/NotFound'
import SeparateApi from './components/SeparateApi'
import './App.css'
// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={TechEra} />
      <Route exact path="/courses/:id" component={SeparateApi} />
      <Route exact path="/bad-path" component={NotFound} />

      <Redirect to="/bad-path" />
    </Switch>
  </>
)

export default App
