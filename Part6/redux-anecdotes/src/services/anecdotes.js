import axios from "axios";
const baseUrl = "http://localhost:3002/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const voteFor = async (anecdote) => {
  const url = baseUrl + "/" + anecdote.id;
  const object = { content: anecdote.content, votes: anecdote.votes + 1 };
  const response = await axios.put(url, object);
  return response.data;
};

export default { getAll, createNew, voteFor };
