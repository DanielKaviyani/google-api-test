export default function ({ $axios }) {
    $axios.onRequest(config => {
        config.params.key = process.env.API_KEY
    })
}
