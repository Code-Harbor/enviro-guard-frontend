import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, UserAvatar } from "../../components/Component";
import { findUpper } from "../../utils/Utils";
import { DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";

const ComplainerProfileAside = ({ updateSm, sm }) => {
    const [profileName, setProfileName] = useState("Abu Bin Ishtiak");

    useEffect(() => {
        sm ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
    }, [sm])

    return (
        <div className="card-inner-group">
            <div className="card-inner">
                <div className="user-card">
                    <UserAvatar text={findUpper(profileName)} theme="primary" />
                    <div className="user-info">
                        <span className="lead-text">{profileName}</span>
                        <span className="sub-text">info@softnio.com</span>
                    </div>
                    
                </div>
            </div>
            
            <div className="card-inner p-0">
                <ul className="link-list-menu">
                    <li onClick={() => updateSm(false)}>
                        <Link
                            to={`${process.env.PUBLIC_URL}/complainer-profile`}
                            className={
                                window.location.pathname === `${process.env.PUBLIC_URL}/complainer-profile` ? "active" : ""
                            }
                        >
                            <Icon name="user-fill-c"></Icon>
                            <span>Personal Information</span>
                        </Link>
                    </li>

                    <li onClick={() => updateSm(false)}>
                        <Link
                            to={`${process.env.PUBLIC_URL}/complainer-profile-setting`}
                            className={
                                window.location.pathname === `${process.env.PUBLIC_URL}/complainer-profile-setting` ? "active" : ""
                            }
                        >
                            <Icon name="lock-alt-fill"></Icon>
                            <span>Security Setting</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ComplainerProfileAside;
