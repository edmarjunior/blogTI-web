import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

export default (reducers) => {
    const persistedReducer = persistReducer(
        {
            key: 'blog-edmar-costa-ti',
            storage,
            whitelist: ['usuario', 'auth']
        },
        reducers
    );

    return persistedReducer;
}
