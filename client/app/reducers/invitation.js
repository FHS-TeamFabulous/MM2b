import * as invitationActions from 'app/actions/invitation';
import * as readerActions from 'app/actions/reader';

const initialState = {
    sentPending: null,
    receivedPending: null,
    accepted: null
};

function invitationReducer(state = initialState, action) {
    switch (action.type) {
        case invitationActions.types.INVITATION_SEND:
            return Object.assign({}, state, {
                sentPending: {
                    receiver: action.reveiver,
                    bookId: action.bookId
                }
            });

        case invitationActions.types.INVITATION_RECEIVED:
            return Object.assign({}, state, {
                receivedPending: {
                    sender: action.sender,
                    bookId: action.bookId
                }
            });
        
        case invitationActions.types.INVITATION_CANCEL_SEND:
            return Object.assign({}, state, {
                sentPending: null
            });

        case invitationActions.types.INVITATION_CANCEL_RECEIVED:
            return Object.assign({}, state, {
                receivedPending: null
            });

        case invitationActions.types.INVITATION_ACCEPT_SEND:
            return Object.assign({}, state, {
                sentPending: null,
                receivedPending: null,
                accepted: {
                    opponent: action.receiver,
                    bookId: action.bookId
                }
            });

        case invitationActions.types.INVITATION_ACCEPT_RECEIVED:
            return Object.assign({}, state, {
                sentPending: null,
                receivedPending: null,
                accepted: {
                    opponent: action.sender,
                    bookId: action.bookId
                }
            });

        case invitationActions.types.INVITATION_DECLINE_SEND:
            return Object.assign({}, state, {
                receivedPending: null
            });

        case invitationActions.types.INVITATION_DECLINE_RECEIVED:
            return Object.assign({}, state, {
                sentPending: null
            });

        case readerActions.types.READER_LEAVE:
            return Object.assign({}, state, {
                accepted: null
            });

        case readerActions.types.READER_LEFT_RECEIVED:
            return Object.assign({}, state, {
                accepted: null
            });
    }

    return state;
}

export default invitationReducer;
