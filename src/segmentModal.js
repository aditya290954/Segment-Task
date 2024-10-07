import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SegmentModal = ({ show, handleClose }) => {
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');

  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const handleAddSchema = () => {
    if (selectedSchema && !schemas.includes(selectedSchema)) {
      setSchemas([...schemas, selectedSchema]);
      setSelectedSchema('');
    }
  };

  const handleSave = () => {
    const data = {
      segment_name: segmentName,
      schema: schemas.map(schema => ({ [schema]: schemaOptions.find(opt => opt.value === schema).label }))
    };

    fetch('/api/https://webhook.site/', {                 //api
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Save Segment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="segmentName">
            <Form.Label>Segment Name</Form.Label>
            <Form.Control type="text" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="addSchema">
            <Form.Label>Add schema to segment</Form.Label>
            <Form.Control as="select" value={selectedSchema} onChange={(e) => setSelectedSchema(e.target.value)}>
              <option value="">Select schema</option>
              {schemaOptions
                .filter(opt => !schemas.includes(opt.value))
                .map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </Form.Control>
          </Form.Group>
          <Button variant="link" onClick={handleAddSchema}>+ Add new schema</Button>
          <div className="mt-3">
            {schemas.map(schema => (
              <Form.Group key={schema} controlId={schema}>
                <Form.Label>{schemaOptions.find(opt => opt.value === schema).label}</Form.Label>
                <Form.Control as="select" value={schema} onChange={(e) => {
                  const newSchemas = schemas.map(s => s === schema ? e.target.value : s);
                  setSchemas(newSchemas);
                }}>
                  {schemaOptions
                    .filter(opt => !schemas.includes(opt.value) || opt.value === schema)
                    .map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            ))}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Segment</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SegmentModal;


