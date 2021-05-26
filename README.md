# BSC Transaction filter

## Prerequiste

1. Get API Key from [BscScan](https://www.bscscan.com/)
1. Put into file `.env` like this

```
BSC_API_KEY={YOUR_KEY}
```

3. Install [Node.js](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/)
4. Install dependencies via command `yarn`

## Usage

```
yarn start --address="0x28579ECA0a326E53340Edd93e18698D379876a04" --methodSignature="earn(address)"
```

This will get all the transaction from address `0x28579ECA0a326E53340Edd93e18698D379876a04` with method signature `earn(address)`

## Possible feature

- [ ] Export transactions to Database
- [ ] Export transactions to file
- [ ] Preset some famous address
