import * as actions from 'app/actions/communication-actions';
import Communication  from '../services/communication';
import { selectBook } from 'app/actions/books-actions';

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

export const inviteEpic = (actions$, state) => actions$
    .filter(action => action.type === actions.types.INVITE)
    .map(action => action.payload)
    .map(({name, bookId}) => {
        Communication.invite(name, bookId);
        return actions.createInviteSent();
    });

export const connectOnAcceptedInvitation = (actions$, state) => actions$
    .filter(action => action.type === actions.types.INVITATION_ACCEPTED)
    .map(action => action.payload)
    .switchMap(({name, bookId}) => Communication.joinRoom(name)
                .then(() => actions.createConnected(name))
    );

export const declineInvitationEpic = (actions$, state) => actions$
    .filter(action => action.type === actions.types.INVITATION_DECLINED)
    .map(action => action.payload)
    .map(({name, bookId}) => {
        Communication.declineInvite(name, bookId);
        return actions.createInvitationDeclinedSent();
    });

export const acceptInvitationEpic = (actions$, state) => actions$
    .filter(action => action.type === actions.types.INVITATION_ACCEPTED)
    .map(action => action.payload)
    .map(({name, bookId}) => {
        Communication.acceptInvite(name, bookId);
        return selectBook(bookId);
    });

export const interactEpic = (action$, state) => action$
    .filter(action => action.type === actions.types.INTERACTION)
    .map(action => action.payload)
    .map(data => {
        Communication.interact(data);
        return data;
    })
    .map(actions.createInteractionSent);
