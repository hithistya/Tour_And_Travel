import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditMember = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    
    fetch(`http://localhost:3000/api/members/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })
      .then((response) => response.json()) 
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Your password has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
         navigate('/login');
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update password. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="row vh-100 g-0 log-in">
      {/* Left side */}
      <div className="col-lg-6 position-relative d-none d-lg-block">
        <img
          className="bg-holder vh-100"
          src="https://i.pinimg.com/474x/d0/fb/a7/d0fba7c34c2601e09393e99ba7def78c.jpg"
          alt="background"
        />
      </div>
      {/* /Left side */}

      {/* Right side */}
      <div className="col-lg-6">
        <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
          <div className="col col-sm-6 col-lg-7 col-xl-6">
            <div className="text-center mb-3">
              <h3 className="fw-bold">Update Password</h3>
              <p className="text-secondary">Get access to your account</p>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-lock-alt" />
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg fs-6"
                  placeholder="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                Ubah Password
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
