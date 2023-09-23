import { createContext, useReducer } from 'react'
import GithubReducer from './GithubReducer'
const GithubContext = createContext()

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
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
