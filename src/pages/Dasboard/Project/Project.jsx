import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import $, { error, event } from "jquery";
import axios from 'axios';


function Project() {
  const [projects, setProjects] = useState([]);

  useState(() => {
    const response = axios.get(`http://207.180.203.98:5030/api/projects`, {
      headers: {
        'Accept': '*/*',
      }
    }).then(response => {
      setProjects(response.data);
    }).catch(error => {
      console.error("Error fetching Projects:", error);
    });
  }, []);
  $(document).ready(function () {
    $(".dropdown-item").click(function () {
      let value = $(this).text();
      $(this).closest(".dropdown").find(".dropdown-toggle").text(value);
    });
  });

  return (
    <div className='main-project'>
      <div className='d-flex justify-content-between p-3'>
        <h3>Our Projects</h3>
        <Link className='btn dashboard-btn' to="/project/addProject"><FaPlus /> Add New Projects</Link>
      </div>
      <div className='d-lg-flex justify-content-between p-3 align-items-center'>
        <p className='result'>Results: <span>108,877 sites</span></p>
        <div className='d-lg-flex align-items-center'>
          <div className='searchTag'>
            <input type="text" name="" placeholder='Search Project' />
            <CiSearch />
          </div>
          <div className='d-flex align-items-center viewTime'>
            <span>View By Duration:</span>
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> Last 24 hours</button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li className="dropdown-item">Last 7 days</li>
                <li className="dropdown-item">Last 30 days</li>
                <li className="dropdown-item">Last 3 month</li>
                <li className="dropdown-item">Custom Duration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive px-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Our Projects</th>
              <th scope="col">Total Backlinks</th>
              <th scope="col">Total Guest Posts</th>
              <th scope="col">Total Link Insertions</th>
              <th scope="col">Follow</th>
              <th scope="col">No Follow</th>
              <th scope="col">Lost Links</th>
              <th scope="col">Total Paid</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              projects.length > 0 ? (
                projects.map((project, index) => (
                  <tr key={index}>
                    <td className='d-flex flex-column'>{project.projectName}
                      <a href="#">{project.projectURL}</a>
                    </td>
                    <td>34</td>
                    <td>23</td>
                    <td>11</td>
                    <td>19</td>
                    <td>15</td>
                    <td>9</td>
                    <td>$300</td>
                    <td className='d-flex'>
                      <button className='btn dashboard-btn'><FaEye /> View</button>
                      <button className='btn dashboard-btn'><MdEdit /> Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>no Projects</p>
              )
            }
          </tbody>
        </table>
        <div className='d-flex align-items-center justify-content-between'>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#"><IoIosArrowBack /> Prev</a></li>
              <li className="page-item"><a className="page-link active" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next <IoIosArrowForward /></a></li>
            </ul>
          </nav>
          <div className='d-flex align-items-center viewTime'>
            <span>Show:</span>
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">10 Per Page</button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li className="dropdown-item">20 Per Page</li>
                <li className="dropdown-item">30 Per Page</li>
                <li className="dropdown-item">40 Per Page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
