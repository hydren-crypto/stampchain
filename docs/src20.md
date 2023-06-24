# SRC-20 Token Specification

SRC-20 is a bleeding edge specification modeled after BRC-20. Prior specifications of SRC-20 in its initial state were built on top of Counterparty transactions with specific requirements for an issuance transaction. The current specification as of block 796,000 encodes the SRC-20 transaction directly onto BTC and does not use Counterparty. Any SRC-20 transactions created on Counterparty after block 796,000 will be deemed invalid, and will not be indexed. Counterparty was used as a proof of concept as we designed a direct to BTC method which optimizes the transaction size and reduces cost of SRC-20 transactions. 

If you do not fully understand how SRC-20 works, it is recommended that you exercise caution.


## Introduction

SRC-20 Tokens must conform to these **required** fields or a Bitcoin Stamp Number will not be created, the transaction will not be considered a valid SRC-20 transaction, and they will not appear in the Bitcoin Stamps Protocol index / API. 

### DEPLOY
```JSON
{
    "p": "src-20", 
    "op": "deploy", 
    "tick": "STAMP",
    "max": "100000", 
    "lim": "100",
    "dec": "18" // [optional]
}
```
### MINT
```JSON
{
    "p": "src-20", 
    "op": "mint", 
    "tick": "STAMP", 
    "amt": "100"
}
```
### TRANSFER
The SRC-20 transaction must be signed and broadcast onto BTC by the address that holds the SRC-20 token balance as it acts as a means to authenticate ownership. Both the source and destination addresses are embedded into the BTC transaction which is created by the users wallet. The SRC-20 reference wallet will ensure you are creating the proper transaction until support can be integrated into more broadly distributed wallets such as Hiro. Please use extreme caution if signing transactions created by a third party.

```JSON
{
    "p": "src-20", 
    "op": "transfer", 
    "tick": "STAMP", 
    "amt": "100"
}
```


If the amount specified to be transferred exceeds the balance held (which would be determined by the latest state of an Indexer), then the transfer  will be deemed invalid.

# SRC-20 Token Requirements

1. Tokens must be 1-5 characters in length.
2. Allowed characters:
   a. Any word character (alphanumeric characters and underscores)
   b. Special characters: ~!@#$%^&*()_+=<>?
   c. Most printable emojis in U+1F300 to U+1F5FF
3. Disallowed characters:
   a. Non-printable Unicode characters
   b. Quotation marks: " ` ' outside of regular json delimiters
   c. Special characters not present in 2c
4. Only numeric values are allowed in the "max", "amt", "lim" fields
5. Other Qualifications:
    - The third multisig on the transaction must be to a valid Keyburn address
    - not case sensitive DOGE=doge
    - max mint/transfer/lim amount: uint64_max 18,446,744,073,709,551,615 (**commaas not allowed**, here for readability only)
    - max decimals: 18 (default)
    - json strings are not order sensitive
    - json strings are not case sensitive
    - MAX, LIM fields are integers only
    - AMT field is a decimal up to uint64 max with 18 decimals
    - Must be a valid CP transaction for transactions prior to block 796,000 




# SRC-20 Token Example JSON Strings

