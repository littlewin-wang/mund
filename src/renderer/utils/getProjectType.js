/**
 * @file Get the type of project
 * @author littlewin(littlewin.wang@gmail.com)
 */

const hasModule = (entries, mod) => entries.find(([name]) => name === mod)
// const hasModuleThatContains = (entries, mod) => entries.find(([name]) => name.includes(mod))

// eslint-disable-next-line
const Project_Type_Enum = {
  VUE: {
    type: 'vue',
    color: '#19be6b',
    check: (entries) => {
      return hasModule(entries, 'vue')
    }
  },
  REACT: {
    type: 'react',
    color: '#67daf9',
    check: (entries) => {
      return hasModule(entries, 'react') && hasModule(entries, 'react-dom')
    }
  },
  REACT_NATIVE: {
    type: 'react_native',
    color: '#67daf9',
    check: entries => {
      return hasModule(entries, 'react-native')
    }
  },
  ANGULAR: {
    type: 'angular',
    color: '#67daf9',
    check: entries => {
      return hasModule(entries, 'angular')
    }
  },
  KOA: {
    type: 'koa',
    color: '#495060',
    check: entries => {
      return hasModule(entries, 'koa')
    }
  },
  EXPRESS: {
    type: 'express',
    color: '#495060',
    check: entries => {
      return hasModule(entries, 'express')
    }
  },
  ELECTRON: {
    type: 'electron',
    color: '#5cadff',
    check: entries => {
      return hasModule(entries, 'electron')
    }
  }
}

export default (packageJson, isWebProject, projectUrl) => {
  if (!packageJson) {
    return [Project_Type_Enum['UNKNOWN']]
  }

  const { dependencies = {}, devDependencies = {} } = packageJson
  const entries = [...Object.entries(dependencies), ...Object.entries(devDependencies)]

  let types = []

  // eslint-disable-next-line
  for (let type in Project_Type_Enum) {
    if (Project_Type_Enum[type].check(entries)) {
      types.push(Project_Type_Enum[type])
    }
  }

  return types.length ? types : [{
    type: 'unknown',
    color: '#ff9900'
  }]
}
