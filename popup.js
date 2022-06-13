(async() => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    if (!tab) return;
    const {url} = tab;
    if (!url) return;
    if (url != "https://huggingface.co/spaces/dalle-mini/dalle-mini") return;
    const div = document.querySelector(".hidden");
    div.classList.remove("hidden");
    const button = document.querySelector("button");
    button.addEventListener("click", () => {
        // chrome.tabs.executeScript(tab.id, {file: "autoreask.js"});
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ["autoreask.js"]
        }, () => {
            console.log("autoreask.js executed");
            button.classList.add("hidden");
        })
    })
})()
