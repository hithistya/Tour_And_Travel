import React, { useState, useEffect } from 'react';  
import { NavLink, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Users = () => {
  const [dataUser, setUsers] = useState([]);  
  const token = localStorage.getItem("token");

  const tampilData = async () => {
    const response = await fetch("http://localhost:3000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    tampilData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Yakin Menghapus Data?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/api/users/" + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((res) => {
            window.location.reload();
          });
      }
    });
  };

  return (
    <section className="" style={{ width: "100%", padding: "0" }}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2"></div>
        </div>
      </div>
      <div>
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                  <div class="mb-3">
                  <Link to='/admin/adduser' class="btn " style={{ background: 'linear-gradient(to right,#89CFF0, #A8E6CF)', color: '#fff'}}>Tambah Data</Link>
                </div>
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Hapus</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataUser.length > 0 ? (
                            dataUser.map((item, index) => (
                              <tr key={index}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">{item.nama}</td>
                                <td className="align-middle">{item.email}</td>
                                <td>
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="btn btn-sm btn-danger"
                                  >
                                    <i className="fas fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4">Data Kosong</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
