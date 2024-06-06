import{ legacy_createStore as createStore, combineReducers,applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';
import {RegisterReducer } from '../src/reducers/UserReducers';
import { CategoryReducer, CategorySinglesReducer} from '../src/reducers/CategoryReducers';
import { SingleVideoReducers, groupsReducers, postersReducer, userVideoFileReducer, videoReducer } from './reducers/VideoReducer';
import { orderVideoShowReducer, userPaymentVideoShowReducer } from './reducers/PaymentVideosReducer';

const reducer = combineReducers({
videoStore:videoReducer,
registerStore:RegisterReducer,
groupsFileStore:groupsReducers,
userVideoFileStore:userVideoFileReducer,
singleVideoStore:SingleVideoReducers,
orderVideoShowStore:orderVideoShowReducer,

// //poster section
posterStore:postersReducer,

// ///category section
categoryStore:CategoryReducer,
singleCategoryStore:CategorySinglesReducer,

// ///payment video show
mePaymentVideoShowStore : userPaymentVideoShowReducer
});


const user = localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')):null;
const initialState={
 registerStore:{userInfo:user}
}
const middleware = [thunk];
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;