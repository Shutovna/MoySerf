import {useEffect, useRef, useState} from "react";
import useAvatarService from "../services/AvatarService.jsx"
import {useAuth} from "../auth/AuthProvider.jsx";
import ImageViewer from "../components/ImageViewer.jsx";


const SettingsPage = () => {
    const [file, setFile] = useState();
    const [changed, setChanged] = useState(true);
    const {user} = useAuth();
    const {uploadAvatar, rotateAvatar} = useAvatarService();

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    function rotate(e, angle) {
        e.preventDefault();
        rotateAvatar(angle)
            .then(() => setChanged(!changed))

    }

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            console.log('Selected file:', newFile.name);
            uploadAvatar(newFile)
                .then((res) => {
                    console.log(res);
                    setFile(newFile);
                    setChanged(!changed);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    return (
        <div>
            <div className={"d-inline-block justify-content-center align-items-center text-center"}>
                <ImageViewer changed={changed} userId={user.id} file={file} className={""}/>
                <div className={"d-flex justify-content-between"}>
                    <a onClick={(e) => rotate(e, 90)} href={"#"}><i className='fs-4 bx bx-left-arrow-circle'></i></a>
                    <a onClick={(e) => rotate(e,-90)} href={"#"}><i className='fs-4 bx bx-right-arrow-circle'></i></a>
                </div>
                <div>
                    <input ref={fileInputRef} type="file" onChange={handleFileChange} className={"visually-hidden"}/>
                    <button onClick={handleButtonClick}>Загрузить аватар</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;