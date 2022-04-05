import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import CreateDPUC from './CreateDPUC';
import NotFound from './NotFound';


function App() {
  return (
      <Router>
        <div className="App">
          <div className="content">
            <Switch>
              <Route exact path="/">
                <CreateDPUC />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
