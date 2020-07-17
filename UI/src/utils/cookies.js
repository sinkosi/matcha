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

export {setCookie, setCookieRememberMe, deleteCookie, getCookie}
// function checkCookie() {
//     var user = getCookie("username");
//     if (user != "") {
//         alert("Welcome again " + user);
//     } else {
//         user = prompt("Please enter your name:", "");
//         if (user != "" && user != null) {
//         setCookie("username", user, 365);
//         }
//     }
// }