// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Hello {
    string public message;

    constructor() {
        message = "Hello Robinhood Chain";
    }

    function setMessage(string memory _msg) public {
        message = _msg;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
