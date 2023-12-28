import React, { useState, useEffect } from "react";
import { MDBCardImage } from "mdb-react-ui-kit";
import EditCommentModal from "../Modals/EditCommentModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Comment = ({
  name,
  avatar,
  comment,
  quoteIndex,
  commentIndex,
  setQout,
  qoutes,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleEditClick = () => {
    console.log("Edit icon clicked");
    setShowModal(true);
    // Add your logic here
  };

  const removeComment = (quotes, quoteIndex, commentIndex) => {
    // Make sure the indices are within the bounds
    if (quoteIndex === undefined || commentIndex === undefined) {
      return quotes;
    }
    if (
      quoteIndex >= 0 &&
      quoteIndex < quotes.length &&
      commentIndex >= 0 &&
      commentIndex < quotes[quoteIndex].comments.length
    ) {
      // Create a shallow copy of the quotes array
      const newQuotes = [...quotes];

      // Remove the comment at commentIndex from the specified quote
      newQuotes[quoteIndex].comments.splice(commentIndex, 1);

      return newQuotes;
    }

    // Return the original quotes if indices are not valid
    return quotes;
  };

  const handleDeleteComment = () => {
    const updatedQuotes = removeComment(qoutes, quoteIndex, commentIndex);
    setQout(updatedQuotes);
    console.log("Delete a comment");
  };

  return (
    <div className="d-flex flex-start mt-4">
      {/* <AddQuoteModal
        show={showModal}
        handleClose={handleCloseModal}
        tagsOptions={tagsOptions}
      /> */}
      {showModal && (
        <EditCommentModal
          show={showModal}
          handleClose={handleCloseModal}
          commentVal={comment}
          quoteIndex={quoteIndex}
          commentIndex={commentIndex}
          setQout={setQout}
          qoutes={qoutes}
        />
      )}
      <a className="me-3" href="#">
        <MDBCardImage
          className="rounded-circle shadow-1-strong me-3"
          src={avatar}
          alt="avatar"
          width="65"
          height="65"
        />
      </a>

      <div className="flex-grow-1 flex-shrink-1">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-1">{name} </p>
          </div>
          <p className="small mb-0">{comment}</p>
        </div>
      </div>
      <span>
        <EditIcon onClick={handleShowModal} style={{ marginRight: "8px" }} />
        <DeleteIcon onClick={handleDeleteComment} />
      </span>
    </div>
  );
};

export default Comment;
