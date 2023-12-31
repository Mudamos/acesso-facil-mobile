import PropTypes from "prop-types";

export const AccountPrototype = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  accountName: PropTypes.string.isRequired,
  committed: PropTypes.bool,
  publicKey: PropTypes.string.isRequired,
  idDevice: PropTypes.string.isRequired,
});

export const SefazAccountPrototype = PropTypes.shape({
  hash: PropTypes.string.isRequired,
  idUsuario: PropTypes.number.isRequired,
});
