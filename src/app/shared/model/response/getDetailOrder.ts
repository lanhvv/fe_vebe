import { BaseResponse } from './BaseResponse';
import { IGetDetailOrder } from '../IGetDetailOrder';
import { OrderItemsDetail } from './orderItemsDetail';
import { TimelineItems } from '../timelineItems';
export class GetDetailOrder extends BaseResponse {
    items!:IGetDetailOrder[];
    orderItems!: OrderItemsDetail;
    timelineItems!: TimelineItems[];
}
