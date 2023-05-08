
# Official BITCOIN STAMPS Minting Service API

This documentation is specifically for our minting service API which is used to create new Bitcoin Stamps. This allows you to process Stamp mints directly from your application. 

### API Parameter Definitions

| Variable                          | Comments                                                               |
| :---                              | :---                                                                   |
| `file_content`                      | The image `base64` string. Checking of image type (png,gif,etc) must be done on the front end |
| `target_address`                    | The `bitcoin address` for the stamp owner, artist, and issuer `NO TAPROOT ADDRESSES`. **Validation must be done on the front end** |
| `asset_lock`                        | Lock the asset to prevent further issuance. We encourage `True` |
| `asset_issuance`                    | The qty of the asset to issue. We encourage and default to `1` |
| `action`                            | `<check>` or `<mint>` Check will return the cost. Mint will return all the content in check, plus the address to send BTC funds for mint |
| `file_name`                         | The name of the file, simply for reference `<optional>` |
| `collection_name`                   | Collection name `<optional>` |
| `creator_name`                      | Creator / Artist name `<optional>` |
| `source`                            | The name of the minting service `<optional>` |


## Example POST Request to the Minting API

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

## Service Details

Minting is processed on the next block after payment receipt, and asset sends are processed on the next block after minting. Multiple file processing needs to be handled on the front end application. Currently the minting API can handle approximately 75 unconfirmed mints at one time, and will grow according to capacity. 

Feedback is welcome, and contact us directly for other bulk minting options. 

### Conributors
- [REINAMORA](https://twitter.com/reinamora_137)