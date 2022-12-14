import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders =  {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_NEWS_API_KEY,
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

  const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

  // utility function to pass headers to our api calls
  const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })

  export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi', // 1) set the path, what is reducer for 
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`), // 2) only crypto news endpoint, next step is to add the reducer to the store
        })
    })
});

  // exporting the call above is formatted as follows
  export const {
    useGetCryptoNewsQuery,
  } = cryptoNewsApi;