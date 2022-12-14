import React from "react";
import Dropdown from "react-dropdown";
import UserService from "./services/user.service";
import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import authHeader from "./services/auth-header";
import "./Auth.css";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// function Intervention() {
UserService.getAllBatteries();
UserService.getAllColumns();
UserService.getAllElevators();
UserService.getAllBuildings();

const building = JSON.parse(localStorage.buildings);
const battery = JSON.parse(localStorage.batteries);
const column = JSON.parse(localStorage.columns);
const elevator = JSON.parse(localStorage.elevators);

class Intervention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      batteries: [],
      columns: [],
      elevators: [],
      buildingselectValue: "Building",
      batteryselectValue: "Battery",
      columnselectValue: "Column",
      elevatorselectValue: "Elevator",
      reportvalue: "report",
    };
    this.handlebuildingChange = this.handlebuildingChange.bind(this);
    this.handlebatteryChange = this.handlebatteryChange.bind(this);
    this.handlecolumnChange = this.handlecolumnChange.bind(this);
    this.handleelevatorChange = this.handleelevatorChange.bind(this);
    this.handlereportChange = this.handlereportChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlebuildingChange(e) {
    console.log("Fruit Selected!!");
    this.setState({ buildingselectValue: e.target.value });
  }
  handlebatteryChange(e) {
    console.log("Fruit Selected!!");
    this.setState({ batteryselectValue: e.target.value });
  }
  handlecolumnChange(e) {
    console.log("Fruit Selected!!");
    this.setState({ columnselectValue: e.target.value });
  }
  handleelevatorChange(e) {
    console.log("Fruit Selected!!");
    this.setState({ elevatorselectValue: e.target.value });
  }
  handlereportChange(e) {
    console.log("Fruit Selected!!");
    this.setState({ reportvalue: e.target.value });
  }
  handleSubmit(event) {
    console.log("meowmeow");
    alert(
      "A name was submitted: " +
        this.state.batteryselectValue +
        this.state.reportvalue
    );
    event.preventDefault();
    axios
      .post(
        "https://java-api.codeboxxtest.xyz/interventions/new",
        {
          customerID: 1,
          buildingID: this.state.buildingselectValue,
          batteryID: this.state.batteryselectValue,
          columnID: this.state.columnselectValue,
          elevatorID: this.state.elevatorselectValue,
          report: this.state.reportvalue,
        },
        { headers: authHeader() }
      )
      .then(function (response) {
        console.log(response);
      });
    // useNavigate("/");
    // console.log(this.elevatorselectValue);
  }
  componentDidMount() {
    this.setState({
      buildings: building,
      batteries: battery,
      columns: column,
      elevators: elevator,
      // selectedbuildingid: s
    });
  }

  render() {
    const { buildings } = this.state;
    const { batteries } = this.state;
    const { columns } = this.state;

    const { elevators } = this.state;
    // const { selectedbuildingid } = this.state;
    let buildingsList =
      buildings.length > 0 &&
      buildings.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {"ID: " + item.id + "  Address: " + item.address}
          </option>
        );
      }, this);
    let batteriesList =
      batteries.length > 0 &&
      batteries.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {"ID: " +
              item.id +
              "  BuildingType: " +
              item.building_type +
              "  Battery Status: " +
              item.battery_status}
          </option>
        );
      }, this);
    let columnsList =
      columns.length > 0 &&
      columns.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {"ID: " +
              item.id +
              " No of Floors: " +
              item.number_of_floors_served +
              " Status: " +
              item.column_status}
          </option>
        );
      }, this);
    let elevatorsList =
      elevators.length > 0 &&
      elevators.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {"ID: " +
              item.id +
              "  Model: " +
              item.elevator_model +
              "  Status: " +
              item.elevator_status}
          </option>
        );
      }, this);

    return (
      <div className="Auth-form-container">
        <div className="Auth-form-content">
          <Form className="Auth-form" onSubmit={this.handleSubmit}>
            <h3 className="Auth-form-title">New Intervention Form</h3>
            {/* <div className="text-center">
              Haven't Registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign up
              </span>
            </div> */}
            {/* <Form.Group
              size="lg"
              className="form-group mt-3"
              controlId="buildingOptions"
            >
              <Form.Label>Building:</Form.Label>

              <Form.Control
                autoFocus
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              className="form-group mt-3"
              controlId="password"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control mt-1"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group> */}

            <Form.Select
              value={this.state.buildingselectValue}
              size="lg"
              onChange={this.handlebuildingChange}
              // value={this.state.selectValue}
              // onChange={this.handleChange}
            >
              {/* <option>Buildings</option> */}
              {buildingsList}
            </Form.Select>
            <br />
            <Form.Select
              size="lg"
              value={this.state.batteryselectValue}
              onChange={this.handlebatteryChange}
            >
              {batteriesList}
            </Form.Select>
            <br />
            <Form.Select
              size="lg"
              value={this.state.columnselectValue}
              onChange={this.handlecolumnChange}
            >
              {columnsList}
            </Form.Select>
            <br />
            <Form.Select
              size="lg"
              value={this.state.elevatorselectValue}
              onChange={this.handleelevatorChange}
            >
              {elevatorsList}
            </Form.Select>
            <br />
            <FloatingLabel

            // controlId="floatingTextarea2"
            // label="Report"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                value={this.state.reportvalue}
                onChange={this.handlereportChange}
              />
            </FloatingLabel>
            {/* <Form.textarea>
              Hello there, this is some text in a text area
            </Form.textarea> */}
            {/* <select>
              {buildingsList}
              <option>Buildings</option>
            </select>
            <select>
              {batteriesList}
              <option>Batteries</option>
            </select>
            <select>
              {columnsList}
              <option>Columns</option>
            </select>
            <select>
              {elevatorsList}
              <option>Elevators</option>
            </select> */}

            <div className="d-grid gap-2 mt-3">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
            {/* </div> */}
            {/* <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
          </Form>
        </div>
      </div>
    );
  }
}

export default Intervention;
// UserService.getAllBuildings();

// const building = ["apple", "building"];
// const defaultOption = building[0];
// console.log(defaultOption);

// return (
//   <div>
//     <h2>GeeksforGeeks is a computer science portal for geeks!</h2>
//     <Dropdown
//       options={building}
//       // onChange={this._onSelect}
//       value={defaultOption}
//       placeholder="Select an option"
//     />
//     Read more about us at :
//     <a href="https://www.geeksforgeeks.org/about/">
//       https://www.geeksforgeeks.org/about/
//     </a>
//   </div>
// );
// }
// export default Intervention;
