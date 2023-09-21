import { createContext, useReducer } from 'react'
import GithubReducer from './GithubReducer'
const GithubContext = createContext()

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)
  const fetchUsers = async () => {
    const res = await fetch(`${GITHUB_API_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const data = await res.json()
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
    // console.log(users)
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export default GithubContext
