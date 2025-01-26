$(function () {
  //enable clicking anywhere on details
  $("details").click(function () {
    $(this).find("summary").click();
  });

  //block propagation so it doesn't trigger details click
  $("details summary,details a").click(function (e) {
    e.stopPropagation();
  });

  //close the other details when opening one
  $("summary").click(function () {
    $("details").not($(this).parent()).removeAttr("open");
  });
});
