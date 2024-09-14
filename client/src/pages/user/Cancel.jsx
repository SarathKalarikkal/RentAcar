import React from 'react'

const Cancel = () => {


  return (
    <div  fluid className="container cancel-page">
    <div className="row justify-content-center align-items-center h-100">
      <div  className="col-md-12 text-center">
        <div className="crossmarker-wrapper">
          <div className="crossmark">
            <div className="checkmark-stem"></div>
            <div className="checkmark-kick"></div>
          </div>
        </div>
        <h1 className="mt-4">Payment Failed!</h1>
        <p className="lead">Your payment is Canceled.</p>
        <Link to={'/user'} className="btn btn-primary mt-3">Return to Homepage</Link>
      </div>
    </div>
  </div>
  )
}

export default Cancel