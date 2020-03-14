<template>
  <div>
    <v-overlay :value="syncVisible">
      <v-dialog
        v-model="syncVisible"
        max-width="50%"
      >
    <v-card >
        <v-card-title class="headline">
          {{title}}
          <v-spacer></v-spacer>
          <v-btn icon @click="syncVisible=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-container>
            <v-row>
              <v-col
                md='8'
                offset-md='2'
              >
              <v-text-field
                v-model="item.label"
                required
                clearable
                label="Label"
                :rules="labelRules"
              />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                md='8'
                offset-md='2'
              >
              <v-textarea
                v-model="item.des"
                auto-grow
                clearable
                label="Description"
                :rows="1"
              />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="foot-btn"
            color="#ff6060"
            dark
            @click="syncVisible = false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="foot-btn"
            color="#1867c0"
            dark
            @click="handleConfirmClick"
          >
            {{confimText}}
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
 </v-overlay>
  </div>
</template>
<script lang="ts">
import { Component, PropSync, Prop, Emit, Vue, Ref } from 'vue-property-decorator'

@Component({ name: 'todo-create' })
export default class TodoCreate extends Vue {
  @PropSync('visible', { type: Boolean, required: true }) syncVisible!: boolean
  @Prop({ type: Object }) rawItem!: TodoItem|null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Ref('form') readonly form!: any

  lazy = false
  valid = true

  item: TodoItem = {
    id: '',
    label: '',
    des: '',
    status: 'doing',
    enable: true
  }

  labelRules= [
    function (v: string): boolean|string {
      if (!v || v.length === 0) {
        return 'Label is required for todo-item'
      } else {
        return true
      }
    }
  ]

  @Emit('create')
  createItem (): TodoItem|void {
    this.item.id = new Date().getTime().toString()
    return this.item
  }

  @Emit('update')
  updateItem (): TodoItem|void {
    return this.item
  }

  get title () {
    return this.rawItem
      ? 'Modify Todo'
      : 'Create Todo'
  }

  get confimText () {
    return this.rawItem
      ? 'Update'
      : 'Create'
  }

  mounted () {
    if (this.rawItem) {
      Object.assign(this.item, this.rawItem)
    }
  }

  handleConfirmClick (): void {
    this.form.validate()
    if (this.valid) {
      this.syncVisible = false
      this.rawItem
        ? this.updateItem()
        : this.createItem()
    }
  }
}
</script>
<style scoped>
.foot-btn {
  margin: 10px
}
</style>
