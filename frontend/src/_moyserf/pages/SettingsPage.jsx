import {useEffect, useRef, useState} from "react";
import useAvatarService from "../services/AvatarService.jsx"
import {useAuth} from "../auth/AuthProvider.jsx";
import ImageViewer from "../components/ImageViewer.jsx";

const SettingsPage = () => {
    const [file, setFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const {user} = useAuth();
    const {uploadAvatar} = useAvatarService();

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file.name);
            setFile(file);
            uploadAvatar(file)
                .then((res) => {
                    console.log(res);
                    setAvatarUrl(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    return (
        <div>
            <ImageViewer userId={user.id}/>
            <input ref={fileInputRef} type="file" onChange={handleFileChange} className={"visually-hidden"}/>
            <button onClick={handleButtonClick}>Загрузить аватар</button>
        </div>
    );
}

export default SettingsPage;