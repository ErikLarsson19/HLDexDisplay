
import './App.css';
import Balance from './Balance';
import AvailableCurrencies from './AvailableCurrencies';
import Navbar from './Navbar';

function App() {

  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
      <Balance/>
      <AvailableCurrencies/>
      </header>
    </div>
  );
}

export default App;
