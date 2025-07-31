import './style/App.css';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
