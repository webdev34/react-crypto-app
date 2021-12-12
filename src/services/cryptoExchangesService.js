import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoExchangesHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  "x-access-token":
    "coinranking58b0e91d11c887da72a3df858d0af380ffe584f04fd722f1",
};

const baseUrl = "https://api.coinranking.com/v2";
const createRequest = (url) => ({ url, headers: cryptoExchangesHeaders });

export const cryptoExchangesApi = createApi({
  reducerPath: "cryptoExchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchanges: builder.query({
      query: (coinId) => createRequest("/coin/" + coinId + "/exchanges"),
    }),
  }),
});

export const { useGetCryptoExchangesQuery } = cryptoExchangesApi;
