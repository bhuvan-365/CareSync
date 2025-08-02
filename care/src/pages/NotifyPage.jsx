import React, { useState } from 'react';
import './NotifyPage.css';
import emailjs from 'emailjs-com';

const NotifyPage = () => {
  const [frequency, setFrequency] = useState(1);
  const [times, setTimes] = useState(['08:00']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [isDemoSending, setIsDemoSending] = useState(false);

  const handleFrequencyChange = (value) => {
    setFrequency(value);
    const defaultTimes = {
      1: ['08:00'],
      2: ['08:00', '20:00'],
      3: ['08:00', '12:00', '20:00'],
      4: ['08:00', '12:00', '16:00', '20:00'],
    };
    setTimes(defaultTimes[value]);
  };

  const handleTimeChange = (index, newTime) => {
    const updatedTimes = [...times];
    updatedTimes[index] = newTime;
    setTimes(updatedTimes);
  };

  const addTimeSlot = () => {
    if (times.length < 4) {
      setTimes([...times, '08:00']);
      setFrequency(times.length + 1);
    }
  };

  const removeTimeSlot = (index) => {
    if (times.length > 1) {
      const updatedTimes = times.filter((_, i) => i !== index);
      setTimes(updatedTimes);
      setFrequency(updatedTimes.length);
    }
  };

  const submitReminders = () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    
    emailjs.send(
      'service_070',
      'template_070',
      {
        to_name: 'User',
        message: `Your medication reminders have been set for ${times.join(', ')}`,
        to_email: email,
      },
      'efgTzbLtYg2ATsc45'
    ).then(
      (res) => {
        console.log('✅ Email sent!', res);
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      },
      (err) => {
        console.error('❌ Failed to send email:', err);
        setIsSubmitting(false);
      }
    );
  };

  const sendDemoNotification = () => {
    if (!email) {
      alert('Please enter your email address first');
      return;
    }

    setIsDemoSending(true);
    
    emailjs.send(
      'service_070',
      'template_070',
      {
        to_name: 'User',
        message: 'This is a demo notification from your medication reminder app.',
        to_email: email,
      },
      'efgTzbLtYg2ATsc45'
    ).then(
      (res) => {
        console.log('✅ Demo email sent!', res);
        setIsDemoSending(false);
        alert('Demo notification sent! Check your email.');
      },
      (err) => {
        console.error('❌ Failed to send demo email:', err);
        setIsDemoSending(false);
        alert('Failed to send demo notification. Please try again.');
      }
    );
  };

  return (
    <div className="pill-reminder-app">
      <header className="app-header">
        <h1>Medication Reminder</h1>
        <p>Schedule your pill notifications</p>
      </header>

      <div className="reminder-form">
        <div className="form-section">
          <label className="section-label">Email Address</label>
          <div className="email-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              placeholder="Enter your email"
              required
            />
            <button
              className="demo-btn"
              onClick={sendDemoNotification}
              disabled={isDemoSending || !email}
            >
              {isDemoSending ? 'Sending...' : 'Send Demo'}
            </button>
          </div>
        </div>

        <div className="form-section">
          <label className="section-label">Frequency</label>
          <div className="frequency-options">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`frequency-btn ${frequency === num ? 'active' : ''}`}
                onClick={() => handleFrequencyChange(num)}
              >
                {num}x/day
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="section-label">Reminder Times</label>
          <div className="time-slots">
            {times.map((time, index) => (
              <div key={index} className="time-slot">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  className="time-input"
                />
                {times.length > 1 && (
                  <button
                    className="remove-btn"
                    onClick={() => removeTimeSlot(index)}
                    aria-label="Remove time slot"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            {times.length < 4 && (
              <button className="add-time-btn" onClick={addTimeSlot}>
                + Add Time
              </button>
            )}
          </div>
        </div>

        <button
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          onClick={submitReminders}
          disabled={isSubmitting || !email}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Setting Reminders...
            </>
          ) : (
            'Set Reminders'
          )}
        </button>

        {isSuccess && (
          <div className="success-message">
            ✓ Reminders set successfully! Check your email for confirmation.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotifyPage;