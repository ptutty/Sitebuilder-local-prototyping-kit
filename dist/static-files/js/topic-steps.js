

/* for Topic sections with multi part steps that show/hide and save state */
var careersAppTopicSteps =  (function ($, window) {

  var showAllPanels = false;
  var panelArray  = [];

  function init() {
    // wait until DOM is loaded
    $(function() {
      // load persistent data from local storage
      getStoredPanelArray();

      // show/hide all button event handler
      $(".js-step-controls-button").on("click", function() {
        var $allpanels = $(".scs-c-step-nav__steps").find(".js-panel")
        $allpanels.toggleClass("js-hidden", showAllPanels);
        showAllPanels = !showAllPanels;
        $(this).html(showAllPanels ? "Hide All" : "Show All");
        $(".js-toggle-link").html(showAllPanels ?  "Hide" : "Show");
        // persist state
        panelArray  = [];
        if (showAllPanels) {
          $allpanels.each(function() {
            panelArray.push($(this).attr('id'));
          });
        }
        localStorage.setItem("panels", JSON.stringify(panelArray));
      });

      // individual steps event handler
      $(".js-toggle-panel").click(function() {
          var $parent = $(this).parent("li.js-step");
          var $panel = $parent.find(".js-panel");
          var $tooglelink = $parent.find(".js-toggle-link");

          if ($panel.hasClass("js-hidden")) {
              $panel.toggleClass("js-hidden");
              $tooglelink.html("hide");
          } else {
             $panel.toggleClass("js-hidden");
             $tooglelink.html("show");
          }
          // persist state in local storage
          addPanelToArray($panel.attr('id'));
      });
    });
  };
  init();

  // get saved panel state in local storage
  function getStoredPanelArray() {
    var previouslyopenpanels =  JSON.parse(localStorage.getItem("panels"));
    if ( previouslyopenpanels  === null ) {
      panelArray  = [];
    } else {
      panelArray  = previouslyopenpanels;
      panelArray.forEach(function(element) {
        $panel = $(".scs-c-step-nav__steps").find("#" + element);
        $panel.toggleClass("js-hidden");
        $panel.parent(".scs-c-step-nav__step").find(".js-toggle-link").html("hide");
        showAllPanels = !showAllPanels;
        $(".js-step-controls-button").html(showAllPanels ? "Hide All" : "Show All").end();
      })
    }
  }

  // save state of panels in array and then local storage
  function addPanelToArray(panel) {
    var index = panelArray.indexOf(panel);
    if (index >= 0) {
        panelArray.splice(index, 1);
    } else {
        panelArray.push(panel);
    }
    localStorage.setItem("panels", JSON.stringify(panelArray));
  }


} (jQuery , window) );
