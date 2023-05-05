# Official BITCOIN STAMPS API

## Table of Contents
- [Official BITCOIN STAMPS API](#official-bitcoin-stamps-api)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [API URL](#api-url)
    - [Sort Order](#sort-order)
  - [Output](#output)
  - [Query Parameters](#query-parameters)
    - [Search for Bitcoin Stamps Owned By Address](#search-for-bitcoin-stamps-owned-by-address)
    - [Search For Single Bitcoin Stamp By Stamp Number](#search-for-single-bitcoin-stamp-by-stamp-number)
    - [Search For Ranges Of Bitcoin Stamps (stamp\_begin / stamp\_end)](#search-for-ranges-of-bitcoin-stamps-stamp_begin--stamp_end)
    - [Search For Multiple Bitcoin Stamps](#search-for-multiple-bitcoin-stamps)
    - [Search For Bitcoin Stamps In A Block](#search-for-bitcoin-stamps-in-a-block)
    - [Search For Bitcoin Stamps By CPID](#search-for-bitcoin-stamps-by-cpid)
    - [Search For Bitcoin Stamps By BTC Transaction Hash](#search-for-bitcoin-stamps-by-btc-transaction-hash)
    - [Search For Bitcoin Stamps By **Creator** (Artist)](#search-for-bitcoin-stamps-by-creator-artist)
  - [Future Functionality To Be Implemented:](#future-functionality-to-be-implemented)
  - [Notes](#notes)
    - [Conributors](#conributors)

## Description
The Bitcoin Stamps API is the complete resource for wallet and application integrations. This will return all Bitcoin Stamp information including direct links to image binary files which may be used in your application. Please contact us if you have any questions or suggestions.

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
  }
  <br>

```
| Variable          | Comments                                                                 |
| :---              | :---                                                                   |
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

### Search for Bitcoin Stamps Owned By Address
This returns all Bitcoin Stamps which are owned by the address provided in the query parameter.

https://stampchain.io/api/stamps?wallet_address=14wD9ShyhwEskG84q6CWMVpnPZw5B8NvLg

```
    {
    "wallet_address": "14wD9ShyhwEskG84q6CWMVpnPZw5B8NvLg"
    }
```

### Search For Single Bitcoin Stamp By Stamp Number

https://stampchain.io/api/stamps?stamp=1609
```
    {
    "stamp": "1609"
    }
```
<br>

### Search For Ranges Of Bitcoin Stamps (stamp_begin / stamp_end)

https://stampchain.io/api/stamps?stamp_begin=1600&stamp_end=1610
```
    {
    "stamp_begin": "1600",
    "stamp_end": "1610"
    }
```
<br>

### Search For Multiple Bitcoin Stamps

https://stampchain.io/api/stamps?stamp=343,454,896
```    
    {
    "stamp": "343,454,896"
    }
```
<br>

### Search For Bitcoin Stamps In A Block

https://stampchain.io/api/stamps?block_index=783417
```
    {
    "block_index": "784620"
    }
```
<br>

### Search For Bitcoin Stamps By CPID
This will return all Bitcoin Stamps based upon their corresponding Counterparty asset ID.

https://stampchain.io/api/stamps?cpid=A2536547015909490700
```
    {
    "cpid": "A2536547015909490700"
    }
```
<br>

### Search For Bitcoin Stamps By BTC Transaction Hash
This will return Bitcoin Stamp by the Bitconi transaction hash.

https://stampchain.io/api/stamps?tx_hash=46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c
```
    {
    "tx_hash": "46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c"
    }
```
<br>


### Search For Bitcoin Stamps By **Creator** (Artist)
The issuer of a Bitcoin Stamp cannot be changed, and is typically used to identify the Artist/Creator wallet. This will return all stamps issued by the wallet address. The `supply` field is a representation of how many holders there may be for this Bitcoin Stamp. We encourage a supply of 1 for each Bitcoin Stamp, but this is ultimately up to the creator. 

https://stampchain.io/api/stamps?creator=1QDyd1Cc877CbdNNNP2Tko37i8FZxDfBx5

```
    {
    "creator": "1QDyd1Cc877CbdNNNP2Tko37i8FZxDfBx5"
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

### Conributors
- [REINAMORA](https://twitter.com/reinamora_137)