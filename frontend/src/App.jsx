import { Routes, Route, Navigate } from 'react-router-dom'
import ApplyPage from './pages/ApplyPage'
import RecruiterPage from './pages/RecruiterPage'
import Navigation from './components/Navigation'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  const token = localStorage.getItem('token')

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/apply"
            element={
              token ? <ApplyPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/recruiter"
            element={
              token ? <RecruiterPage /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
