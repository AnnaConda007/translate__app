 
  import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './app.routes';
export function App() {
  return (
     <Routes>
      {appRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
