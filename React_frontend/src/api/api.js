import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export const sendSms = async (data) => {
    console.log(data);
    try {
        return await api.post(`/api/sendsms`, data)

    } catch (error) {
        console.log('error while calling', error)
    }
}

export const getNumber = async () => {
    try {
        return await api.get(`/api/getNumber`)
    } catch (error) {
        console.log(`error while calling `, error);
    }
}

export const getMessage = async (data) => {
    try {
        return await api.post(`/api/getsms`, data)
    } catch (error) {
        console.log(`error while calling`, error);
    }
}