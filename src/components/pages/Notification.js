import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notification  ()  {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    axios.get('http://localhost:3008/api/notifications')
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);
  console.log(setNotifications)
  return (
    <div>
      {/* <h1>Notifications</h1> */}
      <div>
        {notifications.map((notification) => (
          <div key={notification._id}>
            <div>{notification.message}</div>
            <div>Timestamp: {new Date(notification.timestamp).toLocaleString()}</div> <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
