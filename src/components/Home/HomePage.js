import VideoHomePage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={VideoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title">
                    {t('homepage.title')}
                </div>
                <div className="para">
                    {t('homepage.para')}
                </div>
                <div className="button-hp">
                    {isAuthenticated === true ?
                        <button className="btn_1" onClick={() => { navigate("/users") }}>{t('homepage.btn_1')}
                        </button>
                        :
                        <button className="btn_2" onClick={() => { navigate("/login") }}>{t('homepage.btn_2')}
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
export default HomePage;