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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Toast from "../../utils/Toast";
import axios from "axios";

const UserLogin = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');


  // user login - function
  const login = () => {
    setLoading(true);

    // validate input data
    if (userEmail.length === 0 || userPassword.length === 0) {

      setLoading(false);
      Toast('close');
      Toast('warning', 'Please enter a valid email and password');

    } else {

      // send request to backend
      axios({
        method: 'POST',
        url: `http://localhost:8080/user/user-login`,
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUU19HRU4iLCJuYW1lIjoiVFNUUEwiLCJpYXQiOjE2MzgwODI0ODAsImF1dGhvciI6InZpaGFuZ2F3aWNrcyIsImV4cCI6MjIwODk2OTAwMH0.MdzZ0xzpDoOR56JRQg5Vusq4onJevPVjvMckuaWcZ4U',
        },
          data: {
          email: userEmail,
          password: userPassword,
        }
      }).then((res) => {

        let data = res.data;

        // check admin or user 
        if (data.type === 'admin') {

          // save user details on local storage
          localStorage.setItem('account_type', 'admin');
          localStorage.setItem('user_details', JSON.stringify(data));
          navigate(`${process.env.PUBLIC_URL}/admin/users-list`);

        } else if (data.type === 'user') {

          // save user details on local storage
          localStorage.setItem('account_type', 'user');
          localStorage.setItem('user_details', JSON.stringify(data));
          navigate(`${process.env.PUBLIC_URL}/admin/users-list`);

        }

        setLoading(false);

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

  return <>
    <Head title="Admin Login" />
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
            <BlockTitle tag="h4">Admin Sign-In</BlockTitle>
            <BlockDes>
              <p>Access Enviro Guard Admin using your email and password.</p>
            </BlockDes>
          </BlockContent>
        </BlockHead>

        <form>
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="default-01">
                Email
              </label>
            </div>
            <div className="form-control-wrap">
              <input
                type="text"
                placeholder="Enter your email address or username"
                className="form-control-lg form-control"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />

            </div>
          </div>
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="password">
                password
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
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
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


      </PreviewCard>
    </Block>
    <AuthFooter />
  </>;
};
export default UserLogin;
