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
    CustomDeleteButton,
    TextLink
} from '../../../_sharecomponents/customrsuite/CustomRsuite';

import Summary from '../../../components/Summary';
import FilterForm from '../../../components/FilterForm';
import { Collapse } from 'react-bootstrap';
import Calendar from '@toast-ui/calendar';
import '../../../toastui-custom/toastui-calendar.css';
import { customTheme } from '../../../toastui-custom/toastui-calendar-theme';


const ProgramFrameYearList = (props) => {
    const [query, setQuery] = useState({
        year: new Date().getFullYear(),
        sector: null,
        status: null,
        keyword: null,
        isPersonal: false
    });

    useEffect(() => {
        const calendar = new Calendar('#calendar', {
            theme: customTheme
        });
      }, []);


    const navigate = useNavigate();

    

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

    const [open, setOpen] = useState(false);
    

    return (
        <section className="d-flex flex-column mx-auto px-3 py-5 my-5 row-gap-3 bg-white shadow-lg rounded">
            <Summary {...props}/>


            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2">
                <a 
                    className="bi bi-filter-circle-fill link-secondary" 
                    onClick={() => setOpen(!open)} 
                    aria-controls="collapse-text" 
                />
                <a 
                    className="bi bi-plus-circle-fill link-secondary"
                    onClick={handleAddButtonClick}
                />
            </div>

            {/* Filter Form */}
            
            <Collapse in={open}>
                <div id="collapse-text">
                    <FilterForm query={query} setQuery={setQuery} />
                </div>
            </Collapse>

            <div className="fixed-height" id="calendar"/>

            

            

            {/* Table */}
            {/* <div className="table-responsive">
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
            </div> */}

            {/* Pagination */}
            {/* {props.list && (
                <Pagination total={props.totalCount} limit={PAGE_SIZE} activePage={props.pageIndex} onChangePage={handlePageClick} />
            )} */}
        </section>
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
