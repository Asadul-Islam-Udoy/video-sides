import {
    REGISTER_CREATE_FAIL,
    REGISTER_CREATE_REQUEST, 
    REGISTER_CREATE_SUCCESS,
    LOGIN_CREATE_FAIL,
    LOGIN_CREATE_REQUEST, 
    LOGIN_CREATE_SUCCESS,
    LOGOUT_CREATE_FAIL,
    LOGOUT_CREATE_REQUEST, 
    LOGOUT_CREATE_SUCCESS,
    GET_ALL_USERS_FAIL,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_REQUEST,
    PERMISSION_USER_FAIL,
    PERMISSION_USER_REQUEST,
    PERMISSION_USER_SUCCESS,
    ROLE_PERMISSION_USER_FAIL,
    ROLE_PERMISSION_USER_REQUEST,
    ROLE_PERMISSION_USER_SUCCESS,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAIL,
    UPDATE_USER_INFO_REQUEST,
    FORGET_PASSWORD_EMAIL_REQUEST,
    FORGET_PASSWORD_EMAIL_SUCCESS,
    FORGET_PASSWORD_EMAIL_FAIL,
    FORGET_PASSWORD_RESET_REQUEST,
    FORGET_PASSWORD_RESET_SUCCESS,
    FORGET_PASSWORD_RESET_FAIL,
    USER_RESET,
    REGISTER_RESET
   } from '../constance/UserConstance';

export const RegisterReducer=(state={userInfo:{}},action)=>{
    switch(action.type){
        case REGISTER_CREATE_REQUEST:
            case LOGIN_CREATE_REQUEST:
                case LOGOUT_CREATE_REQUEST:
                    case UPDATE_USER_INFO_REQUEST:
                        case FORGET_PASSWORD_EMAIL_REQUEST:
                            case FORGET_PASSWORD_RESET_REQUEST:
            return{
                lodding:true,
                isRegister:false,
                isLogin:false,
                isLogout:false,
                isUpdateUser:false,
                isForgetEmail:false,
                isForgetUpdatePassword:false,
            }
        case REGISTER_CREATE_SUCCESS:
            return{
                lodding:false,
                isRegister:true
            }
        case LOGIN_CREATE_SUCCESS:
            return {
                ...state,
                lodding:false,
                isLogin:true,
                userInfo:action.payload   
            }
        case LOGOUT_CREATE_SUCCESS:
            return{
                userInfo:null,
                lodding:false,
                isLogout:true
            }
        case UPDATE_USER_INFO_SUCCESS:
            return{
                ...state,
                isUpdateUser:true,
                userInfo:action.payload
            }
        case FORGET_PASSWORD_EMAIL_SUCCESS:
            return {
            ...state,
            isForgetEmail:true,
        }
        case FORGET_PASSWORD_RESET_SUCCESS:
            return{
                ...state,
                isForgetUpdatePassword:true,
            }
        case REGISTER_CREATE_FAIL:
            case LOGIN_CREATE_FAIL:
                case LOGOUT_CREATE_FAIL:
                    case UPDATE_USER_INFO_FAIL:
                        case FORGET_PASSWORD_EMAIL_FAIL:
                             case FORGET_PASSWORD_RESET_FAIL:
            return{
                ...state,
                lodding:false,
                isRegister:false,
                isLogin:false,
                isLogout:false,
                isUpdateUser:false,
                isForgetEmail:false,
                isForgetUpdatePassword:false,
                error:action.payload
            }
        case REGISTER_RESET:
            return{
                ...state,
                error:null,
                isRegister:false,
                isLogin:false,
                isLogout:false,
                isUpdateUser:false,
                isForgetEmail:false,
                isForgetUpdatePassword:false,
            }
        default:
            return state
    }
}

export const AdminUserReducer=(state={adminUser:[]},action)=>{
    switch(action.type){
        case GET_ALL_USERS_REQUEST:
            case DELETE_USER_REQUEST:
                case PERMISSION_USER_REQUEST:
                    case ROLE_PERMISSION_USER_REQUEST:
            return{
                ...state,
                lodding:true,
                isDeleteUser:false,
                isPermission:false,
                isRole:false
            }
        case GET_ALL_USERS_SUCCESS:
            return{
                ...state,
                 lodding:false,
                 adminUser:action.payload
            }  
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                lodding:false,
                isDeleteUser:true,
                adminUser:action.payload
            }
        case PERMISSION_USER_SUCCESS:
            return{
                ...state,
                lodding:false,
                isPermission:true,
                adminUser:action.payload
            }
        case ROLE_PERMISSION_USER_SUCCESS:
            return{
                ...state,
                lodding:false,
                isRole:true,
                adminUser:action.payload
            }
        case GET_ALL_USERS_FAIL:
            case DELETE_USER_FAIL:
                case PERMISSION_USER_FAIL:
                    case ROLE_PERMISSION_USER_FAIL:
            return{
                ...state,
                lodding:false,
                error:action.payload,
                isDeleteUser:false,
                isPermission:false

            }
        case USER_RESET:
            return{
                ...state,
                lodding:false,
                isDeleteUser:false,
                isPermission:false,
                error:null,
                isRole:false
            }
        default :
           return state
    }
}