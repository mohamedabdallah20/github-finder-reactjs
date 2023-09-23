import { createContext, useReducer } from 'react'
import GithubReducer from './GithubReducer'
const GithubContext = createContext()

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: {},
    loading: false,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // search github users
  const searchUsers = async (user) => {
    dispatch({
      type: 'SET_LOADING',
    })
    const params = new URLSearchParams({
      q: user,
    })
    const res = await fetch(`${GITHUB_API_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const { items } = await res.json()
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }
  // get single user
  const getUser = async (login) => {
    dispatch({
      type: 'SET_LOADING',
    })
    const res = await fetch(`${GITHUB_API_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    if (res.status === 404) {
      window.location('/notfound')
    } else {
      const data = await res.json()
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  // get user repos
  const getRepos = async (login) => {
    dispatch({
      type: 'SET_LOADING',
    })
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    })
    const res = await fetch(
      `${GITHUB_API_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    )
    if (res.status === 404) {
      window.location('/notfound')
    } else {
      const data = await res.json()
      dispatch({
        type: 'GET_REPOS',
        payload: data,
      })
    }
  }

  // clear users
  const clearUsers = () => {
    dispatch({
      type: 'SET_LOADING',
    })
    dispatch({
      type: 'CLEAR_USERS',
    })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        getRepos,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export default GithubContext
