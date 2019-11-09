// scrape articles when button is clicked
$("#scrape").click(e => {
  e.preventDefault();
  $.ajax({
    url: "/scrape",
    method: "GET"
  })
    .then(data => {
      console.log(data);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});

// add a comment when button is clicked
$(".comment").click(e => {
  e.preventDefault();

  $.ajax({
    url: `/saved/${e.target.id}`,
    method: "POST",
    data: {
      comment: $(`#input-${e.target.id}`)
        .val()
        .trim()
    }
  })
    .then(data => {
      console.log(data);
      $(`#input-${e.target.id}`).val("");
    })
    .catch(err => {
      console.log(err);
    });
});

// view comment when button is clicked
$(".view-comment").click(e => {
  $.get(`/saved/${e.target.id}`, data => {
    console.log(data);
    if (data.notes) {
      // clear notes before displaying new ones
      $(".modal-body").empty();

      // loop though all notes to display
      data.notes.forEach(item => {
        // display comments in modal
        $(".modal-body").prepend(`<div class="comment-container">
        <p>${item.comment}</p> 
        <button class="btn btn-danger delete-comment" id="${item._id}">Delete</button>
        <div>`);
      });
      deleteListener();
    } else {
      // if no comments are present, display default text
      $("#modal-text").text("No comments yet");
    }
  }).then(() => {
    // display modal
    $("#modal").modal({
      show: true
    });
  });
});

// delete article when button is clicked
$(".delete").click(e => {
  e.preventDefault();

  $.ajax({
    url: `/articles/${e.target.id}`,
    method: "DELETE"
  })
    .then(data => {
      console.log(data);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});

//save article when button is clicked
$(".save-article").click(e => {
  e.preventDefault();

  $.ajax({
    url: `/articles/${e.target.id}`,
    method: "POST"
  })
    .then(data => {
      console.log(data);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});

// clear all articles when button is clicked
$("#clear").click(e => {
  $.post("/clear", articles => {
    location.reload();
  });
});

const deleteListener = () => {
  // delete article when button is clicked
  $(".delete-comment").click(e => {
    e.preventDefault();
    console.log(e.target.id);

    $.ajax({
      url: `/comments/${e.target.id}`,
      method: "DELETE"
    })
      .then(data => {
        console.log(data);
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  });
};
