import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import logo from '../assets/logo.svg'


const MY_ICONS = {
    logo,
}

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: MY_ICONS,
    },
});
