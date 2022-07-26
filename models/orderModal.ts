export class order_Model {
  public constructor(
    public id?: number,
    public customer_id?: number,
    public order_number?: number,
    public city?: string,
    public address?: string | any,
    public area?: number,
    public order_date_in?: string,
    public status?: number,
    public delivery_date?: string,
    public delivery_time?: string,
    public completed?: string,
    public deleted?: number,
    public orderList?: String // public order_date_end?: string,
  ) {}
}
