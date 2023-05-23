import { Favourited } from "@/enums/favourited";

export interface IStatsVariables {
    userId: string;
    videoId: string;
    watched: boolean;
    favourited: Favourited,
}

export type TypeInsertVariables = Omit<IStatsVariables, "favourited">;
