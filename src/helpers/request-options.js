import {accountService} from '@/service/account-service';

export const requestOptions = {
    get() {
        return {
            ...headers()
        };
    },
    getToken(editorInput) {
        return {
            ...tokenHeaders(editorInput)
        };
    },
    post() {
        return {
            method: 'POST',
            ...headers()
        };
    },
    postToken(editorInput) {
        return {
            method: 'POST',
            ...tokenHeaders(editorInput)
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
function tokenHeaders(editorInput) {
    const authString = localStorage.getItem(editorInput);
    console.log("Auth String: " + authString);
    if(authString && authString.length>0){
        const authHeader = authString && authString.length>0 ? { 'Authorization': 'AMPPD ' + authString  } : {}
        return {
            headers: {
                ...authHeader,
                'Content-Type': 'application/json'
            }
        };
    }
    return headers();
}