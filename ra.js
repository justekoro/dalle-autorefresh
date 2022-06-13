(() => {
    const alertScriptLocation = Math.random().toString(36).substring(2, 12);
    window[alertScriptLocation] = alert;
    window.alert = undefined;
    const originalFetchLocation = Math.random().toString(36).substring(2, 15);
    window[originalFetchLocation] = fetch;
    console.log("window",window);
    console.log("originalfetch", originalFetchLocation,"originalalert", alertScriptLocation);
    window.fetch = async (...args) => {
        const [resource, config] = args;
        const resp = await window[originalFetchLocation](resource, config);
        if (resp.status == 200) {
            console.log("Status 200!");
            return resp;
        } else {
            document.getElementById("7").click();
            console.log("Status were", resp.status,": retrying...");
            return resp;
        }
    }
})()
