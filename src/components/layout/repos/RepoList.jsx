import React from 'react'
import RepoItem from './RepoItem'

function RepoList({ repos }) {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h1 className="text-3xl my-4 font-bold text-center card-title ml-2">
          Latest Repos
        </h1>
      </div>
      <div className="w-full card-body">
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

export default RepoList
