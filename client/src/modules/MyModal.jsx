import { Modal } from "react-bootstrap";
import React, { useContext } from "react";
import { Context } from '..'
import { observer } from 'mobx-react-lite';

const MyModal = ({children}) => {
	
	const {modal} = useContext(Context)

  return (
    <>
      <Modal 
				id="enter-modal"
				contentClassName="modal-dark-content text-white"
        show={modal.show}
        onHide={()=>modal.setShow(false)}
      >
				<Modal.Header closeButton closeVariant="white" ></Modal.Header>
				<Modal.Body >
					{children}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default observer(MyModal)