import { propTypes } from 'react-bootstrap/esm/Image';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    console.log(isAuthenticated)
    if (!isAuthenticated) {
        return (
            <Navigate to="/login"></Navigate>
            // khong back lai duoc trang home vi trang truoc do la user -> click back de bi da lai trang homepage
        );
    } else {
        return (
            <>
                {props.children}
            </>
        );
    }

}
export default PrivateRoute;