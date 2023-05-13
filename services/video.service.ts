import { IVideo } from "@/interfaces/ivideo";
import { YOUTUBE_API_KEY } from "@/constants/commonStrings";

export const getCommonVideos = async (url: string) => {
    try {
        const baseUrl = 'https://youtube.googleapis.com/youtube/v3';
        const response = await fetch(`${baseUrl}/${url}&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();
        if (data?.error) {
            console.log("error fetching youtube api: ", data.error);
            return [];
        }
        return data?.items as IVideo[];
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
