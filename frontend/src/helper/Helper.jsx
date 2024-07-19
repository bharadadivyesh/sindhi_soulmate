import axios from "axios";

const baseUrl = "http://localhost:3005";

const get = async (request) => {
  return await axios.get(`${baseUrl}/${request.path}`);
};

const post = async (request) => {
  return (await axios.post(`${baseUrl}/${request.path}`, request.data)).data;
};

export { get,post };
