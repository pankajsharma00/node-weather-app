const weatherForm = document.querySelector('form');
const inputData = document.querySelector('input');
const paraOne = document.querySelector('#para-one');
const paraTwo = document.querySelector('#para-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputData.value;
    const url = `/weather?address=${location}`;

    paraTwo.textContent = ''
    paraOne.textContent = "Loading ....."
    fetch(url).then((response) => {
        response.json().then((data) => {
                if (data.error) {
                paraOne.textContent = data.error
                return;
            }
            paraOne.textContent = data.location
            paraTwo.textContent = data.forecast
        })
    })
})
