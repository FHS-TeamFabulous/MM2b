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
    .map(actions.loginSent);

export const logoutEpic = (action$, state) => action$
    .filter(action => action.type === actions.types.LOGOUT)
    .map(action => action.payload)
    .map(name => Communication.logout(name))
    .mapTo(actions.logoutSent());

export const inviteEpic = (actions$, state) => actions$
    .filter(action => action.type === actions.types.INVITE)
    .map(action => action.payload)
    .map(({name, bookId}) => {
        Communication.invite(name, bookId);
        return actions.inviteSent();
    });

export const acceptInvitationEpic = (actions$, state) => actions$
    .filter(action => action.type === actions.types.INVITATION_ACCEPTED)
    .map(action => action.payload)
    .switchMap(({name, bookId}) => Communication.joinRoom(name, bookId)
        .then(() => actions.connected(name)));

export const declineInvitationEpic = (actions$, state) => actions$
    .filter(action => action.type === actions.types.INVITATION_DECLINED)
    .map(action => action.payload)
    .map(({name, bookId}) => {
        Communication.declineInvite(name, bookId);
        return actions.invitationDeclinedSent();
    });

export const sendAcceptInvitationEpic = (actions$, state) => actions$
    .filter(action => action.type === actions.types.ACCEPT_INVITATION)
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
    .map(actions.interactionSent);
