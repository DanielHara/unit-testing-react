import { createSelector } from 'reselect';

const getClients = (state) => state.reducer.clients;
const getNumber = (state) => state.reducer.number;

export const clientsSelector = createSelector(
  getClients,
  (clients) => (clients)
);

export const numberSelector = createSelector(
  getNumber,
  (number) => (number)
);
