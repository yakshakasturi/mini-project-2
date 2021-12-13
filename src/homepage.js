document.addEventListener("DOMContentLoaded", e => {  
    function offset(elem){
      let rect = elem.getBoundingClientRect();
      let top = rect.top + (window.pageYOffset || document.documentElement.scrollTop),
          left = rect.left + (window.pageYOffset || document.documentElement.scrollLeft),
          right = left + elem.clientWidth,
          bottom = top + elem.clientHeight;
      return { top, right, bottom, left };
    }
    
    function vh(v) {
      let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      return (v * h) / 100;
    }
    
    const nav = document.querySelector("nav");  
    const tabs = document.querySelectorAll("nav > a.tab");
    const menu_btn = document.querySelector("nav > .menu-btn");
    const content_pages = document.querySelectorAll(".content-page");   
    const md = 720;
    
    let nav_height = nav.clientHeight;
    let nav_top_offset = offset(nav).top;
  
    let scroll_position = 0;
    let ticking = false;
    
    window.addEventListener("scroll", e => {
      scroll_position = window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if(scroll_position>=nav_top_offset){  
            nav.style.position = "fixed";
            nav.style.top = "0";
            nav.transition = "0.5s linear";
          }
          else{  
            let active_tab = document.querySelector("nav a.active");
            if(active_tab) active_tab.classList.remove("active");
            nav.style.position = "static";
            nav.style.top = `${vh(100)-nav_height}`;
            nav.transition = "0.5s linear";
          }
          
          content_pages.forEach((page, idx) => {
            let { top, bottom }  = offset(page);          
            if(scroll_position>=top-nav_height && scroll_position<=bottom-nav_height){       
              let active_tab = document.querySelector("nav a.active");
              if(active_tab) active_tab.classList.remove("active");
              tabs[idx+1].classList.add("active");            
            }
          })
          
          ticking = false;
        });
  
        ticking = true;
      }
    });
    
    function hide_tabs(){
      if(window.innerWidth<=md) {
        tabs.forEach(tab => {
          tab.classList.add("hidden");
        });
      }
    }
    
    hide_tabs();
    
    window.onresize = e => {
      if(window.innerWidth<=md)
        tabs.forEach(tab => {
          tab.classList.add("hidden");
        });
      else
        tabs.forEach(tab => {
          tab.classList.remove("hidden");
        });
    }
    
    menu_btn.onclick = e => {
      if(window.innerWidth<=md) {
        tabs.forEach(tab => {
          tab.classList.toggle("hidden");
        });
      }
    }
  });