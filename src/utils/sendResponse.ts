import { ServerResponse } from 'http';

export const sendResponse = (
	res: ServerResponse,
	statusCode: number,
	data: Record<string, any>,
) => {
	res.writeHead(statusCode, { 'Content-type': 'application/json' });
	res.end(JSON.stringify(data));
};