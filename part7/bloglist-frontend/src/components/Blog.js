import React, { useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Blog = ({ blog }) => {

  const [showInfo, setShowInfo] = useState(false)
  /*const style = {
    textAlign: 'start'
  }*/


  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }


  return (
    <Container fluid='xxl'>
      <Row className="justify-content-start" >
        <Col xs lg="2">
          <strong>{blog.title}</strong>
        </Col>
        <Col xs lg="2">
          {blog.author}
        </Col>
        <Col xs lg="2">
          <Button variant="light"
            onClick={toggleInfo}
            id="hide-show">{showInfo ? 'Hide' : 'Show'}</Button>
        </Col>
      </Row>
    </Container>
  )

}

export default Blog