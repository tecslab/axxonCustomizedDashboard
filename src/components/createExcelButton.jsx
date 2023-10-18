import React from 'react';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';

const ExcelDownloadButton = ({disabled, getDataFuntion, ext}) => {
  const generateExcel = async () => {
    /* const data = [
      ['Name', 'Age'],
      ['John', 25],
      ['Jane', 30],
      // ... add more data
    ]; */

    let data = await getDataFuntion()

    const workSheet = XLSX.utils.aoa_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    XLSX.writeFile(workBook, 'data.' + ext);
  };

  const getLabel = () =>{
    let label;
    if (ext==="csv"){
      label = "Exportar a CSV"
    }else if (ext==="xlsx"){
      label = "Exportar a Excel"
    }
    return label
  }

  return (
    <Button className="mx-1" onClick={generateExcel} label={getLabel()} severity="info" disabled={disabled}/>
  );
};

ExcelDownloadButton.defaultProps = {
  disabled: false
}

export default ExcelDownloadButton;