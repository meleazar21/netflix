import { IVideoResponse } from "@/interfaces/ivideoResponse";
import { IS_DEVELOPMENT, YOUTUBE_API_KEY } from "@/constants/commonStrings";
import videos from "../data/videos.json";
import { getWatchedStats } from "@/lib/stats";

const fetchVideos = async (url: string) => {
    const baseUrl = 'https://youtube.googleapis.com/youtube/v3';
    const response = await fetch(`${baseUrl}/${url}&key=${YOUTUBE_API_KEY}`);
    return await response.json();
}

export const getCommonVideos = async (url: string) => {
    try {
        const data = IS_DEVELOPMENT === 'true' ? videos : await fetchVideos(url);
        if (data?.error) {
            console.log("error fetching youtube api: ", data.error);
            return [];
        }
        return data?.items as IVideoResponse[];
    } catch (error) {
        console.log("something went wrong with videos services: ", error);
        return [];
    }
}

export const getVideos = (search: string) => {
    const url = `search?part=snippet&maxResults=25&q=${search}`;
    return getCommonVideos(url);
}

export const getPopularVideos = () => {
    const url = 'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US';
    return getCommonVideos(url);
}

export const getVideoById = (videoId: string) => {
    const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    return getCommonVideos(url);
}

export const getWatchedAgainVideos = async (userId: string, token: string) => {
    const videos = await getWatchedStats(userId, token);
    const watchedVideos = videos.data.stats.map((video: any) => {
        const newWatchedVideo: IVideoResponse = {
            id: video.videoId,
            snippet: null,
            statistics: null,
        }
        return newWatchedVideo;
    }) as Array<IVideoResponse>;
    console.log({ watchedVideos });
    return watchedVideos;
}