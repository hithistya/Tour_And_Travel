import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../style/ticket.css";
import QRCode from "react-qr-code";
import Swal from "sweetalert2";

const ETicket = () => {
  const { bd_id } = useParams(); 
  console.log("ID dari useParams:", bd_id);
  const ticketRef = useRef();
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log("Fetching tiket untuk ID:", bd_id); 
        const response = await fetch(`http://localhost:3000/api/bd/${bd_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data tiket");
        }

        const data = await response.json();
        setTickets(Array.isArray(data) ? data : [data]); 
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengambil data tiket!",
        });
        console.error("Error fetching tickets:", error);
      }
    };

    if (bd_id) {
      fetchTickets();
    } else {
      console.error("Error: bd_id masih undefined!");
    }
  }, [bd_id, token]);

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(ticketRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`Tour-Ticket-${bd_id}.pdf`);
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h4 className="text-dark mb-4 fw-bold">Your Tour Ticket is Ready!</h4>

      {tickets.length === 0 ? (
        <p>Loading ticket details...</p>
      ) : (
        tickets.map((ticket, index) => (
          <div key={index} ref={ticketRef} className="ticket-card shadow-lg rounded w-100 bg-light" style={{ maxWidth: "500px", padding: "20px", border: "2px solid #007bff", marginBottom: "20px" }}>
            <div className="ticket-header bg-primary text-white p-3 rounded-top d-flex justify-content-center align-items-center">
              <h5 className="m-0">Exclusive Travel Pass</h5>
            </div>

            <div className="ticket-body p-4">
              <h3 className="ticket-destination fw-bold">{ticket.namapaket}</h3>
              <hr className="mt-0" />

              <div className="row">
                <div className="col-6"><p className="label">Tour ID</p></div>
                <div className="col-6"><p>{bd_id || "T-XXXXX"}</p></div>
              </div>

              <div className="row">
                <div className="col-6"><p className="label">Tanggal Pemesanan</p></div>
                <div className="col-6"><p>{ticket.tgl_pemesanan}</p></div>
              </div>

              <hr className="mt-0" />

              <div className="row">
                <div className="col-6"><p className="label">Jumlah Orang</p></div>
                <div className="col-6"><p>{ticket.jumlah_orang}</p></div>
              </div>

              <div className="row">
                <div className="col-6"><p className="label">Harga</p></div>
                <div className="col-6"><p>{new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                  }).format(ticket.harga)}</p></div>
              </div>

              <hr className="mt-0" />
              <div className="row">
                <div className="col-6"><p className="label">Total Harga</p></div>
                <div className="col-6"><p>{new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                  }).format(ticket.total)}</p></div>
              </div>

              <div className="row">
                <div className="col-6"><p className="label">Status Pembayaran</p></div>
                <div className="col-6">
                  <p className={`fw-bold ${ticket.status_pembayaran === "Lunas" ? "text-success" : "text-danger"}`}>
                    {ticket.status_pembayaran}
                  </p>
                </div>
              </div>


              <hr className="mt-0" />

              <div className="qr-code-container text-center mt-3">
                <QRCode value={`https://yourwebsite.com/ticket/${bd_id}`} size={100} className="shadow-sm p-2 bg-white rounded" />
              </div>
            </div>

            <div className="ticket-footer bg-primary text-white p-3 rounded-bottom d-flex justify-content-center">
              <p className="small">Show QR Code upon request</p>
            </div>
          </div>
        ))
      )}

      <button className="btn btn-warning mt-3 px-4 py-2" onClick={handleDownloadPDF}>
        Download Ticket
      </button>
    </div>
  );
};

export default ETicket;
