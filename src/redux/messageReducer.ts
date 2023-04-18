import {InferActionsTypes} from "./redux-store";

type dialogDataType = {
    id: number
    name: string
}

type messageDataType = {
    id: number
    message: string
}


let initialState = {
    dialogData:[
        {id: 1, name: "Ivan"},
        {id: 2, name: "Ekaterina"}
    ] as Array<dialogDataType>,
    messageData:[
        {id: 1, message: "Hi"},
        {id: 2, message: "Yo"},
        {id: 3, message: "What's up?"},
    ] as Array<messageDataType>,

}

export type MessActionType = InferActionsTypes<typeof actions>

export type MessInitialStateType = typeof initialState;

const messageReducer = (state = initialState, action: MessActionType): MessInitialStateType => {

    switch (action.type) {
        case 'ADD_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messageData: [...state.messageData, {id: 6, message: body}]
            }

        default:
            return state;
    }
}


export const actions = {
    addNewMess: (newMessageBody: string) => {
        return {type: 'ADD_MESSAGE',
            newMessageBody } as const
    }
}



export default messageReducer;