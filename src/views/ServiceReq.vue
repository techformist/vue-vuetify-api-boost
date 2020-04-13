<template>
  <Panel icon="mdi-book-plus" title="Service Requests">
    <template slot="toolbar-items"></template>
    <template slot="content">
      <ServiceReqList />
    </template>
  </Panel>
</template>

<script>
import Panel from "../components/layouts/Panel";
import ServiceReqList from "../components/ServiceReqList";

export default {
  components: {
    Panel,
    ServiceReqList
  }
};
</script>
