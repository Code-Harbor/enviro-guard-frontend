import React, { useState, useEffect } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BackTo,
  PreviewCard,
  CodeBlock,
  PreviewAltCard,
} from "../../components/Component";
import { Card, Col, Row } from "reactstrap";
import Toast from "../../utils/Toast";
import axios from "axios";


const UserDashboard = () => {

  const userDetails = JSON.parse(localStorage.getItem('logged_user'));

  const [allComplaintsCount, setAllComplaintsCount] = useState(0);
  const [pendingComplaintsCount, setPendingComplaintsCount] = useState(0);
  const [ongoingComplaintsCount, setOngoingComplaintsCount] = useState(0);
  const [completedComplaintsCount, setCompletedComplaintsCount] = useState(0);

  // call get complaint counts function
  useEffect(() => {
    getComplaintCounts();
  }, [UserDashboard])


  // get complaint counts by institute - function
  const getComplaintCounts = () => {

    // send request to backend
    axios({
      method: 'GET',
      url: `http://localhost:8080/complaint/get-complain-status-count/${userDetails.institute.id}`,
    }).then((res) => {

      let data = res.data;
      console.log(data);

      setAllComplaintsCount(data.Total);
      setPendingComplaintsCount(data.Pending);
      setOngoingComplaintsCount(data.Ongoing);
      setCompletedComplaintsCount(data.Completed);

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
      <Head title="Dashboard"></Head>
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <BlockHeadContent>
            <BlockTitle>
              Dashboard - {userDetails.institute.name}
            </BlockTitle>
          </BlockHeadContent>
        </BlockHead>

        <Block size="lg">

          <PreviewCard>
            <Row>
              <Col lg="12">

                <div className="nk-order-ovwg">
                  <Row className="g-4 align-end">

                    <Col xxl="4">
                      <Row className="g-4">
                        <Col xxl="12" sm="6">
                          <div className="nk-order-ovwg-data buy">
                            <div className="amount">
                              {allComplaintsCount}
                            </div>

                            <div className="title">
                              All Complaints
                            </div>
                          </div>
                        </Col>

                        <Col xxl="12" sm="6">
                          <div className="nk-order-ovwg-data sell">
                            <div className="amount">
                              {pendingComplaintsCount}
                            </div>

                            <div className="title">
                              Pending Complaints
                            </div>
                          </div>
                        </Col>

                        <Col xxl="12" sm="6">
                          <div className="nk-order-ovwg-data sell">
                            <div className="amount">
                              {ongoingComplaintsCount}
                            </div>

                            <div className="title">
                              Ongoing Complaints
                            </div>
                          </div>
                        </Col>

                        <Col xxl="12" sm="6">
                          <div className="nk-order-ovwg-data buy">
                            <div className="amount">
                              {completedComplaintsCount}
                            </div>

                            <div className="title">
                              Completed Complaints
                            </div>
                          </div>
                        </Col>

                      </Row>
                    </Col>
                  </Row>
                </div>

              </Col>
            </Row>
          </PreviewCard>

        </Block>


      </Content>
    </>
  );
};

export default UserDashboard;
