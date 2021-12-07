import React, { useState } from 'react';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';

const AddDoctor = () => {
    const [info, setInfo]=useState({})
    const [file,setFile]=useState(null)
    const handleBlur=e=>{
        const newInfo={...info}
        newInfo[e.target.name]=e.target.value;
        setInfo(newInfo)

    }
    const handleChangeFile=e=>{
        const newFile=e.target.files[0];
        setFile(newFile)
    }
    const handleSubmit=()=>{
       
  const formData = new FormData()
  formData.append('file', file)
  formData.append('name', info.name)
  formData.append('email', info.email)

  fetch('http://localhost:5000/addADoctor', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error(error)
  })
    }


    return (
        <div className="container-fluid row">
          <div className="col-md-2">
          <Sidebar/>
          </div>
            <div  className="col-md-10 p-5 ">
                <h5 className="text-brand">Add Doctor</h5>
                <form onSubmit={handleSubmit}>
  <div class="form-group" >
    <label for="exampleInputEmail1">Email address</label>
    <input onBlur={handleBlur} type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Name</label>
    <input onBlur={handleBlur} type="text" class="form-control" name="name" placeholder="Enter Name"/>
  </div>
  <div class="form-group">
  <label class="form-check-label" for="exampleCheck1">Upload file</label>
    <input onChange={handleChangeFile} type="file" class="form-check-input" name="file"/>
 
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

            </div>
            
        </div>
    );
};

export default AddDoctor;