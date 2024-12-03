import './Sidebar.css'; 
import { MdControlCamera } from 'react-icons/md';
import { MdClose } from 'react-icons/md';  // Import close icon
import CustomLinks2 from '../../../_sharecomponents/customlinks/CustomLinks2';
import { menuLinks } from '../../../data/data';
import { connect } from 'react-redux';
import viewActions from '../../../actions/viewActions';  // Import your viewActions to handle the toggle

const Sidebar = (props) => {
    return (
        <div className={props.sidebarIsOpen ? 'sidebar' : 'sidebar close'}>
            <div className='sidebar-close-button'>
                <button className='close-btn' onClick={props.toggleSidebar}>
                    <MdClose size="1.5rem" />
                </button>
            </div>
            
            <div className='sidebar-header'>
                <img src="../../images/logo-tek4.png" alt="Logo" />
            </div>
            <div className='sidebar-menu'>
                <CustomLinks2 menuLinks={menuLinks} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        sidebarIsOpen: state.view.sidebarIsOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSidebar: () => {
            dispatch(viewActions.toggleSidebar())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
