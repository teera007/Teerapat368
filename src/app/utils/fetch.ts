import QueryString from "qs";

interface FetchResponse<T> {
    data: T | null;
    status?: string;
    error?: {};
}

export const fetchApi = async <T>(
    path: string,
    options: RequestInit = {
        method: "GET"
    },
    populate?: any,
    filter?: any
): Promise<FetchResponse<T>> => {
    let headers = {
        "Content-Type": "application/json"
    }
    // let url = `${process.env.API_URL}${path}`;
    let url: any;
    if (populate) {
        let queryparams: any = {};
        queryparams.populate = populate
        if (filter) {
            queryparams.filter = filter
        }
            const newUrl = new URL(path, process.env.API_URL);
            newUrl.search = QueryString.stringify({
                populate: queryparams
            })
            url = newUrl;
    }
    try {
        const response = await fetch(url, { ...options, headers });
        if (!response.ok) {
            throw new Error("Failed to fetch team members");
        }

        const result = await response.json();
        return {
            data: result,
            status: response.status.toString(),
        };
    } catch (error: unknown) {
        return { data: null, status: "500", error: "error" };
    }
};