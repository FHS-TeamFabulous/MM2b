module.exports = [
    'LOGIN',
    'LOGIN_SUCCESS',
    'CLIENTS_UPDATE',
    'INVITATION_SEND',
    'INVITATION_RECEIVED',
    'INVITATION_CANCEL',
    'INVITATION_CANCELED',
    'INVITATION_ACCEPT',
    'INVITATION_ACCEPTED',
    'INVITATION_DECLINE',
    'INVITATION_DECLINED',
    'READER_LEAVE',
    'READER_LEFT'
].reduce((acc, val) => {
    acc[val] = val;
    return acc;
}, {});
