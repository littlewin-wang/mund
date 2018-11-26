/**
 * @file Get the color RGB str based on string input
 * @author littlewin(littlewin.wang@gmail.com)
 */

const hashCode = (str) => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  return hash
}

const intToRGB = (i) => {
  let c = (i & 0x00CCCCCC).toString(16).toUpperCase()
  return '00000'.substring(0, 6 - c.length) + c
}

export default (word) => {
  return '#'.concat(intToRGB(hashCode(word)))
}
