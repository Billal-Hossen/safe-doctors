import React from 'react';
import img from '../../../images/doctor-sm.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt,faVoicemail } from '@fortawesome/free-solid-svg-icons';
const Doctor = ({doctor}) => {
    return (
        <div className="col-md-4 text-center">
          {
          doctor.image?  <img className="img-fluid mb-3" style={{height:"200px"}} src={`data:image/png;base64,${doctor.image.img}`} alt=""/>
           : <img style={{height: '200px'}} className="img-fluid mb-3" src={`https://salty-plateau-71286.herokuapp.com/${doctor.img}`} alt=""/>
           }
            <h4>{doctor.name}</h4>
            <p> <FontAwesomeIcon className="text-primary" icon={faVoicemail}/> {doctor.email}</p>
        </div>
    );
};

export default Doctor;