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
import AddNewComplainModal from "./modals/AddNewComplainModal";
import Toast from "../../utils/Toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const ComplainList = () => {

  const navigate = useNavigate();

  const [addComplainModal, setAddComplainModal] = useState(false);

  const toggleAddComplainModal = () => {
    setAddComplainModal(!addComplainModal);
  };

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

  const complainerDetails = JSON.parse(localStorage.getItem('logged_complainer'));

  const [complaintList, setComplaintList] = useState([]);

  // call get all complaint function
  useEffect(() => {
    getComplaintByComplainer();
  }, [ComplainList])


  // get all complaint by complainer - function
  const getComplaintByComplainer = () => {

    // send request to backend
    axios({
      method: 'GET',
      url: `http://localhost:8080/complaint/get-all-complains-by-complainer/${complainerDetails.id}`,
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
          <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <div className="toggle-expand-content" style={{ display: "block" }}>
                <ul className="nk-block-tools g-3">

                  <li className="nk-block-tools-opt">
                    <Button color="primary" className="btn-icon" onClick={() => {
                      toggleAddComplainModal();
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

    <Modal isOpen={addComplainModal} size="lg" toggle={toggleAddComplainModal}>
      <AddNewComplainModal toggle={toggleAddComplainModal} showModal={addComplainModal} registeredComplainer={true}
        getComplaintByComplainer={getComplaintByComplainer}
      />
    </Modal>

  </>;
};
export default ComplainList;
