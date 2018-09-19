/**
 * @file vuex module of projects
 * @author littlewin(littlewin.wang@gmail.com)
 */

import db from '@/../db/index'

const state = {
  list: db.read().get('projects').value()
}

const mutations = {
  ADD_PROJECT (state, project) {
    if (!state.list.find(item => item === project)) {
      state.list.push(project)
      db.read().set('projects', state.list).write()
    }
  },

  RM_PROJECT (state, project) {
    let index = state.list.findIndex(item => item === project)

    if (index !== -1) {
      state.list.splice(index, 1)
      db.read().set('projects', state.list).write()
    }
  }
}

const actions = {
  addProject ({ commit }, project) {
    commit('ADD_PROJECT', project)
  },

  rmProject ({ commit }, project) {
    commit('RM_PROJECT', project)
  }
}

export default {
  state,
  mutations,
  actions
}
