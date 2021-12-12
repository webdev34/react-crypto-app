import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const cryptoNewsHeaders = {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": "0b53d959b1msh0d3f54bf5c66559p178573jsn0199102efcd5",
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';
const createRequest = (url) => ({url, headers: cryptoNewsHeaders})

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest('/news/search?q='+newsCategory+'&safeSearch=Off&textFormat=Raw&freshness=Day&count='+count)
    })
  })
});

export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi;
