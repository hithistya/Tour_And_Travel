import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Link, NavLink } from 'react-router-dom'

const Kendaraan = () => {
  const [dataKendaraan, setKendaraan] = useState([])
  const token = localStorage.getItem("token")

  const tampilData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/kendaraan", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      setKendaraan(data)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    tampilData()
  }, [])

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Yakin ingin menghapus data ini?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/kendaraan/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then(() => tampilData()) 
      }
    })
  }

  const handleImageClick = (foto) => {
    Swal.fire({
      imageUrl: `http://localhost:3000/kendaraan/${foto}`,
      imageAlt: "Paket Wisata",
      showCloseButton: true,
      showConfirmButton: false,
      width: '80%',
    });
  };

  return (
    <section style={{ width: "100%", padding: "0" }}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            {/* <!-- Breadcrumb or other headers can go here --> */}
          </div>
        </div>
      </div>

      <div>
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {/* Button untuk menambah data kendaraan */}
                    <div className="mb-3">
                      <Link to="/admin/addkendaraan" className="btn " style={{ background: 'linear-gradient(to right,#89CFF0, #A8E6CF)', color: '#fff' }}>
                        Tambah Data
                      </Link>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>Merk</th>
                            <th>Jenis Kendaraan</th>
                            <th>Plat No</th>
                            <th>Kapasitas</th>
                            <th>Harga</th>
                            <th>Status Kendaraan</th>
                            <th>Foto</th>
                            <th>Edit</th>
                            <th>Hapus</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataKendaraan.length > 0 ? (
                            dataKendaraan.map((kendaraan, index) => (
                              <tr key={kendaraan.id}>
                                <td className="align-middle">{kendaraan.merk}</td>
                                <td className="align-middle">{kendaraan.jenis_kendaraan}</td>
                                <td className="align-middle">{kendaraan.plat_no}</td>
                                <td className="align-middle">{kendaraan.kapasitas}</td>
                                <td className="align-middle">{new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                  }).format(kendaraan.harga)}</td>
                                <td className="align-middle">{kendaraan.status_kendaraan}</td>
                                <td className="align-middle">
                                  <img
                                    src={`http://localhost:3000/kendaraan/${kendaraan.foto}`} 
                                    alt={kendaraan.merk}
                                    width="50"
                                    height="50"
                                    onClick={() => handleImageClick(kendaraan.foto)}
                                  />
                                </td>
                                <td className="align-middle">
                                <Link
                                    to={`/admin/kendaraan/${kendaraan.id}`}
                                    className="btn btn-sm btn-warning"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </Link>
                                </td>
                                <td className="align-middle">
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(kendaraan.id)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9">Data Kosong</td>
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
  )
}

export default Kendaraan
