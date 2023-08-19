import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import HomePage from './pages';

const routerArray = [
  {
    path: '/',
    element: <HomePage />,
  },
];

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {}
      {routerArray.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Route>,
  ),
);

export default mainRouter;
