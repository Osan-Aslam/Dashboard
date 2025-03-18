import React, { useState } from 'react'
import { BsFilterLeft } from "react-icons/bs";
import $, { event } from "jquery";

function BacklinkFilter() {
  const [selectedProject, setSelectedProject] = useState("All");

  $(document).ready(function() {
    $(".dropdown-item").click(function() {
        let value = $(this).text();
        $(this).closest(".dropdown").find(".dropdown-toggle").text(value);
    });
  });
  return (
    <div className='filters p-2'>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button px-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <span> <BsFilterLeft /> Filter</span>
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body p-0">
              <div className='row mb-3'>
                <div class="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">View By Duration</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Last 24 hours</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">Last 24 hours</li>
                        <li class="dropdown-item">Last 7 days</li>
                        <li class="dropdown-item">Last 30 days</li>
                        <li class="dropdown-item">Last 3 month</li>
                        <li class="dropdown-item">Custom Duration</li>
                    </ul>
                </div>
                <div class="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Deal Type</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">All</li>
                        <li class="dropdown-item">Guest Post</li>
                        <li class="dropdown-item">Link Insertion</li>
                        <li class="dropdown-item">Exchange</li>
                    </ul>
                </div>
                <div class="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select By project</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">All</li>
                        <li class="dropdown-item">paragraph-generator.com</li>
                        <li class="dropdown-item">ai-detector.info</li>
                        <li class="dropdown-item">aipoem-generator.com</li>
                        <li class="dropdown-item">rewordgenerator.net</li>
                        <li class="dropdown-item">rewording-tool.com</li>
                        <li class="dropdown-item">sentencerewriter.net</li>
                        <li class="dropdown-item">fueon.com</li>
                        <li class="dropdown-item">qozex.com</li>
                    </ul>
                </div>
                <div class="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select By sub Page</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">All</li>
                        <li class="dropdown-item">https://paragraph-generator.com/paragraph-rewriter</li>
                        <li class="dropdown-item">https://paragraph-generator.com/paragraph-summarizer</li>
                        <li class="dropdown-item">https://paragraph-generator.com/paragraph-expander</li>
                    </ul>
                </div>
                <div class="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select By Anchor</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">All</li>
                        <li class="dropdown-item">Paragraph Generator</li>
                        <li class="dropdown-item">Paragraph Rewriter</li>
                        <li class="dropdown-item">Summarizer</li>
                    </ul>
                </div>
                <div class="dropdown d-flex flex-column col-lg-2">
                    <label htmlFor="">Select Out Reacher</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">All</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">All</li>
                        <li class="dropdown-item">Ali Murtaza</li>
                        <li class="dropdown-item">Sajjal Shafique</li>
                        <li class="dropdown-item">Ibrar Ibrahim</li>
                        <li class="dropdown-item">Moazzam awan</li>
                    </ul>
                </div>
                <div class="dropdown d-flex flex-column col-lg-2 mt-2">
                    <label htmlFor="">Link Type</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Follow</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">Follow</li>
                        <li class="dropdown-item">Nofollow</li>
                    </ul>
                </div>
                <div class="dropdown d-flex flex-column col-lg-2 mt-2">
                    <label htmlFor="">Backlink Cost</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Free</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">Free</li>
                        <li class="dropdown-item">Paid</li>
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
                <div class="dropdown d-flex flex-column col-lg-2 mt-2">
                    <label htmlFor="">Language</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">English</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">English</li>
                        <li class="dropdown-item">Spanish</li>
                        <li class="dropdown-item">Chinese</li>
                    </ul>
                </div>
                <div class="dropdown d-flex flex-column col-lg-2 mt-2">
                    <label htmlFor="">TLD</label>
                    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">.com</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">.com</li>
                        <li class="dropdown-item">.edu</li>
                        <li class="dropdown-item">.net</li>
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
