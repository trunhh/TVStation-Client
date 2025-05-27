import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { channelActions, siteMapActions } from '../redux/reduxes';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../components/DynamicTable';
import { Tab, Nav } from 'react-bootstrap';
import TextInsertModal from '../components/TextInsertModal';

const Admin = (props) => {
    const navigate = useNavigate();
    const [showCModal, setShowCModal] = useState(false);
    const [showSModal, setShowSModal] = useState(false);

    const handleSiteMapDeleteClick = (item) => {
        props.siteMap.remove(item.value);
    };

    const handleChannelDeleteClick = (item) => {
        props.channel.remove(item.value);
    };
    

    useEffect(() => {
        if (props.siteMapDeleted) {
            props.getSiteMap();
        }
    }, [props.siteMapDeleted]);

    useEffect(() => {
        if (props.channelDeleted) {
            props.getChannel();
        }
    }, [props.channelDeleted]);

    useEffect(() => {
        props.getChannel();
        props.getSiteMap();
    }, []);

    const handleCAddButtonClick = () => {
        setShowCModal(true);
    }

    const handleSAddButtonClick = () => {
        setShowSModal(true);
    }

    const onSModalSubmit = (text) => {
        props.createSitemap({ value: text });
        setShowSModal(false);
    }

    const onCModalSubmit = (text) => {
        props.createChannel({ value: text });
        setShowCModal(true);
    }



    return (
        <section className="d-flex flex-column mx-auto px-3 py-5 my-5 row-gap-3 bg-white shadow-lg rounded">
            <TextInsertModal title="Tạo kênh phát sóng" label="Nhập tên kênh" show={showCModal} handleSubmit={onCModalSubmit} onHide={ ()=>setShowCModal(false) }/>
            <TextInsertModal title="Tạo phòng ban" label="Nhập tên phòng ban" show={showSModal} handleSubmit={onSModalSubmit} onHide={ ()=>setShowSModal(false) }/>
            <Tab.Container defaultActiveKey="siteMap">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="siteMap">Phòng ban</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="channel">Kênh</Nav.Link>
                </Nav.Item>
              </Nav>



              <Tab.Content className="py-3">
                <Tab.Pane eventKey="siteMap">
                    <DynamicTable 
                        data={props.siteMapList} 
                        onRowDelete={handleSiteMapDeleteClick}
                        onAddClick={handleSAddButtonClick}
                        columns={[
                            { header: "Phòng ban", body: (rowData) => rowData.label },       
                        ]}
                    />
                 


                </Tab.Pane>

                <Tab.Pane eventKey="channel">
                    <DynamicTable 
                        data={props.channelList} 
                        onRowDelete={handleChannelDeleteClick}
                        onAddClick={handleCAddButtonClick}
                        columns={[
                            { header: "Kênh phát sóng", body: (rowData) => rowData.label },       
                        ]}
                    />

                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        siteMapDeleted: state.siteMap.isDeleted,
        channelDeleted: state.channel.isDeleted,
        siteMapList: state.siteMap.list,
        channelList: state.channel.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSiteMap: () => dispatch(siteMapActions.getList()),
        createSitemap: (data)=> dispatch(siteMapActions.create(data)),
        removeSitemap: (id)=> dispatch(siteMapActions.remove(id)),
        getChannel: () => dispatch(channelActions.getList()),
        removeChannel: (id)=> dispatch(channelActions.remove(id)),
        createChannel: (data)=> dispatch(channelActions.create(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
