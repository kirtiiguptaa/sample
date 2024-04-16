class HorizontalScroll {
    constructor() {
      this.scrollContainer = document.querySelector('.js-scroll');
      this.target = (document.documentElement || document.body.parentNode || document.body);
  
      this.state = {
        moving: false,
        scrollDir: '',
        scrollPos: this.target.scrollLeft,
        scrollTop: 0,
        speed: 90,
        smooth: 12
      };
  
      this.rAF = null;
      
      this.scroll = this.scroll.bind(this);
      this.updateScrollPosition = this.updateScrollPosition.bind(this);
    }
  
    scroll(e) {
      e.preventDefault();
  
      // update scroll direction
      if (this.state.scrollPos > this.state.scrollTop) this.state.scrollDir = 'down';
      else this.state.scrollDir = 'up';
  
      this.state.scrollTop = this.state.scrollPos <= 0 ? 0 : this.state.scrollPos;
      
      console.log(this.target.scrollLeft);
  
      // smooth scroll
      let delta;
      if (e.detail) {
        if (e.wheelDelta) delta = e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1);
        else delta = -e.detail / 3;
      } else {
        delta = e.wheelDelta / 120;
      }
  
      this.state.scrollPos += -delta * this.state.speed;
      this.state.scrollPos = Math.max(
        0,
        Math.min(this.state.scrollPos, this.target.scrollWidth - this.target.clientWidth)
      );
      
      if (!this.state.moving) this.updateScrollPosition();
    }
  
    updateScrollPosition() {
      this.state.moving = true;
  
      const delta = (this.state.scrollPos - this.target.scrollLeft) / this.state.smooth;
      
      console.log(delta);
  
      this.target.scrollLeft += delta;
  
      if (Math.abs(delta) > 0) window.requestAnimationFrame(this.updateScrollPosition);
      else this.state.moving = false;
    }
  
    init() {
      window.addEventListener('wheel', this.scroll, { passive: false });
      window.addEventListener('DOMMouseScroll', this.scroll, { passive: false });
      console.log(this.target);
      
      var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"
   
  if (document.attachEvent) {
      document.attachEvent("on"+mousewheelevt, displaywheel)
  } else if (document.addEventListener){
      document.addEventListener(mousewheelevt, displaywheel, false)
  }
    }
  }
  
  const horizontalScroll = new HorizontalScroll();
  horizontalScroll.init();