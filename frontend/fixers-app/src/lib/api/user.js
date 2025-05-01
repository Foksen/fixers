import { backendFetch } from "./fetcher";

export async function getMyProfile(accessToken) {
    return backendFetch('/api/users/me', {
        method: 'GET',
        accessToken,
    })
}