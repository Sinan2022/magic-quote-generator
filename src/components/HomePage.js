import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddQuoteModal from './Modals/AddQuoteModal';
import CommentCard from './CommentCard';
import Column from './Column';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from './features/users/usersSlice';
import { selectQuotes } from './features/qoutes/qoutesSlice';

const HomePage = () => {
  // const users = useSelector(selectUsers);
  // const quotes = useSelector(selectQuotes);
  const users = [
    {
      "firstName": "sinan",
      "lastName": "saleem",
      "username": "sinan",
      "email": "sinan@gmail.com",
      "password": "sinan",
      "gender": "Male",
      "profilePicture": "https://firebasestorage.googleapis.com/v0/b/ngo-registration-75ae0.appspot.com/o/Screenshot%202023-12-20%20at%204.50.53%20PM.png?alt=media&token=80961ba9-83cc-4425-b6c6-c62c53cad6f1"
    },
    {
      "firstName": "umar",
      "lastName": "tariq",
      "username": "umar",
      "email": "umar@gmail.com",
      "password": "umar",
      "gender": "Female",
      "profilePicture": "https://firebasestorage.googleapis.com/v0/b/ngo-registration-75ae0.appspot.com/o/Screenshot%202023-11-29%20at%208.11.21%20PM.png?alt=media&token=3b8b4f70-a075-4807-a56b-e5894c21fb7e"
    },
    {
      "firstName": "ali",
      "lastName": "ahmad",
      "username": "ali",
      "email": "ali@gmail.com",
      "password": "ali",
      "gender": "Other",
      "profilePicture": "https://firebasestorage.googleapis.com/v0/b/ngo-registration-75ae0.appspot.com/o/WhatsApp%20Image%202023-12-11%20at%2012.04.47%20AM.jpeg?alt=media&token=23387294-e84e-4a7a-b920-b9150d5869e9"
    }
  ]
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [qout, setQout] = useState([{
    "author": "umar@gmail.com",
    "quote": "This is post by umar",
    "createdDate": "2021-12-27",
    "createdTime": "15:37",
    "tags": [
      {
        "name": "sports",
        "id": 1
      },
      {
        "name": "inspiration",
        "id": 3
      }
    ],
    "comments": [
      {
        "author": "ali@gmail.com",
        "comment": "Coment by Ali",
        "likes": [],
        "dislike": []

      },
      {
        "author": "umar@gmail.com",
        "comment": "Comment by Umar",
        "likes": [],
        "dislike": []

      },
      {
        "author": "sinan@gmail.com",
        "comment": "Comment by Sinan",
        "likes": [],
        "dislike": []

      }
    ],
    "likes": [],
    "dislike": []
  },

  {
    "author": "sinan@gmail.com",
    "quote": "This is a post by sinan",
    "createdDate": "2022-12-27",
    "createdTime": "15:37",
    "tags": [
      {
        "name": "sports",
        "id": 1
      },
      {
        "name": "inspiration",
        "id": 3
      }
    ],
    "comments": [
      {
        "author": "ali@gmail.com",
        "comment": "Coment by Ali2",
        "likes": [],
        "dislike": []

      },
      {
        "author": "umar@gmail.com",
        "comment": "Comment by Umar3",
        "likes": [],
        "dislike": []

      }
    ],
    "likes": [],
    "dislike": []
  }]);

  const quotes = qout;

  useEffect(() => {
    console.log("Qoute prop updated in CommentCard:", qout);
  }, [qout]);

  const tagsOptions = [
    { name: "sports", id: 1 },
    { name: "life", id: 2 },
    { name: "inspiration", id: 3 }
  ];

  // Function to filter quotes
  const filterQuotes = (quotes, query) => {
    if (!query) return quotes;
    return quotes.filter((quote) =>
      quote.author.toLowerCase().includes(query.toLowerCase()) ||
      quote.quote.toLowerCase().includes(query.toLowerCase()) ||
      quote.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase()))
    );
  };

  // Function to sort quotes
  // const sortQuotes = (quotes, key, order) => {
  //   return quotes.slice().sort((a, b) => {
  //     const aValue = key === 'comments' ? a[key].length : a[key];
  //     const bValue = key === 'comments' ? b[key].length : b[key];
  //     if (aValue < bValue) {
  //       return order === 'asc' ? -1 : 1;
  //     }
  //     if (aValue > bValue) {
  //       return order === 'asc' ? 1 : -1;
  //     }
  //     return 0;
  //   });
  // };

  const sortQuotes = (quotes, key, order) => {
    return quotes.slice().sort((a, b) => {
      let aValue, bValue;

      if (key === 'likes' || key === 'dislike' || key === 'comments') {
        // Sort by the length of the array for likes, dislikes, and comments
        aValue = a[key].length;
        bValue = b[key].length;
      } else {
        // Default sorting (e.g., by createdDate)
        aValue = a[key];
        bValue = b[key];
      }

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Get the filtered and sorted quotes
  const filteredQuotes = filterQuotes(quotes, searchQuery);
  const sortedAndFilteredQuotes = sortQuotes(filteredQuotes, sortKey, sortOrder);

    //
    const toggleLikeOrDislike = (quotes, email, quoteIndex, action, commentIndex = null) => {
      // Check if the quote index is valid
      if (quoteIndex < 0 || quoteIndex >= quotes.length) {
        console.error("Invalid quote index");
        return;
      }

      // Create a deep copy of the quotes to ensure immutability
      const updatedQuotes = quotes.map((quote, idx) =>
        idx === quoteIndex ? {...quote, comments: quote.comments.map(comment => ({...comment}))} : quote
      );

      // Determine the target for the like/dislike action (quote or comment)
      const target = commentIndex !== null ? updatedQuotes[quoteIndex].comments[commentIndex] : updatedQuotes[quoteIndex];

      // Check if the comment index is valid (if applicable)
      if (commentIndex !== null && (commentIndex < 0 || commentIndex >= updatedQuotes[quoteIndex].comments.length)) {
        console.error("Invalid comment index");
        return;
      }

      // Function to toggle email in the array
      const toggleEmailInArray = (arrayToAdd, arrayToRemove) => {
        const emailIndexInAddArray = arrayToAdd.indexOf(email);
        const emailIndexInRemoveArray = arrayToRemove.indexOf(email);

        // Remove email from the opposite array if present
        if (emailIndexInRemoveArray !== -1) {
          arrayToRemove.splice(emailIndexInRemoveArray, 1);
        }

        // Toggle email in the desired array
        if (emailIndexInAddArray === -1) {
          // Email not in array, add it
          arrayToAdd.push(email);
        } else {
          // Email is in array, remove it
          arrayToAdd.splice(emailIndexInAddArray, 1);
        }
      };

      // Depending on the action, update the likes or dislikes
      if (action === 'like') {
        toggleEmailInArray(target.likes, target.dislike);
      } else if (action === 'dislike') {
        toggleEmailInArray(target.dislike, target.likes);
      } else {
        console.error("Invalid action");
      }

      // Update the state with the modified quotes array
      setQout(updatedQuotes);
    };
  return (
    <div>
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search quotes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="mb-3 d-flex justify-content-start">
        <Form.Select
          className="me-2"
          style={{ width: 'auto' }}
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="createdDate">Created Date</option>
          <option value="likes">Number of Likes</option>
          <option value="dislike">Number of Dislikes</option>
          <option value="comments">Number of Comments</option>
        </Form.Select>
        <Form.Select
          style={{ width: 'auto' }}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Form.Select>
      </div>
      <Button variant="primary" onClick={handleShowModal}>
        Launch Add Quote Modal
      </Button>
      <AddQuoteModal
        show={showModal}
        handleClose={handleCloseModal}
        tagsOptions={tagsOptions}
      />
      {sortedAndFilteredQuotes.map((quote, index) => (
         <CommentCard index={index} qoute={quote} users={users} toggleLikeOrDislike={toggleLikeOrDislike} qoutes={sortedAndFilteredQuotes} setQout={setQout} />
      ))}
    </div>
  );
};

export default HomePage;
