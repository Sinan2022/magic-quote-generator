import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Multiselect } from 'multiselect-react-dropdown';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addQuote } from '../features/qoutes/qoutesSlice';
import { selectAuth } from '../features/auth/authSilce';

const EditCommentModal = ({ show, handleClose, commentVal, quoteIndex, commentIndex, setQout, qoutes }) => {
  const [comment, setComment] = useState(commentVal);
  const handleSubmit = (e) => {



    e.preventDefault();
    console.log(quoteIndex);
    console.log(commentIndex);
    console.log(qoutes);
    if (quoteIndex === undefined || commentIndex === undefined) {
      return qoutes;
    }
    qoutes[quoteIndex].comments[commentIndex].comment = comment;
    setQout(qoutes);

    console.log('Qoutes should be updated!')
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Quote</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update Comment
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditCommentModal

