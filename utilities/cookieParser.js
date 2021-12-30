function readCookie(cookie, key){
    var keyeq = key+"="
    if(cookie!=null){
        cookiearray=cookie.split(";")
        for (var i =0; i < cookiearray.length; i++){
            var cookieprop = cookiearray[i];
            while(cookieprop.charAt(0) == " " )  cookieprop = cookieprop.substring(1, cookieprop.length);
            if(cookieprop.indexOf(keyeq) == 0) return cookieprop.substring(keyeq.length, cookieprop.length);
        }
    }
    return null;
}

module.exports =readCookie;