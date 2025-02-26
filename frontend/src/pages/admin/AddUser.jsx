import React from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const token = localStorage.getItem('token');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = {};
    const framel = event.target;
    for (let el of framel.elements) {
      fData[el.name] = el.value;
    }
    const response = await fetch('http://localhost:3000/api/users', {
      method: "POST",
      mode: "cors",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fData),
    });
    if (!response.ok) {
      console.log(console => console.error);
    } else {
      event.target.reset();
      Swal.fire({
        icon: "success",
        text: "Simpan Berhasil",
        timer: 1000
      }).then(res => {
        window.location.href = '/admin/users';
      })
    }
  }

  return (
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      <div className="container-fluid">
        {/* Content Header (Page header) */}
        {/* Main content */}
        <section className="content" style={{ width: "100%", padding: "0" }}>
          <div className="row">
            {/* left column */}
            <div className="col-md-12">
              {/* Card */}
              <div style={{
                backgroundColor: "#fff", 
                borderRadius: "10px", 
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "20px"
              }}>
                <div style={{
                  background: "linear-gradient(to right,#89CFF0, #A8E6CF)",
                  padding: "15px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px"
                }}>
                  <h4 style={{ margin: "0", fontWeight: "600", color: "#fff" }}>Add User</h4>
                </div>
                <form onSubmit={handleSubmit}  style={{ padding: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="nama" style={{ fontWeight: "500", color: "#333" }}>
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="nama"
                      id="nama"
                      className="form-control"
                      placeholder="Nama Lengkap"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d1d9e6",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" style={{ fontWeight: "500", color: "#333" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter email"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d1d9e6",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" style={{ fontWeight: "500", color: "#333" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter Password"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d1d9e6",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    />
                  </div>

                  <div >
                    <button
                      type="submit"
                      style={{
                        background: "linear-gradient(to right,#89CFF0, #A8E6CF)", 
                        border: 'none',
                        color: "#fff",
                        padding: "8px 12px",
                        fontSize: "16px",
                        fontWeight: "600",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      Kirim
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AddUser
