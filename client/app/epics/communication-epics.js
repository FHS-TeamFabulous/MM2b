import * as actions from 'app/actions/communication-actions';
import Communication  from '../services/communication';

export const loginEpic = (action$, state) => action$
    .filter(action => action.type === actions.types.LOGIN)
    .map(action => action.payload)
    .map(({name}) => {
        Communication.login(name);
        return name;
    })
    .map(actions.createLoginSent);

export const logoutEpic = (action$, state) => action$
    .filter(action => action.type === actions.types.LOGOUT)
    .map(action => action.payload)
    .map(name => Communication.logout(name))
    .mapTo(actions.createLogoutSent());

export const connectEpic = (action$, state) => action$
    .filter(action => action.type === actions.types.CONNECT)
    .map(action => action.payload)
    .switchMap(({name}) => {
            return Communication.joinRoom(name)
                .then(() => {
                    return actions.createConnected();
                })
        }
    );

export const connectOnInvitation = (actions$, state) => actions$
    .filter(action => action.type === actions.types.INVITATION_ACCEPTED)
    .map(action => action.payload)
    .switchMap(({name}) => {
            return Communication.joinRoom(name)
                .then(() => actions.createConnection())
        }
    );

export const interactEpic = (action$, state) => action$
    .filter(action => action.type === actions.types.INTERACTION)
    .map(action => action.payload)
    .map(data => {
        Communication.interact(data);
        return data;
    })
    .map(actions.createInteractionSent);
