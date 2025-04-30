# LinkedIn Applicant Filter Chrome Extension

A Chrome extension that helps you filter LinkedIn job listings based on the number of applicants. This tool helps you find job opportunities with fewer applicants, potentially increasing your chances of getting noticed by recruiters.

## Features

- Filter job listings based on maximum number of applicants
- Automatically updates as you browse LinkedIn jobs
- Shows jobs marked as "early applicant" opportunities
- Works with LinkedIn's dynamic job listing updates

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Go to LinkedIn Jobs page
2. Click the extension icon in your Chrome toolbar
3. Enter the maximum number of applicants you want to see
4. The job listings will automatically filter to show only jobs with fewer applicants than your specified number

## How it Works

The extension:
- Monitors LinkedIn job listings in real-time
- Filters out jobs with more applicants than your specified limit
- Shows jobs marked as "early applicant" opportunities
- Preserves jobs that don't display applicant counts

## Development

The extension consists of:
- `manifest.json`: Extension configuration
- `popup.html`: User interface for setting the applicant limit
- `popup.js`: Handles user input and storage
- `content.js`: Filters job listings on LinkedIn

## Contributing

Feel free to submit issues and enhancement requests! 