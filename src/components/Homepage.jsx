import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic} from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';

import { Cryptocurrencies, News } from '../components';

import Loader from './Loader';

const { Title } = Typography; //destructure so we can say Title instead of Typography.Title

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);//Call as a hook. First get the data then redux gives us isFetching state. Pass in 10 to get 10 cryptos.
  const globalStats = data?.data?.stats; // we create a global stats object to use the data

  if(isFetching) return <Loader />;
  // console.log(data);

  return (
      <>
        <Title level={2} className="heading">Global Crypto Stats</Title>
        <Row>
            <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col> 
            <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col> 
            <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col> 
            <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col> 
            <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col> 
        </Row>
        <div className="home-heading-container">
            <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
            <Title level={3} className="show-more"><Link to='/cryptocurrencies'> Show More</Link></Title>
        </div>
        <Cryptocurrencies simplified /> {/* simplifed prop only shows first 10 cryptocurrencies*/}
        <div className="home-heading-container">
            <Title level={2} className="home-title">Latest Crypto News</Title>
            <Title level={3} className="show-more"><Link to='/news'> Show More</Link></Title>
        </div>
        <News simplified /> {/* simplifed prop only shows first 10 data items related to news*/}
      </>
  )
}

export default Homepage