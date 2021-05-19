import React from 'react'
import {Modal,Button}  from 'react-bootstrap/'
import LogIn from "./LogIn"

 export default function MyLogInModal(props) {
  return (
    <div>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-center">
                 Log In
</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LogIn />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}