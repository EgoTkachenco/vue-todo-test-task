<template>
    <div class="list-wrapper">
        <div class="list-title history-control">
            <button v-if="!preview"
                    @click="moveHistory(historyPosition--)"
                    :disabled="historyPosition <= 0">
                <img :src="require(`../assets/${historyPosition <= 0 ? 'arrow-disabled.svg' : 'arrow.svg'}`)"
                     alt="Arrow prev"
                     title="Discard change">
            </button>
            <input class="list-title__input"
                   type="text"
                   @change="saveHistory"
                   placeholder="List title"
                   :readonly="preview"
                   v-model="activeList.title"/>
            <button v-if="!preview"
                    @click="moveHistory(historyPosition++)"
                    :disabled="history.length === historyPosition + 1">
                <img :src="require(`../assets/${history.length === historyPosition + 1 ? 'arrow-disabled.svg' : 'arrow.svg'}`)"
                     alt="Arrow next"
                     style="transform: rotate(180deg)"
                     title="Return change">
            </button>
        </div>
        <div class="list-tasks" v-if="activeList.tasks.length > 0">
            <div :class="['list-task__item', task.checked ? 'checked' : '']"
                 v-for="(task, i) in preview ? activeList.tasks.slice(0,3) : activeList.tasks"
                 :key="i">
                <input type="checkbox"
                       v-model="task.checked"
                       @change="saveHistory"
                       v-if="!preview"
                       :title="task.checked ? 'Set as uncompleted' : 'Set as completed'"
                />
                <input type="text"
                       v-model="task.text"
                       class="list-task__input"
                       @change="saveHistory"
                       :readonly="preview || task.checked"
                       placeholder="To do"
                />
                <button @click="deleteTask(i)"
                        v-if="!preview"
                        class="delete-btn"
                        title="Delete Task">+
                </button>
            </div>
        </div>
        <div class="list-tasks" v-else>
            <div class="no-tasks__text">
                Empty task list
            </div>
        </div>
        <div class="list-control">
            <template v-if="preview">
                <button class="btn warning" @click="editList(list)">Edit List</button>
                <button class="btn error" @click="deleteList">Delete List</button>
            </template>
            <template v-else>
                <button class="btn error" v-if="!isNew" @click="deleteList">Delete List</button>
                <button class="btn success" @click="addNewTask">Add Task</button>
            </template>
        </div>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import _ from 'lodash';

  export default {
    name: 'List-Page',
    props: ['preview', 'list'],
    data: () => ({
      isNew: false,
      history: [],
      historyPosition: -1,
    }),
    computed: {
      activeList: {
        get() {
          return this.list ? this.list : this.$store.state.activeList;
        },
        set(val) {
          if (!this.list) {
            this.updateList(val);
          }
        }
      }
    },
    created() {
      if (!this.list && !this.activeList) {
        this.activeList = {
          title: '',
          tasks: [],
        };
        this.isNew = true;
      } else if (this.list) {
        this.activeList = this.list;
      }
      if (!this.preview) this.saveHistory();
    },
    methods: {
      ...mapMutations({
        editList: 'EDIT_LIST',
        confirmation: 'SHOW_DIALOG_MESSAGE',
        updateList: 'SET_ACTIVE_LIST'
      }),
      addNewTask() {
        this.activeList.tasks = [...this.activeList.tasks, {checked: false, text: ''}];
        this.saveHistory();
      },
      deleteTask(taskIndex) {
        this.activeList.tasks = [...this.activeList.tasks].filter((t, i) => taskIndex !== i);
        this.saveHistory();
      },
      deleteList() {
        this.confirmation({name: 'delete_list', id: this.activeList.id});
      },
      saveHistory() {
        this.history = this.history.splice(0, this.historyPosition + 1);
        this.history.push(_.cloneDeep(this.activeList));
        this.historyPosition++;
      },
      moveHistory() {
        this.activeList = this.history[this.historyPosition];
      }
    }
  }
</script>

<style>
    .list-wrapper {
        margin: 20px 40px;
        border: 2px solid #191919;
        border-radius: 10px;
        max-width: 320px;
        background: #fefefe;
        position: relative;
    }

    .list-title {
        display: flex;
        justify-content: center;
    }

    .list-tasks {
        margin: 10px auto;
        padding: 0 10px;
    }

    .list-task__item {
        display: flex;
        align-items: center;
        position: relative;
    }

    .task-item input[type=text]:focus {
        border-bottom: 0;
        box-shadow: 0 2px 0 0 #28a745;
    }

    .no-tasks__text {
        text-align: center;
        font-weight: 500;
    }

    .delete-btn {
        background: #ff6f69;
        border-radius: 50%;
        border: 0;
        font-size: 25px;
        line-height: 25px;
        width: 25px;
        height: 25px;
        cursor: pointer;
        outline: none;
        transform: rotate(45deg);
        color: #fff;
        transition: all 0.5s;
    }

    .delete-btn:hover {
        transform: scale(0.9) rotate(45deg);
    }

    .list-task__item.checked:before {
        content: '';
        position: absolute;
        width: 78%;
        left: 10%;
        height: 1px;
        background: #858585;
    }

    .list-task__item.checked .list-task__input {
        color: #858585;
    }

    .list-title__input {
        text-align: center;
    }

    .list-title__input:read-only {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 auto;
    }

    .list-title__input:read-only, .list-task__input:read-only {
        cursor: pointer;
        border-bottom: 0 !important;
    }

    .list-control {
        padding: 10px 0;
        display: flex;
        justify-content: space-around;
        border-top: 2px solid #191919;
    }

    .history-control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
    }

    .history-control button {
        width: 30px;
        height: 30px;
        background: none;
        border: none;
        cursor: pointer;
    }

    .history-control button:disabled {
        cursor: default;
    }

    .history-control img {
        width: 100%;
    }
</style>