import React, { useContext, useEffect } from 'react'
import GithubContext from '../context/github/GithubContext'
import { useParams } from 'react-router-dom'

function User() {
  const { user, getUser } = useContext(GithubContext)
  const { login } = useParams()
  useEffect(() => {
    getUser(login)
  }, [])
  //   console.log(user)
  return <div>{user.login}</div>
}

export default User
