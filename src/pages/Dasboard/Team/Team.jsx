import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { FaRegEnvelope } from "react-icons/fa";
import TeamImage from "../../../assets/image/Teamimage.png";
import AddNewTeam from './AddMember';
import ViewMember from './ViewMember';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin4Fill } from "react-icons/ri";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Team = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("All Members");
  const [show, setShow] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const hendleDelete = async (id) => {
    // Set the member to delete
    const member = members.find(member => member.id === id);
    setMemberToDelete(member); // Set the member to be deleted
    setShow(true); // Show the modal
  }

  const handleDeleteConfirm = async () => {

    if(memberToDelete) {

      try {
        const deleteUrl = `http://207.180.203.98:5030/api/team-members/${memberToDelete.id}`;
        // console.log(deleteUrl);
        const response = await axios.delete(deleteUrl, {
          "headers": {
            "accept": "*/*",
          }
        })
        // console.log("Delete Response: ", response);
        
        setMembers((prevMember) => prevMember.filter(member => member.id !== memberToDelete.id));
      } catch (error) {
        console.error("Error deleting member:", error.response?.data || error.message);
        alert("Failed to delete member. Please try again.");
      }
    }
    setShow(false);
  }

  const handleDeleteCancel = () => {
    setShow(false); // Close the modal without deleting
    setMemberToDelete(null); // Reset memberToDelete
  }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://207.180.203.98:5030/api/team-members");
        const fetchMembers = response.data;

        const memberWithImages = await Promise.all(
          fetchMembers.map(async (member) => {
            const profilePictureUrl = await fetchProfilePicture(member.profilePictureUrl);
            return {...member, profilePictureUrl};
          })
        )
        // console.log("Fetched Member:", response.data);
        setMembers(memberWithImages);
        // console.log(members.profilePictureUrl);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMembers();
  }, []);

  const fetchProfilePicture = async (profilePath) => {
    if(!profilePath) return TeamImage;
    try {
      const response = await axios.get(
        `http://207.180.203.98:5030/api/team-members/profile-picture?profilePath=${profilePath}`,
        {
          headers: { 'Accept': '*/*' },
          responseType: 'blob',
        }
      );
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return TeamImage; // Use default image if fetching fails
    }
  };

  const filterMember = members.filter((member) =>
    (member.memberName.toLowerCase().includes(search.toLowerCase())) && (selectedDesignation === "All Members" || member.designation === selectedDesignation)
  );

  const handleDesignationChange  = (designation) => {
    setSelectedDesignation(designation)
  }

  return (
    <div>
      <div className='d-flex justify-content-between p-3'>
        <h3>Team</h3>
        <Link className='btn dashboard-btn' to="/team/addMember"><FaPlus /> Add New Team Member</Link>
      </div>
      <div className='d-lg-flex justify-content-between p-3 align-items-center'>
        <p className='result'>Total Team Members: <span>{filterMember.length}</span></p>
        <div className='d-lg-flex align-items-center'>
          <div className='searchTag'>
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} name="" placeholder='Search Team Member' />
            <CiSearch />
          </div>
          <div className='d-flex align-items-center viewTime'>
            <span>View By Designation:</span>
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> {selectedDesignation || "All Members"}</button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li className="dropdown-item" onClick={() => handleDesignationChange("All Members")}>All Members</li>
                <li className="dropdown-item" onClick={() => handleDesignationChange("Out Reacher")}>Out Reacher</li>
                <li className="dropdown-item" onClick={() => handleDesignationChange("Content Writer")}>Content Writer</li>
                <li className="dropdown-item" onClick={() => handleDesignationChange("Manager")}>Manager</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='row m-auto'>
        {filterMember.length === 0 ? (
          <p></p>
        ) : (
          filterMember.map((member) => (
          <div className="col-lg-4" key={member.id}>
            <div className="card mb-3">
              <div className="row g-0 align-items-center">
                <>
                  <div className="col-md-4 text-center">
                    <img src={member.profilePictureUrl || TeamImage} className="img-fluid" alt={member.memberName} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-lg-start text-center">
                      <h5 className="card-title mb-1">{member.memberName}</h5>
                      <p className="card-text mb-1">{member.designation}</p>
                      <div>
                        <Link to={`/team/viewMember/${member.id}`}>
                          <FaEye className='icon' />
                        </Link>
                        <Link to={`/team/updateMember/${member.id}`}>
                          <HiPencil className='icon' />
                        </Link>
                        <FaRegEnvelope className='icon' />
                        <RiDeleteBin4Fill className="icon delete-icon" onClick={() => hendleDelete(member.id)} />
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        ))
      )}
      </div>

      <Modal
        show={show}
        onHide={handleDeleteCancel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You Want To Delete this Member?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>Close</Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Team
