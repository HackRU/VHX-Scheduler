/**
 * Login and set cookies
 */
import {httpClient} from "../handlers/axiosConfig"
export async function loginHandler(username,password){
    //call our lambda function
    const request_data = {
        "login":username,
        "password":password
    }
    await httpClient.post("/login",request_data).then(response =>{
        return {"status":200,"body":response};
    }).catch(() =>{
          return {"status":400,"body":"error in making request"}
    });
}