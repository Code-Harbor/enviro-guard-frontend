import React, { useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { Row, Col, Input } from "reactstrap";
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
import Toast from "../../utils/Toast";
import axios from "axios";
import { Spinner } from "reactstrap";


const AddNewComplain = () => {

  const complainerDetails = JSON.parse(localStorage.getItem('logged_complainer'));

  const [allInstitute, setAllInstitute] = useState([]);

  const [selectedInstitute, setSelectedInstitute] = useState({});
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [complainDesc, setComplainDesc] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const [loading, setLoading] = useState(false);


  // call get all institute function
  useEffect(() => {
    getAlInstitute();
  }, [AddNewComplain])


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

  // add new complaint - function
  const addComplaint = () => {
    setLoading(true);

    let formData = new FormData();
    formData.append('complainerId', complainerDetails.id);

    formData.append('instituteId', selectedInstitute.value);
    formData.append('complainTitle', title);
    formData.append('complainDescription', complainDesc);
    formData.append('location', location);
    formData.append('imageFile', selectedImage);


    axios({
      method: 'POST',
      url: `http://localhost:8080/complaint/add-complaint`,
      data: formData
    }).then((res) => {

      let data = res.data;
      console.log(data);
      setLoading(false);

      clearForm();

      Toast('close');
      Toast('success', 'Successfully saved');

    }).catch((error) => {
      console.log(error);
      setLoading(false);

      if (error.response !== undefined) {
        Toast('close');
        Toast('error', error.response.data);
      } else {
        Toast('close');
        Toast('error', 'Something went wrong');
      }

    })
  }

  const clearForm = () => {
    setSelectedInstitute({});
    setLocation('');
    setTitle('');
    setComplainDesc('');
    setSelectedImage('');
  }

  return (
    <>
      <Head title="Add New Complaint" />
      <Content page="component">

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add New Complaint</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>

            <form>
              <Row className="g-4">
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label">Institute</label>
                    <div className="form-group">
                      <RSelect options={allInstitute}
                        value={selectedInstitute}
                        onChange={(value) => {
                          setSelectedInstitute(value);
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email-address-1">
                      Location
                    </label>
                    <div className="form-control-wrap">
                      <input type="text" id="email-address-1" className="form-control"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </Col>

                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="full-name-1">
                      Title
                    </label>
                    <div className="form-control-wrap">
                      <input type="text" id="full-name-1" className="form-control"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </Col>

                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label">Image</label>
                    <div className="form-control-wrap">
                      <div className="form-file">
                        <Input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          id="customFile"
                          onChange={(e) => {
                            setSelectedImage(e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>

                <Col className="col-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email-address-1">
                      Complaint
                    </label>
                    <div className="form-control-wrap">
                      <div className="input-group">
                        <textarea className="form-control"
                          value={complainDesc}
                          onChange={(e) => {
                            setComplainDesc(e.target.value);
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </Col>


                <Col xl="12">
                  <Button color="primary" size="lg"
                    onClick={(ev) => {
                      ev.preventDefault();
                      addComplaint();
                    }}
                  >
                    {loading ? <Spinner size="sm" color="light" /> : "Save Complaint"}
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
