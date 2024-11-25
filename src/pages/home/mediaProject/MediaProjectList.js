import '../PlanListPage.scss'

import { MdEdit } from 'react-icons/md'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { MdAddToPhotos } from 'react-icons/md'
import { MdOutlineClose } from 'react-icons/md'
import { MdSearch } from 'react-icons/md'
//import MediaProjectForm from './MediaProjectForm'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import mediaProjectActions from '../../../actions/mediaProjectActions'
import { SectorConst, StatusConst } from '../../../constants/constants'

const MediaProjectList = (props) => {
    const [mediaProjectItem, setMediaProjectItem] = useState({})
    const [buttonText, setButtonText] = useState('Create')

    const currentYear = new Date().getFullYear()
    const [year, setYear] = useState(currentYear)
    const minDate = new Date(year, 0, 1)
    const maxDate = new Date(year, 11, 31)
    const [dateRange, setDateRange] = useState([minDate, maxDate])
    const [startDate, endDate] = dateRange

    const [sector, setSector] = useState(null)

    const [status, setStatus] = useState(null)

    const [keyword, setKeyword] = useState('');

    const [pageCount, setPageCount] = useState(props.totalPagesMediaProject)
    const PAGE_NUMBER = 1
    const PAGE_SIZE = 10
    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleSectorChange = (e) => {
        setSector(e.target.value);
    }
    
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleYearChange = (selectedYear) => {
        setYear(selectedYear);

        // Update default dates for the new year
        const newStartDate = new Date(selectedYear, 0, 1);
        const newEndDate = new Date(selectedYear, 11, 31);
        setDateRange([newStartDate, newEndDate]);
    };

    const handleDateRangeChange = (dates) => {
        if (dates[0] === null && dates[1] === null) {
            setDateRange([minDate, maxDate]);
        } else {
            setDateRange(dates);
        }
    };

    const handleClickAddProject = () => {
        setMediaProjectItem({
            name: '',
            type: '',
            createdAt: '',
            totalMember: ''
        })
        setButtonText('Create')
        props.toggleMediaProjectForm(true)
    }

    const handleClickEdit = (item) => {
        setButtonText('Save')
        props.toggleMediaProjectForm(true)

        let projectIndex = props.mediaProjects.findIndex(x => x.id == item.id)

        setMediaProjectItem(props.mediaProjects[projectIndex])
    }

    const handleClickDelete = (item) => {
        console.log(item);
        props.deleteMediaProject(item.id);
    }


    useEffect(() => {
        props.getListMediaProject()
    }, [props.mediaProjectUpdated, props.mediaProjectCreated, props.mediaProjectDeleted])

    useEffect(() => {
        handleClickSearch(); // Call the search function on page load
      }, []);

    const handleClickSearch = () => {
        let projectFilterForm = {
            keyword: keyword,
            sector: sector,
            status: status,
            startDate: startDate,
            isPersonal: false,
            endDate: endDate,
            pageIndex: PAGE_NUMBER,
            pageSize: PAGE_SIZE
        }
        props.getListMediaProject(projectFilterForm)
    }

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    console.log('Media Project list rerender...')
    return (
        <div className="plan-list">
            <div className="content">
                {/* {   
                    props.mediaProjectFormOpened && <MediaProjectForm mediaProjectItem={mediaProjectItem} buttonText={buttonText}/>
                } */}
                <div className="filter-form">
                    <select 
                        className="form-control-filter" 
                        value={year} 
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
                        className="react-datepicker__input-container"
                        selected={startDate}
                        onChange={handleDateRangeChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFormat="dd/MM"
                        placeholderText="Select a date range"
                        isClearable
                    />
                    
                    <select 
                        className="form-control-filter" 
                        value={sector} 
                        onChange={handleSectorChange}
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
                        value={status} 
                        onChange={handleStatusChange}
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
                        value={keyword}
                        onChange={handleKeywordChange} 
                        className="search-bar" 
                    />

                    <div className="icon-search">
                        <MdSearch onClick={handleClickSearch} fontSize="1.2rem"/>
                    </div>
                </div>
                <div className="icon-add">
                    <MdAddToPhotos fontSize="1.2rem" style={{ cursor: 'pointer' }}
                        onClick={handleClickAddProject}
                    />
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
                            props.mediaProjects && props.mediaProjects.map((item, index) => {
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
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.view.isLoading,
        mediaProjects: state.mediaProject.mediaProjects,
        totalPagesMediaProject: state.mediaProject.totalPagesMediaProject,
        mediaProjectUpdated: state.mediaProject.mediaProjectUpdated,
        mediaProjectCreated: state.mediaProject.mediaProjectCreated,
        mediaProjectDeleted: state.mediaProject.mediaProjectDeleted,
        mediaProjectFormOpened: state.mediaProject.mediaProjectFormOpened
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMediaProjectForm: (isOpen) => {
            dispatch(mediaProjectActions.toggleMediaProjectForm(isOpen))
        },
        getListMediaProject: (filterForm) => {
            dispatch(mediaProjectActions.getListMediaProject(filterForm))
        },
        deleteMediaProject: (id) => {
            dispatch(mediaProjectActions.deleteMediaProject(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectList)
