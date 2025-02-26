import React from 'react'
import Swal from 'sweetalert2';

const AddKendaraan = () => {
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target); 

    try {
      const response = await fetch('http://localhost:3000/api/kendaraan', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.message || 'Terjadi kesalahan');
        Swal.fire({
          icon: 'error',
          text: errorData.message || 'Terjadi kesalahan saat menyimpan data.',
        });
      } else {
        event.target.reset(); 
        Swal.fire({
          icon: 'success',
          text: 'Kendaraan berhasil ditambahkan!',
          timer: 2000,
        }).then(() => {
          window.location.href = '/admin/kendaraan'; 
        });
      }
    } catch (error) {
      console.error('Error during the fetch request:', error);
      Swal.fire({
        icon: 'error',
        text: 'Terjadi kesalahan saat menghubungi server.',
      });
    }
  };


  return (
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      <div className="container-fluid">
        {/* Main content */}
        <section className="content" style={{ width: "100%", padding: "0" }}>
          <div className="row">
            {/* Left Column */}
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
                  <h4 style={{ margin: "0", fontWeight: "600", color: "#fff" }}>Add Kendaraan</h4>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                  {/* Merk Field */}
                  <div className="form-group">
                    <label htmlFor="merk" style={{ fontWeight: "500", color: "#333" }}>Merk</label>
                    <input
                      type="text"
                      name="merk"
                      id="merk"
                      className="form-control"
                      placeholder="Merk Kendaraan"
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

                  {/* Jenis Kendaraan Field */}
                  <div className="form-group">
                    <label htmlFor="jenis_kendaraan" style={{ fontWeight: "500", color: "#333" }}>Jenis Kendaraan</label>
                    <select
                      name="jenis_kendaraan"
                      id="jenis_kendaraan"
                      className="form-control"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d1d9e6",
                        borderRadius: "8px",
                        padding: "10px",
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    >
                      <option value="mobil">Mobil</option>
                      <option value="bis">Bis</option>
                      <option value="travel">Travel</option>
                    </select>
                  </div>

                  {/* Plat No Field */}
                  <div className="form-group">
                    <label htmlFor="plat_no" style={{ fontWeight: "500", color: "#333" }}>Plat No</label>
                    <input
                      type="text"
                      name="plat_no"
                      id="plat_no"
                      className="form-control"
                      placeholder="Plat Nomor"
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

                  {/* Kapasitas Field */}
                  <div className="form-group">
                    <label htmlFor="kapasitas" style={{ fontWeight: "500", color: "#333" }}>Kapasitas</label>
                    <input
                      type="number"
                      name="kapasitas"
                      id="kapasitas"
                      className="form-control"
                      placeholder="Kapasitas Kendaraan"
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

                  {/* Harga Field */}
                  <div className="form-group">
                    <label htmlFor="harga" style={{ fontWeight: "500", color: "#333" }}>Harga</label>
                    <input
                      type="number"
                      name="harga"
                      id="harga"
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

                  {/* Status Kendaraan Field */}
                  <div className="form-group">
                    <label htmlFor="status_kendaraan" style={{ fontWeight: "500", color: "#333" }}>Status Kendaraan</label>
                    <select
                      name="status_kendaraan"
                      id="status_kendaraan"
                      className="form-control"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d1d9e6",
                        borderRadius: "8px",
                        padding: "10px",
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    >
                      <option value="tersedia">Tersedia</option>
                      <option value="tidak tersedia">Tidak Tersedia</option>
                    </select>
                  </div>
                  {/* Foto Field */}
                  <div className="form-group">
                    <label htmlFor="foto" style={{ fontWeight: "500", color: "#333" }}>Foto Kendaraan</label>
                    <input
                      type="file"
                      name="foto"
                      id="foto"
                      className="form-control"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d1d9e6",
                        borderRadius: "8px",
                        padding: "4px",
                        marginBottom: "10px",
                      }}
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

export default AddKendaraan
