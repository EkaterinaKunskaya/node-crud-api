import { IncomingMessage, ServerResponse } from 'http';
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/userController';
import { API_BASE_PATH, METHOD } from '../constants/constants';
import { sendResponse } from '../utils/sendResponse';
import { validate as validateId } from 'uuid';

export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;

    const parsedUrl =req?.url?.split('/');
    const paramsId = parsedUrl?.[3] as string;
    const restParams = parsedUrl?.[4] as string;

    try {
        switch (method) {
            case METHOD.GET:
                if (url === API_BASE_PATH) {
                    getUsers(req, res);
                    break;
                }

                if (url?.endsWith(paramsId) && !restParams) {
                    (validateId(paramsId))
                        ? getUser(req, res, paramsId)
                        : sendResponse(res, 400, { message: 'Invalid user ID' });
                    break;
                } 

                sendResponse(res, 404, { message: 'Not Found' });
                break;
            case METHOD.POST:
                if (url === API_BASE_PATH) addUser(req, res);
                break;
            case METHOD.PUT:
                if (url?.endsWith(paramsId) && !restParams) {
                    (validateId(paramsId))
                    ? updateUser(req, res, paramsId)
                    : sendResponse(res, 400, { message: 'Invalid user ID' });
                };
                break;
            case METHOD.DELETE:
                if (url?.endsWith(paramsId) && !restParams) {
                    (validateId(paramsId))
                    ? deleteUser(req, res, paramsId)
                    : sendResponse(res, 400, { message: 'Invalid user ID' });
                };
                break;
            default:
                sendResponse(res, 404, { message: 'Not Found' });
        }
    } catch (error) {
        sendResponse(res, 500, { message: 'Internal Server Error' });
    }
}