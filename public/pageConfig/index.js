import Vue from 'vue'

import MTable from "@/components/MTable";
import MForm from "@/components/MForm";

const components = {
    MTable,
    MForm
};

Vue.mixin({
    components: components
});
export default {
    'table': MTable,
    'form': MForm
}