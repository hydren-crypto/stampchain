# Official BITCOIN STAMPS API

This gateway is in dev mode and is subject to change as new features are added. All stamps up to the current block may not be present as we work on integrating multiple data sources. Please contact us if you have any questions or suggestions.

Current API URL for testing - this will return all stamps:

https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/v1/

pending: api.stampchain.io/v1 (pending SSL certificate)

---
## Query Parameters

#### Search For Single Stamp By Id
https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/v1/?stamp=1609

    {
    "stamp": "1609"
    }

<br>

#### Search For Ranges Of Stamps (Stamp_Being And Stamp_End)
https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/v1/?stamp_begin=1600&stamp_end=1610

    {
    "stamp_begin": "1600",
    "stamp_end": "1610"
    }

<br>

#### Search For Multiple Stamps
https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/v1/?stamp=343,454,896
    
    {
    "stamp": "343,454,896"
    }

#### Search For Stamps In A Block

https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/v1/?block_index=783417

    {
    "block_index": "784620"
    }

<br>

#### Search For Stamps By Counterparty Asset (Only Numeric Assets Are Supported By Bitcoin Stamps)

https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/v1/?asset=A2536547015909490700

    {
    "asset": "A2536547015909490700"
    }

<br>

### Search For Stamps By BTC Transaction Id

https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/v1/?tx_hash=46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c

    {
    "tx_hash": "46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c"
    }

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
- please enquire about CORS support for direct connection from your web integrations