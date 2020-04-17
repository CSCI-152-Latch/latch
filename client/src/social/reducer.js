import { 
    mutual_type, 
    requester_type,
    friend_type,
    responder_type,
    room_type,
    message_type
} from './components/index';

const initialState = {
    friends: [],
    requesters: [],
    responders: [],
    mutuals: [],
    rooms: [],
    chatID: null,
    messages: null,
    error: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case mutual_type.GET_MUTUALS: {
            return {
                ...state,
                mutuals: payload
            }   
        }
        case room_type.GET_ROOM: {
            return {
                ...state,
                rooms: payload
            }   
        }
        case mutual_type.ADD_USER:
        case requester_type.GET_REQUESTERS:
        case requester_type.CANCEL_USER: {
            const { requesters } = payload; 
            return {
                ...state,
                requesters: requesters
            }
        }
        case friend_type.GET_FRIENDS:
        case friend_type.DELETE_USER: {
            const { friends } = payload;
            return {
                ...state,
                friends: friends
            }
        }
        case responder_type.GET_RESPONDERS: 
        case responder_type.DECLINE_USER: {
            const { responders } = payload;
            return {
                ...state,
                responders: responders
            }
        }
        case responder_type.ACCEPT_USER: {
            const { friends, responders } = payload;
            return {
                ...state,
                friends: friends,
                responders: responders
            }
        } 
        case room_type.GET_MESSAGES: {
            const { chatID, messages } = payload;
            return {
                ...state,
                chatID: chatID,
                messages: messages
            }
        }
        case message_type.ADD_MESSAGE: {
            const { messages } = payload;
            return {
                ...state,
                messages: messages
            }
        }
        default: {
            return {
                ...state,
                error: payload
            }
        }
    }
}