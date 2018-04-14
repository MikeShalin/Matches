import {createActions} from 'redux-actions';

export const {
    requestMatches : requestMatches,
    failureMatches : failureMatches,
    successMatches : successMatches,
} = createActions({

    REQUEST_MATCHES : undefined,

    FAILURE_MATCHES : undefined,

    SUCCESS_MATCHES : matches => matches,

});
