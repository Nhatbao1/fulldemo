import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaList, FaGithub, FaRegLaughWink, FaGem, FaHeart, } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
const SideBar = (props) => {
    const { image, toggled, handleToggleSidebar, collapsed } = props;
    return (
        <>
            <ProSidebar
                // image={image ? sidebarBg : false}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    >
                        <DiReact size={'3em'} color={"00bfff"} />
                        Hoi Dan IT
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            Dashboard
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title="Features"
                        >
                            <MenuItem>
                                Quản Lý Users
                                <Link to="/admin/manageuser" />
                            </MenuItem>
                            <MenuItem>
                                Quản Lý Bài Quiz
                                <Link to="/admin/managequizz" />
                            </MenuItem>
                            <MenuItem>
                                Quản Lý Câu Hỏi
                                <Link to="/admin/managequestion" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div className='side-btn-wrapper'
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a href="http://github">
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden',textOverflow: 'ellips' }}>ViewSource</span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
}
export default SideBar;