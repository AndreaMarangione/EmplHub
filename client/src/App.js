import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import Tasks from './pages/Tasks';
import CreateEmployee from './pages/CreateEmployee';
import ModifyEmployee from './pages/ModifyEmployee';
import CreateCustomer from './pages/CreateCustomer';
import ModifyCustomer from './pages/ModifyCustomer';
import CreateTask from './pages/CreateTask';
import ModifyTask from './pages/ModifyTasks';
import CommentTask from './pages/CommentTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/employees' element={<Employees />} />
        <Route exact path='/customers' element={<Customers />} />
        <Route exact path='/tasks' element={<Tasks />} />
        <Route exact path='/tasks/comment' element={<CommentTask />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path='/employees/create' element={<CreateEmployee />} />
          <Route exact path='/employees/modify' element={<ModifyEmployee />} />
          <Route exact path='/customers/create' element={<CreateCustomer />} />
          <Route exact path='/customers/modify' element={<ModifyCustomer />} />
          <Route exact path='/tasks/create' element={<CreateTask/>} />
          <Route exact path='/tasks/modify' element={<ModifyTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
