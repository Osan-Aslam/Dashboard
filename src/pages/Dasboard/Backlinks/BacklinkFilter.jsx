import React, { useEffect, useRef, useState } from 'react'
import { BsFilterLeft } from "react-icons/bs";
import $ from "jquery";
import axios from 'axios';
import 'select2';

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
  const [OutReacherTeamId, setOutReacherTeamId] = useState("");
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
  const outReacherRef = useRef();

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
      const response = await axios.get(`http://207.180.203.98:5059/api/projects/pages/${encodeURIComponent(project.sitemapURL)}`, {
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
      $('.js-example-basic-single').each(function () {
        const $el = $(this);
        if ($el.data('select2')) {
          $el.off('change').select2('destroy');
        }
      });
    };
  }, [projects, handleSelect]);

  useEffect(() => {
    const $outReacher = $(outReacherRef.current);

    // Initialize Select2
    $outReacher.select2();

    // Change event
    $outReacher.on('change', function () {
      const id = $(this).val();
      const member = outReachers.find((m) => m.id.toString() === id);
      if (member) {
        setOutReacherTeamId(member.id);
        setOutReacherName(member.memberName);
      }
    });

    // Cleanup
    return () => {
      if ($outReacher.data('select2')) {
        $outReacher.off('change').select2('destroy');
      }
    };
  }, [outReachers, setOutReacherTeamId, setOutReacherName]);

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
                    <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{dealType || "Deal Type"}</a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={() => setdealType("All")}>All</li>
                      <li className="dropdown-item" onClick={() => setdealType("Guest Post")}>Guest Post</li>
                      <li className="dropdown-item" onClick={() => setdealType("Link Insertion")}>Link Insertion</li>
                    </ul>
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select By project</label>
                    <select className="form-select js-example-basic-single">
                      <option value="">{selectedProject || "All"}</option>
                      {projects.map((project, index) => (
                        <option key={index} value={project.id}>
                          {project.projectName}
                        </option>
                      ))}
                    </select>
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
                    <select className="form-select js-example-basic-single" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                      <option value="">Select Anchor Text</option>
                      {anchorTags.length > 0 ? (
                        anchorTags.map((tag, index) => (
                          <option className="dropdown-item" key={index} value={tag}>
                            {tag}
                          </option>
                        ))
                      ) : (
                        <option className="dropdown-item" disabled> No Tags Found</option>
                      )}
                    </select>
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select Out Reacher</label>
                    <select id="out-reacher" className="form-select js-example-basic-single" value={OutReacherName} onChange={(e) => setOutReacherName(e.target.value)}>
                      <option value="">Select Out Reacher</option>
                      {outReachers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.memberName}
                        </option>
                      ))}
                    </select>
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
                      <input className='form-control' placeholder='Max' type="number" value={mozDrMax} onChange={(e) => setMozDrMax(e.target.value)}  />
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
                    <select id="languageSelect" className="form-select js-example-basic-single" value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
                      <option value="SelectLanguage">Select Language</option>
                      {languages.map((lang, idx) => (
                        <option key={idx} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                    <label htmlFor="">TLD</label>
                    <select className="js-example-basic-single form-select" value={selectedTld} onChange={(e) => setSelectedTld(e.target.value)}>
                      <option value="">Select TLD</option>
                      {tlds.map((tld, index) => (
                        <option key={index} value={tld}>
                          {tld}
                        </option>
                      ))}
                    </select>
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
