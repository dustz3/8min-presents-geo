// 簡報導航功能
let currentSlide = 1;
const totalSlides = 7;

// 初始化
document.addEventListener('DOMContentLoaded', function () {
  updateSlideCounter();
  setupKeyboardNavigation();
});

// 下一張投影片
function nextSlide() {
  if (currentSlide < totalSlides) {
    showSlide(currentSlide + 1);
  }
}

// 上一張投影片
function previousSlide() {
  if (currentSlide > 1) {
    showSlide(currentSlide - 1);
  }
}

// 顯示指定投影片
function showSlide(slideNumber) {
  // 隱藏所有投影片
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  // 顯示指定投影片
  const targetSlide = document.getElementById(`slide${slideNumber}`);
  if (targetSlide) {
    targetSlide.classList.add('active');
    currentSlide = slideNumber;
    updateSlideCounter();
  }
}

// 更新投影片計數器
function updateSlideCounter() {
  const currentSlideElement = document.getElementById('currentSlide');
  const totalSlidesElement = document.getElementById('totalSlides');

  if (currentSlideElement) {
    currentSlideElement.textContent = currentSlide;
  }

  if (totalSlidesElement) {
    totalSlidesElement.textContent = totalSlides;
  }
}

// 設置鍵盤導航
function setupKeyboardNavigation() {
  document.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        event.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        previousSlide();
        break;
      case 'Home':
        event.preventDefault();
        showSlide(1);
        break;
      case 'End':
        event.preventDefault();
        showSlide(totalSlides);
        break;
    }
  });
}

// 點擊投影片切換（可選功能）
document.addEventListener('click', function (event) {
  // 如果點擊的不是導航按鈕，則切換到下一張
  if (
    !event.target.closest('.navigation') &&
    !event.target.closest('.nav-btn')
  ) {
    // 可以取消註解下面這行來啟用點擊切換功能
    // nextSlide();
  }
});

// 添加觸控支援（移動設備）
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function (event) {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function (event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // 向左滑動，下一張
      nextSlide();
    } else {
      // 向右滑動，上一張
      previousSlide();
    }
  }
}

// 自動播放功能（可選）
let autoPlayInterval = null;

function startAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }

  autoPlayInterval = setInterval(() => {
    if (currentSlide < totalSlides) {
      nextSlide();
    } else {
      showSlide(1); // 回到第一張
    }
  }, 5000); // 每5秒切換一次
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

// 全螢幕功能
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// 添加全螢幕快捷鍵
document.addEventListener('keydown', function (event) {
  if (event.key === 'f' || event.key === 'F') {
    event.preventDefault();
    toggleFullscreen();
  }
});

// 簡報狀態指示器
function updateProgressIndicator() {
  const progress = (currentSlide / totalSlides) * 100;
  // 可以在這裡添加進度條的視覺化
  console.log(`簡報進度: ${progress}%`);
}

// 每次切換投影片時更新進度
const originalShowSlide = showSlide;
showSlide = function (slideNumber) {
  originalShowSlide(slideNumber);
  updateProgressIndicator();
};

// 添加投影片載入動畫
function addSlideTransitionEffects() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.style.transitionDelay = `${index * 0.1}s`;
  });
}

// 初始化時添加過渡效果
document.addEventListener('DOMContentLoaded', function () {
  addSlideTransitionEffects();
});

// 導出功能（如果需要）
window.presentationControls = {
  nextSlide,
  previousSlide,
  showSlide,
  startAutoPlay,
  stopAutoPlay,
  toggleFullscreen,
};
