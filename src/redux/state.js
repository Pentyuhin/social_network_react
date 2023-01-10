import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";

let store = {

    _state: {

        pagePost: {
            postData: [
                {id: 1, message: 'Hi, my friend! How are you?', likesCount: 19},
                {id: 2, message: 'Hi, my friend! OK?', likesCount: 32},
                {id: 3, message: 'OK?', likesCount: 44},
                {id: 4, message: 'Yoooo', likesCount: 22},
                {id: 5, message: 'Hi, my friend! OK?', likesCount: 77},
            ],
            newPostText: 'I\'m new post',
        },

        pageMessage: {
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
        },

    },

    _rerenderEntireTree() {
        console.log('State changed')
    },

    getState(){
        return this._state;
    },

    subscribe(observer){
        this._rerenderEntireTree = observer;
    },

    dispatch(action){

        this._state.pagePost = profileReducer(this._state.pagePost, action);
        this._state.pageMessage = messageReducer(this._state.pageMessage , action);

        this._rerenderEntireTree(this._state)

    },

}



export default store