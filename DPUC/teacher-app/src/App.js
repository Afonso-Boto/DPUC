import { Container, } from 'react-bootstrap';
import { BrowserRouter as Router , Route, Routes as Switch} from 'react-router-dom';
import CreateDPUC from './CreateDPUC';
import NotFound from './NotFound';
import Home from './Home';


function App() {
  return (
      <Router>
        <div className="App">
          <div className="content">
            <Container>
            <Switch>
              <Route exact path="/" element={<Home />}/>
              <Route exact path="/create" element={<CreateDPUC/>}/>
              <Route exact path="/dpuc/:id" element={<CreateDPUC/>}/>
              <Route path="*" element= {<NotFound />}/>
            </Switch>
            </Container>
          </div>
        </div>
      </Router>
  );
}

export default App;
