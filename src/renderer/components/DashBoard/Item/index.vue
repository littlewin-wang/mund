<template>
  <div class="item">
    <Row type="flex" align="middle" style="height: 100%; font-size: 14px;">
      <Col span="2">
        <div class="type">
          V
        </div>
      </Col>
      <Col span="5">
        <span>vue-cli</span>
      </Col>
      <Col span="5">
        <Tag color="blue">标签一</Tag>
        <Tag color="green">标签二</Tag>
        <Tooltip placement="top-end">
          <Tag type="border">+2</Tag>
          <div slot="content">
            <Tag color="red">标签三</Tag>
            <Tag color="yellow">标签四</Tag>
          </div>
        </Tooltip>
      </Col>
      <Col span="4">
        <span>Yesterday</span>
      </Col>
      <Col span="7">
        <Button type="info" size="small">install</Button>
        <Button type="primary" size="small">dev</Button>
        <Button type="success" size="small">build</Button>
      </Col>
      <Col span="1">
        <Button size="small" type="ghost" shape="circle" icon="chevron-down"></Button>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'item'
}
</script>

<style lang="scss" scoped>
  .item {
    height: 50px;
    padding: 0 10px;
    background: #34344D;
    border-radius: 6px;
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
</style>
