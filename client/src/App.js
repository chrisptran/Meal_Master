
import { Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardPage from './views/DashboardPage'
import CreatePage from './views/CreatePage'
import EditPage from './views/EditPage'
import DetailsPage from './views/DetailsPage'
import Register from './views/Register'
import Login from './views/Login';

function App() {



  return (
    <div className="container mt-3">
      <h1 style={{color: "dodgerblue"}}>Meal Master</h1>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/meals/new" element={<CreatePage />} />
        <Route path="/meals/edit/:id" element={<EditPage />} />
        <Route path="/meals/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
