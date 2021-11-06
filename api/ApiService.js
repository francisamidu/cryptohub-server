const axios = require('axios')

const headers = {
    'x-rapidapi-host':process.env.CRYPTO_HOST,
    'x-rapidapi-key':process.env.CRYPTO_API_KEY   
}
export default class ApiService{
    async static getCoins(){
        try {
            const { data } = await axios.get(`${headers['x-rapidapi-host']}/coins`)
            return data 
        } catch (error) {
            return error            
        }
    }
    async static getExchanges(){
        try {
            const { data } = await axios.get(`${headers['x-rapidapi-host']}/exchanges`)
            return data 
        } catch (error) {
            return error            
        }
    }
    async static getNews(){

    }
}