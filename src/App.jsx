import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './resources/Login';
import Dashboard from './resources/Dashboard';
import Accounts from './resources/primary/inventory/Accounts';
import { isLoggedIn } from './utils/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/accounts" element={isLoggedIn() ? <Accounts /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;