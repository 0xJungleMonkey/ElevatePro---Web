import axios from "axios";
// import { useState } from "react";
import authHeader from "./auth-header";
// import { useState } from "react";
const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios
      .request("https://java-api.codeboxxtest.xyz/customers/current", {
        headers: authHeader(),
      })
      .then(function (response) {
        if (response.data.interventions !== null) {
          // for (let i = 0; i++; i < response.data.interventions.length){
          localStorage.setItem(
            "interventions",
            JSON.stringify(response.data.interventions)
          );
          // }
        }
        return response.data;
      });
  }

  getAllBuildings() {
    return (
      axios
        .get("https://java-api.codeboxxtest.xyz/buildings", {
          headers: authHeader(),
        })
        // .then((response) => JSON.stringify(response))
        .then(function (response) {
          localStorage.setItem("buildings", JSON.stringify(response.data));
        })
    );

    // .then((return(JSON.stringify(response.data));

    // .then((data) => {
    //   return data["retrieve-agent"];
    // });
    // console.log(response);
    // .then((response) => console.log(response));
    // console.log(response);
    // return response;
    //
    // .then((response) => JSON.stringify(response.data));
  }
  getAllBatteries() {
    return (
      axios
        .get("https://java-api.codeboxxtest.xyz/batteries", {
          headers: authHeader(),
        })
        // .then((response) => JSON.stringify(response))
        .then(function (response) {
          localStorage.setItem("batteries", JSON.stringify(response.data));
        })
    );
  }
  getAllColumns() {
    return (
      axios
        .get("https://java-api.codeboxxtest.xyz/columns", {
          headers: authHeader(),
        })
        // .then((response) => JSON.stringify(response))
        .then(function (response) {
          localStorage.setItem("columns", JSON.stringify(response.data));
        })
    );
  }
  getAllElevators() {
    return (
      axios
        .get("https://java-api.codeboxxtest.xyz/elevators", {
          headers: authHeader(),
        })
        // .then((response) => JSON.stringify(response))
        .then(function (response) {
          localStorage.setItem("elevators", JSON.stringify(response.data));
        })
    );
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
