import axios from "axios"

export const createNote = ({ title, body, userId}) => {
  axios.post('https://jsonplaceholder.typicode.com/posts', { title, body, userId })
    .then((Response) => {
      const { data } = Response
      return data
    })
}