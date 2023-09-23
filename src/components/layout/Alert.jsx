import React, { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'

function Alert() {
  const { alert } = useContext(AlertContext)
  return alert ? (
    <p className="flex item-start mb-4 space-x-2">
      {alert.type === 'error' && (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="#FECDD3"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="#B91c1c"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      )}

      <strong className="flex-1 text-base font-semibold leading-7 text-white">
        {alert.msg}
      </strong>
    </p>
  ) : null
}

export default Alert
