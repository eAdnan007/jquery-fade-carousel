(function($){

    //Which slot is going to be replaced next.
    var nextChangeIndex = 0;

    //Which item is going to enter next.
    var nextItem;

    //Number of items
    var itemCount;

    //Contain the currently visible elements on screen.
    var slots = [];

    //Swap a slot with a new item
    var swapNext = function(carousel, options){
        nextChangeIndex %= options.items; // Set the nextChangeIndex to 0 when it passes visible number of items.
        nextItem %= itemCount;

        var newItem = carousel.find(options.itemSelector).eq(nextItem);
        newItem
            .css({
                position: 'absolute',
                top: 0,
                left: ( 100 / options.items * nextChangeIndex ) + '%',
                zIndex: 1
            })
            .fadeIn(options.fadeDuration, function(){
                slots[nextChangeIndex].css('display', 'none');
                newItem.css('z-index', 0);
                slots[nextChangeIndex] = newItem;
                nextChangeIndex++;
                nextItem++;
            });

    };

    $.fn.fadeCarousel = function(options) {


        //Set the default settings
        options = $.extend({
            items: 3,
            delay: 4000,
            fadeDuration: 2000,
            itemSelector: '.fade-item'
        }, options);

        nextItem = options.items;
        itemCount = this.find(options.itemSelector).length;

        this.css('position', 'relative');
        this.find(options.itemSelector).hide();
        for(var i = 0; i < options.items; i++){
            slots.push(
                this.find(options.itemSelector).eq(i)
                    .show()
                    .css({
                        position: "absolute",
                        top: 0,
                        left: ( 100 / options.items * i ) + '%',
                        width: ( 100 / options.items ) + '%',
                        zIndex: 1
                    })
            );
        }

        if(itemCount <= options.items) return this;

        var carousel = this;
        setInterval(function(){
            swapNext(carousel, options);
        }, options.delay);

        return this;
    }
})(jQuery);