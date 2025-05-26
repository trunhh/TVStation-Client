import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import planActions from '../redux/actions/planActions';
import siteMapActions from '../redux/actions/siteMapActions';
import channelActions from '../redux/actions/channelActions';
import usersActions from '../redux/actions/usersActions';
import StatusBox from '../_sharecomponents/statusbox/StatusBox';
import { useNavigate } from 'react-router-dom';
import { PROGRAMME_DETAIL } from '../constants/routeConstants';
import { TextLink } from '../_sharecomponents/customrsuite/CustomRsuite';

import Summary from '../components/Summary';
import DynamicForm from '../components/DynamicForm';
import { Collapse } from 'react-bootstrap';
import { StatusConst } from '../constants/constants';
import DynamicTable from '../components/DynamicTable';


const ProgrammeList = (props) => {
    const [form, setForm] = useState({
        status: "",
        keyword: "",
        users: null,
        channelId: null,
        siteMapId: null,
    });

    const navigate = useNavigate();

    const fieldProps = {
        status: { data: StatusConst, label: "Trạng thái" },
        siteMapId: { data: props.siteMap, label: "Phòng ban" },
        channelId: { data: props.channel, label: "Kênh phát sóng" },
        users: { data: props.users, label: "Người dùng" },
        keyword: { type: "search", label: "Tìm kiếm" }
    }

    const handlePageClick = (selectedPage) => {
        props.getList({ ...form }, selectedPage);
    };

    const handleDeleteClick = (item) => {
        props.remove(item.id);
    };

    const handleRowClick = (rowData) => {
        navigate(`${PROGRAMME_DETAIL}/${rowData.id}`);
    };

    const handleAddButtonClick = () => {
        navigate(`${PROGRAMME_DETAIL}`);
    };
    

    useEffect(() => {
        if (props.isDeleted || props.isUpdated || props.isCreated) {
            props.getList(form, props.pageIndex); 
        }
    }, [props.isDeleted, props.isUpdated, props.isCreated]);

    useEffect(() => {
        props.getList(form, props.pageIndex);
        props.getSiteMap();
        props.getChannel();
        props.getUsers();
    }, []);

    const handleSubmit = (form) => {
        props.getList(form);
    }
    

    const [open, setOpen] = useState(false);


    return (
        <section className="d-flex flex-column mx-auto px-3 py-5 my-5 row-gap-3 bg-white shadow-lg rounded">
            <Summary {...props}/>

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
            
            <Collapse in={open}>
                <div id="collapse-text">
                    <DynamicForm form={form} setForm={setForm} fieldProps={fieldProps} autoSubmit={true} onSubmit={handleSubmit}/>
                </div>
            </Collapse>

            <DynamicTable 
                data={props.list} 
                onRowClick={handleRowClick} 
                onRowDelete={handleDeleteClick} 
                columns={[
                    { header: "Tập tiếp theo", body: (rowData) => new Intl.DateTimeFormat('en-GB').format(new Date(rowData.createdDate)) },
                    { header: "Tiêu đề", body: (rowData) => (<TextLink text={rowData.title}/>), focus: true },
                    { header: "Trạng thái", body: (rowData) => (<StatusBox status={rowData.status} />) }          
                ]}
            />
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.plan,
        siteMap: state.siteMap.list,
        channel: state.channel.list,
        users: state.users.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (form) => dispatch(planActions.getList(form)),
        get: (id) => dispatch(planActions.get(id)),
        remove: (id) => dispatch(planActions.remove(id)),
        getSiteMap: () => dispatch(siteMapActions.getList()),
        getChannel: () => dispatch(channelActions.getList()),
        getUsers: () => dispatch(usersActions.getList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgrammeList);
