import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'

function Header() {
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">ProShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Cart"><i className='fa fa-shopping-cart' aria-hidden="true"></i>Cart</Nav.Link>
                        <Nav.Link href="/Login"><i className='fa fa-user' aria-hidden="true"></i>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>        
    </header>
  )
}

export default Header
