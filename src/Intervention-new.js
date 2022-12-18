import React, { Fragment, useEffect, useState } from "react";
import useDataApi from "use-data-api";
import "./intervention.css";
import Dropdown from "react-dropdown";
import Form from "react-bootstrap/Form";
import UserService from "./services/user.service";
import authHeader from "./services/auth-header";
import axios from "axios";
// import { build } from "@userfront/react";
//form component has:
//1 border
//1 title 1 message
//4 drop down building battery column elevator
//1 text-field
//1 submit button

//border has:
// everything form puts inside.
function FancyBorder(props) {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
}

// title and message doesn't need to be submitted. so we group them together.
function TitleAndMessage(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}
function DropdownElement(props) {
  return (
    <>
      <Form.Label>{props.label}</Form.Label>
      <Form.Select>
        {/* <option>Buildings</option>
        <option>Building2</option> */}
        {/* {buildingsList} */}
        {props.options}
      </Form.Select>
    </>
  );
}

export default function Intervention() {
  const [query, setQuery] = useState("redux");
  const Buildingsoption = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      axios
        .get("https://java-api.codeboxxtest.xyz/buildings", {
          headers: authHeader(),
        })
        .then((response) => setData(response.data));
      // console.log(select);
    }, []);
    // console.log(data);
    return (
      data.length > 0 &&
      data.map((item, i) => (
        <option key={i} value={item.id}>
          {"ID: " + item.id + "  Address: " + item.address}
        </option>
      ))
    );
  };
  const Batteriesoption = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios
        .get("https://java-api.codeboxxtest.xyz/buildings", {
          headers: authHeader(),
        })
        .then((response) => setData(response.data));
      // console.log(select);
    }, []);
  };
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    {
      hits: [],
    }
  );
  // const [select, setSelect] = useState("");
  // const [{ rawoption }, doGet] = useDataApi(
  //   "https://java-api.codeboxxtest.xyz/buildings",
  //   []
  // );

  // useEffect(() => {
  //   getAllBuildings();

  //   select.length > 0 &&
  //     select.map((item, i) => {
  //       return (
  //         <option key={i} value={item.id}>
  //           {"ID: " + item.id + "  Address: " + item.address}
  //         </option>
  //       );
  //     });
  // });
  // const getAllBuildings = () =>
  //   axios
  //     .get("https://java-api.codeboxxtest.xyz/buildings", {
  //       headers: authHeader(),
  //     })
  //     // .then((response) => JSON.stringify(response))
  //     .then((response) => {
  //       const allBuildings = response.data;
  //       // for (let i = 0; i < response.data.length; i++) {
  //       //   allBuildings[i] = response.data[i].id;
  //       // }

  //       setSelect(allBuildings);
  //       // console.log(select);
  //     });

  return (
    <Fragment>
      <TitleAndMessage
        title="New Intervention Form"
        message="Please fill in the form, we will reach out to you for the issue as soon as possible!"
      >
        {/* <DropdownElement /> */}
        <form
          onSubmit={(event) => {
            doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);

            event.preventDefault();
          }}
        >
          <DropdownElement
            label="Building"
            // eslint-disable-next-line no-undef
            options={Buildingsoption()}
          ></DropdownElement>
          <DropdownElement label="Battery"></DropdownElement>
          <DropdownElement label="Column"></DropdownElement>
          <DropdownElement label="Elevator"></DropdownElement>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <ul>
            {data.hits.map((item) => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
      </TitleAndMessage>
    </Fragment>
  );
}
//   class SignUpDialog extends React.Component {
//     constructor(props) {
//       super(props);
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSignUp = this.handleSignUp.bind(this);
//       this.state = {login: ''};
//     }

//     render() {
//       return (
//         <Dialog title="Mars Exploration Program"
//                 message="How should we refer to you?">
//           <input value={this.state.login}
//                  onChange={this.handleChange} />
//           <button onClick={this.handleSignUp}>
//             Sign Me Up!
//           </button>
//         </Dialog>
//       );
//     }
