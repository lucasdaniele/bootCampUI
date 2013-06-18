// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
  Backbone.$ = $;
  // Movie Model
  // ----------

  // Our basic **Movie** model has `title`, `director`, and `year` attributes.
  var Movie = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: 'empty title...',
        director: '',
        year: '',
        order: Movies.nextOrder(),
      };
    },

    //Toggle the `done` state of this todo item.
    // toggle: function() {
    //   this.save({done: !this.get("done")});
    // }

  });
  // Movie Collection
  // ---------------

  // The collection of movies is backed by *localStorage* instead of a remote
  // server.
  var MovieList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Movie,

    // Save all of the todo items under the `"movies-backbone"` namespace.
    //localStorage: new Backbone.LocalStorage('movies-backbone'),
    //url: 'json/client.json',
    // We keep the Movies in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Movies are sorted by their original insertion order.
    comparator: 'order'

  });

  // Create our global collection of **Movies**.
  var Movies = new MovieList;

  // Movie Item View
  // --------------

  // The DOM element for a movie item...
  var MovieView = Backbone.View.extend({

    //... is a list tag.
    tagName:  'li',

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      // "click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    // The MovieView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Movie** and a **MovieView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the attributes of the movie item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.input = this.$('.edit');
      return this;
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass('editing');
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the movie.
    close: function() {
      var valueAttributes = this.input.val().split(',');
      if (!valueAttributes[0]) {
        this.clear();
      } else {
        this.model.save({title: valueAttributes[0], director: valueAttributes[1], year: valueAttributes[2] });
        this.$el.removeClass('editing');
      }
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $('#moviesApp'),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'click #new-filmBtn':  'createOnClick'
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

      this.input = this.$('#new-movie');

      this.listenTo(Movies, 'add', this.addOne);
      this.listenTo(Movies, 'reset', this.addAll);
      this.listenTo(Movies, 'all', this.render);

      this.main = $('#main');

      Movies.fetch({ url: "/data/init.json"});
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

      if (Movies.length) {
        this.main.show();

      } else {
        this.main.hide();
      }
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(movie) {
      var view = new MovieView({model: movie});
      this.$('#movie-list').append(view.render().el);
    },

    // Add all items in the **Movies** collection at once.
    addAll: function() {
      Movies.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Movie** model,
    // persisting it to *localStorage*.
    createOnClick: function() {
      if (!$('#new-title').val()) return;

      Movies.create({title: Backbone.$('#new-title').val(), director: $('#new-director').val(), year: $('#new-year').val()});
      $('#new-title').val('');
      $('#new-director').val('');
      $('#new-year').val('');
    },

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});