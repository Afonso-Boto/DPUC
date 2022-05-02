import { Container, } from 'react-bootstrap';
import { BrowserRouter as Router , Route, Routes as Switch} from 'react-router-dom';
import CreateDPUC from './CreateDPUC';
import EditDPUC from './EditDPUC';
import CreateUC from './CreateUC';
import NotFound from './NotFound';
import Home from './Home';
import ViewDPUC from './ViewDPUC';
import "@uaveiro/systems-bar";

function App() {
  return (
      <Router>
        <div className="App">
          {/* 
          <ua-systems-bar
            publicLinks={JSON.stringify([
              { text: "My Custom Link", href: "#" },
              { text: "Another Custom Link", href: "#" },
            ])}
            userLinks={JSON.stringify([
              { text: "Open link", href: "#" },
              { text: "Custom Link", href: "#" },
            ])}
            lang="pt"
            containerFluid
            authConfig={JSON.stringify({
              url: "https://wso2-is.dev.ua.pt",
              clientId: "D2wPaAQ3_dfgJgeStXAfwJRCKu0a",
              idToken: localStorage.getItem("sb-ua-auth-id-token"),
              callbackUri: "http://localhost:8081/pt/login",
            })}
          />
          */}
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
