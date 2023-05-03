## SRC-20 Token Specification

 SRC-20 Tokens must conform to these **required** fields or a Bitcoin Stamp Number will not be created and the transaction will not be considered a valid SRC-20 transaction. 

### MINT
```
{
    "p": "src-20", 
    "op": "mint", 
    "tick": "KEVN",
    "max": "100000", 
    "lim": "100",
    "dec": "18" [optional]
}
```
### DEPLOY
```
{
    "p": "src-20", 
    "op": "deploy", 
    "tick": "KEVN", 
    "amt": "100"
}
```
## TRANSFER
```
{
    "p": "src-20", 
    "op": "transfer", 
    "tick": "KEVN", 
    "amt": "100",
    "to": "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
}
```

## SRC-20 Token Requirements

1. Tokens must be 1-5 characters in length.
2. Allowed characters:
   a. Any word character (alphanumeric characters and underscores)
   b. Special characters: ~!@#$%^&*()_+\-={}|[\]\\:;<>.?/
   c. Most printable emojis in U+1F300 to U+1F5FF
3. Disallowed characters:
   a. Non-printable Unicode characters
   b. Quotation marks: " ` '
   c. Special characters not present in 2c
4. Only numeric values are allowed in the "max", "amt", "lim" fields
4. Other Qualifications:
    - CP Asset must be of 0 supply, locked, and multisig dust assigned to qualified burn address
    - not case sensitive DOGE=doge
    - max mint/transfer/lim amount: uint64_max 18,446,744,073,709,551,615 
    - max decimals: 18 (default)
    - json strings are not order sensitive
    - json strings are not case sensitive

## Creating a SRC-20 Token

To ensure your transactions are conforming to the SRC-20 standard, you can use the StampChain.io SRC-20 Token Generator.

[https://stampchain.io/src20](https://stampchain.io/src20)

## SRC-20 Token Examples

```
valid   {"p": "src-20", "op": "mint", "tick": "STAMP", "amt": "18446744073709551615"}
invalid {"p": "src-20", "op": "mint", "tick": "🙂APL", "amt": "18446744073709551616"} ## over uint64_max
invalid {"p": "src-20", "op": "mint", "tick": "🙂@PL", "amt": "18,446"}     ## commas not allowed in amt
valid   {"p": "src-20", "tick": "🙂APL", "op": "mint", "amt": "100"}
invalid {"p": "src-20", "op": "mint", "tick": "🙂"PL", "amt": "100"}        ## double quotes not allowed in tick
valid   {"p": "src-20", "op": "mint", "tick": "🙂P`L", "amt": "100"}
valid   {"p": "src-20", "op": "mint", "tick": "🙂PL?", "amt": "100"}
valid   {"p": "src-20", "op": "mint", "tick": "🙂PL?", "amt": "100"}
valid   {"p": "src-20", "op": "mint", "tick": "🙂PL", "amt": "100"}
valid   {
 "p": "src-20",
 "op": "deploy",
 "tick": "KEVN",
 "max": "2844674409551615",
 "lim": "1000"
}
```

INVALID tokens will not be created in the stampchain.io index, and the transaction will not be considered a valid SRC-20 transaction. Any further modifications to the standard must be designed around backwards compatibility.


## Allowed Unicode Chars for Tick Field


Emoji_Presentation: This property includes all characters that are defined as emojis and have a distinct emoji-style appearance. These characters are intended to be displayed as colorful pictographs, rather than black-and-white text symbols. Examples include face emojis (😀, 😂, 😊), objects (🚗, 🌍, 🍕), and symbols (❤️, 🚫, ⏰).

Emoji_Modifier_Base: This property consists of characters that can be modified by emoji modifiers, such as skin tone modifiers. These characters usually represent human-like figures (e.g., 👩, 👨, 🤳) and can be combined with emoji modifiers to represent variations in skin tone or other attributes.

Emoji_Modifier: This property contains characters that can be used to modify the appearance of other emojis, particularly the ones classified as Emoji_Modifier_Base. The most common example is the skin tone modifiers (🏻, 🏼, 🏽, 🏾, 🏿) that can be applied to human-like emojis to represent different skin tones.


## Excluded Unicode Chars for Tick Field

These chars are excluded from the allowed chars list because they are not printable, and are not allowed in the tick field. Tokens with these chars will not be created in the stampchain.io index, and the transaction will not be considered a valid SRC-20 transaction.



Emoji_Component: Characters that are used to create more complex emojis, such as skin tone modifiers and hair components. These characters are not emojis on their own but can be used with other emojis.

Extended_Pictographic: This includes additional pictographic characters not covered by Emoji_Presentation but can still be considered emojis.

to apply an emoji modifier it would take up 2 chars, and be added directly after the emoji from emoji_presentation.  I suspect the web browser interprets that. kind of cool, didn't know how those worked.

an ASCII character takes up only one byte, while an emoji can take up to four bytes.