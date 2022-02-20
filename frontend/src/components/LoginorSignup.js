import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const LoginOrSignUp = ({ loggedUser }) => {
  const location = useLocation()
  if (loggedUser || location.pathname === '/signup') {
    return null
  }
  return (
    <section
      style={{
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: '15',
        textAlign: 'center',
      }}
    >
      <Link to="/login">Log in or sign up to share your own blogs!</Link>
    </section>
  )
}

export default LoginOrSignUp
