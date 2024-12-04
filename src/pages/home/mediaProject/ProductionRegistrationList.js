import '../PlanListPage.scss'

import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import planActions from '../../../actions/planActions'
import siteMapActions from '../../../actions/siteMapActions'
import { SectorConst, StatusConst } from '../../../constants/constants'
import { PRODUCTION_REGISTRATION_API } from '../../../constants/apiConstants'
import ToggleSwitch from '../../../_sharecomponents/customswitch/ToggleSwitch'
import DateRangePicker from '../../../_sharecomponents/filterform/DateRangePicker';
import DropdownFilter from '../../../_sharecomponents/filterform/DropdownFilter';
import SearchInput from '../../../_sharecomponents/filterform/SearchInput';
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { PRODUCTION_REGISTRATION_DETAIL } from '../../../constants/routeConstants'
import Table from 'rsuite/Table';

// (Optional) Import component styles. If you are using Less, import the `index.less` file. 
import 'rsuite/Table/styles/index.css';
const { Column, HeaderCell, Cell } = Table;

const ProductionRegistrationList = (props) => {
    const [query, setQuery] = useState({
        pageIndex: 1,
        year: new Date().getFullYear(),
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(new Date().getFullYear(), 11, 31),
        sector: '', 
        status: '', 
        keyword: '',
    });
    
    const navigate = useNavigate();

    const handleQueryChange = (e) => {
        const { name, value } = e.target;
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
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


    const handleDeleteClick = (item) => {
        props.remove(item.id);
        props.clearSelected();
    }

    const handleRowClick = (id) => {
        console.log(1)
    //    navigate(`${PRODUCTION_REGISTRATION_DETAIL}/${id}`);
    };

    const handleAddButtonClick = () => {
        navigate(`${PRODUCTION_REGISTRATION_DETAIL}`);
    };

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
                        onClick={handleAddButtonClick}
                    >
                        Thêm +
                    </button>
                </div>
                <Table data={props.list} autoHeight = {true}>
                  <Column flexGrow={1}>
                    <HeaderCell>Id</HeaderCell>
                    <Cell>
                      {(rowData, rowIndex) => rowIndex + 1} {/* Render row index */}
                    </Cell>
                  </Column>

                  <Column flexGrow={3}>
                    <HeaderCell>Tên</HeaderCell>
                    <Cell dataKey="title" />
                  </Column>

                  <Column flexGrow={2.5}>
                    <HeaderCell>Trạng thái</HeaderCell>
                    <Cell dataKey="status" >
                        {rowData => <StatusBox status={rowData.status} />}
                    </Cell>
                  </Column >

                  <Column flexGrow={2}>
                    <HeaderCell>Dự kiến phát sóng</HeaderCell>
                    <Cell>
                        {rowData => new Intl.DateTimeFormat('en-GB').format(new Date(rowData.airdate))}
                    </Cell>
                  </Column>

                  <Column flexGrow={2}>
                    <HeaderCell>Ngày tạo</HeaderCell>
                    <Cell>
                        {rowData => new Intl.DateTimeFormat('en-GB').format(new Date(rowData.createdDate))}
                    </Cell>
                  </Column>

                  <Column flexGrow={2}>
                    <HeaderCell>Người tạo</HeaderCell>
                    <Cell dataKey="creatorName" />
                  </Column>

                  <Column align="center" flexGrow={1}>
                    <HeaderCell>Thao tác</HeaderCell>
                    <Cell>
                        {rowData => <MdOutlineDeleteForever fontSize="1.2rem"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteClick(rowData)
                            }}
                        />}
                        
                    </Cell>
                  </Column>
                </Table>

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
        getList: (query) => dispatch(planActions.getList(PRODUCTION_REGISTRATION_API, query)),
        get: (id) => dispatch(planActions.get(PRODUCTION_REGISTRATION_API, id)),
        remove: (id) => dispatch(planActions.remove(PRODUCTION_REGISTRATION_API, id)),
        clearSelected: () => dispatch(planActions.clearSelected),
        getSiteMaps: ()=>dispatch(siteMapActions.getList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductionRegistrationList)
