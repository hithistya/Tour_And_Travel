import React from "react";

const PesanDetail = () => {
  return (
    <div className="container my-4">
      <h2 className="text-center">Detail Pemesanan</h2>
      
      {/* Rincian Biaya */}
      <div className="card p-3 my-3">
        <h5>Rincian Biaya</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span>Total Orang</span>
            <strong>Rp 59.888.000</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Harga</span>
            <strong>Rp 3.000.000</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between fw-bold">
            <span>Total Harga</span>
            <strong>Rp 70.246.768</strong>
          </li>
        </ul>
      </div>
      
      
      {/* Total dan Tombol Lanjutkan */}
      <div className="text-center mt-4">
        <button className="btn btn-warning w-100 mt-3">Upload Bukti Pembayaraan</button>
      </div>
    </div>
  );
};

export default PesanDetail;
