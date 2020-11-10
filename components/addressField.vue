<template>
    <div class="d-flex align-center">
        <v-combobox
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            class="subtitle-2"
            label="ADDRESS"
            placeholder="Address"
            :append-icon="search ? 'mdi-close-circle' : ''"
            @click:append="$emit('clear')"
        >
            <template v-slot:prepend>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" size="20" class="icon tooltip">
                            mdi-help-circle-outline
                        </v-icon>
                    </template>
                    <span class="text-capitalize">tooltip text</span>
                </v-tooltip>
            </template>
            <template v-slot:append-outer>
                <v-icon size="15" class="icon" @click="$emit('add')">
                    mdi-plus
                </v-icon>
            </template>
        </v-combobox>
        <v-text-field
            v-show="addNumber"
            v-model="addressNumber"
            style="max-width: 40px"
            label="N"
            class="ml-6"
            @blur="merge_address"
        ></v-text-field>
    </div>
</template>

<script>
export default {
    name: 'AddressField',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    data: () => ({
        items: [],
        search: null,
        addressNumber: '',
        timeout: null,
        isLoading: false,
        addNumber: false,
    }),
    computed: {
        model: {
            get() {
                return this.value
            },
            set(val) {
                this.addNumber = true
                this.$emit('input', val)
            },
        },
    },
    watch: {
        search(val) {
            if (val === '' || val === null) return
            this.isLoading = true
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                const params = {
                    params: {
                        input: val,
                    },
                }
                this.$axios
                    .get('/api/', params)
                    .then(({ data }) => {
                        this.items = data.predictions.map(
                            item => item.description
                        )
                        this.isLoading = false
                    })
                    .catch(() => {
                        this.isLoading = false
                    })
            }, 1000)
        },
    },
    methods: {
        merge_address() {
            if (this.model === '' || this.addressNumber === '') return
            this.model = `${this.addressNumber}, ${this.model}`
            this.addNumber = false
        },
    },
}
</script>

<style scoped>
.icon {
    position: absolute;
    bottom: 15px;
}
.tooltip {
    left: -15px;
}
</style>
