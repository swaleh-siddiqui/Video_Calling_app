import './App.css'
import Landing from './pages/Landing'
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/AuthContext';
import Video_Meet from './pages/Video_Meet';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<Authentication/>}/>
        <Route path='/:url' element={<Video_Meet/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
