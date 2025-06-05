// pages/api/get-main-stats.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const response = await fetch('https://crm.carsale.uz/b/ap/website/website&get_main_stats', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req.body),
		});

		const data = await response.json();
		res.status(response.status).json(data);
	} catch (error) {
		console.error('Proxy error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
