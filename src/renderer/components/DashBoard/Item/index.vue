<template>
  <div class="item" :class="{ 'is-expand': isExpand }">
    <Row class="basic" type="flex" align="middle">
      <Col span="2">
        <div class="type">
          V
        </div>
      </Col>
      <Col span="5">
        <h5 style="font-size: 14px;">vue-cli</h5>
        <span v-if="isExpand" style="font-size: 12px; color: #9b9b9b">Last Modified: Yesterday</span>
      </Col>
      <Col span="5">
        <div v-if="!isExpand">
          <Tag color="blue">标签一</Tag>
          <Tag color="green">标签二</Tag>
          <Tooltip placement="top-end">
            <Tag type="border">+2</Tag>
            <div slot="content">
              <Tag color="red">标签三</Tag>
              <Tag color="yellow">标签四</Tag>
            </div>
          </Tooltip>
        </div>
      </Col>
      <Col span="4">
        <span v-if="!isExpand">Yesterday</span>
      </Col>
      <Col span="7">
        <div v-if="!isExpand">
          <Button type="info" size="small">install</Button>
          <Button type="primary" size="small">dev</Button>
          <Button type="success" size="small">build</Button>
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </span>
              <Icon type="edit" style="margin-left: 4px;"></Icon>
            </div>
            <div class="version">
              <Icon class="icon" color="#2d8cf0" size="18" type="ios-information"></Icon>
              <span>{{ '1.0.0' }}</span>
            </div>
            <div class="git">
              <Icon class="icon" size="18" type="social-github"></Icon>
              <a>coding-tool/dort</a>
              <Icon class="icon" size="18" type="network"></Icon>
              <span>develop</span>
            </div>
            <div class="license">
              <Icon class="icon" color="#ff9900" size="18" type="locked"></Icon>
              <span>MIT</span>
            </div>
          </div>
          <div class="line">
          </div>
          <div class="right">
            <div class="tag">
              <h5>Tags</h5>
              <Tag color="blue">标签一</Tag>
              <Tag color="green">标签二</Tag>
              <Tag color="red">标签三</Tag>
              <Tag color="yellow">标签四</Tag>
              <Button icon="ios-plus-empty" type="dashed" size="small">
                Add
              </Button>
            </div>
            <div class="script">
              <h5>NPM Script</h5>
              <div class="list">
                <div class="script-item">
                  <h5>vue:dev</h5>
                  <p class="script-cmd">incididunt ut labore et dolore</p>
                </div>
                <div class="script-item">
                  <h5>vue:dev</h5>
                  <p class="script-cmd">incididunt ut labore et dolore</p>
                </div>
                <div class="script-item">
                  <h5>vue:dev</h5>
                  <p class="script-cmd">incididunt ut labore et dolore</p>
                </div>
                <div class="script-item">
                  <h5>vue:dev</h5>
                  <p class="script-cmd">incididunt ut labore et dolore</p>
                </div>
                <Button class="script-item" icon="ios-plus-empty" type="dashed">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  data () {
    return {
      isExpand: false
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
    }
    .detail {
      // height: 200px;
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
          .script {
            margin-top: 10px;
            .list {
              display: flex;
              flex-wrap: wrap;
              .script-item {
                margin: 4px;
                padding: 0 4px;
                width: 120px;
                height: 80px;
                background: #3b3b56;
                border-radius: 4px;
                cursor: pointer;
                &:hover {
                  background: #3f3f63;
                }
                h5 {
                  font-weight: normal;
                  font-size: 14px;
                }
                .script-cmd {
                  padding: 4px 0;
                  border-top: 1px solid #9b9b9b;
                  font-size: 12px;
                  color: #9b9b9b;
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
