import './App.css'
import Landing from './pages/Landing'
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/AuthContext';
import Video_Meet from './pages/Video_Meet';
import HomeComponent from './pages/HomeComponent';
import History from './pages/History';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<HomeComponent/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/auth" element={<Authentication/>}/>
        <Route path='/:url' element={<Video_Meet/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
