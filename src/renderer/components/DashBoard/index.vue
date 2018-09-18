<template>
  <div class="container">
    <div class="projects" v-if="projects.length">
      <div class="control">
        <div class="left">
          <Dropdown @on-click="changeProject" style="font-size: 14px;">
            <a href="javascript:void(0)">
              {{ project || 'Projects' }}
              <Icon type="chevron-down"></Icon>
            </a>
            <DropdownMenu slot="list" >
              <DropdownItem name="Projects">Projects</DropdownItem>
              <DropdownItem name="vue-cli">vue-cli</DropdownItem>
              <DropdownItem name="create-react-app">create-react-app</DropdownItem>
              <DropdownItem name="express-demo">express-demo</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div class="count" style="color: #9b9b9b">
            <span>{{ total }}</span> Total
          </div>
        </div>
        <div class="right">
          <Input v-model="search" size="small" icon="ios-search" placeholder="Search For..." style="width: 200px" />
          <div class="action">
            <Button type="primary" icon="ios-lightbulb" size="small">Active Project</Button>
            <Dropdown @on-click="importProject" trigger="click" placement="bottom-end" style="font-size: 14px;">
              <a href="javascript:void(0)">
                <Button type="success" icon="android-add" size="small" style="margin-left: 10px">New Project</Button>
              </a>
              <DropdownMenu slot="list" >
                <DropdownItem name="local">Import Local Project</DropdownItem>
                <DropdownItem name="github">Import Github Project</DropdownItem>
                <DropdownItem name="app">Create App</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="header">
          <Row type="flex" align="middle" style="color: #9b9b9b; height: 40px;">
            <Col span="2">Type</Col>
            <Col span="5" style="cursor: pointer">
              <span @click="handleReverse('name')">Project Name <Icon :type="name?'chevron-down':'chevron-up'"></Icon></span>
            </Col>
            <Col span="5">Keywords</Col>
            <Col span="4" style="cursor: pointer">
              <span @click="handleReverse('modify')"> Last Modified <Icon :type="modify?'chevron-down':'chevron-up'"></Icon></span>
            </Col>
            <Col span="7">NPM Script</Col>
            <Col span="1"></Col>
          </Row>
        </div>
        <div class="list">
          <div class="container">
            <Item class="item" v-for="(params, index) in projects" :params="params" :key="params.path" :class="{ 'is-odd' : index % 2 }" @update="updateProject" @delete="projects.splice(index, 1)"></Item>
          </div>
        </div>
        <div class="pagination">
          <Page :current="1" :total="50" simple size="small"></Page>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <div class="image">
        <img src="@/assets/desktop.png" alt="No Project...">
      </div>
      <h2>Looks like you don't have ant projects.</h2>
      <p>Let's fix that by importing a new project.</p>
      <Dropdown @on-click="importProject" trigger="click" placement="bottom-end" style="font-size: 14px;">
        <a href="javascript:void(0)">
          <Button type="success" icon="android-add" style="margin-left: 10px">New Project</Button>
        </a>
        <DropdownMenu slot="list" >
          <DropdownItem name="local">Import Local Project</DropdownItem>
          <DropdownItem name="github">Import Github Project</DropdownItem>
          <DropdownItem name="app">Create App</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Item from './Item/index'
import { parseBranch, parseUrl } from '@/utils/git/info'
import getType from '@/utils/getProjectType'

const { ipcRenderer } = require('electron')
const dialog = require('electron').remote.dialog
const path = require('path')
const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

export default {
  name: 'dashboard',
  components: {
    Item
  },
  data () {
    return {
      project: '',
      total: 3,
      search: '',
      name: true,
      modify: true,
      projects: []
    }
  },
  methods: {
    changeProject (name) {
      this.project = name
    },

    // reverse list
    handleReverse (type) {
      if (type && this.hasOwnProperty(type)) {
        this[type] = !this[type]
      }
    },

    // import project
    importProject (type) {
      if (type === 'local') {
        // open the file dialog
        dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] }, (filename) => {
          if (filename.length) {
            filename.forEach(name => {
              // init project params
              let params = {}
              params.path = name

              // retrieve git infomations
              params.git = {
                branch: parseBranch(name),
                url: parseUrl(name)
              }

              // retrieve stat infomations
              params.stat = fs.statSync(name)

              // retrieve npm infomations
              if (!fs.existsSync(name.concat('/package.json'))) {
                throw new Error(`${name} is not a npm project.`)
              } else {
                params.package = JSON.parse(fs.readFileSync(name.concat('/package.json'), 'utf-8'))
              }

              // retrieve all infomation correctly
              if (params.stat && params.package) {
                params.types = getType(params.package)
                this.projects.push(params)

                // add monitor
                ipcRenderer.send('watch_directory', name)

                ipcRenderer.on('update_package', (event, params) => {
                  let project = this.projects.find(p => p.path === params.path)

                  if (project) {
                    project.package = JSON.parse(params.content)
                  }
                })
              } else {
                this.$Message.warning(`This directory's infomation is not correct. Check it please.`)
              }
            })
          }
        })
      }
    },

    // modify project infomation
    updateProject (params) {
      if (params.name && params.file && params.hasOwnProperty('content')) {
        // file exist ?
        if (!fs.existsSync(path.join(params.name, params.file))) {
          throw new Error(`${name} doesn't have ${params.file}`)
        } else {
          let project = this.projects.find(p => p.path === params.name)

          if (params.file === 'package.json') {
            // update file. first write then read
            writeFile(path.join(params.name, params.file), JSON.stringify(params.content, null, 2))
              .then(() => readFile(params.name.concat('/package.json'), 'utf-8'))
              .then((data) => { project.package = JSON.parse(data) })
              .catch((err) => { throw err })

            // fs.writeFileSync(path.join(params.name, params.file), JSON.stringify(params.content, null, 2))
            // // update project after writing
            // project.package = JSON.parse(fs.readFileSync(params.name.concat('/package.json')))
          } else {
            this.$Message.warning(`Do not support modification on ${params.file} now.`)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    .projects {
      .control {
        height: 40px;
        display: flex;
        .left {
          height: 100%;
          flex: 0 0 50%;
          display: flex;
          align-items: center;
          .count {
            margin-left: 10px;
          }
        }
        .right {
          height: 100%;
          flex: 0 0 50%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .action {
            margin-left: 20px;
          }
        }
      }
      .main {
        padding: 10px 0;
        .header {
          padding: 0 10px;
        }
        .list {
          position: relative;
          width: 100%;
          height: 500px;
          overflow: hidden;
          .container {
            position: absolute;
            left: 0;
            top: 0;
            right: -15px;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            .item {
              background: #34344D;
            }
            .is-odd {
              background: #3B3B56;
            }
          }
        }
        .pagination {
          float: right;
          margin-top: 4px;
        }
      }
    }
    .empty {
      padding-top: 100px;
      text-align: center;
      .image {
        margin: 0 auto;
        width: 300px;
        img {
          width: 100%;
        }
      }
      h2 {
        margin: 10px 0;
      }
      p {
        font-size: 13px;
        color: #9b9b9b;
        margin-bottom: 20px;
      }
    }
  }
</style>
