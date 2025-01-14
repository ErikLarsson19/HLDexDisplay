import React, { useState } from "react";
import ccxt from "ccxt"; 
import './Balance.css';


/**
 * User inputs a wallet address and the spot balance of that account is displayed
 *
 * @return {JSX.Element} 
 */
function Balance() {
    //Hooks to store wallet address entered and spot balance
    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState(null);

    
    /**
     *Fetches wallet balance using the ccxt HL wrapper
     *Configured to the spot account
     *@async
     *@function
     */
    const fetchBalance = async () => {
        if(!walletAddress){
            alert("Please enter a valid wallet address");
            return;
        }

        try{
            const exchange = new ccxt.hyperliquid({
                enableRateLimit: true, // Automatically throttles requests
                walletAddress: walletAddress
              });

            const params = {
                type: "spot"
            }
            
            const balance = await exchange.fetchBalance(params);
            console.log(balance);

            const formattedDetails = Object.keys(balance.total)
                .map((asset) => `${asset}: ${balance.total[asset]}`)
                .join("\n");

            setBalance(formattedDetails);
              
        } catch (error){
            console.log("Error fetching balanace", error);
            alert("Failed to fetch balance, try again!");
        }
    };

    return(
        <div>
            <h3>HyperLiquid spot balance</h3>
            <p>Enter a valid wallet address to check spot information for that address </p>
            <p>Random example you can use to test: 0x10b4aef445821f70ca48bf0a5ef1a06eb815eb21 </p>
            <input className="walletInput" type="text" placeholder="Enter wallet address" value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            ></input>
            <button className="balanceButton"
            onClick={fetchBalance}
            >
            Get Balance
            </button>
            <div>
            <h2>Balance Details</h2>
            <pre>{balance}</pre>
            </div>
        </div>
       
    );
}


export default Balance;