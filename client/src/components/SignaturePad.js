import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import '../styles/signaturePad.css';

export default function SignaturePad() {
  const sigCanvas = useRef();

  const clearButton = () => sigCanvas.current.clear();

  return (
    <div className='pad-wrapper'>
      <SignatureCanvas
        ref={sigCanvas}
        canvasProps={{ className: 'sigCanvas' }}
      />
      <button onClick={clearButton} className='clearButton'>
        Clear
      </button>
    </div>
  );
}
