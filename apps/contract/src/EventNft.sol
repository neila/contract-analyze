// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "openzeppelin/utils/introspection/ERC165.sol";
import "solmate/tokens/ERC1155.sol";
// import "openzeppelin/token/ERC1155/ERC1155.sol";

import "openzeppelin/access/AccessControl.sol";

contract EventNft is ERC165, ERC1155, AccessControl {
    string private _uri; // Used as the URI for all token types by relying on ID substitution, e.g. https://token-cdn-domain/{id}.json
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /**
     * @dev ERC165 Standard Interface Detection
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC165, ERC1155, AccessControl) returns (bool) {
        return
            interfaceId == type(ERC1155).interfaceId ||
            interfaceId == type(AccessControl).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC1155MetadataURI-uri}.
     *
     * This implementation returns the same URI for *all* token types. It relies
     * on the token type ID substitution mechanism
     * https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP].
     *
     * Clients calling this function must replace the `\{id\}` substring with the
     * actual token type ID.
     */
    function uri(uint256) public view virtual override returns (string memory) {
        return _uri;
    }

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE` to the account that deploys the contract.
     */
    constructor() ERC1155() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
}
