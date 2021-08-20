import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-todo-nodejs.herokuapp.com",
});

export default instance;
