import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './components/Nav'
import PokeContainer from './components/PokeContainer';
import PokeInfo from './components/PokeInfo'
import GoUp from './components/GoUp'

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <GoUp />
        <div className="App-container">
          <Route exact path="/" component={PokeContainer} />
          <Route exact path="/pokemon/:id" component={PokeInfo} />
        </div>
      </Router>
    </div>
  );
}

export default App;
