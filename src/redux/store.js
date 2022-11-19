import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
let persistor = persistStore(store);
export { store, persistor }
// 3 buoc de khai bao redux
// 1.Khai bao dispatch + action
// 2.Khai bao reducer + logic
// 3.Su dung state cua redux
// UI là React - store là redux hai bên nói chuyên thông qua disPatch
// trong store bao gồm reducer 
// useDispatch :
// useSelector : de lay gia tri trong store trong reducer >> cho trang thai cua thang redux cua react
// useSelector -> la 1 arrow function return state.counter.count
// tu bien state cua redux -> call reducer(co ten la counter -> viet tat la counter hay goi counterReducer) 
// -> state cua reducer (state cua no la count)
// store dung de nap rootReducer(node goc cua reducer)
// moi lan state cua redux thay doi -> react change theo 