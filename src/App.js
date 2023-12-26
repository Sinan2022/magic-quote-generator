import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login';
import EditProfile from './components/EditProfile';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">

    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route path="/profile/edit" element={<EditProfile />} />
        {/* <Route path="/quotes" element={<QuotesList />} />
        <Route path="/quotes/search" element={<SearchQuotes />} />
        <Route path="/quotes/:quoteId" element={<SingleQuote />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
      {/* <Router>
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
      </Router> */}
    </div>
  );
}

export default App;
