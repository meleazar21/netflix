import { CardSize } from "@/enums/card-size";

interface IId {
    kind: string;
    videoId: string;
}
interface ISnippet {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: IThumbnail
    channelTitle: string;
}
interface IStatistics {
    viewCount: number;
    likeCount: number
}
interface IThumbnailSize {
    url: string;
    width: number;
    height: number;
}
interface IThumbnail {
    high: IThumbnailSize;
}
export interface IVideoResponse {
    id: IId;
    snippet?: ISnippet | null;
    statistics?: IStatistics | null;
}