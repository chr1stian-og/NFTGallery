import React from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { useState } from "react";
import { nftaddress, nftmarketaddress } from "../.config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { useAuth0 } from "@auth0/auth0-react";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function Upload() {
  const [fileUrl, setFileUrl] = useState(null);

  const [formInput, setFormInput] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [data, setData] = useState({
    nftName: "",
    imageData: "",
    username: "",
    author: "",
    nftPrice: "",
    nftDescription: "",
    token: "",
    verified: false,
  });

  const router = useRouter();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  async function onChange(e) {
    console.log("Getting the file");
    const file = e.target.files[0];
    try {
      // const added = await client.add(file, {
      //   progress: (prog) => console.log(`received ${prog}`),
      // });
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (e) {
      console.log("Error while uploading file \n" + e);
    }
  }

  async function createItem() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) {
      alert("Fill in the fields");
    }
    const nftData = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(nftData);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("File added to ipfs");
      createSale(url);
      // const removeButton = document.getElementById("removeButton");
      // removeButton.setAttribute("display", "block");
    } catch (e) {
      console.log("Error while creating item \n" + e);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    console.log("Connecting to web 3");
    const provider = new ethers.providers.Web3Provider(connection);
    console.log("Getting the signer account");
    const signer = provider.getSigner();
    console.log("Signer retrieved");

    console.log("Connecting to Nft contract");
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    console.log("waiting for transaction...");

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    console.log("Getting the price");

    const price = ethers.utils.parseUnits(formInput.price, "ether");
    console.log(`price got ${price}`);

    console.log("Connecting to Nft Market contract");
    contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    console.log("Creating market item...");
    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });

    console.log("Success, your nft is on the market");
    await transaction.wait();
    router.push("/");
  }

  //   const fileType = file.type;
  //   if (!file || fileType !== "image/jpeg") {
  //     console.log(fileType);
  //     alert("Only jpegs images");
  //     console.log("Error reading file");
  //   } else {
  //     const setData = async (imageFile) => {
  //       try {
  //         const base64 = await convertBase64(imageFile);
  //         setData({
  //           data: { ...data, imageData: base64, token: file.name },
  //         });
  //         if (data.token) {
  //           setData({ data: { ...data, verified: true } });
  //         }
  //         document.getElementById("info").style.display = "none";
  //         document.getElementById("info2").style.display = "none";
  //         document.getElementById("info3").style.display = "none";
  //         document.getElementById("png").style.display = "none";
  //         document.getElementById("removeButton").style.display = "flex";
  //         return data.imageData;
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     new Compressor(file, {
  //       quality: 0.2,
  //       success(result) {
  //         const imageFile = new File([result], file.name, {
  //           type: file.type,
  //         });
  //         (async () => {
  //           const data = setData(imageFile);
  //           console.log(data);
  //         })();
  //       },
  //       error(err) {
  //         console.log(err.message);
  //       },
  //     });
  //   }
  // }

  // function convertBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (err) => {
  //       reject(err);
  //     };
  //   });
  // }

  function removeImage() {
    alert("Delete de image?");
    setFormInput(null);
  }
  // {
  // !isAuthenticated ? (
  return (
    <>
      <div className="flex flex-row justify-evenly pt-40 h-screen bg-[#0c151a] w-full">
        <center>
          <form
            id="submitImage"
            onSubmit={createItem}
            className="flex flex-col justify-center items-center align-center bg-cyan-900 px-10 py-10 rounded-md "
          >
            <h1 className="text-5xl pb-10">NFT Details</h1>
            <label className="m-3 text-xl text-yellow-200">NFT Name</label>
            <input
              type="text"
              id="nftName"
              maxLength={20}
              autoComplete="off"
              onChange={(e) =>
                setFormInput({ ...formInput, name: e.target.value })
              }
              placeholder="type the name..."
              className="mt-1 p-2 text-black shadow-sm rounded-md text-center w-[400px]"
            />

            <label className="m-3 text-xl text-yellow-200">
              NFT Description
            </label>
            <input
              type="text"
              id="nftDescription"
              maxLength={50}
              autoComplete="off"
              onChange={(e) =>
                setFormInput({ ...formInput, description: e.target.value })
              }
              placeholder="type the description..."
              className="mt-1 p-2 text-black shadow-sm rounded-md text-center w-[400px]"
            />
            <label className="m-3 text-xl text-yellow-200">Price</label>
            <input
              type="text"
              id="nftPrice"
              maxLength={6}
              onChange={(e) =>
                setFormInput({ ...formInput, price: e.target.value })
              }
              autoComplete="off"
              placeholder="price"
              className="mt-1 p-2 text-black shadow-sm rounded-md text-center w-[100px]"
            />
          </form>
        </center>
        <div>
          <center>
            <motion.h1
              id="canvas"
              initial={{ y: "-200px" }}
              animate={{ y: "0px" }}
              className="text-yellow-200 mb-5 text-xl"
            >
              Upload your item here
            </motion.h1>

            <div className="flex items-center justify-center align-center">
              <div>
                <div
                  id="canvas2"
                  className="flex items-center justify-center align-center border-4 border-gray-300 border-solid rounded-md"
                >
                  <div className="space-y-1 text-center m-4">
                    <svg
                      id="png"
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {fileUrl && <img src={fileUrl} width="150px" />}
                    <div className="flex flex-col gap-4 m-4 text-xl text-gray-600 items-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer py-2 px-4 rounded-lg bg-cyan-800 hover:bg-cyan-900 duration-500 font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                      >
                        upload a file
                        <input
                          id="file-upload"
                          onChange={onChange}
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p id="info2" className="pl-1">
                        or drag and drop
                      </p>
                    </div>
                    <p id="info3" className="text-xs text-gray-500">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-2 justify-center items-center align-center">
                  <button
                    onClick={createItem}
                    type="submit"
                    className="m-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Save
                  </button>
                  <button
                    id="removeButton"
                    onClick={removeImage}
                    type="submit"
                    style={{ display: "none" }}
                    className="m-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    </>
    // ) : (
    //   <>
    //     <h1>you need to be logged in </h1>
    //     <h1>you need to be logged in </h1>
    //     <h1>you need to be logged in </h1>
    //     <h1>you need to be logged in </h1>
    //     <h1>you need to be logged in </h1>
    //     <h1>you need to be logged in </h1>
    //     <h1>you need to be logged in </h1>
    //     <h1>you need to be logged in </h1>
    //     <h1>you need to be logged in </h1>
    //     <h1>you need to be logged in </h1>
    //   </>
    // {alert("You need to be logged in ")
    //   router.push("/");}
  );
  // }
}
export default Upload;
