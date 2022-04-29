import { Container, } from 'react-bootstrap';
import { BrowserRouter as Router , Route, Routes as Switch} from 'react-router-dom';
import CreateDPUC from './CreateDPUC';
import EditDPUC from './EditDPUC';
import CreateUC from './CreateUC';
import NotFound from './NotFound';
import Home from './Home';
import ViewDPUC from './ViewDPUC';


function App() {
  return (
      <Router>
        <div className="App">
          <div className="content">
            <Container>
            <Switch>
              <Route exact path="/" element={<Home />}/>
              <Route exact path="/create" element={<CreateUC/>}/>
              <Route exact path="/edit/:id" element={<EditDPUC/>}/>
              <Route exact path="/dpuc/:id" element={<ViewDPUC/>}/>
              <Route path="*" element= {<NotFound />}/>
            </Switch>
            </Container>
          </div>
        </div>
      </Router>
  );
}

export default App;
