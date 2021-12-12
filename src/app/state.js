import { createSlice } from "@reduxjs/toolkit";

export const cryptoState = createSlice({
    name: "cryptoState",
    intitialState: {
        value: null
    },
    reducers: {
        currentCoin: (coin) => {
            console.log(coin);
            console.log('current coin');
        }
    }
});

export const { currentCoin } = cryptoState.actions