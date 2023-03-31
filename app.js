function indexPage() {
    fetch('https://stampchain.io/stamp.json')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById('data-container');
        data.reverse().forEach((item, index) => {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item');
            if (item.stamp_url) {
                const img = document.createElement('img');
                img.src = item.stamp_url;
                img.width = 210;
                img.height = 210;
                img.onerror = "this.onerror=null;this.src='images/sad.png';";
                img.style.objectFit = 'contain';
                img.style.imageRendering = 'pixelated';
                img.style.imageRendering = '-moz-crisp-edges';
                img.style.imageRendering = 'crisp-edges';
                img.style.backgroundColor = '#000000';
                itemContainer.appendChild(img);
            }
            const stampInfo = document.createElement('pre');
            stampInfo.innerText = `Stamp: ${item.stamp}`;
            itemContainer.appendChild(stampInfo);
            const viewMoreBtn = document.createElement('button');
            viewMoreBtn.innerText = 'View More';
            viewMoreBtn.addEventListener('click', () => window.location.href = `asset.html?stampNumber=${item.stamp}`);
            //viewMoreBtn.addEventListener('click', () => window.open(`https://xchain.io/asset/${item.asset}`, '_blank'));
            itemContainer.appendChild(viewMoreBtn);
            dataContainer.appendChild(itemContainer);
            //if ((index + 1) % 4 === 0) {
            //dataContainer.appendChild(document.createElement('br'));
            //}
        });
    })
    .catch(error => console.error(error));
}


function assetPage() {
  async function fetchAssetDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const stampNumber = urlParams.get('stampNumber');

    try {
        const assetResponse = await fetch('https://stampchain.io/stamp.json');
        const allAssetData = await assetResponse.json();
        const assetData = allAssetData.find(asset => asset.stamp === parseInt(stampNumber));

        if (assetData) {
            displayAssetDetails(assetData);

            const proxyUrl = 'https://k6e0ufzq8h.execute-api.us-east-1.amazonaws.com/beta/counterpartyproxy';

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json, text/javascript',
                    'Authorization': 'Basic ' + btoa('rpc:rpc'),
                },
                body: JSON.stringify({
                    rpcUser: 'rpc',
                    rpcPassword: 'rpc',
                    request: {
                        jsonrpc: '2.0',
                        id: 0,
                        method: 'get_asset_info',
                        params: {
                            assets: [assetData.asset],
                        },
                    },
                }),
            };

            const counterpartyResponse = await fetch(proxyUrl, requestOptions);
            const counterpartyData = await counterpartyResponse.json();

            if (counterpartyData.result && counterpartyData.result.length > 0) {
                const counterpartyassetData = counterpartyData.result[0];
                displayCounterpartyAssetDetails(counterpartyassetData, assetData.tx_hash, assetData.stamp_url);
            } else {
                console.error('Asset not found on Counterparty');
            }

        } else {
            console.error('Asset not found');
        }
    } catch (error) {
        console.error(error);
    }
  }



  function displayAssetDetails(data) {
    const assetContainer = document.getElementById('asset-container');

    // Display asset image
    const img = document.createElement('img');
    img.src = data.stamp_url;
    img.width = 420;
    img.height = 420;
    img.onerror = "this.onerror=null;this.src='images/sad.png';";
    img.style.objectFit = 'contain';
    img.style.imageRendering = 'pixelated';
    img.style.imageRendering = '-moz-crisp-edges';
    img.style.imageRendering = 'crisp-edges';
    img.style.backgroundColor = '#000000';
    assetContainer.appendChild(img);
      


    // Display asset details
    const assetDetails = document.createElement('div');
    assetDetails.style.textAlign = 'center';

    const stampDetail = document.createElement('pre');
    stampDetail.innerText = `Stamp: ${data.stamp}`;
    assetDetails.appendChild(stampDetail);

    const assetDetail = document.createElement('pre');
    assetDetail.innerText = `Asset: ${data.asset}`;
    assetDetails.appendChild(assetDetail);

    const txHashDetail = document.createElement('pre');
    txHashDetail.innerText = `Tx Hash: ${data.tx_hash}`;
    assetDetails.appendChild(txHashDetail);

    assetContainer.appendChild(assetDetails);
  }

  function displayCounterpartyAssetDetails(assetData, txHash, stamp_url) {
    const assetContainer = document.getElementById('asset-container');

    const assetDetailsContainer = document.createElement('div');
    assetDetailsContainer.style.textAlign = 'center';

    // const assetDetailsTitle = document.createElement('h3');
    // assetDetailsTitle.innerText = 'Asset Details';
    // assetDetailsContainer.appendChild(assetDetailsTitle);

    const assetDetails = document.createElement('pre');
    assetDetails.innerText = `Creator/Artist: ${assetData.owner}\nTotal Issued: ${assetData.supply}\nDivisible: ${assetData.divisible}\nLocked: ${assetData.locked}`;
    assetDetailsContainer.appendChild(assetDetails);

    const mediaLink = document.createElement('pre');
    const mediaLinkAnchor = document.createElement('a');
    mediaLinkAnchor.href = `${stamp_url}`;
    mediaLinkAnchor.innerText = 'Binary Media';

    mediaLink.appendChild(mediaLinkAnchor);
    assetDetailsContainer.appendChild(mediaLink);

    const txnDataLink = document.createElement('pre');
    const txnDataLinkAnchor = document.createElement('a');
    txnDataLinkAnchor.href = `https://jpja.github.io/Electrum-Counterparty/decode_tx.html?tx=${txHash}`;
    txnDataLinkAnchor.innerText = 'Txn Data Decoder';
    txnDataLink.appendChild(txnDataLinkAnchor);
    assetDetailsContainer.appendChild(txnDataLink);

    const xchainExplorerLink = document.createElement('pre');
    const xchainExplorerLinkAnchor = document.createElement('a');
    xchainExplorerLinkAnchor.href = `https://xchain.io/asset/${assetData.asset}`;
    xchainExplorerLinkAnchor.innerText = 'Xchain.io Asset Information';
    xchainExplorerLink.appendChild(xchainExplorerLinkAnchor);
    assetDetailsContainer.appendChild(xchainExplorerLink);

    assetContainer.appendChild(assetDetailsContainer);
  }


  function displayDispenserDetails(dispenserData) {
    if (dispenserData.length > 0) {
        const assetContainer = document.getElementById('asset-container');
        const dispenserDetails = document.createElement('pre');
        dispenserDetails.innerText = 'Dispensers:\n';
        dispenserData.forEach((dispenser, index) => {
            dispenserDetails.innerText += `\nDispenser ${index + 1}:\nAsset: ${dispenser.asset}\nAmount: ${dispenser.amount}\nDispenser Address: ${dispenser.dispenser}\n`;
        });
        assetContainer.appendChild(dispenserDetails);
    }
  }

  fetchAssetDetails();
}

function init() {
    const currentPage = document.location.pathname.split('/').pop();
  
    if (currentPage === 'index.html' || currentPage === '') {
      indexPage();
    } else if (currentPage === 'asset.html') {
      assetPage();
    }
  }


// Call the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
