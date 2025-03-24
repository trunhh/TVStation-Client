const Summary = ({totalCount, inProgressCount, waitingApprovalCount, approvedCount}) => {
    const summaryData = [
        {
            name: "primary",
            icon: "fa-note-sticky",
            title: "Tổng số",
            value: totalCount,
        },
        {
            name: "info",
            icon: "fa-pen-to-square",
            title: "Đang thực hiện",
            value: inProgressCount
        },
        {
            name: "warning",
            icon: "fa-spinner",
            title: "Chờ duyệt",
            value: waitingApprovalCount,
        },
        {
            name: "success",
            icon: "fa-circle-check",
            title: "Đã duyệt",
            value: approvedCount
        }
    ];


    return (
        <div className="row">
            {summaryData.map((item, index) => (
                <div className="col-3 alert-primary" key={index}>
                    <div className="card p-3 gap-2 align-items-center">
                        
                        <small className="text-muted">{item.title}</small>
                        <div className={`d-flex gap-2 text-${item.name} fw-bold`}>
                            
                            <i className={`fa-solid ${item.icon}`}/>
                            <div className='lh-1'>{item.value}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Summary;