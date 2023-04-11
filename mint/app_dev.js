
document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("upload-form");
    const imageFileInput = document.getElementById("image-file");
    const submitButton = uploadForm.querySelector("button[type='submit']");

    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("Form submitted");

        // Show the "please wait" message
        document.getElementById("please-wait").hidden = false;

        const imageFile = imageFileInput.files[0];

        if (!imageFile) {
            alert("Please upload an image.");
            return;
        }

        const bitcoinAddress = document.getElementById("bitcoin-address").value;
        const base64String = await convertImageToBase64(imageFile);
        const fileName = imageFile.name;
        const creatorName = document.getElementById("creator-name").value || "Undefined";
        const collectionName = document.getElementById("collection-name").value || "Undefined";
        const assetLock = document.getElementById("asset-lock").checked;
        const assetIssuance = document.getElementById("asset-issuance").value;
        const action = "check";
        sendDataToLambda(base64String, bitcoinAddress, fileName, collectionName, creatorName, assetLock, assetIssuance, action);
        
        // Disable the submit button after sending data
        submitButton.disabled = true;
    });

    // Re-enable the submit button when the user changes the image input
    imageFileInput.addEventListener("change", () => {
        submitButton.disabled = false;
    });
});

function simpleValidateAddress(address) {
    return /^1|^3|^bc1q/.test(address);
}

  
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

async function sendDataToLambda(base64String, bitcoinAddress, fileName, collectionName, creatorName, assetLock, assetIssuance, action) {
    if (base64String.length > 7000) {
        alert("The base64 string is too long (over 7000 characters). Please upload a smaller image.");
        document.getElementById("please-wait").hidden = true;
        return;
    }

    const apiEndpoint = "https://yxzz5lsstucttpyholm7dppkhq0pdose.lambda-url.us-east-1.on.aws/";

    console.log("Sending data");

    try {
        console.log("Sending data", { apiEndpoint, base64String, bitcoinAddress, fileName, collectionName, creatorName, assetLock, assetIssuance, action });

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
                action: "check"
            })
            
        });

        console.log("Received response:", response);

        if (response.ok) {
            const responseData = await response.json();

            const responseBody = responseData;

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

        const formattedFee = !isNaN(parseFloat(item.total_fees_with_dust)) ? parseFloat(item.total_fees_with_dust).toFixed(6) : "Invalid value";
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
