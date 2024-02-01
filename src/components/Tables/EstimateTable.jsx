import './estimateTable.css';

const EstimateTable = (props) => {
  return (
    <div className="table-container" style={{width:`${props.tableWidth}`}}>
      <table className="custom-table">
        <thead>
          <tr>
            <th>No</th>
            <th>{props.column1}</th>
            <th style={{display:props.priceColumn}}>Type</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData?.map((data, index) => (
            <tr key={index}>
              <td>{data.no}</td>
              <td>{data.itemName}</td>
              <td style={{display:props.priceColumn}}>{data.itemValue}</td>
              <td>{data.itemPrice}</td>
              <td>
                <div className="tableBtn">
                  <button className='editBtn' onClick={()=>{props.handleEdit(index)}}>Edit</button>
                  <button className='deleteBtn' onClick={()=>{props.handleDelete(index)}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        {/* Add more rows as needed */}
      </tbody>
      </table>
    </div>
  )
}

export default EstimateTable

