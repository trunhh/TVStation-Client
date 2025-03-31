const Summary = ({totalCount, inProgressCount, waitingApprovalCount, approvedCount}) => {
    const summaryData = [
        {
            name: "primary",
            icon: "bi-envelope-at-fill",
            title: "Tổng số",
            value: totalCount,
        },
        {
            name: "info",
            icon: "bi-envelope-dash-fill",
            title: "Đang thực hiện",
            value: inProgressCount
        },
        {
            name: "warning",
            icon: "bi-envelope-exclamation-fill",
            title: "Chờ duyệt",
            value: waitingApprovalCount,
        },
        {
            name: "success",
            icon: "bi-envelope-check-fill",
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
                            
                            <i className={`bi ${item.icon}`}/>
                            {item.value}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Summary;