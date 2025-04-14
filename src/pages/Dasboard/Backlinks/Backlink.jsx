import React, { useEffect, useState } from 'react'
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

function Backlink() {
  const [backlinks, setBacklinks] = useState([]);

  useEffect(() => {
    const fetchBacklinks = async () => {
      try {
        const response = await axios.get(`http://207.180.203.98:5059/api/Backlinks`, {
          headers: {
            "Accept": "text/plain"
          }
        });
        console.log("Fetched backlinks:", response.data);
        setBacklinks(response.data);
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


  return (
    <>
      <div className='d-flex align-items-center justify-content-between p-2'>
        <h3>Backlinks</h3>
        <Link className='btn dashboard-btn' to="/backlink/addBacklink"><FaPlus /> Add Backlink</Link>
      </div>
      <div className='px-2'>
        <BacklinkFilter />
      </div>
      <div className='d-lg-flex justify-content-between p-3 align-items-center'>
        <p className='result'>Results: <span>{`${backlinks.length} sites`}</span></p>
        <div className='d-lg-flex align-items-center'>
          <div className='d-flex align-items-center viewTime'>
            <span>Sort by:</span>
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Low to high price</button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li className="dropdown-item">Low to high price</li>
                <li className="dropdown-item">High to low price</li>
                <li className="dropdown-item">Deal traffic Low to High</li>
                <li className="dropdown-item">Deal traffic High to Low</li>
                <li className="dropdown-item">Deal US traffic Low to High</li>
                <li className="dropdown-item">Live link traffic High to Low</li>
                <li className="dropdown-item">Live link traffic Low to High</li>
              </ul>
            </div>
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
              backlinks.length > 0 ? (
                backlinks.map((backlink, index) => (
                  <tr key={index}>
                    <td className='d-flex flex-column'>
                      <a className='projectlink' href="#">{backlink.project.projectURL}</a>
                      <a className='sublink' href="#">{backlink.project.projectName}</a>
                      <div className='mt-1'>
                        <span><Badge>{backlink.anchorTags}</Badge></span>
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
                      <a className='livelink breaklink' href="#">{backlink.liveLink}</a>
                      <div className='mt-1'>
                        <span><Badge>{`Page Traffic: ${formatNumber(backlink.pageTraffic)}`}</Badge></span>
                        <span><Badge>{`First Seen: ${backlink.firstSeen}` || ""}</Badge></span>
                        <span><Badge>{`Last Seen: ${backlink.lastSeen}` || ""}</Badge></span>
                        <span><Badge className='lostdate'>{`Lost Date: ${backlink.lostDate}` || ""}</Badge></span>
                      </div>
                    </td>
                    <td>
                      <span><Badge>{backlink.linkType}</Badge></span>
                    </td>
                    <td>
                      <p>{backlink.outReacher.memberName}</p>
                      <a className='breaklink' href="#">{backlink.outReacher.email} <MdOutlineContentCopy /></a>
                    </td>
                    <td>
                      <span>{backlink.approver.memberName}</span>
                    </td>
                    <td>
                      <p>{backlink.contentWriter.memberName}</p>
                      <a href={backlink.contentLink}>Article Link <FaExternalLinkAlt /></a>
                    </td>
                    <td>
                      <p>{backlink.dealType}</p>
                    </td>
                    <td>{`$${formatNumber(backlink.price)}`}</td>
                    <td className='d-flex'>
                      <Link to={`/backlink/viewbacklink/${backlink.id}`} className='btn dashboard-btn'><FaEye /> View</Link>
                      <Link to={`/backlink/updatebacklink/${backlink.id}`} className='btn dashboard-btn'><MdEdit /> Edit</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <p>p</p>
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
