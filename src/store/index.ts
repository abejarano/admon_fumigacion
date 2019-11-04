import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        layout: 'layout-home',
    },
    mutations: {
        SET_LAYOUT(state, newLayout) {
            state.layout = newLayout;
        },
    },
});
