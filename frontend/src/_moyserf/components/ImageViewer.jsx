import React, {useState, useEffect} from 'react';
import {useApi} from '../hooks/api.hooks.jsx';
import * as logger from "react-dom/test-utils";
import {BACKEND_BASE_URL} from "../constants/index.js";
import emptyAvatar from "../../assets/images/_moyserf/empty_avatar.avif";

function ImageViewer({userId, changed}) {
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {blobRequest} = useApi();

    const fetchImage = async () => {
        try {
            const response = await blobRequest(`${BACKEND_BASE_URL}/api/avatars/${userId}`);
            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = blob.size === 0 ? "" : URL.createObjectURL(blob);
                setImageSrc(imageUrl);
            } else {
                throw new Error(`Image not found: ${response.statusText}`);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImage()
            .then(res => console.log(res))
            .catch(res => console.log(res))
    }, []);

    useEffect(() => {
        fetchImage();
    }, [changed]);

    if (loading) return <p>Загрузка изображения...</p>;
    if (error) return <p>Ошибка загрузки изображения: {error}</p>;

    return (
        <div>
            {imageSrc ? <img className={"avatar"} src={imageSrc} alt={userId}/>
                : <img className={"avatar"} src={emptyAvatar} alt={userId}/>
            }
        </div>
    );
}

export default ImageViewer;