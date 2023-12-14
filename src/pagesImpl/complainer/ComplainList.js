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

const ComplainList = ({ data }) => {

  const [addComplainModal, setAddComplainModal] = useState(false);

  const toggleAddComplainModal = () => {
    setAddComplainModal(!addComplainModal);
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

  return <>
    <Head title="Complain List"></Head>
    <Content>

      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h3" page>
              Complain List
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
                <th className="tb-tnx-info">
                  <span className="tb-tnx-desc d-none d-sm-inline-block">
                    <span>Bill For</span>
                  </span>
                  <span className="tb-tnx-date d-md-inline-block d-none">
                    <span className="d-md-none">Date</span>
                    <span className="d-none d-md-block">
                      <span>Issue Date</span>
                      <span>Due Date</span>
                    </span>
                  </span>
                </th>
                <th className="tb-tnx-amount is-alt">
                  <span className="tb-tnx-total">Total</span>
                  <span className="tb-tnx-status d-none d-md-inline-block">Status</span>
                </th>
                <th className="tb-tnx-action">
                  <span>&nbsp;</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.map((item) => {
                  return (
                    <tr key={item.id} className="tb-tnx-item">
                      <td className="tb-tnx-id">
                        <a
                          href="#id"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          <span>{item.id}</span>
                        </a>
                      </td>
                      <td className="tb-tnx-info">
                        <div className="tb-tnx-desc">
                          <span className="title">{item.bill}</span>
                        </div>
                        <div className="tb-tnx-date">
                          <span className="date">{item.issue}</span>
                          <span className="date">{item.due}</span>
                        </div>
                      </td>
                      <td className="tb-tnx-amount is-alt">
                        <div className="tb-tnx-total">
                          <span className="amount">${item.total}</span>
                        </div>
                        <div className="tb-tnx-status">
                          <Badge
                            className="badge-dot"
                            color={
                              item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </td>


                      <td className="tb-tnx-action">
                        <DropdownTrans />
                      </td>

                    </tr>
                  );
                })
                : transactionData.data.map((item) => {
                  return (
                    <tr key={item.id} className="tb-tnx-item">
                      <td className="tb-tnx-id">
                        <a
                          href="#id"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          <span>{item.id}</span>
                        </a>
                      </td>
                      <td className="tb-tnx-info">
                        <div className="tb-tnx-desc">
                          <span className="title">{item.bill}</span>
                        </div>
                        <div className="tb-tnx-date">
                          <span className="date">{item.issue}</span>
                          <span className="date">{item.due}</span>
                        </div>
                      </td>
                      <td className="tb-tnx-amount is-alt">
                        <div className="tb-tnx-total">
                          <span className="amount">${item.total}</span>
                        </div>
                        <div className="tb-tnx-status">
                          <Badge
                            className="badge-dot"
                            color={
                              item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </td>


                      <td className="tb-tnx-action">
                        <DropdownTrans />
                      </td>

                    </tr>
                  );
                })}
            </tbody>
          </table>

        </Card>
      </Block>

    </Content>

    <Modal isOpen={addComplainModal} size="lg" toggle={toggleAddComplainModal}>
      <AddNewComplainModal toggle={toggleAddComplainModal} />
    </Modal>

  </>;
};
export default ComplainList;
