// A useful way to extract the domain from a url.
console.log('heloooooooooooo world')

var list = document.getElementById('history');
var li = document.createElement('p');
var url = document.createTextNode('fuck you');
li.appendChild(url);
list.appendChild(li);

function get_hostname(url) {
  var a = document.createElement('a');
  a.href = url;
  set_domain(a.hostname);
  return a.hostname;
}

function set_domain(domain) {
  const spans = document.getElementsByClassName('domain');
  [].slice.call(spans).forEach((span) => {
    span.textContent = domain;
  });
}

function no_history(hostname) {
  var history_text = document.getElementById('history');
  while(history_text.firstChild)
    history_text.removeChild(history_text.firstChild);
  history_text.textContent = `No history for ${hostname}.`;
}

function getActiveTab() {
  console.log('gettingggggggggggggg active tab')
  return browser.tabs.query({active: true, currentWindow: true});
}

function gotVisits(historyItem) {
  function gotVisitsInner (visitItems) {
    console.log("Visit count: " + visitItems.length);

    for (const visitItem of visitItems) {
          let d = new Date(visitItem.visitTime);
          let li = document.createElement('p');
          let someText = document.createTextNode(historyItem.title + ' ' + d.toUTCString());

          li.appendChild(someText);
          list.appendChild(li);

    }
  }

  return gotVisitsInner;
}

function doMagic (tabs) {
    var hostname = get_hostname(tabs[0].url);
  
    // Search for all history entries for the current windows domain.
    // Because this could be a lot of entries, lets limit it to 5.
    var searchingHistory = browser.history.search({text: '', maxResults: 5});
    console.log('doinnnnng magic')
    searchingHistory.then((historyItems) => {
      // What to show if there are no results.
      if (historyItems.length < 1) {
        no_history(hostname);
      } else {
        console.log("URL " + historyItems[0].url);
        var gettingVisits = browser.history.getVisits({
          url: historyItems[0].url,

        });
        ourNewGotVisits = gotVisits(historyItems[0])
        gettingVisits.then(ourNewGotVisits);
      }
    });
  
}

// When the page is loaded find the current tab and then use that to query
// the history.
getActiveTab().then(doMagic);

function clearAll(e) {
  getActiveTab().then((tabs) => {
    var hostname = get_hostname(tabs[0].url);
    if (!hostname) {
      // Don't try and delete history when there's no hostname.
      return;
    }

    // Search will return us a list of histories for this domain.
    // Loop through them and delete them one by one.
    var searchingHistory = browser.history.search({text: hostname})
    searchingHistory.then((results) => {
        for (let k in results) {
          browser.history.deleteUrl({url: results[k].url});
        }
        // Clear out the UI.
        no_history(hostname);
      }
    );
  });
  e.preventDefault();
}
document.getElementById('clear').addEventListener('click', clearAll);
