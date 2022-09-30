import './App.css';
import Characters from './components/Characters';

function App() {
  return (
    <main className="App">
      <header className='header'>
        <h1>Viral Nation React Assessment</h1>
        <h3>Click on a Character to Edit Them</h3>
      </header>
      <Characters />
    </main>
  );
}

export default App;
