import React from 'react'
import { Link } from 'react-router-dom';
const Loggednav = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <Link to="/home">
      <a className="btn btn-ghost text-xl">
        <img src="/assets/ScalePal Logo - White Version.svg" className="w-28"></img>
      </a>
      </Link>
      
  </div>
  )
}

export default Loggednav