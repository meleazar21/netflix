import { IVideoInput } from "@/interfaces/ivideo-input";

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
            console.log({ entroCatch: error });
            onError(error);
        }
    }

}

export const statsService = new StatsService();