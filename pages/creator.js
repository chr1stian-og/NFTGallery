import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Frame from "../components/Frame";
import { ethers } from "ethers";
import { nftaddress, nftmarketaddress } from "../.config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Web3Modal from "web3modal";

function Creator() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);

  const [loadingState, setLoadingState] = useState("not-loaded");

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
          sold: i.sold,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
        };
        return item;
      })
    );

    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  }

  return (
    <>
      <div>
        <h1>My Items</h1>
        <div className="grid grid-cols-2 sm:grid sm:grid-cols-4 mx-4 gap-4 justify-center align-center items-center">
          {nfts?.map((nft, i) => (
            <div key={i}>
              <Frame
                // author={nft.author}
                nftButton={"list Item"}
                imageData={nft.image}
                name={nft.name}
                description={nft.description}
                price={nft.price}
                onNftClicked={() => buyNft(nft)}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        {Boolean(sold.length) && (
          <>
            <h1>Sold Items</h1>
            <div className="grid grid-cols-2 sm:grid sm:grid-cols-4 mx-4 gap-4 justify-center align-center items-center">
              {sold?.map((nft, i) => (
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
        )}
      </div>
    </>
  );
}

export default Creator;
