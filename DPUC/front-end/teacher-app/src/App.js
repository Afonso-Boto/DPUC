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


function App() {
  const URL_UOS = "http://localhost:8000/uos";
  const URL_AREAS = "http://localhost:8000/areas";
  const URL_CURSOS = "http://localhost:8000/cursos";
  const URL_DURACOES = "http://localhost:8000/duracoes";
  const URL_SEMESTRE = "http://localhost:8000/semestres";
  const URL_MODALIDADES = "http://localhost:8000/modalidades";
  const URL_GRAUS = "http://localhost:8000/graus";
  const URL_IDIOMAS = "http://localhost:8000/idiomas";
  const URL_DOCENTES = "http://localhost:8000/docentes";

  const [ retryFetch, setRetry ] = useState(0);
  const { data: uos } = useFetch(URL_UOS, retryFetch);
  const { data: cursos } = useFetch(URL_CURSOS, retryFetch);
  const { data: graus } = useFetch(URL_GRAUS, retryFetch);
  const { data: areas } = useFetch(URL_AREAS, retryFetch);
  const { data: idiomas } = useFetch(URL_IDIOMAS, retryFetch);
  const { data: duracoes } = useFetch(URL_DURACOES, retryFetch);
  const { data: semestre } = useFetch(URL_SEMESTRE, retryFetch);
  const { data: modalidades } = useFetch(URL_MODALIDADES, retryFetch);
  const { data: docentes } = useFetch(URL_DOCENTES, retryFetch);

  return (
    <EntitiesContext.Provider value={{retryFetch, setRetry, uos, cursos, graus, areas, idiomas, duracoes, semestre, modalidades, docentes}}>
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
