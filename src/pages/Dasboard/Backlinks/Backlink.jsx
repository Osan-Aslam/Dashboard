import React from 'react'
import { Link } from 'react-router-dom'
import BacklinkFilter from './BacklinkFilter'
import { FaPlus } from 'react-icons/fa6'
import { FaEye } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import Badge from 'react-bootstrap/Badge';
import { MdOutlineContentCopy } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

function Backlink() {
  return (
    <>
      <div className='d-flex align-items-center justify-content-between p-2'>
        <h3>Backlinks</h3>
        <Link className='btn dashboard-btn' to="/addBacklink"><FaPlus /> Add Backlink</Link>
      </div>
      <div className='px-2'>
          <BacklinkFilter/>
      </div>
        <div className='d-lg-flex justify-content-between p-3 align-items-center'>
            <p className='result'>Results: <span>108,877 sites</span></p>
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
                    <tr>
                      <td className='d-flex flex-column'>
                          <a className='projectlink' href="">https://paragraph-generator.com/</a>
                          <a className='sublink' href="#">/paragraph-rewriter</a>
                          <div className='mt-1'>
                            <span><Badge>Rewrite Paragraph</Badge></span>
                          </div>
                      </td>
                      <td>
                        <a className='sublink' href="#">https://onlinebizbooster.net/</a>
                        <div className='mt-1'>
                            <span><Badge>DA: 88</Badge></span>
                            <span><Badge>DR: 54</Badge></span>
                            <span><Badge>Total Pages: 575</Badge></span>
                            <span><Badge>Domain Traffic: 870K</Badge></span>
                            <span><Badge>US Traffic: 600K</Badge></span>
                          </div>
                      </td>
                      <td>
                        <a className='livelink breaklink' href="#">https://onlinebizbooster.net/professional-writing-skills-in-...</a>
                        <div className='mt-1'>
                          <span><Badge>Page Traffic: 500K</Badge></span>
                          <span><Badge>First Seen: 12 Feb 2025</Badge></span>
                          <span><Badge>Last Seen: 12 Feb 2025</Badge></span>
                          <span><Badge className='lostdate'>Lost Date: 12 Feb 2025</Badge></span>
                        </div>
                      </td>
                      <td>
                        <span><Badge>Follow</Badge></span>
                        </td>
                      <td>
                        <p>Muhammad Ibrahim</p>
                        <a className='breaklink' href="#">muhammadibrahim@gmail.com <MdOutlineContentCopy /></a>
                      </td>
                      <td>
                        <span>Sami Ullah</span>
                      </td>
                      <td>
                        <p>Jawad Waseem</p>
                        <a href="#">Article Link <FaExternalLinkAlt /></a>
                      </td>
                      <td>
                        <p>Guest Post</p>
                        <a href="#">Link Exchange <FaExternalLinkAlt /></a>
                      </td>
                      <td>$300</td>
                      <td className='d-flex'>
                        <Link className='btn dashboard-btn'><FaEye /> View</Link>
                        <Link className='btn dashboard-btn'><MdEdit /> Edit</Link>
                      </td>
                    </tr>
                    <tr>
                        <td className='d-flex flex-column'>
                          <a className='projectlink' href="">https://paragraph-generator.com/</a>
                          <a className='sublink' href="#">/paragraph-rewriter</a>
                          <div className='mt-1'>
                            <span><Badge>Rewrite Paragraph</Badge></span>
                          </div>
                        </td>
                        <td>
                          <a className='sublink' href="#">https://onlinebizbooster.net/</a>
                          <div className='mt-1'>
                            <span><Badge>DA: 88</Badge></span>
                            <span><Badge>DR: 54</Badge></span>
                            <span><Badge>Total Pages: 575</Badge></span>
                            <span><Badge>Domain Traffic: 870K</Badge></span>
                            <span><Badge>US Traffic: 600K</Badge></span>
                          </div>
                        </td>
                        <td>
                          <a className='livelink breaklink' href="#">https://onlinebizbooster.net/professional-writing-skills-in-...</a>
                          <div className='mt-1'>
                            <span><Badge>Page Traffic: 500K</Badge></span>
                            <span><Badge>First Seen: 12 Feb 2025</Badge></span>
                            <span><Badge>Last Seen: 12 Feb 2025</Badge></span>
                            <span><Badge className='lostdate'>Lost Date: 12 Feb 2025</Badge></span>
                          </div>
                        </td>
                        <td>
                          <span><Badge>Follow</Badge></span>
                          </td>
                        <td>
                          <p>Muhammad Ibrahim</p>
                          <a className='breaklink' href="#">muhammadibrahim@gmail.com <MdOutlineContentCopy /></a>
                        </td>
                        <td>
                          <span>Sami Ullah</span>
                        </td>
                        <td>
                          <p>Jawad Waseem</p>
                          <a href="#">Article Link <FaExternalLinkAlt /></a>
                        </td>
                        <td>
                          <p>Guest Post</p>
                          <a href="#">Link Exchange <FaExternalLinkAlt /></a>
                        </td>
                        <td>$300</td>
                        <td className='d-flex'>
                          <Link className='btn dashboard-btn'><FaEye /> View</Link>
                          <Link className='btn dashboard-btn'><MdEdit /> Edit</Link>
                        </td>
                    </tr>
                    <tr>
                      <td className='d-flex flex-column'>
                          <a className='projectlink' href="">https://paragraph-generator.com/</a>
                          <a className='sublink' href="#">/paragraph-rewriter</a>
                          <div className='mt-1'>
                            <span><Badge>Rewrite Paragraph</Badge></span>
                          </div>
                      </td>
                      <td>
                        <a className='sublink' href="#">https://onlinebizbooster.net/</a>
                        <div className='mt-1'>
                          <span><Badge>DA: 88</Badge></span>
                          <span><Badge>DR: 54</Badge></span>
                          <span><Badge>Total Pages: 575</Badge></span>
                          <span><Badge>Domain Traffic: 870K</Badge></span>
                          <span><Badge>US Traffic: 600K</Badge></span>
                        </div>
                      </td>
                      <td>
                        <a className='livelink breaklink' href="#">https://onlinebizbooster.net/professional-writing-skills-in-...</a>
                        <div className='mt-1'>
                          <span><Badge>Page Traffic: 500K</Badge></span>
                          <span><Badge>First Seen: 12 Feb 2025</Badge></span>
                          <span><Badge>Last Seen: 12 Feb 2025</Badge></span>
                          <span><Badge className='lostdate'>Lost Date: 12 Feb 2025</Badge></span>
                        </div>
                      </td>
                      <td>
                        <span><Badge>Follow</Badge></span>
                        </td>
                      <td>
                        <p>Muhammad Ibrahim</p>
                        <a className='breaklink' href="#">muhammadibrahim@gmail.com <MdOutlineContentCopy /></a>
                      </td>
                      <td>
                        <span>Sami Ullah</span>
                      </td>
                      <td>
                        <p>Jawad Waseem</p>
                        <a href="#">Article Link <FaExternalLinkAlt /></a>
                      </td>
                      <td>
                        <p>Guest Post</p>
                        <a href="#">Link Exchange <FaExternalLinkAlt /></a>
                      </td>
                      <td>$300</td>
                      <td className='d-flex'>
                        <Link className='btn dashboard-btn'><FaEye /> View</Link>
                        <Link className='btn dashboard-btn'><MdEdit /> Edit</Link>
                      </td>
                    </tr>
                    <tr>
                      <td className='d-flex flex-column'>
                        <a className='projectlink' href="">https://paragraph-generator.com/</a>
                        <a className='sublink' href="#">/paragraph-rewriter</a>
                        <div className='mt-1'>
                          <span><Badge>Rewrite Paragraph</Badge></span>
                        </div>
                      </td>
                      <td>
                        <a className='sublink' href="#">https://onlinebizbooster.net/</a>
                        <div className='mt-1'>
                          <span><Badge>DA: 88</Badge></span>
                          <span><Badge>DR: 54</Badge></span>
                          <span><Badge>Total Pages: 575</Badge></span>
                          <span><Badge>Domain Traffic: 870K</Badge></span>
                          <span><Badge>US Traffic: 600K</Badge></span>
                        </div>
                      </td>
                      <td>
                        <a className='livelink breaklink' href="#">https://onlinebizbooster.net/professional-writing-skills-in-...</a>
                        <div className='mt-1'>
                          <span><Badge>Page Traffic: 500K</Badge></span>
                          <span><Badge>First Seen: 12 Feb 2025</Badge></span>
                          <span><Badge>Last Seen: 12 Feb 2025</Badge></span>
                          <span><Badge className='lostdate'>Lost Date: 12 Feb 2025</Badge></span>
                        </div>
                      </td>
                      <td>
                        <span><Badge>Follow</Badge></span>
                        </td>
                      <td>
                        <p>Muhammad Ibrahim</p>
                        <a className='breaklink' href="#">muhammadibrahim@gmail.com <MdOutlineContentCopy /></a>
                      </td>
                      <td>
                        <span>Sami Ullah</span>
                      </td>
                      <td>
                        <p>Jawad Waseem</p>
                        <a href="#">Article Link <FaExternalLinkAlt /></a>
                      </td>
                      <td>
                        <p>Guest Post</p>
                        <a href="#">Link Exchange <FaExternalLinkAlt /></a>
                      </td>
                      <td>$300</td>
                      <td className='d-flex'>
                        <Link className='btn dashboard-btn'><FaEye /> View</Link>
                        <Link className='btn dashboard-btn'><MdEdit /> Edit</Link>
                      </td>
                    </tr>
                    <tr>
                      <td className='d-flex flex-column'>
                        <a className='projectlink' href="">https://paragraph-generator.com/</a>
                        <a className='sublink' href="#">/paragraph-rewriter</a>
                        <div className='mt-1'>
                          <span><Badge>Rewrite Paragraph</Badge></span>
                        </div>
                      </td>
                      <td>
                        <a className='sublink' href="#">https://onlinebizbooster.net/</a>
                        <div className='mt-1'>
                          <span><Badge>DA: 88</Badge></span>
                          <span><Badge>DR: 54</Badge></span>
                          <span><Badge>Total Pages: 575</Badge></span>
                          <span><Badge>Domain Traffic: 870K</Badge></span>
                          <span><Badge>US Traffic: 600K</Badge></span>
                        </div>
                      </td>
                      <td>
                        <a className='livelink breaklink' href="#">https://onlinebizbooster.net/professional-writing-skills-in-...</a>
                        <div className='mt-1'>
                          <span><Badge>Page Traffic: 500K</Badge></span>
                          <span><Badge>First Seen: 12 Feb 2025</Badge></span>
                          <span><Badge>Last Seen: 12 Feb 2025</Badge></span>
                          <span><Badge className='lostdate'>Lost Date: 12 Feb 2025</Badge></span>
                        </div>
                      </td>
                      <td>
                        <span><Badge>Follow</Badge></span>
                        </td>
                      <td>
                        <p>Muhammad Ibrahim</p>
                        <a className='breaklink' href="#">muhammadibrahim@gmail.com <MdOutlineContentCopy /></a>
                      </td>
                      <td>
                        <span>Sami Ullah</span>
                      </td>
                      <td>
                        <p>Jawad Waseem</p>
                        <a href="#">Article Link <FaExternalLinkAlt /></a>
                      </td>
                      <td>
                        <p>Guest Post</p>
                        <a href="#">Link Exchange <FaExternalLinkAlt /></a>
                      </td>
                      <td>$300</td>
                      <td className='d-flex'>
                        <Link className='btn dashboard-btn'><FaEye /> View</Link>
                        <Link className='btn dashboard-btn'><MdEdit /> Edit</Link>
                      </td>
                    </tr>
                    <tr>
                        <td className='d-flex flex-column'>
                            <a className='projectlink' href="">https://paragraph-generator.com/</a>
                            <a className='sublink' href="#">/paragraph-rewriter</a>
                            <div className='mt-1'>
                              <span><Badge>Rewrite Paragraph</Badge></span>
                            </div>
                        </td>
                        <td>
                          <a className='sublink' href="#">https://onlinebizbooster.net/</a>
                          <div className='mt-1'>
                              <span><Badge>DA: 88</Badge></span>
                              <span><Badge>DR: 54</Badge></span>
                              <span><Badge>Total Pages: 575</Badge></span>
                              <span><Badge>Domain Traffic: 870K</Badge></span>
                              <span><Badge>US Traffic: 600K</Badge></span>
                            </div>
                        </td>
                        <td>
                          <a className='livelink breaklink' href="#">https://onlinebizbooster.net/professional-writing-skills-in-...</a>
                          <div className='mt-1'>
                            <span><Badge>Page Traffic: 500K</Badge></span>
                            <span><Badge>First Seen: 12 Feb 2025</Badge></span>
                            <span><Badge>Last Seen: 12 Feb 2025</Badge></span>
                            <span><Badge className='lostdate'>Lost Date: 12 Feb 2025</Badge></span>
                          </div>
                        </td>
                        <td>
                          <span><Badge>Follow</Badge></span>
                          </td>
                        <td>
                          <p>Muhammad Ibrahim</p>
                          <a className='breaklink' href="#">muhammadibrahim@gmail.com <MdOutlineContentCopy /></a>
                        </td>
                        <td>
                          <span>Sami Ullah</span>
                        </td>
                        <td>
                          <p>Jawad Waseem</p>
                          <a href="#">Article Link <FaExternalLinkAlt /></a>
                        </td>
                        <td>
                          <p>Guest Post</p>
                          <a href="#">Link Exchange <FaExternalLinkAlt /></a>
                        </td>
                        <td>$300</td>
                        <td className='d-flex'>
                            <Link className='btn dashboard-btn'><FaEye /> View</Link>
                            <Link className='btn dashboard-btn'><MdEdit /> Edit</Link>
                        </td>
                    </tr>
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
