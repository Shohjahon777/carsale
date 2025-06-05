import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const response = await fetch('https://crm.carsale.uz/b/ap/website/web_leads$get_leads', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req.body),
		});

		let data = null;

		const text = await response.text();
		if (text) {
			data = JSON.parse(text);
			return res.status(response.status).json(data);
		} else {
			return res.status(response.status).json({ message: "Successfully submitted, but no data returned." });
		}
	} catch (error) {
		console.error('Proxy error:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
