import React from 'react'

function AuthLayout({children, authentication = true}) {
  return (
    <>{children}</>
  )
}

export default AuthLayout