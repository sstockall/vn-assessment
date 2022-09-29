import './App.css';
import Users from './components/Users';
import { Button } from '@mui/material';

function App() {
  return (
    <main className="App">
      <header className='header'>
        <h1>Viral Nation React Assessment</h1>
      </header>
      <Users />
      <div className='new'>
        <Button size='small'>New User</Button>
      </div>
    </main>
  );
}

export default App;
