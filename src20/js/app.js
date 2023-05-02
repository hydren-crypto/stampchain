
document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("upload-form");
    const submitButton = uploadForm.querySelector("button[type='submit']");
    const confirmButton = document.getElementById("confirm-button");

    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Show the "please wait" message
        document.getElementById("please-wait").hidden = false;

        const op = document.getElementById("op").value;
        const ticker = document.getElementById("ticker").value;
        const max = document.getElementById("max").value;
        const limit = document.getElementById("limit").value;

        const svgString = "";
        const base64String = btoa(svgString);

        const bitcoinAddress = document.getElementById("bitcoin-address").value;
        const assetIssuance = 0;
        const action = "check";
        sendDataToLambda(base64String, bitcoinAddress, assetIssuance, action, submitButton);

        // Disable the submit button after sending data
        submitButton.disabled = true;
    });

    // Call sendDataToLambda with action "confirm" when the confirm button is clicked
    confirmButton.addEventListener("click", async () => {
        // Hide the "confirmation-message" and show the "please-wait" message
        document.getElementById("please-wait").hidden = false;
        document.getElementById("confirmation-message").hidden = true;

        const op = document.getElementById("op").value;
        const ticker = document.getElementById("ticker").value;
        
        let svgString;
        if (op === "deploy") {
            const ticker = document.getElementById("ticker").value;
            const max = document.getElementById("max").value;
            const limit = document.getElementById("limit").value;
            svgString = `{"p": "src-20", "op": "deploy", "tick": "${ticker}", "max": "${max}", "lim": "${limit}"}`;
        } else if (op === "mint" || op === "transfer") {
            const ticker = document.getElementById("ticker").value;
            const amt = document.getElementById("amt").value;
            svgString = `{"p": "src-20", "op": "${op}", "tick": "${ticker}", "amt": "${amt}"}`;
        } else {
            // Handle the case when an invalid operation is selected
            alert("Invalid operation selected.");
            return;
        }
        const base64String = btoa(svgString);
        

        const bitcoinAddress = document.getElementById("bitcoin-address").value;

        const assetIssuance = 0;
        const action = "confirm";
        sendDataToLambda(base64String, bitcoinAddress, assetIssuance, action, submitButton);

        // Disable the submit button after sending data
        submitButton.disabled = true;
    });

    const opSelect = document.getElementById("op");

    opSelect.addEventListener("change", function() {
        updateFormFields();
    });
    
    function updateFormFields() {
        const op = opSelect.value;
        const deployFields = document.getElementById("deploy-fields");
        const mintTransferFields = document.getElementById("mint-transfer-fields");
    
        if (op === "deploy") {
            deployFields.hidden = false;
            mintTransferFields.hidden = true;
        } else if (op === "mint" || op === "transfer") {
            deployFields.hidden = true;
            mintTransferFields.hidden = false;
        }
    }
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


async function sendDataToLambda(base64String, bitcoinAddress, assetIssuance, action, submitButton) {
    if (base64String.length > 8572) {
        alert("The base64 string is too long (over 8572 characters). Please upload a smaller image.");
        document.getElementById("please-wait").hidden = true;
        return;
    }
    
    const apiEndpoint = "https://fed2zpf904.execute-api.us-east-1.amazonaws.com/dev/submit";

    try {
        console.log("Sending data", { apiEndpoint, base64String, bitcoinAddress, assetIssuance, action, submitButton });

        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                file_content: base64String,
                target_address: bitcoinAddress,
                asset_issuance: assetIssuance ?? 0,
                file_name: "src-20",
                action: action
            })
            
        });

        console.log("Received response:", response);
        if (response.ok) {
            const responseData = await response.json();
            console.log("Received data:", responseData);
            
            const responseBody = responseData;

            document.getElementById("please-wait").hidden = true;

            console.log("Data passed to displayOutput:", responseData);
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
    console.log("Output Div:", outputDiv);

    outputDiv.innerHTML = '';

    const confirmButton = document.getElementById("confirm-button");
    let shouldDisplayConfirmButton = false;

    data.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const transferAddress = document.createElement("p");
        transferAddress.textContent = `Creator Address: ${item.transfer_address}`;
        itemDiv.appendChild(transferAddress);
        const formattedFee = !isNaN(parseFloat(item.total_fees_with_dust)) ? (parseFloat(item.total_fees_with_dust) / 100000000).toFixed(6) : "Invalid value";
        const computedFee = document.createElement("p");
        computedFee.textContent = `Total Mint PRICE (BTC): ${formattedFee}`;
        itemDiv.appendChild(computedFee);

        const currentFeeRate = document.createElement("p");
        currentFeeRate.textContent = `Fee Rate: ${item.current_fee_rate * 100000000000 } SAT/kB`;
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
