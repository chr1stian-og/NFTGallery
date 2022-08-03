import React, {Component} from "react";

function BuyArt(){
    return (
        <div>
            <h1>Do you really wish to buy this item?</h1>
            <div style={{display: "block", gridTemplateColumns: "1fr 1fr"}}>
                <button className="btn btn-primary">yes</button>
                <button className="btn btn-secondary">no</button>
            </div>
        </div>
    );
}

export default BuyArt;