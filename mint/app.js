
document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("upload-form");
    const imageFileInput = document.getElementById("image-file");
    const bitcoinAddressInput = document.getElementById("bitcoin-address");
    const submitButton = uploadForm.querySelector("button[type='submit']");

    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("Form submitted");

        // Show the "please wait" message
        document.getElementById("please-wait").hidden = false;

        const imageFile = imageFileInput.files[0];
        const bitcoinAddress = bitcoinAddressInput.value;

        if (!imageFile) {
            alert("Please upload an image.");
            return;
        }

        const isValidAddress = await isValidBTCAddress(bitcoinAddress);
        if (!isValidAddress) {
            alert('Please enter a valid Bitcoin address (Base58 or Bech32).');
            document.getElementById("please-wait").hidden = true;
            return;
        }

        const base64String = await convertImageToBase64(imageFile);

        sendDataToLambda(base64String, bitcoinAddress);

        // Disable the submit button after sending data
        submitButton.disabled = true;
    });

    // Re-enable the submit button when the user changes the image input
    imageFileInput.addEventListener("change", () => {
        submitButton.disabled = false;
    });

    // Re-enable the submit button when the user changes the bitcoin address input
    bitcoinAddressInput.addEventListener("input", () => {
        submitButton.disabled = false;
    });
});


  
function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result.split("base64,")[1];
            resolve(base64String);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(imageFile);
    });
}
  
async function sendDataToLambda(base64String, bitcoinAddress) {
    if (base64String.length > 7000) {
        alert("The base64 string is too long (over 7000 characters). Please upload a smaller image.");
        document.getElementById("please-wait").hidden = true;
        return;
    }
    
    const apiEndpoint = "https://kbwl5ukvwrwtzuacdlz3bkzc4a0ezjgz.lambda-url.us-east-1.on.aws/"
    //const apiEndpoint = "https://yxzz5lsstucttpyholm7dppkhq0pdose.lambda-url.us-east-1.on.aws/"

    console.log("Sending data to Lambda");

    try {
        console.log("Sending data", { apiEndpoint, base64String, bitcoinAddress });

        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                file_content: base64String,
                address: bitcoinAddress
            })
        });

        console.log("Received response:", response);

        if (response.ok) {
            const responseData = await response.json();
            // console.log("Parsed response data:", responseData);

            const responseBody = responseData;
            // console.log("Parsed response body:", responseBody);

            document.getElementById("please-wait").hidden = true;

            displayOutput(responseBody);
        } else {
            console.error("Error response from Lambda:", await response.text());
            alert("An error occurred while sending data.");
        }
    } catch (error) {
        console.error("Error during fetch operation:", error);
        alert("An error occurred while sending data.");
    } finally {
        // Re-enable the submit button and hide the "please wait" message
        submitButton.disabled = false;
        document.getElementById("please-wait").hidden = true;
    }
}


function displayOutput(data) {
    const outputDiv = document.getElementById("output");
    console.log("Output Div:", outputDiv);

    outputDiv.innerHTML = '';

    data.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const transferAddress = document.createElement("p");
        transferAddress.textContent = `Creator/Artist Address: ${item.transfer_address}`;
        itemDiv.appendChild(transferAddress);

        const formattedFee = !isNaN(parseFloat(item.computed_fee)) ? parseFloat(item.computed_fee).toFixed(6) : "Invalid value";
        const computedFee = document.createElement("p");
        computedFee.textContent = `Total Mint PRICE (BTC): ${formattedFee}`;
        itemDiv.appendChild(computedFee);

        const currentFeeRate = document.createElement("p");
        currentFeeRate.textContent = `Fee Rate: ${item.current_fee_rate} BTC/kB`;
        itemDiv.appendChild(currentFeeRate);

        const sendtoAddress = document.createElement("p");
        sendtoAddress.textContent = `Send ${formattedFee} to: ${item.send_to_address}`;
        itemDiv.appendChild(sendtoAddress);

        const qrCodeImage = document.createElement("img");
        const btcUri = `bitcoin:${item.send_to_address}?amount=${formattedFee}`;
        QRCode.toDataURL(btcUri, { width: 256, height: 256 }, function (error, url) {
            if (error) console.error(error);
            qrCodeImage.src = url;
        });

        itemDiv.appendChild(qrCodeImage);

        outputDiv.appendChild(itemDiv);
        
        document.getElementById("confirmation-message").hidden = false;
    });
}

async function isValidBTCAddress(address) {
    const base58regex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    const bech32regex = /^bc1[a-zA-HJ-NP-Z0-9]{6,}$/;

    const isBase58 = base58regex.test(address);
    const isBech32 = bech32regex.test(address);

    if (!isBase58 && !isBech32) {
        return false;
    }

    if (isBase58) {
        const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        let num = BigInt(0);
        let base = BigInt(1);

        for (let i = address.length - 1; i >= 0; i--) {
            const char = address[i];
            const value = BigInt(alphabet.indexOf(char));

            if (value === -1n) {
                return false;
            }

            num = num + (value * base);
            base = base * 58n;
        }

        const numHex = num.toString(16);
        const padNumHex = '0'.repeat(50 - numHex.length) + numHex;
        const versionAndHash = padNumHex.slice(0, -8);
        const checksum = padNumHex.slice(-8);

        const sha256 = (message) => {
            const msgBuffer = new TextEncoder('utf-8').encode(message);
            return crypto.subtle.digest('SHA-256', msgBuffer)
                .then((buf) => {
                    return Array.prototype.map.call(new Uint8Array(buf), x => ('00' + x.toString(16)).slice(-2)).join('');
                });
        };

        const isValidBase58 = await sha256(versionAndHash)
            .then(sha256)
            .then((hash) => {
                const calculatedChecksum = hash.slice(0, 8).toUpperCase();
                return checksum.toUpperCase() === calculatedChecksum;
            });

        return isValidBase58;
    }

    if (isBech32) {
        const bech32Alphabet = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
        const bech32Separator = '1';
        const [humanReadablePart, dataPart] = address.split(bech32Separator);

        if (humanReadablePart !== 'bc') {
            return false;
        }

        const values = [];
        for (let i = 0; i < dataPart.length; i++) {
            const value = bech32Alphabet.indexOf(dataPart[i]);
            if (value === -1) {
                return false;
            }
            values.push(value);
        }

        const polyMod = (values) => {
            const GENERATOR = [BigInt(0x3b6a57b2), BigInt(0x26508e6d), BigInt(0x1ea119fa), BigInt(0x3d4233dd), BigInt(0x2a1462b3)];
            let chk = BigInt(1);
            for (let i = 0; i < values.length; i++) {
                const top = chk >> BigInt(25);
                chk = (chk & BigInt(0x1ffffff)) << BigInt(5) ^ BigInt(values[i]);
                for (let j = 0; j < 5; j++) {
                    if ((top >> BigInt(j)) & BigInt(1)) {
                        chk ^= GENERATOR[j];
                    }
                }
            }
            return chk;
        };

        const checksum = polyMod(values.concat([0, 0, 0, 0, 0, 0])) ^ BigInt(1);
        return checksum === BigInt(0);
    }
}
