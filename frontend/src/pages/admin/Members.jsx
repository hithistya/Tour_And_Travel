import React, { useEffect, useState } from 'react'
import {NavLink, Link, data} from "react-router-dom"
import Swal from "sweetalert2"

const Members = () => {
  const [dataMember, setMember] = useState([])
  const token = localStorage.getItem("token")

  const tampilData = async () => {
    const response = await fetch("http://localhost:3000/api/members", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json()
    setMember(data)
  }

  useEffect(() => {
    tampilData()
  }, [])

  return (
    <section class="" style={{ width: "100%", padding: "0" }}>
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
          </div>
        </div>
      </div>
      <div>
        <div class="mask d-flex align-items-center h-100">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>No Hp</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataMember.length > 0 ? (
                            dataMember.map((item, index) => (
                          <tr key={index}>
                            <td className="align-middle">{index + 1}</td>
                            <td className="align-middle">{item.nama}</td>
                            <td className="align-middle">{item.no_hp}</td>
                            <td className="align-middle">{item.email}</td>
                          </tr>
                          ))
                          ): (
                          <tr>
                            <td colSpan="4">Data Kosong</td>
                          </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Members
