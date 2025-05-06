import React, { use, useEffect, useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'

function AddBacklink() {
  const [ProjectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
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
  const [selectedUrl, setSelectedUrl] = useState("");
  const [sitemapURL, setSitemapURL] = useState("");
  const [anchorTags, setAnchorTags] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [projectURL, setprojectURL] = useState("");
  const [ContentWriterName, setContentWriterName] = useState("");
  const [OutReacherName, setOutReacherName] = useState("");
  const [ApproverTeamName, setapproverTeamName] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");
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
      const response = await axios.post(`http://207.180.203.98:5030/api/Backlinks`, formData, {
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
        const response = await axios.get("http://207.180.203.98:5030/api/projects", {
          headers: { "Accept": "*/*" },
        });
        const sitemapURL = response.data.map(project => project.sitemapURL)
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
      setAnchorTags(Array.isArray(project.anchorTags) ? project.anchorTags : []);
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
        const response = await axios.get("http://207.180.203.98:5030/api/team-members");
        setTeamMembers(response.data);
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

  const formattedProjects = projects.map(project => ({
    value: project.id,
    label: project.projectName,
  }));

  useEffect(() => {
    fetch('/languages.json')
      .then((res) => res.json())
      .then((data) => {
        setLanguages(data);
        if (data.length > 0) {
          setSelectedLang(data.code);
        }
      })
      .catch((err) => console.error("Error fetching languages:", err));
  }, []);

  return (
    <div className='mt-4 ms-lg-3'>
      <h3>Add New Backlink</h3>
      <div className='col-lg-8 mx-auto mt-4 add-project add-backlink p-lg-4 p-2'>
        {error && (
          <div className='alert alert-danger p-2 col-5 mx-auto text-center'>
            {error}
          </div>
        )}
        <form className='w-100' onSubmit={handleSubmit}>
          <span className='details pb-2'>Projects ({rows.length})</span>
          {rows.map((row) => (
            <div key={row.id} className='row flex-lg-nowrap all-dropdown mb-3'>
              <div className="dropdown d-flex flex-column col-lg-4">
                <div className='d-flex align-items-center justify-content-between'>
                  <label htmlFor="">Select Project</label>
                  <FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-lg-none' />
                </div>
                <Select className='selectDropdown' options={formattedProjects} onChange={(option) => { const selected = projects.find(p => p.id === option.value); handleSelect(selected); }} placeholder="Select a project"/>
              </div>
              <div className="dropdown d-flex flex-column col-lg-4">
                <label htmlFor="">Select Sub Page</label>                
                <Select className='selectDropdown' options={urls.map(url => ({ value: url, label: url }))} onChange={(option) => setSelectedUrl(option.value)} placeholder="Select a page URL" />
              </div>
              <div className="dropdown d-flex flex-column col-lg-4">
                <div className='d-flex justify-content-between'>
                  <label htmlFor="">Select Anchor Text</label>
                  <FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-none d-lg-block' />
                </div>
                <Select className='selectDropdown' options={Array.isArray(anchorTags) ? anchorTags.map(tag => ({ value: tag, label: tag })) : []} onChange={(option) => setSelectedTag(option.value)} placeholder="Select an anchor tag" />
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
              <input type="text" onChange={(e) => setLiveLink(e.target.value)} placeholder='Enter Live link' className='form-control' required />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-1">
              <label htmlFor="">Domain Traffic</label>
              <input type="number" onChange={(e) => setDomainTraffic(e.target.value)} placeholder='Enter Domain Traffic' className='form-control' required />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-1">
              <label htmlFor="">US Traffic</label>
              <input type="number" onChange={(e) => setUSTraffic(e.target.value)} placeholder='Enter US Traffic' className='form-control' required />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">DR</label>
              <input type="number" onChange={(e) => setDomainRating(e.target.value)} placeholder='Enter Domain Rating' className='form-control' required />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">DA</label>
              <input type="number" onChange={(e) => setDomainAuthority(e.target.value)} placeholder='Enter Domain Authority' className='form-control' required />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">Total Pages</label>
              <input type="number" onChange={(e) => setTotalPages(e.target.value)} placeholder='Enter total pages' className='form-control' required />
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-2">
              <label>Out Reacher</label>
              <Select className="selectDropdown" options={outReachers.map(member => ({ value: member.id, label: member.memberName }))} onChange={(option) => setOutReacherName(option)} placeholder="Select Out Reacher" />
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-1">
              <label>Approved By</label>
              <Select className="selectDropdown" id="approver" options={ApproverName.map(member => ({ value: member.id, label: member.memberName }))} value={ApproverTeamName} onChange={(option) => setapproverTeamName(option)} placeholder="Select Approved By" />
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-1">
              <label>Content Writer</label>
              <Select className="selectDropdown" id="content-writer" options={contentWriters.map(member => ({ value: member.id, label: member.memberName }))} value={ContentWriterName} onChange={(option) => setContentWriterName(option)} placeholder="Select Content Writer" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-3">
              <label htmlFor="">Page Traffic</label>
              <input type="number" onChange={(e) => setPageTraffic(e.target.value)} placeholder='Enter Page Traffic' className='form-control' required />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-3">
              <label htmlFor="">Content Link</label>
              <input type="text" onChange={(e) => setContentLink(e.target.value)} placeholder='Content Link' className='form-control' required />
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-2">
              <label htmlFor="">Backlink Cost</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{backLinkType}</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => handleBackLinkTypeChange("Free")}>Free</li>
                <li className="dropdown-item" onClick={() => handleBackLinkTypeChange("Paid")}>Paid</li>
              </ul>
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-2">
              <label htmlFor="">Price</label>
              <input type="number" value={Price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' className='form-control' required disabled={backLinkType === "Free"} />
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-2">
              <label htmlFor="">Language</label>
              <Select className="selectDropdown" id="languageSelect" options={languages.map(lang => ({ value: lang.code, label: lang.name }))} value={selectedLang} onChange={(option) => setSelectedLang(option)} placeholder="Select Language" menuPlacement="auto"  />
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
