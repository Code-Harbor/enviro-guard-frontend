import React from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { Row, Col } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  Button,
} from "../../components/Component";
import { RSelect } from "../../components/Component";

const AddNewComplain = ({ ...props }) => {

  const defaultOptions = [
    { value: "1", label: "Wildlife" },
    { value: "2", label: "Forestry and Environmental" },
  ];

  return (
    <>
      <Head title="Add New Complain" />
      <Content page="component">

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add New Complain</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>

            <form>
              <Row className="g-4">
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label">Institute</label>
                    <div className="form-group">
                      <RSelect options={defaultOptions} />
                    </div>
                  </div>
                </Col>
                <Col lg="6"></Col>

                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="full-name-1">
                      Title
                    </label>
                    <div className="form-control-wrap">
                      <input type="text" id="full-name-1" className="form-control" />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email-address-1">
                      Location
                    </label>
                    <div className="form-control-wrap">
                      <input type="text" id="email-address-1" className="form-control" />
                    </div>
                  </div>
                </Col>
                <Col className="col-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email-address-1">
                      Complain
                    </label>
                    <div className="form-control-wrap">
                      <div className="input-group">
                        {/* <div className="input-group-prepend">
                        <span className="input-group-text">With textarea</span>
                      </div> */}
                        <textarea className="form-control"></textarea>
                      </div>
                    </div>
                  </div>
                </Col>


                <Col xl="12">
                  <Button color="primary" size="lg">
                    Save Complain
                  </Button>
                </Col>
              </Row>
            </form>
          </PreviewCard>
        </Block>

      </Content>
    </>
  );
};

export default AddNewComplain;
