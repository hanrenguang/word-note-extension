let isSearch = window.location.search.split('=')[1] == 'true' ? 
                true :
                false

if (isSearch) {
  chrome.storage.sync.get('searchWord', data => {
    let wordInfo = data.searchWord
    console.log(wordInfo)
    $('.display-word-box').show()
    $('.display-word').html(wordInfo.word)
    $('.display-part-of-speech').html(wordInfo.paraphrase[0])
    $('.dispaly-paraphrase').html(wordInfo.paraphrase[1])
  })
}