```
🔺🔺 Invalid Examples: 🚫🚫

{"p": "src-20", "op": "mint", "tick": "🙂APL", "amt": "18446744073709551616"} ## over uint64_max
{"p": "src-20", "op": "mint", "tick": "🙂@PL", "amt": "18,446"}     ## commas not allowed in amt
{"p": "src-20", "op": "mint", "tick": "🙂"PL", "amt": "100"}        ## double quotes not allowed in tick
{'p': 'src-20', 'op': 'mint', 'tick': ' rare', 'amt': '1000'}       ## invalid space in tick
```
```
👍👌 Valid Examples: 👌👍

{"p": "src-20", "tick": "🙂APL", "op": "mint", "amt": "100"}
{"p": "src-20", "op": "mint", "tick": "STAMP", "amt": "18446744073709551615"}
{"p": "src-20", "op": "mint", "tick": "🙂P`L", "amt": "100"}
{"p": "src-20", "op": "mint", "tick": "🙂PL?", "amt": "100"}
{"p": "src-20", "op": "mint", "tick": "🙂PL?", "amt": "100"}
{"p": "src-20", "op": "mint", "tick": "🙂PL", "amt": "100"}
{"p": "src-20", "op": "mint", "tick": "PIZZA", "amt": "11111", "random": "test"}  
{
 "p": "src-20",
 "op": "deploy",
 "tick": "KEVN",
 "max": "2844674409551615",
 "lim": "1000"
}
```

**INVALID** tokens will not be created in the Bitcoin Stamps Protocol index or API, and the transaction will not be considered a valid SRC-20 transaction. Any further modifications to the standard must be designed around backwards compatibility.


## Allowed Unicode Chars for Tick Field


Emoji_Presentation: This property includes all characters that are defined as emojis and have a distinct emoji-style appearance. These characters are intended to be displayed as colorful pictographs, rather than black-and-white text symbols. Examples include face emojis (😀, 😂, 😊), objects (🚗, 🌍, 🍕), and symbols (❤️, 🚫, ⏰).

Emoji_Modifier_Base: This property consists of characters that can be modified by emoji modifiers, such as skin tone modifiers. These characters usually represent human-like figures (e.g., 👩, 👨, 🤳) and can be combined with emoji modifiers to represent variations in skin tone or other attributes.

Emoji_Modifier: This property contains characters that can be used to modify the appearance of other emojis, particularly the ones classified as Emoji_Modifier_Base. The most common example is the skin tone modifiers (🏻, 🏼, 🏽, 🏾, 🏿) that can be applied to human-like emojis to represent different skin tones.


## Excluded Unicode Chars for Tick Field

These chars are excluded from the allowed chars list because they are not printable, and are not allowed in the tick field. Tokens with these chars will not be created in Bitcoin Stamps Protocol index or API, and the transaction will not be considered a valid SRC-20 transaction.


Emoji_Component: Characters that are used to create more complex emojis, such as skin tone modifiers and hair components. These characters are not emojis on their own but can be used with other emojis.

Extended_Pictographic: This includes additional pictographic characters not covered by Emoji_Presentation but can still be considered emojis.

to apply an emoji modifier it would take up 2 chars, and be added directly after the emoji from emoji_presentation.  I suspect the web browser interprets that. kind of cool, didn't know how those worked.

an ASCII character takes up only one byte, while an emoji can take up to four bytes.

## SRC-20 BTC Transaction Specifications

```BASH
 # bitcoin-cli getrawtransaction 50aeb77245a9483a5b077e4e7506c331dc2f628c22046e7d2b4c6ad6c6236ae1 true
 ```

```JSON

