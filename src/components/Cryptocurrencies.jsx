import React, { useState, useEffect } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;//If simplified is true, count will be 10. Else count will be 100.
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);//destructure the data and rename to cryptosList then get isFetching state from redux and pass count to query
  const [cryptos, setCryptos] = useState([]);// create new state cryptos which has starting value equal to a list of all 100 cryptos
  const [searchTerm, setSearchTerm] = useState('');// state for crypto search input

  useEffect(() => {
      const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase())); //filter the list out by search term

      setCryptos(filteredData); //setCryptos to equal filtered data

  }, [cryptosList, searchTerm]); // function will run at the start but also anytime the cryptosList or searchTerm value changes

  if(isFetching) return 'Loading...'; 


  return (
    <>
    {/* 1 Create a row with gutters - spaces between the items [top&bottom, left&right] 
        2 Get every cryptocurrency and instantly return column or columns dependent on screen size.
            Since ANTD is based off 24 columns, xs = 1 column, sm = 2 columns, lg = 4 columns. 
        3 Inside the column is a link which links to the crypto id. Inside the link is a card. 
        4 Inside the card is a particular crypto's price, market cap and daily change %  */}
    
        <div className="search-crypto">
            <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Row gutter={[32, 32]} className='crypto-card-container'> 
            {cryptos?.map((currency) => (
              <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                    <Link to={`/crypto/$currency.id}`}>
                        <Card 
                            title= {`${currency.rank}. ${currency.name}`}
                            extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.iconUrl}/>}
                            hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                        </Card>
                    </Link>
              </Col>
            ))}
        </Row>
    
    </>
  )
}

export default Cryptocurrencies