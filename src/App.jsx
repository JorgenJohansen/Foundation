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

import SleepOverview from './pages/sleep/SleepOverview';
import Todos from './pages/todos/Todos';
import Budgets from './pages/budgets/Budgets';

import EditTodo from './pages/todos/EditTodo';
import DeleteTodo from './pages/todos/DeleteTodo';

import SoloBudget from './pages/budgets/soloBudget/SoloBudget';
import EditBudget from './pages/budgets/EditBudget';
import DeleteBudget from './pages/budgets/DeleteBudget';

import EditMonthlyExpenses from './pages/budgets/soloBudget/expenses/monthlyExpenses/EditMonthlyExpenses';
import DeleteMonthlyExpenses from './pages/budgets/soloBudget/expenses/monthlyExpenses/DeleteMonthlyExpenses';
import EditYearlyExpenses from './pages/budgets/soloBudget/expenses/yearlyExpenses/EditYearlyExpenses';
import DeleteYearlyExpenses from './pages/budgets/soloBudget/expenses/yearlyExpenses/DeleteYearlyExpenses';
import EditSingleExpenses from './pages/budgets/soloBudget/expenses/singleExpenses/EditSingleExpenses';
import DeleteSingleExpenses from './pages/budgets/soloBudget/expenses/singleExpenses/DeleteSingleExpenses';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar />}>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<SleepOverview />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/todos/:id/rediger' element={<EditTodo />} />
          <Route path='/todos/:id/slett' element={<DeleteTodo />} />
          <Route path='/budsjetter' element={<Budgets />} />
          <Route path='/budsjetter/:id' element={<SoloBudget />} />
          <Route path='/budsjetter/:id/rediger' element={<EditBudget />} />
          <Route path='/budsjetter/:id/slett' element={<DeleteBudget />} />

          <Route path='/budsjetter/:id/manedligeKostnader/:id/rediger' element={<EditMonthlyExpenses />} />
          <Route path='/budsjetter/:id/manedligeKostnader/:id/slett' element={<DeleteMonthlyExpenses />} />

          <Route path='/budsjetter/:id/aarligeKostnader/:id/rediger' element={<EditYearlyExpenses />} />
          <Route path='/budsjetter/:id/aarligeKostnader/:id/slett' element={<DeleteYearlyExpenses />} />

          <Route path='/budsjetter/:id/enkeltKostnader/:id/rediger' element={<EditSingleExpenses />} />
          <Route path='/budsjetter/:id/enkeltKostnader/:id/slett' element={<DeleteSingleExpenses />} />
          
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
