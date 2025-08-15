import './style/App.css';
import Sidebar from './pages/SideBar';
import TopBar from './pages/TopBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
