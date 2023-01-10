const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';


let initialState = {
    dialogData:[
        {id: 1, name: "Ivan"},
        {id: 2, name: "Ekaterina"}
    ],
    messageData:[
        {id: 1, message: "Hi"},
        {id: 2, message: "Yo"},
        {id: 3, message: "What's up?"},
    ],

    newMessText: 'I\'m new mess',
}

const messageReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMess = {
                id: 3,
                message: state.newMessText,
            };
            return {
                ...state,
                newMessText: '',
                messageData: [...state.messageData, newMess]
            }

        case UPDATE_NEW_MESSAGE_TEXT:

            return {
                ...state,
                newMessText: action.newTextMessage,
            };

        default:
            return state;
    }
}

export const addMessageActionCreate = () => {
    return {type: ADD_MESSAGE}
}

export const upDateNewMessageTextActionCreate = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newTextMessage: text
    }
}

export default messageReducer;