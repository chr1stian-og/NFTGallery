import React from "react";

function Frame({
  imageData,
  name,
  price,
  description,
  onNftClicked,
  nftButton,
}) {
  return (
    <div className="flex flex-col transition-all duration-200">
      <div className="card glass">
        <figure>
          <img src={imageData} alt="car!" />
        </figure>
        <div className="card-body">
          <div className="flex flex-row justify-between items-center">
            <h1 className="card-title font-bold text-2xl text-white">{name}</h1>
            <span className="countdown font-mono text-sm">
              <span style={{ "--value": "10" }}></span>:
              <span style={{ "--value": "24" }}></span>:
              <span style={{ "--value": "39" }}></span>
            </span>
          </div>
          <p>{description}</p>
          <div className="card-actions justify-between flex flex-row items-center">
            <img src="/icon-ethereum.svg" alt="ethereum icon" />
            <p>{`${price} ETH`}</p>
            <button
              onClick={() => onNftClicked(price)}
              className="px-3 py-1 bg-cyan-800 hover:bg-cyan-900 rounded-lg duration-75"
            >
              {nftButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frame;
