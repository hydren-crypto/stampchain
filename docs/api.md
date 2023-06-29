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
    - [Search For All Bitcoin Stamps In A BTC Block](#search-for-all-bitcoin-stamps-in-a-btc-block)
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

`https://stampchain.io/api/stamps`

This query will only return 1000 stamps at a time by default. Pagination is available by passing the page and page_size parameters.

`https://stampchain.io/api/stamps?page=1&page_size=1000`

`https://stampchain.io/api/stamps?page=2&page_size=1000`

### Sort Order

May be specified by passing the sort_order parameter.  The default sort order is by `stamp` ascending.

```
sort_order=asc or desc
```

## Output

```JSON
[
   {
      "stamp": "18529",
      "block_index": "788090",
      "cpid": "A13083972509419815665",
      "creator": "14Vr7RYAQeLkjU9okNQKfSre7s5V224Utt",
      "message_index": "9435060",
      "stamp_mimetype": "image/png",
      "stamp_url": "https://stampchain.io/stamps/727e67566499d7bbc61b8f4760251bf394fa3521469c1e37a839862226087279.png",
      "timestamp": "1683119421",
      "tx_hash": "727e67566499d7bbc61b8f4760251bf394fa3521469c1e37a839862226087279",
      "tx_index": "2335819",
      "supply": "100",
      "locked": true,
      "divisible": false,
      "keyburn": true,
      "artist_name": "Yotet"
   }
]
  <br>

```
| Variable          | Comments                                                                 |
| :---              | :---                                                                   |
| `stamp`           | The Bitcoin Stamp index number                                           |
| `block_index`     | The BTC block index of the Bitcoin Stamp was minted                       |
| `cpid`            | The Counterparty ID of the Bitcoin Stamp                                 |
| `creator`         | The creator of the Bitcoin Stamp (*aka artist*)       |
| `artist_name`     | The name of the artist of the Bitcoin Stamp *based on the `creator` address*    |
| `message_index`   | The message index of the Bitcoin Stamp                            |
| `stamp_base64`    | The base64 encoded Bitcoin Stamp                                           |
| `stamp_mimetype`  | The mimetype of the Bitcoin Stamp                                                |
| `stamp_url`       | The URL of the binary image data for the Bitcoin Stamp                                                     |
| `timestamp`       | The timestamp of the block the message was included in                   |
| `tx_hash`         | The BTC transaction hash of the Bitcoin Stamp                    |
| `tx_index`        | The BTC transaction index of the Bitcoin Stamp                   |
| `supply`          | The supply of the corresponding Bitcoin Stamp Counterparty asset (we encourage 1)     |
| `locked`          | Whether the corresponding Bitcoin Stamp asset is locked (we encourage True) |
| `divisible`       | Whether the Bitcoin Stamp is divisible (we encourage false)                      |
| `keyburn`         | Whether the Bitcoin Stamp is a keyburn (immortal / undestroyable)                   |

---

<br>

## Query Parameters

### Search for Bitcoin Stamps Owned By `wallet_address`

This returns all Bitcoin Stamps which are owned by the address provided in the query parameter.

https://stampchain.io/api/stamps?wallet_address=14wD9ShyhwEskG84q6CWMVpnPZw5B8NvLg

Results:
```JSON
[
  {
    "stamp": 7408,
    "block_index": 784032,
    "cpid": "A11292334810881815000",
    "creator": "14wD9ShyhwEskG84q6CWMVpnPZw5B8NvLg",
    "divisible": 0,
    "keyburn": 0,
    "locked": 0,
    "message_index": 9244388,
    "stamp_base64": "R0lGODlhGAAYAHcAACH/C05FV...3ExL/P0Lnx/wGcO9H",
    "stamp_mimetype": "image/gif",
    "stamp_url": "https://stampchain.io/stamps/e9feb49b9b26d4e2010c060042cd5365bfa638a1b5795f17d36d10ed4e5452fa.gif",
    "supply": 1,
    "timestamp": "0000-00-00 00:00:00",
    "tx_hash": "e9feb49b9b26d4e2010c060042cd5365bfa638a1b5795f17d36d10ed4e5452fa",
    "tx_index": 2288326
  },
  {
    "stamp": 7409,
    "block_index": 784032,
    "cpid": "A12549639752817414000",
    "creator": "14wD9ShyhwEskG84q6CWMVpnPZw5B8NvLg",
    "divisible": 0,
    "keyburn": 0,
    "locked": 0,
    "message_index": 9244391,
    "stamp_base64": "R0lGODlhGAAYAHcAACH/C...WgEQ4xEcJQEOpOtIQigVQ",
    "stamp_mimetype": "image/gif",
    "stamp_url": "https://stampchain.io/stamps/853115d1391b9430c1e60d7e89cfd7e394a76a15b8cd7e3260873d60c07d260a.gif",
    "supply": 1,
    "timestamp": "0000-00-00 00:00:00",
    "tx_hash": "853115d1391b9430c1e60d7e89cfd7e394a76a15b8cd7e3260873d60c07d260a",
    "tx_index": 2288327
  }
]
```

### `count`

https://stampchain.io/api/stamps?count

Results

```JSON
{"count": 67911, "block_index": 795999}
```

### `stamp`

https://stampchain.io/api/stamps?stamp=7409

Results

```
  {
    "stamp": 7409,
    "block_index": 784032,
    "cpid": "A12549639752817414000",
    "creator": "14wD9ShyhwEskG84q6CWMVpnPZw5B8NvLg",
    "divisible": 0,
    "keyburn": 0,
    "locked": 0,
    "message_index": 9244391,
    "stamp_base64": "R0lGODlhGAAYAHcAACH/C...WgEQ4xEcJQEOpOtIQigVQ",
    "stamp_mimetype": "image/gif",
    "stamp_url": "https://stampchain.io/stamps/853115d1391b9430c1e60d7e89cfd7e394a76a15b8cd7e3260873d60c07d260a.gif",
    "supply": 1,
    "timestamp": "0000-00-00 00:00:00",
    "tx_hash": "853115d1391b9430c1e60d7e89cfd7e394a76a15b8cd7e3260873d60c07d260a",
    "tx_index": 2288327
  }
```
<br>

### `stamp_begin` range `stamp_end`

https://stampchain.io/api/stamps?stamp_begin=1600&stamp_end=1610

<br>

### `stamp` multiple

https://stampchain.io/api/stamps?stamp=343,454,896

<br>

### `block`

https://stampchain.io/api/stamps?block_index=783417
```
    {
    "block_index": "784620"
    }
```
<br>

### `cpid`
This will return all Bitcoin Stamps based upon their corresponding Counterparty asset ID.

https://stampchain.io/api/stamps?cpid=A2536547015909490700

<br>

### `tx_hash`
This will return Bitcoin Stamp by the Bitconi transaction hash.

https://stampchain.io/api/stamps?tx_hash=46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c

<br>


### `creator` - artist
The issuer of a Bitcoin Stamp cannot be changed, and is typically used to identify the Artist/Creator wallet. This will return all stamps issued by the wallet address. The `supply` field is a representation of how many holders there may be for this Bitcoin Stamp. We encourage a supply of 1 for each Bitcoin Stamp, but this is ultimately up to the creator. 

https://stampchain.io/api/stamps?creator=1QDyd1Cc877CbdNNNP2Tko37i8FZxDfBx5


<br>

## Future Functionality To Be Implemented:


- ~~Search for Bitcoin Stamps by wallet owners BTC address~~
- ~~Search for Bitcoin Stamps by Creator (Artist) BTC address~~
- ~~Include base64 data in response~~
- ~~Search for Bitcoin Stamps that have participated in the key burn:~~
  - https://github.com/mikeinspace/stamps/blob/main/Key-Burn.md
  - filter upon unpsent outputs and spent outputs
  
<br>

## Notes
- Feel free to integrate it into your own projects with care. Access may be limited as we see fit.

### Conributors
- [REINAMORA](https://twitter.com/reinamora_137)