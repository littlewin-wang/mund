<template>
  <div class="item" :class="{ 'is-expand': isExpand }">
    <Row class="basic" type="flex" align="middle">
      <Col span="2">
        <Tooltip :content="params.types[0].type" placement="right">
          <div class="type" :style="{ backgroundColor: params.types[0].color }">
            {{ params.types[0].type.charAt(0).toUpperCase() }}
          </div>
        </Tooltip>
      </Col>
      <Col span="5">
        <h5 style="font-size: 14px;">{{ params.package.name }}</h5>
        <span v-if="isExpand" style="font-size: 12px; color: #9b9b9b">Last Modified: {{ params.stat.mtime | timeAgo }}</span>
      </Col>
      <Col span="5">
        <div v-if="!isExpand">
          <Tag closable :color="tagColor(tag)" :name="tag" v-for="tag in params.tags.slice(0, 2)" @on-close="handleDeleteTag">{{ tag }}</Tag>
          <Tooltip placement="right-start" v-if="params.tags.length > 2">
            <Tag type="border">+{{ params.tags.length - 2 }}</Tag>
            <div slot="content" style="white-space: pre-wrap; width: 200px;">
              <Tag closable :color="tagColor(tag)" :name="tag" v-for="tag in params.tags.slice(2)" @on-close="handleDeleteTag">{{ tag }}</Tag>
            </div>
          </Tooltip>
        </div>
      </Col>
      <Col span="4">
        <span v-if="!isExpand">{{ params.stat.mtime | timeAgo }}</span>
      </Col>
      <Col span="7">
        <div v-if="!isExpand">
          <Button class="cmd-button" :type="typeColor(script)" size="small" v-for="script in Object.keys(params.package.scripts).slice(0, 3)">{{ script }}</Button>
        </div>
      </Col>
      <Col span="1">
        <Button size="small" type="ghost" shape="circle" :icon="isExpand ? 'chevron-up' : 'chevron-down'" @click="isExpand=!isExpand"></Button>
      </Col>
    </Row>
    <div class="detail" v-if="isExpand">
      <div class="line"></div>
      <Row type="flex" justify="center">
        <Col span="20" class="project-content">
          <div class="left">
            <div class="desc">
              <span>
                {{ params.package.description }}
              </span>
              <Icon type="edit" style="margin-left: 4px;"></Icon>
            </div>
            <div class="version">
              <Icon class="icon" color="#2d8cf0" size="18" type="ios-information"></Icon>
              <span>{{ params.package.version }}</span>
            </div>
            <div class="git">
              <Icon class="icon" size="18" type="social-github"></Icon>
              <a>{{ params.git.url }}</a>
              <Icon class="icon" size="18" type="network"></Icon>
              <span>{{ params.git.branch }}</span>
            </div>
            <div class="license">
              <Icon class="icon" color="#ff9900" size="18" type="locked"></Icon>
              <span>{{ params.package.license }}</span>
            </div>
          </div>
          <div class="line">
          </div>
          <div class="right">
            <div class="tag">
              <h5>Tags</h5>
              <Tag class="tag-item" closable :color="tagColor(tag)" :name="tag" v-for="tag in params.tags" @on-close="handleDeleteTag">{{ tag }}</Tag>
              <AutoComplete
                class="tag-item"
                v-model="newTag"
                :data="['study', 'demo', 'work', 'develop']"
                :filter-method="filterMethod"
                placeholder="input tag"
                size="small"
                icon="plus"
                @keyup.enter.native="handleAddTag(newTag)"
                @on-select="handleAddTag"
                style="width: 80px">
              </AutoComplete>
            </div>
            <div class="script">
              <h5>NPM Script</h5>
              <div class="list">
                <Tooltip placement="top-end" v-for="(cmd, key) in params.package.scripts">
                  <Button class="script-item">{{ key }}</Button>
                  <div slot="content">
                    <div class="script-cmd" style="width: 200px; white-space: pre-wrap;">{{ cmd }}</div>
                  </div>
                </Tooltip>
                <Button class="script-item" icon="ios-plus-empty" type="dashed">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Button type="error" long size="small" @click="handleDelete">DELETE</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: {
    params: Object
  },
  data () {
    return {
      newTag: '',
      isExpand: false
    }
  },
  methods: {
    // determine the button type with the string
    typeColor (str) {
      if (['dev'].find(type => str.toLowerCase().indexOf(type) !== -1)) {
        return 'primary'
      } else if (['build', 'lint', 'unit'].find(type => str.toLowerCase().indexOf(type) !== -1)) {
        return 'success'
      } else if (['test', 'demo'].find(type => str.toLowerCase().indexOf(type) !== -1)) {
        return 'warning'
      } else {
        return 'info'
      }
    },

    // determine the tag color with the string
    tagColor (str) {
      if (['dev'].find(type => str.toLowerCase().indexOf(type) !== -1)) {
        return 'green'
      } else if (['work', 'project'].find(type => str.toLowerCase().indexOf(type) !== -1)) {
        return '#EF6AFF'
      } else if (['cli', 'demo'].find(type => str.toLowerCase().indexOf(type) !== -1)) {
        return '#FF9999'
      } else if (['test', 'e2e'].find(type => str.toLowerCase().indexOf(type) !== -1)) {
        return 'yellow'
      } else {
        return 'blue'
      }
    },

    // delete this project
    handleDelete () {
      this.$Modal.confirm({
        title: `Delete Project`,
        content: `Will delete the project - <b style="color: #19be6b">${this.params.package.name}</b>, confirm?`,
        onOk: () => {
          this.$emit('delete')
        },
        onCancel: () => {
          this.$Message.info('Cancle the delete operation.')
        }
      })
    },

    // add tag of the project
    handleAddTag (value) {
      if (value) {
        if (this.params.tags.find(t => t === value)) {
          this.$Message.warning('This tag already exists.')
        } else {
          this.params.tags.push(value)
        }

        this.newTag = ''
      }
    },

    // delete ont tag
    handleDeleteTag (event, tag) {
      if (tag) {
        let index = this.params.tags.findIndex(t => t === tag)

        if (index !== -1) {
          this.params.tags.splice(index, 1)
        } else {
          this.$Message.warning('This tag not exists.')
        }
      }
    },

    // auto filter in the exist tags
    filterMethod (value, option) {
      if (value !== undefined && option && typeof option === 'string') {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    width: 100%;
    padding: 0 10px;
    border-radius: 6px;
    .basic {
      height: 50px;
      font-size: 14px;
      .type {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        color: #fff;
        background: #7ED321;
        text-align: center;
      }
      .cmd-button {
        &:not(:first-child) {
          margin-left: 4px;
        }
      }
    }
    .detail {
      padding-bottom: 10px;
      .line {
        height: 1px;
        background: linear-gradient(to right, transparent, #9b9b9b, transparent)
      }
      .project-content {
        display: flex;
        justify-content: space-between;
        .left, .right {
          flex: 0 0 48%;
          padding: 10px 0;
        }
        .left {
          .version, .git, .license {
            margin-top: 4px;
            height: 24px;
            display: flex;
            align-items: center;
            .icon {
              margin-right: 10px;
              &:not(:first-child) {
                margin-left: 20px;
              }
            }
          }
        }
        .right {
          .tag, .script {
            h5 {
              margin-bottom: 4px;
              font-size: 14px;
            }
          }
          .tag {
            .tag-item {
              margin: 4px;
            }
          }
          .script {
            margin-top: 10px;
            .list {
              display: flex;
              flex-wrap: wrap;
              .script-item {
                margin: 4px;
                padding: 0 4px;
                width: 120px;
                height: 40px;
                background: #3b3b56;
                border-radius: 4px;
                &:hover {
                  background: #3f3f63;
                }
              }
            }
          }
        }
        .line {
          flex: 0 0 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #9b9b9b, transparent)
        }
      }
    }
  }
  .is-expand {
    margin: 10px 0;
    background: #1B1B30 !important;
  }
</style>
