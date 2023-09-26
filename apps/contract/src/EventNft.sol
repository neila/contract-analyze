// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "solmate/tokens/ERC1155.sol";
import "openzeppelin/utils/introspection/ERC165.sol";
import "openzeppelin/token/ERC1155/IERC1155.sol";
import "openzeppelin/access/AccessControl.sol";

contract EventNft is ERC165, IERC1155, AccessControl {
    /*//////////////////////////////////////////////////////////////
                            CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor() IERC1155() {
        /* Grants `DEFAULT_ADMIN_ROLE` to the account that deploys the contract. */
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /*//////////////////////////////////////////////////////////////
                          ACCESSCONTROL ROLES
    //////////////////////////////////////////////////////////////*/
    bytes32 public constant SB_ADMIN = keccak256("SB_ADMIN");

    /*//////////////////////////////////////////////////////////////
                            ERC1155 STORAGE
    //////////////////////////////////////////////////////////////*/
    mapping(address => mapping(uint256 => uint256)) public balanceOf;
    mapping(address => mapping(address => bool)) public isApprovedForAll;

    /*//////////////////////////////////////////////////////////////
                              ERC1155 LOGIC
    //////////////////////////////////////////////////////////////*/

    function balanceOfBatch(
        address[] calldata owners,
        uint256[] calldata ids
    ) public view virtual returns (uint256[] memory balances) {
        require(owners.length == ids.length, "LENGTH_MISMATCH");

        balances = new uint256[](owners.length);

        // [gas-efficiency] Unchecked because incrementing the array index counter cannot possibly overflow
        unchecked {
            for (uint256 i = 0; i < owners.length; ++i) {
                balances[i] = balanceOf[owners[i]][ids[i]];
            }
        }
    }

    function setApprovalForAll(address operator, bool approved) public virtual {
        require(msg.sender != operator, "ERC1155: setting approval status for self");
        isApprovedForAll[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    /**
     * Hooks that are called before/after token transfers.
     * This includes minting and burning, as well as batched variants.
     *
     * Calling conditions (for each `id` and `amount` pair):
     *
     * 1. (`from` = 0) -> mint: `amount` tokens of token type `id` will be minted for `to`
     * 2. (`to` = 0) -> burn: `amount` of `from`'s tokens of token type `id` will be burned
     * 3. (`from` != 0, `to` != 0) -> transfer: `amount` of ``from``'s tokens of token type `id` will be transferred to `to`.
     * 4. `from` and `to` cannot both be 0.
     * 5. `ids` and `amounts` have the same, non-0 length.
     *
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual {
        require(msg.sender == from || isApprovedForAll[from][msg.sender], "NOT_AUTHORIZED");
        require(to != address(0), "INVALID_RECIPIEINT");

        require(balanceOf[from][id] >= amount, "INSUFFICIENT_BALANCE");
        balanceOf[from][id] -= amount;
        balanceOf[to][id] += amount;

        emit TransferSingle(msg.sender, from, to, id, amount);

        if (to.code.length != 0) {
            require(
                ERC1155TokenReceiver(to).onERC1155Received(msg.sender, from, id, amount, data) ==
                    ERC1155TokenReceiver.onERC1155Received.selector,
                "UNSAFE_RECIPIENT"
            );
        }
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) public virtual {
        require(msg.sender == from || isApprovedForAll[from][msg.sender], "NOT_AUTHORIZED");
        require(ids.length == amounts.length, "LENGTH_MISMATCH");
        require(to != address(0), "INVALID_RECIPIEINT");

        // [gas-efficiency] Storing these outside the loop saves ~15 gas per iteration.
        uint256 id;
        uint256 amount;

        for (uint256 i = 0; i < ids.length; ) {
            id = ids[i];
            amount = amounts[i];

            require(balanceOf[from][id] >= amount, "INSUFFICIENT_BALANCE");
            balanceOf[from][id] -= amount;
            balanceOf[to][id] += amount;

            // An array can't have a total length
            // larger than the max uint256 value.
            unchecked {
                ++i;
            }
        }

        emit TransferBatch(msg.sender, from, to, ids, amounts);

        if (to.code.length != 0) {
            require(
                ERC1155TokenReceiver(to).onERC1155BatchReceived(msg.sender, from, ids, amounts, data) ==
                    ERC1155TokenReceiver.onERC1155BatchReceived.selector,
                "UNSAFE_RECIPIENT"
            );
        }
    }

    /*//////////////////////////////////////////////////////////////
                ERC165 Standard Interface Detection
    //////////////////////////////////////////////////////////////*/
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC165, IERC165, AccessControl) returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IAccessControl).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
