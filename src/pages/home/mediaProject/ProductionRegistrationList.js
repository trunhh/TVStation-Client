import './PlanListPage.scss'

import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import planActions from '../../../actions/planActions'
import siteMapActions from '../../../actions/siteMapActions'
import { PRODUCTION_REGISTRATION_API } from '../../../constants/apiConstants'
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { PRODUCTION_REGISTRATION_DETAIL } from '../../../constants/routeConstants'
import Table from 'rsuite/Table';
import 'rsuite/Table/styles/index.css';
import Pagination from 'rsuite/Pagination';
import 'rsuite/Pagination/styles/index.css';
import IconButton from 'rsuite/IconButton';
import 'rsuite/IconButton/styles/index.css';
import ShareRound from '@rsuite/icons/ShareRound';
import { 
    CustomAddButton,
    CustomDateRangePicker,
    CustomSectorPicker,
    CustomStatusPicker, 
    CustomSitemapPicker,
    CustomUserPicker,
    CustomObjectTypePicker,
    CustomInputSearch ,
    CustomToggle
} from '../../../_sharecomponents/customrsuite/CustomRsuite'

const { Column, HeaderCell, Cell } = Table;

const ProductionRegistrationList = (props) => {
    const [query, setQuery] = useState({
        pageIndex: 1,
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(new Date().getFullYear(), 11, 31),
        sector: null,
        siteMapId: null,
        userName: null,
        objectType: null,
        status: null,
        keyword: null,
        isPersonal: false
    });
    
    const navigate = useNavigate();

    const handleQueryChange = (name, value) => {
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
        }));
    };
    
    
    const handleDateRangeChange = (dates) => {
        const [start, end] = dates;
        setQuery((prevQuery) => ({
          ...prevQuery,
          startDate: start,
          endDate: end,
        }));
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
        navigate(`${PRODUCTION_REGISTRATION_DETAIL}/${id}`);
    };

    const handleAddButtonClick = () => {
        navigate(`${PRODUCTION_REGISTRATION_DETAIL}`);
    };
    useEffect(() => {
        props.getList(query);
    }, [query]);

    useEffect(() => {
        if (props.isDeleted || props.isUpdated || props.isCreated) {
            props.getList(query); 
        }
    }, [props.isDeleted, props.isUpdated, props.isCreated]);

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
                <div className="filter-form">
                    <CustomDateRangePicker
                        placeholder="Phát sóng"
                        value={[query.startDate, query.endDate]}
                        onChange={handleDateRangeChange}
                    />
                    <CustomSectorPicker
                        value={query.sector}
                        onChange={(value) => handleQueryChange("sector", value)}
                    />
                    <CustomSitemapPicker
                        value={query.siteMapId}
                        onChange={(value) => handleQueryChange("siteMapId", value)}
                    />
                    <CustomUserPicker
                        value={query.userName}
                        onChange={(value) => handleQueryChange("userName", value)}
                    />
                    <CustomObjectTypePicker
                        value={query.objectType}
                        onChange={(value) => handleQueryChange("objectType", value)}
                    />
                    <CustomStatusPicker
                        value={query.status}
                        onChange={(value) => handleQueryChange("status", value)}
                    />
                    <CustomInputSearch
                        value={query.keyword}
                        onChange={(value, e) => handleQueryChange("keyword", value)}
                    />
                </div>

                <div className="blue-button-container">
                    <CustomToggle>
                        Cá nhân
                    </CustomToggle>
                    <CustomAddButton onClick={handleAddButtonClick}/>
                </div>
                <Table 
                    data={props.list} 
                    autoHeight = {true}
                    onRowClick={(rowData) =>handleRowClick(rowData.id)}
                >
                  <Column flexGrow={1} minWidth={50} fixed>
                    <HeaderCell>Id</HeaderCell>
                    <Cell>
                      {(rowData, rowIndex) => rowIndex + 1}
                    </Cell>
                  </Column>

                  <Column flexGrow={3} minWidth={150} fixed>
                    <HeaderCell>Tên</HeaderCell>
                    <Cell style={{ fontWeight: "bold"}} dataKey="title" />
                  </Column>

                  <Column flexGrow={2.5} minWidth={150}>
                    <HeaderCell>Trạng thái</HeaderCell>
                    <Cell dataKey="status" style={{ marginTop: '-5px' }}>
                        {rowData => <StatusBox status={rowData.status} />}
                    </Cell>
                  </Column >

                  <Column flexGrow={2} minWidth={120}>
                    <HeaderCell>Dự kiến phát sóng</HeaderCell>
                    <Cell>
                        {rowData => new Intl.DateTimeFormat('en-GB').format(new Date(rowData.airdate))}
                    </Cell>
                  </Column>

                  <Column flexGrow={2} minWidth={120}>
                    <HeaderCell>Ngày tạo</HeaderCell>
                    <Cell>
                        {rowData => new Intl.DateTimeFormat('en-GB').format(new Date(rowData.createdDate))}
                    </Cell>
                  </Column>

                  <Column flexGrow={2} minWidth={120}>
                    <HeaderCell>Người tạo</HeaderCell>
                    <Cell dataKey="creatorName" />
                  </Column>

                  <Column align="center" flexGrow={1.5} minWidth={100}> 
                    <HeaderCell>Thao tác</HeaderCell>
                    <Cell>
                        <div style={{ display: 'flex', marginTop: '-10px' }}>
                            <IconButton icon={<ShareRound />} appearance="link" />
                            <IconButton icon={<ShareRound />} appearance="link" />
                        </div>
                    </Cell>
                  </Column>
                </Table>

                {props.pageCount > 0 && (
                    <Pagination total={props.pageCount} limit={5} activePage={query.pageIndex} onChangePage={handlePageClick} />
                )}
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
