import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeletePost = (props) => {
  return (
    <div>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>do you want to do this</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onDeletePost}>
            {props.text}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeletePost
