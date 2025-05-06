import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { FaRegEnvelope } from "react-icons/fa";
import TeamImage from "../../../assets/image/Teamimage.png";
import exitUser from "../../../assets/icon/user_exit.svg"
import Userin from "../../../assets/icon/user-in.svg"
import { useEffect } from 'react';
import { RiDeleteBin4Fill } from "react-icons/ri";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from "jquery";
import { memo } from 'react';

const Team = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("All Members");
  const [show, setShow] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [reason, setReason] = useState("");
  const [memberToLeave, setMemberToLeave] = useState(null);
  const [shows, setShows] = useState(false);

  const hendleDelete = async (id) => {
    // Set the member to delete
    const member = members.find(member => member.id === id);
    setMemberToDelete(member); // Set the member to be deleted
    setShow(true); // Show the modal
  }

  const handleDeleteConfirm = async () => {

    if (memberToDelete) {

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

        console.log("response data members: ", response.data);

        const memberWithImages = await Promise.all(
          fetchMembers.map(async (member) => {
            const profilePictureUrl = await fetchProfilePicture(member.profilePictureUrl);
            return { ...member, profilePictureUrl };
          })
        )
        console.log("Fetched Member:", response.data);
        setMembers(memberWithImages);
        // console.log(members.profilePictureUrl);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMembers();
  }, []);

  const copyToClipboard = (email) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email)
        .then(() => {
          $(".email-copied").removeClass("d-none").text(`Copied: ${email}`);
          setTimeout(() => $(".email-copied").addClass("d-none"), 3000);
        })
        .catch(error => {
          console.error("Clipboard error:", error);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
  
      try {
        document.execCommand('copy');
        $(".email-copied").removeClass("d-none").text(`Copied: ${email}`);
        setTimeout(() => $(".email-copied").addClass("d-none"), 3000);
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
  
      document.body.removeChild(textArea);
    }
  };
  

  const fetchProfilePicture = async (profilePath) => {
    if (!profilePath) return TeamImage;
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

  const handleDesignationChange = (designation) => {
    setSelectedDesignation(designation)
  }

  const handleLeave = async () => {
    if (!memberToLeave) return;
  
    const formData = new FormData();
    formData.append("MemberName", memberToLeave.memberName);
    formData.append("Designation", memberToLeave.designation);
    formData.append("JoiningDate", memberToLeave.joiningDate); // ISO format
    formData.append("BasicSalary", memberToLeave.basicSalary);
    formData.append("Email", memberToLeave.email);
    formData.append("reasonForBeingInactive", reason);
    formData.append("profilePicture", ""); // or memberToLeave.profilePicture if used
    console.log("sending Data :", Object.fromEntries(formData.entries()));
    try {
      const response =  await axios.patch(
        `http://207.180.203.98:5030/api/team-members/${memberToLeave.id}`,
        formData,
        {
          headers: {
            "Accept": "*/*",
            "Content-Type": "multipart/form-data",
          }
        }
      );
      console.log(response.data);
      // Update the member in the state
      setMembers(prev =>
        prev.map(m => m.id === memberToLeave.id ? { ...m, reasonForBeingInactive: reason } : m)
      );
  
      setShows(false);
      setReason("");
      setMemberToLeave(null);
    } catch (error) {
      console.error("Error updating leave reason:", error);
      alert("Failed to update leave status.");
    }
  };
  const handleRejoin = async (member) => {
    const formData = new FormData();
    formData.append("MemberName", member.memberName);
    formData.append("Designation", member.designation);
    formData.append("JoiningDate", member.joiningDate);
    formData.append("BasicSalary", member.basicSalary);
    formData.append("Email", member.email);
    formData.append("ReasonForBeingInactive", ""); // Rejoin: empty string or null
    formData.append("profilePicture", ""); // optional, based on your API
  
    try {
      await axios.patch(`http://207.180.203.98:5030/api/team-members/${member.id}`, formData, {
        headers: {
          "Accept": "*/*",
          "Content-Type": "multipart/form-data",
        }
      });
  
      // Update the local state
      setMembers(prev =>
        prev.map(m => m.id === member.id ? { ...m, reasonForBeingInactive: "" } : m)
      );
    } catch (error) {
      console.error("Error rejoining member:", error);
      alert("Failed to rejoin member. Please try again.");
    }
  };
  const handleClose = () => setShows(false);

  return (
    <div>
      <div className='d-flex justify-content-between p-3'>
        <h3>Team</h3>
        <Link className='btn dashboard-btn' to="/team/addMember"><FaPlus /> Add New Team Member</Link>
      </div>
      <div className='d-lg-flex justify-content-between p-3 align-items-center'>
        <p className='result'>Total Team Members: <span>{filterMember.length}</span></p>
        <div className='d-lg-flex align-items-center'>
          <div className='searchTag d-flex align-items-center justify-content-between'>
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} name="" placeholder='Search Team Member' />
            <CiSearch />
          </div>
          <div className='d-flex align-items-center viewTime mt-lg-0 mt-2'>
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
      <div className='alert alert-danger p-2 col-3 mx-auto text-center email-copied d-none'>Email Copied</div>
      <div className='row m-auto'>
        {filterMember.length === 0 ? (
          <p></p>
        ) : (
          filterMember.map((member) => (
            <div className="col-lg-4" key={member.id}>
              <div className={`card mb-3 m-0 ${member.reasonForBeingInactive ? 'left-member-card' : ''}`}>
                <div className="row g-0 align-items-center">
                  <>
                    <div className="col-md-4 text-center">
                      <img src={member.profilePictureUrl || TeamImage} className="img-fluid" alt={member.memberName} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body text-lg-start text-center">
                        <h5 className="card-title mb-1">{member.memberName}</h5>
                        <p className="card-text mb-1">{member.designation}</p>
                        {/* {member.reasonForBeingInactive && (
                          <p className="text-danger small">Left: {member.reasonForBeingInactive}</p>
                        )} */}
                        <div>
                          <Link to={`/team/viewMember/${member.id}`}>
                            <FaEye className='icon' />
                          </Link>
                          <Link to={`/team/updateMember/${member.id}`}>
                            <HiPencil className='icon' />
                          </Link>
                          <FaRegEnvelope className='icon' onClick={() => copyToClipboard(member.email)} />
                          <RiDeleteBin4Fill className="icon delete-icon" onClick={() => hendleDelete(member.id)} />
                          <img src={exitUser} className='exitUser' alt="exitUser" onClick={() => { setShows(true); setMemberToLeave(member);}} />
                          <img src={Userin} className='exitUser' alt="Userin" onClick={() => handleRejoin(member)} />
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

      <Modal show={show} onHide={handleDeleteCancel} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <span><p className='mb-0'>You Want To Delete this Member?</p>"All backlinks associated with this Team Member will be removed."</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>Close</Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={shows} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leaving Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className='form-control' value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for leaving" id="" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLeave}>
            Leave
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Team
