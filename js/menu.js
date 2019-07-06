const dropDownButton = document.querySelector('#dropdown-button');
const dropDownMenu = document.querySelector('#dropdown-menu');
const dropDownItem = document.querySelectorAll('#dropdown-menu li');
const searchButton = document.querySelector('#search-button');
const searchBox = document.querySelector('#search-box');

document.addEventListener('DOMContentLoaded', () => {
  dropDownButton.addEventListener('click', () => dropDownMenu.style.display = 'block');

  dropDownItem.forEach(item => {
    item.addEventListener('click', () => {
      let { value } = item.attributes.value;
      dropDownButton.innerText = item.innerText;
      dropDownMenu.style.display = 'none';
    });
  });
  
  searchButton.addEventListener('click', search);
  document.addEventListener('keyup', e => {
    if (e.which == 13) search();
  });
});

function search() {
	let type = dropDownButton.innerText;
  let query = searchBox.value;
  let commonToAll = `
    -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml)
    -inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)
    intitle:\"index.of./\"
  `;

  const extensions = {
    'Video': '(avi|mkv|mov|mp4|mpg|wmv)',
    'Audio': '(ac3|flac|m4a|mp3|ogg|wav|wma)',
    'Ebook': '(CBZ|CBR|CHM|DOC|DOCX|EPUB|MOBI|ODT|PDF|RTF|txt)',
    'Pictures': '(bmp|gif|jpg|png|psd|tif|tiff)',
    'Software/Games': '(apk|exe|iso|rar|tar|zip)',
    'Compressed': '(apk|exe|iso|rar|tar|zip|7z)'
  }

  let searchTerms = query.split(',');
  searchTerms = searchTerms.map(term => `intext:"${term.trim()}"`).join(' ');

  let finalquery = `${searchTerms} ${extensions[type]} ${commonToAll}`;

  let url = `https://www.google.com/search?q=${encodeURIComponent(finalquery)}`;

  window.open(url, '_blank');
}