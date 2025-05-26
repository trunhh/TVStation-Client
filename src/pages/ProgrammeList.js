import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { programmeActions, siteMapActions, channelActions, userActions } from '../redux/reduxes';
import StatusBox from '../components/StatusBox';
import { useNavigate } from 'react-router-dom';
import { PROGRAMME_DETAIL } from '../constants/routeConstants';
import { TextLink } from '../components/CustomRsuite';
import DynamicForm from '../components/DynamicForm';
import { StatusConst } from '../constants/constants';
import DynamicTable from '../components/DynamicTable';


const ProgrammeList = (props) => {
    const [form, setForm] = useState({
        status: "",
        keyword: "",
        userName: null,
        channelId: null,
        siteMapId: null,
    });

    const navigate = useNavigate();

    const fieldProps = {
        status: { data: StatusConst, label: "Trạng thái" },
        siteMapId: { data: props.siteMap, label: "Phòng ban" },
        channelId: { data: props.channel, label: "Kênh phát sóng" },
        userName: { data: props.user, label: "Người dùng" },
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
        props.getUser();
    }, []);

    const handleSubmit = (form) => {
        props.getList(form);
    }
    


    return (
        <section className="d-flex flex-column mx-auto px-3 py-5 my-5 row-gap-3 bg-white shadow-lg rounded">

            <DynamicForm form={form} setForm={setForm} fieldProps={fieldProps} autoSubmit={true} onSubmit={handleSubmit}/>

            <DynamicTable 
                data={props.list} 
                onRowClick={handleRowClick} 
                onRowDelete={handleDeleteClick} 
                onAddClick={handleAddButtonClick}
                columns={[
                    { header: "Tập tiếp theo", body: (rowData) => new Intl.DateTimeFormat('en-GB').format(new Date(rowData.startDate)) },
                    { header: "Tiêu đề", body: (rowData) => (<TextLink text={rowData.title}/>), focus: true },
                    { header: "Trạng thái", body: (rowData) => (<StatusBox status={rowData.status} />) }          
                ]}
            />
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.programme,
        siteMap: state.siteMap.list,
        channel: state.channel.list,
        user: state.user.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (form) => dispatch(programmeActions.getList(form)),
        get: (id) => dispatch(programmeActions.get(id)),
        remove: (id) => dispatch(programmeActions.remove(id)),
        getSiteMap: () => dispatch(siteMapActions.getList()),
        getChannel: () => dispatch(channelActions.getList()),
        getUser: () => dispatch(userActions.getList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgrammeList);
