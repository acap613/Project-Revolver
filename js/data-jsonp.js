function showData(data) {
    console.log(data);
    var newContent = '';


    for (var i = 0; i < data.result.length; i++) {
        newContent += '<div class="data">';
        newContent += data[0].result.assets.prices.USD;
        newContent += '</div>';
    };

    document.getElementById('data').innerHTML = newContent;
};


