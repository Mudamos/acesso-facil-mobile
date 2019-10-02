import { RSA, RSAKeychain } from "react-native-rsa-native";
import {
  append,
  curry,
  filter,
  findIndex,
  isNil,
  lensPath,
  propEq,
  reject,
  set,
} from "ramda";

import { sha1 } from "react-native-sha256";
import uuidv1 from "uuid/v1";

const ACCOUNTS_KEY = "accounts";
const RSA_STRENGTH = 2048;
const ALGORITHM = RSA.SHA512withRSA;

const generateAccountId = keychainNamespace =>
  `${keychainNamespace}.key.${uuidv1()}`;

const fetchAccounts = storage =>
  storage.fetch(ACCOUNTS_KEY).then(accounts => accounts || []);

const persistAccounts = curry((storage, accounts) =>
  storage.store(ACCOUNTS_KEY, accounts),
);

/* @returns {Object} newAccount
 *  @param {String} newAccount.id - Account id
 *  @param {String} newAccount.name - Account name
 *  @param {String} newAccount.publicKey
 *  @param {Boolean} newAccount.committed - If it's should be considered saved
 */
const createAccount = curry((storage, keychainNamespace, { accountName }) =>
  fetchAccounts(storage)
    .then(accounts => ({
      accounts,
      newAccount: {
        id: generateAccountId(keychainNamespace),
        name: accountName,
        committed: false,
      },
    }))
    .then(({ accounts, newAccount }) =>
      RSAKeychain.generateKeys(newAccount.id, RSA_STRENGTH).then(keys =>
        set(lensPath(["newAccount", "publicKey"]), keys.public, {
          accounts,
          newAccount,
        }),
      ),
    )
    .then(({ accounts, newAccount }) =>
      sha1(newAccount.publicKey).then(hash =>
        set(lensPath(["newAccount", "idDevice"]), hash, {
          accounts,
          newAccount,
        }),
      ),
    )
    .then(({ accounts, newAccount }) =>
      persistAccounts(storage, append(newAccount, accounts)).then(
        () => newAccount,
      ),
    ),
);

const deleteAccount = curry((storage, id) =>
  fetchAccounts(storage)
    .then(accounts => reject(propEq("id", id), accounts))
    .then(accounts => persistAccounts(storage, accounts).then(() => accounts)),
);

const commit = curry((storage, accountId) =>
  fetchAccounts(storage).then(async accounts => {
    const accountIndex = findIndex(propEq("id", accountId), accounts);
    if (isNil(accountIndex)) {
      // TODO: properly create errors
      return Promise.reject({
        error: new Error(`account not found: ${accountId}`),
      });
    }

    const updates = set(lensPath([accountIndex, "committed"]), true, accounts);

    await persistAccounts(storage, updates);
    return updates[accountIndex];
  }),
);

const destroyUncommited = storage =>
  fetchAccounts(storage)
    .then(filter(propEq("committed", true)))
    .then(persistAccounts(storage));

/* @returns {String} signature
 */
const signMessage = curry((storage, accountId, message) =>
  RSAKeychain.signWithAlgorithm(message, accountId, ALGORITHM),
);

/* @returns {Boolean} isValid
 */
const verifyMessage = curry((storage, signature, message, publicKey) =>
  RSA.verifyWithAlgorithm(signature, message, publicKey, ALGORITHM),
);

export default ({ keychainNamespace, storage }) => ({
  createAccount: createAccount(storage, keychainNamespace),
  deleteAccount: deleteAccount(storage),
  commit: commit(storage),
  destroyUncommited: () => destroyUncommited(storage),
  fetchAccounts: () => fetchAccounts(storage),
  signMessage: signMessage(storage),
  verifyMessageWithPublicKey: verifyMessage(storage),
});
