// import React, { useContext } from 'react';
// import loginBg from '../../../images/loginBg.png'
// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from './firebase.config';
// import { UserContext } from '../../../App';
// import { useHistory, useLocation } from 'react-router-dom';

// if (firebase.apps.length === 0) {
//     firebase.initializeApp(firebaseConfig);
//   }

// const Login = () => {
//     const history = useHistory();
//     const location = useLocation();
//     const { from } = location.state || { from: { pathname: "/" } };

//     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
//     const handleGoogleSignIn=()=>{
//         const provider = new firebase.auth.GoogleAuthProvider();
//         firebase.auth().signInWithPopup(provider).then((result) => {
//  const {displayName,email}=result.user;
//  const signInUser={
//      name:displayName,email}
//      setLoggedInUser(signInUser)
//      console.log(loggedInUser)
//     //  storeAuthToken();
//     // var credential = result.credential;

//     // // This gives you a Google Access Token. You can use it to access the Google API.
//     // var token = credential.accessToken;
//     // // The signed-in user info.
//     // var user = result.user;
//     // // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorMessage)
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });

//     }
//     console.log(loggedInUser)
//     return (
//         <div className="container">
          
//             <div className="row align-items-center">
//                 <div className="col-md-5 shadow p-5">
//                 <h1 className="text-center">Login</h1>
//                     <div className="form-group">
//                         <label htmlFor="">User Name</label>
//                         <input type="text" name="name" id="" className="form-control"/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="">Password</label>
//                         <input type="password" name="name" id="" className="form-control"/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="">Forget password?</label>
                        
//                     </div>
//                     <div className="form-group align-items-center">
//                         <button className="btn btn-brand" onClick={handleGoogleSignIn}>Google Sign In</button>
                        
//                     </div>
//                 </div>
//                 <div className="col-md-6 d-none d-md-block align-self-end">
//                     <img src={loginBg} alt=""/>

//                 </div>
//             </div>
            
//         </div>
//     );
// };

// export default Login;



import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../../App';
import { useHistory, useLocation } from 'react-router-dom';
import LoginBg from '../../../images/loginBg.png';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const { displayName, email } = result.user;
      const signedInUser = { name: displayName, email }
      setLoggedInUser(signedInUser);
      storeAuthToken();
    }).catch(function (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem('token', idToken);
        history.replace(from);
      }).catch(function (error) {
        // Handle error
      });
  }

  return (
    <div className="login-page container">
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-6 shadow p-5">
          <div className="form-group">
            <label htmlFor="">User Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="text-danger">Forgot your password?</label>
          </div>
          <div className="from-group mt-5">
            <button className="btn btn-brand" onClick={handleGoogleSignIn}>Google Sign in</button>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block align-self-end">
          <img className="img-fluid" src={LoginBg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;