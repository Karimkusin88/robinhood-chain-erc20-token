const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Hello", function () {
  it("Should deploy and return default message", async function () {
    const Hello = await ethers.getContractFactory("Hello");
    const hello = await Hello.deploy();
    await hello.waitForDeployment();

    expect(await hello.getMessage()).to.equal("Hello Robinhood Chain");
  });

  it("Should update message via setMessage()", async function () {
    const Hello = await ethers.getContractFactory("Hello");
    const hello = await Hello.deploy();
    await hello.waitForDeployment();

    await hello.setMessage("gm robinhood");
    expect(await hello.getMessage()).to.equal("gm robinhood");
  });
});
