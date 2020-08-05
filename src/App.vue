<template>
    <div id="app">
        <div v-if="activePage === 'Preview'">
            <div class="page-header">
                <button class="btn success" @click="addList">New List</button>
            </div>

            <div class="page-wrapper" v-if="lists.length > 0">
                <List v-for="list in lists"
                      :key="list.id"
                      :preview="true"
                      :list="list" />
            </div>
            <div class="page-wrapper" v-else>
                <div class="no-list__text">
                    You don't have any todo list yet
                </div>
            </div>
        </div>

        <ListPage v-else-if="activePage === 'List Page'" />

        <Dialog />
    </div>
</template>

<script>
  import ListPage from "./components/list-page"
  import List from "./components/list-view"
  import Dialog from './components/dialog';

  import {mapMutations} from 'vuex';

  export default {
    name: 'App',
    components: {
      ListPage,
      List,
      Dialog
    },
    computed: {
      lists() {
        return this.$store.state.lists;
      },
      activePage() {
        return this.$store.state.activePage;
      }
    },
    created() {
      this.loadLists();
    },
    methods: {
      ...mapMutations({
        addList: 'NEW_LIST',
        loadLists: 'LOAD_LISTS'
      })
    }
  }
</script>

<style>
    body {
        margin: 0;
        color: #191919;
        background: #efefef;
        font-size: 18px;
        font-family: 'rawline', sans-serif;
    }

    #app {
        position: relative;
    }

    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .no-list__text {
        padding: 20px 40px;
        border-radius: 10px;
        margin: 50px auto;
        border: 2px solid #191919;
        background: #fefefe;
        font-size: 20px;
        font-weight: 500;
    }

    .page-header {
        display: flex;
        justify-content: flex-end;
        padding: 10px 30px;
        background: #fefefe;
        border-bottom: 2px solid #191919;
    }

    input {
        padding: 10px 15px;
        border: 0;
        background: none;
        font-size: 18px;
        outline: none;
        border-bottom: 2px solid #191919;
        transition: all 0.5s;
    }

    input:focus {
        border-bottom: 2px solid #96ceb4;
    }

    .btn {
        background: none;
        border-radius: 10px;
        border: 0;
        font-size: 20px;
        padding: 5px 15px;
        outline: none;
        cursor: pointer;
        transition: all 0.5s;
        margin: 0 10px;
        color: #fff;
    }

    .btn.warning {
        background: #ffcc5c;
    }

    .btn.warning:hover {
        background: #ffff5c;
    }

    .btn.error {
        background: #ff6f69;
    }

    .btn.error:hover {
        background: #ff6f2f;
    }

    .btn.success {
        background: #28a745;
    }

    .btn.success:disabled {
        background: #96ceb4;
    }

    .btn.success:hover {
        background: #88d8b0;
    }
</style>
