import React from 'react'
import logoImg from '../assets/logo.png'

function Logo({width = '100px'}) {
  return (
    <img src={logoImg} style={{width}} alt='logo placeholder' />
  )
}

export default Logo