import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';

import Navbar from './components/Navbar';
import RequireAuth from './guards/RequireAuth';
import RequireNotAuth from './guards/RequireNotAuth';

import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import Forgot from './pages/forgot/Forgot';
import Terms from './pages/terms/Terms';
import Privacy from './pages/privacy/Privacy';
import Sleep from './pages/sleep/Sleep';
import Todos from './pages/todos/Todos';
import Budgets from './pages/budgets/Budgets';
import EditTodo from './pages/todos/EditTodo';
import DeleteTodo from './pages/todos/DeleteTodo';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar />}>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Sleep />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/todos/:id/rediger' element={<EditTodo />} />
          <Route path='/todos/:id/slett' element={<DeleteTodo />} />
          <Route path='/budsjetter' element={<Budgets />} />
          
        </Route>

        <Route element={<RequireNotAuth />}>
          <Route path='registrer' element={<Signup />} />
          <Route path='logg-inn' element={<Login />} />
          <Route path='logg-ut' element={<Logout />} />
          <Route path='glemt-passord' element={<Forgot />} />
        </Route>

        <Route path='vilkar' element={<Terms />}/>
        <Route path='personvern' element={<Privacy />} />
    </Route>
  )
)

function App() {
  const { authIsReady } = useAuthContext();
  return (
    <>
      {authIsReady && <RouterProvider router={router} />}
    </>
  )
}

export default App
