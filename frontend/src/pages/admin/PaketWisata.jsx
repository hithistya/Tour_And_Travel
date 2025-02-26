import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const PaketWisata = () => {
  const [dataPaket, setPaket] = useState([]);
  const token = localStorage.getItem("token");

  const tampilData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/paket", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPaket(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    tampilData()
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
        fetch(`http://localhost:3000/api/paket/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((res) => {
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error deleting package: ", error);
          });
      }
    });
  };
  const handleImageClick = (foto) => {
    Swal.fire({
      imageUrl: `http://localhost:3000/paketwisata/${foto}`,
      imageAlt: "Paket Wisata",
      showCloseButton: true,
      showConfirmButton: false,
      width: '80%',
    });
  };

  const getPaket = async () => {
    const response = await fetch(`http://localhost:3000/api/paket/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    setPaket(data.namapaket)
    setDeskripsi(data.deskripsi)
    setLokasi(data.lokasi_wisata)
    setHarga(data.harga)
    setFoto(data.foto)
  }
  return (
    <section style={{ width: "100%", padding: "0" }}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">

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

                    <div className="mb-3">
                      <Link to="/admin/addpaketwisata" className="btn " style={{ background: 'linear-gradient(to right,#89CFF0, #A8E6CF)', color: '#fff'}}>
                        Tambah Data
                      </Link>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Paket</th>
                            <th>Deskripsi</th>
                            <th>Lokasi Wisata</th>
                            <th>Harga</th>
                            <th>Foto</th>
                            <th>Edit</th>
                            <th>Hapus</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataPaket.length > 0 ? (
                            dataPaket.map((paket, index) => (
                              <tr key={index}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">{paket.namapaket}</td>
                                <td className="align-middle">{paket.deskripsi}</td>
                                <td className="align-middle">{paket.lokasi_wisata}</td>
                                <td className="align-middle">{new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                  }).format(paket.harga)}</td>
                                <td className="align-middle">
                                  {
                                    paket.foto ? (
                                      <img
                                        src={`http://localhost:3000/paketwisata/${paket.foto}`}
                                        alt="Paket Wisata"
                                        width="50"
                                        height="50"
                                        style={{ borderRadius: '5px', objectFit: 'cover' }}
                                        onClick={() => handleImageClick(paket.foto)}
                                      />
                                    ) : (
                                      "tidak ada"
                                    )
                                  }
                                </td>

                                <td className="align-middle">
                                  <Link to={`/admin/paketwisata/${paket.id}`} className="btn btn-sm btn-warning">
                                    <i className="fas fa-edit" />
                                  </Link>
                                </td>
                                <td className="align-middle">
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(paket.id)}
                                  >
                                    <i className="fas fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center">
                                Data Kosong
                              </td>
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

export default PaketWisata;
