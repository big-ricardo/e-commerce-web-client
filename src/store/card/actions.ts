import Card from "@/interfaces/card";
import * as actions from "./actionTypes";

export const addCard = (id: string, card: Card) => ({
  type: actions.ADD_CARD,
  payload: {
    card,
    id,
  },
});

export const addCardSuccess = (card: Card) => ({
  type: actions.ADD_CARD_SUCCESS,
  payload: {
    card,
  },
});

export const addCardFailure = (error: string) => ({
  type: actions.ADD_CARD_FAILURE,
  payload: {
    error,
  },
});

export const getCards = (id: string) => ({
  type: actions.GET_CARDS,
  payload: {
    id,
  },
});

export const getCardsSuccess = (cards: Card) => ({
  type: actions.GET_CARDS_SUCCESS,
  payload: {
    cards,
  },
});

export const getCardsFailure = (error: string) => ({
  type: actions.GET_CARDS_FAILURE,
  payload: {
    error,
  },
});
