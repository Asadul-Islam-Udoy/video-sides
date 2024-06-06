import { 
    CREATE_VIDEO_FAIL,
    CREATE_VIDEO_REQUEST, 
    CREATE_VIDEO_SUCCESS ,
    GET_ALL_VIDEOS_FAIL,
    GET_ALL_VIDEOS_REQUEST, 
    GET_ALL_VIDEOS_SUCCESS ,
    GET_ALL_ADMIN_VIDEOS_FAIL,
    GET_ALL_ADMIN_VIDEOS_REQUEST, 
    GET_ALL_ADMIN_VIDEOS_SUCCESS ,
    DELETE_VIDEOS_FAIL,
    DELETE_VIDEOS_REQUEST, 
    DELETE_VIDEOS_SUCCESS ,
    UPDATE_VIDEOS_FAIL,
    UPDATE_VIDEOS_REQUEST, 
    UPDATE_VIDEOS_SUCCESS ,
    VIDEO_RESET,
    CREATE_GROUPS_VIDEO_SUCCESS,
    CREATE_GROUPS_VIDEO_REQUEST,
    CREATE_GROUPS_VIDEO_FAIL,
    GET_NAME_GROUPS_VIDEO_SUCCESS,
    GET_NAME_GROUPS_VIDEO_FAIL,
    GET_NAME_GROUPS_VIDEO_REQUEST,
    RESET_VIDEO_GROUPS_NAME,
    CREATE_VIDEOS_GROUPS_VIDEO_SUCCESS,
    CREATE_VIDEOS_GROUPS_VIDEO_REQUEST,
    CREATE_VIDEOS_GROUPS_VIDEO_FAIL,
    GET_VIDEOS_GROUPS_SINGLE_SUCCESS,
    GET_VIDEOS_GROUPS_SINGLE_FAIL,
    GET_VIDEOS_GROUPS_SINGLE_REQUEST,
    GET_SINGLE_VIDEOS_OF_USER_REQUEST,
    GET_SINGLE_VIDEOS_OF_USER_SUCCESS,
    GET_SINGLE_VIDEOS_OF_USER_FAIL,
    GET_GROUPS_VIDEOS_OF_USER_REQUEST,
    GET_GROUPS_VIDEOS_OF_USER_SUCCESS,
    GET_GROUPS_VIDEOS_OF_USER_FAIL,
    GET_GROUPS_VIDEOS_USER_UNIQUE_SUCCESS,
    GET_GROUPS_VIDEOS_USER_UNIQUE_REQUEST,
    GET_GROUPS_VIDEOS_USER_UNIQUE_FAIL,
    RESET_USER_VIDEOS,
    GET_SINGLE_VIDEO_REQUEST,
    GET_SINGLE_VIDEO_FAIL,
    GET_SINGLE_VIDEO_SUCCESS,
    VIDEO_LIKE_REQUEST,
    VIDEO_LIKE_SUCCESS,
    VIDEO_LIKE_FAIL,
    VIDEO_COMMEND_GET_REQUEST,
    VIDEO_COMMEND_GET_SUCCESS,
    VIDEO_COMMEND_GET_FAIL,
    VIDEO_COMMEND_CREATE_REQUEST,
    VIDEO_COMMEND_CREATE_SUCCESS,
    VIDEO_COMMEND_CREATE_FAIL,
    POSTER_CREATE_REQUEST,
    POSTER_CREATE_SUCCESS,
    POSTER_CREATE_FAIL,
    POSTER_CREATE_RESET,
    POSTER_GET_REQUEST,
    POSTER_GET_SUCCESS,
    POSTER_GET_FAIL,
    POSTER_DELETE_REQUEST,
    POSTER_DELETE_SUCCESS,
    POSTER_DELETE_FAIL,
    POSTER_GET_ALL_REQUEST,
    POSTER_GET_ALL_SUCCESS,
    POSTER_GET_ALL_FAIL,
    POSTER_GET_SINGLE_REQUEST,
    POSTER_GET_SINGLE_SUCCESS,
    POSTER_GET_SINGLE_FAIL,
    POSTER_CREATE_REVIEW_REQUEST,
    POSTER_CREATE_REVIEW_SUCCESS,
    POSTER_CREATE_REVIEW_FAIL
  } from '../constance/VideoConstance';

  export const videoReducer=(state={videos:[],groupVideo:[]},action)=>{
    switch(action.type){
        case GET_ALL_VIDEOS_REQUEST:
                case GET_ALL_ADMIN_VIDEOS_REQUEST:
                    case GET_VIDEOS_GROUPS_SINGLE_REQUEST:
                        
            return{
                ...state,
                lodding:true,
                isDeleteVideo:false,
            }
        case GET_VIDEOS_GROUPS_SINGLE_SUCCESS:
                return{
                    ...state,
                    lodding:false,
                    groupVideo:action.payload
             }
        case GET_ALL_VIDEOS_SUCCESS:
            return{
               ...state,
               lodding:false,
               videos:action.payload
            }
        case GET_ALL_ADMIN_VIDEOS_SUCCESS:
                return{
                   ...state,
                   lodding:false,
                   videos:action.payload
            }
            case GET_ALL_VIDEOS_FAIL:
                case GET_ALL_ADMIN_VIDEOS_FAIL:
                   case DELETE_VIDEOS_FAIL:
                        case GET_VIDEOS_GROUPS_SINGLE_FAIL:
            return{
            ...state,
            lodding: false,
            error:action.payload,
            isDeleteVideo:false,
            isUpdateVideo:false
            
        }
        case VIDEO_RESET:
            return{
                ...state,
                error:null,
                isDeleteVideo:false,
                isUpdateVideo:false,
                lodding:false
            }
        default:
            return state
    }
  }

  export const groupsReducers=(state={groupsFile:[]},action)=>{
    switch(action.type){
        case CREATE_GROUPS_VIDEO_REQUEST:
            case GET_NAME_GROUPS_VIDEO_REQUEST:
                      
            return{
                ...state,
                lodding:true,
                isGroups:false,
               
            }
        case CREATE_GROUPS_VIDEO_SUCCESS:
            return{
                ...state,
                lodding:false,
                isGroups:true,
                groupsFile:action.payload
            }
        case GET_NAME_GROUPS_VIDEO_SUCCESS:
            return{
                ...state,
                lodding:false,
                isGroups:false,
                groupsFile:action.payload
            }
        case CREATE_GROUPS_VIDEO_FAIL:
            case GET_NAME_GROUPS_VIDEO_FAIL:
                        
            return{
                ...state,
                lodding:false,
                isGroups:false,
                error:action.payload
            }
        case RESET_VIDEO_GROUPS_NAME:
             return{
                ...state,
                lodding:false,
                error:null,
                isGroups:false,
             }
        default :
          return state
    }
  }

