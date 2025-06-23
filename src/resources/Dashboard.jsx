import { useEffect, useState } from 'react';
import { Button, message, Spin } from 'antd';
import { logout } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    logout();
    message.info('Keluar dari sistem');
    navigate('/login');
  };

  useEffect(() => {
    axios.get('/user')
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
        message.error('Gagal ambil data user, silakan login ulang.');
        handleLogout();
      });
  }, []);

  if (!user) return <Spin tip="Memuat user..." />;

  return (
    <div style={{ padding: 24 }}>
      <h2>Selamat datang, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p><Link to="/accounts">Lihat Daftar Akun</Link></p>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
