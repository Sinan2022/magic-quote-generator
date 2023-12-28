import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Multiselect } from 'multiselect-react-dropdown';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addQuote } from '../features/qoutes/qoutesSlice';
import { selectAuth } from '../features/auth/authSilce';


const QuoteModal = ({ show, handleClose, tagsOptions, initialQuote = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuth);

  const [quote, setQuote] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [createdTime, setCreatedTime] = useState('');

  const authorName = user;

  useEffect(() => {
    if (show) {
      if (initialQuote) {
        // If editing an existing quote
        setQuote(initialQuote.quote);
        setSelectedTags(initialQuote.tags);
        setCreatedDate(initialQuote.createdDate);
        setCreatedTime(initialQuote.createdTime);
      } else {
        // If adding a new quote
        const now = new Date();
        setCreatedDate(now.toISOString().split('T')[0]);
        setCreatedTime(now.toTimeString().split(' ')[0].substring(0, 5));
        setQuote('');
        setSelectedTags([]);
      }
    }
  }, [show, initialQuote]);

  // Handlers for the Multiselect component
  const onSelect = (selectedList, selectedItem) => {
    setSelectedTags(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedTags(selectedList);
  };

  // Submit handler for the form
  const handleSubmit = () => {
    const newQuote = {
      author: authorName.email,
      quote,
      createdDate,
      createdTime,
      tags: selectedTags.map(tag => tag.name), // Adjust according to your tag object structure
      comments: [],
      likes: [],
      dislike: [],
    };

    if (initialQuote) {
      // Edit existing quote
      // dispatch(editQuote({ ...newQuote, id: initialQuote.id }));
    } else {
      // Add new quote
      dispatch(addQuote(newQuote));
    }

    console.log(newQuote); // For debugging purposes
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialQuote ? 'Edit Quote' : 'Add New Quote'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Quote</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={quote}
              onChange={e => setQuote(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Multiselect
              options={tagsOptions}
              selectedValues={selectedTags}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {initialQuote ? 'Update Quote' : 'Save Quote'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuoteModal;



