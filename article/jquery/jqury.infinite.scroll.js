(function ($) {

	function InfiniteScroll (element, options) {
		this.$element = $(element);
    	this.options = $.extend({}, $.fn.infiniteScroll.defaults, options);
    	this.binder = $(document);
    	this.init();		
	}


  InfiniteScroll.prototype = {

    constructor: InfiniteScroll,

    init: function () {
    	var that = this;
        this.binder.scroll(function(event) {
        	if (that.$element.attr("infiniteScroll") == "enable") {
				if (that.isFetchDatas()) {
					that.$element.attr("infiniteScroll", "loading");
					that.debug("loading...");
					that.fetchData();					
				} 
			}

		});
      },

     isFetchDatas: function () {
     	// is it low enough to add elements to bottom?
		var pageHeight = Math.max(document.body.scrollHeight || document.body.offsetHeight);
		var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
		var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

		this.debug("pageHeight:" + pageHeight + "viewportHeight:" + viewportHeight + "scrollHeight:" + scrollHeight);
		
		return pageHeight - viewportHeight - scrollHeight < this.options.pixOffset;
     },

     fetchData: function () {
     	this.options.beforeLoad(this.$element);
     	this.options.data = $.extend(this.options.data,{datanum:$(this.options.itemSelector).length});
     	this.debug(this.options.data);
		var that = this;
		$.ajax({
			  type: 'POST',
			  url: this.options.url,
			  data: this.options.data,
			  dataType: this.options.dataType,
			  success: function(data){

			  		that.options.loadComplete(that.$element, data);

			  		if (that.$element.attr("infiniteScroll") != "disabled") {
			  			that.$element.attr("infiniteScroll", "enable");	
			  		}					
			  }
			  
		 });
     },
     debug: function () {
			if (true !== this.options.debug) {
				return;
			}

			if (typeof console !== 'undefined' && typeof console.log === 'function') {
				// Modern browsers
				// Single argument, which is a string
				if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
					console.log( (Array.prototype.slice.call(arguments)).toString() );
				} else {
					console.log( Array.prototype.slice.call(arguments) );
				}
			} else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
				// IE8
				Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
			}
        }
    }


	/* INFINITE SCROLL PLUGIN DEFINITION
  * =========================== */

	$.fn.infiniteScroll = function (options) {
		return this.each(function () {
			var $this = $(this);
			$this.attr("infiniteScroll", "enable");
			new InfiniteScroll(this, options);
			}
		);
	}

	$.fn.infiniteScroll.Constructor = InfiniteScroll

	$.fn.infiniteScroll.defaults = {
	    url: "",
	    data: {},
	    datatype: "html",
	    pixOffset: 10,
	    itemSelector: "#datas>div",
	    beforeLoad: function(element) {},
	    loadComplete : function(element) {},
	    debug: false
	}

}(window.jQuery));