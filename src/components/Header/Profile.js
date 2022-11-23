import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ChangePassword from "../Header/ChangePassword";
import MainInfor from './MainInfor';
import History from './History';
const Profile = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Manage Information User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Main infor">
                            <MainInfor />
                        </Tab>
                        <Tab eventKey="profile" title="Password">
                            <ChangePassword />
                        </Tab>
                        <Tab eventKey="contact" title="History" >
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    );
}

export default Profile;