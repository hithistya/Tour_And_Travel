import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditRentals = () => {
  const { id } = useParams()
  const [kendaraan_id, setKendaraanId] = useState('')
  const [members_id, setMembersId] = useState('')
  const [tgl_sewa, setTglSewa] = useState('')
  const [tgl_kembali, setTglKembali] = useState('')
  const [harga, setHarga] = useState('')
  const [status_pembayaran, setStatusPembayaran] = useState('')
  const [status_sewa, setStatusSewa] = useState('')
  const [file, setFile] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    getRental()
  }, [])

  const getRental = async () => {
    const response = await fetch(`http://localhost:3000/api/rentals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()

    // Populate form fields with existing rental data
    setKendaraanId(data.kendaraan_id)
    setMembersId(data.members_id)
    setTglSewa(data.tgl_sewa)
    setTglKembali(data.tgl_kembali)
    setHarga(data.harga)
    setStatusPembayaran(data.status_pembayaran)
    setStatusSewa(data.status_sewa)
    setFile(data.file) 
  }

  const handleChange = (event) => {
    const { name, value, files } = event.target
    if (name === 'kendaraan_id') setKendaraanId(value)
    if (name === 'members_id') setMembersId(value)
    if (name === 'tgl_sewa') setTglSewa(value)
    if (name === 'tgl_kembali') setTglKembali(value)
    if (name === 'harga') setHarga(value)
    if (name === 'status_pembayaran') setStatusPembayaran(value)
    if (name === 'status_sewa') setStatusSewa(value)
    if (name === 'file') setFile(files[0])    
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    const fData = new FormData()
    fData.append('kendaraan_id', kendaraan_id)
    fData.append('members_id', members_id)
    fData.append('tgl_sewa', tgl_sewa)
    fData.append('tgl_kembali', tgl_kembali)
    fData.append('harga', harga)
    fData.append('status_pembayaran', status_pembayaran)
    fData.append('status_sewa', status_sewa)

    // Append the selected file if available
    if (file) {
      fData.append('file', file)
    }

    // Send the data to the server to update the rental
    const response = await fetch(`http://localhost:3000/api/rentals/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fData,
    })

    if (!response.ok) {
      console.log("Error updating the rental")
    } else {
      Swal.fire({
        icon: "success",
        text: "Update Berhasil",
        timer: 1000,
      }).then(() => {
        window.location.href = '/admin/rentals' // Redirect after successful update
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
                  <h4 style={{ margin: "0", fontWeight: "600", color: "#fff" }}>Edit Rental</h4>
                </div>

                <form onSubmit={handleUpdate} style={{ padding: "20px" }}>
                  {/* Status Pembayaran */}
                  <div className="form-group">
                    <label htmlFor="status_pembayaran" style={{ fontWeight: "500", color: "#333" }}>Status Pembayaran</label>
                    <select
                      name="status_pembayaran"
                      id="status_pembayaran"
                      className="form-control"
                      value={status_pembayaran}
                      onChange={handleChange}
                      style={{ backgroundColor: "#fff", border: "1px solid #d1d9e6", borderRadius: "8px", padding: "10px", marginBottom: "12px", fontSize: "16px" }}
                    >
                      <option value="Belum Dibayar">Belum Dibayar</option>
                      <option value="Sudah Dibayar">Sudah Dibayar</option>
                    </select>
                  </div>

                  {/* Status Sewa */}
                  <div className="form-group">
                    <label htmlFor="status_sewa" style={{ fontWeight: "500", color: "#333" }}>Status Sewa</label>
                    <select
                      name="status_sewa"
                      id="status_sewa"
                      className="form-control"
                      value={status_sewa}
                      onChange={handleChange}
                      style={{ backgroundColor: "#fff", border: "1px solid #d1d9e6", borderRadius: "8px", padding: "10px", marginBottom: "12px", fontSize: "16px" }}
                    >
                      <optgroup label='Status Pembayaran'>
                      <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                      <option value="Pending">Pending</option>
                      <option value="Disewa">Disewa</option>
                      <option value="Selesai">Selesai</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* File Upload */}
                  {/* <div className="form-group">
                    <label htmlFor="file" style={{ fontWeight: "500", color: "#333" }}>File</label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="form-control"
                      onChange={handleChange}
                      style={{ backgroundColor: "#fff", border: "1px solid #d1d9e6", borderRadius: "8px", padding: "4px", marginBottom: "10px" }}
                    />
                  </div> */}

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

export default EditRentals
