# Official BITCOIN STAMPS API

## Table of Contents
- [Official BITCOIN STAMPS API](#official-bitcoin-stamps-api)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [API URL](#api-url)
  - [Output](#output)
  - [Query Parameters](#query-parameters)
    - [Search For Single Stamp By Id](#search-for-single-stamp-by-id)
    - [Search For Ranges Of Stamps (Stamp\_Being And Stamp\_End)](#search-for-ranges-of-stamps-stamp_being-and-stamp_end)
    - [Search For Multiple Stamps](#search-for-multiple-stamps)
    - [Search For Stamps In A Block](#search-for-stamps-in-a-block)
    - [Search For Stamps By Counterparty Asset (Only Numeric Assets Are Supported By Bitcoin Stamps)](#search-for-stamps-by-counterparty-asset-only-numeric-assets-are-supported-by-bitcoin-stamps)
    - [Search For Stamps By BTC Transaction Id](#search-for-stamps-by-btc-transaction-id)
    - [Parameter Definitions to Pass to the API](#parameter-definitions-to-pass-to-the-api)
    - [Conributors](#conributors)

## Description
This gateway is in dev mode and is subject to change as new features are added. **All stamps up to the current block may not be present as we work on integrating multiple data sources.** Please contact us if you have any questions or suggestions.

## API URL

Current API URL - this will return all stamps:

https://stampchain.io/api/stamps

## Output

```JSON
    {
        "message_index": 9233094,
        "block_index": 783923,
        "timestamp": 1680624258,
        "tx_hash": "947e2415326b4b9d43332022b601fdfa4ceda25df9d71d0df8c380a048b13893",
        "asset": "A15809424410153628000",
        "tx_index": 2285399,
        "stamp_mimetype": "",
        "stamp_url": "https://stampchain.io/stamps/947e2415326b4b9d43332022b601fdfa4ceda25df9d71d0df8c380a048b13893.png",
        "stamp": 5869,
        "supply": 1,
        "locked": true,
        "divisible": false,
        "issuer": "1QDyd1Cc877CbdNNNP2Tko37i8FZxDfBx5",
        "owner": "1QDyd1Cc877CbdNNNP2Tko37i8FZxDfBx5"
    },
```
| Variable                          | Comments                                                               |
| :---                              | :---    
| `message_index`                      | The index of the message in the block |
| `block_index`                        | The index of the block the message was included in |
| `timestamp`                          | The timestamp of the block the message was included in |
| `tx_hash`                            | The hash of the transaction that included the message |
| `asset`                              | The asset id of the Bitcoin Stamp |
| `tx_index`                           | The index of the transaction that included the message |
| `stamp_mimetype`                     | The mimetype of the stamp **[pending implementation]**|
| `stamp_url`                          | The URL of the stamp |
| `stamp`                             | The Bitcoin Stamp number |
| `supply`                            | The supply of the corresponding Bitcoin Stamp asset (we encourage 1)|
| `locked`                            | Whether the corresponding Bitcoin Stamp asset is locked (we encourage True) |
| `divisible`                          | Whether the stamp is divisible (we encourage false)|
| `issuer`                             | The issuer / Artist of the Bitcoin Stamp ***(Immutable Value)***|
| `owner`                              | The owner of the Bitcoin Stamp ***(transferrable)*** |



---

<br>

## Query Parameters




### Search For Single Stamp By Id

https://stampchain.io/api/stamps?stamp=1609
```
    {
    "stamp": "1609"
    }
```
<br>

### Search For Ranges Of Stamps (Stamp_Being And Stamp_End)

https://stampchain.io/api/stamps?stamp_begin=1600&stamp_end=1610
```
    {
    "stamp_begin": "1600",
    "stamp_end": "1610"
    }
```
<br>

### Search For Multiple Stamps

https://stampchain.io/api/stamps?stamp=343,454,896
```    
    {
    "stamp": "343,454,896"
    }
```
### Search For Stamps In A Block

https://stampchain.io/api/stamps?block_index=783417
```
    {
    "block_index": "784620"
    }
```
<br>

### Search For Stamps By Counterparty Asset (Only Numeric Assets Are Supported By Bitcoin Stamps)
This will return all stamps based upon their corresponding Counterparty asset id.

https://stampchain.io/api/stamps?asset=A2536547015909490700
```
    {
    "asset": "A2536547015909490700"
    }
```
<br>

### Search For Stamps By BTC Transaction Id
This will return all stamps included in the transaction.

https://stampchain.io/api/stamps?tx_hash=46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c
```
    {
    "tx_hash": "46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c"
    }
```
<br>

```
### Search For Stamps By STAMP Issuer (Artist)
The issuer of a stamp cannot be changed, and is typically used to identify the Artist/Creator wallet. This will return all stamps issued by the wallet address. Each particular stamp may have additional holders represented represented by the `supply` field. **See Note Below** 

https://stampchain.io/api/stamps?issuer=1QDyd1Cc877CbdNNNP2Tko37i8FZxDfBx5
```
    {
    "issuer": "1QDyd1Cc877CbdNNNP2Tko37i8FZxDfBx5"
    }
```

## Future Functionality To Be Implemented:

- official stampchain.io URL (pending SSL certificate)
- Search for stamps by wallet owners BTC address
- include base64 data in response
- search for stamps that have participated in the key burn: 
  - https://github.com/mikeinspace/stamps/blob/main/Key-Burn.md
  - filter upon unpsent outputs and spent outputs
  
<br>

## Notes
- There are no CORS restrictions on this API, feel free to integrate it into your own projects with care. Access may be limited as we see fit.
- The owner and issuer fields are a 1 to 1 relationship to the original stamp transaction. The `supply` represends additional assets issued to that original stamp transaction. These assets are effectively represent a fractional ownership of the parent stamp. This is why we recommend using a 1 of 1 issuance when minting a stamp.

<br><br>
# Official BITCOIN STAMPS Minting Service API

We welcome integrations into our minting service. This allows you to process Stamp mints directly from your application. 


The requests from the web application are sent to the server via a POST request. The server then responds with a JSON object containing the minting fees, and with the action of mint it will return the BTC address to send funds for minting.

```JS
    const apiEndpoint = "https://<<provided on request>>/dev/submit";
    const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            file_content: base64String,
            target_address: bitcoinAddress,
            file_name: fileName,
            collection_name: collectionName,
            creator_name: creatorName,
            asset_lock: assetLock,
            asset_issuance: assetIssuance ?? 1,
            action: check,
            source: MintingServiceName
        })
    }
```

### Parameter Definitions to Pass to the API

| Variable                          | Comments                                                               |
| :---                              | :---                                                                   |
| `file_content`                      | The image `base64` string. Checking of image type (png,gif,etc) must be done on the front end |
| `target_address`                    | The `bitcoin address` for the stamp owner, artist, and issuer `NO TAPROOT ADDRESSES`. **Validation must be done on the front end** |
| `asset_lock`                        | Lock the asset to prevent further issuance. We encourage `True` |
| `asset_issuance`                    | The qty of the asset to issue. We encourage and default to `1` |
| `action`                            | `<check>` or `<mint>` Check will return the fee rates without minting. Mint will return all the content in check, plus the address to send BTC funds for mint |
| `file_name`                         | The name of the file, simply for reference `<optional>` |
| `collection_name`                   | Collection name `<optional>` |
| `creator_name`                      | Creator / Artist name `<optional>` |
| `source`                            | The name of the minting service `<optional>` |

Minting is processed on the next block after payment receipt, and asset sends are processed on the next block after minting. Multiple file processing needs to be handled on the front end application. Currently the minting API can handle approximately 75 unconfirmed mints at one time, and will grow according to capacity. 

Feedback is welcome, and contact us directly for other bulk minting options. 

### Conributors
- [REINAMORA](https://twitter.com/reinamora_137)