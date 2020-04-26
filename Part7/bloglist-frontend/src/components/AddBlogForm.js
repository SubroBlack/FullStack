import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNew } from "../reducers/blogReducer";
import { useHistory } from "react-router-dom";

import { Card, TextField, Button, CardContent } from "@material-ui/core";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [likes, setLikes] = useState(0);

  // Dispatch hook to call actionCreators
  const dispatch = useDispatch();

  // Redirect
  const history = useHistory();

  // Adding a blog
  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
      likes,
    };
    dispatch(createNew(newBlog));

    // Clearing the Blog add Form
    setTitle("");
    setAuthor("");
    setURL("");
    setLikes(0);
    history.push("/");
  };

  // Cancel the Post
  const cancel = () => {
    setTitle("");
    setAuthor("");
    setURL("");
    setLikes(0);
    history.push("/");
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={addBlog}>
          <div>
            <TextField
              id="titleIn"
              type="text"
              value={title}
              name="Title"
              label="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <br />
          <div>
            <TextField
              id="authorIn"
              type="text"
              value={author}
              label="Author"
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <br />
          <div>
            <TextField
              id="urlIn"
              type="url"
              label="URL"
              value={url}
              name="URL"
              onChange={({ target }) => setURL(target.value)}
            />
          </div>
          <br />
          <div>
            <TextField
              id="likesIn"
              type="number"
              min="0"
              value={likes}
              name="Likes"
              onChange={({ target }) => setLikes(target.value)}
            />
          </div>
          <br />
          <Button color="primary" id="addBlogBtn" type="submit">
            Submit
          </Button>
          <Button color="secondary" onClick={cancel}>
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBlogForm;
