import React from 'react'
import { Link } from 'react-router-dom'
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import $, { event } from "jquery";


function Project() {
  $(document).ready(function() {
    $(".dropdown-item").click(function() {
      let value = $(this).text();
      $(this).closest(".dropdown").find(".dropdown-toggle").text(value);
    });
  });

  return (
    <div className='main-project'>
      <div className='d-flex justify-content-between p-3'>
        <h3>Our Projects</h3>
        <Link className='btn dashboard-btn' to="/addProject"><FaPlus /> Add New Projects</Link>
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
              <div class="dropdown">
                <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> Last 24 hours</button>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li class="dropdown-item">Last 7 days</li>
                  <li class="dropdown-item">Last 30 days</li>
                  <li class="dropdown-item">Last 3 month</li>
                  <li class="dropdown-item">Custom Duration</li>
                </ul>
              </div>
            </div>
        </div>
      </div>
      <div class="table-responsive px-3">
        <table class="table">
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
            <tr>
              <td className='d-flex flex-column'>Paragraph Generator
                <a href="#">paragraph-generator.com</a>
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
            <tr>
              <td className='d-flex flex-column'>AI Detector
                <a href="#">ai-detector.info</a>
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
            <tr>
              <td className='d-flex flex-column'>AI Poem Generator
                <a href="#">aipoem-generator.com</a>
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
            <tr>
              <td className='d-flex flex-column'>Reword Generator
                <a href="#">rewordgenerator.net</a>
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
            <tr>
              <td className='d-flex flex-column'>Rewording Tool
                <a href="#">rewording-tool.com</a>
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
            <tr>
              <td className='d-flex flex-column'>Sentence Rewriter
                <a href="#">sentencerewriter.net</a>
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
          </tbody>
        </table>
        <div className='d-flex align-items-center justify-content-between'>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#"><IoIosArrowBack /> Prev</a></li>
              <li class="page-item"><a class="page-link active" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next <IoIosArrowForward /></a></li>
            </ul>
          </nav>
          <div className='d-flex align-items-center viewTime'>
            <span>Show:</span>
            <div class="dropdown">
              <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">10 Per Page</button>
              <ul class="dropdown-menu dropdown-menu-dark">
                  <li class="dropdown-item">20 Per Page</li>
                  <li class="dropdown-item">30 Per Page</li>
                  <li class="dropdown-item">40 Per Page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
