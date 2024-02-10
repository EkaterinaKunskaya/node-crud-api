import { IncomingMessage, ServerResponse } from 'http';
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/userController.js';
import { API_BASE_PATH, METHOD } from '../constants/constants.js';
import { sendResponse } from '../utils/sendResponse.js';
import { validate as validateId } from 'uuid';

export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;
    // TODO: normal validation for id
    try {
        switch (method) {
            case METHOD.GET:
                if (url === API_BASE_PATH) {
                    getUsers(req, res);
                    break;
                }

                if (url?.match(/\/api\/users\/([0-9]+)/)) {
                    const id = url.split('/')[3];
                    (validateId(id))
                        ? getUser(req, res, id)
                        : sendResponse(res, 400, { message: 'Invalid user ID' });
                    break;
                } 

                sendResponse(res, 404, { message: 'Not Found' });
                break;
            case METHOD.POST:
                if (url === API_BASE_PATH) addUser(req, res);
                break;
            case METHOD.PUT:
                if (url?.match(/\/api\/users\/([0-9]+)/)) {
                    const id = url.split('/')[3];
                    updateUser(req, res, id);
                }
                break;
            case METHOD.DELETE:
                if (url?.match(/\/api\/users\/([0-9]+)/)) {
                    const id = url.split('/')[3];
                    deleteUser(req, res, id);
                }
                break;
            default:
                sendResponse(res, 404, { message: 'Not Found' });
        }
    } catch (error) {
        sendResponse(res, 500, { message: 'Internal Server Error' });
    }
}