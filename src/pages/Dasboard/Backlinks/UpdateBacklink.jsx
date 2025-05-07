import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCircleXmark, FaPlus } from 'react-icons/fa6';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'

function UpdateBacklink() {
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
	const [backLinkType, setBackLinkType] = useState("");
	const [Price, setPrice] = useState("");
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
	const [languages, setLanguages] = useState([]);
	const [selectedLang, setSelectedLang] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();

	// fetch single backlink by id and update them 
	useEffect(() => {
		const fetchBacklink = async () => {
			try {
				const response = await axios.get(`http://207.180.203.98:5030/api/Backlinks/${id}`, {
					headers: {
						"Accept": "text/plain",
					}
				});
				console.log("Response Data: ", response.data);
				const backlink = response.data;
				setProjectName(backlink.project.projectName);
				setSelectedUrl(backlink.subPage);
				setSelectedTag(backlink.anchorTag);
				setDealType(backlink.dealType);
				setLinkType(backlink.linkType);
				setLiveLink(backlink.liveLink);
				setDomainTraffic(backlink.domainTraffic);
				setUSTraffic(backlink.usTraffic);
				setDomainRating(backlink.domainRating);
				setDomainAuthority(backlink.domainAuthority);
				setTotalPages(backlink.totalPages);
				setOutReacherTeamId(backlink.outReacher.id);
				setApproverTeamId(backlink.approver.id);
				setContentWriterTeamId(backlink.contentWriter.id);
				setPageTraffic(backlink.pageTraffic);
				setContentLink(backlink.contentLink);
				setBackLinkType(backlink.cost);
				setPrice(backlink.price);
				setDealLink(backlink.dealLink);
				setSelectedProject(backlink.project.projectName);
				setSelectedTag(backlink.anchorTag);
				setSelectedUrl(backlink.subPage);
				setSelectedLang(backlink.language);
			} catch (error) {
				console.log("Error Msg: ", error);
			}
		};

		fetchBacklink();
	}, [id]);


  // submit form and update them
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

		console.log("Sending Data: ", Object.fromEntries(formData.entries()));

		try {
			const response = await axios.patch(`http://207.180.203.98:5030/api/Backlinks/${id}`, formData, {
				headers: {
					"Accept": "*/*",
					"Content-Type": "multipart/form-data"
				}
			});
			console.log("Response: ", response.data);
			navigate("/backlink");
		} catch (error) {
			console.error("Error: ", error);
			setError(error.message || "Something went wrong");
			setTimeout(() => {
				setError("");
			}, 3000);
		}
	}
	// fetch projects from api
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

	// handle and select projects and its other value
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

	// fetch Sitemap URL from api
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
//  fetch teamMembers from api
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

	// add multiple row for add backlinks
	const [rows, setRows] = useState([{ id: 1 }]);
	const addRow = () => {
		setRows([...rows, { id: rows.length + 1 }]);
	}
	const removeRow = (id) => {
		setRows(rows.filter(row => row.id !== id))
	}

	// fetch languages from json file
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

	const projectOptions = [
		{ value: 'All', label: 'All' },
		...projects.map(project => ({
			value: project.projectName,
			label: project.projectName
		}))
	];

	const handleChange = (selectedOption) => {
		setSelectedProject(selectedOption.label);
		if (selectedOption.label !== 'All') {
			handleSelect(projects.find(p => p.projectName === selectedOption.label));
			fetchSitemapURL(projects.find(p => p.projectName === selectedOption.label));
		}
	};

	const urlOptions = urls.length > 0
		? urls.map(url => ({ value: url, label: url }))
		: [{ value: '', label: 'No Pages Found', isDisabled: true }];

	const handleUrlChange = (selectedOption) => {
		setSelectedUrl(selectedOption.value);
	};

	const anchorTagOptions = Array.isArray(anchorTags) && anchorTags.length > 0
		? anchorTags.map(tag => ({ value: tag, label: tag }))
		: [{ value: '', label: 'No Tags Found', isDisabled: true }];

	const handleTagChange = (selectedOption) => {
		setSelectedTag(selectedOption.value);
	};
	const outReacherOptions = outReachers.map(member => ({
		value: member.id,
		label: member.memberName
	}));

	const handleOutReacherChange = (selectedOption) => {
		setOutReacherTeamId(selectedOption.value);
		setOutReacherName(selectedOption.label);
	};
	const approverOptions = ApproverName.map(member => ({
		value: member.id,
		label: member.memberName
	}));

	const handleApproverChange = (selectedOption) => {
		setApproverTeamId(selectedOption.value);
		setapproverTeamName(selectedOption.label);
	};

	const contentWriterOptions = contentWriters.map(member => ({
		value: member.id,
		label: member.memberName
	}));

	const handleContentWriterChange = (selectedOption) => {
		setContentWriterTeamId(selectedOption.value);
		setContentWriterName(selectedOption.label);
	};

	useEffect(() => {
		if (teamMembers.length > 0) {
			const outReacher = teamMembers.find(member => member.id === OutReacherTeamId);
			const approver = teamMembers.find(member => member.id === ApproverTeamId);
			const writer = teamMembers.find(member => member.id === ContentWriterTeamId);

			if (outReacher) setOutReacherName(outReacher.memberName);
			if (approver) setapproverTeamName(approver.memberName);
			if (writer) setContentWriterName(writer.memberName);
		}
	}, [teamMembers, OutReacherTeamId, ApproverTeamId, ContentWriterTeamId]);
	return (
		<div>
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
									<Select className='selectDropdown' options={projectOptions} onChange={handleChange} value={{ label: selectedProject, value: selectedProject }} classNamePrefix="select" />
								</div>
								<div className="dropdown d-flex flex-column col-lg-4">
									<label htmlFor="">Select Sub Page</label>
									<Select className='selectDropdown' options={urlOptions} onChange={handleUrlChange} value={selectedUrl ? { value: selectedUrl, label: selectedUrl } : null} placeholder="Select Sub Page" classNamePrefix="select" />
								</div>
								<div className="dropdown d-flex flex-column col-lg-4">
									<div className='d-flex justify-content-between'>
										<label htmlFor="">Select Anchor Text</label>
										<FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-none d-lg-block' />
									</div>
									<Select className='selectDropdown' options={anchorTagOptions} onChange={handleTagChange} value={selectedTag ? { value: selectedTag, label: selectedTag } : null} placeholder="Select Anchor Text" classNamePrefix="select" />
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
								<a className="btn dropdown-toggle" href="#" value={DealType} role="button" data-bs-toggle="dropdown" aria-expanded="false">{DealType || "Deal Type"}</a>
								<ul className="dropdown-menu">
									<li className="dropdown-item" onClick={() => setDealType("All")}>All</li>
									<li className="dropdown-item" onClick={() => setDealType("Guest Post")}>Guest Post</li>
									<li className="dropdown-item" onClick={() => setDealType("Link Insertion")}>Link Insertion</li>
								</ul>
							</div>
							<div className="dropdown d-flex flex-column col-6">
								<label htmlFor="">Link Type</label>
								<a className="btn dropdown-toggle" href="#" value={LinkType} role="button" data-bs-toggle="dropdown" aria-expanded="false">{LinkType || "Link Type"}</a>
								<ul className="dropdown-menu">
									<li className="dropdown-item" onClick={() => setLinkType("Follow")}>Follow</li>
									<li className="dropdown-item" onClick={() => setLinkType("NoFollow")}>NoFollow</li>
								</ul>
							</div>
							<div className="inputs d-flex flex-column col-12 mt-2">
								<label htmlFor="liveLink">Live Link</label>
								<input type="text" value={LiveLink} onChange={(e) => setLiveLink(e.target.value)} placeholder='Enter Live link' className='form-control' />
							</div>
							<div className="inputs d-flex flex-column col-6 mt-1">
								<label htmlFor="domainTraffic">Domain Traffic</label>
								<input type="number" value={DomainTraffic} onChange={(e) => setDomainTraffic(e.target.value)} placeholder='Enter Domain Traffic' className='form-control' name="" id="" />
							</div>
							<div className="inputs d-flex flex-column col-6 mt-1">
								<label htmlFor="uSTraffic">US Traffic</label>
								<input type="number" value={USTraffic} onChange={(e) => setUSTraffic(e.target.value)} placeholder='Enter US Traffic' className='form-control' name="" id="" />
							</div>
							<div className="inputs d-flex flex-column col-6 mt-2">
								<label htmlFor="domainRating">DR</label>
								<input type="number" value={DomainRating} onChange={(e) => setDomainRating(e.target.value)} placeholder='Enter Domain Ratting' className='form-control' name="" id="" />
							</div>
							<div className="inputs d-flex flex-column col-6 mt-2">
								<label htmlFor="domainAuthority">DA</label>
								<input type="number" value={DomainAuthority} onChange={(e) => setDomainAuthority(e.target.value)} placeholder='Enter Domain Authority' className='form-control' name="" id="" />
							</div>
							<div className="inputs d-flex flex-column col-6 mt-2">
								<label htmlFor="totalPages">Total Pages</label>
								<input type="number" value={TotalPages} onChange={(e) => setTotalPages(e.target.value)} placeholder='Enter total pages' className='form-control' name="" id="" />
							</div>
							<div className="dropdown d-flex flex-column col-6 mt-2">
								<label htmlFor="uutReacher">Out Reacher</label>
								<Select options={outReacherOptions} onChange={handleOutReacherChange} value={OutReacherName ? { value: outReachers.find(m => m.memberName === OutReacherName)?.id, label: OutReacherName } : null} placeholder="Select Out Reacher"
									className="selectDropdown" classNamePrefix="select"
								/>
							</div>
							<div className="dropdown d-flex flex-column col-6 mt-1">
								<label htmlFor="">Approved By</label>
								<Select options={approverOptions} onChange={handleApproverChange} value={ApproverTeamName ? { value: ApproverName.find(m => m.memberName === ApproverTeamName)?.id, label: ApproverTeamName } : null} placeholder="Approved By"
									className="selectDropdown" classNamePrefix="select"
								/>
							</div>
							<div className="dropdown d-flex flex-column col-6 mt-1">
								<label htmlFor="">Content Writer</label>
								<Select options={contentWriterOptions} onChange={handleContentWriterChange} value={ContentWriterName ? { value: contentWriters.find(m => m.memberName === ContentWriterName)?.id, label: ContentWriterName } : null} placeholder="Content Writer"
									className="selectDropdown" classNamePrefix="select"
								/>
							</div>
							<div className="inputs d-flex flex-column col-6 mt-3">
								<label htmlFor="">Page Traffic</label>
								<input type="text" value={PageTraffic} onChange={(e) => setPageTraffic(e.target.value)} placeholder='Enter Page Traffic' className='form-control' name="" id="" />
							</div>
							<div className="inputs d-flex flex-column col-6 mt-3">
								<label htmlFor="">Content Link</label>
								<input type="text" value={ContentLink} onChange={(e) => setContentLink(e.target.value)} placeholder='Content Link' className='form-control' name="" id="" />
							</div>
							<div className="dropdown d-flex flex-column col-6 mt-2">
								<label htmlFor="">Backlink Cost</label>
								<button className="btn dropdown-toggle" value={backLinkType} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{backLinkType}</button>
								<ul className="dropdown-menu">
									<li className="dropdown-item" onClick={() => setBackLinkType("Free")}>Free</li>
									<li className="dropdown-item" onClick={() => setBackLinkType("Paid")}>Paid</li>
								</ul>
							</div>
							<div className="inputs d-flex flex-column col-6 mt-2">
								<label htmlFor="">Price</label>
								<input type="number" value={Price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' className='form-control' name="" id="" disabled={backLinkType === "Free"} />
							</div>
							<div className="dropdown d-flex flex-column col-6 mt-2">
								<label htmlFor="">Language</label>
								<Select className="selectDropdown" id="languageSelect" options={languages.map(lang => ({ value: lang.code, label: lang.name }))} value={selectedLang} onChange={(option) => setSelectedLang(option)} placeholder="Select Language" menuPlacement="auto" />
							</div>
						</div>
						<div className='text-center mt-3'>
							<button className='btn dashboard-btn px-4 py-2' type='submit'>Update Backlink</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default UpdateBacklink
