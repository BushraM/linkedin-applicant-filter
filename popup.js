document.addEventListener('DOMContentLoaded', function() {
  const maxApplicantsInput = document.getElementById('maxApplicants');
  const saveButton = document.getElementById('saveButton');
  const statusDiv = document.getElementById('status');

  // Load saved value
  chrome.storage.local.get(['maxApplicants'], function(result) {
    if (result.maxApplicants) {
      maxApplicantsInput.value = result.maxApplicants;
    }
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = 'status ' + type;
    statusDiv.style.display = 'block';
    
    // Hide status after 3 seconds
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  }

  saveButton.addEventListener('click', function() {
    const maxApplicants = parseInt(maxApplicantsInput.value);
    
    if (isNaN(maxApplicants) || maxApplicants < 0) {
      showStatus('Please enter a valid number', 'error');
      return;
    }

    chrome.storage.local.set({ maxApplicants: maxApplicants }, function() {
      showStatus('Filter applied successfully!', 'success');
      
      // Notify content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { maxApplicants: maxApplicants });
      });
    });
  });

  // Handle Enter key
  maxApplicantsInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      saveButton.click();
    }
  });
});