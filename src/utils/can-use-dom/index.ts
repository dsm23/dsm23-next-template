/* oxlint-disable no-deprecated, prefer-optional-chain, unbound-method, typescript/no-unnecessary-condition */

const canUseDom = Boolean(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement,
);

export default canUseDom;
