<template>
  <div id="app">
    <div class="title-bar">
      mund - 1.0.0
      <div class="action-button" v-if="os !== 'darwin'">
        <Icon type="close" />
        <Icon type="minus" />
        <Icon type="arrow-resize" />
      </div>
    </div>
    <div class="content">
      <div class="control-bar">
        <div class="breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem to="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem to="/components">
              Components
            </BreadcrumbItem>
            <BreadcrumbItem to="/components/breadcrumb">
              Breadcrumb
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="setting">
          <Icon type="ios-gear-outline"></Icon>
          <Icon type="share"></Icon>
        </div>
      </div>
      <div class="view-area">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mund',
    data () {
      return {
        os: ''
      }
    },
    created () {
      this.os = process.platform
    }
  }
</script>

<style lang="scss">
  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    background: #262441;
  }

  #app {
    .title-bar {
      -webkit-app-region: drag;
      user-select: none;
      width: 100%;
      height: 22px;
      line-height: 22px;
      text-align: center;
      font-size: 14px;
      z-index: 99;
      .action-button {
        position: absolute;
        top: 2px;
        right: 4px;
        width: 60px;
        z-index: 9999;
        -webkit-app-region: no-drag;
        i {
          cursor: pointer;
          font-size: 16px;
        }
      }
    }

    .content {
      position: absolute;
      top: 22px;
      bottom: 0;
      width: 100%;
      padding: 10px;
      .control-bar {
        display: flex;
        height: 24px;
        line-height: 24px;
        .breadcrumb {
          flex: 0 0 50%;
        }
        .setting {
          flex: 0 0 50%;
          text-align: right;
          i {
            margin: 0 4px;
            font-size: 20px;
            line-height: 24px;
            cursor: pointer;
          }
        }
      }
      .view-area {
        position: absolute;
        top: 34px;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
      }
    }
  }
</style>
