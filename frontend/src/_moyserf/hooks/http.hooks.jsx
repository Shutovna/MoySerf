import {useState, useCallback} from 'react'
import {toast} from "react-toastify";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (url, method = 'GET', body = null,
               headers = {"Content-Type": "application/json"}
        ) => {
            setLoading(true);
            try {
                console.log(`Requesting ${method} with ${url}`);
                const response = await fetch(url, {method, body, headers});
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setLoading(false);
                return data;

            } catch (e) {
                console.log(e);
                toast.error(e.message)
                setLoading(false);
                setError(e.message);
                throw e;
            }

        }, [])

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
}