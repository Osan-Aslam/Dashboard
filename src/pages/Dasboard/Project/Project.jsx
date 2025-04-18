import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import $, { error, event } from "jquery";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Project() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [backlinks, setBacklinks] = useState([]);



  useState(() => {
    const response = axios.get(`http://207.180.203.98:5030/api/projects`, {
      headers: {
        'Accept': '*/*',
      }
    }).then(response => {
      setProjects(response.data);
    }).catch(error => {
      console.error("Error fetching Projects:", error);
    });
  }, []);

  const DeletProject = async (id) => {
    try {
      const response = await axios.delete(`http://207.180.203.98:5030/api/projects/${id}`, {
        headers: {
          "Accept": "*/*",
        }
      });
      console.log("Delete Successful: ", response);
      setProjects(projects.filter((project) => project.id !== id)); // update UI
    } catch (error) {
      console.error("Failed to delete: ", error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedProjectId(id);
    setShow(true);
  };

  const handleDeleteCancel = () => {
    setShow(false);
    setSelectedProjectId(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProjectId) {
      await DeletProject(selectedProjectId);
      setShow(false);
      setSelectedProjectId(null);
    }
  };

  $(document).ready(function () {
    $(".dropdown-item").click(function () {
      let value = $(this).text();
      $(this).closest(".dropdown").find(".dropdown-toggle").text(value);
    });
  });

  useEffect(() => {
    const fetchBacklinks = async () => {
      try {
        const response = await axios.get('http://207.180.203.98:5030/api/Backlinks', {
          headers: {
            'Accept': 'text/plain',
          },
        });
        console.log('Response: ', response.data);
        setBacklinks(response.data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    fetchBacklinks();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num;
  };

  return (
    <>

      <div className='main-project'>
        <div className='d-flex justify-content-between p-3'>
          <h3>Our Projects</h3>
          <Link className='btn dashboard-btn' to="/project/addProject"><FaPlus /> Add New Projects</Link>
        </div>
        <div className='d-lg-flex justify-content-between p-3 align-items-center'>
          <p className='result'>Results: <span>{projects.length} sites</span></p>
          <div className='d-lg-flex align-items-center'>
            <div className='searchTag'>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} name="" placeholder='Search Project' />
              <CiSearch />
            </div>
            <div className='d-flex align-items-center viewTime'>
              <span>View By Duration:</span>
              <div className="dropdown">
                <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> Last 24 hours</button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li className="dropdown-item">Last 7 days</li>
                  <li className="dropdown-item">Last 30 days</li>
                  <li className="dropdown-item">Last 3 month</li>
                  <li className="dropdown-item">Custom Duration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive px-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Our Projects</th>
              <th scope="col">Total Backlinks</th>
              <th scope="col">Total Guest Posts</th>
              <th scope="col">Total Link Insertions</th>
              <th scope="col">Follow</th>
              <th scope="col">No Follow</th>
              <th scope="col">Lost Links</th>
              <th scope="col">Total Paid</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              projects.length > 0 ? (
                projects.filter(project => project.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((project, index) => {
                    const projectBacklinks = backlinks.filter(b => b.project?.id === project.id);
                    const totalBacklinks = projectBacklinks.length;
                    const guestPosts = projectBacklinks.filter(b => b.dealType === "Guest Post").length;
                    const linkInsertions = projectBacklinks.filter(b => b.dealType === "Link Insertion").length;
                    const followLinks = projectBacklinks.filter(b => b.linkType === "Follow").length;
                    const noFollowLinks = projectBacklinks.filter(b => b.linkType === "Nofollow").length;
                    const lostLinks = projectBacklinks.filter(b => b.lostDate !== null).length;
                    const totalPaid = projectBacklinks.reduce((sum, b) => sum + (b.price || 0), 0);

                    return (
                      <tr key={index}>
                        <td className='d-flex flex-column'>
                          {project.projectName}
                          <a href={project.projectURL} target='_blank' rel='noopener noreferrer'>{project.projectURL}</a>
                        </td>
                        <td>{totalBacklinks}</td>
                        <td>{guestPosts}</td>
                        <td>{linkInsertions}</td>
                        <td>{followLinks}</td>
                        <td>{noFollowLinks}</td>
                        <td>{lostLinks}</td>
                        <td>${formatNumber(totalPaid.toFixed(2))}</td>
                        <td className='d-flex'>
                          <Link to={`/project/viewproject/${project.id}`}>
                            <button className='btn dashboard-btn'><FaEye /> View</button>
                          </Link>
                          <Link to={`/project/updateproject/${project.id}`}>
                            <button className='btn dashboard-btn'><MdEdit /> Edit</button>
                          </Link>
                          <button className='btn dashboard-btn delete-project' onClick={() => DeletProject(project.id)}><MdDelete /> Delete</button>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <p>no Projects</p>
              )
            }
          </tbody>
        </table>
        <div className='d-flex align-items-center justify-content-between'>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#"><IoIosArrowBack /> Prev</a></li>
              <li className="page-item"><a className="page-link active" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next <IoIosArrowForward /></a></li>
            </ul>
          </nav>
          <div className='d-flex align-items-center viewTime'>
            <span>Show:</span>
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">10 Per Page</button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li className="dropdown-item">20 Per Page</li>
                <li className="dropdown-item">30 Per Page</li>
                <li className="dropdown-item">40 Per Page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleDeleteCancel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You Want To Delete this Member?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>Close</Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Project