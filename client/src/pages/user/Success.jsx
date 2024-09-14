import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Success = () => {



  return (
    <div  fluid className="container payment-success-page">
    <div className="row justify-content-center align-items-center h-100">
      <div  className="col-md-12 text-center">
        <div className="checkmark-wrapper">
          <div className="checkmark">
            <div className="checkmark-stem"></div>
            <div className="checkmark-kick"></div>
          </div>
        </div>
        <h1 className="mt-4">Payment Successful!</h1>
        <p className="lead">Thank you for your purchase. Your payment has been processed successfully.</p>
        <Link to={'/'} className="btn btn-primary mt-3">Return to Homepage</Link>
      </div>
    </div>
  </div>
  )
}

export default Success