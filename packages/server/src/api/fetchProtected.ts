// src/api/fetchProtected.ts
export async function callProtectedApi(
    getIdToken: () => Promise<string | null>
) {
    const idToken = await getIdToken();
    if (!idToken) throw new Error('No token');

    const res = await fetch('/api/protected', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error('Request failed');
    return res.json();
}
