import {configureStore, type Middleware} from '@reduxjs/toolkit'
import cartReducer from './CartSlice'

const CART_LOCALSTORAGE_KEY = "cart"


const setLocalStorageMiddleware : Middleware = () => (next) => (action) => {
    const result = next(action)
    localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(store.getState()));
    return result
}

const retrieveLocalStorageMiddleware = () =>{
    if(localStorage.getItem(CART_LOCALSTORAGE_KEY) !== null){
        return JSON.parse(localStorage.getItem(CART_LOCALSTORAGE_KEY)!)
    }
}

const store = configureStore({
    reducer: cartReducer,
    preloadedState : retrieveLocalStorageMiddleware(),
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(setLocalStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store