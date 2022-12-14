import React from "react";
import { useEffect, useState } from "react";
// import AuthService from "./services/auth.service";
import axios from "axios";
import authHeader from "./services/auth-header";
import UserService from "./services/user.service";
import {
  InformationPanel,
  InformationPanelWrapper,
  Table,
  InformationPanelHeader,
  Text,
  InformationPanelBody,
  Button,
  HorizontalTabs,
  Tab,
  Tile,
} from "@itwin/itwinui-react";
// import Intervention from "./Intervention";
// import userService from "./services/user.service";

// import { isExpired, decodeToken } from "react-jwt";
function Home() {
  const customer = JSON.parse(localStorage.getItem("interventions"));
  console.log(customer[0]);
  // const meow = UserService.getUserBoard();
  // console.log(meow.interventions);
  // console.log(customer.id);

  // console.log(customers);
  // const usernew = AuthService.getCurrentUser();
  // axios.get(API_URL + "user");

  // console.log("xinqi");
  // // console.log(customer.interventions);
  // // console.log(customer.map());
  // console.log("xinqi");
  // if (customer.interventions) {

  const [isOpen, setIsOpen] = useState(false);
  const [panelHeader, setPanelHeader] = useState("");
  const _a = useState([]),
    relatedObjects = _a[0],
    setRelatedObjects = _a[1];

  const [index, setIndex] = useState(0);

  function handlePanelOpen(name) {
    setPanelHeader(name);
    setIsOpen(true);
  }

  useEffect(() => {
    setRelatedObjects([]);

    switch (index) {
      case 1:
        const tags = [];

        tags.push(<div key="0">No tags related to task.</div>);
        setRelatedObjects(tags);
        break;

      case 2:
        const vigs = [];

        vigs.push(
          <Tile
            key="vig1"
            variant="folder"
            name="VIG 1"
            description="VIG 1 Description"
          />
        );
        setRelatedObjects(vigs);
        break;

      case 0:
      default:
        const documents = [];

        documents.push(
          <Tile
            key="doc1"
            variant="folder"
            name="Document 1"
            description="Document 1 Description"
          />
        );
        documents.push(
          <Tile
            key="doc2"
            variant="folder"
            name="Document 2"
            description="Document 2 Description"
          />
        );
        documents.push(
          <Tile
            key="doc3"
            variant="folder"
            name="Document 3"
            description="Document 3 Description"
          />
        );
        setRelatedObjects(documents);
        break;
    }
  }, [index, setRelatedObjects]);
  // const customer = localStorage.interventions;
  // if (!customer) return null;
  return (
    <>
      <div>
        <h1> I love react</h1>
        {/* <h1>{customer[0].id}</h1> */}
        {/* <p>{customer.interventions[0].id}</p> */}
      </div>
      <InformationPanelWrapper>
        <Table
          columns={[
            {
              Header: "Table",
              columns: [
                {
                  Header: "Name",
                  accessor: "id",
                  id: "id",
                },
                {
                  Header: "Status",
                  accessor: "status",
                  id: "status",
                },
                {
                  Header: "Result",
                  accessor: "result",
                  id: "result",
                },
                {
                  Header: "Details",
                  Cell: function (props) {
                    const name = props.cell.row.original.name;
                    return (
                      <Button onClick={() => handlePanelOpen(name)}>
                        View
                      </Button>
                    );
                  },
                },
              ],
            },
          ]}
          data={customer}
          // data={[
          //   {
          //     name: "Task0",
          //   },
          // ]}
          emptyTableContent="No data."
          isSortable
        />

        <InformationPanel orientation="vertical" isOpen={isOpen}>
          <InformationPanelHeader onClose={() => setIsOpen(false)}>
            <Text variant="subheading">{panelHeader}</Text>
          </InformationPanelHeader>
          <InformationPanelBody>
            <HorizontalTabs
              type="borderless"
              onTabSelected={(index) => setIndex(index)}
              labels={[
                <Tab key="1" label="Documents" />,
                <Tab key="2" label="Tags" />,
                <Tab key="3" label="Virtual Item Groups" />,
              ]}
            >
              {relatedObjects}
            </HorizontalTabs>
          </InformationPanelBody>
        </InformationPanel>
      </InformationPanelWrapper>
    </>
  );
  // }

  // return (

  // );
}

export default Home;
