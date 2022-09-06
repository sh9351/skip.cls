console.log('[e학습터 자동 스킵 v0.1] Init')
const wait = selector => new Promise(resolve => {
    if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector))
    }
    const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
            resolve(document.querySelector(selector))
            observer.disconnect()
        }
    })
    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
})
const standby = () => wait('.jconfirm-buttons').then(() => {
    console.log('[e학습터 자동 스킵 v0.1] Detected')
    document.querySelector('.jconfirm-buttons > .btn').click()
    setTimeout(() => {
        document.querySelector('.mejs__overlay-button').click()
        console.log('[e학습터 자동 스킵 v0.1] Pressed')
        standby()
        setTimeout(() => {
            if (document.querySelector('button[aria-label="영상 재생"]')) {
                document.querySelector('.mejs__overlay-button').click()
            }
        }, 2000)
    }, 2000)
})
standby()