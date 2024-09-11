document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,currencies,flag';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            const fromCurrencySelect = document.getElementById('fromCurrency');
            const toCurrencySelect = document.getElementById('toCurrency');

            data.forEach(country => {
                const currencyCodes = Object.keys(country.currencies);
                currencyCodes.forEach(code => {
                    const option = document.createElement('option');
                    option.value = code;
                    option.text = `${country.name.common} (${code})`;
                    fromCurrencySelect.add(option.cloneNode(true));
                    toCurrencySelect.add(option.cloneNode(true));
                });
            });
        })
        .catch(error => {
            document.getElementById('errorMessage').textContent = 'Error fetching country data.';
            console.error('Error:', error);
        });

    document.getElementById('convertButton').addEventListener('click', function () {
        const amount = document.getElementById('amount').value;
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        const apiKey = '09d0d3de07c016cb0fb1c04f'; 
        const conversionUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

        if (!amount || isNaN(amount) || amount <= 0) {
            document.getElementById('errorMessage').textContent = 'Please enter a valid amount.';
            //return;
        }

        fetch(conversionUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.result === "success") {
                    document.getElementById('convertedAmount').textContent = `Converted Amount: ${data.conversion_result} ${toCurrency}`;
                    document.getElementById('errorMessage').textContent = '';
                } 
            })
            .catch(error => {
                document.getElementById('errorMessage').textContent = 'Error fetching conversion data.';
                console.error('Error:', error);
            });
    });
});