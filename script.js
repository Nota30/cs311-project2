const BASE_URL = 'https://randomlexicon.com/api/';

const generateBtn = document.getElementById('generate');
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const messageField = document.getElementById('message');
const wordsField = document.getElementById('words');

generateBtn.addEventListener('click', fetchWords);
searchBtn.addEventListener('click', searchWord);

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchWords() {
  messageField.textContent = 'generating....';
  wordsField.innerHTML = '';
  try {
    for (let i = 0; i < 20; i++) {
      const response = await fetch(BASE_URL + 'random-definition');
      const data = await response.json();

      const row = document.createElement('div');
      row.className = 'row';

      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = data.word;

      const content = document.createElement('div');

      const pos = document.createElement('a');
      pos.className = 'word';
      pos.textContent = data.pos;

      const text = document.createElement('p');
      text.textContent = data.definition;

      content.append(pos, text);
      row.append(label, content);
      wordsField.appendChild(row);

      await timer(500); // there is a timer here because i didn't want to abuse the API too much
    }
  } catch (err) {
    message.textContent = `an errror occured: ${err}`;
    message.className = 'error';
    return;
  }

  messageField.textContent = 'All 20 words have been generated';
}

async function searchWord() {
  wordsField.innerHTML = '';
  const input = searchInput.value;

  if (input === '') {
    message.textContent = 'no word was entered...';
    message.className = 'error';
    return;
  }

  message.textContent = 'searching...';
  message.className = '';

  try {
    const response = await fetch(
      BASE_URL + 'words/' + encodeURIComponent(input),
    );
    const data = await response.json();

    if (data.entries.length == 0) {
      message.textContent = "word coudn't be found...";
      message.className = 'error';
      return;
    }

    message.textContent = `Results for "${input}"`;
    message.className = '';

    data.entries.forEach((entry) => {
      const row = document.createElement('div');
      row.className = 'row';

      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = entry.pos;

      const content = document.createElement('div');

      const pos = document.createElement('a');
      pos.className = 'word';
      pos.textContent = entry.definitions[0].definition;

      content.append(pos);
      row.append(label, content);
      wordsField.appendChild(row);
    });
  } catch (err) {
    message.textContent = `an errror occured: ${err}`;
    message.className = 'error';
    return;
  }
}
