import { APIContext, EntitiesContext, UserContext } from './Helper/Context';
import useGetAPIEntities from './Helper/useGetAPIEntities';
import useUserData from './Helper/useUserData';
import App from './App';

function AppContext() {

  return (
    <APIContext.Provider value={{
      fetcher:"http://localhost:82/", 
      search:"http://localhost:83/"
    }}>
      <EntitiesContext.Provider value={useGetAPIEntities()}>
        <UserContext.Provider value={useUserData()}>
          <App/>
        </UserContext.Provider>
      </EntitiesContext.Provider>
    </APIContext.Provider>
  );
}

export default AppContext;
