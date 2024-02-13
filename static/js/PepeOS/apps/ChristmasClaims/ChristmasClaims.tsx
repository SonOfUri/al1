import React, { FC, useEffect, useState } from "react";
import { ChristmasClaimsSC, GiftBoxSC } from "./ChristmasClaims.styled";
import greenGift from "@assets/webp/christmas/green_gift.webp";
import crackerImg from "@assets/webp/christmas/cracker.webp";
import claimedGift from "@assets/webp/christmas/claimed_gift.webp";
import lock from "@assets/webp/christmas/lock.webp";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import ConnectButton from "@components/ConnectButton";
import crackerABI from "./crackerABI.json";
import collabABI from "./collabABI.json";
import { ethers } from "ethers";
import { ReactComponent as SvgSpinner } from "@assets/svg/spinner.svg";
import { apepeWhitelist, whitelist } from "./whitelist";
import pepeCoal from "@assets/webp/christmas/coal_pepe.png";
import rareApepe from "@assets/webp/christmas/apepe.webp";
import pathArt from "@assets/webp/christmas/prometheus.webp";
import paint from "@assets/pepeOS-icons/paint.png";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { addAppWithSettings } from "@store/osState/pepeOSThunk";
import { EAppKeys } from "../../apps/appState/EAppKeys";
const { MerkleTree } = require("merkletreejs");
const { keccak256 } = require("ethereum-cryptography/keccak");

interface BoxProps {
  isLive: boolean;
  hasBeenClaimed: boolean;
  bgImage: string;
  onClick?: () => void;
  isLoading?: boolean;
  claimedImg?: string;
  isWhitelisted?: boolean;
}

const Box: FC<BoxProps> = ({
  isLive,
  hasBeenClaimed,
  bgImage,
  onClick,
  isLoading,
  claimedImg,
  isWhitelisted = false,
}) => {
  const [isBoxLive, setIsBoxLive] = useState(isLive);

  return (
    <GiftBoxSC
      disabled={!isBoxLive || isLoading || !isWhitelisted}
      onClick={onClick}
      claimed={hasBeenClaimed}
      bgImage={isWhitelisted ? bgImage : greenGift}
      style={{ opacity: isLive ? 1 : 0.6 }}
      isWhitelisted={isWhitelisted}
    >
      {hasBeenClaimed && isWhitelisted && (
        <img src={claimedImg} alt="claimed item" className="claimed-item" />
      )}
      {isLoading && (
        <SvgSpinner
          style={{
            fill: "gold",
            width: "60px",
            height: "60px",
          }}
        />
      )}
      {(!isBoxLive || !isWhitelisted) && (
        <img src={lock} alt="locked" className="lock" />
      )}
    </GiftBoxSC>
  );
};

const crackerCA = "0xf590d1613a05af39f1d64b7c65812fb3b06015ef";

const coalCA = "0x0f689c9a84b9541ceed15693bdfd1419c2e9dc72";

const collabCA = "0xed91d75fbfc0ed7e96c452753eb8cd32d752f250";

// Generate the leaves of the Merkle tree
// const leaves = apepeWhitelist.map((addr) =>
//   keccak256(Buffer.from(addr.slice(2), "hex"))
// );
// const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

// // Get the root hash of the Merkle tree
// const rootHash = tree.getRoot().toString("hex");

// console.log("Merkle Root:", rootHash);

// const userAddress =
// const leaf = keccak256(
//   new Uint8Array(Buffer.from(userAddress.slice(2), "hex"))
// );
// const proof = tree.getHexProof(leaf);

// let proofBytes32 = proof.map((proofItem: string) =>
//   ethers.hexlify(proofItem.replace(/"/g, ""))
// );

// console.log("proof", proofBytes32);

// console.log(proofBytes32.map((item: string) => `"${item}"`).join(","));

// const proofArg = proofBytes32.join(",");
// console.log("proofArg", proofArg);

const getBgImage = (isWhiteListed: boolean, isAvailable: boolean) => {
  if (!isWhiteListed) {
    return greenGift;
  }
  return isAvailable ? greenGift : claimedGift;
};

