import React, {useState} from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import Loader from './Loader';

const { Text, Title } = Typography; //destructure so we can say just 'Text' or 'Title'
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [ newsCategory, setNewsCategory ] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 9 : 30 }); //if simplified, show 6 articles. Else show 30.
  const { data } = useGetCryptosQuery(100); //bring this query over so we can filter through data of 100 cryptocurrency options on our news select

  if(!cryptoNews?.value) return <Loader />;

  return (
      <Row key={''} gutter={[24, 24]}>
        {/* if not simplified - we are viewing all news and not just 6 articles, render a select
            the onChange property allows us to set the state of the select - setNewsCategory - created state above.
            filterOption prop allows user to filter through articles by specific crypto so user can then view articles 
            pertaining only to that crypto. */}
         {!simplified && (
              <Col span={24}>
                  <Select
                      showSearch
                      className='select-news'
                      placeholder='Search a crypto'
                      optionFilterProp='children'
                      onChange={(value) => setNewsCategory(value)}
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                  </Select>
              </Col>
        )}
        {/* map over the crypto news articles and return a card with that data */}
        {cryptoNews.value.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
                <Card hoverable className='news-card'>
                      <a href={news.url} target="_blank" rel="noreferrer">
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.name}</Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px'}} src={ news?.image?.thumbnail?.contentUrl || demoImage } alt='news'/> {/* if there is an image for article, display that img or display the demo image.*/}
                            </div>
                            <p>
                              {/* if description is greater than 100 characters, render the substring
                                  if description is less than 100 characters, render the description */}
                                  {news.description > 100 
                                      ? `${news.description.substring(0, 100)}...`
                                      : news.description
                                  }
                            </p>
                            {/* Holds avatar img and name of news article provider. Just outside the container below is timestamp of article */}
                            <div className="provider-container">
                                  <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news'/>
                                    <Text className='provider-name'>{ news.provider[0]?.name }</Text>
                                  </div>
                                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                      </a>
                </Card>
              </Col>
         ))} 
      </Row>
  )
}

export default News