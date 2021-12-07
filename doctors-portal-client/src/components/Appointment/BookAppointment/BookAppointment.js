import React from 'react';
import BookingCard from '../BookingCard/BookingCard';
import './BookingAppointment.css'

const bookingData=[
    {
        _id: "1ejwij3673289227",
        id: 1,
        subject: "Teeth Orthodontics",
        visitHour:"8.00 AM - 9.00 AM",
        totalSpace: 10
    },
    {
        _id: "2ejwij3673289sf227",
        id: 1,
        subject: "Cosmetic Dentistry ",
        visitHour:"10.05 AM - 11.30 AM",
        totalSpace: 10
    },
    {
        _id: "2ejwij3673289227",
        id: 1,
        subject: "Teeth Cleaning",
        visitHour:"5.00 PM - 6.30 PM",
        totalSpace: 10
    },
    {
        _id: "4ejwij3673289227",
        id: 1,
        subject: "Cavity Protection",
        visitHour:"7.00 AM - 8.30 AM",
        totalSpace: 10
    },
    {
        _id: "5ejwij3673289227",
        id: 1,
        subject: "Teeth Orthodontics",
        visitHour:"8.00 AM - 9.00 AM",
        totalSpace: 10
    },
    {
        _id: "6ejwij3673289227",
        id: 1,
        subject: "Teeth Orthodontics",
        visitHour:"8.00 AM - 9.00 AM",
        totalSpace: 10
    }
  
]

const BookAppointment = ({date}) => {
    return (
        <section>
            <h2 className="text-center text-band mb-5">Available Appointments on {date.toDateString()}</h2>
            <div className="row">
                {
                    bookingData.map(bookInfo=><BookingCard bookInfo={bookInfo} key={bookInfo.id} date={date}></BookingCard>)
                }
            </div>
        </section>
    );
};

export default BookAppointment;