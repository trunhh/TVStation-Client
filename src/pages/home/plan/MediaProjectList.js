import './PlanListPage.scss'

import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import planActions from '../../../actions/planActions'
import siteMapActions from '../../../actions/siteMapActions'
import { MEDIA_PROJECT_API, MEDIA_UPLOAD_API} from '../../../constants/apiConstants'
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox'
import { useNavigate } from 'react-router-dom';
import { MEDIA_PROJECT_DETAIL} from '../../../constants/routeConstants'
import { PAGE_SIZE } from '../../../constants/constants'

const MediaProjectList = (props) => {
    const [query, setQuery] = useState({
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(new Date().getFullYear(), 11, 31),
        sector: null,
        siteMapId: null,
        status: null,
        keyword: "",
        isPersonal: false
    });

    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState('true');
    
    const navigate = useNavigate();

    const handleQueryChange = (name, value) => {
        setQuery(prevQuery => ({
            ...prevQuery,
            [name]: value
        }));
    };

    const handleCloseModal = () => setOpen(false)
    
    
    const handleDateRangeChange = (dates) => {
        const [start, end] = dates;
        setQuery((prevQuery) => ({
          ...prevQuery,
          startDate: start,
          endDate: end,
        }));
      };

    const handlePageClick = (selectedPage) => {
        props.getList({ ...query}, selectedPage );
    };


    const handleDeleteClick = (item) => {
        props.remove(item.id);
    }

    const handleRowClick = (id) => {
        navigate(`${MEDIA_PROJECT_DETAIL}/${id}`);
    };

    const handleAddButtonClick = () => {
        setOpen(true)
    };

    const handleUploadSuccess = (response, file) => {
        props.create({
            mediaUrl: response.filePath,
            title: file.name
        })
        setOpen(false)
    }

    const handleUploadFail = (error) => {
        alert("Error uploading file. Please try again.");
    }


    useEffect(() => {
        props.getList(query, props.pageIndex);
    }, [query]);

    useEffect(() => {
        if (props.isDeleted || props.isUpdated || props.isCreated) {
            props.getList(query, props.pageIndex); 
        }
    }, [props.isDeleted, props.isUpdated, props.isCreated]);

    useEffect(() => {
        props.getList(query, props.pageIndex);
        props.getSiteMaps();
        
      }, []);

    // useEffect(() => {
    //     props.showLoading(props.isLoading)
    // }, [props.isLoading])

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
    


    
    return (
        <div className="plan-page">
            {/* <div className="plan-summary">
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
                        data={props.siteMaps}
                        value={query.siteMapId}
                        onChange={(value) => handleQueryChange("siteMapId", value)}
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
                    <CustomToggle 
                        checked={query.isPersonal}
                        onChange={(value,e) => handleQueryChange("isPersonal", value)}
                    >
                        Cá nhân
                    </CustomToggle>
                    <CustomAddButton onClick={handleAddButtonClick}/>
                </div>
                <Table 
                    data={props.list} 
                    autoHeight = {true}
                   // onRowClick={(rowData) =>handleRowClick(rowData.id)}
                >
                  <Column flexGrow={1} minWidth={50} fixed>
                    <HeaderCell>#</HeaderCell>
                    <Cell>
                      {(rowData, rowIndex) => (props.pageIndex-1) * PAGE_SIZE + rowIndex + 1}
                    </Cell>
                  </Column>

                  <Column flexGrow={3} minWidth={150} fixed>
                    <HeaderCell>Tên</HeaderCell>
                    <Cell >
                      {rowData  => 
                      (<TextLink 
                        onRowClick={()=>handleRowClick(rowData.id)}
                        text={rowData.title}
                      />)}
                    </Cell>
                  </Column>

                  <Column flexGrow={2.5} minWidth={150}>
                    <HeaderCell>Trạng thái</HeaderCell>
                    <Cell dataKey="status" style={{ marginTop: '-5px' }}>
                        {rowData => <StatusBox status={rowData.status} />}
                    </Cell>
                  </Column >

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
                        {rowData => (<div style={{ display: 'flex', marginTop: '-10px' }}>
                            <CustomDeleteButton onClick={() => handleDeleteClick(rowData)}/>
                        </div>)}
                    </Cell>
                  </Column>
                </Table>

                {props.list && (
                    <Pagination total={props.totalCount} limit={PAGE_SIZE} activePage={props.pageIndex} onChangePage={handlePageClick} />
                )}
            </div>

            <Modal 
                backdrop={backdrop} 
                open={open} 
                style={{zIndex: 99999}} 
                onClose={handleCloseModal}
            >

                <Uploader
                  action= {MEDIA_UPLOAD_API}
                  draggable
                  autoUpload={true}
                  multiple={false}
                  accept="audio/*,video/*"
                  onSuccess={handleUploadSuccess}
                  onError={handleUploadFail}
                >
                  <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>Click or Drag a file to this area to upload</span>
                  </div>
                </Uploader>
            </Modal> */}
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
        create: (data) => dispatch(planActions.create(MEDIA_PROJECT_API,data)),
        getList: (query, pageIndex) => dispatch(planActions.getList(MEDIA_PROJECT_API, query, pageIndex, PAGE_SIZE)),
        get: (id) => dispatch(planActions.get(MEDIA_PROJECT_API, id)),
        remove: (id) => dispatch(planActions.remove(MEDIA_PROJECT_API, id)),
        getSiteMaps: ()=>dispatch(siteMapActions.getList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectList)
