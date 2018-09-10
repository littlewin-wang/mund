/**
 * @file Functions to get git info
 * @author littlewin(littlewin.wang@gmail.com)
 */

const fs = require('fs')
const path = require('path')
const iniparser = require('../common/iniPaser')

/**
 * Parse the current branch of a given project
 *
 * @param {String} base, the base file path of the project
 * @return {String} the current branch name
 */
export const parseBranch = (base) => {
  let headPath = path.join(base, '.git/HEAD')

  if (!fs.existsSync(headPath)) {
    throw new Error('.git/HEAD does not exist.')
  } else {
    let head = fs.readFileSync(headPath).toString()
    let match = /ref: refs\/heads\/([^\n]+)/.exec(head)

    return match ? match[1] : null
  }
}

/**
 * Parse the git url of a given project
 *
 * @param {String} base, the base file path of the project
 * @return {String} the git url
 */
export const parseUrl = (base) => {
  let configPath = path.join(base, '.git/config')

  if (!fs.existsSync(configPath)) {
    throw new Error('.git/config does not exist')
  } else {
    let data = iniparser.parseSync(configPath)

    return (data && data[`remote "origin"`] && data[`remote "origin"`]['url']) || null
  }
}
