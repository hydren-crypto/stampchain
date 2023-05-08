
# Official BITCOIN STAMPS SRC-20  API

This documentation is specifically for SRC-20 tokens build on Bitcoin Stamps. This API will return all valid SRC-20 transactions. It does not however tabulate or validate the order of transactions. For example, an initial deploy transaction which happens after a mint. The mint transaction is not excluded from the data even though it would not be counted towards the creators balance since the token was not deployed. This needs to be properly handled by anyone using this data. 

## SRC-20 API Endpoint

```https://stampchain.io/api/src20```
<br>


## Example SRC-20 API Response

```
[
    {
        "op":"deploy",
        "block_index":788127,
        "creator":"17NhsWKQXfPU1FLZdyD2oAsgs1Lp2LhKUg",
        "tx_index":2335985,
        "tick":"STAMP",
        "max":"15000000",
        "lim":"1500",
        "tx_hash":"5ba462d825471af0c17a1ecb17a0f55ea6652a691cecf0de4090ae3c5413a663",
        "p":"src-20"
    }
    {
        "op":"mint",
        "block_index":788238,
        "creator":"bc1qlw76hgx2w0h9hrcuxvfhyr8j4alrycc0a9pd3v",
        "amt":"100",
        "tx_index":2336487,
        "tick":"STAMP",
        "tx_hash":"094bdd66b98245ee7760eb3958fc28e585c72a193d76d97c5ba3cf65a1527446",
        "p":"src-20"
    }

]
```


## API Parameter Definitions

| Variable      | Comments                                                     |
| :------------ | :----------------------------------------------------------- |
| `p`           | The protocol ( "src-20") 
| `op`          | The operation `[ "deploy", "mint" ]`                        |
| `block_index` | The BTC Block index for the transaction                      |
| `creator`     | The creator (owner) of the transaction                       |
| `tx_index`    | The transaction index                                        |
| `tick`        | The token ticker symbol                                      |
| `max`         | The maximum supply of tokens (only for `deploy` operation)  |
| `lim`         | The limit (only for `deploy` operation)                     |
| `tx_hash`     | The transaction hash                                         |                       |
| `amt`         | The amount of tokens to `mint` (only for `mint` and `transfer` operation)  |


<br>

## SRC-20 API Query Parameters

Currently no search query parameters are supported. 

## Service Details


Feedback is welcome, and contact us directly for other bulk minting options. 

### Conributors
- [REINAMORA](https://twitter.com/reinamora_137)