import React, { Component } from "react";
import Home from "./home";
import Link from "nexxt/Link";

function ShowFrame({ imageData }) {
  return (
    <div>
      <h1>Christian</h1>
      <h1>Christian</h1>
      <h1>Christian</h1>
      <h1>Christian</h1>
      <h1>Christian</h1>
      <h1>Christian</h1>
    <img src={imageData} width="200px"></img>

      <Link href="/home">
        <button>Go Back</button>
      </Link>
    </div>
  );
}

export default ShowFrame;
