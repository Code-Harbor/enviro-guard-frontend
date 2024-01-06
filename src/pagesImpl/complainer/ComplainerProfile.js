import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import { Card } from "reactstrap";
import Head from "../../layout/head/Head";
import { Modal, ModalBody, Spinner } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  Button,
  RSelect
} from "../../components/Component";
import { countryOptions, userData } from "../../pages/pre-built/user-manage/UserData";
import { getDateStructured } from "../../utils/Utils";
import ComplainerProfileAside from "./ComplainerProfileAside";
import Toast from "../../utils/Toast";
import axios from "axios";



const ComplainerProfile = () => {

  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const [modalTab, setModalTab] = useState("1");
  const [userInfo, setUserInfo] = useState(userData[0]);
  const [formData, setFormData] = useState({
    name: "Abu Bin Ishtiak",
    displayName: "Ishtiak",
    phone: "818474958",
    dob: "1980-08-10",
    address: "2337 Kildeer Drive",
    address2: "",
    state: "Kentucky",
    country: "Canada",
  });
  const [modal, setModal] = useState(false);



  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(() => {
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
      updateSm(false);
    });
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);

  //---------------------------------------------------------------------

  const complainerDetails = JSON.parse(localStorage.getItem('logged_complainer'));
  const [loading, setLoading] = useState(false);

  const [profileInfo, setProfileInfo] = useState({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');


  useEffect(() => {
    getComplainerDetailsById();
  }, [ComplainerProfile])


  useEffect(() => {
    if (modal) {
      setName(profileInfo.name);
      setEmail(profileInfo.email);
      if (profileInfo.phoneNumber !== undefined) {
        setPhoneNumber(profileInfo.phoneNumber);
      }
      if (profileInfo.address !== undefined) {
        setAddress(profileInfo.address);
      }
      setPassword(profileInfo.password);
    }
  }, [modal])


  // get complainer details by complainer id
  const getComplainerDetailsById = () => {

    // send request to backend
    axios({
      method: 'GET',
      url: `http://localhost:8080/complainer/get-complainer-by-id/${complainerDetails.id}`,
    }).then((res) => {

      let data = res.data;
      setProfileInfo(data);

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

  // update complainer details
  const updateComplainerDetails = () => {
    setLoading(true);

    // validate data
    let isValidated = validate();

    if (isValidated) {
      // send request to backend
      axios({
        method: 'POST',
        url: `http://localhost:8080/complainer/update-complainer`,
        data: {
          id: complainerDetails.id,
          name: name,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          address: address,
        }
      }).then((res) => {

        let data = res.data;
        setLoading(false);
        setModal(false);

        Toast('close');
        Toast('success', 'Succussfully updated');

        getComplainerDetailsById();

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
    } else {
      return true;
    }
  }

  return (
    <React.Fragment>
      <Head title="Profile"></Head>
      <Content>
        <Card className="card-bordered">
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${sm ? "content-active" : ""
                }`}
            >
              <ComplainerProfileAside updateSm={updateSm} sm={sm} profileInfo={profileInfo} />
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
              <BlockHead size="lg">
                <BlockBetween>
                  <BlockHeadContent>
                    <BlockTitle tag="h4">Personal Information</BlockTitle>
                  </BlockHeadContent>
                  <BlockHeadContent className="align-self-start d-lg-none">
                    <Button
                      className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
                      onClick={() => updateSm(!sm)}
                    >
                      <Icon name="menu-alt-r"></Icon>
                    </Button>
                  </BlockHeadContent>
                </BlockBetween>
              </BlockHead>

              <Block>
                <div className="nk-data data-list">
                  <div className="data-head">
                    <h6 className="overline-title">Basics</h6>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Name</span>
                      <span className="data-value">{profileInfo.name}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>

                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Email</span>
                      <span className="data-value">{profileInfo.email}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Phone Number</span>
                      <span className="data-value">{profileInfo.phoneNumber}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>

                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Address</span>
                      <span className="data-value">
                        {profileInfo.address}
                      </span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                </div>

              </Block>

              <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
                <a
                  href="#dropdownitem"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModal(false);
                  }}
                  className="close"
                >
                  <Icon name="cross-sm"></Icon>
                </a>
                <ModalBody>
                  <div className="p-2">
                    <h5 className="title pb-4">Update Profile</h5>

                    <Row className="gy-4">
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="full-name">
                            Name
                          </label>
                          <input
                            type="text"
                            id="full-name"
                            className="form-control"
                            name="name"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            value={name}
                            placeholder="Enter name"
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="display-name">
                            Email
                          </label>
                          <input
                            type="text"
                            id="display-name"
                            className="form-control"
                            name="displayName"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            value={email}
                            placeholder="Enter email"
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="phone-no">
                            Phone Number
                          </label>
                          <input
                            type="number"
                            id="phone-no"
                            className="form-control"
                            name="phone"
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                            }}
                            value={phoneNumber}
                            placeholder="Phone Number"
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="display-name">
                            Address
                          </label>
                          <input
                            type="text"
                            id="display-name"
                            className="form-control"
                            name="displayName"
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                            value={address}
                            placeholder="Enter address"
                          />
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="display-name">
                            Password
                          </label>
                          <input
                            type="password"
                            id="display-name"
                            className="form-control"
                            name="displayName"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            value={password}
                            placeholder="Enter password"
                          />
                        </div>
                      </Col>

                      <Col size="12">
                        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                          <li>
                            <Button
                              color="primary"
                              size="lg"
                              onClick={(ev) => {
                                ev.preventDefault();
                                updateComplainerDetails();
                              }}
                            >

                              {loading ? <Spinner size="sm" color="light" /> : "Update Profile"}
                            </Button>
                          </li>
                          <li>
                            <a
                              href="#dropdownitem"
                              onClick={(ev) => {
                                ev.preventDefault();
                                setModal(false);
                              }}
                              className="link link-light"
                            >
                              Cancel
                            </a>
                          </li>
                        </ul>
                      </Col>
                    </Row>

                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </Card>
      </Content>
    </React.Fragment>
  );
};

export default ComplainerProfile;
