import "./App.css";
import HomeView from "./views/HomeView";
import ResultView from "./views/ResultView";
import SubjectView from "./views/SubjectView";
import {Routes, Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">  
      
      <nav>
        <span>Navigate to: </span>
        <Link to="/" >Home</Link>
        <span> | </span>
        <Link to="/subject" >Subject list</Link>
        <span> | </span>
        <Link to="/result" >Results</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomeView />}  />
        <Route path="/subject" element={<SubjectView />}  />
        <Route path="/result" element={<ResultView />}  />
      </Routes>   
    
    </div>
  );
}

export default App;
