import * as Redux from 'redux';
import * as SagaEffects from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

function* monsterSaga() {
    yield SagaEffects.takeLatest('ACTION_MONSTER_NAME', function*(action) {

        let val = action.value.toLowerCase().normalize();
        const resp = yield SagaEffects.call(
            () => fetch(`https://swarfarm.com/api/v2/monsters/?name=${val}&obtainable=true`)
        );
        const data = yield SagaEffects.call(
            () => resp.json()
        );
        yield SagaEffects.put({type: 'MONSTER_DATA_FETCHED', data: data['results']})
    });
}

const monsterReducer = (state = {
    fetchedMons: null,
}, action) => {
    if (action.type === 'ACTION_MONSTER_NAME') {
        return {
            ...state,
            monsterName: action.value,
        }
    }
    else if (action.type === `MONSTER_DATA_FETCHED`) {
        return {
            ...state,
            fetchedMons: action.data,
        }
    }
    return state;
}

const sagaMiddleware = createSagaMiddleware();

const store = Redux.createStore(Redux.combineReducers({
    monster: monsterReducer,
}), Redux.applyMiddleware(sagaMiddleware));

sagaMiddleware.run(monsterSaga);

export default store;
