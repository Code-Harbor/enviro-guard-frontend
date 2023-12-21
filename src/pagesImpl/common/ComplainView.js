import React, { useState, useEffect } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { Link } from "react-router-dom";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BackTo,
  PreviewCard,
  Icon,
  BlockDes,
  PreviewAltCard,
  UserAvatar,
  CodeBlock,
  Rating,
} from "../../components/Component";
import { findUpper } from "../../utils/Utils";
import { Row, Col, Progress, Card, Collapse, Button, Badge } from "reactstrap";
import { useLocation } from 'react-router-dom';
import Toast from "../../utils/Toast";
import axios from "axios";


const ComplainView = () => {

  const [collapse2, setCollapse2] = useState(true);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  };

  const { state } = useLocation();
  const dataFromState = state?.data;

  const accountType = localStorage.getItem('account_type');
  const userDetails = JSON.parse(localStorage.getItem('logged_user'));

  const [complaintDetails, setComplaintDetails] = useState('');
  const [investigationDetails, setInvestigationDetails] = useState(null);


  // call get complaint and investigation report function
  useEffect(() => {
    getComplaintAndInvestigationReport();
  }, [ComplainView])


  // get complaint and investigation report - function
  const getComplaintAndInvestigationReport = () => {

    axios({
      method: 'GET',
      url: `http://localhost:8080/complaint/get-complain-with-investigation/${dataFromState.id}`,
    }).then((res) => {

      let data = res.data;
      console.log(data);

      let complaintTemp = data.complaintBean;
      const formattedDate1 = new Intl.DateTimeFormat('en-US', options).format(new Date(complaintTemp.addedDateTime));
      complaintTemp.date = formattedDate1;
      setComplaintDetails(complaintTemp);

      let investigationTemp = data.investigationBean;
      if (investigationTemp != null) {
        const formattedDate2 = new Intl.DateTimeFormat('en-US', options).format(new Date(investigationTemp.addedDateTime));
        investigationTemp.date = formattedDate2;
      }
      setInvestigationDetails(investigationTemp);

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


  return (
    <>
      <Head title="View Complaint"></Head>
      <Content page="component">

        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BackTo link={`${accountType === 'complainer' ? '/complainer-complain-list' :
              accountType === 'user' ? '/admin/user-complain-list' : ''
              }`} icon="arrow-left">
              Complaint List
            </BackTo>
            <BlockTitle>
              View Complaint
            </BlockTitle>

          </BlockHeadContent>
        </BlockHead>

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Complaint</BlockTitle>
            </BlockHeadContent>
          </BlockHead>

          <Row className="g-gs">

            <Col md="12">
              <Card className="card-bordered">
                <div className="card-inner">
                  <h4 className="card-title mb-1">{complaintDetails.complaintTitle}</h4>


                  <div className="">
                    <ul className="pt-2 pb-2 gy-1 d-flex ">

                      <li style={{ marginRight: '25px' }}>
                        <Icon name="calender-date"></Icon>
                        <span>{complaintDetails.date}</span>
                      </li>
                      <li >
                        <Icon name="map-pin"></Icon>
                        <span>{complaintDetails.location}</span>
                      </li>
                    </ul>
                    <Badge color={`${complaintDetails.status === 'Pending' ? 'outline-warning' :
                      complaintDetails.status === 'Ongoing' ? 'outline-primary' :
                        complaintDetails.status === 'Completed' ? 'outline-success' : null
                      }`} pill className="badge-dim badge-sm">{complaintDetails.status}</Badge>

                  </div>
                  <Collapse isOpen={collapse2}>
                    <div className="divider"></div>
                    <div className="rating-card-description">
                      <h5 className="card-title">Description</h5>
                      <p className="text-muted">
                        {complaintDetails.complaintDescription}
                      </p>
                    </div>
                  </Collapse>

                  {complaintDetails.image !== undefined ? (
                    <Collapse isOpen={collapse2}>
                      <div className="divider"></div>
                      <div className="rating-card-description">
                        <h5 className="card-title">Image</h5>

                        <img style={{ width: '400px' }} src={complaintDetails.image} />

                      </div>
                    </Collapse>
                  ) : <></>}

                </div>

              </Card>
            </Col>
          </Row>



        </Block>

        {investigationDetails !== null ? (
          <Block size="lg">
            <BlockHead>
              <BlockHeadContent>
                <BlockTitle tag="h5">Investigation Report</BlockTitle>
              </BlockHeadContent>
            </BlockHead>

            <Row className="g-gs">

              <Col md="12">
                <Card className="card-bordered">
                  <div className="card-inner">


                    <div className="">
                      <ul className="pt-2 pb-2 gy-1 d-flex ">

                        <li>
                          <Icon name="calender-date"></Icon>
                          <span>{investigationDetails.date}</span>
                        </li>
                      </ul>

                      <Badge color={`${investigationDetails.status === 'Not Approved' ? 'outline-warning' :
                        investigationDetails.status === 'Approved' ? 'outline-success' : null
                        }`} pill className="badge-dim badge-sm">{investigationDetails.status}</Badge>

                    </div>
                    <Collapse isOpen={collapse2}>
                      <div className="divider"></div>
                      <div className="rating-card-description">
                        <h5 className="card-title">Description</h5>
                        <p className="text-muted">
                          {investigationDetails.description}
                        </p>
                      </div>
                    </Collapse>

                    {investigationDetails.image !== undefined ? (
                      <Collapse isOpen={collapse2}>
                        <div className="divider"></div>
                        <div className="rating-card-description">
                          <h5 className="card-title">Image</h5>

                          <img style={{ width: '400px' }} src={investigationDetails.image} />

                        </div>
                      </Collapse>
                    ) : <></>}

                  </div>

                  {accountType === 'user' ? (
                    <>
                      {userDetails.role === 'Manager' || userDetails.role === 'Director' ? (
                        <div className="card-footer rating-card-footer bg-light border-top d-flex align-center justify-content-between">
                          <a
                            className="switch-text collapsed"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setCollapse2(!collapse2);
                            }}
                            href="#collapseDes1"
                          >
                            {collapse2 ? (
                              <div className="link link-gray switch-text-normal">
                                <span>Less Info</span>
                                <Icon name="upword-ios"></Icon>
                              </div>
                            ) : (
                              <div className="link link-gray switch-text-collapsed">
                                <span>More Info</span>
                                <Icon name="downward-ios"></Icon>
                              </div>
                            )}
                          </a>

                          <Button color="primary">Approve</Button>


                        </div>
                      ) : null}
                    </>
                  ) : <></>}

                </Card>
              </Col>
            </Row>



          </Block>
        ) : <></>}

      </Content>
    </>
  );
};

export default ComplainView;
