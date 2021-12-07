import React from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";


const customStyles = {

    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const AppointmentForm = ({ modalIsOpen, closeModal,appointmentOn ,date}) => {
    // const { register, handleSubmit,  errors } = useForm();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.service=appointmentOn
        data.date=date
        data.created=new Date()
      fetch('http://localhost:5000/addAppointment',{
          method:"POST",
          headers:{'content-type':'application/json'},
          body:JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(success=>{
          if(success){
            closeModal()
            alert("Appointment conform")

          }
      })
       
    };
     

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            <Modal
                isOpen={modalIsOpen}
                //   onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 className="text-band text-center">{appointmentOn}</h2>
               <p className="text-secondary text-center"> <small> On {date.toDateString()}</small></p>
                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                   <div className="form-group">
                   <input type="test" {...register("name",{required:true})} name="name" placeholder="Your Name" className="form-control"/>
                   {errors.name && <span className="text-danger">This field is required</span>}
                   </div>

                   <div className="form-group">
                   <input type="test" {...register("phone",{required:true})} name="phone" placeholder="Your phone" className="form-control"/>
                   {errors.phone && <span className="text-danger">This field is required</span>}
                   </div>

                   <div className="form-group">
                   <input type="email" {...register("email",{required:true})} name="email" placeholder="Your Email" className="form-control"/>
                   {errors.email && <span className="text-danger">This field is required</span>}
                   </div>

                   <div className="form-group row">
                   <div className="col-4">

                            <select className="form-control" name="gender" {...register("gender",{required:true})} >
                                <option disabled={true} value="Not set">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not set">Other</option>
                            </select>
                            {errors.gender && <span className="text-danger">This field is required</span>}

                        </div>
                        <div className="col-4">
                            <input {...register("age",{required:true})} className="form-control" name="age" placeholder="Your Age" type="number" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input {...register("weight",{required:true})} className="form-control" name="weight" placeholder="Weight" type="number" />
                            {errors.weight && <span className="text-danger">This field is required</span>}
                        </div>
                   </div>
                 

                   <div className="form-group text-right">
                        <button type="submit" className="btn btn-brand">Send</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AppointmentForm;