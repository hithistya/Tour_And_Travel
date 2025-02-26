import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

const Booking = () => {
  const [dataBooking, setBooking] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const tampilData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/bd", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setBooking(data);
    } catch (error) {
      setError("Error fetching data: " + error.message);
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Error fetching data!' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    tampilData();
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Yakin Menghapus Data?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/bd/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.json())
        .then(() => {
          window.location.reload();
        });
      }
    });
  };

  // Handle edit to update status_pembayaran
  const handleEdit = (id) => {
    // Asking the user to confirm the status change
    Swal.fire({
      icon: 'question',
      title: 'Update Status Pembayaran',
      text: 'Are you sure you want to mark this booking as "Sudah Dibayar"?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Mark as Paid',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Update the booking status in the backend
        fetch(`http://localhost:3000/api/bd/${id}`, {
          method: 'PUT',  // Use PATCH for partial update
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status_pembayaran: 'Sudah Dibayar',  // Set the status to 'Sudah Dibayar'
          }),
        })
        .then((response) => response.json())
        .then((updatedBooking) => {
          // Update the state with the new status
          setBooking((prevData) =>
            prevData.map((booking) =>
              booking.id === id ? { ...booking, status_pembayaran: 'Sudah Dibayar' } : booking
            )
          );
          Swal.fire('Success', 'Status Pembayaran updated to "Sudah Dibayar"', 'success');
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to update status Pembayaran', 'error');
        });
      }
    });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  // Handle page change
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  // Filtered and paginated data
  const filteredData = dataBooking.filter((booking) =>
    booking.nama_member.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <section className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50 rounded-pill"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={handleItemsPerPageChange} value={itemsPerPage} className="form-select w-25 rounded-pill">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center"><span className="spinner-border"></span> Loading data...</div>
      ) : error ? (
        <div className="alert alert-danger rounded-pill">{error}</div>
      ) : displayedData.length === 0 ? (
        <div className="alert alert-warning text-center rounded-pill">No data available.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped rounded-3 overflow-hidden">
            <thead className="table" style={{
                  background: "linear-gradient(to right,#89CFF0, #A8E6CF)", color: '#fff' }}>
              <tr>
                <th>No</th>
                <th>Tgl Pesan</th>
                <th>Pemesan</th>
                <th>Paket Wisata</th>
                <th>Jumlah Orang</th>
                <th>Harga</th>
                <th>Total</th>
                <th>Status Pembayaran</th>
                <th>File</th>
                <th>Confrim</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{booking.tgl_pemesanan}</td>
                  <td>{booking.nama_member}</td>
                  <td>{booking.namapaket}</td>
                  <td>{booking.jumlah_orang}</td>
                  <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(booking.harga)}</td>
                  <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(booking.total)}</td>
                  <td>{booking.status_pembayaran}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/pembayaran/${booking.file}`}
                      width="50"
                      height="50"
                      style={{ objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => Swal.fire({ imageUrl: `http://localhost:3000/pembayaran/${booking.file}`, imageAlt: "Bukti Pembayaran", showCloseButton: true, showConfirmButton: false, width: '80%' })}
                    />
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm rounded-pill" onClick={() => handleEdit(booking.id)}>
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm rounded-pill" onClick={() => handleDelete(booking.id)}>
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default Booking;
