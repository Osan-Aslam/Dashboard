import axios from 'axios';
import React, { useState } from 'react'
import Team from './Team';
import { FaPlus } from "react-icons/fa6";
import uploadImage from "../../../assets/image/uploadImage.png"

const AddTeam = () => {
  const [member, setMember] = useState({
    MemberName: "",
    Designation: "",
    JoiningDate: "",
    BasicSalary: "",
    profilePicture: null,
  });

  const [members, setMembers] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setMember((prev) => ({ ...prev, [name]: value,}));
  };

  const handleFileChange = (e) => {
    setMember((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!member.MemberName || !member.Designation || !member.JoiningDate || !member.BasicSalary) {
      console.error("All fields are requried")
      return;
    }

    const newMember = {
      ...member,
      profilePicture: member.profilePicture ? URL.createObjectURL(member.profilePicture) : null,
    };

    // Get previous members from localStorage
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];

    // Add new member to list
    const updatedMembers = [...storedMembers, newMember];

    // Save updated list back to localStorage
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));

    const formData = new FormData();
    formData.append("MemberName", member.MemberName);
    formData.append("Designation", member.Designation);
    formData.append("JoiningDate", member.JoiningDate);
    formData.append("BasicSalary", member.BasicSalary);
    formData.append("profilePicture", member.profilePicture);

    console.log("Sending data:", Object.fromEntries(formData.entries()));

    try{
      const response = await axios.post("http://207.180.203.98:5030/api/team-members", formData, {
        headers: {"Content-Type": "multipart/form-data", "accept": "*/*"},
      });

      if(response.data) {
        console.log(response.data);

        setMembers((prevMembers) => [
          ...prevMembers,
          {
            ...response.data,
            profilePicture: URL.createObjectURL(member.profilePicture),
          },
        ]);
        // onMemberAdded(response.data);
      }
    } catch (error) {
      console.error("Error adding member", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h3 className='ms-2 mt-3'>Add New Team Member</h3>
        <div className='col-lg-8 mx-auto mt-4 add-project p-4'>
          <form className='w-100' onSubmit={handleSubmit}>
            <div className='text-center uploadImage'>
              <img src={uploadImage} alt="" />
              <p><FaPlus /> Add Profile</p>
              <input type="file" name="" className='uploadFile' id="" />
            </div>
            <div>
              <label for="MemberName" class="form-label">Member Name</label>
              <input type="text" class="form-control" name='MemberName' id="MemberName" placeholder="Enter member name" onChange={handleChange} required/>
            </div>
            <div>
              <label for="Designation" class="form-label">Designation</label>
              <input type="text" class="form-control" id="Designation" name='Designation' placeholder="Select designation" onChange={handleChange} />
            </div> 
            <div className="row">
              <div className='col-6'>
                <label for="JoiningDate" class="form-label">Joining Date</label>
                <input type="date" class="form-control" id="JoiningDate" name='JoiningDate' placeholder="Joining Date" onChange={handleChange} />
              </div> 
              <div className='col-6'>
                <label for="BasicSalary" class="form-label">Basic Salary</label>
                <input type="number" class="form-control" id="BasicSalary" name='BasicSalary' placeholder="Salary" onChange={handleChange} />
              </div> 
            </div>
              {/* <div>
                <label for="profilePicture" class="form-label">profile Picture</label>
                <input type="file" class="form-control" id="profilePicture" placeholder="Select designation" onChange={handleFileChange} />
              </div>  */}
            <div className='text-center mt-4'>
              <button className='btn dashboard-btn px-4 py-2'>Add Member</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default AddTeam
