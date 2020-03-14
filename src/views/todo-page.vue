<template>
  <div>
    <el-row style="height:100%">
      <el-col
        :span="10"
        :offset="2"
        style="height:100%;"
      >
        <div class="list-box">
          <div
            v-for="item in syncTodos"
            :key="item.id"
          >
            <todo-item
              v-show="item.enable && item.status==='doing'"
              :todo="item"
              :key="item.id"
              @edit="handleItemEdit"
              @change="handleItemChange"
              @dele="handleItemDele"
            />
          </div>
          <msg-card
            v-if="isDoingEmpty"
            msg="EMPTY"
            :footer="doingMotto"
          />
        </div>
      </el-col>

      <el-col
        :span="10"
        style="height:100%;"
      >
        <div class="list-box">
          <div
            v-for="item in syncTodos"
            :key="item.id"
          >
            <todo-item
              v-show="item.enable && item.status==='done'"
              :todo="item"
              :key="item.id"
              @change="handleItemChange"
              @dele="handleItemDele"
            />
          </div>
          <msg-card
            v-if="isDoneEmpty"
            msg="EMPTY"
            :footer="doneMotto"
          />
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script lang="ts">
import { Component, PropSync, Emit, Vue } from 'vue-property-decorator'
import todoItem from './todo-item.vue'
import msgCard from './msg-card.vue'

@Component({
  name: 'todo-page',
  components: { todoItem, msgCard }
})
export default class TodoPage extends Vue {
  @PropSync('todos', { type: Array }) syncTodos!: TodoItem[]

  @Emit('edit')
  handleItemEdit (todo: TodoItem): TodoItem {
    return todo
  }

  @Emit('dele')
  deleteItem (deleteForever: boolean): boolean {
    return deleteForever
  }

  doingMotto = 'Finished  all,  you  enjoy  this  moment.'
  doneMotto = 'Everything  is  just  beginning.'
  get isDoneEmpty (): boolean {
    let num = 0
    this.syncTodos.forEach(item => {
      if (item.status === 'done' && item.enable) {
        num++
      }
    })
    return num === 0
  }

  get isDoingEmpty (): boolean {
    let num = 0
    this.syncTodos.forEach(item => {
      if (item.status === 'doing' && item.enable) {
        num++
      }
    })
    return num === 0
  }

  handleItemChange (todo: TodoItem) {
    this.syncTodos.forEach(item => {
      if (item.id === todo.id) {
        Object.assign(item, todo)
        return false
      }
    })
  }

  handleItemDele (todo: TodoItem) {
    if (todo.status !== 'deleted') {
      this.syncTodos.forEach(item => {
        if (item.id === todo.id) {
          item.enable = false
          this.deleteItem(false)
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.full-screen {
  display: inline-block;
  height: calc(100vh);
  margin: auto;
  width: 100%;
  min-width: 800px;
  background: linear-gradient(to right, rgba(254, 97, 97,.3) 5%, rgba(24, 103, 192, .3));
}
.list-title {
  background: linear-gradient(rgba(254, 97, 97,.6) 5%, white 95%);
  margin: 10px 0;
  display: inline-block;
  line-height: 50px;
  width: 100%;

  border-radius: 4px;

}
.list-box {
  display: block;
  height: 100%;
  padding: 0 20px;
}
</style>>
