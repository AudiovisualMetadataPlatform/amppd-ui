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
    post(formData = false) {
        return {
            method: 'POST',
            ...headers(formData)
        };
    },
    postToken(editorInput) {
        return {
            method: 'POST',
            ...tokenHeaders(editorInput)
        };
    },
    patch() {
        return {
            method: 'PATCH',
            ...headers()
        };
    },
    // put(body) {
    //     return {
    //         method: 'PUT',
    //         ...headers(),
    //         body: JSON.stringify(body)
    //     };
    // },
    delete() {
        return {
            method: 'DELETE',
            ...headers()
        };
    }
}

function headers(formData = false) {
    const currentUser = accountService.currentUserValue || {};
    const authHeader = currentUser && currentUser.token ? { 'Authorization': 'Bearer ' + currentUser.token  } : {};
    const ctHeader = formData ? 'multipart/form-data' : 'application/json';
    return {
        headers: {
            ...authHeader,
            'Content-Type': ctHeader    // not necessary, but keep it for now
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
                'Content-Type': 'application/json'    // not necessary, but keep it for now
            }
        };
    }
    return headers();
}