import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/custom/logo-1.png";
import LogoDark from "../../images/custom/logo-1.png";
import Head from "../../layout/head/Head";
import AuthFooter from "../../pages/auth/AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Spinner, Modal } from "reactstrap";
import { Link } from "react-router-dom";
import Toast from "../../utils/Toast";
import axios from "axios";
import AddNewComplainModal from "./modals/AddNewComplainModal";


const ComplainerRegister = () => {

  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addComplainModal, setAddComplainModal] = useState(false);

  const toggleAddComplainModal = () => {
    setAddComplainModal(!addComplainModal);
  };


  // complainer register function
  const registerComplainer = () => {
    setLoading(true);

    // validate data
    let isValidated = validate();

    if (isValidated) {
      // send request to backend
      axios({
        method: 'POST',
        url: `http://localhost:8080/complainer/register-complainer`,
        data: {
          name: name,
          email: email,
          password: password,
        }
      }).then((res) => {

        let data = res.data;
        setLoading(false);

        Toast('close');
        Toast('success', 'Succussfully registered');

        navigate(`${process.env.PUBLIC_URL}/`);

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

  };

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

  return <>
    <Head title="Register" />
    <Block className="nk-block-middle nk-auth-body  wide-xs">
      <div className="brand-logo pb-4 text-center">
        <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
          <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
          <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
        </Link>
      </div>
      <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
        <BlockHead>
          <BlockContent>
            <BlockTitle tag="h4">Register</BlockTitle>
            <BlockDes>
              <p>Create New Enviro Guard Account</p>
            </BlockDes>
          </BlockContent>
        </BlockHead>

        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <div className="form-control-wrap">
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control-lg form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

            </div>
          </div>
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="default-01">
                Email
              </label>
            </div>
            <div className="form-control-wrap">
              <input
                type="text"
                bssize="lg"
                className="form-control-lg form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

            </div>
          </div>
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
            </div>
            <div className="form-control-wrap">
              <a
                href="#password"
                onClick={(ev) => {
                  ev.preventDefault();
                  setPassState(!passState);
                }}
                className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
              >
                <Icon name="eye" className="passcode-icon icon-show"></Icon>

                <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
              </a>
              <input
                type={passState ? "text" : "password"}
                id="password"
                placeholder="Enter your passcode"
                className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

            </div>
          </div>
          <div className="form-group">
            <Button color="primary" size="lg" className="btn-block"
              onClick={(e) => {
                e.preventDefault();
                registerComplainer();
              }}
            >
              {loading ? <Spinner size="sm" color="light" /> : "Register"}
            </Button>
          </div>
        </form>
        <div className="form-note-s2 text-center pt-4">
          {" "}
          Already have an account?{" "}
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <strong>Sign in instead</strong>
          </Link>
        </div>
        <div className="text-center pt-4 pb-3">
          <h6 className="overline-title overline-title-sap">
            <span>OR make complain without sign up</span>
          </h6>
        </div>
        <ul className="nav justify-center gx-8">
          <li className="nav-item">
            <a
              className="btn btn-outline-primary"
              href="#socials"
              onClick={(ev) => {
                ev.preventDefault();
                toggleAddComplainModal();
              }}
            >
              Make complain
            </a>
          </li>

        </ul>
      </PreviewCard>
    </Block>
    <AuthFooter />

    <Modal isOpen={addComplainModal} size="lg" toggle={toggleAddComplainModal}>
      <AddNewComplainModal toggle={toggleAddComplainModal} showModal={addComplainModal} registeredComplainer={false} />
    </Modal>

  </>;
};
export default ComplainerRegister;
