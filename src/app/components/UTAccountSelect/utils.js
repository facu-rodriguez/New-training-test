const containsSearchedCharacters = (accountField, accountFilter) =>
  accountField.toLowerCase().indexOf(accountFilter.toLowerCase()) >= 0;

export const getFilteredAccounts = (accounts, accountFilter) =>
  accountFilter
    ? accounts.filter(
        account =>
          containsSearchedCharacters(account.address, accountFilter) ||
          containsSearchedCharacters(account.client_number, accountFilter)
      )
    : accounts;
