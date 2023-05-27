import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './license.css'
import Form from "./LicenseForm";
import { ToastContainer } from 'react-toastify';
import HttpService from "../services/http.service";
let License = () => {
    const deletLicenseFile = async () => {
        await HttpService.getByBoj("deletfile")
    }

    return (
        <div className="navigation-tabs position-relative">
            <div className="header d-flex justify-content-center align-items-center">GENERATE LICENSE FILE FOR VCDMS, RSD, RM8000 AND ELLVISS9000</div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3" onClick={deletLicenseFile}>
                <Tab eventKey="home" title="LICENSE FILE FOR VCDMS">
                    <Form type="VCDMS-license.txt" ruleLable="Subscription For Number Of Devices" placeholder="Enter number of devices" />
                </Tab>
                <Tab eventKey="second" title="LICENSE FILE FOR RSD">
                    <Form type="RSD-license.txt" ruleLable="Subscription For Number Of Property" placeholder="Enter number of Property" />
                </Tab>
                <Tab eventKey="third" title="LICENSE FILE FOR RM8000">
                    <Form type="RM8000-license.txt" ruleLable="Subscription For Number Of Events" placeholder="Enter number of Events" />
                </Tab>
                <Tab eventKey="fourth" title="LICENSE FILE FOR ELLVIS 9000">
                    <Form type="Ellvis9000-license.txt" ruleLable="Subscription For Number Of Streams" placeholder="Enter number of elviss" />
                </Tab>
            </Tabs>
            <ToastContainer />
        </div>
    );
}

export default License;