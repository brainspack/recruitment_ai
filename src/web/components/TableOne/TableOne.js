import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Checkbox from '@material-ui/core/Checkbox';

const TableOne = (props) => {

  const [showLoader, setShowLoader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <React.Fragment>
      <div className="positivly-datatable">
        {props.emptyText && props.data.length == 0 ? (
          <div className="highlight-empty-text">{props.emptyText}</div>
        ) : (
          <DataTable
            responsive
            columns={props.columns}
            data={props.data}
            noHeader={true}
            pagination={true}
            onChangePage={props.onChangePage}
            paginationPerPage={props.perPage}
            selectableRows={props.selectableRows}
            selectableRowsComponent={props.Checkbox}
            onSelectedRowsChange={props.onSelectedRowsChange}
            expandableRowExpanded={row => row.defaultExpanded}
            expandableRows={props.expandableRows ? props.expandableRows : false}
            expandableRowsComponent={props.expandableRows ? props.expandableRowsComponent : null}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default TableOne;
