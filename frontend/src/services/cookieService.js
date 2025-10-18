class CookieService {
  setCookie(name, value, days = 7) {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  }

  getCookie(name) {
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
  }

  setUserSession(token, user) {
    this.setCookie('saferide_token', token, 7)
    this.setCookie('saferide_user', JSON.stringify(user), 7)
  }

  getUserSession() {
    const token = this.getCookie('saferide_token')
    const userStr = this.getCookie('saferide_user')
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        return { token, user }
      } catch (e) {
        return null
      }
    }
    return null
  }

  clearUserSession() {
    this.deleteCookie('saferide_token')
    this.deleteCookie('saferide_user')
  }
}

export const cookieService = new CookieService()