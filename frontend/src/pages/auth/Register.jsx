import React from 'react'
import Logo from "../../assets/logo.jpg"
import Swal from "sweetalert2"

const Register = () => {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const fData = {}
        const framel = event.target 

        for (let el of framel.elements) {
            fData[el.name] = el.value
        }
    const response = await fetch('http://localhost:3000/api/member', {
        method: "POST",
        mode: "cors",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(fData)
    })
    if (!response.ok) {
        console.log(console => console.error)
    } else {
        event.target.reset()
        Swal.fire({
            icon: "success",
            text: "Simpan Berhasil",
            timer: 1000
        }) .then(res => {
            window.location.href = '/login'
        })
    }
    }
    return (
        <div className="row vh-100 g-0 log-in">
            {/* left side */}
            <div className="col-lg-6 position-relative d-none d-lg-block">
                <img className="bg-holder vh-100" src='https://i.pinimg.com/474x/d0/fb/a7/d0fba7c34c2601e09393e99ba7def78c.jpg' />
            </div>
            {/*/ left side */}
            {/* right side */}
            <div className="col-lg-6">
                <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
                    <div className="col col-sm-6 col-lg-7 col-xl-6">
                        {/* logo */}
                        <a href="#" className="d-flex justify-content-center mb-4">
                            <img src={Logo} alt width={80} />
                        </a>
                        {/*/ logo */}
                        <div className="text-center mb-3">
                            <h3 className="fw-bold">Sign Up</h3>
                            <p className="text-secondary">Isi form ini untuk sign up</p>
                        </div>
                        {/* form */}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bx bx-user" />
                                </span>
                                <input type="text" name='nama' id='nama' className="form-control form-control-lg fs-6" placeholder="nama" required />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bx bx-phone" />
                                </span>
                                <input type="text" name='no_hp' id='no_hp' className="form-control form-control-lg fs-6" placeholder="no_hp" required />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bx bx-envelope" />
                                </span>
                                <input type="email" name='email' id='email' className="form-control form-control-lg fs-6" placeholder="email" required />
                            </div>
                            <div className="input-group mb-4">
                                <span className="input-group-text">
                                    <i className="bx bx-lock-alt" />
                                </span>
                                <input type="password" name='password' id='password' className="form-control form-control-lg fs-6" placeholder="password" required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 mb-0">sign up</button>
                        </form>
                        <div className="text-center ">
                            <small>have an account?</small> <a href='/login' className="forgot fw-bold"><small>Login</small></a>
                        </div>
                        {/*/ form */}
                        {/* Divider */}
                        <div className="position-relative">
                            <hr className="text-secondary divider" />
                            <div className="divider-content-center">Or</div>
                        </div>
                        {/*/ Divider */}
                        {/* Social-login */}
                        <button className="btn btn-outline-secondary w-100 mb-3 btn-login" style={{ fontSize: '0.8 rem', fontWeight: 600 }}>
                            <i className="bx bxl-google text-danger me-1 fs-6" style={{ verticalAlign: 'text-top' }} />Login With Google
                        </button>
                        <button className="btn btn-outline-secondary w-100 btn-login mb-2" style={{ fontSize: '0.8 rem', fontWeight: 600 }}>
                            <i className="bx bxl-facebook text-primary me-1 fs-6" style={{ verticalAlign: 'text-top' }} />Login With Facebook
                        </button>
                        {/*/ Social-login */}
                    </div>
                </div>
            </div>
            {/*/ right side */}
        </div>

    )
}

export default Register
