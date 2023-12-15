import React, { useEffect, useState } from "react";
import { Icon } from "../../../components/Component";
import { Row, Col } from "reactstrap";
import { RSelect } from "../../../components/Component";
import Toast from "../../../utils/Toast";
import axios from "axios";
import { Spinner } from "reactstrap";


const AddNewUserModal = ({ toggle, showModal, getUsersByInstituteId, dropdownBtnValue }) => {

  const instituteOptions = [
    { value: "1", label: "Wildlife" },
    { value: "2", label: "Forestry and Environmental" },
  ];

  const userRoleOptions = [
    { value: "Director", label: "Director" },
    { value: "Manager", label: "Manager" },
    { value: "Investigation Officer", label: "Investigation Officer" },
  ];


  const [allInstitute, setAllInstitute] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState({});
  const [selectedInstitute, setSelectedInstitute] = useState({});

  const [loading, setLoading] = useState(false);


  // call get all institute function
  useEffect(() => {
    if (showModal) {
      getAlInstitute();
    }
  }, [showModal])


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

  // add new user - function
  const addNewUser = () => {
    setLoading(true);

    console.log('insti ', selectedInstitute.value);
    console.log('name ', name);
    console.log('email ', email);
    console.log('password ', password);
    console.log('role ', selectedRole.value);

    // validate data
    let isValidated = validate();

    if (isValidated) {
      // send request to backend
      axios({
        method: 'POST',
        url: `http://localhost:8080/user/register-user`,
        data: {
          name: name,
          email: email,
          password: password,
          type: 'user',
          role: selectedRole.value,
          instituteId: selectedInstitute.value
        }
      }).then((res) => {

        let data = res.data;
        getUsersByInstituteId(dropdownBtnValue.value);
        setLoading(false);
        toggle();

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

  // data validate
  const validate = () => {
    if (name.length === 0) {
      setLoading(false);
      Toast('close');
      Toast('error', 'Name can not be empty');
      return false;
    } else if (email.length === 0) {
      setLoading(false);
      Toast('close');
      Toast('error', 'Email can not be empty');
      return false;
    } else if (password.length === 0) {
      setLoading(false);
      Toast('close');
      Toast('error', 'Password can not be empty');
      return false;
    } else if (selectedInstitute.value === undefined) {
      setLoading(false);
      Toast('close');
      Toast('error', 'Institute can not be empty');
      return false;
    } else if (selectedRole.value === undefined) {
      setLoading(false);
      Toast('close');
      Toast('error', 'Role can not be empty');
      return false;
    } else {
      return true;
    }
  }

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
                <RSelect options={allInstitute}
                  value={selectedInstitute}
                  onChange={(value) => {
                    setSelectedInstitute(value);
                  }}
                />
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
                <input type="text" id="full-name-1" className="form-control"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="form-group">
              <label className="form-label" htmlFor="email-address-1">
                Email
              </label>
              <div className="form-control-wrap">
                <input type="text" id="email-address-1" className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="form-group">
              <label className="form-label" htmlFor="email-address-1">
                Password
              </label>
              <div className="form-control-wrap">
                <input type="text" id="email-address-1" className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="form-group">
              <label className="form-label">User Role</label>
              <div className="form-group">
                <RSelect options={userRoleOptions}
                  value={selectedRole}
                  onChange={(value) => {
                    setSelectedRole(value);
                  }}
                />
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
                    addNewUser();
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

export default AddNewUserModal;
