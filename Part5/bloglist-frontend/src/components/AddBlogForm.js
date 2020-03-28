import React, { useState } from "react";

const AddBlogForm = props => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [likes, setLikes] = useState(0);

  // Adding a blog
  const addBlog = async event => {
    event.preventDefault();
    console.log("SENDing Note");

    const newBlog = {
      title,
      author,
      url,
      likes
    };
    props.createBlog(newBlog);
    // Setting the notification
    props.setNotification(`Added ${title} by ${author} in the collection`);
    setTimeout(() => {
      props.setNotification(null);
    }, 5000);

    // Clearing the Blog add Form
    setTitle("");
    setAuthor("");
    setURL("");
    setLikes(0);
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
          type="url"
          value={url}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <div>
        Likes
        <input
          type="number"
          min="0"
          value={likes}
          name="Likes"
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddBlogForm;
