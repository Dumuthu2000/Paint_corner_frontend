import React from 'react';
import './estimateTable.css';
import EditIcon from '@mui/icons-material/Edit';

const SupplimentrySheetTable = (props) => {
  return (
    <div>
      <table className="custom-table" style={{ display: props.tableView, width: "100%" }}>
        <thead>
          <tr style={{display:props.headerDisplay}}>
            <th style={{backgroundColor:props.rowColor}}>No</th>
            <th style={{backgroundColor:props.rowColor}}>Item Name</th>
            <th style={{ display: props.display, backgroundColor:props.rowColor }}>Item Value</th>
            <th style={{backgroundColor:props.rowColor}}>Company Price</th>
            <th style={{backgroundColor:props.rowColor, display:props.insuranceDisplay}}>Insurance Price</th>
            <th style={{ display: props.view, backgroundColor:props.rowColor }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData?.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.itemName}</td>
              <td style={{ display: props.display }}>{data.itemValue}</td>
              <td style={{textAlign:"end"}}>{parseFloat(data.itemPrice).toFixed(2)}</td>
              <td style={{display:props.insuranceDisplay}}>
                {props.editingRow === data.supplimentryID ? (
                  <>
                    <input
                      type="text"
                      className='insurancePrice'
                      style={{ padding: "5px", width: "8rem", borderRadius: "2px" }}
                      value={data.insurancePrice}
                      onChange={(e) => props.handleInsurancePrice(e.target.value, data?.supplimentryID)}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      className='insurancePrice'
                      style={{ padding: "5px", width: "8rem", borderRadius: "2px", color:"#c9184a", fontWeight:"bold" }}
                      value={data.insurancePrice}
                      disabled
                    />
                  </>
                )}
              </td>
              <td style={{ display: props.view }}>
                <div className="tableBtn">
                  {props.editingRow === data.supplimentryID ? (
                    <>
                      <button className='tableUpdateBtn' onClick={() => { props.handleUpdate(data.supplimentryID) }}>Update</button>
                    </>
                  ) : (
                    <>
                      <button className='editBtn' onClick={() => { props.handleEdit(data.supplimentryID) }} style={{display:props.insuranceDisplay}}>Edit</button>
                      <button className='deleteBtn' onClick={() => { props.handleDelete(data.supplimentryID) }}>Delete</button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupplimentrySheetTable;
