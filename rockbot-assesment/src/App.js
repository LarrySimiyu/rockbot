import logo from './logo.svg';
import './App.css';


import Navigation from './components/Navigation'
import Paths from './components/Paths'

function App() {
  return (
    <div className="mainContainer">
      <div className="displayedContent">
      <Paths />
      <Navigation />

      </div>
      
     
    </div>
  );
}

export default App;
