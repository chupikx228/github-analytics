export async function waitForImages(element) {
    const imgs = [...element.querySelectorAll('img')]
    const promises = imgs.map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve) => {
            img.onload = resolve
            img.onerror = resolve
        })
    })
    await Promise.all(promises)
}
