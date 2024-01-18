export const initialState={
    user:null, //user not logged in
};

export const actionTypes={
    SET_USER: "SET_USER",
};

const reducer=(state,action)=>{
    console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                ...state, //State of data preserved
                user:action.user, //User changed
            };

        default: 
            return state;
    }
};

export default reducer;