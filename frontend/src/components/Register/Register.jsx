// import React, { useState } from 'react';
// import axios from 'axios';
// import './Register.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [rfidNumber, setRfidNumber] = useState('');
//   const [notification, setNotification] = useState(null);  // State for notification

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/create-players/', {
//         name: name,
//         rfid_number: rfidNumber,  // Send the RFID Number as it is
//       });

//       if (response.status === 200) {
//         const data = response.data;
//         setNotification({
//           type: 'success',
//           message: `Successfully registered: ${data.name} with RFID number: ${data.rfid_number}!`,  // Fixed string interpolation
//         });
//       } else {
//         setNotification({
//           type: 'error',
//           message: 'Registration failed. Please try again.',
//         });
//       }
//     } catch (error) {
//       setNotification({
//         type: 'error',
//         message: 'An error occurred. Please check your connection.',
//       });
//     }
//   };

//   return (
//     <div className="register-page">
//       <div className="register-container">
//         <div className="register-left">
//           <svg className="arcade-pixel" viewBox="0 0 48 48">
//             <rect x="6" y="18" width="36" height="12" rx="6" fill="#b266ff" stroke="#fff" strokeWidth="2"/>
//             <circle cx="16" cy="24" r="3" fill="#fff"/>
//             <circle cx="32" cy="24" r="3" fill="#fff"/>
//             <rect x="22" y="22" width="4" height="4" fill="#fff"/>
//           </svg>
//           <div className="register-title">Welcome to ArPi</div>
//           <div className="register-description">
//             Enter the world of ArPi!<br />
//             Register with your name and RFID Number.<br />
//             <span style={{fontSize: '0.9em', color: '#fff', opacity: 0.7}}>A Raspberry Pi Arcade Game</span>
//           </div>
//         </div>
//         <div className="register-right">
//           <form className="register-form" onSubmit={handleSubmit}>
//             <h1 className="register-form-title">Register</h1>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               placeholder="RFID Number"
//               value={rfidNumber}
//               onChange={e => setRfidNumber(e.target.value)}
//               required
//             />
//             <button type="submit">Register</button>
//             <div className="register-footer">Powered by Project-Arpi</div>
//           </form>
//         </div>
//       </div>

//       {/* Show notification if exists */}
//       {notification && notification.type === 'success' && (
//         <div className={`notification ${notification.type}`}>
//           {notification.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [rfidNumber, setRfidNumber] = useState('');
  const [notification, setNotification] = useState(null);  // State for notification

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/create-players/', {
        name: name,
        rfid_number: rfidNumber,  // Send the RFID Number as it is
      });

      if (response.status === 200) {
        const data = response.data;
        setNotification({
          type: 'success',
          message: `Successfully registered: ${data.name} with RFID number: ${data.rfid_number}!`,  // Fixed string interpolation
        });
      } else {
        setNotification({
          type: 'error',
          message: 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'An error occurred. Please check your connection.',
      });
    }
  };

  const closeNotification = () => {
    setNotification(null);
    navigate('/login');  // Redirect to the login page when OK is clicked
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <svg className="arcade-pixel" viewBox="0 0 48 48">
            <rect x="6" y="18" width="36" height="12" rx="6" fill="#b266ff" stroke="#fff" strokeWidth="2"/>
            <circle cx="16" cy="24" r="3" fill="#fff"/>
            <circle cx="32" cy="24" r="3" fill="#fff"/>
            <rect x="22" y="22" width="4" height="4" fill="#fff"/>
          </svg>
          <div className="register-title">Welcome to ArPi</div>
          <div className="register-description">
            Enter the world of ArPi!<br />
            Register with your name and RFID Number.<br />
            <span style={{fontSize: '0.9em', color: '#fff', opacity: 0.7}}>A Raspberry Pi Arcade Game</span>
          </div>
        </div>
        <div className="register-right">
          <form className="register-form" onSubmit={handleSubmit}>
            <h1 className="register-form-title">Register</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="RFID Number"
              value={rfidNumber}
              onChange={e => setRfidNumber(e.target.value)}
              required
            />
            <button type="submit">Register</button>
            <div className="register-footer">Powered by Project-Arpi</div>
          </form>
        </div>
      </div>

      {/* Notification Popup */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-message">
            {notification.message}
          </div>
          <button className="notification-btn" onClick={closeNotification}>OK</button>
        </div>
      )}
    </div>
  );
};

export default Register;
