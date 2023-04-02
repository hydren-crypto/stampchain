// Set the current page and items per page
let currentPage = 1;
const itemsPerPage = 2000;

function indexPage() {
  fetchDataAndRender(currentPage);

  function fetchDataAndRender(page) {
    fetch('https://stampchain.io/stamp.json')
      .then(response => response.json())
      .then(data => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);
        renderData(pageData);
        renderPaginationButtons(page, data.length);
      })
      .catch(error => console.error(error));
  }

  function renderData(data) {
    const dataContainer = document.getElementById('data-container');
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

      const txHashInfo = document.createElement('pre');
      const truncatedTxHash = `${item.tx_hash.slice(0, 5)}...${item.tx_hash.slice(-5)}`;
      txHashInfo.innerText = `Tx Hash: ${truncatedTxHash}`;
      itemContainer.appendChild(txHashInfo);

      const viewMoreBtn = document.createElement('button');
      viewMoreBtn.innerText = 'View More';
      viewMoreBtn.addEventListener('click', () => window.location.href = `asset.html?stampNumber=${item.stamp}`);
      itemContainer.appendChild(viewMoreBtn);
      dataContainer.appendChild(itemContainer);
    });
  }

  function renderPaginationButtons(page, totalItems) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const prevButton = document.createElement('button');
    prevButton.innerText = '< Next';
    prevButton.disabled = page === 1;
    prevButton.addEventListener('click', () => {
      currentPage--;
      fetchDataAndRender(currentPage);
    });

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Previous >';
    nextButton.disabled = page === totalPages;
    nextButton.addEventListener('click', () => {
      currentPage++;
      fetchDataAndRender(currentPage);
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
  }
}

function assetPage() {
  // ...
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
