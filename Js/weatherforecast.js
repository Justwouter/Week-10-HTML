async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

async function parseData(data) {
    let storage = {}
    const mintemp = data.daily.temperature_2m_min;
    const maxtemp = data.daily.temperature_2m_max;
    for (var i = 0; i < maxtemp.length; i++) {
        let weatheritem = {
            maxtemp: Number(maxtemp[i]),
            mintemp: Number(mintemp[i]),
            averagetemp: round((Number(maxtemp[i]) + Number(mintemp[i])) / 2, 0.5),
            timestamp: data.daily.time[i]

        };
        storage[i] = weatheritem

    }
    return storage;
}


async function displaydata() {
    data = await parseData(await getData('https://api.open-meteo.com/v1/forecast?latitude=52.08&longitude=4.3&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto'));
    //Code for a seperate testing table table
    // let tablebody = document.getElementById("tbody");
    // for (let id in data) {
    //     let item = data[id];

    //     let tr = document.createElement("tr")

    //     let datethread = document.createElement("td");
    //     datethread.textContent = item.timestamp
    //     tr.appendChild(datethread)

    //     let minthread = document.createElement("td");
    //     minthread.textContent = item.mintemp
    //     tr.appendChild(minthread);

    //     let maxthread = document.createElement("td");
    //     maxthread.textContent = item.maxtemp
    //     tr.appendChild(maxthread);

    //     let averagethread = document.createElement("td");
    //     averagethread.textContent = item.averagetemp
    //     tr.appendChild(averagethread);

    //     tablebody.prepend(tr)

    // }
    updateDaysAndIcons(data)
}

function round(number, interval) {
    //set interval at 0.whateveritnervalyouwant
    var modifier = 1.0 / interval;
    return Math.round(number * modifier) / modifier;
}

displaydata();

function updateDaysAndIcons(dataset) {
    let tablebody = document.getElementById("weeklyweather");
    for (let id in dataset) {
        let item = data[id];

        let tr = document.createElement("th")

        let daythread = document.createElement("td");
        daythread.textContent = getDayName(item.timestamp, "nl-NL")
        tr.appendChild(daythread)

        let iconthread = document.createElement("td");
        let iconelement = document.createElement("img")
        daythread.appendChild(iconelement)
        iconelement.src = selectIcon(item.averagetemp);
        tr.appendChild(daythread)

        tablebody.prepend(tr)

    }

}

function selectIcon(temperature){
    let source = "../images/weather-icons/"
    if(temperature <=0){
        source +="snowy-3.svg"
    }
    else if(temperature > 10){
        source +="clear-day.svg"
    }
    else{
        source +="cloudy-1-day.svg"
    }

    return source;
}

function getDayName(dateStr, locale) {
    locale || (locale = "en-US")
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

