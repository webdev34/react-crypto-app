import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  "x-access-token":
    "coinranking58b0e91d11c887da72a3df858d0af380ffe584f04fd722f1",
};

const baseUrl = "https://api.coinranking.com/v2";
const createRequest = (url) => ({ url, headers: cryptoHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => "/coins?limit=" + count,
      error: (error) => {
        console.log(error);
        console.log("error Get Crypto Detail end point");
      },
    }),
    getCryptoDetail: builder.query({
      query: (cryptoId) => "/coin/" + cryptoId,
      error: (error) => {
        console.log(error);
        console.log("error Get Crypto Detail end point");
      },
    }),
    getCryptoHistory: builder.query({
      // query: ({ coinId, timePeriod }) => createRequest("/coin/" + coinId + "/history/" + timePeriod),
      query: ({ coinId, timePeriod }) =>
        "/coin/" + coinId + "/history?timePeriod=" + timePeriod,
      error: (error) => {
        console.log(error);
        console.log("error Get Crypto History endpoint");
      }
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery
} = cryptoApi;