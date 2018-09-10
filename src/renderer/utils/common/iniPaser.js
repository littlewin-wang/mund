/**
 * @file Functions to parse ini file
 * @author littlewin(littlewin.wang@gmail.com)
 */

/*
 * get the file handler
 */
const fs = require('fs')

/*
 * define the possible values:
 * section: [section]
 * param: key=value
 * comment: ;this is a comment
 */
const regex = {
  section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
  // eslint-disable-next-line
  param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
  comment: /^\s*;.*$/
}

/*
 * parses a .ini file
 * @param: {String} file, the location of the .ini file
 * @param: {Function} callback, the function that will be called when parsing is done
 * @return: none
 */
function parse (data) {
  let value = {}
  let lines = data.split(/\r\n|\r|\n/)
  let section = null

  lines.forEach(function (line) {
    if (regex.param.test(line)) {
      let match = line.match(regex.param)
      if (section) {
        value[section][match[1]] = match[2]
      } else {
        value[match[1]] = match[2]
      }
    } else if (regex.section.test(line)) {
      let match = line.match(regex.section)
      value[match[1]] = {}
      section = match[1]
    } else if (line.length === 0 && section) {
      section = null
    }
  })

  return value
}

module.exports.parse = function (file, callback) {
  if (!callback) {
    return
  }
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      callback(err)
    } else {
      callback(null, parse(data))
    }
  })
}

module.exports.parseSync = function (file) {
  return parse(fs.readFileSync(file, 'utf8'))
}

module.exports.parseString = parse
