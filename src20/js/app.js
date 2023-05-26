
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
    
        const svgString = generateSvgString(op);
        if (svgString === null) return;
        const base64String = btoa(svgString);
    
        const bitcoinAddress = document.getElementById("bitcoin-address").value;
        const assetIssuance = 0;
        const action = "check";
    
        // Check if the mint-transfer-fields are visible
        const mintTransferFields = document.getElementById("mint-transfer-fields");
        if (!mintTransferFields.hidden) {
            const ticker = document.getElementById("ticker").value;
            const amt = document.getElementById("amt").value;

            // Check if the required fields are empty
            if (!ticker || ticker.trim() === "" || !amt || amt.trim() === "") {
                alert("Please enter values for the required fields.");
                return;
            }
        }
        // Check if the transfer-fields are visible
        const transferFields = document.getElementById("transfer-fields");
        if (!transferFields.hidden) {
            const to = document.getElementById("to").value;
            if (!to || to.trim() === "") {
                alert("Please enter a valid BTC address for transfer.");
                return;
            }
        }
    
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
        
        const svgString = generateSvgString(op);
        if (svgString === null) return;
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
    
    function clearInputValues(element) {
        const inputs = element.getElementsByTagName("input");
        for (let input of inputs) {
            input.value = "";
        }
    }

    function updateFormFields() {
        const op = opSelect.value;
        const deployFields = document.getElementById("deploy-fields");
        const mintTransferFields = document.getElementById("mint-transfer-fields");
        const transferFields = document.getElementById("transfer-fields");
        const toInput = document.getElementById("to");
        const amtInput = document.getElementById("amt");
        const maxInput = document.getElementById("max");
        const limitInput = document.getElementById("limit");
    
        // Clear values of all fields before updating visibility
        clearInputValues(deployFields);
        clearInputValues(mintTransferFields);
        clearInputValues(transferFields);
    
        if (op === "deploy") {
            deployFields.hidden = false;
            mintTransferFields.hidden = true;
            transferFields.hidden = true;
            toInput.required = false;
            amtInput.required = false;
            maxInput.required = true;
            limitInput.required = true;
        } else if (op === "mint") {
            deployFields.hidden = true;
            mintTransferFields.hidden = false;
            transferFields.hidden = true;
            toInput.required = false;
            amtInput.required = true;
            maxInput.required = false;
            limitInput.required = false;
        } else if (op === "transfer") {
            deployFields.hidden = true;
            mintTransferFields.hidden = false;
            transferFields.hidden = false;
            toInput.required = true;
            amtInput.required = true;
            maxInput.required = false;
            limitInput.required = false;
        }
    }
    
});

function simpleValidateAddress(address) {
    return /^1|^3|^bc1q/.test(address);
}


function generateSvgString(op) {
    let svgString;
    if (op === "deploy") {
        const ticker = document.getElementById("ticker").value;
        const max = document.getElementById("max").value;
        const limit = document.getElementById("limit").value;
        svgString = `{"p": "src-20", "op": "deploy", "tick": "${ticker}", "max": "${max}", "lim": "${limit}"}`;
    } else if (op === "mint") {
        const ticker = document.getElementById("ticker").value;
        const amt = document.getElementById("amt").value;
        svgString = `{"p": "src-20", "op": "${op}", "tick": "${ticker}", "amt": "${amt}"}`;
    } else if (op === "transfer") {
        const ticker = document.getElementById("ticker").value;
        const amt = document.getElementById("amt").value;
        const to = document.getElementById("to").value;
        svgString = `{"p": "src-20", "op": "${op}", "tick": "${ticker}", "amt": "${amt}", "to": "${to}"}}`;
    } else {
        // Handle the case when an invalid operation is selected
        alert("Invalid operation selected.");
        return null;
    }
    return svgString;
}


async function sendDataToLambda(base64String, bitcoinAddress, assetIssuance, action, submitButton) {
    if (base64String.length > 8572) {
        alert("The base64 string is too long (over 8572 characters). Please upload a smaller image.");
        document.getElementById("please-wait").hidden = true;
        return;
    }
    
    const apiEndpoint = "https://fed2zpf904.execute-api.us-east-1.amazonaws.com/prod/submit";

    try {
        // console.log("Sending data", { apiEndpoint, base64String, bitcoinAddress, assetIssuance, action, submitButton });

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
        transferAddress.textContent = `Creator Address: ${item.transfer_address}`;
        itemDiv.appendChild(transferAddress);
        const formattedFee = !isNaN(parseFloat(item.total_fees_with_dust)) ? (parseFloat(item.total_fees_with_dust) / 100000000).toFixed(6) : "Invalid value";
        const computedFee = document.createElement("p");
        computedFee.textContent = `Total Mint PRICE (BTC): ${formattedFee}`;
        itemDiv.appendChild(computedFee);

        const currentFeeRate = document.createElement("p");
        currentFeeRate.textContent = `Fee Rate: ${(item.current_fee_rate * 100000) >> 0} sat/vB`;
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