{
  "txid": "50aeb77245a9483a5b077e4e7506c331dc2f628c22046e7d2b4c6ad6c6236ae1",
  "hash": "d045be2dc4647d92c1327fbd5572e6c7024f00f1e991b833f38cbdfb1a19577c",
  "version": 2,
  "size": 451,
  "vsize": 369,
  "weight": 1474,
  "locktime": 0,
  "vin": [
    {
      "txid": "6005ee8cc02e528e20c8e5ff71191723b0260391020862a03587a985f813dabe",
      "vout": 2,
      "scriptSig": {
        "asm": "",
        "hex": ""
      },
      "txinwitness": [
        "3045022100bd8c27473a5a82cc9085af4fd530ffbcb8642fda04689ac27ecefa01287f54e5022040af2daafaa1bedd6f80ee9d751cc88c12de8f8e65b33222c432d066c8cecbd801",
        "0314beffca49f214014cccdc0e1f7259aa1a5eeaaa34da1a4fd807e16fea3a86b0"
      ],
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.00000555,
      "n": 0,
      "scriptPubKey": {
        "asm": "0 afdcc32a2778ebd36c4859c7301bb4c32cb59f93",
        "desc": "addr(bc1q4lwvx2380r4axmzgt8rnqxa5cvktt8unqlnka6)#3yzckyj0",
        "hex": "0014afdcc32a2778ebd36c4859c7301bb4c32cb59f93",
        "address": "bc1q4lwvx2380r4axmzgt8rnqxa5cvktt8unqlnka6",
        "type": "witness_v0_keyhash"
      }
    },
    {
      "value": 0.00000888,
      "n": 1,
      "scriptPubKey": {
        "asm": "1 03c46b73fe2ff939bea5d0a577950dc8876e863bed11c887d681417dfd70533e51 039036c8182c70770f8f6bd702a25c7179bfff1ccb3a844297a717226b88b976cc 020202020202020202020202020202020202020202020202020202020202020202 3 OP_CHECKMULTISIG",
        "desc": "multi(1,03c46b73fe2ff939bea5d0a577950dc8876e863bed11c887d681417dfd70533e51,039036c8182c70770f8f6bd702a25c7179bfff1ccb3a844297a717226b88b976cc,020202020202020202020202020202020202020202020202020202020202020202)#jjleg3k0",
        "hex": "512103c46b73fe2ff939bea5d0a577950dc8876e863bed11c887d681417dfd70533e5121039036c8182c70770f8f6bd702a25c7179bfff1ccb3a844297a717226b88b976cc2102020202020202020202020202020202020202020202020202020202020202020253ae",
        "type": "multisig"
      }
    },
    {
      "value": 0.00000888,
      "n": 2,
      "scriptPubKey": {
        "asm": "1 02dc054e58b755f233295d2a8759a3e4cbf678619d8e75379e7989046dbce16be3 02932b35a45d21395ac8bb54b8f9dae3fd2dbc309c24e550cf2211fe6aa897e5ca 020202020202020202020202020202020202020202020202020202020202020202 3 OP_CHECKMULTISIG",
        "desc": "multi(1,02dc054e58b755f233295d2a8759a3e4cbf678619d8e75379e7989046dbce16be3,02932b35a45d21395ac8bb54b8f9dae3fd2dbc309c24e550cf2211fe6aa897e5ca,020202020202020202020202020202020202020202020202020202020202020202)#x8agrm2s",
        "hex": "512102dc054e58b755f233295d2a8759a3e4cbf678619d8e75379e7989046dbce16be32102932b35a45d21395ac8bb54b8f9dae3fd2dbc309c24e550cf2211fe6aa897e5ca2102020202020202020202020202020202020202020202020202020202020202020253ae",
        "type": "multisig"
      }
    },
    {
      "value": 0.00345194,
      "n": 3,
      "scriptPubKey": {
        "asm": "0 cc1d6448d6879b3e260829d9a31717beb772186e",
        "desc": "addr(bc1qeswkgjxks7dnufsg98v6x9chh6mhyxrwrvdktf)#km4m4l32",
        "hex": "0014cc1d6448d6879b3e260829d9a31717beb772186e",
        "address": "bc1qeswkgjxks7dnufsg98v6x9chh6mhyxrwrvdktf",
        "type": "witness_v0_keyhash"
      }
    }
  ],
  "hex": "02000000000101beda13f885a98735a0620802910326b023171971ffe5c8208e522ec08cee05600200000000ffffffff042b02000000000000160014afdcc32a2778ebd36c4859c7301bb4c32cb59f93780300000000000069512103c46b73fe2ff939bea5d0a577950dc8876e863bed11c887d681417dfd70533e5121039036c8182c70770f8f6bd702a25c7179bfff1ccb3a844297a717226b88b976cc2102020202020202020202020202020202020202020202020202020202020202020253ae780300000000000069512102dc054e58b755f233295d2a8759a3e4cbf678619d8e75379e7989046dbce16be32102932b35a45d21395ac8bb54b8f9dae3fd2dbc309c24e550cf2211fe6aa897e5ca2102020202020202020202020202020202020202020202020202020202020202020253ae6a44050000000000160014cc1d6448d6879b3e260829d9a31717beb772186e02483045022100bd8c27473a5a82cc9085af4fd530ffbcb8642fda04689ac27ecefa01287f54e5022040af2daafaa1bedd6f80ee9d751cc88c12de8f8e65b33222c432d066c8cecbd801210314beffca49f214014cccdc0e1f7259aa1a5eeaaa34da1a4fd807e16fea3a86b000000000",
  "blockhash": "00000000000000000005304641c363ce12d8a2a3b98c81d6b8b721cb37f66dfa",
  "confirmations": 1999,
  "time": 1686278106,
  "blocktime": 1686278106
}
```

The owner of the first input is considered the owner / source of the transaction |  `vin[0].prevout.hash[::-1]`

The first `vout` output `0` is the destination address for a transfer `"address": "bc1q4lwvx2380r4axmzgt8rnqxa5cvktt8unqlnka6"`

The components of the second multisig `ScriptPubKey` are: 

- `1`: This is the number of required signatures for the transaction to be valid.  Always 1 for SRC-20
- `03c46b73fe2ff939bea5d0a577950dc8876e863bed11c887d681417dfd70533e51`: This is the SRC-20 encoded data
- `039036c8182c70770f8f6bd702a25c7179bfff1ccb3a844297a717226b88b976cc`: This is the SRC-20 encoded data
- `020202020202020202020202020202020202020202020202020202020202020202`: This is a 20-byte hash that must be to a valid keyburn address.
- `3`: This is the total number of public keys in the multisig script. Always 3 for SRC-20
- `OP_CHECKMULTISIG`: opcode

We will also use the thrid mulisig script in the decoding below. 



## Decoding the transaction

Take the first two pubkeys from all present multisig scripts. In this example there are a total of 4 hex strings in the two scripts.

```
03c46b73fe2ff939bea5d0a577950dc8876e863bed11c887d681417dfd70533e51 039036c8182c70770f8f6bd702a25c7179bfff1ccb3a844297a717226b88b976cc
02dc054e58b755f233295d2a8759a3e4cbf678619d8e75379e7989046dbce16be3 02932b35a45d21395ac8bb54b8f9dae3fd2dbc309c24e550cf2211fe6aa897e5ca
```

First we strip the sign and nonce bytes (first and last bytes from each string) which leaves.

```
c46b73fe2ff939bea5d0a577950dc8876e863bed11c887d681417dfd70533e 9036c8182c70770f8f6bd702a25c7179bfff1ccb3a844297a717226b88b976
dc054e58b755f233295d2a8759a3e4cbf678619d8e75379e7989046dbce16b 932b35a45d21395ac8bb54b8f9dae3fd2dbc309c24e550cf2211fe6aa897e5
```

The strings are then concatenated and decoded using ARC4 decoding, which uses the `vin[0].prevout.hash[::-1]` as the signing key.

The output after ARC4 decoding is:

```
00457374616d703a7b2270223a227372632d3230222c226f70223a227472616e73666572222c227469636b223a225354455645222c22616d74223a22313030303030303030227d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

