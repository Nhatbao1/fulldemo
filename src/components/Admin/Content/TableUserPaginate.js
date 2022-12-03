import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
const TableUserPaginate = (props) => {
    const { listUser, handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete, festListUsersWithPaginate, pageCount, currentPage, setCurrentPage } = props;
    const handlePageClick = (event) => {
        festListUsersWithPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
    };
    return (
        <>
            <table className="table table-hover table-bordered">
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
                                        <button className="btn btn-info" onClick={() => { handleClickBtnView(user) }} >View</button>
                                        <button
                                            className="btn btn-warning" onClick={() => { handleClickBtnUpdate(user) }}>Update</button>
                                        <button className="btn btn-danger" onClick={() => { handleClickBtnDelete(user) }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0 && <tr><td colSpan={4}>Not found Data </td></tr>}
                </tbody>
            </table>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    )
}
export default TableUserPaginate;