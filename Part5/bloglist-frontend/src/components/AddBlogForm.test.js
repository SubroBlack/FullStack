import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddBlogForm from "./AddBlogForm";

test("AddBlogForm calls eventHandler with proper input", () => {
  const createBlog = jest.fn();
  const setNotification = jest.fn();

  const component = render(
    <AddBlogForm createBlog={createBlog} setNotification={setNotification} />
  );

  const title = component.container.querySelector("#titleIn");
  const author = component.container.querySelector("#authorIn");
  const url = component.container.querySelector("#urlIn");
  const likes = component.container.querySelector("#likesIn");
  const form = component.container.querySelector("formIn");

  fireEvent.change(title, {
    target: { value: "Test Blog" }
  });
  fireEvent.change(author, {
    target: { value: "Test Author" }
  });
  fireEvent.change(url, {
    target: { value: "https://youtube.com" }
  });
  fireEvent.change(likes, {
    target: { value: 10 }
  });
  fireEvent.submit(form);

  console.log(createBlog.mock.calls);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Test Blog");
  expect(createBlog.mock.calls[0][0].author).toBe("Test Author");
  expect(createBlog.mock.calls[0][0].url).toBe("https://youtube.com");
  expect(createBlog.mock.calls[0][0].likes).toBe("10");
});
