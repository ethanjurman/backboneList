window.onload = function() { // on window load, run the application
    BackboneList = {}; // create object BackboneList
    BackboneList.Collection = {}; 
    BackboneList.Model = {}; 
    BackboneList.View = {}; 

    BackboneList.Model.Item = Backbone.Model.extend(); // model will extend from the Backbone Model (backbone.js)
    
    // view will extend from Backbone View (backbone.js)
    BackboneList.View.Item = Backbone.View.extend({
        tagName: 'li',
        className: 'item-view',
        events: {
            
        },        
        render: function() {
            $(this.el).html(this.model.get('name'));
            return this;
        }
    });

    // collection will extend from Backbone Collection (backbone.js)
    BackboneList.Collection.Items = Backbone.Collection.extend({
        model: BackboneList.Model.Item,
        comparator: function(model) {
            return model.get('ordinal');
        },
    });


    // collection will extend from Backbone View (backbone.js)
    BackboneList.View.Items = Backbone.View.extend({
        events: {
            //'click .button': 'moveUp'
            'drop': function() { console.log("dropped item"); }
        },
        
        render: function() {
            this.$el.children().remove();
            this.collection.each(this.appendModelView, this);
            return this;
        },
        
        appendModelView: function(model) {
            console.log(model);
            this.$el.append(new BackboneList.View.Item({model: model}).render().el);
        },
        
        moveUp: function(event, model, position) {
            this.collection.remove(model)    
            
            // anonymous function for iterating through items
            this.collection.each(function (model, index) {
                var ordinal = index;
                ordinal += 1;
                model.set('ordinal', ordinal);
            });            
            
            model.set('ordinal', position);
            this.collection.add(model, {at: position});
            
            this.render();
        }
    });    

    // Instance object
    var Instance = {};
    // Instance collection, new Object from BackboneList (from Backbone.Collection)
    Instance.collection = new BackboneList.Collection.Items();
    Instance.collection.add(new BackboneList.Model.Item({index: 0,name: 'Steve Jobs'}));
    Instance.collection.add(new BackboneList.Model.Item({index: 1,name: 'Bill Gates'}));
    Instance.collection.add(new BackboneList.Model.Item({index: 2,name: 'Mark Zuckerberg'}));
    Instance.collection.add(new BackboneList.Model.Item({index: 3,name: 'Elon Musk'}));
    Instance.collection.add(new BackboneList.Model.Item({index: 4,name: 'Larry Paige'}));
    Instance.collection.add(new BackboneList.Model.Item({index: 5,name: 'Sergey Brin'}));
    Instance.collection.add(new BackboneList.Model.Item({index: 6,name: 'Larry Ellison'}));

    // The collection view comes from the BackboneList (from Backbone.View)
    Instance.collectionView = new BackboneList.View.Items({
        el: '#collection-view',
        collection: Instance.collection
    });

    Instance.collectionView.render();

    
    $(document).ready(function() {
        $('#collection-view').sortable({
            stop: function(event, ui) {
                ui.item.trigger('drop', ui.item.index());
            }
        });
    });
};
