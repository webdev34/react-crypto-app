import React, { useEffect, useState } from "react";
import millify from 'millify';
import { Row, Col, Typography, Avatar , Table} from 'antd';
import Loader from './Loader';

const { Text } = Typography;

const Market = () => {
  const [ marketList, setMarketList ] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Icon',
      dataIndex: 'sourceIconUrl',
      key: 'sourceIconUrl',
      render: url => <Avatar className="exchange-image" src={url} />
    },
    {
      title: 'Name',
      dataIndex: 'sourceName',
      key: 'sourceName',
    },
    {
      title: 'Symbol',
      dataIndex: 'quoteSymbol',
      key: 'quoteSymbol',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => millify(price)
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      render: volume => millify(volume)
    },
    {
      title: 'Market Share',
      dataIndex: 'marketShare',
      key: 'marketShare',
      render: marketShare => millify(marketShare)
    }
  ];

  const getData=()=>{
    fetch('../json/markets.json'
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
        console.log(response)
        setMarketList(response[0].data.markets);
        setLoading(false);
      });
  }
  useEffect(()=>{
    getData()
  },[]);

 console.log(marketList)
  console.log('!!!!!!')
if (isLoading) {
    return <Loader />;
  }

  return (<Table columns={columns} dataSource={marketList} />);
};

export default Market;