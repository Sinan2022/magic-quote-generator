import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Login />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Signup />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
