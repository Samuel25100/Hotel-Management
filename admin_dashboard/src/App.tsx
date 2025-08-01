import './style/App.css';
import Sidebar from './SideBar';
import TopBar from './TopBar';
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
