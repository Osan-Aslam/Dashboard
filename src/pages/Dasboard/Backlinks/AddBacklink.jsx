import React, { use, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import $, { event } from "jquery";
import axios from 'axios';
import 'select2';
import 'select2/dist/css/select2.min.css';
import { useNavigate } from 'react-router-dom';

function AddBacklink() {
  const [ProjectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [dealLink, setDealLink] = useState("");
  const [DomainAuthority, setDomainAuthority] = useState("");
  const [DomainRating, setDomainRating] = useState("");
  const [TotalPages, setTotalPages] = useState("");
  const [DomainTraffic, setDomainTraffic] = useState("");
  const [USTraffic, setUSTraffic] = useState("");
  const [LiveLink, setLiveLink] = useState("");
  const [PageTraffic, setPageTraffic] = useState("");
  const [LinkType, setLinkType] = useState("");
  const [ApproverTeamId, setApproverTeamId] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [ContentWriterTeamId, setContentWriterTeamId] = useState("");
  const [OutReacherTeamId, setOutReacherTeamId] = useState("");
  const [ContentLink, setContentLink] = useState("");
  const [DealType, setDealType] = useState("");
  const [backLinkType, setBackLinkType] = useState("Free");
  const [Price, setPrice] = useState("0");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("Select Project");
  const [error, setError] = useState("");
  const [urls, setUrls] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("Select Sub Page");
  const [sitemapURL, setSitemapURL] = useState("");
  const [anchorTags, setAnchorTags] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [projectURL, setprojectURL] = useState("");
  const [ContentWriterName, setContentWriterName] = useState("");
  const [OutReacherName, setOutReacherName] = useState("");
  const [ApproverTeamName, setapproverTeamName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!LiveLink || !LiveLink.startsWith("http")) {
      setError("Please provide a valid Live Link (must start with http or https)");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const url = new URL(LiveLink);
    const dealLink = `${url.protocol}//${url.hostname}/`;

    const formData = new FormData();
    formData.append("ProjectId", ProjectId);
    formData.append("DomainAuthority", DomainAuthority);
    formData.append("DomainRating", DomainRating);
    formData.append("TotalPages", TotalPages);
    formData.append("DomainTraffic", DomainTraffic);
    formData.append("USTraffic", USTraffic);
    formData.append("LiveLink", LiveLink);
    formData.append("PageTraffic", PageTraffic);
    formData.append("LinkType", LinkType);
    formData.append("OutReacherTeamId", OutReacherTeamId);
    formData.append("ApproverTeamId", ApproverTeamId);
    formData.append("ContentWriterTeamId", ContentWriterTeamId);
    formData.append("ContentLink", ContentLink);
    formData.append("DealType", DealType);
    formData.append("Price", Price);
    formData.append("AnchorTag", selectedTag);
    formData.append("SubPage", selectedUrl);
    console.log("submitted" + selectedUrl);

    console.log("Sending Data: ", Object.fromEntries(formData.entries()));

    try {
      const response = await axios.post(`http://207.180.203.98:5059/api/Backlinks`, formData, {
        headers: {
          "Accept": "text/plain",
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Response: ", response);
      navigate("/backlink");
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
        const response = await axios.get("http://207.180.203.98:5059/api/projects", {
          headers: { "Accept": "*/*" },
        });
        const sitemapURL = response.data.map(project => project.sitemapURL)
        // console.log(sitemapURL)
        setProjects(response.data);
      } catch (error) {
        const errorMsg = console.error("Failed to fetch projects:", error);
        setError(errorMsg);
      }
    };

    fetchProjects();
  }, []);

  const handleSelect = (project) => {
    if (project) {
      console.log("Selected Project:", project)
      // setSelectedUrl("");
      setProjectId(project.id);
      setSelectedProject(project.projectName);
      setProjectName(project.projectName);
      setSitemapURL(project.sitemapURL);
      setprojectURL(project.projectURL);
      setAnchorTags(project.anchorTags)
      // console.log(project.anchorTags);
      // console.log("Selected sitemap URL:", project.sitemapURL);
      if (project.sitemapURL) {
        fetchSitemapURL(project);
      } else {
        console.error("Sitemap URL is not defined for the selected project.");
      }
    }
  };

  // fetch Sitemap URL 

  const fetchSitemapURL = async (project) => {
    try {
      setUrls([]);
      console.log(project.sitemapURL)
      const response = await axios.get(`http://207.180.203.98:5030/api/projects/pages/${encodeURIComponent(project.sitemapURL)}`, {
        headers: {
          "Accept": "*/*",
        }
      });
      const locUrls = response.data.urls.map(item => item.loc);
      setUrls(locUrls);
    } catch (error) {
      console.error("Error while fetching Sitemap", error);
      const errorMsg = error?.response?.data?.message || error.message || "Something when wrong";
      setError(errorMsg);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://207.180.203.98:5059/api/team-members");
        setTeamMembers(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMembers();
  }, []);
  const contentWriters = teamMembers.filter(member =>
    member.designation === "Content Writer"
  );
  const outReachers = teamMembers.filter(member =>
    member.designation === "Out Reacher"
  );
  const ApproverName = teamMembers.filter(member =>
    member.designation === "Manager"
  );

  const [rows, setRows] = useState([{ id: 1 }]);
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1 }]);
  }
  const removeRow = (id) => {
    setRows(rows.filter(row => row.id !== id))
  }

  const handleBackLinkTypeChange = (type) => {
    setBackLinkType(type);
    if (type === "Free") {
      setPrice("0");
    }
  };

  useEffect(() => {
    // Initialize select2
    $('.js-example-basic-single').select2();

    // Bind the change event
    $('.js-example-basic-single').on('change', function () {
      const selectedProjectId = $(this).val();
      const selectedProject = projects.find(
        (p) => p.id.toString() === selectedProjectId
      );
      handleSelect(selectedProject);
    });

    // Cleanup
    return () => {
      $('.js-example-basic-single').off('change');
      // $('.js-example-basic-single').select2('destroy');
    };
  }, [projects, handleSelect]);

  useEffect(() => {
    const $outReacher = $('#out-reacher');
    const $approver = $('#approver');
    const $contentWriter = $('#content-writer');
  
    // Initialize Select2
    $outReacher.select2();
    $approver.select2();
    $contentWriter.select2();
  
    // Bind change events
    $outReacher.on('change', function () {
      const id = $(this).val();
      const member = outReachers.find((m) => m.id.toString() === id);
      if (member) {
        setOutReacherTeamId(member.id);
        setOutReacherName(member.memberName);
      }
    });
  
    $approver.on('change', function () {
      const id = $(this).val();
      const member = ApproverName.find((m) => m.id.toString() === id);
      if (member) {
        setApproverTeamId(member.id);
        setapproverTeamName(member.memberName);
      }
    });
  
    $contentWriter.on('change', function () {
      const id = $(this).val();
      const member = contentWriters.find((m) => m.id.toString() === id);
      if (member) {
        setContentWriterTeamId(member.id);
        setContentWriterName(member.memberName);
      }
    });
  
    // Cleanup
    return () => {
      const destroyIfInitialized = ($el) => {
        if ($el.hasClass('select2-hidden-accessible')) {
          $el.off('change').select2();
        }
      };
  
      destroyIfInitialized($outReacher);
      destroyIfInitialized($approver);
      destroyIfInitialized($contentWriter);
    };
  }, [
    outReachers,
    ApproverName,
    contentWriters,
    setOutReacherTeamId,
    setOutReacherName,
    setApproverTeamId,
    setapproverTeamName,
    setContentWriterTeamId,
    setContentWriterName,
  ]);

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
                <select className="form-select js-example-basic-single">
                  <option value="">{selectedProject}</option>
                  {projects.map((project, index) => (
                    <option key={index} value={project.id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dropdown d-flex flex-column col-lg-4">
                <label htmlFor="">Select Sub Page</label>
                <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {selectedUrl ? selectedUrl : "Select Sub Page"}
                </a>
                <ul className="dropdown-menu">
                  {urls.length > 0 ? (
                    urls.map((url, index) => (
                      <li 
                        className="dropdown-item" 
                        key={index} 
                        onClick={() => {
                          setSelectedUrl(url);
                        }}
                      >
                        {url}
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item">No Pages Found</li>
                  )}
                </ul>
              </div>
              <div className="dropdown d-flex flex-column col-lg-4">
                <div className='d-flex justify-content-between'>
                  <label htmlFor="">Select Anchor Text</label>
                  <FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-none d-lg-block' />
                </div>
                <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{selectedTag ? selectedTag : "Select Anchor Text"}</a>
                <ul className="dropdown-menu">
                  {anchorTags.length > 0 ? (
                    anchorTags.map((tag, index) => (
                      <li className="dropdown-item" key={index} onClick={() => setSelectedTag(tag)}>{tag}</li>
                    ))
                  ) : (
                    <li className="dropdown-item">No Tags Found</li>
                  )}
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
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{DealType || "Deal Type"}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => setDealType("All")}>All</li>
                <li className="dropdown-item" onClick={() => setDealType("Guest Post")}>Guest Post</li>
                <li className="dropdown-item" onClick={() => setDealType("Link Insertion")}>Link Insertion</li>
              </ul>
            </div>
            <div className="dropdown d-flex flex-column col-6">
              <label htmlFor="">Link Type</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{LinkType || "Link Type"}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => setLinkType("Follow")}>Follow</li>
                <li className="dropdown-item" onClick={() => setLinkType("NoFollow")}>NoFollow</li>
              </ul>
            </div>
            <div className="inputs d-flex flex-column col-12 mt-2">
              <label htmlFor="">Live Link</label>
              <input type="text" onChange={(e) => setLiveLink(e.target.value)} placeholder='Enter Live link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-1">
              <label htmlFor="">Domain Traffic</label>
              <input type="text" onChange={(e) => setDomainTraffic(e.target.value)} placeholder='Enter Domain Traffic' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-1">
              <label htmlFor="">US Traffic</label>
              <input type="text" onChange={(e) => setUSTraffic(e.target.value)} placeholder='Enter US Traffic' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">DR</label>
              <input type="text" onChange={(e) => setDomainRating(e.target.value)} placeholder='Enter Domain Rating' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">DA</label>
              <input type="text" onChange={(e) => setDomainAuthority(e.target.value)} placeholder='Enter Domain Authority' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">Total Pages</label>
              <input type="text" onChange={(e) => setTotalPages(e.target.value)} placeholder='Enter total pages' className='form-control' name="" id="" />
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-2">
              <label>Out Reacher</label>
              <select id="out-reacher" className="form-select js-example-basic-single">
                <option value="">Select Out Reacher</option>
                {outReachers.map((member, index) => (
                  <option key={index} value={member.id}>
                    {member.memberName}
                  </option>
                ))}
              </select>
            </div>

            <div className="dropdown d-flex flex-column col-6 mt-1">
              <label>Approved By</label>
              <select id="approver" className="form-select js-example-basic-single">
                <option value="">Select Approved By</option>
                {ApproverName.map((member, index) => (
                  <option key={index} value={member.id}>
                    {member.memberName}
                  </option>
                ))}
              </select>
            </div>

            <div className="dropdown d-flex flex-column col-6 mt-1">
              <label>Content Writer</label>
              <select id="content-writer" className="form-select js-example-basic-single">
                <option value="">Select Content Writer</option>
                {contentWriters.map((member, index) => (
                  <option key={index} value={member.id}>
                    {member.memberName}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputs d-flex flex-column col-6 mt-3">
              <label htmlFor="">Page Traffic</label>
              <input type="text" onChange={(e) => setPageTraffic(e.target.value)} placeholder='Enter Page Traffic' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-3">
              <label htmlFor="">Content Link</label>
              <input type="text" onChange={(e) => setContentLink(e.target.value)} placeholder='Content Link' className='form-control' name="" id="" />
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-2">
              <label htmlFor="">Backlink Cost</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{backLinkType}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => handleBackLinkTypeChange("Free")}>Free</li>
                <li className="dropdown-item" onClick={() => handleBackLinkTypeChange("Paid")}>Paid</li>
              </ul>
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">Price</label>
              <input type="text" value={Price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' className='form-control' name="" id="" disabled={backLinkType === "Free"} />
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
