import React, { Component  } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { MaterialService } from '../../services/MaterialService';

export class TableMaterial extends Component{
    constructor(props){
        super(props);

        this.state = {
            materiales: [],
            editingRows: {},
            visible: false
        };

        this.materialService = new MaterialService();
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        let data = this.materialService.getAllMaterials().then((resp)=>{
            this.setState({ materiales: resp } );
        });
    }

    componentDidUpdate(props){
        if(props.refreshData){
            this.materialService.getAllMaterials().then((resp)=>{
                this.setState({ materiales: resp } );
            });
        }
    }

    textEditor(options) {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }
    priceEditor(options) {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="EUR" locale="de-DE" />
    }
    priceBodyTemplate(rowData) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(rowData.mat_precio);
    }

    butonsRow(rowData,index){

        return(
            <div className='grid'>
                <div className='col-6'>
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" aria-label="Eliminar" tooltip="Eliminar" onClick={ ()=>this.confirmDeleteItem(rowData,index) } />
                </div>
            </div>
        );
    }

    onRowEditComplete(e) {
        let material = [...this.state.materiales];
        let { newData, index } = e;

        this.materialService.updateMaterial(newData).then(()=>{
            material[index] = newData;
            this.setState({ materiales: material });
            this.toast.show({severity:'success', summary: 'Éxito!', detail:'Su registro ha sido actualizado', life: 3000});
        });
    }

    confirmDeleteItem(rowData, index) {
        confirmDialog({
            header: 'Eliminar registro',
            message: '¿Desea continuar?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.deleteItem(rowData, index),
            reject: null
        });
    }

    deleteItem(rowData, index){
        this.materialService.deleteMaterial(rowData.mat_id).then(()=>{
            let data =  [...this.state.materiales];
            data.splice(index.rowIndex,1);
            this.setState({materiales: data});
            this.toast.show({severity:'success', summary: 'Éxito!', detail:'Su registro ha sido eliminado', life: 3000});
        });
    }

    render(){
        return(
            <div className="datatable-editing">
                <Toast ref={(el) => this.toast = el} />
                <ConfirmDialog />
                <DataTable value={this.state.materiales} editMode="row" dataKey="mat_id" responsiveLayout="scroll" size="large" paginator 
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                rows={4} rowsPerPageOptions={[10,20,50]}  onRowEditComplete={this.onRowEditComplete.bind(this)} editingRows={ {7: true} }>
                    <Column field="mat_id" header="#" editor={(options) => this.textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="mat_codigo" header="Código" editor={(options) => this.textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="mat_descri" header="Material" editor={(options) => this.textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="mat_precio" header="Precio" body={this.priceBodyTemplate} editor={(options) => this.priceEditor(options)} style={{ width: '20%' }}></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    <Column header="" body={ this.butonsRow.bind(this) } style={{ width: '100%' }}></Column>
                </DataTable>
            </div>
        );
    };
}

/* function TableMaterial(params) {
    const [products, setProducts] = useState([])
    const materialService = new MaterialService();

    const butonsRow = (rowData) => {
        console.log(rowData);
        return(
            <div className='grid'>
                <div className='col-6'>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-info" aria-label="Editar" tooltip="Editar"/>
                </div>
                <div className='col-6'>
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" aria-label="Eliminar" tooltip="Eliminar" onClick={()=>deleteitem(rowData)}/>
                </div>
                
                
            </div>
        );
    }

    const deleteitem= (data) =>{
        materialService.deleteMaterial(data.mat_id);
        products = [];
    }

    useEffect( ()=>{
        materialService.getAllMaterials(setProducts);
    }, []);

    return(

            <DataTable value= {products } responsiveLayout="scroll" size="large" paginator 
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                rows={4} rowsPerPageOptions={[10,20,50]} 
            >
                <Column field="mat_id" header="#" style={{ width: '10%' }}></Column>
                <Column field="mat_codigo" header="Código" style={{ width: '15%' }}></Column>
                <Column field="mat_descri" header="Material" style={{ width: '45%' }}></Column>
                <Column field="mat_precio" header="Precio" style={{ width: '25%' }}></Column>
                <Column header="Acciones" body={ butonsRow } style={{ width: '100%' }}></Column>
            </DataTable>
    )
}

export default TableMaterial; */