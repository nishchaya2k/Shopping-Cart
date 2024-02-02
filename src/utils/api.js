import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

//url and params are the endpoints we will send and according to it data will be fetched
export const fetchDataFromApi = async (endpoint, params) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};



//Asynchronous programming enables programs to start a potentially long-running task and still be able to be responsive to other events while that task runs.
//url is endpoint and params are like we want to pass some extra params in url so as a second argument we will pass it we will send and according to it data will be fetched
//API Parameters are options that can be passed with the endpoint to influence the response