import React, { useState } from "react";
import './license.css'
import HttpService from "../services/http.service";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ErrorMessage from "./common/errorMsg";
import SuccessMessage from "./common/successMsg";

let Form = (props) => {
    const [startDate, setStartDate] = useState('');
    const [startDate1, setStartDate1] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date().toISOString().slice(0, 10));
    const [expiryDate1, setExpiryDate1] = useState('');
    const [licenseID, setLicenseID] = useState();
    const [numberOfLicense, setNumberOfLicense] = useState();
    const [licenseData, setLicenseData] = useState();

    const dateValidation = (x) => {
        let s = x.split('/')
        if (s.length > 3 || x.length > 10) return true
        if (s.length === 3 && (s[1].length === 1 || isNaN(s[2]))) return true
        if (s.length === 2 && s[1].length >= 2) { return !/^(0[1-9]|[12]\d|3[01])$/.test(s[1]) }
        if (s[0].length >= 2) return !/^(0[1-9]|1[0-2])$/.test(s[0])
        if (s.length === 2 && s[0].length === 1) return true
        return false
    }

    const onchangeClickHandler = async (event, setContent, type) => {
        const currentDate = new Date().toISOString().slice(0, 10)
        let sample = { ...licenseData }
        if (type === 'startDate') {
            if (event >= currentDate) {
                setContent(event)
                sample[type] = event//.toISOString().slice(0, 10);
            }
            else sample[type] = ''
        } else if (type === 'expiryDate') {
            if (event > currentDate) {
                setContent(event)
                sample[type] = event//.toISOString().slice(0, 10);
            }
            else sample[type] = ''
        }
        else {
            sample[type] = event.target.value;
            setContent(event.target.value)
        }
        setLicenseData(sample)
    }

    const saveClickHandler = async () => {
        if (licenseData === undefined) {
            ErrorMessage("Please fill the details")
            return;
        } else if (!licenseData.licenceID) {
            ErrorMessage("Please fill the Mac Address/Machine ID")
            return;
        } else if (!licenseData.numberOfLicence) {
            ErrorMessage("Please fill the number of licenses")
            return;
        } else if (!licenseData.startDate) {
            // licenseData['startDate'] = currentDate
            ErrorMessage('Enter a valid start date')
            return;
        } else if (!licenseData.expiryDate) {
            ErrorMessage('Enter a valid expiry date')
            return;
        }
        if (startDate1.length !== 10 || expiryDate1.length !== 10) {
            ErrorMessage('Please Enter a valid Date')
            return
        }
        if (licenseData.expiryDate) {
            if (expiryDate <= licenseData.startDate) {
                ErrorMessage("expiryDate must be greater then start date")
                return;
            }
        } else {
            if (licenseData.startDate && expiryDate <= licenseData.startDate) {
                ErrorMessage("expiryDate must be greater then start date")
                return;
            } else if (expiryDate <= startDate) {
                ErrorMessage("expiryDate must be greater then start date")
                return;
            }
        }
        if (
            licenseData.startDate.split('-')[0].length !== 4 ||
            licenseData.startDate.split('-')[1].length !== 2 ||
            licenseData.startDate.split('-')[2].length !== 2 ||
            licenseData.expiryDate.split('-')[0].length !== 4 ||
            licenseData.expiryDate.split('-')[1].length !== 2 ||
            licenseData.expiryDate.split('-')[2].length !== 2
        ) {
            ErrorMessage('Enter date in proper format')
            return
        }

        const res = await HttpService.CreateUpdate("createlicence", licenseData).then((res) => res)
        if (res.data.size !== 0) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', props.type);
            document.body.appendChild(link);
            link.click();
            SuccessMessage("License file downloaded successfully")
            setStartDate('');
            setStartDate1('');
            setExpiryDate('');
            setExpiryDate1('');
            setLicenseID('');
            setNumberOfLicense('');
            setLicenseData({});
        } else {
            ErrorMessage("File not found")
        }
    }

    return (
        <div className="navigation-tabs d-flex justify-content-center position-relative main-class" >
            <form className="p-4 d-flex justify-content-center form-box-1" onSubmit={(e) => { e.preventDefault() }}>
                <div className="w-100">
                    <div className="row my-4">
                        <div className="col">
                            <label>Mac Address/Virtual Machine ID</label>
                        </div>
                        <div className="col">
                            <input type="text" className="input-text" placeholder="Mac Address/Virtual Machine ID" value={licenseID} onChange={(event) => { onchangeClickHandler(event, setLicenseID, "licenceID") }}></input>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <label>{props.ruleLable}</label>
                        </div>
                        <div className="col">
                            <input type="number" className="input-text" placeholder={props.placeholder} value={numberOfLicense} onChange={(event) => { onchangeClickHandler(event, setNumberOfLicense, "numberOfLicence") }}></input>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">

                            <label>License Start Date (<small className="license-date">MM/DD/YYYY</small>)</label></div>
                        <div className="col">
                            <input
                                type="text"
                                name="startDate"
                                value={startDate1}
                                onChange={(e) => {
                                    if (dateValidation(e.target.value)) return
                                    let x = e.target.value.split('/')
                                    setStartDate1(e.target.value)
                                    onchangeClickHandler(`${x[2]}-${x[0]}-${x[1]}`, setStartDate, "startDate")
                                }}
                                placeholder="MM/DD/YYYY"
                            />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <label>License Expiry Date (<small className="license-date"> MM/DD/YYYY</small>)</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="startDate"
                                value={expiryDate1}
                                onChange={(e) => {
                                    console.log('-----------', e.target.value);
                                    if (dateValidation(e.target.value)) return
                                    let x = e.target.value.split('/')
                                    setExpiryDate1(e.target.value)
                                    onchangeClickHandler(`${x[2]}-${x[0]}-${x[1]}`, setExpiryDate, "expiryDate")
                                }}
                                placeholder="MM/DD/YYYY"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <a href="#" className="save-btn" onClick={saveClickHandler}>Download License File</a></div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;