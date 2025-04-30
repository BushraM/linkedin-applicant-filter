document.getElementById('apply').addEventListener('click', async () => {
    const value = parseInt(document.getElementById('maxApplicants').value);
    if (isNaN(value)) return;
    chrome.storage.local.set({ maxApplicants: value });
    chrome.tabs.reload();
});