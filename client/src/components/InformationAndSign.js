import React, { useEffect, useState } from 'react';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import SignaturePad from '../components/SignaturePad';

export default function InformationAndSign({ firstName, lastName }) {
  const pdfExportComponent = React.useRef(null);

  const [name, setName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [payment, setPayment] = React.useState('');
  const [fullname, setFullname] = React.useState('');

  const [contract, setContract] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/client/sendDetails', {
      method: 'POST',
    }).then((res) => setContract(res.data));
  }, []);

  const getFullDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const generatePDF = () => {
    pdfExportComponent.current.save();

    setFullname('');
    setName('');
    setPayment('');
    setCountry('');
  };

  const insertHTML = async () => {
    const res = axios.post('http://localhost:5000/contract', {
      firstName: 'David',
    });
    console.log(res.data);
  };

  useEffect(() => {
    insertHTML();
  }, []);

  return (
    <>
      <PDFExport ref={pdfExportComponent} paperSize='A1'>
        <div className='contract-text'>
          <h1>Contract Page</h1>
          <div className='line-1'>
            <p>This contract, dated on the </p>
            <input type='text' value={getFullDate()} />
            <p>is made between David's Company and </p>
            <input
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              className='inputName'
              type='text'
            />
            <p>of</p>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setCountry(e.target.value)}
            />
            <p>.</p>
          </div>
          <div className='line-2'>
            <p>The Employee shall be paid a wage of $</p>
            <input
              type='number'
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            />
            <p>.</p>
          </div>
          <div className='full-details'>
            <span>Full Name</span>
            <input
              type='text'
              value={`${firstName} ${lastName}`}
              onChange={(e) => setFullname(e.target.value)}
            />
            <span>Date</span>
            <input type='text' value={getFullDate()} />
            <span>Signature</span>
            <SignaturePad className='sigCanvas' />
          </div>
        </div>
      </PDFExport>
      <button onClick={generatePDF}>Generate PDF</button>
    </>
  );
}
