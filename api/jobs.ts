interface Job {
    id: number;
    title: string;
    location: string;
    salary: string;
    image: string;
    features: string[];
    is_active: boolean;
    created_at: string;
}

module.exports = async function handler(req: any, res: any) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const SUPABASE_URL = process.env.SUPABASE_URL;
        const SUPABASE_KEY = process.env.SUPABASE_KEY;

        if (!SUPABASE_URL || !SUPABASE_KEY) {
            console.error('Missing Supabase configuration');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Get limit from query params (optional)
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

        // Build Supabase API URL
        let apiUrl = `${SUPABASE_URL}/rest/v1/jobs?is_active=eq.true&order=created_at.desc`;
        if (limit) {
            apiUrl += `&limit=${limit}`;
        }

        // Fetch from Supabase using native fetch (available in Node 18+)
        const response = await fetch(apiUrl, {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Supabase error:', response.status, errorText);
            throw new Error(`Supabase error: ${response.status}`);
        }

        const jobs: Job[] = await response.json();

        return res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};
