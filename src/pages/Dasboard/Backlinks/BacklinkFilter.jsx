import React, { useEffect, useRef, useState } from 'react'
import { BsFilterLeft } from "react-icons/bs";
import $ from "jquery";
import axios from 'axios';
import 'select2';
import Select from 'react-select'

function BacklinkFilter({ onApplyFilters }) {
  const [selectedProject, setSelectedProject] = useState("");
  const [ProjectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [sitemapURL, setSitemapURL] = useState("");
  const [anchorTags, setAnchorTags] = useState([]);
  const [projectURL, setprojectURL] = useState("");
  const [projects, setProjects] = useState([]);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [OutReacherName, setOutReacherName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [dealType, setdealType] = useState("");
  const [linkType, setlinkType] = useState("");
  const [backlinkType, setBacklinkType] = useState("Free");
  const [tlds, setTlds] = useState([]);
  const [selectedTld, setSelectedTld] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [domainTrafficMin, setDomainTrafficMin] = useState("");
  const [domainTrafficMax, setDomainTrafficMax] = useState("");
  const [usTrafficMin, setUsTrafficMin] = useState("");
  const [usTrafficMax, setUsTrafficMax] = useState("");
  const [mozDrMin, setMozDrMin] = useState("");
  const [mozDrMax, setMozDrMax] = useState("");
  const [mozDaMin, setMozDaMin] = useState("");
  const [mozDaMax, setMozDaMax] = useState("");
  const [durationFilter, setDurationFilter] = useState("Last 24 hours");

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
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMembers();
  }, []);
  const outReachers = teamMembers.filter(member =>
    member.designation === "Out Reacher"
  );

  const formattedProjects = projects.map(project => ({
    value: project.id,
    label: project.projectName,
  }));

  useEffect(() => {
    fetch('/tlds.txt')
      .then((res) => res.text())
      .then((text) => {
        const list = text
          .split(',')
          .map(item => item.trim())
          .filter(Boolean);
        setTlds(list);
      });
  }, []);

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

  const handleApplyFilters = () => {
    const filterValues = {
      dealType,
      linkType,
      projectName,
      selectedUrl,
      selectedTag,
      OutReacherName,
      selectedLang,
      selectedTld,
      priceMin,
      priceMax,
      domainTrafficMin,
      domainTrafficMax,
      usTrafficMin,
      usTrafficMax,
      mozDaMin,
      mozDaMax,
      mozDrMin,
      mozDrMax,
      backlinkType,
      durationFilter,
    };
    console.log(filterValues);
    onApplyFilters(filterValues); // Call parent function
  };


  return (
    <>

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
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> {durationFilter} </button>
                    <ul className="dropdown-menu">
                      {["Last 24 hours", "Last 7 days", "Last 30 days", "Last 3 month", "Custom Duration"].map(option => (
                        <li key={option} className="dropdown-item" onClick={() => setDurationFilter(option)}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Deal Type</label>
                    <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{dealType || "Deal Type"}</a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={() => setdealType("All")}>All</li>
                      <li className="dropdown-item" onClick={() => setdealType("Guest Post")}>Guest Post</li>
                      <li className="dropdown-item" onClick={() => setdealType("Link Insertion")}>Link Insertion</li>
                    </ul>
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select By project</label>
                    <Select className='selectDropdown' options={formattedProjects} onChange={(option) => { const selected = projects.find(p => p.id === option.value); handleSelect(selected); }} placeholder="Select a project" />
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select Sub Page</label>
                    <Select className='selectDropdown' options={urls.map(url => ({ value: url, label: url }))} onChange={(option) => setSelectedUrl(option.value)} placeholder="Select a page URL" />
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select By Anchor</label>
                    <Select className="selectDropdown" options={anchorTags.length > 0 ? anchorTags.map(tag => ({ value: tag, label: tag })) : []}
                      value={selectedTag ? { value: selectedTag, label: selectedTag } : null}
                      onChange={(option) => setSelectedTag(option?.value || "")}
                      placeholder="Select Anchor Text"
                    />
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select Out Reacher</label>
                    <Select className="selectDropdown" options={outReachers.map(member => ({ value: member.id, label: member.memberName }))}
                      onChange={(option) => setOutReacherName(option)}
                      placeholder="Select Out Reacher"
                    />
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                    <label htmlFor="">Link Type</label>
                    <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{linkType || "Link Type"}</a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={() => setlinkType("Follow")}>Follow</li>
                      <li className="dropdown-item" onClick={() => setlinkType("NoFollow")}>NoFollow</li>
                    </ul>
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                    <label htmlFor="">Backlink Cost</label>
                    <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{backlinkType}</a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={() => setBacklinkType("Free")}>Free</li>
                      <li className="dropdown-item" onClick={() => setBacklinkType("Paid")}>Paid</li>
                      <li className="dropdown-item" onClick={() => setBacklinkType("Exchange")}>Exchange</li>
                    </ul>
                  </div>
                  <div className='col-lg-2 priceRange'>
                    <label htmlFor="">Price Range</label>
                    <div className='d-flex align-items-center'>
                      <input className='form-control' placeholder='Min' type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} disabled={backlinkType === "Free"} />
                      <span className='me-1 mb-2'>-</span>
                      <input className='form-control' placeholder='Max' type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} disabled={backlinkType === "Free"} />
                    </div>
                  </div>
                  <div className='col-lg-2 priceRange'>
                    <label htmlFor="">Domain Traffic</label>
                    <div className='d-flex align-items-center'>
                      <input className='form-control' placeholder='Min' type="number" value={domainTrafficMin} onChange={(e) => setDomainTrafficMin(e.target.value)} />
                      <span className='me-1 mb-2'>-</span>
                      <input className='form-control' placeholder='Max' type="number" value={domainTrafficMax} onChange={(e) => setDomainTrafficMax(e.target.value)} />
                    </div>
                  </div>
                  <div className='col-lg-2 priceRange'>
                    <label htmlFor="">USA Traffic</label>
                    <div className='d-flex align-items-center'>
                      <input className='form-control' placeholder='Min' type="number" value={usTrafficMin} onChange={(e) => setUsTrafficMin(e.target.value)} />
                      <span className='me-1 mb-2'>-</span>
                      <input className='form-control' placeholder='Max' type="number" value={usTrafficMax} onChange={(e) => setUsTrafficMax(e.target.value)} />
                    </div>
                  </div>
                  <div className='col-lg-2 priceRange'>
                    <label htmlFor="">Moz Dr Range</label>
                    <div className='d-flex align-items-center'>
                      <input className='form-control' placeholder='Min' type="number" value={mozDrMin} onChange={(e) => setMozDrMin(e.target.value)} />
                      <span className='me-1 mb-2'>-</span>
                      <input className='form-control' placeholder='Max' type="number" value={mozDrMax} onChange={(e) => setMozDrMax(e.target.value)} />
                    </div>
                  </div>
                  <div className='col-lg-2 priceRange'>
                    <label htmlFor="">Moz DA Range</label>
                    <div className='d-flex align-items-center'>
                      <input className='form-control' placeholder='Min' type="number" value={mozDaMin} onChange={(e) => setMozDaMin(e.target.value)} />
                      <span className='me-1 mb-2'>-</span>
                      <input className='form-control' placeholder='Max' type="number" value={mozDaMax} onChange={(e) => setMozDaMax(e.target.value)} />
                    </div>
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                    <label htmlFor="">Language</label>
                    <Select className="selectDropdown" id="languageSelect" options={languages.map(lang => ({ value: lang.code, label: lang.name }))}
                      value={selectedLang}
                      onChange={(option) => setSelectedLang(option)}
                      placeholder="Select Language"
                    />
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                    <label htmlFor="">TLD</label>
                    <Select className="selectDropdown" options={tlds.map(tld => ({ value: tld, label: tld }))} value={selectedTld ? { value: selectedTld, label: selectedTld } : null}
                      onChange={(option) => setSelectedTld(option?.value || "")}
                      placeholder="Select TLD"
                    />
                  </div>
                </div>
                <button className='btn dashboard-btn py-2 px-3' onClick={handleApplyFilters}>Apply Filters</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BacklinkFilter;
