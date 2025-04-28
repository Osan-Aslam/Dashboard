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

  useEffect(() => {
    const fetchBacklinks = async () => {
      try {
        const response = await axios.get(`http://207.180.203.98:5030/api/Backlinks`, {
          headers: {
            "Accept": "text/plain"
          }
        });
        console.log("Fetched backlinks:", response.data);
        setBacklinks(response.data || []);
        setFilteredBacklinks(response.data || []);
      } catch (error) {
        console.log("Error fetching backlinks:", error);
      }
    };
    fetchBacklinks();
  }, []);

  const formatNumber = (num) => {
    if (num == null || isNaN(num)) return 'N/A';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num;
  };

  const sortedBacklinks = useMemo(() => {
    let sorted = [...filteredBacklinks];
    switch (selectedSort) {
      case 'Low to high price':
        return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case 'High to low price':
        return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case 'Deal traffic Low to High':
        return sorted.sort((a, b) => (a.domainTraffic ?? 0) - (b.domainTraffic ?? 0));
      case 'Deal traffic High to Low':
        return sorted.sort((a, b) => (b.domainTraffic ?? 0) - (a.domainTraffic ?? 0));
      case 'Deal US traffic Low to High':
        return sorted.sort((a, b) => (a.usTraffic ?? 0) - (b.usTraffic ?? 0));
      case 'Live link traffic High to Low':
        return sorted.sort((a, b) => (b.pageTraffic ?? 0) - (a.pageTraffic ?? 0));
      case 'Live link traffic Low to High':
        return sorted.sort((a, b) => (a.pageTraffic ?? 0) - (b.pageTraffic ?? 0));
      default:
        return sorted;
    }
  }, [selectedSort, filteredBacklinks]);

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
        console.error(`Could not copy email: `, error);
      });
  };

  const applyFilters = (filterValues) => {
    setFilters(filterValues);
    let filtered = [...backlinks];

    // ... (your existing filter logic; it already guards undefined fields by using optional chaining)

    setFilteredBacklinks(filtered);
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
            {sortedBacklinks.length > 0 ? (
              sortedBacklinks.map((b, idx) => (
                <tr key={idx}>
                  <td className='d-flex flex-column'>
                    {b.project?.projectURL
                      ? <a className='projectlink' target='_blank' rel="noopener noreferrer" href={b.project.projectURL}>{b.project.projectURL}</a>
                      : <span>N/A</span>}
                    <a className="sublink" href="#">
                      {b.subPage && b.project?.projectURL
                        ? "/" + b.subPage.replace(b.project.projectURL, '')
                        : 'N/A'}
                    </a>
                    <div className='mt-1'>
                      <Badge>{b.anchorTag ?? 'N/A'}</Badge>
                    </div>
                  </td>

                  <td>
                    {b.dealLink
                      ? <a className='sublink' href="#">{b.dealLink}</a>
                      : <span>N/A</span>}
                    <div className='mt-1'>
                      <Badge>{`DA: ${b.domainAuthority != null ? b.domainAuthority : 'N/A'}`}</Badge>
                      <Badge>{`DR: ${b.domainRating != null ? b.domainRating : 'N/A'}`}</Badge>
                      <Badge>{`Total Pages: ${formatNumber(b.totalPages)}`}</Badge>
                      <Badge>{`Domain Traffic: ${formatNumber(b.domainTraffic)}`}</Badge>
                      <Badge>{`US Traffic: ${formatNumber(b.usTraffic)}`}</Badge>
                    </div>
                  </td>

                  <td>
                    {b.liveLink
                      ? <a className='livelink breaklink link-container' href="#">{b.liveLink}</a>
                      : <span>N/A</span>}
                    <div className='mt-1'>
                      <Badge>{`Page Traffic: ${formatNumber(b.pageTraffic)}`}</Badge>
                      <Badge>{`First Seen: ${b.firstSeen ?? 'N/A'}`}</Badge>
                      <Badge>{`Last Seen: ${b.lastSeen ?? 'N/A'}`}</Badge>
                      <Badge className='lostdate'>{`Lost Date: ${b.lostDate ?? 'N/A'}`}</Badge>
                    </div>
                  </td>

                  <td>
                    <Badge>{b.linkType ?? 'N/A'}</Badge>
                  </td>

                  <td>
                    <p>{b.outReacher?.memberName ?? 'N/A'}</p>
                    {b.outReacher?.email
                      ? (
                        <span className='breaklink outReacherEmail'>
                          {b.outReacher.email}
                          <MdOutlineContentCopy onClick={() => copyToClipboard(b.outReacher.email)} />
                        </span>
                      )
                      : <span>N/A</span>}
                  </td>

                  <td>
                    <span>{b.approver?.memberName ?? 'N/A'}</span>
                  </td>

                  <td>
                    <p>{b.contentWriter?.memberName ?? 'N/A'}</p>
                    {b.contentLink
                      ? <a target='_blank' rel="noopener noreferrer" href={b.contentLink}>Article Link <FaExternalLinkAlt /></a>
                      : <span>N/A</span>}
                  </td>

                  <td>
                    <p>{b.dealType ?? 'N/A'}</p>
                  </td>

                  <td>{b.price != null ? `$${formatNumber(b.price)}` : 'N/A'}</td>

                  <td className='d-flex'>
                    {b.id
                      ? (
                        <>
                          <Link to={`/backlink/viewbacklink/${b.id}`} className='btn dashboard-btn'><FaEye /> View</Link>
                          <Link to={`/backlink/updatebacklink/${b.id}`} className='btn dashboard-btn'><MdEdit /> Edit</Link>
                        </>
                      )
                      : <span>N/A</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className='text-center'>
                  <h5>No Backlinks Found</h5>
                </td>
              </tr>
            )}
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
    </>
  )
}

export default Backlink
