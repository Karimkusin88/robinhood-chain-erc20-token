// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DailyCheckin {

    mapping(address => uint256) public lastCheckin;
    mapping(address => uint256) public streak;
    mapping(address => uint256) public points;

    uint256 public constant DAILY_REWARD = 10;
    uint256 public constant STREAK_BONUS = 50;
    uint256 public constant CLAIM_THRESHOLD = 100;

    event CheckedIn(address indexed user, uint256 newPoints, uint256 newStreak);
    event Claimed(address indexed user, uint256 totalClaimed);

    function checkIn() external {
        require(
            block.timestamp >= lastCheckin[msg.sender] + 1 days,
            "Already checked in today"
        );

        // streak logic
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
        require(points[msg.sender] >= CLAIM_THRESHOLD, "Not enough points");

        uint256 reward = points[msg.sender];
        points[msg.sender] = 0;

        emit Claimed(msg.sender, reward);
    }

    function getUser(address user)
        external
        view
        returns (
            uint256 _points,
            uint256 _streak,
            uint256 _lastCheckin
        )
    {
        return (points[user], streak[user], lastCheckin[user]);
    }
}
