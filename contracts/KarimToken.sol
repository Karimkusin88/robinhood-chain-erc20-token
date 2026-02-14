// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KarimToken is ERC20, Ownable {
    constructor() ERC20("Karim Token", "KRM") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    // onlyOwner = cuma owner yang boleh mint
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // burn token milik caller (si pemanggil)
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
