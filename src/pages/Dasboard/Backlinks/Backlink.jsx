import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BacklinkFilter from './BacklinkFilter'
import { FaPlus } from 'react-icons/fa6'
import { FaEye } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import Badge from 'react-bootstrap/Badge';
import { MdOutlineContentCopy } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import axios from 'axios'
import { Dropdown } from 'react-bootstrap';
import $ from "jquery";

function Backlink() {
  const [backlinks, setBacklinks] = useState([]);
  const [filteredBacklinks, setFilteredBacklinks] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedSort, setSelectedSort] = useState('Low to high price');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;



  useEffect(() => {
    const fetchBacklinks = async () => {
      try {
        const response = await axios.get(`http://207.180.203.98:5030/api/Backlinks`, {
          headers: {
            "Accept": "text/plain"
          }
        });
        console.log("Fetched backlinks:", response.data);
        setBacklinks(response.data);
        setFilteredBacklinks(response.data)
      } catch (error) {
        console.log("Error fetching backlinks:", error);
      }
    };

    fetchBacklinks();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num;
  };

  // Sort the filtered backlinks after applying filters
  const sortedBacklinks = useMemo(() => {
    let sorted = [...filteredBacklinks];
    switch (selectedSort) {
      case 'Low to high price':
        return sorted.sort((a, b) => a.price - b.price);
      case 'High to low price':
        return sorted.sort((a, b) => b.price - a.price);
      case 'Deal traffic Low to High':
        return sorted.sort((a, b) => a.domainTraffic - b.domainTraffic);
      case 'Deal traffic High to Low':
        return sorted.sort((a, b) => b.domainTraffic - a.domainTraffic);
      case 'Deal US traffic Low to High':
        return sorted.sort((a, b) => a.usTraffic - b.usTraffic);
      case 'Live link traffic High to Low':
        return sorted.sort((a, b) => b.pageTraffic - a.pageTraffic);
      case 'Live link traffic Low to High':
        return sorted.sort((a, b) => a.pageTraffic - b.pageTraffic);
      default:
        return sorted;
    }
  }, [selectedSort, filteredBacklinks]);

  const currentItems = useMemo(() => {
    return sortedBacklinks.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedBacklinks, indexOfFirstItem, indexOfLastItem]);

  const totalPages = Math.ceil(filteredBacklinks.length / itemsPerPage);

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email)
      .then(() => {
        $(".email-copied").removeClass("d-none");
        $(".email-copied").text(`Copied: ${email}`);
        setTimeout(() => {
          $(".email-copied").addClass("d-none");
        }, 3000);
      })
      .catch(error => {
        console.error(`Could not copy emial: `, error);
      });
  };

  const applyFilters = (filterValues) => {
    setFilters(filterValues);

    let filtered = [...backlinks];

    if (filterValues.dealType) {
      filtered = filtered.filter(b => b.dealType?.toLowerCase() === filterValues.dealType.toLowerCase());
    }

    if (filterValues.linkType) {
      filtered = filtered.filter(b => b.linkType === filterValues.linkType);
    }

    if (filterValues.projectName) {
      filtered = filtered.filter(b => b.project?.projectName?.toLowerCase() === filterValues.projectName.toLowerCase());
    }

    if (filterValues.selectedUrl) {
      filtered = filtered.filter(b => b.pageUrl === filterValues.selectedUrl);
    }

    if (filterValues.selectedTag) {
      filtered = filtered.filter(b => (b.anchorTags || "").split(',').map(t => t.trim()).includes(filterValues.selectedTag));
    }

    if (filterValues.OutReacherName) {
      filtered = filtered.filter((link) => link.outReacher?.id === filterValues.OutReacherName
      );
    }

    if (filterValues.selectedLang && filterValues.selectedLang !== "SelectLanguage") {
      filtered = filtered.filter(b => b.language === filterValues.selectedLang);
    }

    if (filterValues.selectedTld && filterValues.selectedTld !== "TLD") {
      filtered = filtered.filter(b => {
        try {
          const url = new URL(b.dealLink);
          const hostnameParts = url.hostname.split('.');
          const tld = hostnameParts[hostnameParts.length - 1];
          return tld === filterValues.selectedTld.toLowerCase();
        } catch (e) {
          return false;
        }
      });
    }

    if (filterValues.backlinkType === "Free") {
      filtered = filtered.filter(b => parseFloat(b.price || 0) === 0);
    } else {
      if (filterValues.minPrice || filterValues.maxPrice) {
        filtered = filtered.filter(b => {
          const price = parseFloat(b.price || 0);
          return (!filterValues.minPrice || price >= parseFloat(filterValues.minPrice)) &&
            (!filterValues.maxPrice || price <= parseFloat(filterValues.maxPrice));
        });
      }
    }

    if (filterValues.domainTrafficMin || filterValues.domainTrafficMax) {
      filtered = filtered.filter(b => {
        const traffic = parseFloat(b.domainTraffic || 0);
        return (!filterValues.domainTrafficMin || traffic >= parseFloat(filterValues.domainTrafficMin)) &&
          (!filterValues.domainTrafficMax || traffic <= parseFloat(filterValues.domainTrafficMax));
      });
    }

    if (filterValues.usTrafficMin || filterValues.usTrafficMax) {
      filtered = filtered.filter(b => {
        const traffic = parseFloat(b.usTraffic || 0);
        return (!filterValues.usTrafficMin || traffic >= parseFloat(filterValues.usTrafficMin)) &&
          (!filterValues.usTrafficMax || traffic <= parseFloat(filterValues.usTrafficMax));
      });
    }

    if (filterValues.mozDaMin || filterValues.mozDaMax) {
      filtered = filtered.filter(b => {
        const da = parseFloat(b.domainAuthority || 0); // Updated here
        return (!filterValues.mozDaMin || da >= parseFloat(filterValues.mozDaMin)) &&
          (!filterValues.mozDaMax || da <= parseFloat(filterValues.mozDaMax));
      });
    }

    if (filterValues.mozDrMin || filterValues.mozDrMax) {
      filtered = filtered.filter(b => {
        const dr = parseFloat(b.domainRating || 0); // Adjust based on actual API field name
        return (!filterValues.mozDrMin || dr >= parseFloat(filterValues.mozDrMin)) &&
          (!filterValues.mozDrMax || dr <= parseFloat(filterValues.mozDrMax));
      });
    }
    console.log("Filtered Results:", filtered);
    setFilteredBacklinks(filtered);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (count) => {
    setItemsPerPage(count);
    setCurrentPage(1);  // Reset to the first page when items per page changes
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-between p-2'>
        <h3>Backlinks</h3>
        <Link className='btn dashboard-btn' to="/backlink/addBacklink"><FaPlus /> Add Backlink</Link>
      </div>
      <div className='px-2'>
        <BacklinkFilter onApplyFilters={applyFilters} />
      </div>
      <div className='alert alert-danger p-2 col-3 mx-auto text-center email-copied d-none'>Email Copied</div>
      <div className='d-lg-flex justify-content-between p-3 align-items-center'>
        <p className='result'>Results: <span>{`${sortedBacklinks.length} sites`}</span></p>
        <div className='d-lg-flex align-items-center'>
          <div className='d-flex align-items-center viewTime'>
            <span>Sort by:</span>
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                {selectedSort}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {['Low to high price', 'High to low price', 'Deal traffic Low to High', 'Deal traffic High to Low', 'Deal US traffic Low to High', 'Live link traffic High to Low', 'Live link traffic Low to High'].map((label, i) => (
                  <Dropdown.Item key={i} onClick={() => setSelectedSort(label)}>
                    {label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="table-responsive px-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Our Projects</th>
              <th scope="col">Deal Link</th>
              <th scope="col">Live Link</th>
              <th scope="col">Link Type</th>
              <th scope="col">Out Reacher</th>
              <th scope="col">Approved By</th>
              <th scope="col">Content by</th>
              <th scope="col">Deal Type</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className='backlinks'>
            {
              sortedBacklinks.length > 0 ? (
                currentItems.map((backlink, index) => (
                  <tr key={index}>
                    <td className='d-flex flex-column'>
                      <a className='projectlink' target='_blank' href={backlink.project?.projectURL}>{backlink.project?.projectURL}</a>
                      <a className="sublink" href="#"> {"/" + backlink.subPage.replace(backlink.project.projectURL, '')} </a>
                      <div className='mt-1'>
                        <span><Badge>{backlink.anchorTag}</Badge></span>
                      </div>
                    </td>
                    <td>
                      <a className='sublink' href="#">{backlink.dealLink}</a>
                      <div className='mt-1'>
                        <span><Badge>{`DA: ${backlink.domainAuthority}`}</Badge></span>
                        <span><Badge>{`DR: ${backlink.domainRating}`}</Badge></span>
                        <span><Badge>{`Total Pages: ${formatNumber(backlink.totalPages)}`}</Badge></span>
                        <span><Badge>{`Domain Traffic: ${formatNumber(backlink.domainTraffic)}`}</Badge></span>
                        <span><Badge>{`US Traffic: ${formatNumber(backlink.usTraffic)}`}</Badge></span>
                      </div>
                    </td>
                    <td>
                      <a className='livelink breaklink link-container' href="#">{backlink.liveLink}</a>
                      <div className='mt-1'>
                        <span><Badge>{`Page Traffic: ${formatNumber(backlink.pageTraffic)}`}</Badge></span>
                        <span><Badge>{`First Seen: ${backlink.firstSeen}`}</Badge></span>
                        <span><Badge>{`Last Seen: ${backlink.lastSeen}`}</Badge></span>
                        <span><Badge className='lostdate'>{`Lost Date: ${backlink.lostDate}`}</Badge></span>
                      </div>
                    </td>
                    <td>
                      <span><Badge>{backlink.linkType}</Badge></span>
                    </td>
                    <td>
                      <p>{backlink.outReacher?.memberName}</p>
                      <span className='breaklink outReacherEmail'>{backlink.outReacher?.email} <MdOutlineContentCopy onClick={() => copyToClipboard(backlink.outReacher.email)} /></span>
                    </td>
                    <td>
                      <span>{backlink.approver?.memberName}</span>
                    </td>
                    <td>
                      <p>{backlink.contentWriter?.memberName}</p>
                      <a target='_blank' href={backlink.contentLink}>Article Link <FaExternalLinkAlt /></a>
                    </td>
                    <td>
                      <p>{backlink.dealType}</p>
                    </td>
                    <td>{`${formatNumber(backlink.price)}`}</td>
                    <td className='d-flex'>
                      <Link to={`/backlink/viewbacklink/${backlink.id}`} className='btn dashboard-btn'><FaEye /> View</Link>
                      <Link to={`/backlink/updatebacklink/${backlink.id}`} className='btn dashboard-btn'><MdEdit /> Edit</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    <h5>No Backlinks Found</h5>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <div className='d-flex align-items-center justify-content-between'>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {/* Prev Button */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  <IoIosArrowBack /> Prev
                </button>
              </li>

              {/* Show page numbers (1, 2, 3 only) */}
              {[1, 2, 3].map((pageNum) => (
                pageNum <= totalPages && (
                  <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                      {pageNum}
                    </button>
                  </li>
                )
              ))}

              {/* Show "..." if more pages exist */}
              {totalPages > 3 && <li className="page-item disabled"><span className="page-link">...</span></li>}

              {/* Next Button */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next <IoIosArrowForward />
                </button>
              </li>
            </ul>
          </nav>
          <div className='d-flex align-items-center viewTime'>
            <span>Show:</span>
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {itemsPerPage} Per Page
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                {[10, 20, 30, 40].map((count) => (
                  <li key={count} className="dropdown-item" onClick={() => handleItemsPerPageChange(count)}>
                    {count} Per Page
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Backlink
