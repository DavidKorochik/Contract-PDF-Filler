import React from 'react';
import '../styles/contractPage.css';
import SignaturePad from '../components/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { html, text, thumbnail } from 'pdf2html';
import FileSaver from 'file-saver';
import jsZip from 'jszip';
import axios from 'axios';
// import pdftohtml from 'pdftohtmljs';

export default function ContractPage() {
  const pdfExportComponent = React.useRef(null);

  const [name, setName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [payment, setPayment] = React.useState('');
  const [fullname, setFullname] = React.useState('');

  // const divExported = document.querySelector('.contract-text');

  const getFullDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.html(document.querySelector('.contract-text'), 15);
    doc.save('contract.pdf');

    html2canvas(document.querySelector('.contract-text')).then(function (
      canvas
    ) {
      const img = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      doc.addImage(img, 'PNG', 0, 0, height, width);
      doc.save('contract.pdf');
    });

    pdfExportComponent.current.save();

    setFullname('');
    setName('');
    setPayment('');
    setCountry('');
  };

  const convertPdfToHtml = (e) => {
    e.preventDefault();
    const inputValue = document
      .querySelector('.contract-text')
      .value.substring(8);

    const blob = new Blob([inputValue], {
      type: 'application/pdf',
    });
    FileSaver.saveAs(blob, 'hello.html');

    const zip = new JSZip();
    zip.file('contract.html', url);
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      FileSaver.saveAs(content, 'file.zip');
    });

    const converter = new pdftohtml(url, 'file.html');

    converter
      .convert('ipad')
      .then(function () {
        console.log('converted');
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  axios.get('http://localhost:5000/').then((res) => console.log(res.data));

  axios.get('http://localhost:5000', <SignaturePad />);

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='inputName'
              type='text'
            />
            <p>of</p>
            <input
              type='text'
              value={country}
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
              value={fullname}
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

      <form onSubmit={convertPdfToHtml} style={{ marginTop: '30px' }}>
        <span style={{ marginRight: '10px' }}>
          Enter URL to download as HTML
        </span>
        <input
          className='input-value'
          type='text'
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <button style={{ marginLeft: '10px' }} type='submit'>
          Submit
        </button>
      </form>
    </>
  );
}
