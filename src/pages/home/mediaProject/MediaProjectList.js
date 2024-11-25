import '../PlanListPage.scss'

import { MdEdit } from 'react-icons/md'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { MdAddToPhotos } from 'react-icons/md'
import { MdOutlineClose } from 'react-icons/md'
import { MdSearch } from 'react-icons/md'

//import MediaProjectForm from './MediaProjectForm'

import { connect } from 'react-redux'

import { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css"

import ReactPaginate from 'react-paginate'

import mediaProjectActions from '../../../actions/mediaProjectActions'

const MediaProjectList = (props) => {
    const [mediaProjectItem, setMediaProjectItem] = useState({})
    const [buttonText, setButtonText] = useState('Create')
    const [selectChanged, setSelectChanged] = useState(false)
    const [type, setType] = useState('Type')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [pageCount, setPageCount] = useState(props.totalPagesMediaProject)
    const PAGE_NUMBER = 1
    const PAGE_SIZE = 10
    const SORT = 'id,asc'

    const handleClickAddProject = () => {
        setMediaProjectItem({
            name: '',
            type: '',
            createdAt: '',
            totalMember: ''
        })
        setButtonText('Create')
        props.toggleMediaProjectForm(true)
    }

    const handleClickEdit = (item) => {
        setButtonText('Save')
        props.toggleMediaProjectForm(true)

        let projectIndex = props.mediaProjects.findIndex(x => x.id == item.id)

        setMediaProjectItem(props.mediaProjects[projectIndex])
    }

    const handleClickDelete = (item) => {
        console.log(item);
        props.deleteMediaProject(item.id);
    }

    const handleClickIconClose = () => {
        setType('Type')
        setSelectChanged(false)
    }

    const onSelectChange = (e) => {
        setType(e.target.value)
        setSelectChanged(true)
    }

    const handleStartDateChange = (date) => {
        setStartDate(date)
    }

    const handleEndDateChange = (date) => {
        setEndDate(date)
    }

    useEffect(() => {
        props.getListMediaProject()
    }, [props.mediaProjectUpdated, props.mediaProjectCreated, props.mediaProjectDeleted])

    const _clickSearch = () => {
        let projectFilterForm = {
            type: type === 'Type' ? null : type,
            startDate: startDate,
            endDate: endDate,
            pageNumber: PAGE_NUMBER,
            pageSize: PAGE_SIZE,
            sort: SORT
        }
        props.getListMediaProject(projectFilterForm)
    }

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    console.log('Media Project list rerender...')
    return (
        <div className="plan-list">
            <div className="content">
                {/* {   
                    props.mediaProjectFormOpened && <MediaProjectForm mediaProjectItem={mediaProjectItem} buttonText={buttonText}/>
                } */}
                <div className="filter-form">
                    <div className="type-filter">
                        <select 
                            className="form-control-filter" 
                            value={type} 
                            onChange={onSelectChange}
                        >
                            <option value="Type" hidden>Type</option>
                            <option value="VIDEO">VIDEO</option>
                            <option value="AUDIO">AUDIO</option>
                            <option value="GRAPHIC">GRAPHIC</option>
                        </select>
                        {   
                            selectChanged && <MdOutlineClose onClick={handleClickIconClose} className="icon-close"/>
                        }
                    </div>
                    <DatePicker
                        className="form-control-filter"
                        selected={startDate}
                        onChange={handleStartDateChange}
                        name="startDate"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Start Date"
                    />
                    <DatePicker
                        className="form-control-filter"
                        selected={endDate}
                        onChange={handleEndDateChange}
                        name="endDate"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="End Date"
                    />
                    <div className="icon-search">
                        <MdSearch onClick={_clickSearch} fontSize="1.2rem"/>
                    </div>
                </div>
                <div className="icon-add">
                    <MdAddToPhotos fontSize="1.2rem" style={{ cursor: 'pointer' }}
                        onClick={handleClickAddProject}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Created Date</th>
                            <th>Total Member</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.mediaProjects && props.mediaProjects.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.totalMember}</td>
                                        <td>
                                            <MdEdit fontSize="1.2rem"
                                                style={{ marginRight: '10px', cursor: 'pointer' }}
                                                onClick={() => handleClickEdit(item)}
                                            />
                                            <MdOutlineDeleteForever fontSize="1.2rem"
                                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                                                onClick={() => handleClickDelete(item)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="paging">
                    <ReactPaginate
                        nextLabel="next >"
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.view.isLoading,
        mediaProjects: state.mediaProject.mediaProjects,
        totalPagesMediaProject: state.mediaProject.totalPagesMediaProject,
        mediaProjectUpdated: state.mediaProject.mediaProjectUpdated,
        mediaProjectCreated: state.mediaProject.mediaProjectCreated,
        mediaProjectDeleted: state.mediaProject.mediaProjectDeleted,
        mediaProjectFormOpened: state.mediaProject.mediaProjectFormOpened
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMediaProjectForm: (isOpen) => {
            dispatch(mediaProjectActions.toggleMediaProjectForm(isOpen))
        },
        getListMediaProject: (filterForm) => {
            dispatch(mediaProjectActions.getListMediaProject(filterForm))
        },
        deleteMediaProject: (id) => {
            dispatch(mediaProjectActions.deleteMediaProject(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaProjectList)
