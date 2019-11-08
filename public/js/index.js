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
        location.reload();

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
        $(`#input-${e.target.id}`).val('')
    })
    .catch(err => {
        console.log(err);
    })
});

$('.view-comment').click(e => {
 
    $.get(`/saved/${e.target.id}`, data => {
        $('#modal').modal({
            show: true
        });
         if (data.note) {
             $('#modal-text').text(data.note.comment)
         } else {
            $('#modal-text').text('No comments yet')
             
         }
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

$('#clear').click(e => {
    $.post('/clear', articles => {
        console.log(articles)
        location.reload();
    })
})
