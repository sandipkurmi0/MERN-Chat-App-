import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

import './popmodal.css'
import { sendSms } from '../../api/api'


const PopModal = () => {

    const [number, setNumber] = useState("")
    const [message, setMessage] = useState("")

    console.log(number)
    console.log(message);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const submit = async () => {
        await sendSms({
            To: number,
            Body: message,
            Type: "send"
        });

    }

    // console.log(submit);
    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ background: "rgb(129, 73, 248)", border: 'none' }}>
                New Chat
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => submit(e)}>
                        <div className="form-group">
                            <label htmlFor="number" className="form-label mt-4">New Recipient Phone Number:</label>
                            <input onChange={(e) => setNumber(e.target.value)} id="number" value={number} type="text" className="form-control" placeholder="Enter a Number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label mt-4">Write your message:</label>
                            <textarea onChange={(e) => setMessage(e.target.value)} id="message" value={message} className="form-control" rows="2" type="textarea" placeholder="Type your message..."></textarea>
                        </div>

                        <div className="form-group" style={{ marginTop: "20px" }}>
                            <button type="button" className="btn btn-outline-dark p-10" style={{ marginRight: "336px" }} onClick={handleClose}>Close</button>
                            <button className="btn btn-outline-success" onClick={handleClose}>Send</button>

                        </div>

                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PopModal