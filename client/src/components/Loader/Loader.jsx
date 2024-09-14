import React from 'react'
import "./style.css"

const Loader = () => {
  return (
    <figure className="loader">
  <div className="car">
    <span className="carbody"></span>
    <span className="wheels"></span>
  </div>
  <div className="strikes">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</figure>
  )
}

export default Loader