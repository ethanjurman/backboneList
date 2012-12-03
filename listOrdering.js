window.onload = function() { // on window load, run the application
    BackboneList = {}; // create object BackboneList
    BackboneList.Collection = {}; 
    BackboneList.Model = {}; 
    BackboneList.View = {}; 

    BackboneList.Model.Item = Backbone.Model.extend(); // model will extend from the Backbone Model (backbone.js)
    
    // view will extend from Backbone View (backbone.js), init
    BackboneList.View.Item = Backbone.View.extend({
        className: 'item-view',
        events: {
        },        
        render: function() {
            $(this.el).html(this.model.get('button1')+this.model.get('name')+this.model.get('button2'));
            return this;
        }
    });

    // collection will extend from Backbone Collection (backbone.js)
    BackboneList.Collection.Items = Backbone.Collection.extend({
        model: BackboneList.Model.Item,
        comparator: function(model) {
            return model.get('index');
        }
        
    });


    // collection will extend from Backbone View (backbone.js)
    BackboneList.View.Items = Backbone.View.extend({
        events: {
            'click #bA': 'moveUp',
            'click #bB': 'moveDn'
        },
        
        render: function() {
            this.$el.children().remove();
            this.collection.each(this.appendModelView, this);
            return this;
        },
        
        appendModelView: function(model) {
            console.log(thiss);
            this.$el.append(new BackboneList.View.Item({model: model}).render().el);
        },
        
        moveUp: function(event, model, index, name) { 
            console.log(this.input);
            
            this.render();
        },
        
        moveDn: function(event, model, index, name) { 
            console.log(event);
            
            this.render();
        }
    });    

    // Instance object
    var Instance = {};
    // Instance collection, new Object from BackboneList (from Backbone.Collection)
    Instance.collection = new BackboneList.Collection.Items();
    bA = "<input type='submit' value='v' id='bA' />";
    bB = "<input type='submit' value='v' id='bB' />";
    Instance.collection.add(new BackboneList.Model.Item({index: 0,name: 'Steve Jobs',sIndex: 0,button1:bA,button2:bB}));
    Instance.collection.add(new BackboneList.Model.Item({index: 1,name: 'Bill Gates',sIndex: 1,button1:bA,button2:bB}));
    Instance.collection.add(new BackboneList.Model.Item({index: 2,name: 'Mark Zuckerberg',sIndex: 2,button1:bA,button2:bB}));
    Instance.collection.add(new BackboneList.Model.Item({index: 3,name: 'Elon Musk',sIndex: 3,button1:bA,button2:bB}));
    Instance.collection.add(new BackboneList.Model.Item({index: 4,name: 'Larry Paige',sIndex: 4,button1:bA,button2:bB}));
    Instance.collection.add(new BackboneList.Model.Item({index: 5,name: 'Larry Ellison',sIndex: 5,button1:bA,button2:bB}));

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
