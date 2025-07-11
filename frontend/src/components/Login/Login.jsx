// import React, { useState } from 'react';
// import './Login.css';

// const GameBoard = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle login logic here
//         alert(`Logged in as ${username}`);
//     };

//     return (
//         <div className="login-bg">
//             <div className="login-container">
//                 <div className="left-section">
//                     <svg className="arcade-pixel" viewBox="0 0 48 48">
//                         <rect x="6" y="18" width="36" height="12" rx="6" fill="#b266ff" stroke="#fff" strokeWidth="2"/>
//                         <circle cx="16" cy="24" r="3" fill="#fff"/>
//                         <circle cx="32" cy="24" r="3" fill="#fff"/>
//                         <rect x="22" y="22" width="4" height="4" fill="#fff"/>
//                     </svg>
//                     <div className="welcome-title">Welcome to ArPi</div>
//                     <div className="welcome-desc">
//                         Enter the world of ArPi!<br />
//                         Log in to start your adventure.<br />
//                         <span style={{fontSize: '0.9em', color: '#fff', opacity: 0.7}}>A Raspberry Pi Arcade Game</span>
//                     </div>
//                 </div>
//                 <div className="right-section">
//                     <form className="login-form" onSubmit={handleSubmit}>
//                         <h1 className="game-title">Game Login</h1>
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={username}
//                             onChange={e => setUsername(e.target.value)}
//                             required
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                             required
//                         />
//                         <button type="submit">Login</button>
//                         <div className="login-footer">Powered by Project-Arpi</div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GameBoard;


// import React, { useState } from 'react';
// import './Login.css';

// const Login = () => {
//   const [rfid, setRfid] = useState('');

//   const handleRfidScan = (e) => {
//     e.preventDefault();
//     // Handle RFID scan logic here
//     alert(`Logged in with RFID: ${rfid}`);
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-left">
//           <svg className="arcade-pixel" viewBox="0 0 48 48">
//             <rect x="6" y="18" width="36" height="12" rx="6" fill="#b266ff" stroke="#fff" strokeWidth="2"/>
//             <circle cx="16" cy="24" r="3" fill="#fff"/>
//             <circle cx="32" cy="24" r="3" fill="#fff"/>
//             <rect x="22" y="22" width="4" height="4" fill="#fff"/>
//           </svg>
//           <div className="login-title">Welcome to ArPi</div>
//           <div className="login-description">
//             Enter the world of ArPi!<br />
//             Type or Tap your RFID to log in.<br />
//             <span style={{fontSize: '0.9em', color: '#fff', opacity: 0.7}}>A Raspberry Pi Arcade Game</span>
//           </div>
//         </div>
//         <div className="login-right">
//           <form className="login-form" onSubmit={handleRfidScan}>
//             <h1 className="login-form-title">Game Login</h1>
//             <input
//               type="text"
//               placeholder="RFID Number"
//               value={rfid}
//               onChange={e => setRfid(e.target.value)}
//               required
//             />
//             <button type="submit">Log In</button>
//             <div className="login-footer">Powered by Project-Arpi</div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing
import './Login.css';

const Login = () => {
  const [rfid, setRfid] = useState('');
  const [notification, setNotification] = useState(null);  // State for notification
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleRfidScan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/players/rfid/${rfid}`);  // API to check if RFID is valid

      if (response.status === 200) {
        // If RFID is valid, redirect to the home page
        navigate('/');  
      } else {
        // If RFID is not found in the database
        setNotification({
          type: 'error',
          message: 'RFID not registered. Please sign up first.',
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
    setNotification(null);  // Close notification when clicked on OK
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <svg className="arcade-pixel" viewBox="0 0 48 48">
            <rect x="6" y="18" width="36" height="12" rx="6" fill="#b266ff" stroke="#fff" strokeWidth="2"/>
            <circle cx="16" cy="24" r="3" fill="#fff"/>
            <circle cx="32" cy="24" r="3" fill="#fff"/>
            <rect x="22" y="22" width="4" height="4" fill="#fff"/>
          </svg>
          <div className="login-title">Welcome to ArPi</div>
          <div className="login-description">
            Enter the world of ArPi!<br />
            Type or Tap your RFID to log in.<br />
            <span style={{fontSize: '0.9em', color: '#fff', opacity: 0.7}}>A Raspberry Pi Arcade Game</span>
          </div>
        </div>
        <div className="login-right">
          <form className="login-form" onSubmit={handleRfidScan}>
            <h1 className="login-form-title">Game Login</h1>
            <input
              type="text"
              placeholder="RFID Number"
              value={rfid}
              onChange={e => setRfid(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
            <div className="login-footer">Powered by Project-Arpi</div>
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

export default Login;
