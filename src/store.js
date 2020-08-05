import Vuex from 'vuex';
import Vue from "vue";
import _ from 'lodash'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    lists: [],
    activeList: null,
    activePage: 'Preview',
    dialogMessage: '',
    dialogAction: null
  },
  mutations: {
    'SHOW_DIALOG_MESSAGE'(state, action) {
      switch (action.name) {
        case 'delete_list':
          state.dialogMessage = 'List will be removed forever?';
          break;
        case 'cancel':
          state.dialogMessage = 'Changes won\'t be saved';
          break;
        default:
      }
      state.dialogAction = action;
    },
    'CANCEL_DIALOG'(state) {
      state.dialogMessage = '';
      state.dialogAction = null;
    },
    'CONFIRM_DIALOG'(state) {
      switch (state.dialogAction.name) {
        case 'delete_list':
          this.commit('DELETE_LIST', state.dialogAction.id);
          break;
        case 'cancel':
          this.commit('BACK_TO_MAIN_PAGE');
          break;
        default:
      }
      this.commit('CANCEL_DIALOG');
    },
    'SET_ACTIVE_LIST'(state, payload) {
      state.activeList = _.cloneDeep(payload);
    },
    'NEW_LIST'(state) {
      state.activePage = 'List Page'
    },
    'EDIT_LIST'(state, list) {
      state.activeList = _.cloneDeep(list);
      state.activePage = 'List Page'
    },
    'DELETE_LIST'(state, id) {
      state.lists = state.lists.filter(l => {
        if (l.id !== id) {
          return l;
        }
      });
      this.commit('SAVE_LISTS');
      if (state.activeList) this.commit('BACK_TO_MAIN_PAGE')
    },
    'SAVE_LIST'(state) {
      if (state.activeList.id) {
        state.lists = state.lists.map(l => {
          if (l.id === state.activeList.id) {
            return state.activeList
          }
          return l
        });
      } else {
        state.activeList.id = new Date().getTime();
        state.lists = [...state.lists, state.activeList];
      }
      this.commit('SAVE_LISTS');
      this.commit('BACK_TO_MAIN_PAGE')
    },
    'BACK_TO_MAIN_PAGE'(state) {
      state.activeList = null;
      state.activePage = 'Preview'
    },
    'LOAD_LISTS'(state) {
      let lists = JSON.parse(localStorage.getItem('lists'));
      if (lists) {
        state.lists = lists;
      }
    },
    'SAVE_LISTS'(state) {
      localStorage.setItem('lists', JSON.stringify(state.lists));
    }
  }
});

export default store;