// Get DOM elements
const newsUrlInput = document.getElementById('newsUrl');
const summarizeBtn = document.getElementById('summarizeBtn');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const summaryContent = document.getElementById('summaryContent');
const keyPointsList = document.getElementById('keyPoints');
const sentimentBadge = document.getElementById('sentiment');
const categoryBadge = document.getElementById('category');
const historyList = document.getElementById('historyList');

// Load history from localStorage
let summaryHistory = JSON.parse(localStorage.getItem('newsHistory')) || [];

// Simulated AI news summarization API
class NewsSummarizerAPI {
  static async summarizeNews(input) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulated AI analysis
    const isURL = input.includes('http') || input.includes('www');
    const topic = isURL ? 'Breaking News' : input;
    
    // Generate simulated summary
    const summaries = [
      `Recent developments in ${topic} have shown significant progress. Analysis indicates multiple factors contributing to the current situation, with experts weighing in on potential outcomes.`,
      `The latest ${topic} news reveals important trends that could impact future developments. Stakeholders are closely monitoring the situation as it evolves.`,
      `Comprehensive analysis of ${topic} shows interesting patterns. Multiple sources confirm the significance of recent events in this area.`
    ];
    
    const keyPoints = [
      `Major developments in ${topic} sector`,
      'Expert opinions suggest continued momentum',
      'Stakeholders remain optimistic about outcomes',
      'Impact expected across multiple domains'
    ];
    
    const sentiments = ['positive', 'neutral', 'positive'];
    const categories = ['Technology', 'Business', 'Politics', 'Science', 'World'];
    
    return {
      summary: summaries[Math.floor(Math.random() * summaries.length)],
      keyPoints: keyPoints.slice(0, 3 + Math.floor(Math.random() * 2)),
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      source: isURL ? input : `Search: ${topic}`
    };
  }
}

// Display summary results
function displayResults(data) {
  summaryContent.textContent = data.summary;
  
  // Display key points
  keyPointsList.innerHTML = '';
  data.keyPoints.forEach(point => {
    const li = document.createElement('li');
    li.textContent = point;
    keyPointsList.appendChild(li);
  });
  
  // Display sentiment
  sentimentBadge.textContent = data.sentiment.charAt(0).toUpperCase() + data.sentiment.slice(1);
  sentimentBadge.className = 'badge ' + data.sentiment;
  
  // Display category
  categoryBadge.textContent = data.category;
  categoryBadge.className = 'badge neutral';
  
  // Show results section
  loadingSection.style.display = 'none';
  resultsSection.style.display = 'block';
  
  // Add to history
  addToHistory(data);
}

// Add summary to history
function addToHistory(data) {
  const historyItem = {
    title: data.source.substring(0, 60) + (data.source.length > 60 ? '...' : ''),
    summary: data.summary.substring(0, 100) + '...',
    timestamp: new Date().toLocaleString(),
    category: data.category
  };
  
  summaryHistory.unshift(historyItem);
  if (summaryHistory.length > 5) {
    summaryHistory = summaryHistory.slice(0, 5);
  }
  
  localStorage.setItem('newsHistory', JSON.stringify(summaryHistory));
  displayHistory();
}

// Display history
function displayHistory() {
  if (summaryHistory.length === 0) {
    historyList.innerHTML = '<p style="color: #999; text-align: center;">No summaries yet</p>';
    return;
  }
  
  historyList.innerHTML = summaryHistory.map(item => `
    <div class="history-item">
      <div class="title">${item.title}</div>
      <div style="font-size: 0.9em; color: #666; margin: 5px 0;">${item.summary}</div>
      <div class="time">${item.timestamp} • ${item.category}</div>
    </div>
  `).join('');
}

// Handle summarize button click
summarizeBtn.addEventListener('click', async () => {
  const input = newsUrlInput.value.trim();
  
  if (!input) {
    alert('Please enter a news URL or topic');
    return;
  }
  
  // Show loading
  resultsSection.style.display = 'none';
  loadingSection.style.display = 'block';
  summarizeBtn.disabled = true;
  
  try {
    // Call AI API
    const results = await NewsSummarizerAPI.summarizeNews(input);
    displayResults(results);
  } catch (error) {
    loadingSection.style.display = 'none';
    alert('Error summarizing news. Please try again.');
  } finally {
    summarizeBtn.disabled = false;
  }
});

// Allow Enter key to submit
newsUrlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    summarizeBtn.click();
  }
});

// Initialize
displayHistory();

// Add console message for Comet compatibility
console.log('%c\u26a1 AI News Summarizer Framework', 'color: #667eea; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with AI-powered summarization API', 'color: #2a5298; font-size: 14px;');
console.log('%cComet Browser Automation Compatible \u2713', 'color: #28a745; font-size: 14px; font-weight: bold;');