let isSearch = window.location.search.split('=')[1] == 'true' ? 
                true :
                false

let flag = void 0
let word = null
let addEvent = () => {
  $('.display-word-box').show()
  $('.display-word').html(word[flag].word)
  $('.display-part-of-speech').html(word[flag].detailed[0])
  $('.dispaly-paraphrase').html(word[flag].detailed[1])

  $(document).keydown(e => {
    e = e || window.event

    if (e.keyCode == 37) { // left
      flag = flag > 0 ? --flag : 0
    } else if (e.keyCode == 39) { // right
      flag = flag == word.length-1 ? flag : ++flag
    }
    $('.display-word').html(word[flag].word)
    $('.display-part-of-speech').html(word[flag].detailed[0])
    $('.dispaly-paraphrase').html(word[flag].detailed[1])
  })
}

if (isSearch) {
  chrome.storage.sync.get('searchWord', data => {
    let wordInfo = data.searchWord
    $('.display-word-box').show()
    $('.display-word').html(wordInfo.word)
    $('.display-part-of-speech').html(wordInfo.paraphrase[0])
    $('.dispaly-paraphrase').html(wordInfo.paraphrase[1])
  })
} else {
  new Promise((resolve, reject) => {
    chrome.storage.sync.get('flag', res => {
      flag = res.flag
      resolve()
    })
  }).then(() => {
    chrome.storage.local.get('words', res => {
      word = res.words
      addEvent()
    })
  })
}
