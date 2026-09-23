import { lazy, Suspense } from 'react';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';

//Code Splitting med lazy :)

// import Navbar from './components/Navbar';
const Navbar = lazy(() => import('./components/Navbar'));
// import RequireAuth from './guards/RequireAuth';
const RequireAuth = lazy(() => import('./guards/RequireAuth'));
// import RequireNotAuth from './guards/RequireNotAuth';
const RequireNotAuth = lazy(() => import('./guards/RequireNotAuth'));

// import Signup from './pages/signup/Signup';
const Signup = lazy(() => import('./pages/signup/Signup'));
// import Login from './pages/login/Login';
const Login = lazy(() => import('./pages/login/Login'));
// import Logout from './pages/logout/Logout';
const Logout = lazy(() => import('./pages/logout/Logout'));
// import Forgot from './pages/forgot/Forgot';
const Forgot = lazy(() => import('./pages/forgot/Forgot'));
// import Terms from './pages/terms/Terms';
const Terms = lazy(() => import('./pages/terms/Terms'));
// import Privacy from './pages/privacy/Privacy';
const Privacy = lazy(() => import('./pages/privacy/Privacy'));

// import SleepOverview from './pages/sleep/SleepOverview';
const SleepOverview = lazy(() => import('./pages/sleep/SleepOverview'));
// import Todos from './pages/todos/Todos';
const Todos = lazy(() => import('./pages/todos/Todos'));
// import Budgets from './pages/budgets/Budgets';
const Budgets = lazy(() => import('./pages/budgets/Budgets'));
// import DiaryEditForm from './pages/sleep/DiaryEditForm'
const DiaryEditForm = lazy(() => import('./pages/sleep/DiaryEditForm'));



// import SoloBudget from './pages/budgets/soloBudget/SoloBudget';
const SoloBudget = lazy(() => import('./pages/budgets/soloBudget/SoloBudget'));
// import EditBudget from './pages/budgets/EditBudget';
const EditBudget = lazy(() => import('./pages/budgets/EditBudget'));
// import DeleteBudget from './pages/budgets/DeleteBudget';
const DeleteBudget = lazy(() => import('./pages/budgets/DeleteBudget'));

// import EditMonthlyExpenses from './pages/budgets/soloBudget/expenses/monthlyExpenses/EditMonthlyExpenses';
const EditMonthlyExpenses = lazy(() => import('./pages/budgets/soloBudget/expenses/monthlyExpenses/EditMonthlyExpenses'));
// import DeleteMonthlyExpenses from './pages/budgets/soloBudget/expenses/monthlyExpenses/DeleteMonthlyExpenses';
const DeleteMonthlyExpenses = lazy(() => import('./pages/budgets/soloBudget/expenses/monthlyExpenses/DeleteMonthlyExpenses'));
// import EditYearlyExpenses from './pages/budgets/soloBudget/expenses/yearlyExpenses/EditYearlyExpenses';
const EditYearlyExpenses = lazy(() => import('./pages/budgets/soloBudget/expenses/yearlyExpenses/EditYearlyExpenses'));
// import DeleteYearlyExpenses from './pages/budgets/soloBudget/expenses/yearlyExpenses/DeleteYearlyExpenses';
const DeleteYearlyExpenses = lazy(() => import('./pages/budgets/soloBudget/expenses/yearlyExpenses/DeleteYearlyExpenses'));
// import EditSingleExpenses from './pages/budgets/soloBudget/expenses/singleExpenses/EditSingleExpenses';
const EditSingleExpenses = lazy(() => import('./pages/budgets/soloBudget/expenses/singleExpenses/EditSingleExpenses'));
// import DeleteSingleExpenses from './pages/budgets/soloBudget/expenses/singleExpenses/DeleteSingleExpenses';
const DeleteSingleExpenses = lazy(() => import('./pages/budgets/soloBudget/expenses/singleExpenses/DeleteSingleExpenses'));


