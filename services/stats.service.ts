import { IVideoInput } from "@/interfaces/ivideo-input";
import { IVideoResponse } from "@/interfaces/ivideoResponse";
import { getLikedVideos } from "@/lib/stats";

class StatsService {

    async likeVideo(video: IVideoInput) {
        try {
            const request = await fetch('/api/stats', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(video)
            });
            const result = await request.json();
            return result;
        } catch (error: any) {
            return error;
        }
    }
    getVideoById(videoId: string, onSuccess: Function, onError: Function) {
        try {
            fetch(`/api/stats?videoId=${videoId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => res.json()).then(data => {
                if (!data.success) throw data;
                onSuccess(data);
            });
        } catch (error) {
            console.log({ error });
            onError(error);
        }
    }

    async getLikedVideos(userId: string, token: string) {
        const videos = await getLikedVideos(userId, token);
        const likedVideos = videos.data.stats.map((video: any) => {
            const newLikedVideo: IVideoResponse = {
                id: {
                    kind: video.videoId,
                    videoId: video.videoId
                },
                snippet: null,
                statistics: null
            }
            return newLikedVideo
        }) as Array<IVideoResponse>;
        return likedVideos;
    }

}

export const statsService = new StatsService();