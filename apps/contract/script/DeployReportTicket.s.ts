import { ethers } from 'hardhat';

const main = async () => {
  // コントラクトがコンパイルします コントラクトを扱うために必要なファイルが `artifacts` ディレクトリの直下に生成されます。
  const nftContractFactory = await ethers.getContractFactory('ReportTicket');

  // Hardhat がローカルの Ethereum ネットワークを作成します。
  const nftContract = await nftContractFactory.deploy();

  // コントラクトが Mint され、ローカルのブロックチェーンにデプロイされるまで待ちます。
  await nftContract.deployed();
  console.log('Contract deployed to:', nftContract.address);

  // mintIpfsNFT 関数を呼び出す。NFT が Mint される。
  let txn = await nftContract.mintIpfsNFT();

  // Minting が仮想マイナーにより、承認されるのを待ちます。
  await txn.wait();
  console.log('Minted NFT #1');

  // mintIpfsNFT 関数をもう一度呼び出します。NFT がまた Mint されます。
  txn = await nftContract.mintIpfsNFT();

  // Minting が仮想マイナーにより、承認されるのを待ちます。
  await txn.wait();
  console.log('Minted NFT #2');
};
// エラー処理を行っています。
const runMain = async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
  }
};

runMain();
