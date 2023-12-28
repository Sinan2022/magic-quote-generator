import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const QouteCard = ({ }) => {
  return (
    <Card>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Auther: </Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

export default QouteCard