The first two bytes - in this example `0045` is the expected length of the decoded data in hex (less any trailing zeros) for data validation. This is required in order for the transaction to successfully parse.

The next `7374616d703a` is the hexadecimal representation of `stamp:` in lowercase - this is required for a valid stamp SRC-20 transaction

The remaining string is the SRC-20 JSON data.

```
7b2270223a227372632d3230222c226f70223a227472616e73666572222c227469636b223a225354455645222c22616d74223a22313030303030303030227d
```

Which UTF-8 decodes to: 

`{"p":"src-20","op":"transfer","tick":"STEVE","amt":"100000000"}`

In order to minimize the transaction size spaces are not used in the serialized JSON string which is constructed by the SRC-20 reference wallet.

## Compression

Compression and data serialization is supported in SRC-20 transactions.  Previously SRC-20 was a JSON Strings encoded in BASE64 inside of a Counterparty issuance transaction. In some cases the json string was serialized and compression was utilized to minimize the size of the corresponding transaction. This is an important factor when indexing and validating prior SRC-20 transactions within Counterparty transactions, and will continue to be supported in current version SRC-20 transactions. However given the construction of the JSON string without spaces, and the fact that we are no longer encoding in BASE64 the transactißon size benefits are minimal. 

An example of the serialization and compression:

```PY

# Note this string has line breaks and spaces so serialization and compression is worthwhile especially given that it was encoded in BASE64 which is 2x the size. 
data = {
    "p": "src-20",
    "op": "mint",
    "tick": "STAMP",
    "amt": "100000"
}

# Serialize the JSON String
serialized_data = msgpack.packb(data)

# Compress the serialized data using zlib
compressed_data = zlib.compress(serialized_data)

```



# Indexing Details

SRC-20 transactions may be indexed directly from BTC for validation. Prior to block 796,000 this can be accomplihed using Counterpart API's to pull transaction details. All transacitons on and after block 796,000 must be parsed directly from a BTC node. The specifications above must be followed including valid json strings, valid counterparty transaction (prior to block 796,000), and a valid stamp: transaction. 


