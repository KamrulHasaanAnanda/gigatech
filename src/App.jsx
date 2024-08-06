import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/home/Home';
import Login from './routes/auth/Login';
import SignUp from './routes/auth/SignUp';
import UserInteraction from './routes/users/UserInteraction';
import AppointmentManagement from './routes/appointment/AppointmentManagement';
import { supabase } from './configs/supabase';

const PrivateRoute = ({ element: Element, session, ...rest }) => {
  return session ? <Element {...rest} session={session} /> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element: Element, session, ...rest }) => {
  return !session ? <Element {...rest} /> : <Navigate to={`/user/${session?.user?.id}`} replace />;
};

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>  // Or a more sophisticated loading component
  }

  return (
    <Router>
      <div className='bg-gradient-to-br from-indigo-100 to-purple-200 min-h-screen'>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home session={session} />} />
          <Route path="/login" element={<PublicRoute element={Login} session={session} />} />
          <Route path="/signup" element={<PublicRoute element={SignUp} session={session} />} />

          {/* Private routes */}
          <Route path="/user/:userId" element={<PrivateRoute element={UserInteraction} session={session} />} />
          <Route path="/appointment/:userId" element={<PrivateRoute element={AppointmentManagement} session={session} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App