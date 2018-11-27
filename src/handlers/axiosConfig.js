import Axios from "axios";

export const httpClient = {
    baseUrl = Axios.create({
        baseURL:"",
        timeout: 3000
    })
}
