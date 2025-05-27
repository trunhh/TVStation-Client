import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { channelActions, episodeActions } from '../redux/reduxes';
import StatusBox from '../components/StatusBox';
import { useNavigate } from 'react-router-dom';
import { EPISODE_DETAIL } from '../constants/routeConstants';
import { TextLink } from '../components/CustomRsuite';
import DynamicForm from '../components/DynamicForm';
import DynamicTable from '../components/DynamicTable';


const EpisodeList = (props) => {
    const [form, setForm] = useState({
        channelId: null,
        date: new Date().toISOString().split('T')[0],
    });

    const navigate = useNavigate();

    const fieldProps = {
        channelId: { data: props.channel, label: "Kênh phát sóng", required: true },
        date: { type: "date", label: "Ngày", required: true}
    }

    const handleDeleteClick = (item) => {
        props.remove(item.id);
    };

    const handleRowClick = (rowData) => {
        navigate(`${EPISODE_DETAIL}/${rowData.id}`);
    };
    

    useEffect(() => {
        if (props.isDeleted || props.isUpdated || props.isCreated) {
            props.getList(form); 
        }
    }, [props.isDeleted, props.isUpdated, props.isCreated]);

    useEffect(() => {
        props.getChannel();
    }, []);


    const handleSubmit = (form) => {
        if (form.channelId && form.date) props.getList(form);
    }
    


    return (
        <section className="d-flex flex-column mx-auto px-3 py-5 my-5 row-gap-3 bg-white shadow-lg rounded">
            <DynamicForm form={form} setForm={setForm} fieldProps={fieldProps} onSubmit={handleSubmit} autoSubmit/>

            <DynamicTable 
                data={props.list} 
                onRowClick={handleRowClick} 
                onRowDelete={handleDeleteClick} 
                columns={[
                    { header: "Giờ phát sóng", body: (rowData) => new Intl.DateTimeFormat('en-GB', {hour: '2-digit',minute: '2-digit',hour12: false}).format(new Date(rowData.start)) },
                    { header: "Tiêu đề", body: (rowData) => (<TextLink text={rowData.title}/>), focus: true },
                    { header: "Trạng thái", body: (rowData) => (<StatusBox status={rowData.status} />) }          
                ]}
            />
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.episode,
        channel: state.channel.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (form) => dispatch(episodeActions.getList(form)),
        get: (id) => dispatch(episodeActions.get(id)),
        remove: (id) => dispatch(episodeActions.remove(id)),
        getChannel: () => dispatch(channelActions.getList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeList);
