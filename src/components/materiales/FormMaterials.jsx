import React, { useState, useRef  } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { TableMaterial } from './TableMaterial';
import { MaterialService } from '../../services/MaterialService';

function FormMaterials(){
    const [modalMaterial, setModalMaterial] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const toast = useRef(null);
    const materialService  = new MaterialService();

    const defaultValues = {
        codigo: '',
        material: '',
        precio: 0.00
    };
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        materialService.createMaterial(data).then(()=>{
            setRefreshData(true);
            toast.current.show({severity: 'success', summary: 'Éxito', detail: 'Su registro se ha creado satisfactoriamente'});
            reset();
        }).catch((err)=>{
            toast.current.show({severity: 'warn', summary: 'Alerta!', detail: err.response.data.body});
            console.log(err.response.data.body);
        })
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const openModal = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHideModal = (name) => {
        reset();
        dialogFuncMap[`${name}`](false);
    }
    const dialogFuncMap = {
        'modalMaterial': setModalMaterial,
    }

    const formatNumber = (value) =>{
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }

    return (
        <div className="form-materiales">
            <Toast ref={toast}></Toast>
            <div className="flex">
                <div className="card">

                    <div className="grid">
                        <div className="col-12 md:col-12 lg:col-12">
                            <Button label="Nuevo" icon="pi pi-plus" onClick={() => openModal('modalMaterial')} />
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <Dialog breakpoints={{'960px': '75vw'}} style={{width: '30vw'}} 
                        header="Material" 
                        visible={ modalMaterial } 
                        onHide={() => onHideModal('modalMaterial')}>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="codigo" control={control} rules={{ required: 'El Código es requerido.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.codigo} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="codigo" className={classNames({ 'p-error': errors.name })}>Código*</label>
                                </span>
                                {getFormErrorMessage('codigo')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="material" control={control} rules={{ required: 'El Material es requerido.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.material} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="material" className={classNames({ 'p-error': errors.name })}>Material*</label>
                                </span>
                                {getFormErrorMessage('material')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="precio" control={control} rules={{ required: 'El Precio es requerido.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.precio} {...field}  autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="precio" className={classNames({ 'p-error': errors.name })}>Precio*</label>
                                </span>
                                {getFormErrorMessage('precio')}
                            </div>
                            <div className="flex-auto flex align-items-end justify-content-end">
                                <Button type='submit' label="Guardar" icon="pi pi-save" autoFocus className="p-button-success"/>
                            </div>
                        </form>
                    </Dialog>

                </div>
            </div>
            <TableMaterial refreshData={ refreshData }/>
        </div>
    );
}

export default FormMaterials;