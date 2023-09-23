import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Navbar({ title }) {
  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-non px-2 mx-2">
          <FaGithub className="inline pr-2 text-3xl" />
          <Link to="/" className="text-lg font-bold align-middle">
            {title}
          </Link>
          <div>
            <div className="text-xs">
              Created by
              <a
                href="https://github.com/mohamedabdallah20"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold align-middle"
              >
                Mohamed Abdallah
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
              {' '}
              Home{' '}
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
              {' '}
              About{' '}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
Navbar.defaultProps = {
  title: 'Github Finder',
}
export default Navbar
