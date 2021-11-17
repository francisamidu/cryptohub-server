const axios = require('axios').default

const config = {
    method: 'GET',
    url: `https://${process.env.CRYPTO_HOST}/exchanges`,
    headers: {
        'x-rapidapi-host': process.env.CRYPTO_HOST,
        'x-rapidapi-key': process.env.CRYPTO_API_KEY
    }
}
export default class ApiService {
    async static getCoins() {
        try {
            const { data } = await axios.request({
                ...config,
                url: `https://${process.env.CRYPTO_HOST}/coins`
            })
            return data
        } catch (error) {
            return error
        }
    }
    async static getExchanges() {
        try {
            const { data } = await axios.request(config)
            return data
        } catch (error) {
            return error
        }
    }
    async static getNews() {

    }
}