import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentOn } from "../reducers/blogReducer";

import { Button, TextField } from "@material-ui/core";

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState("");

  // Dispatch action creator
  const dispatch = useDispatch();

  //Comment on the blog
  const postComment = async (event) => {
    event.preventDefault();
    await dispatch(commentOn(blog, comment));
    setComment("");
  };

  return (
    <form onSubmit={postComment}>
      <TextField
        type="text"
        value={comment}
        name="Comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CommentForm;
