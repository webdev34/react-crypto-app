import React, { useEffect, useState } from "react";
import { millify } from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "./Loader";

const { Title } = Typography;

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [globalStats, setGlobalStats] = useState([]);

  const getData = () => {
    fetch("../json/coins.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        let stats = response[0].data.stats;
        setGlobalStats(stats);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loader />;

  //Crypto has gotten huge so we need a max number check so js doesnt break
  const maxJSInt = 999919925474099;
  const total24hVolume =
    globalStats?.total24hVolume > maxJSInt
      ? maxJSInt
      : globalStats?.total24hVolume;

  return (
    <>
      <Title level={2} className="header">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified={true} />
    </>
  );
};

export default HomePage;
