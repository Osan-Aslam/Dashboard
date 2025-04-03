import React, { useState } from 'react'
import { BsFilterLeft } from "react-icons/bs";
import $, { event } from "jquery";

function BacklinkFilter() {
  const [selectedProject, setSelectedProject] = useState("All");

  $(document).ready(function () {
    $(".dropdown-item").click(function () {
      let value = $(this).text();
      $(this).closest(".dropdown").find(".dropdown-toggle").text(value);
    });
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
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">All</li>
                    <li className="dropdown-item">Guest Post</li>
                    <li className="dropdown-item">Link Insertion</li>
                    <li className="dropdown-item">Exchange</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">Select By project</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">All</li>
                    <li className="dropdown-item">paragraph-generator.com</li>
                    <li className="dropdown-item">ai-detector.info</li>
                    <li className="dropdown-item">aipoem-generator.com</li>
                    <li className="dropdown-item">rewordgenerator.net</li>
                    <li className="dropdown-item">rewording-tool.com</li>
                    <li className="dropdown-item">sentencerewriter.net</li>
                    <li className="dropdown-item">fueon.com</li>
                    <li className="dropdown-item">qozex.com</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">Select By sub Page</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">All</li>
                    <li className="dropdown-item">https://paragraph-generator.com/paragraph-rewriter</li>
                    <li className="dropdown-item">https://paragraph-generator.com/paragraph-summarizer</li>
                    <li className="dropdown-item">https://paragraph-generator.com/paragraph-expander</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">Select By Anchor</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">All</li>
                    <li className="dropdown-item">Paragraph Generator</li>
                    <li className="dropdown-item">Paragraph Rewriter</li>
                    <li className="dropdown-item">Summarizer</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2">
                  <label htmlFor="">Select Out Reacher</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">All</li>
                    <li className="dropdown-item">Ali Murtaza</li>
                    <li className="dropdown-item">Sajjal Shafique</li>
                    <li className="dropdown-item">Ibrar Ibrahim</li>
                    <li className="dropdown-item">Moazzam awan</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                  <label htmlFor="">Link Type</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Follow</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">Follow</li>
                    <li className="dropdown-item">Nofollow</li>
                  </ul>
                </div>
                <div className="dropdown d-flex flex-column col-lg-2 mt-2">
                  <label htmlFor="">Backlink Cost</label>
                  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Free</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">Free</li>
                    <li className="dropdown-item">Paid</li>
                  </ul>
                </div>
                <div className='col-lg-2 priceRange'>
                  <label htmlFor="">Price Range</label>
                  <div className='d-flex align-items-center'>
                    <input className='form-control' placeholder='Min' type="number" name="" id="" />
                    <span className='me-1 mb-2'>-</span>
                    <input className='form-control' placeholder='Max' type="number" name="" id="" />
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
