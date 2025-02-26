import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Swal from 'sweetalert2'

const EditPaketWisata = () => {
  const { id } = useParams()
  const [namapaket, setPaket] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [lokasi_wisata, setLokasi] = useState('')
  const [harga, setHarga] = useState('')
  const [foto, setFoto] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    getPaket()
  }, [])

  const handleChange = (event) => {
    const name = event.target.name
    if (name === 'namapaket') setPaket(event.target.value)
    if (name === 'deskripsi') setDeskripsi(event.target.value)
    if (name === 'lokasi_wisata') setLokasi(event.target.value)
    if (name === 'harga') setHarga(event.target.value)
    if (name === 'foto') setFoto(event.target.files[0])
  }

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

  const handleUpdate = async (event) => {
    event.preventDefault()

    const fData = new FormData()


    const frmel = event.target
    for (let elm of frmel.elements) {
      if (elm.name && elm.value.trim()) {
        fData.append(elm.name, elm.value)
      }
    }
    fData.append('foto', foto)
    // const foto = frmel.querySelector('input[name="foto"]').files[0]
    // if (foto) {
    //   fData.append('foto', foto)
    // }

    const response = await fetch(`http://localhost:3000/api/paket/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fData,
    })

    if (!response.ok) {
      console.log("Error updating the package")
    } else {
      Swal.fire({
        icon: "success",
        text: "Update Berhasil",
        timer: 1000,
      }).then((res) => {
        window.location.href = '/admin/paketwisata'
      })
    }
  }

  return (
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      <div className="container-fluid">
        <section className="content" style={{ width: "100%", padding: "0" }}>
          <div className="row">
            <div className="col-md-12">
              <div style={{
                backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", padding: "20px"
              }}>
                <div style={{
                  background: "linear-gradient(to right,#89CFF0, #A8E6CF)", color: '#fff', padding: "15px",
                  borderTopLeftRadius: "10px", borderTopRightRadius: "10px"
                }}>
                  <h4 style={{ margin: "0", fontWeight: "600", color: "#fff" }}>Edit Paket Wisata</h4>
                </div>
                <form onSubmit={handleUpdate} style={{ padding: "20px" }}>
                  {/* Nama Paket */}
                  <div className="form-group">
                    <label htmlFor="namapaket" style={{ fontWeight: "500", color: "#333" }}>Nama Paket</label>
                    <input
                      type="text"
                      name="namapaket"
                      id="namapaket"
                      className="form-control"
                      value={namapaket}
                      onChange={handleChange}
                      placeholder="Nama Paket Wisata"
                    />
                  </div>

                  {/* Deskripsi */}
                  <div className="form-group">
                    <label htmlFor="deskripsi" style={{ fontWeight: "500", color: "#333" }}>Deskripsi</label>
                    <textarea
                      name="deskripsi"
                      id="deskripsi"
                      className="form-control"
                      value={deskripsi}
                      onChange={handleChange}
                      placeholder="Deskripsi Paket Wisata"
                      rows="4"
                    ></textarea>
                  </div>

                  {/* Lokasi Wisata */}
                  <div className="form-group">
                    <label htmlFor="lokasi_wisata" style={{ fontWeight: "500", color: "#333" }}>Lokasi Wisata</label>
                    <input
                      type="text"
                      name="lokasi_wisata"
                      id="lokasi_wisata"
                      className="form-control"
                      value={lokasi_wisata}
                      onChange={handleChange}
                      placeholder="Lokasi Wisata"
                    />
                  </div>

                  {/* Harga */}
                  <div className="form-group">
                    <label htmlFor="harga" style={{ fontWeight: "500", color: "#333" }}>Harga</label>
                    <input
                      type="number"
                      name="harga"
                      id="harga"
                      className="form-control"
                      value={harga}
                      onChange={handleChange}
                      placeholder="Harga Paket"
                    />
                  </div>

                  {/* Foto */}
                  <div className="form-group">
                    <label htmlFor="foto" style={{ fontWeight: "500", color: "#333" }}>Foto Paket Wisata</label>
                    <input
                      type="file"
                      name="foto"
                      id="foto"
                      className="form-control"
                      onChange={(e) => setFoto(e.target.files[0])}
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      style={{
                        background: "linear-gradient(to right,#89CFF0, #A8E6CF)",
                        border: "none", color: "#fff", padding: "8px 12px", fontSize: "16px",
                        fontWeight: "600", borderRadius: "8px", cursor: "pointer", transition: "background-color 0.3s ease"
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

export default EditPaketWisata
