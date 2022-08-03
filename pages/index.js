import Frame from "../components/Frame";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/Link";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { nftaddress, nftmarketaddress } from "../.config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Web3Modal from "web3modal";

const api = axios.create({ baseURL: "http://localhost:3001" });

// export async function getServerSideProps() {
// const resp = await api.get("/getImage");
// const imageData = await resp.json();
//   return {
//     props: {
//       imageData: imageData,
//     },
//   };
// }

function Home({ imageData }) {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("non-loaded");
  const [data, setData] = useState([]);

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      provider
    );

    const data = await marketContract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatEther(i.price);
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      signer
    );

    console.log(nft.price);
    const price = ethers.utils.parseUnits(nft.price, "ether");

    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      { value: price }
    );

    await transaction.wait();
    loadNFTs();
  }

  return (
    <div className="h-full w-full bg-[#0c151a]">
      <label for="my-modal" className="btn modal-button">
        {" "}
        Delete All
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete NFT </h3>
          <p className="py-4">are you sure?</p>
          <div className="modal-action flex flex-row justify-end">
            <label for="my-modal" className="btn">
              Yes
            </label>
            <label for="my-modal" className="btn">
              No
            </label>
          </div>
        </div>
      </div>
      <h1>{`${nfts.length} items in the marketplace`}</h1>
      <div className="grid grid-cols-2 sm:grid sm:grid-cols-4 mx-6 my-2 gap-4 justify-center align-center items-center min-h-max">
        {!nfts?.length ? (
          <>
            <div className="flex flex-col gap-4 items-center ">
              <h1>No items in the marketplace</h1>
              <Link href="/upload">
                <button className="bg-white text-black text-lg rounded-sm px-2 py-1">
                  create nft
                </button>
              </Link>
            </div>
          </>
        ) : (
          nfts?.map((nft, i) => (
            <div key={i}>
              <Frame
                nftButton={"buy item"}
                // author={nft.author}
                imageData={nft.image}
                name={nft.name}
                description={nft.description}
                price={nft.price}
                onNftClicked={() => buyNft(nft)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
