## EVM dev runtime

## setup

1. Install `foundry`, refer to [foundry](https://github.com/foundry-rs/foundry)
2. Install `nodejs`, refer to [nodejs](https://nodejs.org/en/)
3. Install `yarn`, `npm install --global yarn`

```
yarn install
forge install foundry-rs/forge-std  Rari-Capital/solmate OpenZeppelin/openzeppelin-contracts
```

## testes

test kits are in `./test/`.
differential tests are in `./test/differential/` (off by default).
To turn on, see `./test/differential/README.md`.

```
forge test --gas-report
```

## static analysis

Uses [slither](https://github.com/crytic/slither).

```
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
solc-select install 0.8.19
solc-select use 0.8.19
```

```
yarn slither
```
