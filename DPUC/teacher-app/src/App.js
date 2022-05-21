import { Container } from 'react-bootstrap';
import { BrowserRouter as Router , Route, Routes as Switch} from 'react-router-dom';
import Home from './Home';
import CreateUC from './CreateUC';
import EditDPUC from './EditDPUC';
import ViewDPUC from './ViewDPUC';
import NotFound from './NotFound';
import { EntitiesContext } from './Helper/Context';
import { useState } from "react";
import useFetch from './Helper/useFetch';
import useGetAPIEntities from './Helper/useGetAPIEntities';


function App() {
  return (
    <EntitiesContext.Provider value={useGetAPIEntities()}>
      <Router>
        <div className="App">
          <div className="content" style={{paddingTop:"40px"}}>
            <Container>
            <Switch>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/create" element={<CreateUC/>}/>
              <Route exact path="/edit/:id" element={<EditDPUC/>}/>
              <Route exact path="/dpuc/:id" element={<ViewDPUC/>}/>
              <Route path="*" element= {<NotFound />}/>
            </Switch>
            </Container>
          </div>
        </div>
      </Router>
    </EntitiesContext.Provider>
  );
}

export default App;
