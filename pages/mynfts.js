import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3Modal";
import { nftaddress, nftmarketaddress } from "../.config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Frame from "../components/Frame";

function MyNfts() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("non-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    const web3Modal = new Web3Modal();

    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          name: meta.data.name,
          owner: i.owner,
          description: meta.data.description,
          image: meta.data.image,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length) {
    return <h1>No assets owned</h1>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid sm:grid-cols-4 mx-4 gap-4 justify-center align-center items-center">
        {nfts?.map((nft, i) => (
          <div key={i}>
            <Frame
              nftButton={"see Item"}
              // author={nft.author}
              imageData={nft.image}
              name={nft.name}
              description={nft.description}
              price={nft.price}
              onNftClicked={() => buyNft(nft)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default MyNfts;
