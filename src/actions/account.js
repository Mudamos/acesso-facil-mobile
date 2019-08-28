export const createAccount = ({ accountName }) => ({
  type: "CREATE_ACCOUNT",
  payload: {
    accountName,
  },
});
