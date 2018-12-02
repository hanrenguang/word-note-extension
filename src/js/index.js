// let changeColor = document.querySelector('p');

// changeColor.onclick = function() {
//   let color = 'rgb(0, 0, 0)';
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };
$('.add').click(e => {
  e.preventDefault()
  let formArea = {}

  $('form.add-box').serializeArray().forEach(item => {
    formArea[item.name] = item.value
  })
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

    $('form.search-box').get(0).reset()
  })
})
