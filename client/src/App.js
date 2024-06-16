import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import ToDo from './pages/ToDo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/todo' element={<ToDo />} />
        {/* <Route element={<ProtectedRoutes />}>
          <Route exact path='/uploadBlog' element={<UploadBlog />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
