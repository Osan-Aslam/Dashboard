import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import $, { event } from "jquery";


function AddBacklink() {
    const [rows, setRows] = useState([{id : 1}]);

    const addRow = () => {
        setRows([...rows, {id: rows.length + 1}]);
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
                { rows.map((row, index) => (
                    <div key={row.id} className='row flex-lg-nowrap all-dropdown mb-3'>
                        <div class="dropdown d-flex flex-column col-lg-4">
                            <div className='d-flex align-items-center justify-content-between'>
                                <label htmlFor="">Select Project</label>
                                <FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-lg-none'/>
                            </div>
                            <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select Project</a>
                            <ul class="dropdown-menu">
                                <li class="dropdown-item">All</li>
                                <li class="dropdown-item">Another action</li>
                                <li class="dropdown-item">Something else here</li>
                            </ul>
                        </div>
                        <div class="dropdown d-flex flex-column col-lg-4">
                            <label htmlFor="">Select Sub Page</label>
                            <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select Sub Page</a>
                            <ul class="dropdown-menu">
                                <li class="dropdown-item">Action</li>
                                <li class="dropdown-item">Another action</li>
                                <li class="dropdown-item">Something else here</li>
                            </ul>
                        </div>
                        <div class="dropdown d-flex flex-column col-lg-4">
                            <div className='d-flex justify-content-between'>
                                <label htmlFor="">Select Anchor Text</label>
                                <FaCircleXmark onClick={() => removeRow(row.id)} className='cross d-none d-lg-block'/>
                            </div>
                            <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select Anchor Text</a>
                            <ul class="dropdown-menu">
                                <li class="dropdown-item">Action</li>
                                <li class="dropdown-item">Another action</li>
                                <li class="dropdown-item">Something else here</li>
                            </ul>
                        </div>
                    </div>
                ))}
                <div className='d-flex align-items-center add-more mb-3'>
                    <span onClick={addRow} className='mb-2'><FaPlus className='add-icon'/>Add More</span>
                </div>
                <span className='details'>Other Details</span>
                <div className='row mt-2'>
                    <div class="dropdown d-flex flex-column col-6">
                        <label htmlFor="">Deal Type</label>
                        <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Deal Type</a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item">All</li>
                            <li class="dropdown-item">Guest Post</li>
                            <li class="dropdown-item">Link Insertion</li>
                        </ul>
                    </div>
                    <div class="dropdown d-flex flex-column col-6">
                        <label htmlFor="">Link Type</label>
                        <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Link Type</a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item">Follow</li>
                            <li class="dropdown-item">Nofollow</li>
                        </ul>
                    </div>
                    <div class="inputs d-flex flex-column col-12 mt-2">
                        <label htmlFor="">Deal Link</label>
                        <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
                    </div>
                    <div class="inputs d-flex flex-column col-6 mt-1">
                        <label htmlFor="">Domain Traffic</label>
                        <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
                    </div>
                    <div class="inputs d-flex flex-column col-6 mt-1">
                        <label htmlFor="">US Traffic</label>
                        <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
                    </div>
                    <div class="inputs d-flex flex-column col-6 mt-2">
                        <label htmlFor="">DR</label>
                        <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
                    </div>
                    <div class="inputs d-flex flex-column col-6 mt-2">
                        <label htmlFor="">DA</label>
                        <input type="text" placeholder='Enter deal link' className='form-control' name="" id="" />
                    </div>
                    <div class="inputs d-flex flex-column col-6 mt-2">
                        <label htmlFor="">Total Pages</label>
                        <input type="text" placeholder='content written by' className='form-control' name="" id="" />
                    </div>
                    <div class="dropdown d-flex flex-column col-6 mt-2">
                        <label htmlFor="">Out Reacher</label>
                        <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Select out reacher</a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item">All</li>
                            <li class="dropdown-item">Qadeer khan</li>
                            <li class="dropdown-item">Ali Murtaza</li>
                            <li class="dropdown-item">Sajjal Shafique</li>
                            <li class="dropdown-item">Ibrar Ibrahim</li>
                            <li class="dropdown-item">Moazzam awan</li>
                        </ul>
                    </div>
                    <div class="dropdown d-flex flex-column col-6 mt-1">
                        <label htmlFor="">Backlink Cost</label>
                        <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Free</a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item">Free</li>
                            <li class="dropdown-item">Paid</li>
                        </ul>
                    </div>
                    <div class="inputs d-flex flex-column col-6 mt-1">
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
