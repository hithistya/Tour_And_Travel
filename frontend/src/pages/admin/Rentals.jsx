import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

const Rentals = () => {
  const [dataRental, setRental] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const token = localStorage.getItem("token");

  const tampilData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/rentals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setRental(data);
    } catch (error) {
      setError("Error fetching data: " + error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error fetching data!',
      });
    }
  };

  useEffect(() => {
    tampilData();
  }, []);

  const handleImageClick = (foto) => {
    Swal.fire({
      imageUrl: `http://localhost:3000/pembayaran/${foto}`,
      imageAlt: "Paket Wisata",
      showCloseButton: true,
      showConfirmButton: false,
      width: '80%',
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Yakin Menghapus Data?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/rentals/${id}`, {
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
            console.error("Error deleting rental:", error);
          });
      }
    });
  };

  const handleEdit = async (id) => {
    try {
      const rentalToUpdate = dataRental.find((rental) => rental.id === id);

      if (!rentalToUpdate) return;

      const updatedRental = {
        ...rentalToUpdate,
        status_pembayaran: 'Sudah Dibayar',
        status_sewa: 'Disewa',
      };

      const updatedData = dataRental.map((rental) =>
        rental.id === id ? updatedRental : rental
      );
      setRental(updatedData);


      const response = await fetch(`http://localhost:3000/api/rentals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRental),
      });

      if (!response.ok) {
        throw new Error('Failed to update rental');
      }

      Swal.fire({
        icon: 'success',
        title: 'Status Berhasil di update!',
        text: 'sukses guys',
      });
    } catch (error) {
      console.error('Error updating rental:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error updating the status!',
      });
    }
  };

  const handleUpdate2 = async (id) => {
    try {
      const rentalToUpdate = dataRental.find((rental) => rental.id === id);
  
      if (!rentalToUpdate) return;
  
      const updatedRental = {
        ...rentalToUpdate,
        status_sewa: 'Selesai', // Ubah status_sewa menjadi 'Selesai'
      };
  
      // Update data di state tanpa perlu memuat ulang data
      const updatedData = dataRental.map((rental) =>
        rental.id === id ? updatedRental : rental
      );
      setRental(updatedData);
  
      const response = await fetch(`http://localhost:3000/api/rentals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRental),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update rental');
      }
  
      Swal.fire({
        icon: 'success',
        title: 'Status Sewa Berhasil diupdate!',
        text: 'Sewa telah selesai.',
      });
    } catch (error) {
      console.error('Error updating rental:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error updating the rental status!',
      });
    }
  };
  

  const filteredData = dataRental.filter((rental) =>
    rental.merk.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rental.nama_member.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section style={{ width: "100%", borderRadius: "10px", padding: "20px" }}>
      <div className="row mb-3 d-flex justify-content-between align-items-center">
        <div className="col-md-6 text-start">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-2 text-end">
          <select className="form-control rounded-pill" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover mb-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Kendaraan ID</th>
              <th>Member ID</th>
              <th>Tanggal Sewa</th>
              <th>Tanggal Kembali</th>
              <th>Harga</th>
              <th>Status Pembayaran</th>
              <th>Status Sewa</th>
              <th>File</th>
              <th>Confirm</th>
              <th>Done</th>
              <th>Hapus</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((rental, index) => (
                <tr key={rental.id}>
                  <td>{offset + index + 1}</td>
                  <td>{rental.merk}</td>
                  <td>{rental.nama_member}</td>
                  <td>{new Date(rental.tgl_sewa).toLocaleDateString('id-ID')}</td>
                  <td>{new Date(rental.tgl_kembali).toLocaleDateString('id-ID')}</td>
                  <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(rental.harga)}</td>
                  <td>{rental.status_pembayaran}</td>
                  <td>{rental.status_sewa}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/pembayaran/${rental.file}`}
                      width="50"
                      height="50"
                      onClick={() => handleImageClick(rental.file)}
                    />
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm rounded-pill" onClick={() => handleEdit(rental.id)}>
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                  <td>
                  
                      <button className="btn btn-success btn-sm rounded-pill" onClick={() => handleUpdate2(rental.id)}>
                        <i className='fas fa-check'></i>
                      </button>
                    

                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm rounded-pill" onClick={() => handleDelete(rental.id)}>
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={'←'}
        nextLabel={'→'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center mt-4 gap-2'}
        pageClassName={'page-item rounded-pill'}
        pageLinkClassName={'page-link rounded-pill'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link rounded-pill'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link rounded-pill'}
        activeClassName={'active'}
      />
    </section>
  );
};

export default Rentals;
