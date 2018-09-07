<template>
  <div class="container">
    <div class="control">
      <div class="left">
        <Dropdown @on-click="changeProject" style="font-size: 14px;">
          <a href="javascript:void(0)">
            {{ project || 'Projects' }}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list" >
            <DropdownItem name="Projects">Projects</DropdownItem>
            <DropdownItem name="vue-cli">vue-cli</DropdownItem>
            <DropdownItem name="create-react-app">create-react-app</DropdownItem>
            <DropdownItem name="express-demo">express-demo</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div class="count">
          <span>{{ total }}</span> Total
        </div>
      </div>
      <div class="right">
        <Input v-model="search" size="small" icon="ios-search" placeholder="Enter something..." style="width: 200px" />
        <div class="action">
          <Button type="primary" icon="ios-lightbulb" size="small">Active Project</Button><Button type="success" icon="android-add" size="small" style="margin-left: 10px">New Project</Button>
        </div>
      </div>
    </div>
    <div class="main"></div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      project: '',
      total: 3,
      search: ''
    }
  },
  methods: {
    changeProject (name) {
      this.project = name
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
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
  }
</style>
