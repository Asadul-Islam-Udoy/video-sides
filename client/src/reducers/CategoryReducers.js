import { 
    GET_ALL_CATEGORY_FAIL, 
    GET_ALL_CATEGORY_REQUEST, 
    GET_ALL_CATEGORY_SUCCESS ,
    GET_SINGLES_CATEGORIES_SUCCESS,
    GET_SINGLES_CATEGORIES_REQUEST,
    GET_SINGLES_CATEGORIES_FAIL
} from "../constance/CategoryConstance";
export const CategoryReducer=(state={categories:[]},action)=>{
    switch(action.type){
        case GET_ALL_CATEGORY_REQUEST:          
            return{
                ...state,
                lodding:true,
            }
           case GET_ALL_CATEGORY_SUCCESS:
                  return{
                   ...state,
                   lodding:false,
                   categories:action.payload
            }
            case  GET_ALL_CATEGORY_FAIL:
               return{
                   ...state,
                   lodding: false,
                   error:action.payload,
               }
        default:
            return state
    }
  }


  export const CategorySinglesReducer=(state={categories:[]},action)=>{
    switch(action.type){
        case GET_SINGLES_CATEGORIES_REQUEST:          
            return{
                ...state,
                lodding:true,
            }
           case GET_SINGLES_CATEGORIES_SUCCESS:
                  return{
                   ...state,
                   lodding:false,
                   categories:action.payload
            }
            case  GET_SINGLES_CATEGORIES_FAIL:
               return{
                   ...state,
                   lodding: false,
                   error:action.payload,
               }
        default:
            return state
    }
  }