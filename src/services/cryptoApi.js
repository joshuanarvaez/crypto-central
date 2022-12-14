import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_API_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }

  const baseUrl = 'https://coinranking1.p.rapidapi.com';

  // utility function to pass headers to our api calls
  const createRequest = (url) => ({ url, headers: cryptoApiHeaders })
  
  console.log(process.env); //logs our API keys

  export const cryptoApi = createApi({
        reducerPath: 'cryptoApi', // 1) set the path, what is reducer for? 2) create endpoint 3) add reducer to store
        baseQuery: fetchBaseQuery({ baseUrl }),
        endpoints: (builder) => ({
            getCryptos: builder.query({
                query: (count) => createRequest(`/coins?limit=${count}`)//Endpoint 1: Pass count into the query to get 10 coins. Set key to limit and value to count in template string. 
            }),
            getExchanges: builder.query({
              query: () => createRequest(`/exchanges`)//Endpoint 2
          }),
            getCryptoDetails: builder.query({
              query: (coinId) => createRequest(`/coin/${coinId}`)//Endpoint 3: Pass coinId into the query - to render our CryptoDetails component.
            }),
            getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`)//Endpoint 4: Pass coinId and timeperiod into the query - to render our Line Charts component.
            })
        })
  });

  // exporting the call above is formatted as follows
  export const {
    useGetCryptosQuery, useGetExchangeDetailsQuery, useGetExchangesQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery
  } = cryptoApi;