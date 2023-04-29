# Official BITCOIN STAMPS API

## Table of Contents
- [Official BITCOIN STAMPS API](#official-bitcoin-stamps-api)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [API URL](#api-url)
    - [Sort Order](#sort-order)
  - [Output](#output)
  - [Query Parameters](#query-parameters)
    - [Search for Stamps Owned By Address](#search-for-stamps-owned-by-address)
    - [Search For Single Stamp By Stamp Number](#search-for-single-stamp-by-stamp-number)
    - [Search For Ranges Of Stamps (stamp\_begin / stamp\_end)](#search-for-ranges-of-stamps-stamp_begin--stamp_end)
    - [Search For Multiple Stamps](#search-for-multiple-stamps)
    - [Search For Stamps In A Block](#search-for-stamps-in-a-block)
    - [Search For Stamps By CPID](#search-for-stamps-by-cpid)
    - [Search For Stamps By BTC Transaction Id](#search-for-stamps-by-btc-transaction-id)
    - [Search For Stamps By **Creator** (Artist)](#search-for-stamps-by-creator-artist)
  - [Future Functionality To Be Implemented:](#future-functionality-to-be-implemented)
  - [Notes](#notes)
- [Official BITCOIN STAMPS Minting Service API](#official-bitcoin-stamps-minting-service-api)
    - [Parameter Definitions to Pass to the API](#parameter-definitions-to-pass-to-the-api)
    - [Conributors](#conributors)

## Description
This gateway is in dev mode and is subject to change as new features are added. **All stamps up to the current block may not be present as we work on integrating multiple data sources.** Please contact us if you have any questions or suggestions.

## API URL

Current API URL 

https://stampchain.io/api/stamps

This query will only return 1000 stamps at a time by default. Pagination is available by passing the page and page_size parameters.

https://stampchain.io/api/stamps?page=1&page_size=1000

https://stampchain.io/api/stamps?page=2&page_size=1000

### Sort Order

May be specified by passing the sort_order parameter.  The default sort order is by `stamp` ascending.

```
sort_order=asc or desc
```

## Output

```JSON
{
    "stamp": 111,
    "block_index": 781927,
    "cpid": "A3350277194614503217",
    "creator": "1GPfBjHemZayEHkPFuMTQsPUPDSdv86oHf",
    "message_index": 9167380,
    "stamp_base64": "iVBORw0KGgoAAAA\...guAt0enhcvAAAAAElFTkSuQmCC",
    "stamp_mimetype": "image/png",
    "stamp_url": "https://stampchain.io/stamps/2ea4efe57832f4c593212d8aebb6ade1777886165df459e02ffe78ff84280585.png",
    "timestamp": 1679468917,
    "tx_hash": "2ea4efe57832f4c593212d8aebb6ade1777886165df459e02ffe78ff84280585",
    "tx_index": 2271179,
    "supply": 1,
    "locked": true,
    "divisible": false,
    "holders": [
        {
            "address": "1LS6mBq1QabgnQYQdB7pQMP7S7o1tq7rP9",
            "address_quantity": 1,
            "escrow": null
        }
    ]
  }
```
| Variable          | Comments                                                                 |
|-------------------|-------------------------------------------------------------------------|
| `stamp`           | The Bitcoin Stamp number                                                 |
| `block_index`     | The index of the block the message was included in                       |
| `cpid`            | The Counterparty ID of the Bitcoin Stamp                                 |
| `creator`         | The issuer / Artist of the Bitcoin Stamp        |
| `message_index`   | The index of the message in the block                                    |
| `stamp_base64`    | The base64 encoded stamp image                                           |
| `stamp_mimetype`  | The mimetype of the stamp                                                |
| `stamp_url`       | The URL of the stamp                                                     |
| `timestamp`       | The timestamp of the block the message was included in                   |
| `tx_hash`         | The hash of the transaction that included the message                    |
| `tx_index`        | The index of the transaction that included the message                   |
| `supply`          | The supply of the corresponding Bitcoin Stamp asset (we encourage 1)     |
| `locked`          | Whether the corresponding Bitcoin Stamp asset is locked (we encourage True) |
| `divisible`       | Whether the stamp is divisible (we encourage false)                      |


---

<br>

## Query Parameters

### Search for Stamps Owned By Address
This returns all stamps which are owned by the address provided in the query parameter.

https://stampchain.io/api/stamps?wallet_address=14wD9ShyhwEskG84q6CWMVpnPZw5B8NvLg

```
    {
    "wallet_address": "14wD9ShyhwEskG84q6CWMVpnPZw5B8NvLg"
    }
```

### Search For Single Stamp By Stamp Number

https://stampchain.io/api/stamps?stamp=1609
```
    {
    "stamp": "1609"
    }
```
<br>

### Search For Ranges Of Stamps (stamp_begin / stamp_end)

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
<br>

### Search For Stamps In A Block

https://stampchain.io/api/stamps?block_index=783417
```
    {
    "block_index": "784620"
    }
```
<br>

### Search For Stamps By CPID
This will return all stamps based upon their corresponding Counterparty asset id.

https://stampchain.io/api/stamps?cpid=A2536547015909490700
```
    {
    "cpid": "A2536547015909490700"
    }
```
<br>

### Search For Stamps By BTC Transaction Id
This will return stamp by the transaction.

https://stampchain.io/api/stamps?tx_hash=46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c
```
    {
    "tx_hash": "46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c"
    }
```
<br>


### Search For Stamps By **Creator** (Artist)
The issuer of a Bitcoin Stamp cannot be changed, and is typically used to identify the Artist/Creator wallet. This will return all stamps issued by the wallet address. Each particular stamp may have additional holders represented represented by the `supply` field. **See Note Below** 

https://stampchain.io/api/stamps?creator=1QDyd1Cc877CbdNNNP2Tko37i8FZxDfBx5

```
    {
    "issuer": "1QDyd1Cc877CbdNNNP2Tko37i8FZxDfBx5"
    }
```
<br>

## Future Functionality To Be Implemented:


- ~~Search for Bitcoin Stamps by wallet owners BTC address~~
- ~~Search for Bitcoin Stamps by Creator (Artist) BTC address~~
- ~~Include base64 data in response~~
- Search for Bitcoin Stamps that have participated in the key burn: 
  - https://github.com/mikeinspace/stamps/blob/main/Key-Burn.md
  - filter upon unpsent outputs and spent outputs
  
<br>

## Notes
- There are no CORS restrictions on this API, feel free to integrate it into your own projects with care. Access may be limited as we see fit.


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