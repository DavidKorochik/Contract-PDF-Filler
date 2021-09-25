import React from 'react';
import ReactToPdf from 'react-to-pdf';
import ContractPage from './ContractPage';

export default function ToPDF() {
  const ref = React.useRef();
  const options = {
    // orientation: 'lanscape',
    unit: 'in',
    format: [13, 20],
  };

  return (
    <>
      <div className='contract' ref={ref}>
        <ContractPage />
      </div>
      <ReactToPdf
        options={options}
        targetRef={ref}
        scale={0.7}
        filename='contract.pdf'
      >
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </ReactToPdf>
    </>
  );
}
