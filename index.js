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