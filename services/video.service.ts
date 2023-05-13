import { IVideo } from "@/interfaces/ivideo";
import data from "../data/videos.json";
import { YOUTUBE_API_KEY } from "@/constants/commonStrings";

export const getVideos = async () => {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=disney%20trailer&key=${YOUTUBE_API_KEY}`);
    const data = await response.json()
    return data?.items as IVideo[];
}