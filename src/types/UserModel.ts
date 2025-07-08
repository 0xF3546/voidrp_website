class UserModel {
    id!: number;
    name!: string;
    rank!: RankModel;
}

export class RankModel {
    color!: string;
    name!: string;
}

export default UserModel;