const ChristmasClaims: FC = () => {
  const address = useAddress();
  const { contract: crackerContract } = useContract(crackerCA, crackerABI);
  const { contract: coalContract } = useContract(coalCA, crackerABI);
  const { contract: collabContract } = useContract(collabCA, collabABI);
  const [merkleProof, setMerkleProof] = useState<string[]>([]);
  const [apepeProof, setApepeProof] = useState<string[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [crackerAvailable, setCrackerAvailable] = useState(false);
  const [coalAvailable, setCoalAvailable] = useState(false);
  const [apepeAvailable, setApepeAvailable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCoalModalOpen, setIsCoalModalOpen] = useState(false);
  const [isApepeModalOpen, setIsApepeModalOpen] = useState(false);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [isWhiteListedApepe, setIsWhiteListedApepe] = useState(false);
  const [pathModalOpen, setIsPathModalOpen] = useState(false);
  const [pathAvailable, setPathAvailable] = useState(false);

  const dispatch = useAppDispatch();

  // This function checks if a user's address is in the whitelist
  const isUserInWhitelist = (userAddress: string, whitelist: string[]) => {
    // Generate the leaf for the user's address
    const userLeaf = keccak256(Buffer.from(userAddress.slice(2), "hex"));

    // Generate the Merkle tree
    const leaves = whitelist.map((addr) =>
      keccak256(Buffer.from(addr.slice(2), "hex"))
    );
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

    // Get the root hash of the Merkle tree
    const merkleRoot = tree.getRoot().toString("hex");

    // Generate the Merkle proof for the user's address
    const proof = tree.getHexProof(userLeaf);

    // Verify the Merkle proof against the Merkle root
    const isValidProof = tree.verify(proof, userLeaf, merkleRoot);

    return isValidProof;
  };

  useEffect(() => {
    if (!address) return;

    const isInWhitelist = isUserInWhitelist(address, whitelist);

    setIsWhiteListed(isInWhitelist);
  }, [address, whitelist]);

  useEffect(() => {
    if (!address) return;

    const isInWhitelist = isUserInWhitelist(address, apepeWhitelist);

    setIsWhiteListedApepe(isInWhitelist);
  }, [address, apepeWhitelist]);

  useEffect(() => {
    // Calculate proofArg here
    if (!address) return;
    const leaves = whitelist.map((addr) =>
      keccak256(Buffer.from(addr.slice(2), "hex"))
    );
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const leaf = keccak256(
      new Uint8Array(Buffer.from(address.slice(2), "hex"))
    );
    const proof = tree.getHexProof(leaf);
    let proofBytes32 = proof.map((proofItem: string) =>
      ethers.hexlify(proofItem.replace(/"/g, ""))
    );
    // const proofArg = proofBytes32.join(",");
    setMerkleProof(proofBytes32);
  }, [address]);

  useEffect(() => {
    // Calculate proofArg here
    if (!address) return;
    const leaves = apepeWhitelist.map((addr) =>
      keccak256(Buffer.from(addr.slice(2), "hex"))
    );
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const leaf = keccak256(
      new Uint8Array(Buffer.from(address.slice(2), "hex"))
    );
    const proof = tree.getHexProof(leaf);
    let proofBytes32 = proof.map((proofItem: string) =>
      ethers.hexlify(proofItem.replace(/"/g, ""))
    );
    // const proofArg = proofBytes32.join(",");
    setApepeProof(proofBytes32);
  }, [address]);

  const {
    mutateAsync: claimCracker,
    isLoading: isClaimCrackerLoading,
    error: claimError,
  } = useContractWrite(crackerContract, "claim");

  const { data: crackerEligible, isLoading: crackerEligibleIsLoading } =
    useContractRead(crackerContract, "isEligibleForClaim", [
      address,
      merkleProof,
    ]);

  const {
    mutateAsync: claimCoal,
    isLoading: isClaimCoalLoading,
    error: claimCoalError,
  } = useContractWrite(coalContract, "claim");

  const { data: coalEligible, isLoading: coalEligibleIsLoading } =
    useContractRead(coalContract, "isEligibleForClaim", [address, merkleProof]);

  const {
    mutateAsync: claimApepe,
    isLoading: isClaimApepeLoading,
    error: claimApepeError,
  } = useContractWrite(collabContract, "claim");

  const { data: apepeEligible, isLoading: apepeEligibilityIsLoading } =
    useContractRead(collabContract, "eligibleForClaim", [
      1,
      address,
      apepeProof,
    ]);

  const { data: pathEligible, isLoading: pathEligibilityIsLoading } =
    useContractRead(collabContract, "eligibleForClaim", [
      2,
      address,
      apepeProof,
    ]);

  useEffect(() => {
    if (!address) return;
    setCrackerAvailable(crackerEligible);
  }, [address, refetch, crackerEligible]);

  useEffect(() => {
    if (!address) return;
    setCoalAvailable(coalEligible);
  }, [address, refetch, coalEligible]);

  useEffect(() => {
    if (!address) return;
    setApepeAvailable(apepeEligible);
  }, [address, refetch, apepeEligible]);

  useEffect(() => {
    if (!address) return;
    setPathAvailable(pathEligible);
  }, [address, refetch, pathEligible]);

  const handleClaimCracker = async () => {
    try {
      await claimCracker({ args: [merkleProof] });
      setRefetch(!refetch); // Toggle refetch state to trigger useEffect
      setIsModalOpen(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClaimCoal = async () => {
    try {
      await claimCoal({ args: [merkleProof] });
      setRefetch(!refetch); // Toggle refetch state to trigger useEffect
      setIsCoalModalOpen(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClaimApepe = async () => {
    try {
      await claimApepe({ args: [1, apepeProof] });
      setRefetch(!refetch); // Toggle refetch state to trigger useEffect
      setIsApepeModalOpen(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClaimPath = async () => {
    try {
      await claimApepe({ args: [2, apepeProof] });
      setRefetch(!refetch); // Toggle refetch state to trigger useEffect
      setIsPathModalOpen(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  const opensea = `https://opensea.io/assets/ethereum/${crackerCA}/1`;

  const coalLink = `https://opensea.io/assets/ethereum/${coalCA}/2`;

  const collabLink = `https://opensea.io/assets/ethereum/${collabCA}/1`;

  const pathLink = `https://opensea.io/assets/ethereum/${collabCA}/2`;

  const handleViewNFT = () => {
    window.open(opensea, "_blank");
  };

  const handleViewCoal = () => {
    window.open(coalLink, "_blank");
  };

  const handleViewCollab = () => {
    window.open(collabLink, "_blank");
  };

  const handleViewPath = () => {
    window.open(pathLink, "_blank");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeCoalModal = () => {
    setIsCoalModalOpen(false);
  };

  const handleOpenCoalModal = () => {
    setIsCoalModalOpen(true);
  };

  const closeApepeModal = () => {
    setIsApepeModalOpen(false);
  };

  const handleOpenApepeModal = () => {
    setIsApepeModalOpen(true);
  };

  const closePathModal = () => {
    setIsPathModalOpen(false);
  };

  const handleOpenPathModal = () => {
    setIsPathModalOpen(true);
  };

  const handleOpenPaint = () => {
    dispatch(addAppWithSettings(EAppKeys.PepePaint));
  };

  return (
    <ChristmasClaimsSC>
      {address ? (
        <div className="gift-grid">
          <Box
            isLive={true}
            hasBeenClaimed={!crackerAvailable}
            bgImage={getBgImage(isWhiteListed, crackerAvailable)}
            onClick={crackerAvailable ? handleClaimCracker : handleOpenModal}
            isLoading={isClaimCrackerLoading || crackerEligibleIsLoading}
            claimedImg={crackerImg}
            isWhitelisted={isWhiteListed}
          />
          <Box
            isLive={true}
            hasBeenClaimed={!coalAvailable}
            bgImage={!coalAvailable ? claimedGift : greenGift}
            onClick={coalAvailable ? handleClaimCoal : handleOpenCoalModal}
            isLoading={isClaimCoalLoading || coalEligibleIsLoading}
            claimedImg={pepeCoal}
            isWhitelisted={isWhiteListed}
          />
          <Box
            isLive={true}
            hasBeenClaimed={!apepeAvailable}
            bgImage={!apepeAvailable ? claimedGift : greenGift}
            onClick={apepeAvailable ? handleClaimApepe : handleOpenApepeModal}
            isLoading={isClaimApepeLoading || apepeEligibilityIsLoading}
            claimedImg={rareApepe}
            isWhitelisted={isWhiteListedApepe}
          />
          <Box
            isLive={true}
            hasBeenClaimed={!pathAvailable}
            bgImage={!pathAvailable ? claimedGift : greenGift}
            onClick={pathAvailable ? handleClaimPath : handleOpenPathModal}
            isLoading={isClaimApepeLoading || pathEligibilityIsLoading}
            claimedImg={pathArt}
            isWhitelisted={isWhiteListedApepe}
          />
          <Box
            isLive={true}
            hasBeenClaimed={true}
            bgImage={claimedGift}
            onClick={handleOpenPaint}
            isLoading={false}
            claimedImg={paint}
            isWhitelisted={true}
          />
          {[...Array(2)].map((_, i) => (
            <Box
              isLive={false}
              hasBeenClaimed={false}
              bgImage={greenGift}
              key={i}
            />
          ))}
        </div>
      ) : (
        <div className="connect">
          <h3>Merry Christmas</h3>
          <p>Connect your Web3 wallet to claim your free gifts!</p>
          <ConnectButton />
        </div>
      )}
      {isModalOpen && (
        <div className="claim-modal">
          <div className="window" style={{ width: "300px" }}>
            <div className="title-bar">
              <div className="title-bar-text">Christmas Cracker Claimed!</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeModal}></button>
              </div>
            </div>
            <div className="window-body">
              <p>
                Congratulations! You've claimed a rare PepeCoin Christmas
                Cracker!
                <br />
                <br />
                Its purpose remains a mystery for now, but prepare to be amazed.
                In a few days we will be unveiling the next major evolution of
                PepeCoin.
                <br />
                <br />
                The items found inside your cracker will play a key role. Strap
                in frens.
              </p>
              <button style={{ marginTop: "1rem" }} onClick={handleViewNFT}>
                View NFT
              </button>
            </div>
          </div>
        </div>
      )}
      {isCoalModalOpen && (
        <div className="claim-modal">
          <div className="window" style={{ width: "300px" }}>
            <div className="title-bar">
              <div className="title-bar-text">Lump of Coal Claimed!</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeCoalModal}></button>
              </div>
            </div>
            <div className="window-body">
              <p>
                Kekity kek! You claimed a lump of coal with luscious red lips!
                <br />
                <br />
                Santa Pepe is a bit of a troll, but who knows, maybe this will
                come in handy if you need a heat source soon.
                <br />
                <br />
                I'd keep it in your back pocket just in case!
              </p>
              <button style={{ marginTop: "1rem" }} onClick={handleViewCoal}>
                View NFT
              </button>
            </div>
          </div>
        </div>
      )}
      {isApepeModalOpen && (
        <div className="claim-modal">
          <div className="window" style={{ width: "300px" }}>
            <div className="title-bar">
              <div className="title-bar-text">
                PepeCoin x Apepe Collab Claimed!
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closeApepeModal}></button>
              </div>
            </div>
            <div className="window-body">
              <p>
                Congratulations! You have claimed a rare Pepecoin x Apepe
                collaboration artpiece!
                <br />
                <br />
                This is the first edition of the Pepecoin x Frens collection.
                <br />
                <br />
                What dank works will you adorn your walls with in Kekspace?
              </p>
              <button style={{ marginTop: "1rem" }} onClick={handleViewCollab}>
                View NFT
              </button>
            </div>
          </div>
        </div>
      )}
      {pathModalOpen && (
        <div className="claim-modal">
          <div className="window" style={{ width: "300px" }}>
            <div className="title-bar">
              <div className="title-bar-text">
                PepeCoin x Feisty Doge Collab Claimed!
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={closePathModal}></button>
              </div>
            </div>
            <div className="window-body">
              <p>
                Congratulations! You have claimed a rare Pepecoin x Feisty Doge
                NFT collaboration artpiece!
                <br />
                <br />
                This is the second edition of the Pepecoin x Frens collection.
                <br />
                <br />
                What dank works will you adorn your walls with in Kekspace?
              </p>
              <button style={{ marginTop: "1rem" }} onClick={handleViewPath}>
                View NFT
              </button>
            </div>
          </div>
        </div>
      )}
    </ChristmasClaimsSC>
  );
};

export default ChristmasClaims;
