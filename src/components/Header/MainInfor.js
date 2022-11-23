import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, postUpdateProfile } from "../../service/apiServices";
import Lightbox from "react-awesome-lightbox";
import { FcPlus } from 'react-icons/fc';
import "./MainInfor.scss";
import Button from 'react-bootstrap/Button';
import { doChange, doLogin } from "../../redux/action/userAction"
import { ToastContainer, toast } from "react-toastify";
const MainInfor = () => {
    const data = useSelector(state => state.user.account);
    const nameData = useSelector(state => state.name.username)
    const [isPreviewImage, setIsPreviewImage] = useState();
    const [image, setImage] = useState();
    const [username, setUserName] = useState(nameData);
    const dispatch = useDispatch();
    let listUser = [];
    useEffect(() => {
        festListUser();
    }, []);
    const festListUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            listUser = res.DT;
            listUser.map((value, index) => {
                if (value.email === data.email) {
                    if (value.image) {
                        setImage(value.image);
                    }
                }
            })
        }
    }
    const handleUpdateProfile = async () => {
        let res = await postUpdateProfile(username, isPreviewImage);
        if (res && res.EC === 0) {
            toast.success(res.EM, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        dispatch(doChange(res));
    }
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setIsPreviewImage(event.target.files[0]);
        }
    }
    return (
        <>
            <form className="row g-3">
                <div className="col-6">
                    <label className="visually">Email: </label>
                    <input type="email" className="form-control" value={data.email} disabled />
                </div>
                <div className="col-8">
                    <label className="visually">Name: </label>
                    <input type="text" className="form-control" value={username} onChange={(event) => { setUserName(event.target.value) }} />
                </div>
                <div className="col-3">
                    <label className="visually">Role: </label>
                    <input type="text" className="form-control" value={data.role} disabled />
                </div>
                <div className='col-md-12'>
                    <label className='form-label label-upload' htmlFor='labelUpload'>
                        <FcPlus />
                        Upload File Image
                    </label>
                    <input
                        type="file"
                        hidden
                        id='labelUpload'
                        onChange={(event) => { handleUploadImage(event) }}
                    // ban chat nhan vao Upload FIle Image la dang thao tac voi input
                    />
                </div>
                <div className='col-md-12'>
                    {image ?
                        <div className="image">
                            <img src={`data:image/jpeg;base64,${image}`} />
                        </div>
                        :
                        <div className="image">

                        </div>
                    }
                </div>
                <div className="col-md-12">
                    <Button variant="secondary" onClick={() => { handleUpdateProfile() }}>
                        Update Profile
                    </Button>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default MainInfor;