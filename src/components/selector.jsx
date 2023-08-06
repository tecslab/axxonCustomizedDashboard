import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';

export default function Selector(props) {
    return (
      <>
        <div className="card flex justify-content-center">
          <MultiSelect value={props.ciudadesSelec} onChange={(e) => props.onChangeCiudades(e)} options={props.listaCiudades} optionLabel="ciudad" display="chip" 
            placeholder="Seleccionar ciudades" className="w-full md:w-20rem" />
        </div>

        <div className="card flex justify-content-center">
          <MultiSelect value={props.empresasSelec} onChange={(e) => props.onChangeEmpresas(e)} options={props.listaEmpresas} optionLabel="empresa" display="chip" 
            placeholder="Seleccionar Empresa" className="w-full md:w-20rem" />
        </div>
      </>
    );
}