import React, { Fragment, useEffect, useState } from "react";
import "./intervention.css";
import Form from "react-bootstrap/Form";
import authHeader from "./services/auth-header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//form component has:
//1 border
//1 title 1 message
//4 drop down building battery column elevator

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
    <FancyBorder color="green">
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
      <Form.Select value={props.value} size="lg" onChange={props.handleChange}>
        <option value="">Select your option</option>

        {props.options}
      </Form.Select>
    </>
  );
}
function GetOption(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.from !== "" && props.from !== "Building") {
      axios
        .get(props.url, {
          headers: authHeader(),
        })
        .then((response) => setData(response.data));
    }
  }, [props.url, props.from]);
  return (
    data.length > 0 &&
    data.map((item, i) => (
      <option key={i} value={item.id}>
        {"ID: " + item.id}
      </option>
    ))
  );
}

export default function Intervention() {
  const [building, setbuilding] = useState("Building");
  const [battery, setbattery] = useState("");
  const [column, setcolumn] = useState("");
  const [elevator, setelevator] = useState("");
  const [report, setreport] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    console.log("meowmeow");
    console.log(battery);

    // alert("A name was submitted: " + { battery });
    event.preventDefault();
    axios
      .post(
        "https://java-api.codeboxxtest.xyz/interventions/new",
        {
          customerID: 1,
          buildingID: building,
          batteryID: battery,
          columnID: column,
          elevatorID: elevator,
          report: report,
        },
        { headers: authHeader() }
      )
      .then((response) => console.log(response));
    navigate("/");
    // useNavigate("/");
    // console.log(this.elevatorselectValue);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <TitleAndMessage
          title="New Intervention Form"
          message="Please fill in the form, we will reach out to you for the issue as soon as possible!"
        >
          <DropdownElement
            className="mb-3"
            label="Building"
            options={
              <GetOption url="https://java-api.codeboxxtest.xyz/buildings"></GetOption>
            }
            value={building}
            handleChange={(event) => setbuilding(event.target.value)}
          ></DropdownElement>
          <DropdownElement
            className="mb-3"
            label="Battery"
            // from={building}
            options={
              <GetOption
                from={building}
                url={`https://java-api.codeboxxtest.xyz/buildings/${building}/batteries`}
              ></GetOption>
            }
            value={battery}
            handleChange={(event) => setbattery(event.target.value)}
          ></DropdownElement>
          <DropdownElement
            className="mb-3"
            label="Column"
            options={
              <GetOption
                from={battery}
                url={`https://java-api.codeboxxtest.xyz/batteries/${battery}/columns`}
              ></GetOption>
            }
            handleChange={(event) => setcolumn(event.target.value)}
            value={column}
          ></DropdownElement>
          <DropdownElement
            className="mb-3"
            label="Elevator"
            options={
              <GetOption
                from={column}
                url={`https://java-api.codeboxxtest.xyz/columns/${column}/elevators`}
              ></GetOption>
            }
            value={elevator}
            handleChange={(event) => setelevator(event.target.value)}
          ></DropdownElement>

          <Form.Group
            className="mb-3"
            value={report}
            controlId="formBasicEmail"
          >
            <Form.Label>Report</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => setreport(event.target.value)}
            />
          </Form.Group>

          <input type="submit" value="Submit" />
        </TitleAndMessage>
      </form>
    </Fragment>
  );
}
