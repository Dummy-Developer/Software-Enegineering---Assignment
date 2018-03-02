import Vue from "vue";
import Vuex from "vuex";

// components
import MainView from "./../components/MainView.vue";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            _id: "",
            name: "",
            thumnail: "",
            role: "",
            roleIndex: -1,
            enrollment: []
        },
        currentView: null,
        MainView: MainView,
    },
    mutations: {
        switchView(state, view) {
            state.currentView = view;
        }
    },
    actions: {
        getUserData({ state }) {
            return new Promise((resolve, reject) => {
                Vue.http.get("/auth/user").then(data => {
                    state.user._id = data.body._id;
                    state.user.name = data.body.name;
                    state.user.thumnail = data.body.thumnail;
                    state.user.roleIndex = data.body.role;
                    state.user.enrollment = data.body.enrollment;
                    switch (data.body.role) {
                        case 0:
                            state.user.role = "Administrator";
                            break;

                        case 1:
                            state.user.role = "Lecture";
                            break;

                        case 2:
                            state.user.role = "Student";
                            break;
                    }
                    resolve();
                });
            });
        }
    }
});