$(function(){
  let heroImg = $('.hero-img');
  let slideBtn = $('.slide-btn');
  changeHaroFirst();

  var timer;
  var heroIndex = 0;
  
  autoImgStart();
  
  slideBtn.on('click', function(){
    autoImgStop();
    changeHeroTarget($(this).index());
    autoImgStart();
  })
  $('#pre-img').on('click', function(){
    autoImgStop();
    changeHeroPre();
    autoImgStart();
  })
  $('#next-img').on('click', function(){
    autoImgStop();
    changeHeroNext();
    autoImgStart();
  })



  function autoImgStart(){
    timer = setInterval(function(){
      changeHeroNext();
    }, 5000)
  }

  function autoImgStop(){
    clearInterval(timer);
  }


  function changeHeroTarget(targetIndex){
    let lastIndex = heroIndex;
    let newIndex = targetIndexGet(targetIndex, heroImg.length);
    reflashHeroStatus(lastIndex, newIndex);
    heroIndex = newIndex;
  }

  function changeHeroNext(){
    changeHeroTarget(heroIndex + 1);
  }

  function changeHeroPre(){
    changeHeroTarget(heroIndex - 1);
  }

  function changeHaroFirst(){
    changeHeroTarget(0);
  }

  function changeHaroEnd(){
    changeHeroTarget(heroImg.length - 1);
  }


  function reflashHeroStatus(lastIndex, newIndex){
    heroImg.eq(lastIndex).css('opacity', '0');
    slideBtn.eq(lastIndex).css({
      'background': 'rgba(0,0,0,.4)',// 置背景色为灰
      'border-color': 'hsla(0,0%,100%,.3)'// 微调border
    })


    heroImg.eq(newIndex).css('opacity', '1');
    slideBtn.eq(newIndex).css({
      'background': 'hsla(0,0%,100%,.4)',// 置背景色为白,
      'border-color': 'rgba(0,0,0,.4)'
    })

    heroIndex = newIndex;
  }

  // 通用方法, 适用于数组的轮播
  // targetIndexGet方法
  // 如果 targetIndex > elementLength - 1
  //   index = 1;
  // 如果 targetIndex < 0;
  //   index = elementLength - 1
  // 否则 index = targetIndex
  function targetIndexGet(targetIndex, elementLength){
    if(targetIndex > elementLength - 1){
      return 0;
    }

    if(targetIndex < 0){
      return elementLength - 1;
    }
    return targetIndex;
  }

  function getNextIndex(nowIndex, elementLength){
    return targetIndexGet(nowIndex + 1, elementLength);
  }

  function getLastIndex(nowIndex, elementLength){
    return targetIndexGet(nowIndex - 1, elementLength);
  }

})