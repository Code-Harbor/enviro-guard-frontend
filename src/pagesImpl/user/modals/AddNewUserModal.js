import React from "react";
import { Icon } from "../../../components/Component";
import { Row, Col } from "reactstrap";
import { RSelect } from "../../../components/Component";

const AddNewUserModal = ({ toggle, }) => {

  const instituteOptions = [
    { value: "1", label: "Wildlife" },
    { value: "2", label: "Forestry and Environmental" },
  ];

  const userRoleOptions = [
    { value: "1", label: "Director" },
    { value: "2", label: "Manager" },
    { value: "3", label: "Investigation Officer" },
  ];


  return (
    <React.Fragment>
      <div className="modal-header align-center">
        <h5 className="modal-title">Add New User</h5>

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
                <RSelect options={instituteOptions} />
              </div>
            </div>
          </Col>
          <Col lg="6"></Col>
          <Col lg="6">
            <div className="form-group">
              <label className="form-label" htmlFor="full-name-1">
                Name
              </label>
              <div className="form-control-wrap">
                <input type="text" id="full-name-1" className="form-control" />
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="form-group">
              <label className="form-label" htmlFor="email-address-1">
                Email
              </label>
              <div className="form-control-wrap">
                <input type="text" id="email-address-1" className="form-control" />
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="form-group">
              <label className="form-label" htmlFor="email-address-1">
                Password
              </label>
              <div className="form-control-wrap">
                <input type="text" id="email-address-1" className="form-control" />
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="form-group">
              <label className="form-label">User Role</label>
              <div className="form-group">
                <RSelect options={userRoleOptions} />
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
                    // 
                  }}
                  className="btn btn-primary"
                >
                  Save
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddNewUserModal;
