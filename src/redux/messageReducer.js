const ADD_MESSAGE = 'ADD-MESSAGE';


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

}

const messageReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMess = {
                ...state,
                message: action.textMess,
            };
            return {
                ...state,
                messageData: [...state.messageData, newMess]
            }

        default:
            return state;
    }
}

export const addMessageActionCreate = (textMess) => {
    return {type: ADD_MESSAGE,
        textMess}
}


export default messageReducer;