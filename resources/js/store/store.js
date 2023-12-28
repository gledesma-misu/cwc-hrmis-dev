import { createStore } from "vuex";

export const store = createStore({
    string: true,
    state: {
        test: 0,
    },
    getters: {
        test(state){
            return state.test
        }
    },
    mutations: {
        testMutation: (state) => {
            state.test++;
            console.log(state.test);
        },
    },
    actions: {
        testAction: (context) => {
            context.commit("testMutation");
        },
    },
});
