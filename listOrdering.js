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
            $(this.el).html("<input type='submit' value='v' />"+this.model.get('name')+"<input type='submit' value='^' />");
            return this;
        }
    });

    // collection will extend from Backbone Collection (backbone.js)
    BackboneList.Collection.Items = Backbone.Collection.extend({
        model: BackboneList.Model.Item,
        comparator: function(model) {
            return model.get('index');
        },
    });


    // collection will extend from Backbone View (backbone.js)
    BackboneList.View.Items = Backbone.View.extend({
        events: {
            
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
        
        moveUp: function(event, model, index) { 
            console.log(index);
            
            // anonymous function for iterating through items
            this.collection.each(function (model, index) {
                console.log(model, index);
                var ordinal = index;
                ordinal += 1;
                model.set('ordinal', ordinal);
            });
            
            this.render();
        }
    });    

    // Instance object
    var Instance = {};
    // Instance collection, new Object from BackboneList (from Backbone.Collection)
    Instance.collection = new BackboneList.Collection.Items();
    Instance.collection.add(new BackboneList.Model.Item({index: 0,name: 'Steve Jobs',sIndex: 0}));
    Instance.collection.add(new BackboneList.Model.Item({index: 1,name: 'Bill Gates',sIndex: 1}));
    Instance.collection.add(new BackboneList.Model.Item({index: 2,name: 'Mark Zuckerberg',sIndex: 2}));
    Instance.collection.add(new BackboneList.Model.Item({index: 3,name: 'Elon Musk',sIndex: 3}));
    Instance.collection.add(new BackboneList.Model.Item({index: 4,name: 'Larry Paige',sIndex: 4}));
    Instance.collection.add(new BackboneList.Model.Item({index: 5,name: 'Sergey Brin',sIndex: 5}));
    Instance.collection.add(new BackboneList.Model.Item({index: 6,name: 'Larry Ellison',sIndex: 6}));

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
