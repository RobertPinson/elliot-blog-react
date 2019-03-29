import React from 'react'
import base from './base.css'
import Container from '../components/container'
import Navigation from '../components/navigation'

export default ({children}) => (
  <Container>
  <Navigation />
  {children}
</Container>
)
