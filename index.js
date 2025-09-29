let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// Load saved leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// RENDER FUNCTION
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href="#" class="lead-link" data-url="${leads[i]}">
                    ${leads[i]}
                </a>
                <button class="delete-single-btn" data-index="${i}">X</button>
            </li>
        `
    }
    ulEl.innerHTML = listItems  

    // Open link in a new tab
    const links = document.querySelectorAll(".lead-link")
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault()
            chrome.tabs.create({ url: e.target.dataset.url })
        })
    })

    // Delete one link (always remove, even if it's the current site)
    const deleteBtns = document.querySelectorAll(".delete-single-btn")
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index
            myLeads.splice(index, 1) // remove one
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })
    })
}

// SAVE INPUT BUTTON
inputBtn.addEventListener("click", function() {
    if (inputEl.value.trim() !== "") {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})

// SAVE TAB BUTTON
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

// DELETE ALL BUTTON
deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
