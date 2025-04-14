import React, { useEffect, useState } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import defaultImage from '../../../assets/image/Teamimage.png'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ViewMember() {
  const { id } = useParams();  // Get the Member ID from URL
  const [member, setMember] = useState({
    memberName: "",
    designation: "",
    joiningDate: "",
    basicSalary: "",
    email: "",
    profilePicture: null,
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://207.180.203.98:5059/api/team-members/${id}`);
        // console.log("API Response", response.data);
        if (response.data) {
          const profilePath = response.data.profilePictureUrl ? `http://207.180.203.98:5059/api/team-members/profile-picture?profilePath=${response.data.profilePictureUrl}` : defaultImage;
          // console.log("path:", profilePath);
          setMember({
            memberName: response.data.memberName || "N/A",
            designation: response.data.designation || "N/A",
            email: response.data.email || "N/A",
            joiningDate: response.data.joiningDate
              ? new Date(response.data.joiningDate).toLocaleDateString()
              : "N/A",
            basicSalary: response.data.basicSalary ? `${response.data.basicSalary}` : "N/A",
            profilePicture: profilePath,
          });
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMember();
  }, [id]);
  return (
    <>
      <Breadcrumb className='p-2 pb-0'>
        <Breadcrumb.Item href='/team'>Team</Breadcrumb.Item>
        <Breadcrumb.Item active>{member.memberName}</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Card className='flex-row justify-content-between p-3'>
          <Card.Img variant="top" className='mt-3' src={member.profilePicture} />
          <Card.Body className='ps-4 d-flex'>
            <div>
              <p>Email: <span>{member.email}</span></p>
              <p>Name: <span>{member.memberName}</span></p>
              <p>Joining Date: <span>{member.joiningDate}</span></p>
            </div>
            <div className='ps-5'>
              <p>Designation: <span>{member.designation}</span></p>
              <p>Basic Salary: <span>{member.basicSalary}</span></p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default ViewMember
