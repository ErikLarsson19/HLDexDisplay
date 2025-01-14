const fetch = require("node-fetch");

const getUserBalances = async (walletAddress) => {
    try {
        const response = await fetch("https://api.hyperliquid.xyz/info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "spotDeployState",
                user: walletAddress,
            }),
        });

        const data = await response.json();
        console.log("User Token Balances:", data);
    } catch (error) {
        console.error("Error fetching balances:", error);
    }
};


getUserBalances("0x65902b1E375993F3Eb02dA4d13fB5fE19461D2E3");