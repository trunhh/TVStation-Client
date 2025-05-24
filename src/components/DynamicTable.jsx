import { CustomDeleteButton } from "../_sharecomponents/customrsuite/CustomRsuite";

const DynamicTable = ({ 
  data = [], 
  columns = [], 
  showDelete = true, 
  onRowClick = (id) => { console.log(id) },
  onRowDelete = (data) => { console.log(data)}

}) => {

  return (
    <div className="table-responsive">
      <table className="table table-striped text-nowrap text-center">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th 
                key={`header-${index}`}
                className={col.focus ? 'w-100' : ''}
              >
                {col.header}
              </th>
            ))}
            <th className="bi bi-trash-fill"/>
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, index) => (
            <tr 
              key={`row-${index}`}
              onClick={() => onRowClick(rowData)}
              style={{ cursor: 'pointer' }}
            >
              {columns.map((col, colIndex) => (
                <td key={`cell-${index}-${colIndex}`}>
                  {col.body(rowData)}
                </td>
              ))}
              {showDelete && (
                <td>
                  <CustomDeleteButton onClick={() => onRowDelete(rowData)} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;