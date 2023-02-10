import {
    AnyAction,
    configureStore,
    Store,
    ThunkDispatch,
} from '@reduxjs/toolkit'
import postsReducer from './reducers/postsReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
    dispatch: AppThunkDispatch
}

export default store
