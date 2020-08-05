<template>
    <div class="dialog-wrapper" v-if="dialogMessage">
        <div class="dialog">
            <div class="dialog-message">
                {{dialogMessage}}
            </div>
            <div class="dialog-control">
                <button class="btn error" @click="cancelDialog">Cancel</button>
                <button class="btn success" @click="confirmDialog">OK</button>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'Dialog',
    computed: {
      dialogMessage() {
        return this.$store.state.dialogMessage;
      }
    },
    methods: {
      ...mapMutations({
        cancelDialog: 'CANCEL_DIALOG',
        confirmDialog: 'CONFIRM_DIALOG'
      })
    }
  }
</script>


<style>
    .dialog-wrapper {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        background: rgba(0, 0, 0, 0.75);
    }

    .dialog {
        max-width: 300px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #191919;
        background: #efefef;
        padding: 30px 40px 20px;
    }

    .dialog-control {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
    }

    .dialog-message {
        text-align: center;
    }
</style>
