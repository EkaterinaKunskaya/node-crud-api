import { IncomingMessage, ServerResponse } from 'http';
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/userController';
import { API_BASE_PATH, METHOD } from '../constants/constants';
import { sendResponse } from '../utils/sendResponse';
import { validate as validateId } from 'uuid';


export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;

    const parsedUrl = url?.split('/');
    const pathAPI = '/' + parsedUrl?.[1] + '/' + parsedUrl?.[2] as string;
    const paramsId = parsedUrl?.[3] as string;
    const restParams = parsedUrl?.[4] as string;

    const isCorrectSingleUserRequest = url?.endsWith(paramsId) && !restParams && pathAPI === API_BASE_PATH;

    try {

        if (
            isCorrectSingleUserRequest 
            && !validateId(paramsId) 
            && method !== METHOD.POST
            && pathAPI === API_BASE_PATH
        ) {
            sendResponse(res, 400, { message: 'Invalid user ID' });
            return;
        }

        switch (method) {
            case METHOD.GET:
                if (url === API_BASE_PATH) {
                    getUsers(req, res);
                    break;
                }

                if (isCorrectSingleUserRequest) {
                    getUser(req, res, paramsId);
                    break;
                }

                sendResponse(res, 404, { message: 'Not Found' });
                break;
            case METHOD.POST:
                if (url === API_BASE_PATH) {
                    addUser(req, res);
                    break;
                } 
                
                sendResponse(res, 404, { message: 'Not Found' });
                break;
            case METHOD.PUT:
                if (isCorrectSingleUserRequest) {
                    updateUser(req, res, paramsId);
                    break;
                };

                sendResponse(res, 404, { message: 'Not Found' });
                break;
            case METHOD.DELETE:
                if (isCorrectSingleUserRequest) {
                    deleteUser(req, res, paramsId);
                    break;
                };

                sendResponse(res, 404, { message: 'Not Found' });
                break;
            default:
                sendResponse(res, 404, { message: 'Not Found' });
        }
    } catch (error) {
        sendResponse(res, 500, { message: 'Internal Server Error' });
    }
}