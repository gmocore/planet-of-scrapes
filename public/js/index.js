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

$('.comment').click(e => {
    e.preventDefault();


    $.ajax({
        url: `/articles/${e.target.id}`,
        method: 'GET',

    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
});

$('.save').click(e => {
    e.preventDefault();


    $.ajax({
        url: `/articles/${e.target.id}`,
        method: 'POST',
        data: {
            title: $('.article-message-title').val().trim(),
            body: $('.article-message-body').val().trim()
        }

    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
});