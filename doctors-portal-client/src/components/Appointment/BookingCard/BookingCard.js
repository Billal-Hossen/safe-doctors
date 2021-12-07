import React, { useState } from 'react';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './BookingCard.css'

const BookingCard = ({bookInfo,date}) => {
    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
      setIsOpen(true);
    }
  
  
  
    function closeModal(){
      setIsOpen(false);
    }
    return (
        <div className="col-md-4 mb-5">
            <div className="card pb-3">
                <div className="card-body text-center">
                    <h1 className="card-title text-band">{bookInfo.subject} </h1>
                    <h6>{bookInfo.visitHour}</h6>
                        <p>{bookInfo.totalSpace} SPACE AVAILABLE</p>
                        <button onClick={openModal} className="btn btn-brand text-uppercase">Book Appointment</button>
                        <AppointmentForm appointmentOn={bookInfo.subject} date={date}  modalIsOpen={modalIsOpen} closeModal={closeModal}/>
                </div>
            </div>
            
        </div>
    );
};

export default BookingCard;