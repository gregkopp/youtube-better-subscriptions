const currentVersion = "0.20.0";

const LAST_SHOWN_CHANGELOG_KEY = "changelog.lastShown";

chrome.runtime.onMessage.addListener(function (message) {
    switch (message.action) {
        case "openOptionsPage":
            chrome.runtime.openOptionsPage();
            break;
        default:
            break;
    }
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ LAST_SHOWN_CHANGELOG_KEY }, showChangelog);
});

function showChangelog(data) {
    let lastShownChangelog = data.LAST_SHOWN_CHANGELOG_KEY;
    if (currentVersion !== lastShownChangelog) {
        chrome.tabs.create({
            url: "pages/changelog.html",
        });
        chrome.storage.sync.set({ LAST_SHOWN_CHANGELOG_KEY: currentVersion });
    }
}