export const userVideoFileReducer=(state={videosFile:[],videoFileGroup:[]},action)=>{
   switch(action.type){
    case GET_SINGLE_VIDEOS_OF_USER_REQUEST:
        case GET_GROUPS_VIDEOS_OF_USER_REQUEST:
         case CREATE_VIDEO_REQUEST:
            case CREATE_VIDEOS_GROUPS_VIDEO_REQUEST:
                case UPDATE_VIDEOS_REQUEST:
                    case DELETE_VIDEOS_REQUEST:   
                      case GET_GROUPS_VIDEOS_USER_UNIQUE_REQUEST:
        return {
            ...state,
            lodding:true,
            isVideoGroup:false,
            isCreateVideo:false,
            isUpdateVideo:false,
            isDeleteVideo:false
        }
         case CREATE_VIDEOS_GROUPS_VIDEO_SUCCESS:
            return{
                ...state,
                lodding:false,
                isVideoGroup:true,
              
            }
         case CREATE_VIDEO_SUCCESS:
            return{
                ...state,
                lodding:false,
                isCreateVideo:true,
                videosFile:action.payload
            }
         case UPDATE_VIDEOS_SUCCESS:
                return{
                    ...state,
                    lodding:false,
                    isUpdateVideo:true,
                    videosFile:action.payload
                }
         case DELETE_VIDEOS_SUCCESS:
                    return{
                        ...state,
                        lodding:false,
                        isDeleteVideo:true,
                        videosFile:action.payload
             }
         case GET_SINGLE_VIDEOS_OF_USER_SUCCESS:
            return{
                ...state,
                lodding:false,
                videosFile:action.payload
            }
            case GET_GROUPS_VIDEOS_OF_USER_SUCCESS:
                return{
                    ...state,
                    lodding:false,
                    videosFile:action.payload
                }
            case GET_GROUPS_VIDEOS_USER_UNIQUE_SUCCESS:
                    return{
                        ...state,
                        lodding:false,
                        videoFileGroup:action.payload
                    }
            case CREATE_VIDEOS_GROUPS_VIDEO_FAIL:
                case CREATE_VIDEO_FAIL: 
                  case GET_SINGLE_VIDEOS_OF_USER_FAIL:
                    case GET_GROUPS_VIDEOS_OF_USER_FAIL:
                      case UPDATE_VIDEOS_FAIL: 
                         case GET_GROUPS_VIDEOS_USER_UNIQUE_FAIL:
              return{
                ...state,
                lodding:false,
                isVideoGroup:false,
                isCreateVideo:false,
                isUpdateVideo:false,
                isDeleteVideo:false,
                error:action.payload
            }
            case RESET_USER_VIDEOS:
                return{
                    ...state,
                    lodding:false,
                    isVideoGroup:false,
                    isCreateVideo:false,
                    isUpdateVideo:false,
                    isDeleteVideo:false,
                    error:null
                }
     default :
        return state
   }
}
export const SingleVideoReducers=(state={singleFile:[],videoCommends:[]},action)=>{
    switch(action.type){
        case GET_SINGLE_VIDEO_REQUEST:    
           case VIDEO_LIKE_REQUEST:   
              case VIDEO_COMMEND_CREATE_REQUEST:
                case VIDEO_COMMEND_GET_REQUEST:
            return{
                ...state,
                lodding:true, 
                isCommend:false,
                isLike:false
            }
        case GET_SINGLE_VIDEO_SUCCESS:
            return{
                ...state,
                lodding:false,
                singleFile:action.payload
            }
        case VIDEO_LIKE_SUCCESS:
            return{
                ...state,
                lodding:false,
                isLike:true,
                singleFile:action.payload
            }
        case VIDEO_COMMEND_CREATE_SUCCESS:
            return{
                ...state,
                lodding:false,
                isCommend:true,
                videoCommends:action.payload 
            }
        case VIDEO_COMMEND_GET_SUCCESS:
                return{
                    ...state,
                    lodding:false,
                    isCommend:false,
                    videoCommends:action.payload 
                }
        case GET_SINGLE_VIDEO_FAIL:    
           case VIDEO_LIKE_FAIL:   
             case VIDEO_COMMEND_CREATE_FAIL:
                case VIDEO_COMMEND_GET_FAIL:
            return{
                ...state,
                lodding:false,
                error:action.payload,
                isLike:false
            }
        default :
          return state
    }
  }

  
  export const postersReducer=(state={posters:[],singlePoster:{}},action)=>{
    switch(action.type){
        case POSTER_CREATE_REQUEST:
            case POSTER_GET_REQUEST:
                case POSTER_DELETE_REQUEST:
                    case POSTER_GET_ALL_REQUEST:
                        case POSTER_GET_SINGLE_REQUEST:
                            case POSTER_CREATE_REVIEW_REQUEST:
            return{
                ...state,
                lodding:true,
                isPoster:false,
                isDeletePoster:false,
                isReview:false
            }
        case POSTER_CREATE_SUCCESS:
            return {
                ...state,
                lodding:false,
                isPoster:true,
                posters:action.payload
            }
        case POSTER_GET_SUCCESS:
            return{
                ...state,
                lodding:false,
                isPoster:false,
                isDeletePoster:false,
                posters:action.payload  
            }
        case POSTER_DELETE_SUCCESS:
            return{
                ...state,
                lodding:false,
                isPoster:false,
                isDeletePoster:true,
                posters:action.payload 
            }
        case  POSTER_GET_ALL_SUCCESS:
            return{
                ...state,
                lodding:false,
                posters:action.payload  
            }
        case POSTER_GET_SINGLE_SUCCESS:
            return{
                ...state,
                lodding:false,
                singlePoster:action.payload  
            }
        case POSTER_CREATE_REVIEW_SUCCESS:
            return{
                ...state,
                lodding:false,
                singlePoster:action.payload ,
                isReview:true 
            }
        case POSTER_CREATE_FAIL:
            case POSTER_GET_FAIL:
                case POSTER_DELETE_FAIL:
                    case POSTER_GET_ALL_FAIL:
                        case POSTER_GET_SINGLE_FAIL:
                            case POSTER_CREATE_REVIEW_FAIL:
            return{
                ...state,
                lodding:false,
                isPoster:false,
                isDeletePoster:false,
                isReview:false,
                error:action.payload
            }
        case POSTER_CREATE_RESET:
            return {
                ...state,
                lodding:false,
                error:null,
                isPoster:false,
                isDeletePoster:false,
                isReview:false,
            }

        default :
         return state
    }
  }