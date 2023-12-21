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
import Toast from "../../utils/Toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ChangeStatusModal from "./modals/ChangeStatusModal";
import AddInvestigationReport from "./modals/AddInvestigationReport";


const UserComplainList = ({ data }) => {

  const navigate = useNavigate();

  const [updateStatusModal, setUpdateStatusModal] = useState(false);
  const [addReportModal, setAddReportModal] = useState(false);

  const toggleUpdateStatusModal = () => {
    setUpdateStatusModal(!updateStatusModal);
  };
  const toggleAddReportModal = () => {
    setAddReportModal(!addReportModal);
  };


  const [selectedComplaintId, setSelectedComplaintId] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState({});


  const DropdownTrans = ({ rowdata }) => {

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
                  navigate(`${process.env.PUBLIC_URL}/complain-view`, { state: { data: rowdata } });
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
                  setSelectedComplaint(rowdata);
                  toggleUpdateStatusModal();
                }}
              >
                Change Status
              </DropdownItem>
            </li>

            {userDetails.role === 'Investigation Officer' ? (
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                  setSelectedComplaintId(rowdata.id);
                  toggleAddReportModal();
                }}
              >
                Add Investigation Report
              </DropdownItem>
            </li>
            ): <></> }
            
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };


  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  };

  //-------------------------------------------------------------------------

  const userDetails = JSON.parse(localStorage.getItem('logged_user'));

  const [complaintList, setComplaintList] = useState([]);

  // call get all complaint function
  useEffect(() => {
    getComplaintByInstitute();
  }, [UserComplainList])


  // get all complaint by institute - function
  const getComplaintByInstitute = () => {

    // send request to backend
    axios({
      method: 'GET',
      url: `http://localhost:8080/complaint/get-all-complains-by-institute/${userDetails.institute.id}`,
    }).then((res) => {

      let data = res.data;
      console.log(data);
      data.forEach(element => {
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(element.addedDateTime));
        element.date = formattedDate;
      });
      setComplaintList(data);

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
    <Head title="Complaint List"></Head>
    <Content>

      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h3" page>
              Complaint List
            </BlockTitle>
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
                <th className="tb-tnx-id">
                  <span className="">Title</span>
                </th>
                <th className="tb-tnx-id">
                  <span className="">Location</span>
                </th>
                <th className="tb-tnx-id">
                  <span className="">Date & Time</span>
                </th>
                <th className="tb-tnx-id">
                  <span className="">Institute</span>
                </th>
                <th className="tb-tnx-id">
                  <span className="">Status</span>
                </th>
                <th className="tb-tnx-action">
                  <span>&nbsp;</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {complaintList.map((item, i) => {
                return (
                  <tr key={item.id} className="tb-tnx-item">
                    <td className="tb-tnx-id">
                      <span>{i + 1}</span>
                    </td>
                    <td className="tb-tnx-info">
                      <span className="title">{item.complaintTitle}</span>
                    </td>
                    <td className="tb-tnx-info">
                      <span className="title">{item.location}</span>
                    </td>
                    <td className="tb-tnx-info">
                      <span className="title">{item.date}</span>
                    </td>
                    <td className="tb-tnx-info">
                      <span className="title">{item.institute.name}</span>
                    </td>
                    <td className="tb-tnx-amount is-alt">
                      <div className="tb-tnx-status">
                        <Badge
                          className="badge-dot"
                          color={
                            item.status === "Completed" ? "success" : item.status === "Pending" ? "warning" : "primary"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </td>


                    <td className="tb-tnx-action">
                      <DropdownTrans rowdata={item} />
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


    <Modal isOpen={updateStatusModal} size="md" toggle={toggleUpdateStatusModal}>
      <ChangeStatusModal toggle={toggleUpdateStatusModal} showModal={updateStatusModal}
        selectedComplaint={selectedComplaint} getComplaintByInstitute={getComplaintByInstitute}
      />
    </Modal>


    <Modal isOpen={addReportModal} size="lg" toggle={toggleAddReportModal}>
      <AddInvestigationReport toggle={toggleAddReportModal} showModal={addReportModal}
        selectedComplaintId={selectedComplaintId} getComplaintByInstitute={getComplaintByInstitute}
      />
    </Modal>

  </>;
};
export default UserComplainList;
