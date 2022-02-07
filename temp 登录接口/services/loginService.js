import request from "./request"
import isBrowser from "../util/isBrowser"

const auth = "authorization";

/**  
 * Assist func: 设置 删除 获得 localStorage中的token
 */
function setItem(key, value) {
    if (isBrowser()) {
        localStorage.setItem(key, value)
    }
}

function removeItem(key) {
    if (isBrowser()) {
        localStorage.removeItem(key);
    }
}

function getItem(key) {
    if (isBrowser()) {
        return localStorage.getItem(key);
    }
}


/**
 * Main func: login
 * @param {*} loginId 
 * @param {*} loginPwd 
 * @returns 
 */
export async function login(loginId, loginPwd) {
    const resp = await request.post("/api/user/login", {
        loginId, loginPwd
    })
    if (resp.data.code === 0) {
        // 登录成功
        const token = resp.headers[auth];
        setItem("token", token)
    } else {
        // 登录失败，清除上一次成功的登录信息
        removeItem("token")
    }
    return resp.data;
};

//  whoAmI 
export async function whoAmI() {
    const token = getItem("token")
    if (!token) {
        return {
            code: 0,
            message: "",
            data: null
        }
    }
    const resp = await request.get("/api/user/whoami", {
        headers: {
            [auth]: token
        }
    })
    if (!resp.data.data) {
        removeItem("token")
    }
    return resp.data;
}

export function loginOut() {
    removeItem("token")
}