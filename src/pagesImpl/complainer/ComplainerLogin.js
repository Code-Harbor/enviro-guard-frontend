import React, { useState } from "react";
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
import { Form, Spinner, Modal } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, json } from "react-router-dom";
import AddNewComplainModal from "./modals/AddNewComplainModal";
import { useNavigate } from "react-router-dom";
import Toast from "../../utils/Toast";
import axios from "axios";


const ComplainerLogin = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addComplainModal, setAddComplainModal] = useState(false);

  const toggleAddComplainModal = () => {
    setAddComplainModal(!addComplainModal);
  };


  // complainer login function
  const login = () => {
    setLoading(true);

    // validate data
    let isValidated = validate();

    if (isValidated) {
      // send request to backend
      axios({
        method: 'POST',
        url: `http://localhost:8080/complainer/complainer-login`,
        data: {
          email: email,
          password: password,
        }
      }).then((res) => {

        let data = res.data;
        localStorage.setItem('account_type', 'complainer');
        localStorage.setItem('logged_complainer', JSON.stringify(data));

        setLoading(false);

        navigate(`${process.env.PUBLIC_URL}/complainer-profile`);


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
    if (email.length === 0) {
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
    <Head title="Login" />
    <Block className="nk-block-middle nk-auth-body  wide-xs">

      <div className="brand-logo pb-4 text-center">
        <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
          <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
          <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
        </Link>
      </div>

      <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
        <BlockHead>
          <BlockContent>
            <BlockTitle tag="h4">Sign-In</BlockTitle>
            <BlockDes>
              <p>Access Enviro Guard using your email and passcode.</p>
            </BlockDes>
          </BlockContent>
        </BlockHead>

        <form className="is-alter">
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="default-01">
                Email
              </label>
            </div>
            <div className="form-control-wrap">
              <input
                type="text"
                placeholder="Enter your email address"
                className="form-control-lg form-control"
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
              {/* <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                Forgot Code?
              </Link> */}
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

            <Button size="lg" className="btn-block" color="primary"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
            </Button>

          </div>
        </form>

        <div className="form-note-s2 text-center pt-4">
          New on our platform? <Link to={`${process.env.PUBLIC_URL}/register`}>Create an account</Link>
        </div>

        <div className="text-center pt-4 pb-3">
          <h6 className="overline-title overline-title-sap">
            <span>OR make complain without sign in</span>
          </h6>
        </div>

        <ul className="nav justify-center gx-4">
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
export default ComplainerLogin;
