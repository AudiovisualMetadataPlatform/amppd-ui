import {accountService} from '@/service/account-service';

export const requestOptions = {
    get() {
        return {
            ...headers()
        };
    },
    post() {
        return {
            method: 'POST',
            ...headers()
        };
    },
    patch(body) {
        return {
            method: 'PATCH',
            ...headers(),
            body: JSON.stringify(body)
        };
    },
    put(body) {
        return {
            method: 'PUT',
            ...headers(),
            body: JSON.stringify(body)
        };
    },
    delete() {
        return {
            method: 'DELETE',
            ...headers()
        };
    }
}

function headers() {
    const currentUser = accountService.currentUserValue || {};
    const authHeader = currentUser && currentUser.token ? { 'Authorization': 'Bearer ' + currentUser.token  } : {}
    return {
        headers: {
            ...authHeader,
            'Content-Type': 'application/json'
        }
    };
}