<template>
    <v-container class="fill-height">
        <v-row align="center" justify="center" class="px-3 px-md-0">
            <v-col cols="12" md="2">
                <address-type v-model="form.type" />
            </v-col>
            <v-col cols="12" md="6">
                <address-field
                    v-for="(address, index) in form.addresses"
                    :key="index"
                    v-model="form.addresses[index]"
                    @add="add_address"
                    @clear="clear(index)"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Main',
    data: () => ({
        form: {
            type: 'residential',
            addresses: [''],
        },
    }),
    methods: {
        add_address() {
            this.form.addresses.push('')
        },
        clear(index) {
            this.form.addresses.splice(index, 1, '')
        },
    },
}
</script>
