const script = document.createElement("script");
script.innerHTML = `(() => {
console.log("hi!");
    const alertScriptLocation = Math.random().toString(36).substring(2, 12);
    window[alertScriptLocation] = alert;
    window.alert = () => {return undefined;};
    const originalFetchLocation = Math.random().toString(36).substring(2, 15);
    window[originalFetchLocation] = fetch;
    console.log("window",window);
    console.log("originalfetch", originalFetchLocation,"originalalert", alertScriptLocation);
    window.fetch = async (...args) => {
    console.log("fetching!!")
        console.log("fetch", args);
        const [resource, config] = args;
        if (!resource.startsWith("https://bf.dallemini.ai") && !resource.startsWith("https://backend.craiyon.com")) return window[originalFetchLocation](resource,config);
        try {const resp = await window[originalFetchLocation](resource, config);
        if (resp.status == 200) {
            console.log("Status 200!");
            return resp;
        } else {
            setTimeout(()=>{document.getElementsByTagName("button")[0].click();},200);
            console.log("Status were", resp.status,": retrying...");
            return resp;
        }
        } catch (e) {
            console.log("Error", e);
            setTimeout(()=>{document.getElementsByTagName("button")[0].click();},200);
            return false;
        }
    }
})()
`;
let i = setInterval(() => {
    if (document.head) {
        clearInterval(i);
        document.head.appendChild(script);
    }
});
