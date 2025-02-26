import React, { useState } from 'react';

const EditMember = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Email is required');
            return;
        }
        fetch('http://localhost:3000/api/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }), 
        })
        .then((response) => response.json()) 
        .then((data) => {
            console.log(data);
            if (data.id) {
                window.location.href = `/edit/${data.id}`;
            } else {
                setError('Member not found');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setError('Failed to fetch member data');
        });
    };

    return (
        <div className="row vh-100 g-0 log-in">
            {/* Left side */}
            <div className="col-lg-6 position-relative d-none d-lg-block">
                <img className="bg-holder vh-100" src='https://i.pinimg.com/474x/d0/fb/a7/d0fba7c34c2601e09393e99ba7def78c.jpg' alt="background" />
            </div>
            {/* /Left side */}
            
            {/* Right side */}
            <div className="col-lg-6">
                <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
                    <div className="col col-sm-6 col-lg-7 col-xl-6">
                        <div className="text-center mb-3">
                            <h3 className="fw-bold">Masukan Email Anda</h3>
                            <p className="text-secondary">Get access to your account</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bx bx-lock-alt" />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-lg fs-6"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                                Cek Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Right side */}
        </div>
    );
};

export default EditMember;
