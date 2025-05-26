import { CustomDeleteButton } from "./CustomRsuite";

const DynamicTable = ({
  data = [],
  columns = [],
  onRowClick = (id) => { console.log(id); },
  onRowDelete = null,
  onAddClick = null
}) => {
  return (
    <div className="table-responsive border rounded">
      <table className="table table-striped text-nowrap text-center m-0">
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
            {onRowDelete && <th className="bi bi-trash-fill" />}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, index) => (
            <tr
              key={`row-${index}`}
              style={{ cursor: 'pointer' }}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={`cell-${index}-${colIndex}`}
                  onClick={col?.focus ? () => onRowClick(rowData) : undefined}
                >
                  {col.body(rowData)}
                </td>
              ))}
              {onRowDelete && (
                <td>
                  <CustomDeleteButton onClick={() => onRowDelete(rowData)} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {onAddClick && (
          <button
            className="btn btn-primary rounded-0 w-100"
            onClick={onAddClick}
          >
            + Thêm
          </button>
      )}

    </div>
  );
};

export default DynamicTable;
