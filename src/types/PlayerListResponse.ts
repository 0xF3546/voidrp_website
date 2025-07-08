import { PlayerListPlayer } from "./PlayerListPlayer";

export interface PlayerListPlayerResponse {
    items: PlayerListPlayer[];
    total: number;
    page: number;
    size: number;
};