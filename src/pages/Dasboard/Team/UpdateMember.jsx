import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import uploadImage from "../../../assets/image/uploadImage.png"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';


function UpdateMember() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [member, setMember] = useState({
    memberName: "",
    designation: "",
    joiningDate: "",
    basicSalary: "",
    email: "",
    profilePicture: null,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://207.180.203.98:5059/api/team-members/${id}`);
        if (response.data) {
          const profilePath = response.data.profilePictureUrl ? `http://207.180.203.98:5059/api/team-members/profile-picture?profilePath=${response.data.profilePictureUrl}` : null;
          setMember({
            memberName: response.data.memberName || "",
            designation: response.data.designation || "",
            email: response.data.email || "",
            joiningDate: response.data.joiningDate ? response.data.joiningDate.split("T")[0] : "", // Fix date format
            basicSalary: response.data.basicSalary || "",
            profilePicture: profilePath || uploadImage,
          });
          // console.log("Profile Path:", profilePath)
          // console.log(response.data);
          if(profilePath) {
            setImage(profilePath);
          }
          else{
            setImage(uploadImage);
          }
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMember();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMember((prev) => ({ ...prev, profilePicture: URL.createObjectURL(file) }));
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form data safely
    formData.append("MemberName", member.memberName || "");
    formData.append("Designation", member.designation || "");
    formData.append("email", member.email || "");
    formData.append("JoiningDate", member.joiningDate ? `${member.joiningDate}T00:00:00.000Z` : "");
    formData.append("BasicSalary", Number(member.basicSalary) || 0);
    formData.append("profilePicture", image);

    // console.log("Sending data:", Object.fromEntries(formData.entries()));

    try {
      const response = await axios.patch(
        `http://207.180.203.98:5059/api/team-members/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
          },
        }
      );

      // console.log("Update Response:", response.data, response.status);
      setSuccessMessage("Member updated successfully!");
      // Clear message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/team");
      }, 2000);
    } catch (error) {
      console.error("Error updating member:", error.response?.data || error.message);
      alert("Failed to update member. Please try again.");
    }

  };
  return (
    <>
      <h3 className='ms-2 mt-3'>Update Team Member</h3>
        <div className='col-lg-8 mx-auto mt-4 add-project p-4'>
          {successMessage && (
            <div className="alert alert-success p-2 col-6 mx-auto text-center">
              {successMessage}
            </div>
          )}
          <form className='w-100' onSubmit={handleSubmit}>
            <div className='text-center uploadImage'>
              <img src={member.profilePicture || uploadImage} alt="" className='rounded-full'/>
              <p><FaPlus /> Add Profile</p>
              <input type="file" name="profilePictureUrl" className='uploadFile' onChange={handleFileChange} id="" />
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <label htmlFor="email" className="form-label">Member Email</label>
                <input type="email" className="form-control" name='email' value={member.email} onChange={handleChange} id="memberName" placeholder="Enter member Email" required/>
              </div>
              <div className='col-lg-6'>
                <label htmlFor="memberName" className="form-label">Member Name</label>
                <input type="text" className="form-control" name='memberName' value={member.memberName} onChange={handleChange} id="memberName" placeholder="Enter member name" required/>
              </div>
              <div className="dropdown d-flex flex-column col-lg-6 Designation">
                  <label htmlFor="" className='form-label'>Designation</label>
                  <a className="btn dropdown-toggle d-flex align-items-center justify-content-between" value={member.designation} role="button" data-bs-toggle="dropdown" aria-expanded="false">{member.designation || "Select Designation"}</a>
                  <ul className="dropdown-menu">
                    {["Out Reacher", "Manager", "Content Writer"].map((role, index) => (
                      <li key={index}>
                        <button type='button' onClick={() => setMember((prev) => ({ ...prev, designation: role}))} className='dropdown-item'>{role}</button>
                      </li>
                    ))}
                  </ul>
              </div>
              <div className='col-6'>
                <label htmlFor="joiningDate" className="form-label">Joining Date</label>
                <input type="date" className="form-control" id="joiningDate" value={member.joiningDate} onChange={handleChange} name='joiningDate' placeholder="Joining Date" />
              </div> 
              <div className='col-6'>
                <label htmlFor="basicSalary" className="form-label">Basic Salary</label>
                <input type="number" className="form-control" id="basicSalary" value={member.basicSalary} onChange={handleChange} name='basicSalary' placeholder="Salary" />
              </div> 
            </div>
            <div className='text-center mt-4'>
              <button className='btn dashboard-btn px-4 py-2'>Update Member</button>
            </div>
          </form>
        </div>  
    </>
  )
}

export default UpdateMember
