import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SegmentModal from './segmentModal';
import './App.css';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="primary" onClick={handleShow}>
          Save segment
        </Button>
      </header>

      <SegmentModal show={show} handleClose={handleClose} />
    </div>
  );
}

export default App;
