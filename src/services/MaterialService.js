import axios from "axios";


export class MaterialService{
    url = 'http://localhost:3001/api';

    async getAllMaterials(){
        const resp = await axios.get( `${this.url}/materiales` );
        return resp.data.body;
    }

    async createMaterial(data){
        const resp = await axios.post( `${this.url}/materiales`, data );
    }

    async updateMaterial(data){
        let body = {
            codigo: data.mat_codigo,
            material: data.mat_descri,
            precio: data.mat_precio
        };
        const resp = await axios.put( `${this.url}/materiales/${data.mat_id}`, body );
    }

    async deleteMaterial(id){
        const resp = await axios.delete( `${this.url}/materiales/${id}` );
    }
}