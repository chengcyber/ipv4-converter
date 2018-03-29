
const inputEl = document.getElementById('input-ip')
const btnEl = document.getElementById('btn-ip')

function print(content) {
  const resultEl = document.getElementById('result-ip')
  if ('textContent' in resultEl) {
    resultEl.textContent = content;
  } else {
      resultEl.innerText = content;
  }
}

btnEl.addEventListener('click', function() {
  const input = inputEl.value
  print('')
  try {
    const result = convert(input)
    print(result)
  } catch(e) {
    print(e.name + ': ' + e.message)
  }
})


