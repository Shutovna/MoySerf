import React, {useState, useEffect} from 'react';
import {useApi} from '../hooks/api.hooks.jsx';
import * as logger from "react-dom/test-utils";
import {BACKEND_BASE_URL} from "../constants/index.js";

function ImageViewer({userId}) {
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {blobRequest} = useApi();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await blobRequest(`${BACKEND_BASE_URL}/api/avatars/${userId}`);
                if (!response.ok) {
                    throw new Error(`Image not found: ${response.statusText}`);
                }
                const blob = await response.blob();
                // Принудительно устанавливаем Content-Type
                const newBlob = new Blob([blob], { type: 'image/jpeg' });

                const imageUrl = URL.createObjectURL(newBlob);
                setImageSrc(imageUrl);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImage()
            .then(res => console.log(res))
            .catch(res => console.log(res))

    }, []);

    if (loading) return <p>Loading image...</p>;
    if (error) return <p>Error loading image: {error}</p>;

    return (
        <div>
            {imageSrc && <img className={"avatar"} src={imageSrc} alt={userId}/>}
        </div>
    );
}

export default ImageViewer;