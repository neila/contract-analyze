// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "../lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol";

contract EventNft is ERC165 {
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}
