import React from 'react'

const SignUpOptions = () => {
  return (
    <>
      <div className="card" style={{ width: "18rem;" }}>
        <h5 className="card-title">Login as a Customer</h5>
        <div className="card-body">
          <img src="./images/PersonIcon.png" className="card-img-top" style={{ height: "75px", width: "75px",display:'block' }} alt="..." />
          <button href="#" className="btn btn-primary">SignUp</button>
        </div>
      </div>

      <div className="card" style={{ width: "18rem;" }}>
        <h5 className="card-title">Login as a Homemaker</h5>
        <div className="card-body">
          <img src="./images/PersonIcon.png" className="card-img-top" style={{ height: "75px", width: "75px",display:'block' }} alt="..." />
          <button href="#" className="btn btn-primary">SignUp</button>
        </div>
      </div>

      <div className="card" style={{ width: "18rem;" }}>
        <h5 className="card-title">Login as a Delivery boy</h5>
        <div className="card-body">
          <img src="./images/PersonIcon.png" className="card-img-top" style={{ height: "75px", width: "75px",display:'block' }} alt="..." />
          <button href="#" className="btn btn-primary">SignUp</button>
        </div>
      </div>
    </>
  )
}

export default SignUpOptions