<template>
  <div >
    <v-app-bar
      color="#3f51b5"
      dark
    >
      <v-toolbar-title>
        Todos
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="active='todoPage'">
        <v-icon ref="todoPageIcon">mdi-layers</v-icon>
      </v-btn>
      <v-btn icon @click.stop="active='todoCan'">
        <v-icon ref="todoCanIcon">mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click.stop="showCreaterDialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="todo full-screen">
      <todo-page
        v-if="active==='todoPage'"
        :todos="itemList"
        @edit="handleItemEdit"
        @dele="handleDele"
      />
      <todo-can
        v-else
        :todos="itemList"
        @edit="handleItemEdit"
        @dele="handleDele"
      />
    </div>
    <todo-create
      v-if="createrVisible"
      :visible.sync="createrVisible"
      :raw-item="modify ? modifyItem: null"
      @create="handleCreateItem"
      @update="handleCreateItem"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Watch } from 'vue-property-decorator'
import todoCreate from './todo-create.vue'
import todoPage from './todo-page.vue'
import todoCan from './todo-can.vue'
@Component({
  components: {
    todoCreate,
    todoPage,
    todoCan
  }
})
export default class Main extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Ref('todoPageIcon')
  readonly todoPageIcon!: any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Ref()
  readonly todoCanIcon!: any

  @Watch('createrVisible')
  onCreaterVisible () {
    if (!this.createrVisible) {
      this.modify = false
    }
  }

  createrVisible = false
  modifyItem!: TodoItem|null
  itemList: Array<TodoItem> = [
    {
      id: '00000001',
      label: 'Finish todo dome',
      des: 'To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.',
      status: 'done',
      enable: true
    },
    {
      id: '00000002',
      label: 'Finish todo dome',
      des: 'To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.',
      status: 'doing',
      enable: true
    },
    {
      id: '00000003',
      label: 'Finish todo dome',
      des: 'To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.',
      status: 'done',
      enable: true
    },
    {
      id: '00000004',
      label: 'Finish todo dome',
      des: 'To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.To learning ts and vuejs, I created this project.It is a simple todo-list application.',
      status: 'done',
      enable: true
    }
  ]

  modify = false
  active='todoPage'
  showCreaterDialog (): void {
    this.createrVisible = true
  }

  handleCreateItem (item: TodoItem): void {
    let flag = true
    if (item) {
      this.itemList.forEach(each => {
        if (each.id === item.id) {
          Object.assign(each, item)
          flag = false
          this.modifyItem = null
          return false
        }
      })
      flag && this.itemList.push(item)
    }
  }

  handleItemEdit (item: TodoItem): void {
    this.modify = true
    this.modifyItem = item
    this.createrVisible = true
  }

  handleDele (deleteForever: boolean): void {
    !deleteForever && this.shake(this.todoCanIcon.$el)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shake (e: any) {
    this.removeClass(e, 'r1')
    this.addClass(e, 'r2')
    setTimeout(() => {
      this.removeClass(e, 'r2')
      this.addClass(e, 'r1')
    }, 150)
    setTimeout(() => {
      this.removeClass(e, 'r1')
      this.addClass(e, 'r2')
    }, 300)
    setTimeout(() => {
      this.removeClass(e, 'r2')
      this.addClass(e, 'r1')
    }, 450)
    setTimeout(() => {
      this.removeClass(e, 'r2')
      this.removeClass(e, 'r1')
    }, 600)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeClass (dom: any, className: string) {
    console.log(dom.classList)
    dom.classList.remove(className)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addClass (dom: any, className: string) {
    console.log(dom.classList)
    dom.classList.add(className)
  }
}
</script>
<style>
.todo {
  min-width: 800px;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width:9px;
    height:9px;
    margin: 2px;
    background-color: transparent;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    /* box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
    border-radius:10px;
    background-color:#F5F5F5; */
    padding: 2px;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
  border-radius:10px;
  background-color: rgba(63, 81, 181, 0.4);
  transition: 1000;
  margin: 0 2px;margin: 0 3px;
}
::-webkit-scrollbar-thumb:hover
{
  background-color: rgba(63, 81, 181, .8);

}
.full-screen {
  display: inline-block;
  height: calc(100vh - 64px);
  margin: auto;
  width: 100%;
  min-width: 800px;
  overflow-y: auto;
  background: linear-gradient(to right, rgba(254, 97, 97,.3) 5%, rgba(24, 103, 192, .3));
}
.r1 {
  transform:rotate(-20deg);
}
.r2 {
  transform:rotate(15deg);
}

</style>
