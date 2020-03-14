<template>
  <v-card
    class="mx-auto todo-card"
    max-width="700"
    max-height="128"
  >
    <v-card-title>
      <v-icon left>
        mdi-book
       </v-icon>
      <span class="title todo-title">
        {{modifyTodo.label}}
      </span>
      <v-spacer></v-spacer>
      <el-switch
        v-model="finishFlag"
        :disabled="revertable"
        active-color="#1867c0"
        inactive-color="#ff6060"
        @change="handleFinishClick"
      ></el-switch>
    </v-card-title>

    <v-card-text
      class="font-weight-bold todo-des "
    >

      <span>{{modifyTodo.des}}</span>
    </v-card-text>
    <div align="right" style=" pdding:0 20px">

      <v-btn
        v-if="revertable"
        icon
        @click="itemRevert"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn
        v-if="editable"
        icon
        @click="itemEdit"
      >
        <v-icon>mdi-circle-edit-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="itemDelete"
      >
        <v-icon>mdi-delete-circle-outline</v-icon>
      </v-btn>
    </div>

  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

@Component({ name: 'todo-item' })
export default class TodoItemage extends Vue {
  @Prop({ type: Object }) todo!: TodoItem
  modifyTodo!: TodoItem
  // finishFlag = false

  get finishFlag (): boolean {
    return this.todo.status === 'done'
  }

  set finishFlag (newval: boolean) {
    this.modifyTodo.status = newval ? 'done' : 'doing'
  }

  get editable (): boolean {
    return this.modifyTodo.status === 'doing' && this.modifyTodo.enable
  }

  get revertable (): boolean {
    return !this.modifyTodo.enable
  }

  @Emit('change')
  itemFinish (): TodoItem {
    return this.modifyTodo
  }

  @Emit('edit')
  itemEdit (): TodoItem {
    return this.modifyTodo
  }

  @Emit('dele')
  itemDelete (): TodoItem {
    return this.modifyTodo
  }

  @Emit('revert')
  itemRevert (): TodoItem {
    return this.modifyTodo
  }

  created (): void {
    this.modifyTodo = this.todo
  }

  handleFinishClick (): void {
    this.modifyTodo.status = this.finishFlag
      ? 'done'
      : 'doing'
    this.itemFinish()
  }
}
</script>
<style scoped>
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 3px;
}
.todo-card {
  margin:10px auto;
}
.todo-card:hover {
  box-shadow: 0 0 4px 6px rgba(124, 123, 123, 0.4);
  transform: translateY(-3px);
  transition: transform .4s;
}
.todo-des {
  display:-webkit-box;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;

  text-align: left;
  padding-left: 30px;
}
.todo-title {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
</style>
