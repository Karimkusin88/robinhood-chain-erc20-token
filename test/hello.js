const { expect } = require("chai");

describe("Hello", function () {
  it("Should deploy and return message", async function () {
    const Hello = await ethers.getContractFactory("Hello");
    const hello = await Hello.deploy();

    expect(await hello.message()).to.equal("Hello Robinhood Chain");
  });
});

