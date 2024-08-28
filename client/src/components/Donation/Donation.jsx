import React, { useState } from 'react';
import './Donation.css';

function Donation() {
  const [donationAmount, setDonationAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleDonate = () => {
    console.log('Donation submitted:', {
      donationAmount,
      cardNumber,
      expirationDate,
      cvv,
    });

    setDonationAmount('');
    setCardNumber('');
    setExpirationDate('');
    setCvv('');

    alert('Donation sent successfully!');
  };

  return (
    <div className="donation-form">
      <h2>Make a Donation</h2>
      <div className="input-container">
        <label htmlFor="donationAmount">Donation Amount (USD):</label>
        <input
          type="number"
          id="donationAmount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="expirationDate">Expiration Date:</label>
        <input
          type="text"
          id="expirationDate"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </div>
      <button className="donate-button" onClick={handleDonate}>
        Donate
      </button>
    </div>
  );
}

export default Donation;