## Tick Length
Python sees the text length differently than Node.JS. In the following example we determine the char length using the python method.

Node:
'BULL🐂'.length = 6

Python:
len('BULL🐂') = 5

## Base64 Decoding Anomolies

Python and Node.JS handle base64 decoding differently. Prior to block 796,000 for CP based transactions which were base64 encoded this can have an impact on valid/invalid transactions. After block 796,000 for direct to BTC transactions which are ARC4 encoded this does not have an impact.

For example: 

Transaction:
`c129cc8f13760fce63a42257dbe5dcdd0aad798f858f6b08968c7834c7a1bcc7`

With base64 string:
`eyJwIjogInNyYy0yMCIsICJvcCI6ICJtaW50IiwgInRpY2siOiAiUElaWkEiLCAiYW10IjogIjExMTExIn0`

This string is considered invalid in Python using `base64.b64decode(base64_string)` and `pybase64.b64decode(base64_string)` and in bash `printf "%s" "{base64_string}" | base64 -d` because it is missing the end of line `=` for padding / newline. The original indexer was written in python with these 3 checks so it is deemed invalid even though Node.JS interprets this string properly. Padding was attempted in prior iterations to attempt to include improperly formatted base64 strings into BTC Stamps protocol however since it is not possible to properly determine the location for padding in all cases these were simply deemed invalid to remove malformed data.

## Example SRC-20 JSON Validation

If the JSON string is not valid including it will be rejected from the index. This is a sample of the validation script. Any SRC-20 transactions that do not pass this validation are considered invalid transactions and will not impact user balances.

```PY

tick_pattern_list = {
    regex.compile(r'((\p{Emoji_Presentation})|(\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?))|[\p{Punctuation}\p{Symbol}\w~!@#$%^&*()_=<>?]')
}

def matches_any_pattern(text, pattern_list):
    matched = True
    for char in text:
        char_matched = any(pattern.fullmatch(char) for pattern in pattern_list)
        if not char_matched:
            matched = False
            break
    return matched

def sort_keys(key):
    priority_keys = ["p", "op", "tick"]
    if key in priority_keys:
        return priority_keys.index(key)
    return len(priority_keys)

def check_format(src_input_json, block_index):
    try:
        input_dict = json.loads(src_input_json)
        print("checking format", input_dict)

        if input_dict.get("p") == "src-20" and block_index < src20blockend:
            tick_value = input_dict.get("tick")
            if not tick_value or not matches_any_pattern(tick_value, tick_pattern_list) or len(tick_value) > 5:
                print("EXCLUSION: did not match tick pattern", input_dict)
                return False

            deploy_keys = {"op", "tick", "max", "lim"}
            transfer_keys = {"op", "tick", "amt"}
            mint_keys = {"op", "tick", "amt"}

            input_keys = set(input_dict.keys())

            uint64_max = Decimal(2 ** 64 - 1)
            key_sets = [deploy_keys, transfer_keys, mint_keys]
            key_to_check = {"deploy_keys": ["max", "lim"], "transfer_keys": ["amt"], "mint_keys": ["amt"]}

            for i, key_set in enumerate(key_sets):
                if input_keys >= key_set:
                    for key in key_to_check[list(key_to_check.keys())[i]]:
                        value = input_dict.get(key)
                        if value is None:
                            print(src_input_json)
                            print(f"EXCLUSION: Missing or invalid value for {key}", input_dict)
                            return False

                        if isinstance(value, str):
                            try:
                                value = Decimal(''.join(c for c in value if c.isdigit() or c == '.')) if value else Decimal(0)
                            except ValueError:
                                print(src_input_json)
                                print(f"EXCLUSION: {key} not a valid decimal", input_dict)
                                return False
                        elif isinstance(value, int):
                            value = Decimal(value)
                        else:
                            print(src_input_json)
                            print(f"EXCLUSION: {key} not a string or integer", input_dict)
                            return False

                        if not (0 <= value <= uint64_max):
                            print(src_input_json)
                            print(f"EXCLUSION: {key} not in range", input_dict)
                            return False
            return True

    except json.JSONDecodeError:
        return False
```
