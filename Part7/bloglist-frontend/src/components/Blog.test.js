import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, getByText } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "Test Blog",
  author: "Test Author",
  url: "https://youtube.com",
  likes: 10
};

const mockLike = jest.fn();
const mockDelete = jest.fn();

let component;

beforeEach(() => {
  component = render(
    <Blog blog={blog} addLike={mockLike} deleteBlog={mockDelete} />
  );
});

test("shows title and URL at first", () => {
  const result = component.container.querySelector(".BlogBrief");
  expect(result).toHaveTextContent("Test Blog");
  expect(result).toHaveTextContent("Test Author");
  expect(result).not.toHaveTextContent("https://youtube.com");
  expect(result).not.toHaveTextContent("with 10 likes");
});

test("shows also url and likes when the title is clicked", () => {
  fireEvent.click(component.container.querySelector(".BlogBrief"));
  const result = component.container.querySelector(".BlogDetails");
  expect(result).toHaveTextContent("Test Blog");
  expect(result).toHaveTextContent("Test Author");
  expect(result).toHaveTextContent("https://youtube.com");
  expect(result).toHaveTextContent("with 10 likes");
});

test("when like button is clicked twice, the eventhandler is called twice", () => {
  fireEvent.click(component.container.querySelector(".BlogBrief"));
  const likeButton = component.getByText("Add Like");
  fireEvent.doubleClick(likeButton);
  expect(mockLike.mock.calls).toHaveLength(2);
});