// import Habits from './pages/habits/Habits';
const Habits = lazy(() => import('./pages/habits/Habits'));
// import EditHabit from './pages/habits/EditHabit';
const EditHabit = lazy(() => import('./pages/habits/EditHabit'));
// import DeleteHabit from './pages/habits/DeleteHabit';
const DeleteHabit = lazy(() => import('./pages/habits/DeleteHabit'));

// import Todo from './pages/todos/Todo';
const Todo = lazy(() => import('./pages/todos/Todo'));
// import EditTodo from './pages/todos/EditTodo';
const EditTodo = lazy(() => import('./pages/todos/EditTodo'));
// import DeleteTodo from './pages/todos/DeleteTodo';
const DeleteTodo = lazy(() => import('./pages/todos/DeleteTodo'));

// import MediaOverview from './pages/media/MediaOverview';
const MediaOverview = lazy(() => import('./pages/media/MediaOverview'));
// import DeleteMedia from './pages/media/media/DeleteMedia';
const DeleteMedia = lazy(() => import('./pages/media/media/DeleteMedia'));
// import EditMedia from './pages/media/media/EditMedia';
const EditMedia = lazy(() => import('./pages/media/media/EditMedia'));
// import EditBookmark from './pages/media/bookmarks/EditBookmark';
const EditBookmark = lazy(() => import('./pages/media/bookmarks/EditBookmark'));
// import DeleteBookmark from './pages/media/bookmarks/DeleteBookmark';
const DeleteBookmark = lazy(() => import('./pages/media/bookmarks/DeleteBookmark'));
// import EditNote from './pages/media/notes/EditNote';
const EditNote = lazy(() => import('./pages/media/notes/EditNote'));
// import DeleteNote from './pages/media/notes/DeleteNote';
const DeleteNote = lazy(() => import('./pages/media/notes/DeleteNote'));

//Code Splitting :)
const Profile = lazy(() => import('./pages/profile/Profile'));
const Review = lazy(() => import('./pages/profile/review/Review'));
const EditReview = lazy(() => import('./pages/profile/review/EditReview'));
const DeleteReview = lazy(() => import('./pages/profile/review/DeleteReview'));
const Issue = lazy(() => import('./pages/profile/issue/Issue'));
const AdminOverview = lazy(() => import('./pages/profile/admin/AdminOverview'));

const router = createBrowserRouter(
  createRoutesFromElements(
     
    <Route path='/' element={<Navbar />}>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<SleepOverview />} />
          <Route path='/dagbok/:id/rediger' element={<DiaryEditForm />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/todos/:id' element={<Todo />} />
          <Route path='/todos/:id/rediger/:id' element={<EditTodo />} />
          <Route path='/todos/:id/slett/:id' element={<DeleteTodo />} />
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
          
          <Route path='/vaner' element={<Habits />} />
          <Route path='/vaner/:id/rediger' element={<EditHabit />} />
          <Route path='/vaner/:id/slett' element={<DeleteHabit />} />
          
          <Route path="/medier" element={<MediaOverview />} />
          <Route path='/medier/:id/rediger' element={<EditMedia />} />
          <Route path='/medier/:id/slett' element={<DeleteMedia />} />

          <Route path='/bokmerker/:id/rediger' element={<EditBookmark />} />
          <Route path='/bokmerker/:id/slett' element={<DeleteBookmark />} />

          <Route path='/notat/:id/rediger' element={<EditNote />} />
          <Route path='/notat/:id/slett' element={<DeleteNote />} />

          
          <Route path='/profil' element={<Profile /> } />
          <Route path='/profil/anmeldelse' element={<Review /> } />
          <Route path='/profil/anmeldelse/:id/rediger' element={<EditReview /> } />
          <Route path='/profil/anmeldelse/:id/slett' element={<DeleteReview /> } />
          <Route path='/profil/rapporter' element={<Issue />} />
          <Route path='/profil/admin' element={<AdminOverview />} />

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
    <Suspense fallback={<div>Laster inn...</div>}>
      {authIsReady && <RouterProvider router={router} />}
    </Suspense>
  )
}

export default App
