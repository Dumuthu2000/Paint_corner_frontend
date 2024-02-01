import React from 'react';
import './estimateTable.css';

const InvoiceTable = (props) => {
  return (
    <div>
      <table className="custom-table" style={{ display: props.tableView, width: "100%" }}>
        <thead >
          <tr style={{display:props.headerDisplay}}>
                <th style={{backgroundColor:props.rowColor}}>No</th>
                <th style={{backgroundColor:props.rowColor}}>Item Name</th>
                <th style={{ display: props.display, backgroundColor:props.rowColor }}>Item Value</th>
                {/* <th style={{ display: props.display, backgroundColor:props.rowColor }}>Item Price</th> */}
                <th style={{backgroundColor:props.rowColor, display:props.insuranceDisplay}}>Insurance Price</th>
                <th style={{backgroundColor:props.rowColor }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData?.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.itemName}</td>
              <td style={{ display: props.display }}>{data.itemValue}</td>
              <td>
                {props.editingRow === data.invoiceID ? (
                  <>
                    <input
                      type="text"
                      className='insurancePrice'
                      style={{ padding: "5px", width: "8rem", borderRadius: "2px", }}
                      value={data.insurancePrice}
                      onChange={(e) => props.handleInsurancePrice(e.target.value, data?.invoiceID)

                    }
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      className='insurancePrice'
                      style={{ padding: "5px", width: "8rem", borderRadius: "2px", color:"#c9184a", fontWeight:"bold", display:props.InputDisplay}}
                      value={data.insurancePrice}
                      disabled
                    />
                    <div style={{display:props.reportView}}>{parseFloat(data.insurancePrice).toFixed(2)}</div>
                  </>
                )}
              </td>
              <td style={{display:props.insuranceDisplay}}>
                <div className="tableBtn">
                  {props.editingRow === data.invoiceID ? (
                    <>
                      <button className='tableUpdateBtn' onClick={() => { props.handleUpdate(data.invoiceID) }}>Update</button>
                    </>
                  ) : (
                    <>
                      <button className='editBtn' onClick={() => { props.handleEdit(data.invoiceID) }}>Edit</button>
                      {/* <button className='deleteBtn' onClick={() => { props.handleDelete(data.invoiceID) }}>Delete</button> */}
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

export default InvoiceTable;
