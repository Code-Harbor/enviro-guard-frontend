import React, { useState, useEffect, useContext } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
  Card,
  Badge,
  Modal
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
} from "../../components/Component";
import { transactionData } from "../../components/table/TableData";
import AddNewUserModal from "./modals/AddNewUserModal";
import Toast from "../../utils/Toast";
import axios from "axios";


const UsersList = ({ data }) => {

  const [usersList, setUsersList] = useState([]);

  const [allInstitute, setAllInstitute] = useState([]);
  const [dropdownBtnValue, setDropdownBtnValue] = useState({ value: 0, label: 'All Users' })

  const [addUserModal, setAddUserModal] = useState(false);

  const toggleAddUserModal = () => {
    setAddUserModal(!addUserModal);
  };

  const DropdownTrans = () => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
          <Icon name="more-h"></Icon>
        </DropdownToggle>
        <DropdownMenu end>
          <ul className="link-list-plain">
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                View
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Invoice
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Print
              </DropdownItem>
            </li>
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };


  // call get all institute function
  useEffect(() => {
    getAlInstitute();
  }, [UsersList])


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



  // get all users when render component
  useEffect(() => {
    getUsersByInstituteId(0);
  }, [UsersList])


  // get user by institute id - function
  const getUsersByInstituteId = (instituteId) => {

    // send request to backend
    axios({
      method: 'GET',
      url: `http://localhost:8080/user/get-all-users-by-institute/${instituteId}`,
    }).then((res) => {

      let data = res.data;
      console.log(data);
      setUsersList(data)

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

  return <>
    <Head title="Users List"></Head>
    <Content>

      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h3" page>
              Users List
            </BlockTitle>
          </BlockHeadContent>
          <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <div className="toggle-expand-content" style={{ display: "block" }}>
                <ul className="nk-block-tools g-3">

                  <li>
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                        <Icon className="d-none d-sm-inline" name="users" />
                        <span>{dropdownBtnValue.label}</span>
                        <Icon className="dd-indc" name="chevron-right" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <ul className="link-list-opt no-bdr">
                          <li>
                            <DropdownItem
                              tag="a"
                              onClick={(ev) => {
                                ev.preventDefault();
                                setDropdownBtnValue({ value: 0, label: 'All Users' });
                                getUsersByInstituteId(0);
                              }}
                              href="#!"
                            >
                              <span>All Users</span>
                            </DropdownItem>
                          </li>
                          {
                            allInstitute.map((item, i) =>
                              <li>
                                <DropdownItem
                                  tag="a"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setDropdownBtnValue(item);
                                    getUsersByInstituteId(item.value);
                                  }}
                                  href="#dropdownitem"
                                >
                                  <span>{item.label}</span>
                                </DropdownItem>
                              </li>
                            )
                          }

                          {/* <li>
                            <DropdownItem
                              tag="a"
                              onClick={(ev) => {
                                ev.preventDefault();
                                setDropdownBtnValue('Wildlife');
                                getUsersByInstituteId(1);
                              }}
                              href="#dropdownitem"
                            >
                              <span>Wildlife</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              onClick={(ev) => {
                                ev.preventDefault();
                                setDropdownBtnValue('Forestry and Environmental');
                                getUsersByInstituteId(2);
                              }}
                              href="#dropdownitem"
                            >
                              <span>Forestry and Environmental</span>
                            </DropdownItem>
                          </li> */}

                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>

                  <li className="nk-block-tools-opt">
                    <Button color="primary" className="btn-icon" onClick={() => {
                      toggleAddUserModal();
                    }}>
                      <Icon name="plus"></Icon>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>


      <Block size="lg">
        <Card className="card-bordered card-preview">

          <table className={`table table-tranx`}>
            <thead>
              <tr className="tb-tnx-head">
                <th className="tb-tnx-id">
                  <span className="">#</span>
                </th>
                <th className="tb-tnx-info">
                  <span>Name</span>
                </th>
                <th className="tb-tnx-info">
                  <span>Email</span>
                </th>
                <th className="tb-tnx-info">
                  <span>Institute</span>
                </th>
                <th className="tb-tnx-info">
                  <span>Role</span>
                </th>
                <th className="tb-tnx-action">
                  <span>&nbsp;</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((item, i) => {
                return (
                  <tr key={item.id} className="tb-tnx-item">
                    <td className="tb-tnx-id">
                      <span>{i + 1}</span>
                    </td>
                    <td className="tb-tnx-info">
                      <span className="title">{item.name}</span>
                    </td>
                    <td className="tb-tnx-info">
                      <span className="title">{item.email}</span>
                    </td>
                    <td className="tb-tnx-info">
                      <span className="title">{item.institute.name}</span>
                    </td>
                    <td className="tb-tnx-info">
                      <span className="title">{item.role}</span>
                    </td>




                    <td className="tb-tnx-action">
                      <DropdownTrans />
                    </td>

                  </tr>
                );
              })
              }
            </tbody>
          </table>

        </Card>
      </Block>

    </Content>

    <Modal isOpen={addUserModal} size="lg" toggle={toggleAddUserModal}>
      <AddNewUserModal toggle={toggleAddUserModal} showModal={addUserModal}
        getUsersByInstituteId={getUsersByInstituteId} dropdownBtnValue={dropdownBtnValue} />
    </Modal>

  </>;
};
export default UsersList;
