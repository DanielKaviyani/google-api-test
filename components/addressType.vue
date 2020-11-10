<template>
    <v-select
        v-model="model"
        :items="items"
        style="max-width: 120px"
    ></v-select>
</template>

<script>
export default {
    name: 'AddressType',
    props: {
        value: {
            type: String,
            default: 'residential',
        },
    },
    data: () => ({
        items: [
            { text: 'Residential', value: 'residential' },
            { text: 'Domicile', value: 'domicile' },
            { text: 'Legal', value: 'legal' },
            { text: 'Operational', value: 'operational ' },
        ],
    }),
    computed: {
        model: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            },
        },
    },
}
</script>
