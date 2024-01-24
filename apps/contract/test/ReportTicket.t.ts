import { assert } from 'chai';
import { ethers } from 'hardhat';

describe('ReportTicket', () => {
  it('Should return the nft', async () => {
    const Mint = await ethers.getContractFactory('ReportTicket');
    const mintContract = await Mint.deploy();
    await mintContract.deployed();
    console.log('hey1');
    const [owner, addr1] = await ethers.getSigners();
    console.log('hey2');
    // 違うアドレスでNFTをmint
    await mintContract.connect(owner).mintIpfsNFT();
    await mintContract.connect(addr1).mintIpfsNFT();

    // mintしたアドレスによって違うNFTが作成されていることをテスト
    console.log(typeof (await mintContract.tokenURI(0)));
    console.log(
      typeof 'data:application/json;base64,eyJuYW1lIjogIlZvdWNoZXIgLS0gIzogMCIsICJkZXNjcmlwdGlvbiI6ICJBIHNwZWNpYWwgdm91Y2hlciB0byBhY2Nlc3MgVU5DSEFJTiBhbmFseXRpY3MgcmVwb3J0LiIsICJpbWFnZSI6ICJpcGZzOi8vYmFmeWJlaWh6MmhoM2s3eDNuNmppdHlib3p0MzV2dmluMms3YWx6NXdtc2Juamc2bnNyNG1yNXYyZ2kifQ==',
    );
    assert.equal(
      await mintContract.tokenURI(0),
      'data:application/json;base64,eyJuYW1lIjogIlZvdWNoZXIgLS0gIzAiLCAiZGVzY3JpcHRpb24iOiAiQSBzcGVjaWFsIHZvdWNoZXIgdG8gYWNjZXNzIFVOQ0hBSU4gYW5hbHl0aWNzIHJlcG9ydC4iLCAiaW1hZ2UiOiAiaXBmczovL2JhZnliZWloejJoaDNrN3gzbjZqaXR5Ym96dDM1dnZpbjJrN2FsejV3bXNibmpnNm5zcjRtcjV2MmdpIn0=',
    );
    assert.equal(
      await mintContract.tokenURI(1),
      'data:application/json;base64,eyJuYW1lIjogIlZvdWNoZXIgLS0gIzEiLCAiZGVzY3JpcHRpb24iOiAiQSBzcGVjaWFsIHZvdWNoZXIgdG8gYWNjZXNzIFVOQ0hBSU4gYW5hbHl0aWNzIHJlcG9ydC4iLCAiaW1hZ2UiOiAiaXBmczovL2JhZnliZWloejJoaDNrN3gzbjZqaXR5Ym96dDM1dnZpbjJrN2FsejV3bXNibmpnNm5zcjRtcjV2MmdpIn0=',
    );
  });
});
