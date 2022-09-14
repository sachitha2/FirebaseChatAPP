import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import { auth } from './firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth'

import NoPage from './NoPage';
import Home from './Home';

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/user/:cuid/:room" element={<Chat/>}/>
          <Route exact path="*" element={<NoPage/>}/>
        </Routes>
      </Router>
  );
}

export default App;
