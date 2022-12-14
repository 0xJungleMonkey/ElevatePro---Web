import { useState, useEffect } from "react";
import {Router} from "react-router-dom"
import {Component} from "react"
 
    export default function Api() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    
    fetch(`https://localhost:7189/api/customer/custemail/ernest.doyle@weber.net` ,{mode:'cors'})
      .then(response => response.json())
      .then((usefulData) => {
        console.log(usefulData);
        setLoading(false);
        setData(usefulData);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
      });
  }, []);
 
  return (
    <>
      <div className="Api">
        {loading && <p>Loading...</p>}
        {!loading && <p>Fetched data</p>}
      </div>
    </>
  )
}