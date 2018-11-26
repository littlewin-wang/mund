/**
 * @file Time Filters
 * @author littlewin(littlewin.wang@gmail.com)
 */

// 取剩余秒
const pluralize = (time, label) => {
  return time + label + 'after'
}

// 相对时间过滤器，传入时间，返回距离今天有多久
export const timeLeft = time => {
  time = time instanceof Date ? time : new Date(Number(time))

  const left = Number(time) / 1000 - Date.now() / 1000

  if (left <= 0) {
    return 'Already passed'
  }

  if (left < 3600) {
    if (Object.is(~~(left / 60), 0)) {
      return 'Soon'
    }
    return pluralize(~~(left / 60), ' minutes ')
  } else if (left < 86400) {
    return pluralize(~~(left / 3600), ' hours ')
  } else {
    return pluralize(~~(left / 86400), ' days ')
  }
}

// 相对时间过滤器，传入时间，返回距离今天有多久
export const timeAgo = time => {
  time = time instanceof Date ? time : new Date(time)

  const between = Date.now() / 1000 - Number(time) / 1000

  if (between < 3600) {
    if (Object.is(~~(between / 60), 0)) {
      return 'Not long ago'
    }
    return ~~(between / 60) + ' minutes before'
  } else if (between < 86400) {
    return ~~(between / 3600) + ' hours before'
  } else {
    return ~~(between / 86400) + ' days before'
  }
}
