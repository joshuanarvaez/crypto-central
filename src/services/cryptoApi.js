import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '487753a686msh05c960de3e0c08cp15e507jsn67a8fbc22f4b',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }

  const baseUrl = 'https://coinranking1.p.rapidapi.com';

  // utility function to pass headers to our api calls
  const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

  export const cryptoApi = createApi({
        reducerPath: 'cryptoApi', // 1) set the path, what is reducer for 
        baseQuery: fetchBaseQuery({ baseUrl }),
        endpoints: (builder) => ({
            getCryptos: builder.query({
                query: (count) => createRequest(`/coins?limit=${count}`)//Endpoint 1: Pass count into the query to get 10 coins. Set key to limit and value to count - template string
            }),
            getExchanges: builder.query({
              query: () => createRequest(`/exchanges`)//Endpoint 2
          }),
            getExchangeDetails: builder.query({
            query: () => createRequest(`/exchange/:uuid`)//Endpoint 3
        }),
            getCryptoDetails: builder.query({
              query: (coinId) => createRequest(`/coin/${coinId}`)//Endpoint 4: Pass coinId into the query - to render our CryptoDetails component.
            }),
            getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timeperiod=${timePeriod}`)//Endpoint 5: Pass coinId and timeperiod into the query - to render our Line Charts component.
            })
        })
  });

  // exporting the call above is formatted as follows
  export const {
    useGetCryptosQuery, useGetExchangeDetailsQuery, useGetExchangesQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery
  } = cryptoApi;
  