import '../PlanListPage.scss'

import { MdEdit } from 'react-icons/md'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { MdAddToPhotos } from 'react-icons/md'
import { MdOutlineClose } from 'react-icons/md'
import { MdSearch } from 'react-icons/md'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import planActions from '../../../actions/planActions'
import { SectorConst, StatusConst } from '../../../constants/constants'
import { MEDIA_PROJECT_API } from '../../../constants/apiConstants'
import ToggleSwitch from '../../../_sharecomponents/customswitch/ToggleSwitch'

const MediaProjectList = (props) => {
    const [query, setQuery] = useState({
        pageIndex: 1,
        year: new Date().getFullYear(),
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(new Date().getFullYear(), 11, 31)
    });

    const handleQueryChange = (e) => {
        const { name, value } = e.target;
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
        }));
    };
    
    // Handle year change and update the date range in query
    const handleYearChange = (selectedYear) => {
        setQuery(prevQuery => ({
            ...prevQuery,
            year: selectedYear,
            startDate: new Date(selectedYear, 0, 1),
            endDate: new Date(selectedYear, 11, 31)
        }));
    };
    
    // Handle date range change and update the query object
    const handleDateRangeChange = (dates) => {
        const [start, end] = dates;
        setQuery((prevQuery) => ({
          ...prevQuery,
          startDate: start,
          endDate: end, // If only one date is selected, set both to that date
        }));
      };



    const handleClickDelete = (item) => {
        props.remove(item.id);
    }

    const handleClickSearch = () => {
        props.getList(query)
    }


    useEffect(() => {
        props.getList()
    }, [props.isUpdated, props.isCreated, props.isDeleted])

    useEffect(() => {
        handleClickSearch(); // Call the search function on page load
      }, []);

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    console.log('Media Project list rerender...')
    return (
        <div className="plan-page">
            <div className="plan-summary">
                <div className="summary-box">
                    <i className="fa-solid fa-note-sticky icon-total"></i>
                    <div className="summary-text-container">
                        <p className="title-text">Tổng số</p>
                        <p className="value-text-total">{query.totalCount}</p>
                    </div>
                    
                </div>
                <div className="summary-box">
                    <i className="fa-solid fa-pen-to-square icon-in-progress"></i>
                    <div className="summary-text-container">
                        <p className="title-text">Đang thực hiện</p>
                        <p className="value-text-in-progress">{query.inProgressCount}</p>
                    </div>
                </div>
                <div className="summary-box">
                    <i className="fa-solid fa-spinner icon-waiting-approval"></i>
                    <div className="summary-text-container">
                        <p className="title-text">Chờ duyệt</p>
                        <p className="value-text-waiting-approval">{query.waitingApproval}</p>
                    </div>
                </div>
                <div className="summary-box">
                    <i className="fa-solid fa-circle-check icon-approved"></i>
                    <div className="summary-text-container">
                        <p className="title-text">Đã duyệt</p>
                        <p className="value-text-approved">{query.approved}</p>
                    </div>
                </div>
            </div>
            <div className="plan-list">
                <div className="content">
                    <div className="filter-form">
                        <select 
                            className="form-control-filter" 
                            value={query.year} 
                            onChange={(e) => handleYearChange(Number(e.target.value))}
                        >
                            <option value="Year" hidden>Năm</option>
                            {Array.from({ length: 6 }, (_, index) => {
                                const currentYear = new Date().getFullYear();
                                const yearValue = currentYear + index;
                                return (
                                    <option key={yearValue} value={yearValue}>
                                        Năm {yearValue}
                                    </option>
                                );
                            })}
                        </select>
                        <DatePicker
                            selected={query.startDate}
                            onChange={handleDateRangeChange}
                            startDate={query.startDate}
                            endDate={query.endDate}
                            selectsRange
                            minDate={new Date(query.year, 0, 1)}
                            maxDate={new Date(query.year, 11, 31)}
                            dateFormat="dd/MM"
                            placeholderText="Select a date range"
                            isClearable
                        />

                        <select 
                            className="form-control-filter" 
                            value={query.sector} 
                            onChange={handleQueryChange}
                        >
                            <option value="">Loại hình báo chí</option>
                            {Object.keys(SectorConst).map((key) => (
                                <option key={key} value={key}>
                                    {SectorConst[key]} {}
                                </option>
                            ))}
                        </select>

                        <select 
                            className="form-control-filter" 
                            value={query.status} 
                            onChange={handleQueryChange}
                        >
                            <option value="">Trạng thái</option>
                            {Object.keys(StatusConst).map((key) => (
                                <option key={key} value={key}>
                                    {StatusConst[key]} {}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={query.keyword}
                            onChange={handleQueryChange} 
                            className="search-bar" 
                        />

                        <ToggleSwitch
                            value={query.isPersonal} 
                            handleChange={handleQueryChange}
                            label = "Cá nhân"
                        />

                        <div className="icon-search">
                            <MdSearch onClick={handleClickSearch} fontSize="1.2rem"/>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Người tạo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data && props.data.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>
                                                <span className={`status-box ${item.status.toLowerCase()}`}>
                                                    {StatusConst[item.status]}
                                                </span>
                                            </td>
                                            <td>{new Intl.DateTimeFormat('en-GB').format(new Date(item.createdDate))}</td>
                                            <td>{item.creator}</td>
                                            <td>
                                                <MdOutlineDeleteForever fontSize="1.2rem"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleClickDelete(item)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="paging">
                        <ReactPaginate
                            nextLabel="next >"
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={2}
                            pageCount={query.pageCount}
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
                        />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.plan ,
        isLoading: state.view.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (query) => {
            dispatch(planActions.getList(MEDIA_PROJECT_API, query))
        },
        remove: (id) => {
            dispatch(planActions.remove(MEDIA_PROJECT_API, id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectList)
