import './App.css'
import Landing from './pages/Landing'
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<Authentication/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
