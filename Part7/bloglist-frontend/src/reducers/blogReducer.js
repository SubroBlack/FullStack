import blogService from "../services/blogs";
import { notify } from "./notificationReducer";

// Initialize Blogs in the store
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

// To create a new Blog
export const createNew = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: "NEW",
      data: newBlog,
    });
    dispatch(
      notify(`Added ${newBlog.title} by ${newBlog.author} in the list`, 5)
    );
  };
};

// To like for an existing blog
export const like = (content) => {
  return async (dispatch) => {
    const likedBlog = await blogService.addLike(content);
    dispatch({
      type: "LIKE",
      data: likedBlog,
    });
    dispatch(notify(`You liked the blog ${content.title}`, 2));
  };
};

// To Comment on a Blog
export const commentOn = (blog, content) => {
  return async (dispatch) => {
    const result = await blogService.comment(blog.id, content);
    dispatch({
      type: "COMMENT",
      data: result,
    });
    dispatch(notify(`You commented ${content} on the blog ${blog.title}`, 5));
  };
};

// To Delete a Blog
export const deleteBlog = (content) => {
  return async (dispatch) => {
    const response = await blogService.deleteBlog(content);
    console.log("Blog Delete reducer: ", response);
    if (response) {
      dispatch({
        type: "DELETE",
        data: content,
      });
      dispatch(notify(`You deleted the blog ${content.title}`, 2));
    } else {
      dispatch(notify(`Cannot delete the blog ${content.title}`, 4));
    }
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "NEW":
      return state.concat(action.data);
    case "LIKE":
      const otherBlogs = state.filter((obj) => obj.id !== action.data.id);
      return otherBlogs.concat(action.data);
    case "COMMENT":
      const other = state.filter((obj) => obj.id !== action.data.id);
      return other.concat(action.data);
    case "DELETE":
      return state.filter((obj) => obj.id !== action.data.id);
    default:
      return state;
  }
};

export default blogReducer;
