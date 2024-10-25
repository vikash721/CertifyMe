import React, { useState } from "react";
import Web3 from "web3";
import { certifyMeContractAbi } from "../web3/CertifyMeContractAbi.js";
import styles from './contractService.module.css'; // Modular CSS

let web3;
const contractAddress = "0x0c838a0C0DFE1226c25d0523f8d2E20acA7B6f33";
let factoryContract;

const SetAchievementForm = () => {
  const [name, setName] = useState("");
  const [achievementType, setAchievementType] = useState("");
  const [url, setUrl] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setUserAddress(accounts[0]);
        factoryContract = new web3.eth.Contract(certifyMeContractAbi, contractAddress);
        setIsWalletConnected(true);
        console.log("Wallet connected:", accounts[0]);
      } catch (err) {
        console.error("User denied wallet connection", err);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask to continue.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = factoryContract.methods.setAchievement(name, achievementType, url).encodeABI();

      const estimateGas = await factoryContract.methods
        .setAchievement(name, achievementType, url)
        .estimateGas({ from: userAddress });

      const bufferGas = Math.floor(Number(estimateGas) * 1.1);
      const tx = {
        from: userAddress,
        to: contractAddress,
        gas: bufferGas,
        data: data,
        gasPrice: await web3.eth.getGasPrice(),
      };

      const receipt = await web3.eth.sendTransaction(tx);
      setTxHash(receipt.transactionHash);
      console.log("Transaction successful:", receipt);
    } catch (err) {
      console.error("Error submitting achievement:", err.message || err);
      alert(`There was an error with your submission: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Submit Your Achievement</h2>

      {!isWalletConnected ? (
        <button onClick={connectWallet} className={styles.connectButton}>Connect Wallet</button>
      ) : (
        <div className={styles.formContainer}>
          <p>Connected Wallet: {userAddress}</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
            </label>
            <label>
              Achievement Type:
              <input
                type="text"
                value={achievementType}
                onChange={(e) => setAchievementType(e.target.value)}
                required
                className={styles.input}
              />
            </label>
            <label>
              Achievement URL:
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className={styles.input}
              />
            </label>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? "Submitting..." : "Submit Achievement"}
            </button>
          </form>
        </div>
      )}

      {txHash && (
        <div className={styles.successMessage}>
          <h3>Transaction Successful!</h3>
          <p>
            Transaction Hash: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default SetAchievementForm;
