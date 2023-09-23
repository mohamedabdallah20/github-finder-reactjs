const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// search github users
export const searchUsers = async (user) => {
  // dispatch({
  //   type: 'SET_LOADING',
  // })
  const params = new URLSearchParams({
    q: user,
  })
  const res = await fetch(`${GITHUB_API_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
  const { items } = await res.json()
  return items
}
// get single user
export const getUser = async (login) => {
  const res = await fetch(`${GITHUB_API_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
  if (res.status === 404) {
    window.location('/notfound')
  } else {
    const data = await res.json()
    return data
  }
}

// get user repos
export const getRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })
  const res = await fetch(`${GITHUB_API_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
  if (res.status === 404) {
    window.location('/notfound')
  } else {
    const data = await res.json()
    return data
  }
}
