import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Typography, Select, Col, Row } from "antd";
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoServices";
import LineChart from "./LineChart";
import Loader from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const [loadingHistory, setLoadingHistory] = useState(false);

  if (isFetching) return <Loader />;
  
  const historyLoader = () => {
    setLoadingHistory(true);
    setTimeout(() => {
        setLoadingHistory(false);
    }, 500);
  }

  const cryptoDetails = data?.data?.coin;
  console.log(data);
  console.log(cryptoDetails);
  console.log(coinHistory)

  console.log("9999999sssss");

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: "$" + millify(cryptoDetails?.price),
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: cryptoDetails?.rank,
      icon: <NumberOutlined />,
    },
    {
      title: "24h Volume",
      value: "$" + millify(cryptoDetails?.["24hVolume"]),
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: millify(cryptoDetails?.marketCap),
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: millify(cryptoDetails?.allTimeHigh?.price),
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    // {
    //   title: "Approved Supply",
    //   value: cryptoDetails?.approvedSupply ? (
    //     <CheckOutlined />
    //   ) : (
    //     <StopOutlined />
    //   ),
    //   icon: <ExclamationCircleOutlined />,
    // },
    {
      title: "Total Supply",
      value: millify(cryptoDetails?.supply?.total),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: millify(cryptoDetails?.supply?.circulating),
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>{cryptoDetails.name}</p>
        </Col>

        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Time Period"
          onChange={(value) => { setTimePeriod(value); historyLoader(); }}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        {/* <div style={{ display: "inline-block", marginLeft: "10px" }}>
          <Title level={5} style={{ minHeight: "40px", fontSize: "15px" }}>
            Percentage Change: 
            {loadingHistory ? <Loader /> : <p style={{ display: "inline-block", marginLeft: "5px", fontSize: "13px"}}>{coinHistory?.data?.change}%</p>}

            
          </Title>
        </div> */}

        

        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Value Statistic
              </Title>
              <p>An overview showing the stats of {cryptoDetails.name}</p>
            </Col>

            {stats.map(({ icon, title, value, i }) => (
              <Col className="coin-stats" key={title}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Other Statistics
              </Title>
              <p>An overview showing the stats of all Cryptocurrencies</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats" key={title}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>

        <Col className="coin-desk-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name}
            </Title>
            {HTMLReactParser(cryptoDetails.description)}
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetails;
