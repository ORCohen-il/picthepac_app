import { order_Model } from "./orderModal";


export class order_EmissaryModel {
    public constructor(
        public id?: number,
        public emissary?: number,
        public shipping?: number,
        public date?: string,
        public delivery?: order_Model,
    ) { }
}
