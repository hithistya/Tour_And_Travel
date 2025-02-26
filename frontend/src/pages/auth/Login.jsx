import React from 'react'
import {NavLink, useParams, Link} from "react-router-dom"
import Swal from "sweetalert2"
import "../../style/loginA.css"

const Login = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        for (let elm of event.target.elements) {
          if (elm.type === "email" || elm.type === "password") {
            fData[elm.name] = elm.value;
          }
        }
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.token != null) {
              localStorage.setItem("token", data.token);
              event.target.reset();
              window.location.href = "/admin/dashboard";
            } else {
              event.target.reset();
              Swal.fire({
                icon: "warning",
                text: "User Tidak ditemukan",
                timer: 1000,
              });
            }
          })
          .catch((error) => console.error("Error:", error));
      };
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="login-box ">
                {/* /.login-logo */}
                <div className="">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={handleSubmit} method="post">
                            <div className="input-group mb-3">
                                <input type="email" name="email" className="form-control" placeholder="Email" required/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" name='password' className="form-control" placeholder="Password" required/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* /.col */}
                                
                                    <button type="submit" id='submit' className="btn btn-primary btn-block">Sign In</button>
                                
                                {/* /.col */}
                            </div>
                        </form>
                        
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>
    )
}

export default Login
