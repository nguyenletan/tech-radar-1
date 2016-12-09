var dataA = {
  categories: ['Tools', 'Platforms', 'Languages & Frameworks', 'Techniques'],
  rings:      ['Core', 'Non-core', 'Trend', 'Future'],
  technologies: [
    {label: "Health check pages", category: "Techniques", ring: "Core"},

  ]};

var newData = [
  {
    label: "Core",
    categories: [
      { label: 'Tools', technologies: []},
      { label: 'Techniques', technologies: []},
      { label: 'Platforms', technologies: []},
      { label: 'Languages & Frameworks', technologies: []},
    ]
  },
  {
    label: "Non-core",
    categories: [
      { label: 'Tools', technologies: []},
      { label: 'Techniques', technologies: []},
      { label: 'Platforms', technologies: []},
      { label: 'Languages & Frameworks', technologies: []},
    ]
  },
  {
    label: "Trend",
    categories: [
      { label: 'Tools', technologies: []},
      { label: 'Techniques', technologies: []},
      { label: 'Platforms', technologies: []},
      { label: 'Languages & Frameworks', technologies: []},
    ]
  },
  /*{
    label: "Future",
    categories: [
      { label: 'Tools', technologies: []},
      { label: 'Techniques', technologies: []},
      { label: 'Platforms', technologies: []},
      { label: 'Languages & Frameworks', technologies: []},
    ]
  }*/
];

_.each(dataA.technologies, function(data) {
  var ring = _.findWhere(newData, {label: data.ring});
  var slice = _.findWhere(ring.categories, {label: data.category});
  slice.technologies.push({label: data.label});
});

console.log(JSON.stringify(newData));
