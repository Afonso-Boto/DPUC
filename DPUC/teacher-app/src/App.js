import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router , Route, Routes as Switch} from 'react-router-dom';
import Home from './Pages/Home';
import CreateUC from './Pages/CreateUC';
import EditDPUC from './Pages/EditDPUC';
import ViewDPUC from './Pages/ViewDPUC';
import NotFound from './Pages/NotFound';
import { EntitiesContext, UserContext } from './Helper/Context';
import useGetAPIEntities from './Helper/useGetAPIEntities';
import useUserData from './Helper/useUserData';
import BlueNav from './Navbars/BlueNav';
import WhiteNav from './Navbars/WhiteNav';
import SideNav from './Navbars/SideNav';
import Footer from './Navbars/Footer';
import LoginPage from './Pages/LoginPage';
import useGetWindowDimensions from './Helper/useGetWindowDimensions';
import { useContext } from 'react';

function App() {

  useGetWindowDimensions();

  const { isLogged } = useContext(UserContext);

  const sideBarHeight = window.innerHeight - 80 - 40;

  return (
    <Router>
      <div className="App">
        <div className="content">
            <WhiteNav/>
            <BlueNav/>
            <Row style={{paddingLeft:"0", marginLeft:"0", paddingRight:"0", marginRight:"0"}}>
              <Col md={"auto"} 
                style={{  maxWidth:"80px", 
                          minWidth:"80px",
                          minHeight:sideBarHeight,
                          backgroundColor:"#302C2C", 
                          flex: "1 1 auto",
                        }}
              >
                <SideNav/>
              </Col>
              <Col>
                <br/>
                {
                  isLogged &&
                    <Switch>
                      <Route exact path="/" element={<Home/>}/>
                      <Route exact path="/create" element={<CreateUC/>}/>
                      <Route exact path="/edit/:id" element={<EditDPUC/>}/>
                      <Route exact path="/dpuc/:id" element={<ViewDPUC/>}/>
                      <Route path="*" element= {<NotFound />}/>
                    </Switch>
                  ||
                    <LoginPage/>
                }
                <Footer/>
              </Col>
            </Row>
            <Row>
              <Col>
              </Col>
            </Row>
        </div>
      </div>
    </Router>
  );
}

export default App;
