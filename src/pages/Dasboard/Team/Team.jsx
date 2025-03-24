import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { FaRegEnvelope } from "react-icons/fa";
import TeamImage from "../../../assets/image/Teamimage.png";
import AddNewTeam from './AddNewTeam';
import { useEffect } from 'react';


const Team = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    setMembers(storedMembers);
  }, []);

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
        {members.map((member, index) => (
          <div className="col-lg-4" key={index}>
            <div className="card mb-3">
              <div className="row g-0 align-items-center">
                  <>
                    <div className="col-md-4 text-center">
                      <img src={member.profilePicture} className="img-fluid rounded-start" alt={member.MemberName} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body text-lg-start text-center">
                        <h5 className="card-title mb-1">{member.MemberName}</h5>
                        <p className="card-text mb-1">{member.Designation}</p>
                        <p className="card-text mb-1">{member.JoiningDate}</p>
                        <p className="card-text mb-1">{member.BasicSalary}</p>
                        <div>
                          <FaEye className='icon' />
                          <HiPencil className='icon' />
                          <FaRegEnvelope className='icon' />
                        </div>
                      </div>
                    </div>
                  </>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Team
