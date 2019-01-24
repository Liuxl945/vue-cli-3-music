import storege from "good-storage"

const SEARCH_KEY = "__search__"
const SEARCH_MAX_LENGTH = 15

/**
 * 
 * @param {Array}     arr 
 * @param {String}    val 
 * @param {Function}  compare 
 * @param {Number}    maxLen 
 */
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}


export function saveSearch(query) {
  let searches = storege.get(SEARCH_KEY, [])
  insertArray(searches, query, item => {
    return item === query
  }, SEARCH_MAX_LENGTH)

  storege.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  let searches = storege.get(SEARCH_KEY, [])
  return searches
}

export function deletSearch(query) {
  let searches = storege.get(SEARCH_KEY, [])
  deleteFromArray(searches, item => {
    return item === query
  })
  storege.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storege.remove(SEARCH_KEY)
  return []
}