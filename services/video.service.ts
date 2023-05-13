import { IVideo } from "@/interfaces/ivideo";
import data from "../data/videos.json";

export const getVideos = (): Array<IVideo> => {
    const videos = data.items as Array<IVideo>;
    return videos;
}