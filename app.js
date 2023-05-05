// Set the current page and items per page
let currentPage = 1;
const itemsPerPage = 500;
const apiBaseUrl = 'https://stampchain.io/api/stamps';
let totalNumberOfStamps = 0;

function simpleValidateAddress(address) {
  return /^1|^3|^bc1q/.test(address);
}

function isValidCpid(cpid) {
  return /^A\d+$/.test(cpid);
}


function indexPage() {
  // Get the creator address from URL query parameter if exists
  const urlParams = new URLSearchParams(window.location.search);
  const creatorAddress = urlParams.get('creator');

  fetchDataAndRender(currentPage, creatorAddress);

  function fetchDataAndRender(page, creator) {
    // Update the API endpoint with the creator query parameter if it exists
    const apiUrl = creator
      ? `${apiBaseUrl}?creator=${creator}&page=${page}&page_size=${itemsPerPage}&sort_order=desc`
      : `${apiBaseUrl}?page=${page}&page_size=${itemsPerPage}&sort_order=desc`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // If this is the first page, set the total number of stamps (our only chance, really)
        if (currentPage === 1 && data[0]) {
          totalNumberOfStamps = Number(data[0].stamp);
        }

        renderData(data);
        renderPaginationButtons(page, data.length);
      })
      .catch(error => console.error(error));
  }

  function renderData(data) {
    const dataContainer = document.getElementById('data-container');
    // Clear the previous items from the container
    dataContainer.innerHTML = '';

    data.forEach((item, index) => {
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('item');
      if (item.stamp_url) {
        const img = document.createElement('img');
        img.src = item.stamp_url;
        img.width = 210;
        img.height = 210;
        img.onerror = function () {
          this.onerror = null;
          this.src = 'images/sad.png';
        };
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

      const creatorInfo = document.createElement('pre');
      const truncatedCreator = `${item.creator.slice(0, 5)}...${item.creator.slice(-5)}`;
      creatorInfo.innerHTML = `Creator: <span class="normal-case">${truncatedCreator}</span>`; 
      itemContainer.appendChild(creatorInfo);
      

      creatorInfo.innerText = `Creator: ${truncatedCreator}`;
      itemContainer.appendChild(creatorInfo);

      const viewMoreBtn = document.createElement('button');
      viewMoreBtn.innerText = 'View More';
      viewMoreBtn.addEventListener('click', () => window.location.href = `asset.html?stampNumber=${item.stamp}`);
      itemContainer.appendChild(viewMoreBtn);
      dataContainer.appendChild(itemContainer);
    });
  }

  function renderPaginationButtons(page) {
    const paginationContainerTop = document.getElementById('pagination-container-top');
    const paginationContainerBottom = document.getElementById('pagination-container-bottom');
  
    paginationContainerTop.innerHTML = '';
    paginationContainerBottom.innerHTML = '';
  
    const totalPages = Math.ceil(totalNumberOfStamps / itemsPerPage);
  
    const firstButtonTop = document.createElement('button');
    firstButtonTop.innerText = '<< First';
    firstButtonTop.disabled = page === 1;
    firstButtonTop.addEventListener('click', () => {
      currentPage = 1;
      fetchDataAndRender(currentPage);
    });
  
    const prevButtonTop = document.createElement('button');
    prevButtonTop.innerText = '< Previous';
    prevButtonTop.disabled = page === 1;
    prevButtonTop.addEventListener('click', () => {
      currentPage--;
      fetchDataAndRender(currentPage);
    });
  
    const nextButtonTop = document.createElement('button');
    nextButtonTop.innerText = 'Next >';
    nextButtonTop.disabled = page === totalPages;
    nextButtonTop.addEventListener('click', () => {
      currentPage++;
      fetchDataAndRender(currentPage);
    });
  
    const lastButtonTop = document.createElement('button');
    lastButtonTop.innerText = 'Last >>';
    lastButtonTop.disabled = page === totalPages;
    lastButtonTop.addEventListener('click', () => {
      currentPage = totalPages;
      fetchDataAndRender(currentPage);
    });
  
    const firstButtonBottom = firstButtonTop.cloneNode(true);
    const prevButtonBottom = prevButtonTop.cloneNode(true);
    const nextButtonBottom = nextButtonTop.cloneNode(true);
    const lastButtonBottom = lastButtonTop.cloneNode(true);
  
    // Remove the previous event listeners
    firstButtonBottom.removeEventListener('click', () => {
      currentPage = 1;
      fetchDataAndRender(currentPage);
    });
    prevButtonBottom.removeEventListener('click', () => {
      currentPage--;
      fetchDataAndRender(currentPage);
    });
    nextButtonBottom.removeEventListener('click', () => {
      currentPage++;
      fetchDataAndRender(currentPage);
    });
    lastButtonBottom.removeEventListener('click', () => {
      currentPage = totalPages;
      fetchDataAndRender(currentPage);
    });
  
    // Add new event listeners
    firstButtonBottom.addEventListener('click', () => {
      currentPage = 1;
      fetchDataAndRender(currentPage);
    });
    prevButtonBottom.addEventListener('click', () => {
      currentPage--;
      fetchDataAndRender(currentPage);
    });
    nextButtonBottom.addEventListener('click', () => {
      currentPage++;
      fetchDataAndRender(currentPage);
    });
    lastButtonBottom.addEventListener('click', () => {
      currentPage = totalPages;
      fetchDataAndRender(currentPage);
    });
  
    // Replace the old buttons in the DOM with the new ones
    paginationContainerTop.appendChild(firstButtonTop);
    paginationContainerTop.appendChild(prevButtonTop);
    paginationContainerTop.appendChild(nextButtonTop);
    paginationContainerTop.appendChild(lastButtonTop);
  
    paginationContainerBottom.appendChild(firstButtonBottom);
    paginationContainerBottom.appendChild(prevButtonBottom);
    paginationContainerBottom.appendChild(nextButtonBottom);
    paginationContainerBottom.appendChild(lastButtonBottom);
  }
  
}


function assetPage() {
  async function fetchAssetDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const asset = urlParams.get('asset');
    const cpid = urlParams.get('cpid');
    const tx_hash = urlParams.get('tx_hash');
    const stampNumber = urlParams.get('stampNumber');
  
    try {
      let assetData;
      const fetchUrl = new URL(apiBaseUrl);
      if (stampNumber) {
        fetchUrl.searchParams.append('stamp', stampNumber);
      } else if (asset || cpid) {
        fetchUrl.searchParams.append('cpid', asset || cpid);
      } else if (tx_hash) {
        fetchUrl.searchParams.append('tx_hash', tx_hash);
      }
      const resp = await fetch(fetchUrl);
      const json = await resp.json();
      if (json[0]) {
        assetData = json[0];
      }
  
      if (assetData) {
        displayAssetDetails(assetData);
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
    img.onerror = function() {
        this.onerror = null;
        this.src = 'images/sad.png';
    };
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
  
    const CreatorDetail = document.createElement('pre');
    CreatorDetail.innerHTML = `Creator: <span class="normal-case">${data.creator}</span>`; // Updated this line
    assetDetails.appendChild(CreatorDetail);

    const assetDetail = document.createElement('pre');
    assetDetail.innerText = `CPID: ${data.cpid}`;
    assetDetails.appendChild(assetDetail);

    const blockIndexDetail = document.createElement('pre');
    blockIndexDetail.innerText = `Block Index: ${data.block_index}`;
    assetDetails.appendChild(blockIndexDetail);

    const supplyDetail = document.createElement('pre');
    supplyDetail.innerText = `Supply: ${data.supply}`;
    assetDetails.appendChild(supplyDetail);

    const divisibleDetail = document.createElement('pre');
    divisibleDetail.innerText = `Divisible: ${data.divisible}`;
    assetDetails.appendChild(divisibleDetail);

    const lockedDetail = document.createElement('pre');
    lockedDetail.innerText = `Locked: ${data.locked}`;
    assetDetails.appendChild(lockedDetail);

    const txHashDetail = document.createElement('pre');
    txHashDetail.innerHTML = `BTC TX: <span class="normal-case">${data.tx_hash}</span>`; // Updated this line
    assetDetails.appendChild(txHashDetail);

    const blockChainExplorerLink = document.createElement('pre');
    const blockChainExplorerLinkAnchor = document.createElement('a');
    blockChainExplorerLinkAnchor.href = `https://www.blockchain.com/explorer/transactions/btc/${data.tx_hash}`;
    blockChainExplorerLinkAnchor.innerText = 'Blockchain.com Transaction Information';
    blockChainExplorerLink.appendChild(blockChainExplorerLinkAnchor);
    assetDetails.appendChild(blockChainExplorerLink);

    const xchainExplorerLink = document.createElement('pre');
    const xchainExplorerLinkAnchor = document.createElement('a');
    xchainExplorerLinkAnchor.href = `https://xchain.io/asset/${data.cpid}`;
    xchainExplorerLinkAnchor.innerText = 'Xchain.io Asset Information';
    xchainExplorerLink.appendChild(xchainExplorerLinkAnchor);
    assetDetails.appendChild(xchainExplorerLink);

    const txnDataLink = document.createElement('pre');
    const txnDataLinkAnchor = document.createElement('a');
    txnDataLinkAnchor.href = `https://jpja.github.io/Electrum-Counterparty/decode_tx.html?tx=${data.tx_hash}`;
    txnDataLinkAnchor.innerText = 'Txn Data Decoder';
    txnDataLink.appendChild(txnDataLinkAnchor);
    assetDetails.appendChild(txnDataLink);

    const mediaLink = document.createElement('pre');
    const mediaLinkAnchor = document.createElement('a');
    mediaLinkAnchor.href = `${data.stamp_url}`;
    mediaLinkAnchor.innerText = 'Binary Media';
    mediaLink.appendChild(mediaLinkAnchor);
    assetDetails.appendChild(mediaLink);

    assetContainer.appendChild(assetDetails);
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

    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchInput = document.getElementById('search-input');
      const searchValue = searchInput.value.trim();
      if (/^\d+$/.test(searchValue)) {
        window.location.href = `asset.html?stampNumber=${searchValue}`;
      } else if (isValidCpid(searchValue)) {
        window.location.href = `asset.html?asset=${searchValue}`;
      } else if (/^[a-fA-F0-9]{64}$/.test(searchValue)) {
        window.location.href = `asset.html?tx_hash=${searchValue}`;
      } else if (simpleValidateAddress(searchValue)) {
        window.location.href = `index.html?creator=${searchValue}`;
      } else {
        console.error('Invalid search input');
      }
    });
    

  } else if (currentPage === 'asset.html') {
    assetPage();
  }
}



// Call the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
