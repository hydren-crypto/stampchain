// Set the current page and items per page
let currentPage = 1;
const itemsPerPage = 500;
const apiBaseUrl = 'https://stampchain.io/api/v2/stamps';
let totalNumberOfStamps = 0;

function simpleValidateAddress(address) {
  return /^1|^3|^bc1q/.test(address);
}

function isValidCpid(cpid) {
  return /^A\d+$/.test(cpid);
}


// Main index page function

function indexPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const creatorAddress = urlParams.get('creator');
  const dropdownValue = urlParams.get('dropdown');

  const dropdown = document.getElementById('query-select'); // Correct the ID here
  const searchForm = document.getElementById('search-form');

  // Event listeners
  dropdown.addEventListener('change', () => {
    currentPage = 1; // Reset to the first page
    fetchDataAndRender(currentPage, creatorAddress, dropdown.value);
  });
  
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim();
    fetchDataAndRender(currentPage, searchValue, dropdown.value);
  });
  
  // Fetch and render data
  fetchDataAndRender(currentPage, creatorAddress, dropdownValue);

  function fetchDataAndRender(page, creator, dropdownValue) {
    let apiUrl = `${apiBaseUrl}?page=${page}&limit=${itemsPerPage}&sort_order=desc`;
  
    if (creator) {
      apiUrl += `&creator=${creator}`;
    }
  
    // Use the ident parameter for filtering
    if (dropdownValue && dropdownValue !== "ALL") {
      apiUrl += `&ident=${dropdownValue}`;
    }

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (currentPage === 1) {
          totalNumberOfStamps = data.total;
        }

        renderData(data.data);
        renderPaginationButtons(page, data.totalPages, dropdownValue, creatorAddress);
      })
      .catch(error => console.error(error));
  }

  function renderData(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';
  
    data.forEach((item) => {
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('item');
  
      if (item.stamp_url) {
        const contentContainer = document.createElement('a'); // Create a container that's clickable
        contentContainer.href = `asset.html?tx_hash=${item.tx_hash}`; // Set the URL you want to navigate to
  
        // Check if the URL is an HTML file
        if (item.stamp_url.endsWith('.html')) {
          // Embed HTML content using an iframe or a div
          const iframe = document.createElement('iframe');
          iframe.src = item.stamp_url;
          iframe.width = '210'; // Set width as needed
          iframe.height = '210'; // Set height as needed
          iframe.style.border = 'none'; // Optional: remove border
          iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          contentContainer.appendChild(iframe);
        } else {
          // Use an img tag for images
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
          contentContainer.appendChild(img);
        }
  
        itemContainer.appendChild(contentContainer); // Append the content container to the itemContainer
      }
  
      const stampInfo = document.createElement('pre');
      stampInfo.innerText = (String(item.stamp) === '999999999') ? 'Stamp:  \u221E' : `Stamp ${item.stamp}`;
      itemContainer.appendChild(stampInfo);

      const creatorInfo = document.createElement('pre');
      creatorInfo.classList.add('creator-info'); // Add a new class for specific styling
      const displayedCreator = item.creator_name ? item.creator_name : `${item.creator.slice(0, 5)}...${item.creator.slice(-5)}`;
      creatorInfo.innerHTML = `Creator: <span class="normal-case">${displayedCreator}</span>`;
      itemContainer.appendChild(creatorInfo);
  
      dataContainer.appendChild(itemContainer);
    });
  }


  function renderPaginationButtons(page, numberOfItems, dropdownValue, creatorAddress) {
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
      fetchDataAndRender(currentPage, creatorAddress, dropdownValue);
    });
  
    const prevButtonTop = document.createElement('button');
    prevButtonTop.innerText = '< Previous';
    prevButtonTop.disabled = page === 1;
    prevButtonTop.addEventListener('click', () => {
      currentPage--;
      fetchDataAndRender(currentPage, creatorAddress, dropdownValue);
    });
  
    const nextButtonTop = document.createElement('button');
    nextButtonTop.innerText = 'Next >';
    nextButtonTop.disabled = page === totalPages;
    nextButtonTop.addEventListener('click', () => {
      currentPage++;
      fetchDataAndRender(currentPage, creatorAddress, dropdownValue);
    });
  
    const lastButtonTop = document.createElement('button');
    lastButtonTop.innerText = 'Last >>';
    lastButtonTop.disabled = page === totalPages;
    lastButtonTop.addEventListener('click', () => {
      currentPage = totalPages;
      fetchDataAndRender(currentPage, creatorAddress, dropdownValue);
    });
  
    const firstButtonBottom = firstButtonTop.cloneNode(true);
    const prevButtonBottom = prevButtonTop.cloneNode(true);
    const nextButtonBottom = nextButtonTop.cloneNode(true);
    const lastButtonBottom = lastButtonTop.cloneNode(true);


    // Add new event listeners
    firstButtonBottom.addEventListener('click', () => {
      currentPage = 1;
      fetchDataAndRender(currentPage, creatorAddress, dropdownValue);
    });
    prevButtonBottom.addEventListener('click', () => {
      currentPage--;
      fetchDataAndRender(currentPage, creatorAddress, dropdownValue);
    });
    nextButtonBottom.addEventListener('click', () => {
      currentPage++;
      fetchDataAndRender(currentPage, creatorAddress, dropdownValue);
    });
    lastButtonBottom.addEventListener('click', () => {
      currentPage = totalPages;
      fetchDataAndRender(currentPage, creatorAddress, dropdownValue);
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
      if (json.data) {
        assetData = json.data;
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
    const grid = document.createElement('div');
    grid.id = 'asset-details-grid';

    // Check if the URL is an HTML file
    if (data.stamp_url.endsWith('.html')) {
      // Create an iframe to embed the HTML content
      const iframe = document.createElement('iframe');
      iframe.src = data.stamp_url;
      iframe.width = '420'; // You can set width as needed
      iframe.height = '420'; // You can set height as needed
      iframe.style.border = 'none'; // Optional: remove border
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
      assetContainer.appendChild(iframe);
    } else {
      // If it's not an HTML file, assume it's an image
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
    }

    // Create a grid container for asset details
    const gridContainer = document.createElement('div');
    gridContainer.id = 'asset-details-grid'; // Use the ID for styling
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = '1fr'; // One-column layout
    gridContainer.style.gap = '10px'; // Space between grid items
    gridContainer.style.textAlign = 'left';
    gridContainer.style.maxWidth = '420px';
    gridContainer.style.margin = 'auto';
  
    // Function to create grid items
    function createGridItem(label, value) {
      const item = document.createElement('div');
      item.className = 'grid-item';
      item.innerText = `${label}: ${value}`;
      return item;
    }
    // Adding grid items
    gridContainer.appendChild(createGridItem('STAMP', data.stamp === '999999999' ? '\u221E' : data.stamp));
    if (data.creator_name) {
      gridContainer.appendChild(createGridItem('CREATOR NAME', data.creator_name));
    }
    gridContainer.appendChild(createGridItem('CREATOR', data.creator));
    gridContainer.appendChild(createGridItem('CPID', data.cpid));
    gridContainer.appendChild(createGridItem('BLOCK INDEX', data.block_index));
    gridContainer.appendChild(createGridItem('SUPPLY', data.supply));
    gridContainer.appendChild(createGridItem('DIVISIBLE', data.divisible));
    gridContainer.appendChild(createGridItem('LOCKED', data.locked));
    gridContainer.appendChild(createGridItem('BTC TX', data.tx_hash));
  
    // Adding links
    const addLink = (label, url) => {
      const link = document.createElement('a');
      link.href = url;
      link.innerText = label;
      link.style.display = 'block'; // Ensure each link is on a new line
      gridContainer.appendChild(link);
    };
  
    addLink('BLOCKCHAIN.COM TRANSACTION INFORMATION', `https://www.blockchain.com/explorer/transactions/btc/${data.tx_hash}`);
    addLink('bitSTART ASSET INFORMATION', `https://bitst.art/${data.tx_hash}`);
    addLink('TXN DATA DECODER', `https://jpja.github.io/Electrum-Counterparty/decode_tx.html?tx=${data.tx_hash}`);
    addLink('BINARY MEDIA', data.stamp_url);
  
    // Append the grid container to assetContainer
    assetContainer.appendChild(gridContainer);
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


// Initialize the correct page
function init() {
  const currentPageName = document.location.pathname.split('/').pop();

  if (currentPageName === 'index.html' || currentPageName === '') {
    indexPage();
  } else if (currentPageName === 'asset.html') {
    assetPage();
  }
}

// Set up event listeners and any other initialization logic
function setUpEventListeners() {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchInput = document.getElementById('search-input');
      const searchValue = searchInput.value.trim();
      // Add your search validation and redirection logic here
      // For example:
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
  }
}

// Call the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  init();
  setUpEventListeners();
});