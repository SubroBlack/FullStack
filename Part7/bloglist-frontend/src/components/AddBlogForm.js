import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNew } from "../reducers/blogReducer";
import { useHistory } from "react-router-dom";

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

  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          id="titleIn"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          id="authorIn"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
          id="urlIn"
          type="url"
          value={url}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <div>
        Likes
        <input
          id="likesIn"
          type="number"
          min="0"
          value={likes}
          name="Likes"
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button id="addBlogBtn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddBlogForm;
