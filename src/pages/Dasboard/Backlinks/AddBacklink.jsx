import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import $, { event } from "jquery";


function AddBacklink() {
  const [rows, setRows] = useState([{ id: 1 }]);

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1 }]);
  }

  const removeRow = (id) => {
    setRows(rows.filter(row => row.id !== id))
  }

  $(document).ready(function() {
    $(".dropdown-item").click(function() {
      let value = $(this).text();
      $(this).closest(".dropdown").find(".dropdown-toggle").text(value);
    });
  });
  
  return (
    <div className='mt-4 ms-3'>
      <h3>Add New Backlink</h3>
      <div className='col-lg-8 mx-auto mt-4 add-project add-backlink p-4'>
        <form className='w-100'>
          <span className='details pb-2'>Projects ({rows.length})</span>
          {rows.map((row, index) => (
            <div key={row.id} className='row flex-lg-nowrap all-dropdown mb-3'>
              <div className="dropdown d-flex flex-column col-lg-4">
                <div className='d-flex align-items-center justify-content-between'>
                  <label htmlFor="">Select Project</label>
                  <FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-lg-none' />
                </div>
                <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select Project</a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">All</li>
                  <li className="dropdown-item">Another action</li>
                  <li className="dropdown-item">Something else here</li>
                </ul>
              </div>
              <div className="dropdown d-flex flex-column col-lg-4">
                <label htmlFor="">Select Sub Page</label>
                <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select Sub Page</a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">Action</li>
                  <li className="dropdown-item">Another action</li>
                  <li className="dropdown-item">Something else here</li>
                </ul>
              </div>
              <div className="dropdown d-flex flex-column col-lg-4">
                <div className='d-flex justify-content-between'>
                  <label htmlFor="">Select Anchor Text</label>
                  <FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-none d-lg-block' />
                </div>
                <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select Anchor Text</a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">Action</li>
                  <li className="dropdown-item">Another action</li>
                  <li className="dropdown-item">Something else here</li>
                </ul>
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
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Deal Type</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">All</li>
                <li className="dropdown-item">Guest Post</li>
                <li className="dropdown-item">Link Insertion</li>
              </ul>
            </div>
            <div className="dropdown d-flex flex-column col-6">
              <label htmlFor="">Link Type</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Link Type</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">Follow</li>
                <li className="dropdown-item">Nofollow</li>
              </ul>
            </div>
            <div className="inputs d-flex flex-column col-12 mt-2">
              <label htmlFor="">Deal Link</label>
              <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-1">
              <label htmlFor="">Domain Traffic</label>
              <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-1">
              <label htmlFor="">US Traffic</label>
              <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">DR</label>
              <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">DA</label>
              <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
            </div>
            <div className="inputs d-flex flex-column col-6 mt-2">
              <label htmlFor="">Total Pages</label>
              <input type="text" placeholder='content written by' className='form-control' name="" id="" />
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-2">
              <label htmlFor="">Out Reacher</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select out reacher</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">All</li>
                <li className="dropdown-item">Qadeer khan</li>
                <li className="dropdown-item">Ali Murtaza</li>
                <li className="dropdown-item">Sajjal Shafique</li>
                <li className="dropdown-item">Ibrar Ibrahim</li>
                <li className="dropdown-item">Moazzam awan</li>
              </ul>
            </div>
            <div className="dropdown d-flex flex-column col-6 mt-1">
              <label htmlFor="">Backlink Cost</label>
              <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Free</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item">Free</li>
                <li className="dropdown-item">Paid</li>
              </ul>
            </div>
            <div className="inputs d-flex flex-column col-6 mt-1">
              <label htmlFor="">Price</label>
              <input type="text" placeholder='content written by' className='form-control' name="" id="" />
            </div>
          </div>
          <div className='text-center mt-3'>
            <button className='btn dashboard-btn px-4 py-2'>Add Backlink</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBacklink
