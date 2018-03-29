
const inputEl = document.getElementById('input-ip')
const btnEl = document.getElementById('btn-ip')
const resultEl = document.getElementById('result-ip')

btnEl.addEventListener('click', function() {
  const input = inputEl.value
  const result = convert(input)
  resultEl.innerText = result
  if ('textContent' in resultEl) {
    resultEl.textContent = result;
  } else {
      resultEl.innerText = result;
  }
})


