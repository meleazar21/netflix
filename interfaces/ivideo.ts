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
}
interface IThumbnailSize {
    url: string;
    width: number;
    height: number;
}
interface IThumbnail {
    default: IThumbnailSize;
    medium: IThumbnailSize;
    high: IThumbnailSize;
}
export interface IVideo {
    id: IId;
    snippet: ISnippet;
}