import hre from 'hardhat';
import { createTestClient, http } from 'viem';
import { hardhat } from 'viem/chains';

const main = async () => {
  const [owner, alice, bob, charlie] = await hre.viem.getWalletClients();
  console.log('owner:', owner.account.address);
  console.log(`alice: ${alice.account.address}`);
  console.log(`bob: ${bob.account.address}`);
  console.log(`charlie: ${charlie.account.address}`);

  console.log(`ownerdeets: ${owner.account}`);

  const client = createTestClient({
    chain: hardhat,
    mode: 'hardhat',
    transport: http(),
  });

  console.log('localNode:', client);
};

const runMain = async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
  }
};

runMain();
