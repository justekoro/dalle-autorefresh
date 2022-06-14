(async() => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    if (!tab) return;
    const {url} = tab;
    if (!url) return;
    if (url != "https://huggingface.co/spaces/dalle-mini/dalle-mini" && url != "https://hf.space/static/dalle-mini/dalle-mini/index.html") return;
    const div = document.querySelector(".hidden");
    div.classList.remove("hidden");
})()
