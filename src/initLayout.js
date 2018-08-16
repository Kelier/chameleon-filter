$(function() {

  // 设置出场动画
  var logo = anime({
    targets: '.logo-here',
    opacity: .5,
    duration: 3000,
    rotate: '1turn',
    backgroundColor: '#000',
    easing: 'easeInOutQuad',
    loop: true
  });

  var filtersdown = anime({
    targets: '.filters',
    translateY: 150,
    backgroundColor: '#190a0a',
    borderRadius: ['0em', '10px'],
    easing: 'easeInOutQuad'
  });

  $('.nav-area').delegate('img', 'click', function() {
    if ($(this).attr('class') === 'filter') {
      var filters = anime({
        targets: '.filters',
        translateY: 0,
        backgroundColor: '#190a0a',
        borderRadius: ['10px', '0em'],
        easing: 'easeInOutQuad'
      });
    } else if ($(this).attr('class') === 'upload') {
      $('.upload-this').click();

    } else if ($(this).attr('class') === 'save') {
      var canvas = document.createElement("canvas");
      canvas.width = $(".image-area")[0].width;
      canvas.height = $(".image-area")[0].height;
      var ctx = canvas.getContext("2d");

      // 声明滤镜
      ctx.filter = chameleon.gilter;
      // 绘制
      ctx.drawImage($(".image-area")[0], 0, 0, canvas.width, canvas.height);

      // document.body.appendChild(canvas)

      // 转移buffer
      var base64Img = canvas.toDataURL();
      var oA = document.createElement('a');

      // 设置下载参数
      oA.href = base64Img;
      oA.download = 'save.png';
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      oA.dispatchEvent(event);
    }
  });

  function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  $('.upload-this').on('change', function(e) {

    var file = $(this).get(0).files[0];
    var url = getObjectURL(file);
    $('.image-area').attr('src', url);

  });

  $('.filters').delegate('img', 'click', function() {
    $('img').each(function(i, v) {
      $(this).removeClass('scene-cover');
    })
    $(this).addClass('scene-cover');
    $('.image-area').addClass('scene-cover');
  })

  $(document).on('click', function(e) {
    var target = $(e.target);
    if (target.closest(".filter-area").length === 0 && target.attr('class') !== 'filter') {
      anime({
        targets: '.filters',
        translateY: 150,
        backgroundColor: '#190a0a',
        borderRadius: ['0em', '10px'],
        easing: 'easeInOutQuad'
      });
    }
  })

});
