import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (url: string, options: any = {}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios(url, options);
                setData(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { loading, error, data };
};

export default useApi;