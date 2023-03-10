require("crypto-js")

const decrypt = function (data) {
  let key = CryptoJS.enc.Utf8.parse('abcdefabacadaeaf')
  let iv = CryptoJS.enc.Utf8.parse('abcdefabacadaeaf')
  decrypted = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

//搜索
const search = (key) => {
  let response = POST("https://www.fx896.com/book/search",{data:`sn=${key}`})
  let array = []
  let $ = HTML.parse(response)
  $('div.book_item').forEach((child) => {
    let $ = HTML.parse(child)
    array.push({
      name: $('a.book_name').text(),
      author: $('a.book_author').text(),
      cover: $('img').attr('src'),
      detail: `https://www.fx896.com${$('a.book_name').attr('href')}`,
    })
  })
  return JSON.stringify(array)
}

//详情
const detail = (url) => {
  let response = GET(url)
  let $ = HTML.parse(response)
  let book = {
    summary: $('.introduce').text(),
    catalog: url
  }
  return JSON.stringify(book)
}

//目录
const catalog = (url) => {
  let response = GET(url)
  let $ = HTML.parse(response)
  let array = []
  $('.clear:nth-child(5) > div:nth-child(n+2)').forEach((chapter) => {
    let $ = HTML.parse(chapter)
    array.push({
      name: $("a").text(),
      url: `https://www.fx896.com${$("a").attr("href")}`
    })
  })
  return JSON.stringify(array)
}

//章节
const chapter = (url) => {
  let $ = HTML.parse(GET(url))
  let txt = $("input#a").attr("value")
  return decrypt(txt)
}

var bookSource = JSON.stringify({
  name: "汇商阅读",
  url: "fx896.com",
  version: 101
})