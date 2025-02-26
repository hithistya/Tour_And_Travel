import React from 'react';
import "../../style/login.css";
import Logo from "../../assets/logo.jpg"
import Swal from "sweetalert2"
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const LoginClient = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        for (let elm of event.target.elements) {
            if (elm.type === "email" || elm.type === "password") {
                fData[elm.name] = elm.value;
            }
        }

        try {
            // Make the API request
            const response = await fetch("http://localhost:3000/api/member/login", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fData)
            });


            const data = await response.json();

            console.log(data.member);

            if (data.token != null) {
                localStorage.setItem("token", data.token);
                localStorage.setItem('id', data.member.id)
                event.target.reset();
                window.location.href = ("/home");
            } else {
                event.target.reset();
                Swal.fire({
                    icon: "warning",
                    text: "Member Tidak Ditemukan",
                    timer: 1000,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                text: "An error occurred. Please try again.",
                timer: 1000,
            });
        }
    };

    return (
        <div className="row vh-100 g-0 log-in">
            {/* left side */}
            <div className="col-lg-6 position-relative d-none d-lg-block">
                <img className="bg-holder vh-100" src='https://i.pinimg.com/474x/d0/fb/a7/d0fba7c34c2601e09393e99ba7def78c.jpg' alt="background" />
            </div>
            {/*/ left side */}
            {/* right side */}
            <div className="col-lg-6">
                <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
                    <div className="col col-sm-6 col-lg-7 col-xl-6">
                        {/* logo */}
                        {/* <a href="#" className="d-flex justify-content-center mb-4">
                            <img src='' alt="Logo" width={80} />
                        </a> */}
                        {/*/ logo */}
                        <div className="text-center mb-3">
                            <h3 className="fw-bold">Log In</h3>
                            <p className="text-secondary">Get access to your account </p>
                        </div>
                        {/* form */}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bx bx-user" />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-lg fs-6"
                                    placeholder="email"
                                    required
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bx bx-lock-alt" />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control form-control-lg fs-6"
                                    placeholder="password"
                                    required
                                />
                            </div>
                            <div className="input-group mb-3 d-flex justify-content-between">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="formCheck"

                                    />
                                    <label htmlFor="formCheck" className="form-check-label text-secondary">
                                        <small>Remember Me</small>
                                    </label>
                                </div>
                                <div>
                                    <small><Link to="/getM" className="forgot">Forgot Password?</Link></small>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                                Login
                            </button>
                        </form>
                        <div className="text-center">
                            <small>Don't have an account?</small> <NavLink to='/sign' className="forgot fw-bold"><small>Sign Up</small></NavLink>
                        </div>
                        {/*/ form */}
                        {/* Divider */}
                        <div className="position-relative">
                            <hr className="text-secondary divider" />
                            <div className="divider-content-center">Or</div>
                        </div>
                        {/*/ Divider */}
                        {/* Social-login */}
                        <button
                            className="btn btn-outline-secondary w-100 mb-3 btn-login"
                            style={{ fontSize: '0.8 rem', fontWeight: 600 }}
                        >
                            <i className="bx bxl-google text-danger me-1 fs-6" style={{ verticalAlign: 'text-top' }} />
                            Login With Google
                        </button>
                        <button
                            className="btn btn-outline-secondary w-100 btn-login"
                            style={{ fontSize: '0.8 rem', fontWeight: 600 }}
                        >
                            <i className="bx bxl-facebook text-primary me-1 fs-6" style={{ verticalAlign: 'text-top' }} />
                            Login With Facebook
                        </button>
                        {/*/ Social-login */}
                    </div>
                </div>
            </div>
            {/*/ right side */}
        </div>
    );
};

export default LoginClient;
