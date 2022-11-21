import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../service/apiServices";
import "./MainInfor.scss"
const MainInfor = (props) => {
    const [image, setImage] = useState("");
    const [listInfor, setListInfor] = useState([]);
    const emailData = useSelector(state => state.user.account.email);
    // console.log(emailData)
    useEffect(() => {
        festAllUser();
    }, [image])
    const festAllUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            console.log(res.DT)
            setListInfor(res.DT);
            listInfor.map((value, index) => {
                if (value.email === emailData) {
                    if (value.image) {
                        setImage(value.image);
                        console.log(image);
                    }
                }
            })
        }
    }
    console.log(image);
    return (
        <div className="maininfor-container">
            <div className="header">
                <img src={`data:image/jpeg;base64,${image}`} />
                <div>Name</div>
                <div>a</div>
            </div>
            <div className="body"></div>
            <div className="footer"></div>
        </div>
    );
}
export default MainInfor;