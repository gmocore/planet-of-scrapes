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
            comment: $(`#input-${e.target.id}`).val().trim()
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
});

$('.view-comment').click(e => {
 
    $.get(`/saved/${e.target.id}`, data => {
        console.log(data.note.comment)
        $('#modal').modal({
            show: true
        });
        $('#modal-text').text(data.note.comment)
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
