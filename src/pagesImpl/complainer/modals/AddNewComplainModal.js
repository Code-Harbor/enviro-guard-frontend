import React, { useState, useEffect } from "react";
import { Icon } from "../../../components/Component";
import { Row, Col, Input } from "reactstrap";
import { RSelect } from "../../../components/Component";
import Toast from "../../../utils/Toast";
import axios from "axios";
import { Spinner } from "reactstrap";


const AddNewComplainModal = ({ toggle, showModal, registeredComplainer, getComplaintByComplainer }) => {

  const complainerDetails = JSON.parse(localStorage.getItem('logged_complainer'));

  const [allInstitute, setAllInstitute] = useState([]);

  const [selectedInstitute, setSelectedInstitute] = useState({});
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [complainDesc, setComplainDesc] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);

  // call get all institute function
  useEffect(() => {
    if (showModal) {
      getAlInstitute();
    }
  }, [AddNewComplainModal])


  // get all institute - function
  const getAlInstitute = () => {

    // send request to backend
    axios({
      method: 'GET',
      url: `http://localhost:8080/institute/get-all-institute`,
    }).then((res) => {

      let data = res.data;
      console.log(data);

      // create data for dropdown selection
      let tempArray = [];
      data.forEach(element => {
        let obj = {
          value: element.id,
          label: element.name
        }
        tempArray.push(obj);
      });

      setAllInstitute(tempArray);

    }).catch((error) => {
      console.log(error);

      if (error.response !== undefined) {
        Toast('close');
        Toast('error', error.response.data);
      } else {
        Toast('close');
        Toast('error', 'Something went wrong');
      }

    })
  }

  // add new complaint - function
  const addComplaint = () => {
    setLoading(true);

    let isValidated = validateData();

    if (isValidated) {

      let formData = new FormData();

      if (registeredComplainer) {
        formData.append('complainerId', complainerDetails.id);
      } else {
        formData.append('complainerId', 0);
      }

      formData.append('instituteId', selectedInstitute.value);
      formData.append('complainTitle', title);
      formData.append('complainDescription', complainDesc);
      formData.append('location', location);

      if (selectedImage !== null)
        formData.append('imageFile', selectedImage);

      axios({
        method: 'POST',
        url: `http://localhost:8080/complaint/add-complaint`,
        data: formData
      }).then((res) => {

        let data = res.data;
        console.log(data);
        setLoading(false);

        toggle();

        if (registeredComplainer)
          getComplaintByComplainer();

        Toast('close');
        Toast('success', 'Successfully saved');

      }).catch((error) => {
        console.log(error);
        setLoading(false);

        if (error.response !== undefined) {
          Toast('close');
          Toast('error', error.response.data);
        } else {
          Toast('close');
          Toast('error', 'Something went wrong');
        }

      })

    }

  }

  // validate input data - function
  const validateData = () => {
    if (Object.keys(selectedInstitute).length === 0) {
      setLoading(false);
      Toast('close');
      Toast('error', 'Please select a institute');
      return false;
    } else if (location.length === 0) {
      setLoading(false);
      Toast('close');
      Toast('error', 'Location can not be empty');
      return false;
    } else if (title.length === 0) {
      setLoading(false);
      Toast('close');
      Toast('error', 'Title can not be empty');
      return false;
    } else if (complainDesc.length === 0) {
      setLoading(false);
      Toast('close');
      Toast('error', 'Description can not be empty');
      return false;
    } else {
      return true;
    }
  }

  return (
    <React.Fragment>
      <div className="modal-header align-center">
        <h5 className="modal-title">Add New Complaint</h5>

        <a
          href="#close"
          onClick={(ev) => {
            ev.preventDefault();
            toggle();
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
      </div>

      <div className="modal-body">

        <Row className="g-4">
          <Col lg="6">
            <div className="form-group">
              <label className="form-label">Institute</label>
              <div className="form-group">
                <RSelect options={allInstitute}
                  value={selectedInstitute}
                  onChange={(value) => {
                    setSelectedInstitute(value);
                  }}
                />
              </div>
            </div>
          </Col>

          <Col lg="6">
            <div className="form-group">
              <label className="form-label" htmlFor="email-address-1">
                Location
              </label>
              <div className="form-control-wrap">
                <input type="text" id="email-address-1" className="form-control"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
            </div>
          </Col>

          <Col lg="6">
            <div className="form-group">
              <label className="form-label" htmlFor="full-name-1">
                Title
              </label>
              <div className="form-control-wrap">
                <input type="text" id="full-name-1" className="form-control"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
          </Col>

          <Col lg="6">
            <div className="form-group">
              <label className="form-label">Image</label>
              <div className="form-control-wrap">
                <div className="form-file">
                  <Input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    id="customFile"
                    onChange={(e) => {
                      setSelectedImage(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col className="col-12">
            <div className="form-group">
              <label className="form-label" htmlFor="email-address-1">
                Complaint
              </label>
              <div className="form-control-wrap">
                <div className="input-group">
                  <textarea className="form-control"
                    value={complainDesc}
                    onChange={(e) => {
                      setComplainDesc(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="modal-footer modal-footer-stretch bg-light">
        <div className="modal-footer-between">
          <div className="g"></div>
          <div className="g">
            <ul className="btn-toolbar g-3">
              <li>
                <a
                  href="#file-share"
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggle();
                  }}
                  className="btn btn-outline-light btn-white"
                >
                  Cancel
                </a>
              </li>
              <li>
                <a
                  href="link"
                  onClick={(ev) => {
                    ev.preventDefault();
                    addComplaint();
                  }}
                  className="btn btn-primary"
                >
                  {loading ? <Spinner size="sm" color="light" /> : "Save"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddNewComplainModal;
