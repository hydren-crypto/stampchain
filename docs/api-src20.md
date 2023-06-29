
# BITCOIN STAMPS SRC-20 API PROVIDED BY STAMPCHAIN.IO

This documentation is specifically for SRC-20 tokens built on Bitcoin Stamps. 

This API will return all valid SRC-20 transactions. It does not however tabulate or validate the order of transactions. 

For example: *an initial deploy transaction which happens after a mint. The mint transaction is not excluded from the data even though it would not be counted towards the creators balance since the token was not deployed.* 

This data to be properly handled by anyone using it to tabulate balances. This data is only validated for a proper SRC-20 transaction which includes keyburn, valid-json string, valid ticker lenght and valid ticker characters. It may be invalid for other reasones and there may be SRC-20 transactions in this data that would not conform to SRC-20 specifications to apply towards users balance. For example, a user may attempt to transfer more than their balance held. This is an invalid transaction and does not impact either the sender or receivers balance. 

## SRC-20 API Endpoint

https://stampchain.io/api/src20
<br>


## Example SRC-20 API Response

```

  {
    "op": "MINT",
    "block_index": 788041,
    "creator": "1bepcxzz7rrcpaqudvbp2jvkjcarvhmgkz",
    "amt": "420000",
    "tx_index": 2335647,
    "tick": "KEVIN",
    "tx_hash": "fbea0e800473731b1f31e5f55000f3d5d5c1edf5fbdcb80ca31a9835103e246c",
    "stamp": 18527,
    "p": "SRC-20"
  },
  {
    "max": "690000000",
    "op": "DEPLOY",
    "block_index": 788041,
    "creator": "1bepcxzz7rrcpaqudvbp2jvkjcarvhmgkz",
    "tx_index": 2335648,
    "tick": "KEVIN",
    "lim": "420000",
    "tx_hash": "23765f9bc6b87e078b1f93ed213f90b9004998336575f726e46f34ddbea5e5f3",
    "stamp": 18528,
    "p": "SRC-20"
  },
]
```


## API Parameter Definitions

| Variable      | Comments                                                     |
| :------------ | :----------------------------------------------------------- |
| `stamp`       | The Bitcoin Stamp index number                               |
| `p`           | The protocol ( "src-20")                                     |
| `op`          | The operation `[ "deploy", "mint" ]`                        |
| `block_index` | The BTC Block index for the transaction                      |
| `creator`     | The creator (owner) of the transaction                       |
| `tx_index`    | The transaction index                                        |
| `tick`        | The token ticker symbol                                      |
| `max`         | The maximum supply of tokens (only for `deploy` operation)  |
| `lim`         | The limit (only for `deploy` operation)                     |
| `tx_hash`     | The transaction hash                                         |                       |
| `amt`         | The amount of tokens to `mint` (only for `mint` and `transfer` operation)  |
| `stamp_url`   | The URL to the Bitcoin Stamp                                 |


<br>

# SRC-20 API Query Parameters



## `tick`

This will show all deploy, mint, and transfer transactions for the given token ticker symbol. 

https://stampchain.io/api/src20?tick=KEVIN

<br>

##  `creator`

The creator is the minter or deployer of the token, or the owner/source of the transfer. This will show all transactions for the given creator addrss.

https://stampchain.io/api/src20?creator=bc1qw89wvqua5pxlh7ev7kcxhd8s55gyh7h436ju55

<br>

## `tx_hash`

The transaction hash of the specific SRC-20 Bitcoin transaction

https://stampchain.io/api/src20?tx_hash=23765f9bc6b87e078b1f93ed213f90b9004998336575f726e46f34ddbea5e5f3

<br>

##  `count`

This returns the total number of valid SRC-20 those. Those not meeting the transaction specifications are excluded.

https://stampchain.io/api/src20?count

<br>

## `page_size` and `page`

Pagination is used for this API to query all records. Default `page_size` is 1000. Records returned may be validated against the `count` query.

https://stampchain.io/api/src20?page_size=1000&page=1

<br>

## `block_index`

This returns all valid SRC-20 transactions for a given BTC block index.

https://stampchain.io/api/src20?block_index=788041

<br>

## Service Details


Feedback is welcome, and contact us directly for other bulk minting options. 

### Conributors
- [REINAMORA](https://twitter.com/reinamora_137)