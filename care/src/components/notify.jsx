// src/components/notify.jsx
import emailjs from 'emailjs-com';

const notify = () => {
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user')); // assuming you stored it with key 'user'

  // Optional: handle case if no user is found
  if (!user || !user.email) {
    console.error("No user found in localStorage or missing email.");
    return;
  }

  // Now use user.email in the emailjs.send call
  setTimeout(() => {
    emailjs.send(
      'service_070',           // Your actual service ID
      'template_070',          // Your actual template ID
      {
        to_name: user.username || 'User',
        message: 'This is your notification. You should definitely take your medicine cause this is the time bro',
        to_email: user.email,
      },
      'efgTzbLtYg2ATsc45'        // Your public key
    ).then(
      (res) => console.log('✅ Email sent!', res),
      (err) => console.error('❌ Failed to send email:', err)
    );
  }, 3000); // 3-second delay
};

export default notify;
