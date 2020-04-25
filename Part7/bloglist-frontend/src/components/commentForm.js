import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentOn } from "../reducers/blogReducer";
import { useHistory } from "react-router-dom";

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState("");

  // Dispatch action creator
  const dispatch = useDispatch();

  const history = useHistory();

  //Comment on the blog
  const postComment = async (event) => {
    event.preventDefault();
    await dispatch(commentOn(blog, comment));
    setComment("");
  };

  return (
    <form onSubmit={postComment}>
      <input
        type="text"
        value={comment}
        name="Comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
