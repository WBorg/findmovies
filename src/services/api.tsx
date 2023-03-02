import axios from 'axios'

export default axios.create({
  baseURL:
    'https://api.themoviedb.org/3/search/movie?api_key=f6e7f056f145d0106056f930ab16e884&language=pt-BR&region=BR&query='
})
