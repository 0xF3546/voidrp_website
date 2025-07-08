import UserModel from "./UserModel";

export class TicketModel {
    id!: number;
    title!: string;
    creatorId!: number;
    messages!: MessageModel[];
    creatorName!: string;
    category!: CategoryModel;
    isEditor!: boolean;
    created!: Date;
    message!: string;
    closed!: boolean;
    closerName!: string;
    closedAt!: Date | null;
}

class CategoryModel {
    type!: string;
    typeColor!: TypeColorModel;
}

class TypeColorModel {
    background!: string;
    font!: string;
}

export class MessageModel {
    message!: MSGModel;
    sender!: UserModel;
}

class MSGModel {
    text!: string;
    send!: Date;
    id!: number;
}
export default {
    TicketModel,
    MessageModel
};