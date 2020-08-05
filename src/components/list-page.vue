<template>
    <div>
        <div class="page-header">
            <button class="btn error" @click="cancel">Cancel</button>
            <button class="btn success" @click="saveList">Save</button>
        </div>

        <div class="page-wrapper">
            <List/>
        </div>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import List from './list-view';

  export default {
    name: 'List-Page',
    components: {
      List
    },
    methods: {
      ...mapMutations({
        confirmation: 'SHOW_DIALOG_MESSAGE',
        saveList: 'SAVE_LIST',
      }),
      cancel() {
        this.confirmation({name: 'cancel'})
      }
    }
  }
</script>

<style>


</style>