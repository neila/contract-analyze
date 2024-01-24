import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Event NFTs', async function () {
  async function deployProject() {
    const [owner, alice, bob, charlie] = await ethers.getSigners();

    const EventNftFactory = await ethers.getContractFactory('EventNft');
    const EventNftContract = await EventNftFactory.deploy();

    return { EventNftContract, owner, alice, bob, charlie };
  }

  describe('check 1', function () {
    it('', async function () {
      const { EventNftContract } = await loadFixture(deployProject);
    });
  });
});
