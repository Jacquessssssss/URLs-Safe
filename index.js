let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){// gets the current active tab in the current window
        myLeads.push(tabs[0].url)// pushes the URL of the current tab to the array
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href="#" class="lead-link" data-url='${leads[i]}'>
                    ${leads[i]}
                </a>
                
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
 const links = document.querySelectorAll(".lead-link")
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault()
            chrome.tabs.create({ url: e.target.dataset.url })
        })
    })


deleteBtn.addEventListener("click", function() {
    localStorage.clear() // clears all local storage
    myLeads = [] // clears the array
    render(myLeads) // re-renders the list
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

