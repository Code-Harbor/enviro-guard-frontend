import React from "react";
import LogoLight2x from "../../images/custom/logo-2.png";
import LogoDark2x from "../../images/custom/logo-2.png";
import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo-link">
      <img className="logo-light logo-img" src={LogoLight2x} alt="logo" />
      <img className="logo-dark logo-img" src={LogoDark2x} alt="logo" />
    </div>
  );
};

export default Logo;
