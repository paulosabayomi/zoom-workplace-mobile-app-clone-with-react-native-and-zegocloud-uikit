export const getRandomId = (length = 5) => {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890"
    let rand_id = ""
    for (let i = 0; i < length; i++) {
        rand_id += chars[Math.floor(Math.random() * chars.length)]
    }
    return rand_id
}

export const getCallId = (length = 8) => {
    const chars = "1234567890"
    let call_id = ""
    for (let i = 0; i < length; i++) {
        call_id += chars[Math.floor(Math.random() * chars.length)]
    }
    return parseInt(call_id)
}