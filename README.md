# Reverse records


## How to setup

```
git clone https://github.com/Fantom-Domains/reverse-records
cd reverse-records
cp env.example .env // Add your mnemonic, infura project id, and etherscan key
yarn
```

## CLI

```
yarn query:fantom 0x123...,0x234...
```

## Smart contract API

### getNames([address])

Returns an array of string. If the given address does not have a reverse record or forward record setup, it returns an empty string.

## Usage note

Make sure to compare that the returned names match with the normalised names to prevent from [homograph attack](https://en.wikipedia.org/wiki/IDN_homograph_attack)

Example

```js
const namehash = require('eth-ens-namehash');
const allnames = await ReverseRecords.getNames(['0x123','0x124'])
const validNames = allnames.filter((n) => namehash.normalize(n) === n )
```


## Deployed contract address

- Mainnet: [0x613c3a985ed730c261cc4643ea1774b5c58e364e](https://ftmscan.com/address/0x613c3a985ed730c261cc4643ea1774b5c58e364e)




