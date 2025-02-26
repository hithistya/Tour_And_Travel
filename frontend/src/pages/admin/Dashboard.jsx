import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Pie, Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const [data, setData] = useState({
    booking: [],
    member: [],
    rental: [],
    user: [],
  });
  const [error, setError] = useState(null);
  const [viewBy, setViewBy] = useState("month"); // Always view by month
  const token = localStorage.getItem("token");

  // Fetch data function
  const fetchData = async (url, key, errorMsg) => {
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(errorMsg);
      const fetchedData = await response.json();
      setData((prevData) => ({ ...prevData, [key]: fetchedData }));
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    }
  };

  useEffect(() => {
    fetchData("http://localhost:3000/api/bd", "booking", "Failed to fetch bookings");
    fetchData("http://localhost:3000/api/rentals", "rental", "Failed to fetch rentals");
    fetchData("http://localhost:3000/api/members", "member", "Failed to fetch members");
    fetchData("http://localhost:3000/api/users", "user", "Failed to fetch users");
  }, []);

  // Group data by a specific key
  const groupBy = (data, key) => {
    return Object.values(
      data.reduce((acc, item) => {
        const groupKey = item[key] || "Lainnya";
        acc[groupKey] = acc[groupKey] || { name: groupKey, value: 0 };
        acc[groupKey].value++;
        return acc;
      }, {})
    );
  };

  // Group data by date
  const groupByDate = (data, dateKey, period) => {
    return data.reduce((acc, item) => {
      const date = new Date(item[dateKey]);
      let groupKey;

      if (period === "month") {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        groupKey = `${year}-${month < 10 ? `0${month}` : month}`;
      } else {
        groupKey = date.getFullYear().toString(); 
      }

      if (!acc[groupKey]) acc[groupKey] = 0;
      acc[groupKey]++;
      return acc;
    }, {});
  };

  // Group data for charts
  const bookingChartData = data.booking.length ? groupBy(data.booking, "namapaket") : [];
  const rentalByBrandData = data.rental.length ? groupBy(data.rental, "merk") : [];

  const COLORS = ["#0088FE", "#00C49F"];

  const bookingByDate = groupByDate(data.booking, "created_at", viewBy);
  const rentalByDate = groupByDate(data.rental, "created_at", viewBy);

  // Pie Chart Data for Booking and Rentals
  const bookingPieData = {
    labels: bookingChartData.map(item => item.name),
    datasets: [
      {
        data: bookingChartData.map(item => item.value),
        backgroundColor: COLORS,
      },
    ],
  };

  const rentalPieData = {
    labels: rentalByBrandData.map(item => item.name),
    datasets: [
      {
        label: "",
        data: Object.values(bookingByDate),
        borderColor: "#0088FE",
        backgroundColor: "rgba(0, 136, 254, 0.2)",
        fill: true,
      },
      {
        label: "Rentals",
        data: Object.values(rentalByDate),
        borderColor: "#00C49F",
        backgroundColor: "rgba(0, 196, 159, 0.2)",
        fill: true,
      },
    ],
  };

  // Pie Chart Data for Vehicle Brands
  const rentalBrandPieData = {
    labels: rentalByBrandData.map(item => item.name),
    datasets: [
      {
        data: rentalByBrandData.map(item => item.value),
        backgroundColor: COLORS,
      },
    ],
  };


  // Line Chart Data for Bookings and Rentals (grouped by month)
  const lineChartData = {
    labels: Object.keys(bookingByDate),
    datasets: [
      {
        label: "Bookings",
        data: Object.values(bookingByDate),
        borderColor: "#0088FE",
        backgroundColor: "rgba(0, 136, 254, 0.2)",
        fill: true,
      },
      {
        label: "Rentals",
        data: Object.values(rentalByDate),
        borderColor: "#00C49F",
        backgroundColor: "rgba(0, 196, 159, 0.2)",
        fill: true,
      },
    ],
  };

  if (error) return <div>Error: {error}</div>; // Simple error handling

  return (
    <section className="content">
      <div className="container-fluid connectedSortable">
        <div className="row">
          {/* Total Booking */}
          <SmallBox label="Total Booking" value={data.booking?.length || 0} icon="fas fa-suitcase" />
          {/* Total Rentals */}
          <SmallBox label="Total Rentals" value={data.rental?.length || 0} icon="fas fa-key" link="/admin/rentals" />
          {/* Total Members */}
          <SmallBox label="Total Members" value={data.member?.length || 0} icon="fas fa-user-check" link="/admin/user" />
          {/* Total Users */}
          <SmallBox label="Total Users" value={data.user?.length || 0} icon="fas fa-user" />
        </div>

        <div className="row" style={{ marginTop: '-95px' }}> {/* Adjusted margin-top */}
          {/* Left col */}
          <section className="col-lg-7 connectedSortable">
            <ChartCard title="Booking & Rentals" content={<Bar data={lineChartData} />} />
            <ChartCard title="Booking & Rentals" content={<Line data={lineChartData} />} />
          </section>

          {/* Right col */}
          <section className="col-lg-5 connectedSortable">
            <ChartCard title="Booking berdasarkan paket wisata" content={<Doughnut data={bookingPieData} />} />
            {/* Pie chart for Vehicle Brands */}
            <ChartCard title="Rentals Berdasarkan Merk" content={<Pie data={rentalBrandPieData} />} />
          </section>
        </div>
      </div>
    </section>
  );
};

const SmallBox = ({ label, value, icon, link }) => (
  <div className="col-lg-3 col-6 my-2"> {/* Reduced margin */}
    <div className="small-box" style={{ background: "linear-gradient(to right,#89CFF0, #A8E6CF)" }}>
      <div className="inner">
        <h3 style={{ color: "white" }}>{value}</h3>
        <p style={{ color: "white" }}>{label}</p>
      </div>
      <div className="icon">
        <i className={icon} />
      </div>
      {link ? (
        <a href={link} className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right" />
        </a>
      ) : (
        <button className="small-box-footer btn w-100">
          More info <i className="fas fa-arrow-circle-right" />
        </button>
      )}
    </div>
  </div>
);

const ChartCard = ({ title, content }) => (
  <div className="card">
    <div className="card-header">
      <h3 className="card-title" style={{ color: "#133E87" }}>
        <i className="fas fa-chart-pie mr-1" />
        {title}
      </h3>
    </div>
    <div className="card-body">
      <div className="tab-content p-0">
        <div className="chart tab-pane active" style={{ height: "auto", width: "100%" }}>
          {content}
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
