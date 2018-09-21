/**
 * @file Search Filters
 * @author littlewin(littlewin.wang@gmail.com)
 */

// 根据 keyword 输出 filter 后的list
export const search = (list, keyword) => {
  return list.filter(l => l.split('/').pop().toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
}
