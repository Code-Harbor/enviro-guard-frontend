import React, { useState } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import { useNavigate } from "react-router-dom";


const User = () => {

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  //---------------------------------------------------------------

  const navigate = useNavigate();

  const accountType = localStorage.getItem('account_type');
  const loggedComplainer = JSON.parse(localStorage.getItem('logged_complainer'));
  const loggedUser = JSON.parse(localStorage.getItem('logged_user'));

  // handle sign out function
  const handleSignout = () => {

    if (accountType === 'complainer') {
      navigate(`${process.env.PUBLIC_URL}/`);
    } else if (accountType === 'admin') {
      navigate(`${process.env.PUBLIC_URL}/admin-login`);
    } else if (accountType === 'user') {
      navigate(`${process.env.PUBLIC_URL}/admin-login`);
    }

  };


  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          {accountType === 'complainer' ? (
            <div className="user-info d-none d-md-block">
              <div className="user-status">{loggedComplainer.email}</div>
              <div className="user-name dropdown-indicator">{loggedComplainer.name}</div>
            </div>
          ) : (
            <div className="user-info d-none d-md-block">
              <div className="user-status">{loggedUser.role}</div>
              <div className="user-name dropdown-indicator">{loggedUser.name}</div>
            </div>
          )}
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">

          {accountType === 'complainer' ? (
            <div className="user-card sm">
              <div className="user-avatar">
                <span>AB</span>
              </div>
              <div className="user-info">
                <span className="lead-text">{loggedComplainer.name}</span>
                <span className="sub-text">{loggedComplainer.email}</span>
              </div>
            </div>
          ) : (
            <div className="user-card sm">
              <div className="user-avatar">
                <span>AB</span>
              </div>
              <div className="user-info">
                <span className="lead-text">{loggedUser.name}</span>
                <span className="sub-text">{loggedUser.email}</span>
              </div>
            </div>
          )}


        </div>
        {/* <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem>
          </LinkList>
        </div> */}
        <div className="dropdown-inner">
          <LinkList>
            <a href='#' onClick={(e) => {
              e.preventDefault();
              handleSignout();
            }}
            >
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
