import React from 'react'

function Footer() {
  const footerYear = new Date().getFullYear()
  return (
    <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
      <div>
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="inline-block fill-current"
        >
          <circle cx="6" cy="6" r="6" />
          <circle cx="18" cy="6" r="6" />
          <circle cx="18" cy="18" r="6" />
          <circle cx="6" cy="18" r="6" />
        </svg>
        <p>Copyright &copy; {footerYear} - All right reserved</p>
      </div>
    </footer>
  )
}

export default Footer
