

document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("upload-form");
    const imageFileInput = document.getElementById("image-file");
    const submitButton = uploadForm.querySelector("button[type='submit']");
    const confirmButton = document.getElementById("confirm-button");

    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // console.log("Form submitted");

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
        sendDataToLambda(base64String, bitcoinAddress, fileName, collectionName, creatorName, assetLock, assetIssuance, action, submitButton);

        // Disable the submit button after sending data
        submitButton.disabled = true;
    });

    // Re-enable the submit button when the user changes the image input
    imageFileInput.addEventListener("change", () => {
        submitButton.disabled = false;
    });

    // Call sendDataToLambda with action "confirm" when the confirm button is clicked
    confirmButton.addEventListener("click", async () => {
        // Hide the "confirmation-message" and show the "please-wait" message
        document.getElementById("please-wait").hidden = false;
        document.getElementById("confirmation-message").hidden = true;
    
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
        const action = "confirm";
        sendDataToLambda(base64String, bitcoinAddress, fileName, collectionName, creatorName, assetLock, assetIssuance, action, submitButton);
    
        // Disable the submit button after sending data
        submitButton.disabled = true;
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

async function sendDataToLambda(base64String, bitcoinAddress, fileName, collectionName, creatorName, assetLock, assetIssuance, action, submitButton) {
    if (base64String.length > 8572) {
        alert("The base64 string is too long (over 8572 characters). Please upload a smaller image.");
        document.getElementById("please-wait").hidden = true;
        return;
    }
    
    const apiEndpoint = "https://fed2zpf904.execute-api.us-east-1.amazonaws.com/dev/submit";

    try {
        // console.log("Sending data", { apiEndpoint, base64String, bitcoinAddress, fileName, collectionName, creatorName, assetLock, assetIssuance, action, submitButton });

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
                action: action
            })
            
        });

        // console.log("Received response:", response);
        if (response.ok) {
            const responseData = await response.json();
            // console.log("Received data:", responseData);
            
            const responseBody = responseData;

            document.getElementById("please-wait").hidden = true;

            // console.log("Data passed to displayOutput:", responseData);
            displayOutput(responseData);
            
        } else {
            console.error("Error response from backend:", await response.text());
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
    // console.log("Output Div:", outputDiv);

    outputDiv.innerHTML = '';

    const confirmButton = document.getElementById("confirm-button");
    let shouldDisplayConfirmButton = false;

    data.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const transferAddress = document.createElement("p");
        transferAddress.textContent = `Creator/Artist Address: ${item.transfer_address}`;
        itemDiv.appendChild(transferAddress);
        const formattedFee = !isNaN(parseFloat(item.total_fees_with_dust)) ? (parseFloat(item.total_fees_with_dust) / 100000000).toFixed(6) : "Invalid value";
        const computedFee = document.createElement("p");
        computedFee.textContent = `Total Mint PRICE (BTC): ${formattedFee}`;
        itemDiv.appendChild(computedFee);

        const currentFeeRate = document.createElement("p");
        currentFeeRate.textContent = `Fee Rate: ${item.current_fee_rate} BTC/kB`;
        itemDiv.appendChild(currentFeeRate);

        if (item.send_to_address) {
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

            // Show confirmation-message only if item.send_to_address is available
            document.getElementById("confirmation-message").hidden = false;
        } else {
            shouldDisplayConfirmButton = true;
        }

        outputDiv.appendChild(itemDiv);
    });

    // Conditionally display the "Confirm" button
    confirmButton.hidden = !shouldDisplayConfirmButton;
}
