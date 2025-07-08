import { TicketModel } from "./TicketModel";

export interface TicketListResponse {
    tickets: TicketModel[];
    total: number;
    page: number;
    size: number;
};