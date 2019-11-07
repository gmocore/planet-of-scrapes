console.log('connected');

$('#scrape').click(e => {
    e.preventDefault();
    console.log(e)

    $.ajax({
        url: '/scrape',
        method: 'GET',

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
        url: `/saved/${e.target.id}`,
        method: 'POST',
        data: {
            comment: $('.comment-input').val().trim()
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
});



$('.delete').click(e => {
    e.preventDefault();

    $.ajax({
        url: `/articles/${e.target.id}`,
        method: 'DELETE'

    })
    .then(data => {
        console.log(data);
        location.reload()
    })
    .catch(err => {
        console.log(err);
    })
});

$('.save-article').click(e => {
    e.preventDefault();

    $.ajax({
        url: `/articles/${e.target.id}`,
        method: 'POST'

    })
    .then(data => {
        console.log(data);
        location.reload()
    })
    .catch(err => {
        console.log(err);
    })
});
