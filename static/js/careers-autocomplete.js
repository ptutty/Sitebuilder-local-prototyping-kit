const client = algoliasearch("776UGMDCO8", "8c1b93c1e7dd111c6f142c330090ec69");
const index = client.initIndex("T02_push");

index.setSettings({
  // custom ranking - i.e. business logic
  customRanking: ["desc(isFeatured)" , "desc(endorsements)"],
  searchableAttributes: ["title","keywords" ]
})

$('#careers-search').autocomplete({ hint: false }, [
  {
    source: $.fn.autocomplete.sources.hits(index, { hitsPerPage: 5 }),
    displayKey: 'title , type',
    templates: {
      suggestion: function(suggestion) {
        return suggestion._highlightResult.title.value;
      }
    }
  }
]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
    window.location = suggestion.path;
});
