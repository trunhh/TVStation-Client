import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TextInsertModal = ({ title, label, show, onHide, handleSubmit }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!show) setText(''); // Reset when modal closes
  }, [show]);

  const handleSave = () => {
    handleSubmit(text);
    onHide(); // hide after submit
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formText">
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập vào đây..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TextInsertModal;
