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


const UserLogin = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);




  const login = () => {
    setLoading(true);
    localStorage.setItem('account_type', 'admin');


      navigate(`${process.env.PUBLIC_URL}/admin/users-list`);


    setLoading(false);
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
            <BlockTitle tag="h4">Admin Sign-In</BlockTitle>
            <BlockDes>
              <p>Access Enviro Guard Admin using your email and passcode.</p>
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
                placeholder="Enter your email address or username"
                className="form-control-lg form-control" />

            </div>
          </div>
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="password">
                Passcode
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
                className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />

            </div>
          </div>
          <div className="form-group">

            <Button size="lg" className="btn-block" type="submit" color="primary"
              onClick={() => {
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
