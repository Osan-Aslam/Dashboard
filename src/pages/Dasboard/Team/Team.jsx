import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { FaRegEnvelope } from "react-icons/fa";
import TeamImage from "../../../assets/image/Teamimage.png";
import AddNewTeam from './AddNewTeam';


function AddTeam() {
  return (
    <div>
      <div className='d-flex justify-content-between p-3'>
            <h3>Team</h3>
            <Link className='btn dashboard-btn' to="/addNewTeam"><FaPlus /> Add New Team Member</Link>
        </div>
        <div className='d-lg-flex justify-content-between p-3 align-items-center'>
          <p className='result'>Total Team Members: <span>50</span></p>
          <div className='d-lg-flex align-items-center'>
              <div className='searchTag'>
                  <input type="text" name="" placeholder='Search Team Member' />
                  <CiSearch />
              </div>
              <div className='d-flex align-items-center viewTime'>
                  <span>View By Designation:</span>
                  <div class="dropdown">
                      <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> All Members</button>
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
      <div className='row m-auto'>
        <div className="col-lg-4">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img src={TeamImage} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body text-lg-start text-center">
                  <h5 class="card-title mb-1">Naveed Ihsan</h5>
                  <p class="card-text mb-1">Out Reacher</p>
                  <div>
                    <FaEye className='icon'/>
                    <HiPencil className='icon'/>
                    <FaRegEnvelope className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img src={TeamImage} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body text-lg-start text-center">
                  <h5 class="card-title mb-1">Naveed Ihsan</h5>
                  <p class="card-text mb-1">Out Reacher</p>
                  <div>
                    <FaEye className='icon'/>
                    <HiPencil className='icon'/>
                    <FaRegEnvelope className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img src={TeamImage} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body text-lg-start text-center">
                  <h5 class="card-title mb-1">Naveed Ihsan</h5>
                  <p class="card-text mb-1">Out Reacher</p>
                  <div>
                    <FaEye className='icon'/>
                    <HiPencil className='icon'/>
                    <FaRegEnvelope className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img src={TeamImage} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body text-lg-start text-center">
                  <h5 class="card-title mb-1">Naveed Ihsan</h5>
                  <p class="card-text mb-1">Out Reacher</p>
                  <div>
                    <FaEye className='icon'/>
                    <HiPencil className='icon'/>
                    <FaRegEnvelope className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img src={TeamImage} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body text-lg-start text-center">
                  <h5 class="card-title mb-1">Naveed Ihsan</h5>
                  <p class="card-text mb-1">Out Reacher</p>
                  <div>
                    <FaEye className='icon'/>
                    <HiPencil className='icon'/>
                    <FaRegEnvelope className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img src={TeamImage} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body text-lg-start text-center">
                  <h5 class="card-title mb-1">Naveed Ihsan</h5>
                  <p class="card-text mb-1">Out Reacher</p>
                  <div>
                    <FaEye className='icon'/>
                    <HiPencil className='icon'/>
                    <FaRegEnvelope className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img src={TeamImage} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body text-lg-start text-center">
                  <h5 class="card-title mb-1">Naveed Ihsan</h5>
                  <p class="card-text mb-1">Out Reacher</p>
                  <div>
                    <FaEye className='icon'/>
                    <HiPencil className='icon'/>
                    <FaRegEnvelope className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img src={TeamImage} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body text-lg-start text-center">
                  <h5 class="card-title mb-1">Naveed Ihsan</h5>
                  <p class="card-text mb-1">Out Reacher</p>
                  <div>
                    <FaEye className='icon'/>
                    <HiPencil className='icon'/>
                    <FaRegEnvelope className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4 text-center">
                <img src={TeamImage} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body text-lg-start text-center">
                  <h5 class="card-title mb-1">Naveed Ihsan</h5>
                  <p class="card-text mb-1">Out Reacher</p>
                  <div>
                    <FaEye className='icon'/>
                    <HiPencil className='icon'/>
                    <FaRegEnvelope className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTeam
