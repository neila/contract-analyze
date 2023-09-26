// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/EventNft.sol";
import "openzeppelin/token/ERC1155/IERC1155.sol";

contract EventNftTest is Test {
    EventNft public token;

    function setUp() public {
        token = new EventNft();
    }

    function testInterface() public view {
        assert(token.supportsInterface(type(IERC1155).interfaceId));
    }
}
