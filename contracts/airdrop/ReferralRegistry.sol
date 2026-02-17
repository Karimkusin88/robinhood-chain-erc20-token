// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ReferralRegistry is Ownable {
    IERC20 public immutable token;

    uint256 public rewardReferrer;
    uint256 public rewardReferee;

    mapping(address => address) public referredBy;     // user => referrer
    mapping(address => uint256) public referralCount;  // referrer => count

    event Registered(address indexed user, address indexed referrer);
    event RewardsPaid(address indexed user, address indexed referrer, uint256 referrerAmt, uint256 refereeAmt);

    constructor(address token_, uint256 referrerAmt_, uint256 refereeAmt_) Ownable(msg.sender) {
        require(token_ != address(0), "token=0");
        token = IERC20(token_);
        rewardReferrer = referrerAmt_;
        rewardReferee = refereeAmt_;
    }

    function setRewards(uint256 referrerAmt, uint256 refereeAmt) external onlyOwner {
        rewardReferrer = referrerAmt;
        rewardReferee = refereeAmt;
    }

    function poolBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function register(address referrer) external {
        require(referrer != address(0), "referrer=0");
        require(referrer != msg.sender, "no self-ref");
        require(referredBy[msg.sender] == address(0), "already registered");

        // simple anti-loop
        require(referredBy[referrer] != msg.sender, "ref loop");

        referredBy[msg.sender] = referrer;
        referralCount[referrer] += 1;

        emit Registered(msg.sender, referrer);

        _payRewards(msg.sender, referrer);
    }

    function _payRewards(address user, address referrer) internal {
        uint256 total = rewardReferrer + rewardReferee;
        if (total == 0) return;

        require(token.balanceOf(address(this)) >= total, "Airdrop empty");

        if (rewardReferrer > 0) {
            require(token.transfer(referrer, rewardReferrer), "ref transfer failed");
        }
        if (rewardReferee > 0) {
            require(token.transfer(user, rewardReferee), "user transfer failed");
        }

        emit RewardsPaid(user, referrer, rewardReferrer, rewardReferee);
    }

    function rescueTokens(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "to=0");
        require(token.transfer(to, amount), "rescue failed");
    }
}
