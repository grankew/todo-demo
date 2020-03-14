<template>
  <div class="msg-card">
    <div class="card-msg">{{ msg }}</div>
    <div class="card-footer">{{ footer }}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'MsgCard'
})
export default class MsgCard extends Vue {
  @Prop({ type: String }) msg!: string
  @Prop({ type: String }) footer!: string
}
</script>
<style scoped>
.msg-card {
  background: rgba(255,255,255, .4);
  position: relative;
  border-radius: 6px;
  margin: 10px 0px;
  padding: 10px;
  color:rgba(32, 37, 43, .6);
}
.msg-card .card-msg {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  letter-spacing:2px;
  font-size: 35px;
  display:-webkit-box;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  padding: 10px;
}
.msg-card .card-footer {
  display:-webkit-box;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp:4;
  letter-spacing:3px;
  -webkit-box-orient:vertical;
  padding: 5px;
}
.msg-card ::before {
  position: absolute;
  left: 0;right: 0;top: 0;bottom: 0;
  z-index: -1;
  filter: blur(2px);
}
</style>
