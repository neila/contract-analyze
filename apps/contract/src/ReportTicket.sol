// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "openzeppelin/token/ERC721/ERC721.sol";
import "openzeppelin/utils/Counters.sol";

import "openzeppelin/utils/Base64.sol";
import "forge-std/console.sol";

contract ReportTicket is ERC721 {
    struct NftAttributes {
        string name;
        string imageURL;
    }

    NftAttributes[] public Web3Nfts;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Analytics Report Ticket", "ART") {
        console.log("Contract initialized");
    }

    // ユーザーが NFT を取得するために実行する関数です。

    function mintIpfsNFT() public {
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        Web3Nfts.push(
            NftAttributes({
                name: "Voucher",
                imageURL: "ipfs://bafybeihz2hh3k7x3n6jitybozt35vvin2k7alz5wmsbnjg6nsr4mr5v2gi"
            })
        );
        console.log("Voucher ID %s has been minted to %s", newItemId, msg.sender);
        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId) public pure override returns (string memory) {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Voucher -- #',
                        Strings.toString(_tokenId),
                        '", "description": "A special voucher to access UNCHAIN analytics report.", "image": "ipfs://bafybeihz2hh3k7x3n6jitybozt35vvin2k7alz5wmsbnjg6nsr4mr5v2gi"}'
                    )
                )
            )
        );

        string memory output = string(abi.encodePacked("data:application/json;base64,", json));
        return output;
    }
}
