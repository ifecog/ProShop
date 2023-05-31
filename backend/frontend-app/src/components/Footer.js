import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
          <Row>
            <Col className='text-center py-3'>Copyright &copy; {currentYear} ProShop. All rights reserved.</Col>
          </Row>
        </Container>
    </footer>
  )
}

export default Footer
