import React, { useState, useEffect } from 'react';
import InformationAndSign from './InformationAndSign';
import '../styles/details.css';
import axios from 'axios';

export default function Details() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);
  const [showTitle, setShowTitle] = useState(true);

  const getFullDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setShow(!show);
    setShowTitle(!showTitle);

    const data = {
      firstName,
      lastName,
      age,
      email,
    };

    axios
      .post('http://localhost:5000/api/client/sendDetails', data)
      .then((res) => console.log(res.data));
  };

  return (
    <>
      <h1 className='clientInformation'>
        {showTitle ? `Client Information` : ''}
      </h1>
      {!show ? (
        <form className='formContract' onSubmit={submitForm}>
          <span>First Name:</span>
          <input
            id='firstName'
            className='firstName'
            onChange={(e) => setFirstName(e.target.value)}
            type='text'
            value={firstName}
          />
          <span>Last Name:</span>
          <input
            id='lastName'
            className='lastName'
            type='text'
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <span>Email:</span>
          <input
            id='email'
            className='email'
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span>Age:</span>
          <input
            id='age'
            className='age'
            type='text'
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
          <span className='fullDate'>
            Date:<span className='strongFullDate'> {getFullDate()}</span>
          </span>
          <button className='submitButton' type='submit'>
            Submit
          </button>
        </form>
      ) : (
        <InformationAndSign firstName={firstName} lastName={lastName} />
      )}
    </>
  );
}
