const TableUser = (props) => {
    const { listUser,handleClickBtnUpdate,handleClickBtnView,handleClickBtnDelete} = props;
    return (
        <>
            <table className="table table-hover table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUser && listUser.length > 0 &&
                        listUser.map((user, index) => {
                            return (
                                <tr key={`table-users-${index + 1}`}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="button-table">
                                        <button className="btn btn-info" onClick={() =>{handleClickBtnView(user)}} >View</button>
                                        <button 
                                            className="btn btn-warning" onClick={() =>{handleClickBtnUpdate(user)}}>Update</button>
                                        <button className="btn btn-danger" onClick={() =>{handleClickBtnDelete(user)}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0 && <tr><td colSpan={4}>Not found Data </td></tr>}
                </tbody>
            </table>
        </>
    )
}
export default TableUser;