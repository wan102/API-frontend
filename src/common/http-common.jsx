import axios from 'axios'

export default axios.create({
  // baseURL: 'http://localhost:10833/api/v1/',
  baseURL: 'https://API-frontend.kenwan2112.repl.co/api/v1',
  headers: {
    'Content-type': 'application/json',
    'Content-Length': '<calculated when request is sent>'
  }
})