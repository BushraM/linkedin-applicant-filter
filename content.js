// content.js
function filterApplicants(maxApplicants) {
  if (!maxApplicants) return;
  console.log('Filtering with max applicants:', maxApplicants);

  // Updated selectors to match current LinkedIn HTML structure
  const jobCards = document.querySelectorAll('li.jobs-search-results__list-item, div.job-card-container, div[data-job-id], div.job-card-list__entity, .jobs-search-results__list-item, .job-card-container, .job-card-list__entity, .job-card-job-posting-card-wrapper');
  console.log('Found job cards:', jobCards.length);

  jobCards.forEach(card => {
    // Log the entire card HTML for debugging
    console.log('Card HTML:', card.outerHTML);
    
    const text = card.innerText.toLowerCase();
    console.log('Card text:', text);
    
    // Look for applicant count in different formats
    // Updated regex to match more variations of applicant count text
    const match = text.match(/(\d+)\s*(?:applicants?|people applied|applications?|people have applied|people clicked apply)/i);
    
    if (match) {
      const applicantCount = parseInt(match[1]);
      console.log('Found applicant count:', applicantCount);
      
      if (applicantCount > maxApplicants) {
        card.style.display = 'none';
        console.log('Hiding card with', applicantCount, 'applicants');
      } else {
        card.style.display = '';
        console.log('Showing card with', applicantCount, 'applicants');
      }
    } else {
      // If no applicant count found, check for "Be an early applicant" text
      const isEarlyApplicant = text.includes('be an early applicant');
      if (isEarlyApplicant) {
        console.log('Found early applicant indicator');
        card.style.display = '';
      } else {
        console.log('No applicant count found in card');
        // Show cards without applicant count by default
        card.style.display = '';
      }
    }
  });
}

// Function to keep trying to find and filter job cards
function keepTryingToFilter() {
  chrome.storage.local.get(['maxApplicants'], (result) => {
    if (result.maxApplicants) {
      filterApplicants(result.maxApplicants);
    }
  });
}

// Initial run
chrome.storage.local.get(['maxApplicants'], (result) => {
  console.log('Storage result:', result);
  filterApplicants(result.maxApplicants);
});

// Set up continuous checking
setInterval(keepTryingToFilter, 1000);

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('Storage changed:', changes);
  if (namespace === 'local' && changes.maxApplicants) {
    filterApplicants(changes.maxApplicants.newValue);
  }
});