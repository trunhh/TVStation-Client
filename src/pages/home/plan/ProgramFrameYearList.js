import './PlanListPage.scss';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import planActions from '../../../actions/planActions';
import { PROGRAM_FRAME_YEAR_API } from '../../../constants/apiConstants';
import StatusBox from '../../../_sharecomponents/statusbox/StatusBox';
import { useNavigate } from 'react-router-dom';
import { PROGRAM_FRAME_YEAR_DETAIL } from '../../../constants/routeConstants';
import { PAGE_SIZE } from '../../../constants/constants';
import { 
    CustomAddButton,
    CustomYearPicker,
    CustomSectorPicker,
    CustomStatusPicker, 
    CustomInputSearch,
    CustomToggle,
    CustomDeleteButton,
    TextLink
} from '../../../_sharecomponents/customrsuite/CustomRsuite';

import Summary from '../../../components/Summary';
import Pagination from 'rsuite/esm/Pagination/Pagination';

const ProgramFrameYearList = (props) => {
    const [query, setQuery] = useState({
        year: new Date().getFullYear(),
        sector: null,
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
        props.getList({ ...query }, selectedPage);
    };

    const handleDeleteClick = (item) => {
        props.remove(item.id);
    };

    const handleRowClick = (id) => {
        navigate(`${PROGRAM_FRAME_YEAR_DETAIL}/${id}`);
    };

    const handleAddButtonClick = () => {
        navigate(`${PROGRAM_FRAME_YEAR_DETAIL}`);
    };

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
    }, []);

    

    return (
        <div className="w-5 overflow-hidden d-flex flex-column mx-auto px-3 py-5 row-gap-3 bg-white shadow-lg rounded">
            <Summary {...props}/>
            

            {/* Filter Form */}
            <div className="mb-4 d-flex flex-wrap">
                    <div className="col-md-3">
                        <CustomYearPicker
                            value={query.year}
                            onChange={(value) => handleQueryChange("year", value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <CustomSectorPicker
                            value={query.sector}
                            onChange={(value) => handleQueryChange("sector", value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <CustomStatusPicker
                            value={query.status}
                            onChange={(value) => handleQueryChange("status", value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <CustomInputSearch
                            value={query.keyword}
                            onChange={(value, e) => handleQueryChange("keyword", value)}
                        />
                    </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end mb-3">
                <CustomToggle 
                    checked={query.isPersonal}
                    onChange={(value,e) => handleQueryChange("isPersonal", value)}
                >
                    Cá nhân
                </CustomToggle>
                <CustomAddButton onClick={handleAddButtonClick} />
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-striped">
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
                        {props.list.map((rowData, index) => (
                            <tr key={index} onClick={() => handleRowClick(rowData.id)}>
                                <td>{(props.pageIndex - 1) * PAGE_SIZE + index + 1}</td>
                                <td>
                                    <TextLink 
                                        onRowClick={() => handleRowClick(rowData.id)}
                                        text={rowData.title}
                                    />
                                </td>
                                <td><StatusBox status={rowData.status} /></td>
                                <td>{new Intl.DateTimeFormat('en-GB').format(new Date(rowData.createdDate))}</td>
                                <td>{rowData.creatorName}</td>
                                <td>
                                    <CustomDeleteButton onClick={() => handleDeleteClick(rowData)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {props.list && (
                <Pagination total={props.totalCount} limit={PAGE_SIZE} activePage={props.pageIndex} onChangePage={handlePageClick} />
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.plan,
        isLoading: state.view.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (query, pageIndex) => dispatch(planActions.getList(PROGRAM_FRAME_YEAR_API, query, pageIndex, PAGE_SIZE)),
        get: (id) => dispatch(planActions.get(PROGRAM_FRAME_YEAR_API, id)),
        remove: (id) => dispatch(planActions.remove(PROGRAM_FRAME_YEAR_API, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramFrameYearList);
