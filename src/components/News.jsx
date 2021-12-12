import React, { useEffect, useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsService";
import { Select, Typography, Row, Col, Avatar, Card, Space } from "antd";
import moment from "moment";
import { Loader } from ".";

const News = ({ simplified }) => {
  const { Text, Title } = Typography;
  const { Option } = Select;
  const demoImage =
    "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";
  const count = simplified ? 6 : 12;
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count,
  });

  const [cryptoNewsList, setcryptoNewsList] = useState([]);
  const [cryptoOptionsList, setCryptoOptionsList] = useState([]);
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
        setCryptoOptionsList(coins);
      });
  }

  useEffect(()=>{
    getData()
  },[]);

  useEffect(() => {
    setcryptoNewsList(cryptoNews?.value);
    setLoading(false);
  }, [cryptoNews?.value]);

  const filterFromSelect = (value) => {
    const selectedOption = cryptoOptionsList.filter(
      (o) => o.name.toLowerCase() === value.toLowerCase()
    );

    if (selectedOption.length > 0) {
      setNewsCategory(selectedOption[0].name);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch={false}
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => filterFromSelect(input)}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>

              {cryptoOptionsList?.map((coin, index) => (
                <Option key={index} value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}

        {cryptoNewsList?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} className="crypto-card" key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="nonreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                  {news?.name.length > 80
                    ? news?.name.substring(0, 80) + " ..."
                    : news?.name} 
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                    style={{ maxWidth: "150px", maxHeight: "100px" }}
                  />
                </div>
                <p  style={{ marginBottom: "15px" }}>
                  {news?.description.length > 150
                    ? news?.description.substring(0, 150) + " ..."
                    : news?.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news?.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {news?.provider[0]?.name}
                    </Text>
                  </div>
                  <Text className="news-date">
                    {moment(news?.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
