import Vue from 'vue'

import MTable from "@/components/MTable";
import MForm from "@/components/MForm";
import MInput from "@/components/MInput";

const components = {
    MTable,
    MForm,
    MInput
};

Vue.mixin({
    components: components
});
export default {
    'table': MTable,
    'form': MForm,
    'text': MInput,
    'textarea': MInput,
}