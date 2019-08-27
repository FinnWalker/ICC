AFRAME.registerComponent('customize-loading-icon', {
    init: function() {
      console.log('customizing loading spinner')
      document.getElementById("loadImage").src="../images/coach_c_logo_128.png";
      document.getElementById("loadImageContainer").classList.add("blackBackground");
      window.addEventListener("message", () => {
        console.log("message sent");
      });
      
    }
  });