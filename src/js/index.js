let verify = formData => {
  let result = true

  if (!formData.word.trim()) result = false
  else if (!formData['part-of-speech'].trim()) result = false
  else if (!formData.paraphrase.trim()) result = false

  return result
}

let showMsg = msg => {
  $('.show-msg').html(msg)
  setTimeout(() => {
    $('.show-msg').html('')
  }, 3000)
}

$('.add').click(e => {
  e.preventDefault()
  let formArea = {}

  $('form.add-box').serializeArray().forEach(item => {
    formArea[item.name] = item.value
  })

  if (!verify(formArea)) {
    showMsg('verify faild')
    return
  }

  formArea['part-of-speech'] = formArea['part-of-speech'] + '.'

  $.post('http://localhost:8888/add', formArea, res => {
    if (!res.status) {
      console.log(msg)
    }

    $('form.add-box').get(0).reset()
    $('.word').focus()
  })
})

$('.search').click(e => {
  e.preventDefault()
  let word = $('.search-input').val()

  $.post('http://localhost:8888/search', {
    word: word
  }, res => {
    if (!res.status) {
      console.log(msg)
      return
    }

    // TODO show search result
    let wordInfo = res.wordInfo

    if (wordInfo) {
      chrome.storage.sync.set({
        searchWord: wordInfo
      }, () => {
        window.location.href = './word.html?isSearch=true'
      })
    } else {
      showMsg('word not found')
    }

    $('form.search-box').get(0).reset()
  })
})

$.post('http://localhost:8888/getOne', {}, res => {
  if (res.status == 1) {
    chrome.storage.local.set({words: res.wordInfo}, () => {})

    chrome.storage.sync.set({flag: 0}, () => {
      console.log('set')
    })
  }
})
