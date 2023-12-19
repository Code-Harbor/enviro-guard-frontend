import React, { useEffect, useState } from "react";
import { Icon } from "../../../components/Component";
import { Row, Col } from "reactstrap";
import { RSelect } from "../../../components/Component";
import Toast from "../../../utils/Toast";
import axios from "axios";
import { Spinner } from "reactstrap";


const ChangeStatusModal = ({ toggle, showModal, selectedComplaint, getComplaintByInstitute }) => {

  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Ongoing", label: "Ongoing" },
    { value: "Completed", label: "Completed" },
  ];

  const [selectedStatus, setSelectedStatus] = useState({});


  useEffect(() => {
    if (showModal) {
      if (selectedComplaint.status === 'Pending') {
        setSelectedStatus({ value: "Pending", label: "Pending" });
      } else if (selectedComplaint.status === 'Ongoing') {
        setSelectedStatus({ value: "Ongoing", label: "Ongoing" });
      } else if (selectedComplaint.status === 'Completed') {
        setSelectedStatus({ value: "Completed", label: "Completed" });
      }
    }
  }, [ChangeStatusModal])


  // update complaint status
  const updateComplaintStatus = () => {
    setLoading(true);

    axios({
      method: 'POST',
      url: `http://localhost:8080/complaint/update-status/${selectedComplaint.id}?newStatus=${selectedStatus.value}`,
    }).then((res) => {

      setLoading(false);
      toggle();

      Toast('close');
      Toast('success', 'Successfully updated');

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
        <h5 className="modal-title">Update Complaint Status</h5>

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

        <div className="" style={{ padding: '40px 60px' }}>
          <Row className="g-4">

            <Col lg="12">
              <div className="form-group">
                <label className="form-label">Select Status</label>
                <div className="form-group">
                  <RSelect options={statusOptions}
                    value={selectedStatus}
                    onChange={(value) => {
                      setSelectedStatus(value);
                    }}
                  />
                </div>
              </div>
            </Col>


          </Row>
        </div>
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
                    updateComplaintStatus();
                  }}
                  className="btn btn-primary"
                >
                  {loading ? <Spinner size="sm" color="light" /> : "Update"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangeStatusModal;
