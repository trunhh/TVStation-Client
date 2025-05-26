import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import { userActions, siteMapActions } from '../redux/reduxes';
import { useNavigate } from 'react-router-dom';
import { TextLink } from '../components/CustomRsuite';
import DynamicForm from '../components/DynamicForm';
import DynamicTable from '../components/DynamicTable';
import { USER_INFO, SIGN_UP } from '../constants/routeConstants';

const UserList = (props) => {
    const [form, setForm] = useState({
        keyword: "",
        siteMapId: null,
    });

    const navigate = useNavigate();

    const fieldProps = {
        siteMapId: { data: props.siteMap, label: "Phòng ban" },
        keyword: { type: "search", label: "Tìm kiếm" }
    }

    const handlePageClick = (selectedPage) => {
        props.getList({ ...form }, selectedPage);
    };

    const handleDeleteClick = (item) => {
        props.remove(item.userName);
    };

    const handleRowClick = (rowData) => {
        navigate(`${USER_INFO}/${rowData.userName}`);
    };

    const handleAddButtonClick = () => {
        navigate(`${SIGN_UP}`);
    };
    

    useEffect(() => {
        if (props.isDeleted || props.isUpdated || props.isCreated) {
            props.getList(form, props.pageIndex); 
        }
    }, [props.isDeleted, props.isUpdated, props.isCreated]);

    useEffect(() => {
        props.getList(form);
        props.getSiteMap();
    }, []);

    const handleSubmit = (form) => {
        props.getList(form);
    }
    


    return (
        <section className="d-flex flex-column mx-auto px-3 py-5 my-5 row-gap-3 bg-white shadow-lg rounded">
            <DynamicForm form={form} setForm={setForm} fieldProps={fieldProps} autoSubmit={true} onSubmit={handleSubmit}/>

            <DynamicTable 
                data={props.user} 
                onRowClick={handleRowClick} 
                onRowDelete={handleDeleteClick}
                onAddClick={handleAddButtonClick}
                columns={[
                    { header: "Username", body: (rowData) => rowData.userName },
                    { header: "Họ và tên", body: (rowData) => rowData.name, focus: true },     
                    { header: "Số điện thoại", body: (rowData) => rowData.phoneNumber },
                    { header: "Email", body: (rowData) => rowData.email },

                ]}
            />
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.plan,
        siteMap: state.siteMap.list,
        user: state.user.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (form) => dispatch(userActions.getList(form)),
        getSiteMap: () => dispatch(siteMapActions.getList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
