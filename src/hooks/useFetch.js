import React from 'react'
import { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api'

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch(err => {
                setLoading(false)
                setError("Something went wrong");
            })



    }, [url]);

    return { data, loading, error };

}

export default useFetch


/*

Custom Hooks :-

1. useFetch is not a component; it's a custom hook. In React, a custom hook is a JavaScript
   function that starts with the word "use" and can call other hooks if needed. Custom hooks
   are a way to reuse stateful logic across different components.

2. When you use a custom hook like useFetch, you invoke it in your functional component,
   and it returns the state values (in your case, data, loading, and error). The syntax
   is similar to calling a function.


*/