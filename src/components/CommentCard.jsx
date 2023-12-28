import React, { useState, useEffect } from "react";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import Comment from "./Cards/Comment";
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAuth } from './features/auth/authSilce';

export default function CommentCard({
  qoute,
  users,
  toggleLikeOrDislike,
  qoutes,
  index,
  setQout,
}) {
  useEffect(() => {
    console.log("Qoute prop updated in CommentCard:", qoutes);
  }, [qoutes]);
  const getProfilePictureByEmail = (users, email) => {
    const user = users.find((user) => user.email === email);
    return user?.profilePicture || false;
  };

  const qouteIndex = index;
  const profilePic = getProfilePictureByEmail(users, qoute.author);
  //

  // const { isAuthenticated, user } = useSelector(selectAuth);

  const user = {
    user: {
      firstName: "sinasn",
      lastName: "saleem",
      username: "sinan",
      email: "sinan@gmail.com",
      password: "sinan",
      gender: "Male",
      profilePicture:
        "https://firebasestorage.googleapis.com/v0/b/ngo-registration-75ae0.appspot.com/o/Screenshot%202023-12-20%20at%204.50.53%20PM.png?alt=media&token=80961ba9-83cc-4425-b6c6-c62c53cad6f1",
    },
    email: "sinan@gmail.com",
    password: "sinan",
  };

  const handleLike = (index) => {
    toggleLikeOrDislike(qoutes, qoute.author, index, "like");
  };

  const handleDislike = (index) => {
    toggleLikeOrDislike(qoutes, qoute.author, index, "dislike");
  };
  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (!newComment.trim()) return; // Prevent empty comments

    const updatedComments = [
      ...qoute.comments,
      {
        author: user.email, // Or however you identify the current user
        comment: newComment,
        likes: [],
        dislike: [],
      },
    ];

    // Now pass this updated comments array to the parent component to update the qoutes state
    updateCommentsForQoute(index, updatedComments);

    // Clear the comment input
    setNewComment("");
  };

  const updateCommentsForQoute = (quoteIndex, updatedComments) => {
    qoutes[index].comments = [...updatedComments];
    setQout(qoutes);
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10" xl="8">
            <MDBCard>
              <MDBCardBody>
                <div className="d-flex flex-start align-items-center">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src={profilePic}
                    alt="avatar"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h6 className="fw-bold text-primary mb-1">
                      {qoute?.author}
                    </h6>
                    <p className="text-muted small mb-0">
                      Shared - {`${qoute?.createdDate}, ${qoute?.createdTime}`}
                    </p>
                  </div>
                </div>

                <p className="mt-3 mb-4 pb-2">{qoute?.quote}</p>

                <div className="small d-flex justify-content-start">
                  <a
                    href="#!"
                    className="d-flex align-items-center me-3"
                    onClick={() => handleLike(index)}
                  >
                    <MDBIcon far icon="thumbs-up me-2" />
                    <p className="mb-0">Like{qoute.likes.length}</p>
                  </a>
                  <a
                    href="#!"
                    className="d-flex align-items-center me-3"
                    onClick={() => handleDislike(index)}
                  >
                    <MDBIcon far icon="comment-dots me-2" />
                    <p className="mb-0">Dislike{qoute.dislike.length}</p>
                  </a>
                </div>

                {/*  */}
                <p className="small mb-0">Comments</p>

                {qoute.comments.map((comment, commentIndex) => (
                  <Comment
                    commentIndex={commentIndex}
                    name={comment.author} // Assuming 'author' is the name you want to display
                    avatar={getProfilePictureByEmail(users, comment.author)} // Replace with actual avatar URL or a field from 'comment'
                    comment={comment.comment}
                    quoteIndex={qouteIndex}
                    setQout={setQout}
                    qoutes={qoutes}
                    currentUser={user}
                  />
                ))}
              </MDBCardBody>

              <MDBCardFooter
                className="py-3 border-0"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex flex-start w-100">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src={user.user.profilePicture}
                    alt="avatar"
                    width="40"
                    height="40"
                  />
                  <MDBTextArea
                    label="Message"
                    id="textAreaExample"
                    rows={4}
                    style={{ backgroundColor: "#fff" }}
                    wrapperClass="w-100"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>

                <div className="float-end mt-2 pt-1">
                  <MDBBtn
                    size="sm"
                    className="me-1"
                    onClick={handlePostComment}
                  >
                    Post comment
                  </MDBBtn>
                  <MDBBtn outline size="sm">
                    Cancel
                  </MDBBtn>
                </div>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
