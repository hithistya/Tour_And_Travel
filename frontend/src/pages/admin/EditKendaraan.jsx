import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditKendaraan = () => {
  const { id } = useParams()

  
  const [merk, setMerk] = useState('')
  const [jenis_kendaraan, setJenis] = useState('')
  const [plat_no, setPlat] = useState('')
  const [kapasitas, setKapasitas] = useState('')
  const [harga, setHarga] = useState('')
  const [status_kendaraan, setStatus] = useState('')
  const [foto, setFoto] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    
    getKendaraan()
  }, [])

  const getKendaraan = async () => {
    const response = await fetch(`http://localhost:3000/api/kendaraan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()

    // Populate form fields with existing data
    setMerk(data.merk)
    setJenis(data.jenis_kendaraan)
    setPlat(data.plat_no)
    setKapasitas(data.kapasitas)
    setHarga(data.harga)
    setStatus(data.status_kendaraan)
    setFoto(data.foto) // You can handle this if needed, e.g., setting an image preview
  }

  const handleChange = (event) => {
    const { name, value, files } = event.target
    if (name === 'merk') setMerk(value)
    if (name === 'jenis_kendaraan') setJenis(value)
    if (name === 'plat_no') setPlat(value)
    if (name === 'kapasitas') setKapasitas(value)
    if (name === 'harga') setHarga(value)
    if (name === 'status_kendaraan') setStatus(value)
    if (name === 'foto') setFoto(files[0]) // Update the foto file
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    const fData = new FormData()
    fData.append('merk', merk)
    fData.append('jenis_kendaraan', jenis_kendaraan)
    fData.append('plat_no', plat_no)
    fData.append('kapasitas', kapasitas)
    fData.append('harga', harga)
    fData.append('status_kendaraan', status_kendaraan)

    // Append the selected file if available
    if (foto) {
      fData.append('foto', foto)
    }

    // Send the data to the server to update the vehicle
    const response = await fetch(`http://localhost:3000/api/kendaraan/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fData,
    })

    if (!response.ok) {
      console.log("Error updating the vehicle")
    } else {
      Swal.fire({
        icon: "success",
        text: "Update Berhasil",
        timer: 1000,
      }).then(() => {
        window.location.href = '/admin/kendaraan' 
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
                  <h4 style={{ margin: "0", fontWeight: "600", color: "#fff" }}>Edit Kendaraan</h4>
                </div>

                <form onSubmit={handleUpdate} style={{ padding: "20px" }}>
                  {/* Merk Field */}
                  <div className="form-group">
                    <label htmlFor="merk" style={{ fontWeight: "500", color: "#333" }}>Merk</label>
                    <input
                      type="text"
                      name="merk"
                      id="merk"
                      className="form-control"
                      value={merk}
                      onChange={handleChange}
                      placeholder="Merk Kendaraan"
                      style={{ backgroundColor: "#fff", border: "1px solid #d1d9e6", borderRadius: "8px", padding: "12px", marginBottom: "12px", fontSize: "16px" }}
                    />
                  </div>

                  {/* Jenis Kendaraan Field */}
                  <div className="form-group">
                    <label htmlFor="jenis_kendaraan" style={{ fontWeight: "500", color: "#333" }}>Jenis Kendaraan</label>
                    <select
                      name="jenis_kendaraan"
                      id="jenis_kendaraan"
                      className="form-control"
                      value={jenis_kendaraan}
                      onChange={handleChange}
                      style={{ backgroundColor: "#fff", border: "1px solid #d1d9e6", borderRadius: "8px", padding: "10px", marginBottom: "12px", fontSize: "16px" }}
                    >
                      <option value="mobil">Mobil</option>
                      <option value="bis">Bis</option>
                      <option value="travel">Travel</option>
                    </select>
                  </div>

                  {/* Other fields follow a similar pattern */}
                  <div className="form-group">
                    <label htmlFor="plat_no" style={{ fontWeight: "500", color: "#333" }}>Plat No</label>
                    <input
                      type="text"
                      name="plat_no"
                      id="plat_no"
                      className="form-control"
                      value={plat_no}
                      onChange={handleChange}
                      placeholder="Plat Nomor"
                      style={{ backgroundColor: "#fff", border: "1px solid #d1d9e6", borderRadius: "8px", padding: "12px", marginBottom: "12px", fontSize: "16px" }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="plat_no" style={{ fontWeight: "500", color: "#333" }}>Kapasitas</label>
                    <input
                      type="number"
                      name="kapasitas"
                      id="kapasitas"
                      className="form-control"
                      value={kapasitas}
                      onChange={handleChange}
                      placeholder="Plat Nomor"
                      style={{ backgroundColor: "#fff", border: "1px solid #d1d9e6", borderRadius: "8px", padding: "12px", marginBottom: "12px", fontSize: "16px" }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="harga" style={{ fontWeight: "500", color: "#333" }}>Harga</label>
                    <input
                      type="number"
                      name="harga"
                      id="harga"
                      value={harga}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Harga Kendaraan"
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
                    <label htmlFor="status_kendaraan" style={{ fontWeight: "500", color: "#333" }}>Status Kendaraan</label>
                    <select
                      name="status_kendaraan"
                      id="status_kendaraan"
                      className="form-control"
                      value={status_kendaraan}
                      onChange={handleChange}
                      style={{ backgroundColor: "#fff", border: "1px solid #d1d9e6", borderRadius: "8px", padding: "10px", marginBottom: "12px", fontSize: "16px" }}
                    >
                      <option value="tersedia">Tersedia</option>
                      <option value="tidak tersedia">Tidak Tersedia</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="foto" style={{ fontWeight: "500", color: "#333" }}>Foto Kendaraan</label>
                    <input
                      type="file"
                      name="foto"
                      id="foto"
                      className="form-control"
                      onChange={handleChange}
                      style={{ backgroundColor: "#fff", border: "1px solid #d1d9e6", borderRadius: "8px", padding: "4px", marginBottom: "10px" }}
                    />
                  </div>

                  <div>
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

export default EditKendaraan
