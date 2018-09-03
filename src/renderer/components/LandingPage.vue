<template>
  <div class="main">
    <div class="fake-title-bar">
      mund - 1.0.0
      <div class="handle-bar">
        <Icon type="close" />
        <Icon type="minus" />
        <Icon type="arrow-resize" />
      </div>
    </div>
    <div class="content">
      <Tabs value="name1">
        <TabPane label="标签一" name="name1">标签一的内容</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    components: { },
    methods: {

    }
  }
</script>

<style lang='scss'>
  .main {
    .fake-title-bar {
      -webkit-app-region: drag;
      width: 100%;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;
      z-index: 99;
      .handle-bar {
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
  }
</style>
