# Official BITCOIN STAMPS API

This gateway is in dev mode and is subject to change as new features are added. All stamps up to the current block may not be present as we work on integrating multiple data sources. Please contact us if you have any questions or suggestions.

Current API URL - this will return all stamps:

https://stampchain.io/api/stamps


---
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

https://stampchain.io/api/stamps?asset=A2536547015909490700
```
    {
    "asset": "A2536547015909490700"
    }
```
<br>

### Search For Stamps By BTC Transaction Id

https://stampchain.io/api/stamps?tx_hash=46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c
```
    {
    "tx_hash": "46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c"
    }
```
<br>

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