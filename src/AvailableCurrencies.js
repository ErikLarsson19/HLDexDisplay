import React, {useState, useEffect} from "react";
import ccxt from "ccxt";
import './AvailableCurrencies.css';


/**
 * Displays available currencies on the HL dex along with leverage x.
 * Highlighted currencies are on the current coingecko trending page.
 * 
 * @component
 * @return {JSX.Element} 
 */
function AvailableCurrencies(){
    // State hooks for managing currencies and trending tokens.
    const[currencies, setCurrencies] = useState([]);
    const [trendingTokens, setTrendingTokens] = useState([]);
    const hardcodedTrendingToken = "ETH";

    
    /**
     *Fetches available currencies and leverage from HL dex.
     *@async
     *@function
     */
    const fetchAvailableCurrencies = async () => {
        
        try{
            const exchange = new ccxt.hyperliquid({
                enableRateLimit: true
            });

            const fetchedCurrencies = await exchange.fetchCurrencies();

            const formattedDetails = Object.entries(fetchedCurrencies).map(([key, details]) => {
                return {
                    name: details.name || key, 
                    leverage: details.info?.maxLeverage || "N/A", 
                };
            });
            setCurrencies(formattedDetails);
        } catch (error){
            console.error(error);
        }
    };

    
    /**
     *Fetches trending token from the open coingecko apis trending page
     *@async
     *@function
     */
    const fetchTrendingTokens = async () => {
        try{
            const response = await fetch("https://api.coingecko.com/api/v3/search/trending");
            const data = await response.json();

            const trendingList = data.coins.map((coin) => coin.item.symbol.toLowerCase());
            setTrendingTokens(trendingList);
        } catch (error){
            console.log("Error fetching the tokens", error);
        }
    };

    //Effect hook to feetch on component mount
    useEffect(() => {
        fetchAvailableCurrencies();
        fetchTrendingTokens();
    }, []);

    return (
        <div className="available-currencies">

            <h2>Available Currencies and Leverage on HyperLiquid</h2>
            <p>Highlighted tokens are currently trending according to CoinGecko</p>
            <div className="currency-list">
                {currencies.map((currency, index) => {
                    const isTrending =
                        trendingTokens.includes(currency.name.toLowerCase()) ||
                        currency.name.toLowerCase() === hardcodedTrendingToken;

                    return (
                        <div
                            className={`currency-item ${isTrending ? "highlight" : ""}`}
                            key={index}
                        >
                            <span className="currency-name">{currency.name}</span>
                            <span className="currency-leverage">{currency.leverage}x</span>
                        </div>
                    );
                })}
            </div>

            <h2>Trending Tokens</h2>
            <div className="trending-tokens-list">
                {trendingTokens.map((token, index) => (
                    <div key={index} className="trending-token-item">
                        {token}
                    </div>
                ))}
                <div className="trending-token-item">ethereum</div>
            </div>
        </div>
    );
}

export default AvailableCurrencies;