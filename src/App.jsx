import { useSelector } from 'react-redux';
import './App.css';

function App() {

  const user = useSelector(state => state.auth.user)

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <h2>eMusic</h2>
          {
            user? <button></button>
            :
            <>
              <button></button>
              <button></button>
            </>
          }
        </nav>
      </header>
    </div>
  );
}

export default App;
