import { EntitiesContext, UserContext } from './Helper/Context';
import useGetAPIEntities from './Helper/useGetAPIEntities';
import useUserData from './Helper/useUserData';
import App from './App';

function AppContext() {
  return (
    <EntitiesContext.Provider value={useGetAPIEntities()}>
      <UserContext.Provider value={useUserData()}>
        <App/>
      </UserContext.Provider>
    </EntitiesContext.Provider>
  );
}

export default AppContext;
