console.log('connected');

$('#scrape').click(e => {
    e.preventDefault();
    console.log(e)

    $.ajax({
        url: '/scrape',
        method: 'POST',

    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
});