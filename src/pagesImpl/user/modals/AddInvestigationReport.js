import React, { useEffect, useState } from "react";
import { Icon } from "../../../components/Component";
import { Row, Col, Input } from "reactstrap";
import { RSelect } from "../../../components/Component";
import Toast from "../../../utils/Toast";
import axios from "axios";
import { Spinner } from "reactstrap";


const AddInvestigationReport = ({ toggle, showModal, selectedComplaintId, getComplaintByInstitute }) => {

  const [complainDesc, setComplainDesc] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);

  // save Investigation Repor- function
  const saveInvestigationReport = () => {
    setLoading(true);

    if (complainDesc.length > 0) {
      let formData = new FormData();
      formData.append('complaintId', selectedComplaintId);
      formData.append('description', complainDesc);

      if (selectedImage !== null)
        formData.append('imageFile', selectedImage);

      axios({
        method: 'POST',
        url: `http://localhost:8080/investigation/add-investigation-report`,
        data: formData
      }).then((res) => {

        updateComplaintStatus();

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

    } else {
      setLoading(false);
      Toast('close');
      Toast('error', 'Investigation report can not be empty');
    }

  }

  // update complaint status
  const updateComplaintStatus = () => {
    setLoading(true);

    axios({
      method: 'POST',
      url: `http://localhost:8080/complaint/update-status/${selectedComplaintId}?newStatus=Completed`,
    }).then((res) => {

      toggle();

      Toast('close');
      Toast('success', 'Successfully saved');

      getComplaintByInstitute();

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


  return (
    <React.Fragment>
      <div className="modal-header align-center">
        <h5 className="modal-title">Add Investigation Report</h5>

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

          <Col className="col-12">
            <div className="form-group">
              <label className="form-label" htmlFor="email-address-1">
                Investigation Report
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
                    saveInvestigationReport();
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

export default AddInvestigationReport;
