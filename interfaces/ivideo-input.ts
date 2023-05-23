import { Favourited } from "@/enums/favourited";

export interface IVideoInput {
    videoId: string;
    watched: boolean;
    favourited: Favourited;
}