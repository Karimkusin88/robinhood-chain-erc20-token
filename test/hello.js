const { expect } = require("chai");

describe("Hello", function () {
  it("Should change message", async function () {
    const Hello = await ethers.getContractFactory("Hello");
    const hello = await Hello.deploy();

    await hello.setMessage("Test");

    expect(await hello.message()).to.equal("Test");
  });
});
