import axios from 'axios'
const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
})
// search github users
export const searchUsers = async (user) => {
  // dispatch({
  //   type: 'SET_LOADING',
  // })
  const params = new URLSearchParams({
    q: user,
  })
  const res = await github.get(`/search/users?${params}`)
  return res.data.items
}
// get single user and his repos
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ])
  return { user: user.data, repos: repos.data }
}
