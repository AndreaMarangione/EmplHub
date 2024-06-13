import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route element={<ProtectedRoutes />}>
          <Route exact path='/uploadBlog' element={<UploadBlog />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
