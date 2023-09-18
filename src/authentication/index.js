function getToken() {
    return localStorage.getItem('mm_user');
}
function isLoggedIn() {
    const ses = localStorage.getItem('mm_user');
    if (!!ses && ses !== '') {
        return true;
    } else {
        return false;
    }
}
function getUserDetails() {
    return JSON.parse(localStorage.getItem('_users'));
}
function adminAllowedOnly() {
    return ['admin'].includes(getUserDetails().userType);
}
function validateLogin(data) {
    if (data && data.token && data.user && typeof data.user === 'object') {
        localStorage.setItem('mm_user', data.token);
        localStorage.setItem('_users', JSON.stringify(data.user));
    }
    return data;
}
function logout() {
    localStorage.removeItem('mm_user');
    localStorage.removeItem('_users');
}

export { getToken, getUserDetails, logout, isLoggedIn, validateLogin,adminAllowedOnly }