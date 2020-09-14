const setCookie = (cookieName, cookieValue) => {
    document.cookie = `${cookieName}=${cookieValue}; path=/`
}

const setCookieRememberMe = (cookieName, cookieValue, expiryDays) => {
    let d = new Date()

    d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000))
    let expires = `expires=${d.toUTCString()}`
    document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/`
}

const deleteCookie = (cookieName) => {
    let d = new Date()

    d.setTime(d.getTime() -1)
    let expires = `expires=${d.toUTCString()}`
    document.cookie = `${cookieName}="" ;${expires}; path=/`
}



const getCookie = (cookieName) => {
    cookieName += "="
    let cookies = document.cookie.split(';')
    let cookieValue
   
    cookies.forEach(cookie => {
        cookie = cookie.trim()
        if (cookie.indexOf(cookieName) >= 0)
            cookieValue = cookie.substring(cookieName.length)
    })

    return cookieValue
}

const cookieUserId = () => {
    let token = getCookie('token')


    if (token){
        let tokenPayload = token.split('.')[1] + '=='
        let userData = atob(tokenPayload)
        userData = JSON.parse(userData)
        return userData.id
    }
    return
}

const getCookieHeader = () => {
	let loginData = getCookie('loginData');
	console.log("_______________________________________________\nlogin data coockie: ", loginData)
	if (loginData) {
		loginData = JSON.parse(loginData);
		let header = {'headers' : {loggedInUserId: loginData.data.id}}
		return header;
    }
}

export {setCookie, setCookieRememberMe, deleteCookie, getCookie, cookieUserId, getCookieHeader}
