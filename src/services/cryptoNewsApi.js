import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders =  {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '487753a686msh05c960de3e0c08cp15e507jsn67a8fbc22f4b',
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
            query: ({ newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

  // exporting the call above is formatted as follows
  export const {
    useGetCryptoNewsQuery,
  } = cryptoNewsApi;