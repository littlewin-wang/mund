/**
 * @file vuex module of projects
 * @author littlewin(littlewin.wang@gmail.com)
 */

import db from '@/../db/index'

const state = {
  list: db.read().get('projects').value(),
  tags: []
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
  },

  ADD_TAG (state, tag) {
    if (!state.tags.find(t => t === tag)) {
      state.tags.push(tag)
    }
  },

  RM_TAG (state, tag) {
    let index = state.tags.findIndex(t => t === tag)

    if (index !== -1) {
      state.tags.splice(index, 1)
    }
  }
}

const actions = {
  addProject ({ commit }, project) {
    commit('ADD_PROJECT', project)
  },

  rmProject ({ commit }, project) {
    commit('RM_PROJECT', project)
  },

  addTag ({ commit }, tag) {
    commit('ADD_TAG', tag)
  },

  rmTag ({ commit }, tag) {
    commit('RM_TAG', tag)
  }
}

export default {
  state,
  mutations,
  actions
}
