import React, { useEffect, useState } from 'react'
import { BsFilterLeft } from "react-icons/bs";
import $, { event } from "jquery";
import axios from 'axios';

function BacklinkFilter() {
  const [selectedProject, setSelectedProject] = useState("All");
  const [ProjectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [sitemapURL, setSitemapURL] = useState("");
  const [anchorTags, setAnchorTags] = useState("");
  const [projectURL, setprojectURL] = useState("");
  const [projects, setProjects] = useState([]);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState("Select Sub Page");
  const [OutReacherTeamId, setOutReacherTeamId] = useState("");
  const [OutReacherName, setOutReacherName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [DealType, setDealType] = useState("");
  const [LinkType, setLinkType] = useState("");
  const [backLinkType, setBackLinkType] = useState("Free");

  const handleSelect = (project) => {
    if (project) {
      setProjectId(project.id);
      setSelectedProject(project.projectName);
      setProjectName(project.projectName);
      setSitemapURL(project.sitemapURL);
      setprojectURL(project.projectURL);
      setAnchorTags(project.anchorTags)
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
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://207.180.203.98:5030/api/projects", {
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

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://207.180.203.98:5030/api/team-members");
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

  $(document).ready(function () {
    $('.js-example-basic-single').select2();
  });

  return (
    <div className='filters p-2'>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button px-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <span> <BsFilterLeft /> Filter</span>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body p-0">
              <div className='row mb-3'>
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">View By Duration</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Last 24 hours</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">Last 24 hours</li>
                    <li className="dropdown-item">Last 7 days</li>
                    <li className="dropdown-item">Last 30 days</li>
                    <li className="dropdown-item">Last 3 month</li>
                    <li className="dropdown-item">Custom Duration</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">Deal Type</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{DealType || "Deal Type"}</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item" onClick={() => setDealType("All")}>All</li>
                    <li className="dropdown-item" onClick={() => setDealType("Guest Post")}>Guest Post</li>
                    <li className="dropdown-item" onClick={() => setDealType("Link Insertion")}>Link Insertion</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">Select By project</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{selectedProject}</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">All</li>
                    {projects.map((project, index) => (
                      <li className="dropdown-item" key={index} onClick={() => { handleSelect(project); fetchSitemapURL(project); }}>{project.projectName}</li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">Select Sub Page</label>
                  <select className="form-select js-example-basic-single" id="subPageSelect" onChange={(e) => setSelectedUrl(e.target.value)}>
                    <option value="">Select Sub Page</option>
                    {urls.length > 0 ? (
                      urls.map((url, index) => (
                        <option key={index} value={url}>
                          {url}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Pages found</option>
                    )}
                  </select>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">Select By Anchor</label>
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
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">Select Out Reacher</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{OutReacherName || "Select out reacher"}</a>
                  <ul className="dropdown-menu">
                    {
                      outReachers.map((member, index) => (
                        <li className="dropdown-item" key={index} onClick={() => { setOutReacherTeamId(member.id); setOutReacherName(member.memberName) }}>{member.memberName}</li>
                      ))
                    }
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                  <label htmlFor="">Link Type</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{LinkType || "Link Type"}</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item" onClick={() => setLinkType("Follow")}>Follow</li>
                    <li className="dropdown-item" onClick={() => setLinkType("NoFollow")}>NoFollow</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                  <label htmlFor="">Backlink Cost</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{backLinkType}</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item" onClick={() => setBackLinkType("Free")}>Free</li>
                    <li className="dropdown-item" onClick={() => setBackLinkType("Paid")}>Paid</li>
                    <li className="dropdown-item" onClick={() => setBackLinkType("Exchange")}>Exchange</li>
                  </ul>
                </div>
                <div className='col-lg-2 priceRange'>
                  <label htmlFor="">Price Range</label>
                  <div className='d-flex align-items-center'>
                    <input className='form-control' placeholder='Min' type="number" name="" id="" disabled={backLinkType === "Free"} />
                    <span className='me-1 mb-2'>-</span>
                    <input className='form-control' placeholder='Max' type="number" name="" id="" disabled={backLinkType === "Free"}/>
                  </div>
                </div>
                <div className='col-lg-2 priceRange'>
                  <label htmlFor="">Domain Traffic</label>
                  <div className='d-flex align-items-center'>
                    <input className='form-control' placeholder='Min' type="number" name="" id="" />
                    <span className='me-1 mb-2'>-</span>
                    <input className='form-control' placeholder='Max' type="number" name="" id="" />
                  </div>
                </div>
                <div className='col-lg-2 priceRange'>
                  <label htmlFor="">USA Traffic</label>
                  <div className='d-flex align-items-center'>
                    <input className='form-control' placeholder='Min' type="number" name="" id="" />
                    <span className='me-1 mb-2'>-</span>
                    <input className='form-control' placeholder='Max' type="number" name="" id="" />
                  </div>
                </div>
                <div className='col-lg-2 priceRange'>
                  <label htmlFor="">Moz Dr Range</label>
                  <div className='d-flex align-items-center'>
                    <input className='form-control' placeholder='Min' type="number" name="" id="" />
                    <span className='me-1 mb-2'>-</span>
                    <input className='form-control' placeholder='Max' type="number" name="" id="" />
                  </div>
                </div>
                <div className='col-lg-2 priceRange'>
                  <label htmlFor="">Moz DA Range</label>
                  <div className='d-flex align-items-center'>
                    <input className='form-control' placeholder='Min' type="number" name="" id="" />
                    <span className='me-1 mb-2'>-</span>
                    <input className='form-control' placeholder='Max' type="number" name="" id="" />
                  </div>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                  <label htmlFor="">Language</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">English</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">English</li>
                    <li className="dropdown-item">Spanish</li>
                    <li className="dropdown-item">Chinese</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                  <label htmlFor="">TLD</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">.com</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">.com</li>
                    <li className="dropdown-item">.edu</li>
                    <li className="dropdown-item">.net</li>
                  </ul>
                </div>
              </div>
              <button className='btn dashboard-btn py-2 px-3'>Apply Filters</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BacklinkFilter
