<template>
  <div>
    <el-row style="height:100%;overflow-y: auto;">
      <el-col
        :span="16"
        :offset="4"
        style="height:100%;"
      >
        <div class="list-box">
          <div
            v-for="item in syncTodos"
            :key="item.id"
          >
            <todo-item
              v-if="!item.enable"
              :todo="item"
              :key="item.id"
              @revert="handleItemRevert"
              @dele="handleItemDele"
            />
          </div>
          <msg-card
            v-if="isEmpty"
            msg="EMPTY"
            :footer="motto"
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
  name: 'todo-can',
  components: { todoItem, msgCard }
})

export default class TodoCan extends Vue {
  @PropSync('todos', { type: Array }) syncTodos!: TodoItem[]

  @Emit('dele')
  deleteItem (deleteForever: boolean): boolean {
    return deleteForever
  }

  motto = "It's  so  empty  as  the  air,  like  your  lonely  heart."
  get isEmpty (): boolean {
    let num = 0
    this.syncTodos.forEach(item => {
      if (!item.enable) {
        num++
      }
    })
    console.log(num)
    return num === 0
  }

  handleItemRevert (todo: TodoItem) {
    if (!todo.enable) {
      this.$confirm('Are you confirm to revert this tode to list?', 'Hint', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.syncTodos.forEach(item => {
          if (item.id === todo.id) {
            item.enable = true
            return false
          }
        })
      })
    }
  }

  handleItemDele (todo: TodoItem) {
    this.$confirm('Are you confirm to delete this tode forever?', 'Hint', {
      confirmButtonText: 'Comfirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.syncTodos.forEach((item, index, list) => {
        if (item.id === todo.id) {
          list.splice(index, 1)
          return false
        }
      })
      this.deleteItem(true)
    })
  }
}
</script>
