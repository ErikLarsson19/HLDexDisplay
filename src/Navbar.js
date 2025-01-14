import React, {useState, useEffect} from 'react';
import './Navbar.css'

function Navbar(){
    const[prices, setPrices] = useState([]);

    const fetchPrices = async () => {
        try{
            const response = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,hyperliquid&vs_currencies=usd'
            );
            const data = await response.json();

            setPrices({
                bitcoin: data.bitcoin?.usd,
                ethereum: data.ethereum?.usd,
                hyperliquid: data.hyperliquid?.usd
            });
        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPrices();
    }, []);

    return (
        <nav className="navbar">
            <h1>Prices</h1>
            <div className="prices">
                <p>Bitcoin: ${prices.bitcoin}</p>
                <p>Ethereum: ${prices.ethereum}</p>
                <p>Hype: ${prices.hyperliquid}</p>
            </div>
        </nav>
    );
    
}

export default Navbar;