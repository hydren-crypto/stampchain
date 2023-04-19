# Official BITCOIN STAMP API

This gateway is in dev mode and is subject to change.

Current API URL for testing:

https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/stamps

## Query Parameters

#### Search for single stamp by ID
https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/stamps?stamp=1609

{
  "stamp": "1609"
}


#### Search for ranges of stamps (stamp_being and stamp_end)
https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/stamps?stamp_begin=1600&stamp_end=1610

{
  "stamp_begin": "1600",
  "stamp_end": "1610"
}

#### Search for stamps in a block

https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/stamps?block_index=783417

{
  "block_index": "784620"
}


#### Search for stamps by Counterparty Asset (only numeric assets are supported by Bitcoin Stamps)

https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/stamps?asset=A2536547015909490700

{
  "asset": "A2536547015909490700"
}


### Search for stamps by BTC Transaction ID

https://6b1ckwacmb.execute-api.us-east-1.amazonaws.com/stamps?tx_hash=46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c

{
  "tx_hash": "46e283ebe0f6d7d73ef835c10a911c157f071b4a12d54ee54355646bc43d0c1c"
}


## Future functionality to be implemented:

- official stampchain.io URL (pending SSL certificate)
- Search for stamps by wallet owner

## Notes
- please enquire about CORS support for direct connection from your web integrations