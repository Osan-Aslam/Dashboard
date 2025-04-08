import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import uploadImage from "../../../assets/image/uploadImage.png"
import {useNavigate, useParams } from 'react-router-dom';


const AddTeam = () => {
  const [image, setImage] = useState(uploadImage);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [member, setMember] = useState({
    memberName: "",
    designation: "",
    joiningDate: "",
    basicSalary: "",
    profilePicture: null,
  });

  useEffect(() => {
    const getImage = async () => {
      if(member.profilePicture) {
        const imageUrl = await fetchProfilePicture(member.profilePicture);
        if(imageUrl) {
          setImage(imageUrl)
        }
      }
    };
    getImage();
  }, [member.profilePicture]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setMember({ ...member, [name]: value,});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMember({ ...member, profilePicture: file });
  
      // Display image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("memberName", member.memberName);
    formData.append("designation", member.designation);
    formData.append("joiningDate", member.joiningDate);
    formData.append("basicSalary", member.basicSalary);
    formData.append("profilePicture", member.profilePicture);

    // console.log("Sending data:", Object.fromEntries(formData.entries()));

    try{
      const response = await axios.post("http://207.180.203.98:5030/api/team-members", formData, {
        headers: {"Content-Type": "multipart/form-data", "accept": "*/*"},
      });
      
      if (response.data) {
        // console.log(response.data);
        navigate("/team");
      }
    } catch (error) {
      console.error("Error adding member", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || "Something when wrong";
      setError(errorMsg);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const fetchProfilePicture = async (profilePictureUrl) => {
    try {
      const response = await axios.get(`http://207.180.203.98:5030/api/team-members/profile-picture?profilePath=${profilePictureUrl}`, {
        headers: {
          'Accept': '*/*'
        },
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch(error) {
      console.error("Error fetching profile:" ,error);
      return null;
    }
  };


  return (
    <div>
      <h3 className='ms-2 mt-3'>Add New Team Member</h3>
        <div className='col-lg-8 mx-auto mt-4 add-project p-4'>
          {error && (
            <div className='alert alert-danger p-2 col-5 mx-auto text-center'>
              {error}
            </div>
          )}
          <form className='w-100' onSubmit={handleSubmit}>
            <div className='text-center uploadImage'>
              {<img src={image} alt="" className='rounded-full'/>}
              <p><FaPlus /> Add Profile</p>
              <input type="file" name="" className='uploadFile' id="" onChange={handleFileChange}/>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <label htmlFor="memberName" className="form-label">Member Name</label>
                <input type="text" className="form-control" name='memberName' id="memberName" placeholder="Enter member name" onChange={handleChange} required/>
              </div>
              <div className="dropdown d-flex flex-column col-lg-6 Designation">
                  <label htmlFor="" className='form-label'>Designation</label>
                  <a className="btn dropdown-toggle d-flex align-items-center justify-content-between" onChange={handleChange} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{member.designation || "designation"}</a>
                  <ul className="dropdown-menu">
                    {["Out Reacher", "Manager", "Content Writer"].map((role, index) => (
                      <li key={index}>
                        <button type='button' className='dropdown-item' onClick={() => setMember(prev => ({ ...prev, designation: role}))}>{role}</button>
                      </li>
                    ))}
                  </ul>
              </div>
              <div className='col-6'>
                <label htmlFor="joiningDate" className="form-label">Joining Date</label>
                <input type="date" className="form-control" id="joiningDate" name='joiningDate' placeholder="Joining Date" onChange={handleChange} />
              </div> 
              <div className='col-6'>
                <label htmlFor="basicSalary" className="form-label">Basic Salary</label>
                <input type="number" className="form-control" id="basicSalary" name='basicSalary' placeholder="Salary" onChange={handleChange} />
              </div> 
            </div>
            <div className='text-center mt-4'>
              <button className='btn dashboard-btn px-4 py-2'>Add Member</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default AddTeam
