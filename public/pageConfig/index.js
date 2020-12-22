import Vue from 'vue'

import MTable from "@/components/MTable";
import MForm from "@/components/MForm";
import MInput from "@/components/MInput";
import MDialog from "@/components/MDialog";

const components = {
    MTable,
    MForm,
    MInput,
    MDialog
};

Vue.mixin({
    components: components
});
export default {
    'table': MTable,
    'form': MForm,
    'text': MInput,
    'textarea': MInput,
    'dialog': MDialog,
}