import React from 'react'

function AddTeam() {
  return (
    <div>
      <h3 className='ms-2 mt-3'>Add New Team Member</h3>
        <div className='col-lg-8 mx-auto mt-4 add-project p-4'>
          <form className='w-100'>
            <div>
              <label for="formGroupExampleInput" class="form-label">Member Name</label>
              <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter member name" />
            </div>
            <div>
              <label for="formGroupExampleInput2" class="form-label">Designation</label>
              <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Select designation" />
            </div> 
            <div className='text-center mt-4'>
              <button className='btn dashboard-btn px-4 py-2'>Add Member</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default AddTeam
