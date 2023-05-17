## SRC-20 Token Specification

Please note: SRC-20 is a bleeding edge specification modelled after BRC-20 and does not work like traditional Counterparty assets you may be accusomted to. Tooling is very minimal or non-existant at the moment. If you do not fully understand how SRC-20 works, it is recommended that you exercise caution.

While the specification is completely "open" and you are free to mint SRC-20 without the assistance of a minting service, it is highly recommended that you do so in order to avoid validity issues or wasted money. KeyBurn, in particular, is a requirement and cannot be accomplished through Freewallet at this time.

Recommended minting service: https://stampchain.io/src20/

## Introduction

SRC-20 Tokens must conform to these **required** fields or a Bitcoin Stamp Number will not be created, the transaction will not be considered a valid SRC-20 transaction, and they will not appear in the Bitcoin Stamps Protocol index / API. 

### DEPLOY
```
{
    "p": "src-20", 
    "op": "deploy", 
    "tick": "STAMP",
    "max": "100000", 
    "lim": "100",
    "dec": "18" [optional]
}
```
### MINT
```
{
    "p": "src-20", 
    "op": "mint", 
    "tick": "STAMP", 
    "amt": "100"
}
```
## TRANSFER

* NOTE: The transfer mechanism and format is still being refined to ensure maximum input compression and reliability of parsing. The example below is incomplete and subject to change. Transfer is not available as a valid transaction type until it has been formalized and marked complete in this spec. *

```
{
    "p": "src-20", 
    "op": "transfer", 
    "tick": "STAMP", 
    "amt": "100",
    "to": "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
}
```

## SRC-20 Token Requirements

1. Tokens must be 1-5 characters in length.
2. Allowed characters:
   a. Any word character (alphanumeric characters and underscores)
   b. Special characters: ~!@#$%^&*()_+=<>?
   c. Most printable emojis in U+1F300 to U+1F5FF
3. Disallowed characters:
   a. Non-printable Unicode characters
   b. Quotation marks: " ` '
   c. Special characters not present in 2c
4. Only numeric values are allowed in the "max", "amt", "lim" fields
4. Other Qualifications:
    - CP Asset must be of 0 supply, locked, and multisig dust assigned to qualified burn address For more details on "KeyBurn" see: https://github.com/mikeinspace/stamps/blob/main/Key-Burn.md
    - not case sensitive DOGE=doge
    - max mint/transfer/lim amount: uint64_max 18,446,744,073,709,551,615 (**commaas not allowed**, here for readability only)
    - max decimals: 18 (default)
    - json strings are not order sensitive
    - json strings are not case sensitive

## Creating a SRC-20 Token

To ensure your transactions are conforming to the SRC-20 standard, you can use the stampchain.io SRC-20 Token Generator.

[https://stampchain.io/src20](https://stampchain.io/src20)

## SRC-20 Token Examples

```
🔺🔺 Invalid Examples: 🚫🚫

{"p": "src-20", "op": "mint", "tick": "🙂APL", "amt": "18446744073709551616"} ## over uint64_max
{"p": "src-20", "op": "mint", "tick": "🙂@PL", "amt": "18,446"}     ## commas not allowed in amt
{"p": "src-20", "op": "mint", "tick": "🙂"PL", "amt": "100"}        ## double quotes not allowed in tick
```
```
👍👌 Valid Examples: 👌👍

{"p": "src-20", "tick": "🙂APL", "op": "mint", "amt": "100"}
{"p": "src-20", "op": "mint", "tick": "STAMP", "amt": "18446744073709551615"}
{"p": "src-20", "op": "mint", "tick": "🙂P`L", "amt": "100"}
{"p": "src-20", "op": "mint", "tick": "🙂PL?", "amt": "100"}
{"p": "src-20", "op": "mint", "tick": "🙂PL?", "amt": "100"}
{"p": "src-20", "op": "mint", "tick": "🙂PL", "amt": "100"}
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
