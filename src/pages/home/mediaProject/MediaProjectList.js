import './PlanListPage.scss'

import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import planActions from '../../../actions/planActions'
import siteMapActions from '../../../actions/siteMapActions'
import { SectorConst, StatusConst } from '../../../constants/constants'
import { MEDIA_PROJECT_API } from '../../../constants/apiConstants'
import ToggleSwitch from '../../../_sharecomponents/customswitch/ToggleSwitch'
import YearDropdown from '../../../_sharecomponents/filterform/YearDropdown';
import DateRangePicker from '../../../_sharecomponents/filterform/DateRangePicker';
import DropdownFilter from '../../../_sharecomponents/filterform/DropdownFilter';
import SearchInput from '../../../_sharecomponents/filterform/SearchInput';
import { MdOutlineDeleteForever } from 'react-icons/md'
//Modal form
import MediaProjectDetail from './MediaProjectDetail'


const MediaProjectList = (props) => {
    const [query, setQuery] = useState({
        pageIndex: 1,
        year: new Date().getFullYear(),
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(new Date().getFullYear(), 11, 31),
        sector: '', 
        status: '', 
        keyword: '',
    });

    const [isModalOpen, setModalOpen] = useState(false);
    


    const handleQueryChange = (e) => {
        const { name, value } = e.target;
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
        }));
        props.getList(query)
    };
    
    const handleYearChange = (selectedYear) => {
        setQuery(prevQuery => ({
            ...prevQuery,
            year: selectedYear,
            startDate: new Date(selectedYear, 0, 1),
            endDate: new Date(selectedYear, 11, 31)
        }));
        props.getList(query)
    };
    
    const handleDateRangeChange = (dates) => {
        const [start, end] = dates;
        setQuery((prevQuery) => ({
          ...prevQuery,
          startDate: start,
          endDate: end,
        }));
        props.getList(query)
      };

    const handlePageClick = (selectedPage) => {
        setQuery(prevQuery => ({
            ...prevQuery,
            pageIndex: selectedPage.selected + 1,
        }));
        props.getList({ ...query, pageIndex: selectedPage.selected + 1 });
    };

    const handleRowClick = (id) => {
        props.get(id);
        setModalOpen(true);
    };

    const handleAddNewClick = () => {
        props.clearSelected();
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        props.clearSelected();
    };

    const handleDeleteClick = (item) => {
        props.remove(item.id);
        props.clearSelected();
    }

    useEffect(() => {
        if (props.isDeleted || props.isUpdated || props.isCreated) {
            props.getList(query); 
        }
    }, [props.isDeleted, props.isUpdated, props.isCreated, query]);

    useEffect(() => {
        props.getList(query);
        props.getSiteMaps();
      }, []);

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    const summaryData = [
        {
            name: "total",
            icon: "fa-note-sticky",
            title: "Tổng số",
            value: props.totalCount,
        },
        {
            name: "in-progress",
            icon: "fa-pen-to-square",
            title: "Đang thực hiện",
            value: props.inProgressCount
        },
        {
            name: "waiting-approval",
            icon: "fa-spinner",
            title: "Chờ duyệt",
            value: props.waitingApprovalCount,
        },
        {
            name: "approved",
            icon: "fa-circle-check",
            title: "Đã duyệt",
            value: props.approvedCount
        }
    ];
    
    const renderFilterForm = () => {
        return (
            <div className="filter-form">
                <YearDropdown 
                    value={query.year} 
                    onChange={(e) => handleYearChange(Number(e.target.value))} 
                />
                <DateRangePicker 
                    startDate={query.startDate}
                    endDate={query.endDate}
                    onChange={handleDateRangeChange}
                    year={query.year}
                />
                <DropdownFilter
                    value={query.sector}
                    options={SectorConst}
                    valueKey = "value"
                    displayKey = "value_i18n"
                    onChange={handleQueryChange}
                    placeholder="Loại hình báo chí"
                />
                <DropdownFilter
                    value={query.siteMapId}
                    options={props.siteMaps}
                    valueKey = "id"
                    displayKey = "name"
                    onChange={handleQueryChange}
                    placeholder="Phòng ban"
                />
                <DropdownFilter
                    value={query.status}
                    options={StatusConst}
                    valueKey = "value"
                    displayKey = "value_i18n"
                    onChange={handleQueryChange}
                    placeholder="Trạng thái"
                />
                <SearchInput 
                    value={query.keyword} 
                    onChange={handleQueryChange} 
                    placeholder="Tìm kiếm..."
                />
                <ToggleSwitch
                    value={query.isPersonal} 
                    handleChange={handleQueryChange}
                    label = "Cá nhân"
                />
            </div>
        );
    };

    const renderTable = () => {
        return (
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
                    {props.list && props.list.map((item, index) => {
                        return (
                            <tr key={item.id} onClick={() => handleRowClick(item.id)}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>
                                    <span className={`status-box ${item.status.toLowerCase()}`}>
                                        {StatusConst.find(status => status.value === item.status)?.value_i18n || "Unknown Status"}
                                    </span>
                                </td>
                                <td>{new Intl.DateTimeFormat('en-GB').format(new Date(item.createdDate))}</td>
                                <td>{item.creatorName}</td>
                                <td>
                                    <MdOutlineDeleteForever fontSize="1.2rem"
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDeleteClick(item)
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    };

    const renderModal = () => {
        return(
        <MediaProjectDetail
            onClose={handleCloseModal}
            selected={props.selected}
        />)
    }

    console.log('Media Project list rerender...')
    return (
        <div className="plan-page">
            <div className="plan-summary">
                {summaryData.map((item, index) => (
                    <div className="summary-box" key={index}>
                        <i className={`fa-solid ${item.icon} icon-${item.name}`}></i>
                        <div className="summary-text-container">
                            <p className="title-text">{item.title}</p>
                            <p className={`value-text-${item.name}`}>{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="plan-list">
                {renderFilterForm()}

                <div className="blue-button-container">
                    <button
                        className="blue-button"
                        onClick={handleAddNewClick}
                    >
                        Thêm +
                    </button>
                </div>
                
                {renderTable()}

                <div className="paging">
                    {props.pageCount > 1 && (
                        <ReactPaginate
                            nextLabel="Next >"
                            previousLabel="< Previous"
                            pageCount={props.pageCount}
                            onPageChange={handlePageClick}
                            containerClassName="pagination-row"
                            activeClassName="active"
                            disabledClassName="disabled"
                        />
                    )}
                </div>
            </div>
            {isModalOpen && renderModal()}
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.plan ,
        isLoading: state.view.isLoading,
        siteMaps: state.siteMap.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (query) => dispatch(planActions.getList(MEDIA_PROJECT_API, query)),
        get: (id) => dispatch(planActions.get(MEDIA_PROJECT_API, id)),
        remove: (id) => dispatch(planActions.remove(MEDIA_PROJECT_API, id)),
        clearSelected: () => dispatch(planActions.clearSelected),
        getSiteMaps: ()=>dispatch(siteMapActions.getList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectList)
