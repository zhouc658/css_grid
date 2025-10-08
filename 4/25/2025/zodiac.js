const apiUrl = 'https://us-central1-tf-natal.cloudfunctions.net/horoscopeapi_test';
const apiKey = 'mmEUtLATc8w_UNnHuR2';  // Your test API key from TwinFlame Horoscope API

document.getElementById('getHoroscope').addEventListener('click', function() {
    const sign = document.getElementById('sign').value;
    fetchHoroscope(sign);
});

async function fetchHoroscope(sign) {
    const date = 'today'; // You can modify this if you want to get 'tomorrow', 'this_week', etc.
    const url = `${apiUrl}?sign=${sign}&date=${date}&token=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.description) {
            document.getElementById('horoscopeResult').innerHTML = `
                <p><strong>Sign:</strong> ${sign.charAt(0).toUpperCase() + sign.slice(1)}</p>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Mood:</strong> ${data.mood}</p>
                <p><strong>Lucky Time:</strong> ${data.lucky_time}</p>
                <p><strong>Lucky Color:</strong> ${data.color}</p>
                <p><strong>Lucky Number:</strong> ${data.lucky_number}</p>
            `;
        } else {
            document.getElementById('horoscopeResult').innerHTML = `<p>Error: Horoscope data not available.</p>`;
        }
    } catch (error) {
        console.error('Error fetching horoscope:', error);
        document.getElementById('horoscopeResult').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
}
