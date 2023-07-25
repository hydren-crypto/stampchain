# Stampchain.io Bitcoin Stamps API

## Table of Contents

- [Description](#description)
- [API URL](#api-url)
- [Query Results](#query-results)
- [Query Parameters](#query-parameters)
  - [`block_index`](#block_index)
  - [`count`](#count)
  - [`creator`](#creator---artist)
  - [`cpid`](#cpid)
  - [`holders`](#holders)
  - [`ident`](#ident-identity)
  - [`page`](#page)
  - [`page_size`](#page_size)
  - [`sort_order`](#sort_order)
  - [`stamp` single](#stamp-single)
  - [`stamp` multiple not in sequence](#stamp-multiple-not-in-sequence)
  - [`stamp_begin` range `stamp_end`](#stamp_begin-range-stamp_end)
  - [`tx_hash`](#tx_hash)
  - [`wallet_address`](#wallet_address)
- [Future Functionality To Be Implemented](#future-functionality-to-be-implemented)
- [Notes](#notes)
- [Conributors](#conributors)
<br> <br>

# Description
The Bitcoin Stamps API is the complete resource for wallet and application integrations. This will return all Bitcoin Stamp information including direct links to image binary files which may be used in your application. Please contact us if you have any questions or suggestions.
<br> <br>

# API URL

`https://stampchain.io/api/stamps`

<br> <br>

# Query Results

| Variable          | Comments                                                                 |
| :---              | :---                                                                   |
| `stamp`           | The Bitcoin Stamp index number                                           |
| `block_index`     | The BTC block index of the Bitcoin Stamp was minted                       |
| `cpid`            | The Counterparty ID of the Bitcoin Stamp                                 |
| `creator`         | The creator of the Bitcoin Stamp (*aka artist*)       |
| `creator_name`     | The name of the artist of the Bitcoin Stamp *based on the `creator` address*    |
| `divisible`       | Whether the Bitcoin Stamp is divisible (we encourage false when creating)                |
| `ident`           | Identity of the transaction [ 'SRC-20', 'SRC-721', 'STAMP' ]                       |
| `keyburn`         | Whether the Bitcoin Stamp is a keyburn (immortal / undestroyable)                   |
| `locked`          | Whether the corresponding Bitcoin Stamp asset is locked (we encourage True) |
| `stamp_url`       | The URL of the binary image data for the Bitcoin Stamp                                                     |
| `supply`          | The supply of the corresponding Bitcoin Stamp Counterparty asset (we encourage 1)     |
| `tx_hash`         | The BTC transaction hash of the Bitcoin Stamp                    |
---
<br>

# Output

```JSON
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": [
    {
      "stamp": 0,
      "block_index": 779652,
      "cpid": "A7337447728884561000",
      "creator": "1GotRejB6XsGgMsM79TvcypeanDJRJbMtg",
      "creator_name": "Mike in Space",
      "divisible": 0,
      "ident": "STAMP",
      "keyburn": 0,
      "locked": 1,
      "stamp_url": "https://stampchain.io/stamps/17686488353b65b128d19031240478ba50f1387d0ea7e5f188ea7fda78ea06f4.png",
      "supply": 1,
      "tx_hash": "17686488353b65b128d19031240478ba50f1387d0ea7e5f188ea7fda78ea06f4"
    }
  ],
  "page_count": 1000, // total number of items returned on page (based on page_size)
  "total_count": 73462  // total number of items which match this query (see pagination)
}
  <br>

```


<br> <br>

# Query Parameters

| Parameter         | Description                                                                 | 
| :---              | :---                                                                        |
| [`block_index`](#block_index)           | Search for all Bitcoin Stamps in a BTC block                                  |
| [`count`](#count)          | Returns the total number of Bitcoin Stamps and last block indexed |
| [`cpid`](#cpid)            | Search for Bitcoin Stamps by CPID (Counterparty ID)                           |
| [`creator`](#creator)         | Search for Bitcoin Stamps by creator (artist) BTC address                         |
| [`holders`](#holders)        | Search for Bitcoin Stamp holders (owners) by cpid                        |
| [`ident`](#ident)          | Search for Bitcoin Stamps by type (STAMP, SRC-20, SRC-721) |
| [`page`](#page)            | The page number of the results (default 1)                                   |
| [`page_size`](#page_size)        | The number of results per page (default 1000)                                 |
| [`sort_order`](#sort_order)       | The sort order of the results (default asc)                                   |
| [`stamp`](#stamp)           | Search for a single (or multiple) Bitcoin Stamp by stamp number                            |
| [`stamp_begin` / `stamp_end`](#stamp_begin--stamp_end)    | Search for a range of Bitcoin Stamps by a range            |
| [`tx_hash`](#tx_hash)         | Search for Bitcoin Stamps by BTC transaction hash                             |
| [`wallet_address`](#wallet_address)  | Search for Bitcoin Stamps owned by a Bitcoin address - Displays `quantity` owned        |
---

<br>



## `block_index`

https://stampchain.io/api/stamps?block_index=779652

 - *see [Output](#output) for result example*

<br>

## `count`

This will return the total number of Bitcoin Stamps and the last block which contains a Bitcoin Stamp. For pagination please see the `page_count` and `total_count` fields in the [Query Results](#query_results) section.

``
https://stampchain.io/api/stamps?count

Results

```JSON
{"count": 67911, "block_index": 795999}
```
<br>

## `creator` - artist

The issuer of a Bitcoin Stamp cannot be changed, and is typically used to identify the Artist/Creator wallet. This will return all stamps issued by the wallet address regardless of ownership of any Counterparty assets. The `supply` field is a representation of how many tokens/assets there may be for this Bitcoin Stamp. We encourage a supply of 1 for each Bitcoin Stamp, but this is ultimately up to the creator. 

https://stampchain.io/api/stamps?creator=1GotRejB6XsGgMsM79TvcypeanDJRJbMtg

- *see [Output](#output) for result example*

<br>

## `cpid`

This will return all Bitcoin Stamps based upon their corresponding Counterparty asset ID.

https://stampchain.io/api/stamps?cpid=A7337447728884561000

- *see [Output](#output) for result example*

<br>

## `cpid` multiple not in sequence

This will query for multiple Bitcoin Stamps based upon their corresponding Counterparty asset ID.

 https://stampchain.io/api/stamps?cpid=A7337447728884561000,A9668659363758889000

 - *see [Output](#output) for result example*

 <br>

## `holders`

The addresses which hold/own the Bitcoin Stamp as queried by the cpid

https://stampchain.io/api/stamps?holders=A256247256247256247

Results for holders query:

```JSON

{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": [
    {
      "address": "12xYPaWadCu7vWDm9p3s3nziVh75eDN1Bo",
      "quantity": 1
    },
    {
      "address": "135qDvhy3sMP7Kqi5yyomYBB37d1H2cr84",
      "quantity": 1
    },
    {
      "address": "bc1qelwyf27cxwexe27mp9tyqruw406zj5930068ff", 
      "quantity": 4
    }, 
    ... // additional results omitted for brevity
  ],
  "page_count": 52, //  number of items returned on this page (based on page_size)
  "total_count": 52  //  total number unique addresses which hold the stamp
}
```

## `ident` (Identity)

This query is case sensitive on [ 'SRC-20', 'SRC-721', 'STAMP' ] and returns all Bitcoin Stamps which are of the identity provided in the query parameter.

https://stampchain.io/api/stamps?ident=SRC-20

- *see [Output](#output) for result example*

<br>

## `page`

All queries will only return 1000 stamps at a time by default to minimize long running queries on the database. 

https://stampchain.io/api/stamps?page=2

frequently used in combination with `page_size`

https://stampchain.io/api/stamps?page=1&page_size=1000

- *see [Output](#output) for result example*

<br>

## `page_size`

https://stampchain.io/api/stamps?page_size=1000

frequently used in combination with `page`

https://stampchain.io/api/stamps?page=1&page_size=1000

- *see [Output](#output) for result example*

<br>


## `sort_order`

 The default sort order is by `stamp` ascending.

- *see [Output](#output) for result example*

<br>

## `stamp` single

https://stampchain.io/api/stamps?stamp=0

 - *see [Output](#output) for result example*

<br>

## `stamp` multiple not in sequence

https://stampchain.io/api/stamps?stamp=0,2,334

- *see [Output](#output) for result example*

<br>

## `stamp_begin` range `stamp_end`

https://stampchain.io/api/stamps?stamp_begin=1600&stamp_end=1610

- *see [Output](#output) for result example*

<br>


## `tx_hash`
This will return Bitcoin Stamp by the Bitconi transaction hash.

https://stampchain.io/api/stamps?tx_hash=17686488353b65b128d19031240478ba50f1387d0ea7e5f188ea7fda78ea06f4

- *see [Output](#output) for result example*

<br>

## `wallet_address`

This returns all Bitcoin Stamps which are owned by the address provided in the query parameter. Quantity is the number of Bitcoin Stamps owned by the wallet address. Supply is the total number of assets in circulation for this Stamp.

https://stampchain.io/api/stamps?wallet_address=1GotRejB6XsGgMsM79TvcypeanDJRJbMtg

Results for wallet_address query:
```JSON

{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": [
  {
    "stamp": 0,
    "block_index": 779652,
    "cpid": "A7337447728884561000",
    "creator": "1GotRejB6XsGgMsM79TvcypeanDJRJbMtg",
    "creator_name": "Mike in Space",
    "divisible": 0,
    "ident": "STAMP",
    "keyburn": 0,
    "locked": 1,
    "quantity": 1, // Quantity of the asset owned by the wallet address
    "stamp_url": "https://stampchain.io/stamps/17686488353b65b128d19031240478ba50f1387d0ea7e5f188ea7fda78ea06f4.png",
    "supply": 1,  // Total Supply in existence
    "tx_hash": "17686488353b65b128d19031240478ba50f1387d0ea7e5f188ea7fda78ea06f4"
  },
  ... // additional results omitted for brevity
],
  "page_count": 233, // total number of items returned on this page
  "total_count": 233 // total number of items which match the query
}
```
<br> <br>

# Future Functionality To Be Implemented:

  - filter upon unpsent outputs and spent outputs for non-keyburn stamps
  
<br>

## Notes
- Feel free to integrate it into your own projects with care. Access may be limited as we see fit.

### Conributors
- [REINAMORA](https://twitter.com/reinamora_137)