import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
 import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [cryptos, setCryptos] = useState([]);
  const [searchCryptos, setSearchCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(true);

  const getData=()=>{
    fetch('../json/coins.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(response) {
        console.log(response);
        let coins = response[0].data.coins;
        setSearchCryptos(response[0].data.coins);

        if(count === 10){
          coins = coins.splice(0, 10);
        }

        setCryptos(coins);
        setLoading(false);
      });
  }

  useEffect(()=>{
    getData()
  },[]);

  useEffect(() => {
    const filteredData = searchCryptos?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [searchCryptos, searchTerm]);

  if (isLoading) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency?.uuid}
          >
            {/* <Link to={`/crypto/${currency?.uuid}`}> */}
            <a href={`${currency?.websiteUrl}`} target="_blank" rel="noreferrer">

            
              <Card
                title={`${currency?.rank}. ${currency?.name}`}
                extra={<img className="crypto-image" src={currency?.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency?.price)}</p>
                <p>Market Cap: {millify(currency?.marketCap)}</p>
                <p>Daily Change: {millify(currency?.change)}%</p>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
