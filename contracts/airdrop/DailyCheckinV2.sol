// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20Like {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address user) external view returns (uint256);
}

contract DailyCheckinV2 {
    mapping(address => uint256) public lastCheckin;
    mapping(address => uint256) public streak;
    mapping(address => uint256) public points;

    uint256 public constant DAILY_REWARD = 10;
    uint256 public constant STREAK_BONUS = 50;

    IERC20Like public rewardToken;
    uint256 public pointsToClaim = 100;
    uint256 public tokenPerClaim = 1000e18;

    address public owner;

    event CheckedIn(address indexed user, uint256 newPoints, uint256 newStreak);
    event Claimed(address indexed user, uint256 pointsSpent, uint256 tokensReceived);
    event ConfigUpdated(uint256 pointsToClaim, uint256 tokenPerClaim);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor(address tokenAddress) {
        rewardToken = IERC20Like(tokenAddress);
        owner = msg.sender;
    }

    // ✅ ini yg lo butuhin biar bisa test cepet
    function setClaimConfig(uint256 _pointsToClaim, uint256 _tokenPerClaim) external onlyOwner {
        pointsToClaim = _pointsToClaim;
        tokenPerClaim = _tokenPerClaim;
        emit ConfigUpdated(_pointsToClaim, _tokenPerClaim);
    }

    function checkIn() external {
        require(block.timestamp >= lastCheckin[msg.sender] + 1 days, "Already checked in today");

        if (block.timestamp <= lastCheckin[msg.sender] + 2 days) {
            streak[msg.sender] += 1;
        } else {
            streak[msg.sender] = 1;
        }

        lastCheckin[msg.sender] = block.timestamp;
        points[msg.sender] += DAILY_REWARD;

        if (streak[msg.sender] >= 7) {
            points[msg.sender] += STREAK_BONUS;
            streak[msg.sender] = 0;
        }

        emit CheckedIn(msg.sender, points[msg.sender], streak[msg.sender]);
    }

    function claim() external {
        require(points[msg.sender] >= pointsToClaim, "Not enough points");
        require(rewardToken.balanceOf(address(this)) >= tokenPerClaim, "Airdrop empty");

        points[msg.sender] -= pointsToClaim;

        bool ok = rewardToken.transfer(msg.sender, tokenPerClaim);
        require(ok, "Transfer failed");

        emit Claimed(msg.sender, pointsToClaim, tokenPerClaim);
    }

    function getUser(address user)
        external
        view
        returns (uint256 _points, uint256 _streak, uint256 _lastCheckin)
    {
        return (points[user], streak[user], lastCheckin[user]);
    }
}
