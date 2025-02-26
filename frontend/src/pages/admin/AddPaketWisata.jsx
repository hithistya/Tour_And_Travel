import React from 'react';
import Swal from 'sweetalert2';

const AddPaketWisata = () => {
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target); 

    try {
      const response = await fetch('http://localhost:3000/api/paket', {
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
          text: 'Paket Wisata berhasil ditambahkan!',
          timer: 2000,
        }).then(() => {
          window.location.href = '/admin/paketwisata'; 
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
            <div className="col-md-12">
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  padding: "20px"
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(to right,#89CFF0, #A8E6CF)",
                    padding: "15px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px"
                  }}
                >
                  <h4 style={{ margin: "0", fontWeight: "600", color: "#fff" }}>
                    Add Paket Wisata
                  </h4>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                  {/* Nama Paket */}
                  <div className="form-group">
                    <label
                      htmlFor="namapaket"
                      style={{ fontWeight: "500", color: "#333" }}
                    >
                      Nama Paket
                    </label>
                    <input
                      type="text"
                      name="namapaket"
                      id="namapaket"
                      className="form-control"
                      placeholder="Nama Paket Wisata"
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

                  {/* Deskripsi */}
                  <div className="form-group">
                    <label
                      htmlFor="deskripsi"
                      style={{ fontWeight: "500", color: "#333" }}
                    >
                      Deskripsi
                    </label>
                    <textarea
                      name="deskripsi"
                      id="deskripsi"
                      className="form-control"
                      placeholder="Deskripsi Paket Wisata"
                      rows="4"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #d1d9e6",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    ></textarea>
                  </div>

                  {/* Lokasi Wisata */}
                  <div className="form-group">
                    <label
                      htmlFor="lokasi_wisata"
                      style={{ fontWeight: "500", color: "#333" }}
                    >
                      Lokasi Wisata
                    </label>
                    <input
                      type="text"
                      name="lokasi_wisata"
                      id="lokasi_wisata"
                      className="form-control"
                      placeholder="Lokasi Wisata"
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

                  {/* Harga */}
                  <div className="form-group">
                    <label
                      htmlFor="harga"
                      style={{ fontWeight: "500", color: "#333" }}
                    >
                      Harga
                    </label>
                    <input
                      type="number"
                      name="harga"
                      id="harga"
                      className="form-control"
                      placeholder="Harga Paket"
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

                  {/* Foto */}
                  <div className="form-group">
                    <label
                      htmlFor="foto"
                      style={{ fontWeight: "500", color: "#333" }}
                    >
                      Foto Paket Wisata
                    </label>
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
                        marginBottom: "12px",
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      style={{
                        background: "linear-gradient(to right,#89CFF0, #A8E6CF)",
                        border: "none",
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
  );
};

export default AddPaketWisata;
