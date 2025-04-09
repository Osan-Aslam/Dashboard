import React, { use, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import $, { event } from "jquery";
import axios from 'axios';


function AddBacklink() {
  const [projectId, setProjectId] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [dealLink, setDealLink] = useState("");
  const [domainAuthority, setDomainAuthority] = useState("");
  const [domainRating, setDomainRating] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [domainTraffic, setDomainTraffic] = useState("");
  const [usTraffic, setUsTraffic] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [pageTraffic, setPageTraffic] = useState("");
  const [firstSeen, setFirstSeen] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [linkType, setLinkType] = useState("");
  const [outReacherName, setOutReacherName] = useState("");
  const [outReacherEmail, setOutReacherEmail] = useState("");
  const [approverName, setApproverName] = useState("");
  const [approverTeamId, setApproverTeamId] = useState("");
  const [contentWriterTeamId, setContentWriterTeamId] = useState("");
  const [contentWriterName, setcontentWriterName] = useState("");
  const [contentLink, setContentLink] = useState("");
  const [dealType, setDealType] = useState("");
  const [backlinkType, setBacklinkType] = useState("Free");
  const [price, setPrice] = useState("Free");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("Select Project");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("projectUrl", projectUrl);
    formData.append("projectName", projectName);
    formData.append("dealLink", dealLink);
    formData.append("domainAuthority", domainAuthority);
    formData.append("domainRating", domainRating);
    formData.append("totalPages", totalPages);
    formData.append("domainTraffic", domainTraffic);
    formData.append("usTraffic", usTraffic);
    formData.append("liveLink", liveLink);
    formData.append("pageTraffic", pageTraffic);
    formData.append("firstSeen", firstSeen);
    formData.append("lastSeen", lastSeen);
    formData.append("lostDate", lostDate);
    formData.append("linkType", linkType);
    formData.append("outReacherName", outReacherName);
    formData.append("outReacherEmail", outReacherEmail);
    formData.append("approverName", approverName);
    formData.append("approverTeamId", approverTeamId);
    formData.append("contentWriterTeamId", contentWriterTeamId);
    formData.append("contentWriterName", contentWriterName);
    formData.append("contentLink", contentLink);
    formData.append("dealType", dealType);
    formData.append("price", price);

    try {
      const response = await axios.post(`http://207.180.203.98:5030/api/Backlinks`, formData, {
        headers: {
          "Accept": "text/plain",
          "Content-Type": "application/json"
        }
      });
      console.log("Response: ", response);
    } catch (error) {
      console.error("Error: ", error);
      setError(error.message || "Something went wrong");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://207.180.203.98:5030/api/projects", {
          headers: { "Accept": "*/*" },
        });
        setProjects(response.data);
      } catch (error) {
        const errorMsg = console.error("Failed to fetch projects:", error);
        setError(errorMsg);
      }
    };

    fetchProjects();
  }, []);
  const handleSelect = (projectName) => {
    setSelectedProject(projectName);
    // optionally do more stuff with the selected project
  };

  const [rows, setRows] = useState([{ id: 1 }]);
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1 }]);
  }
  const removeRow = (id) => {
    setRows(rows.filter(row => row.id !== id))
  }

  return (
    <div className='mt-4 ms-3'>
      <h3>Add New Backlink</h3>
      <div className='col-lg-8 mx-auto mt-4 add-project add-backlink p-4'>
        {error && (
          <div className='alert alert-danger p-2 col-5 mx-auto text-center'>
            {error}
          </div>
        )}
        <form className='w-100' onSubmit={handleSubmit}>
          <span className='details pb-2'>Projects ({rows.length})</span>
          {rows.map((row, index) => (
            <div key={row.id} className='row flex-lg-nowrap all-dropdown mb-3'>
              <div className="dropdown d-flex flex-column col-lg-4">
                <div className='d-flex align-items-center justify-content-between'>
                  <label htmlFor="">Select Project</label>
                  <FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-lg-none' />
                </div>
                <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{selectedProject}</a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">All</li>
                  {projects.map((project, index) => (
                    <li className="dropdown-item" key={index} onClick={() => handleSelect(project.projectName)}>{project.projectName}</li>
                  ))}
                </ul>
              </div>
              <div className="dropdown d-flex flex-column col-lg-4">
                <label htmlFor="">Select Sub Page</label>
                <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select Sub Page</a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">Action</li>
                  <li className="dropdown-item">Another action</li>
                  <li className="dropdown-item">Something else here</li>
                </ul>
              </div>
              <div className="dropdown d-flex flex-column col-lg-4">
                <div className='d-flex justify-content-between'>
                  <label htmlFor="">Select Anchor Text</label>
                  <FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-none d-lg-block' />
                </div>
                <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select Anchor Text</a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">Action</li>
                  <li className="dropdown-item">Another action</li>
                  <li className="dropdown-item">Something else here</li>
                </ul>
              </div>
            </div>
          ))}
          <div className='d-flex align-items-center add-more mb-3'>
            <span onClick={addRow} className='mb-2'><FaPlus className='add-icon' />Add More</span>
          </div>
          <span className='details'>Other Details</span>
          <div className='row mt-2'>
            <div className="dropdown d-flex flex-column col-6">
              <label htmlFor="">Deal Type</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{dealType || "Deal Type"}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => setDealType("All")}>All</li>
                <li className="dropdown-item" onClick={() => setDealType("Guest Post")}>Guest Post</li>
                <li className="dropdown-item" onClick={() => setDealType("Link Insertion")}>Link Insertion</li>
              </ul>
            </div>
            <div className="dropdown d-flex flex-column col-6">
              <label htmlFor="">Link Type</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{linkType || "Link Type"}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => setLinkType("Follow")}>Follow</li>
                <li className="dropdown-item" onClick={() => setLinkType("Nofollow")}>Nofollow</li>
              </ul>
            </div>
            <div className="inputs d-flex flex-column col-12 mt-2">
              <label htmlFor="">Deal Link</label>
              <input type="text" onChange={(e) => setDealLink(e.target.value)} placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-1">
              <label htmlFor="">Domain Traffic</label>
              <input type="text" onChange={(e) => setDomainTraffic(e.target.value)} placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-1">
              <label htmlFor="">US Traffic</label>
              <input type="text" onChange={(e) => setUsTraffic(e.target.value)} placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">DR</label>
              <input type="text" onChange={(e) => setDomainRating(e.target.value)} placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">DA</label>
              <input type="text" onChange={(e) => setDomainAuthority(e.target.value)} placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">Total Pages</label>
              <input type="text" onChange={(e) => setTotalPages(e.target.value)} placeholder='Enter total pages' className='form-control' name="" id="" />
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-2">
              <label htmlFor="">Out Reacher</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{outReacherName || "Select out reacher"}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => setOutReacherName("All")}>All</li>
                <li className="dropdown-item" onClick={() => setOutReacherName("Qadeer khan")}>Qadeer khan</li>
                <li className="dropdown-item" onClick={() => setOutReacherName("Ali Murtaza")}>Ali Murtaza</li>
                <li className="dropdown-item" onClick={() => setOutReacherName("Sajjal Shafique")}>Sajjal Shafique</li>
                <li className="dropdown-item" onClick={() => setOutReacherName("Ibrar Ibrahim")}>Ibrar Ibrahim</li>
                <li className="dropdown-item" onClick={() => setOutReacherName("Moazzam awan")}>Moazzam awan</li>
              </ul>
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-1">
              <label htmlFor="">Approved By</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{approverName || "Approved By"}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => setApproverName("All")}>All</li>
                <li className="dropdown-item" onClick={() => setApproverName("Qadeer khan")}>Qadeer khan</li>
                <li className="dropdown-item" onClick={() => setApproverName("Ali Murtaza")}>Ali Murtaza</li>
                <li className="dropdown-item" onClick={() => setApproverName("Sajjal Shafique")}>Sajjal Shafique</li>
                <li className="dropdown-item" onClick={() => setApproverName("Ibrar Ibrahim")}>Ibrar Ibrahim</li>
                <li className="dropdown-item" onClick={() => setApproverName("Moazzam awan")}>Moazzam awan</li>
              </ul>
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-1">
              <label htmlFor="">Content Writer</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{contentWriterName || "Content Writer"}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => setcontentWriterName("All")}>All</li>
                <li className="dropdown-item" onClick={() => setcontentWriterName("Qadeer khan")}>Qadeer khan</li>
                <li className="dropdown-item" onClick={() => setcontentWriterName("Ali Murtaza")}>Ali Murtaza</li>
                <li className="dropdown-item" onClick={() => setcontentWriterName("Sajjal Shafique")}>Sajjal Shafique</li>
                <li className="dropdown-item" onClick={() => setcontentWriterName("Ibrar Ibrahim")}>Ibrar Ibrahim</li>
                <li className="dropdown-item" onClick={() => setcontentWriterName("Moazzam awan")}>Moazzam awan</li>
              </ul>
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-3">
              <label htmlFor="">Backlink Cost</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{backlinkType}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => setBacklinkType("Free")}>Free</li>
                <li className="dropdown-item" onClick={() => setBacklinkType("Paid")}>Paid</li>
              </ul>
            </div>
            <div className="inputs d-flex flex-column col-6 mt-3">
              <label htmlFor="">Price</label>
              <input type="text" onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' className='form-control' name="" id="" disabled={backlinkType === "Free"} />
            </div>
          </div>
          <div className='text-center mt-3'>
            <button className='btn dashboard-btn px-4 py-2' type='submit'>Add Backlink</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBacklink
