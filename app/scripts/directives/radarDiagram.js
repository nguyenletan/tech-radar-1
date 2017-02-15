'use strict';

angular.module('techRadarApp').directive('radarDiagram', ['$log', 'radarService', function ($log, radarService) {
  return {
    restrict: 'E',
    templateUrl: 'views/radar.html',
    replace: true,
    link: function (scope, element, attrs) {

      var numCategories = 4 /*radarService.categories.length*/, equalPortions = [];

      _(numCategories).times(function () {
        equalPortions.push(100 / numCategories)
      });

      var colorPattern = ['#5bc0eb', '#fde74c', '#9bc53d', '#e55934', '#fa7921']
      var width = attrs.width,
        height = attrs.height,
        padding = 30,
        diagramRadius = Math.min(attrs.width, attrs.height) / 2 - padding;
      console.log(diagramRadius);


      var pie = d3.pie().sort(null);

      var categoryPie = pie(equalPortions);
      //debugger;
      var categoryArcs = {
        "Tools": categoryPie[0],
        "Techniques/Languages": categoryPie[1],
        "Platforms": categoryPie[2],
        "Frameworks & Libraries": categoryPie[3]
      };

      var arc = d3.arc().innerRadius(10)
        .outerRadius(1000)
        .startAngle(0)
        .endAngle(Math.PI * 2);
      //arc();
      var svg = d3.select(element[0]).append("svg")
        .attr("width", width)
        .attr("height", height);
      var svgArcs = svg.append("g")
        .attr("transform", "translate(" + (width / 2 - padding) + "," + (height / 2 - padding) + ")");
      var svgNodes = svg.append("g")
        .attr("transform", "translate(" + (width / 2 - padding) + "," + (height / 2 - padding) + ")");

      /**
       *  radiusSoftener should be close to 1
       */
      function isOverlappingAnotherPoint(o) {
        function distance(a, b) {
          return Math.sqrt(Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2));
        }

        /* If two nodes are within a box of xThreshold-by-yThreshold dimensions, reject this placement */
        /* This should scale with the diagramRadius */
        var xThreshold = .15 * diagramRadius; //.15
        var yThreshold = .03 * diagramRadius;//.045

        var foundOne = false;
        _.each(radarService.radar.getTechnologies(), function (p) {
          if (o !== p && o.x && o.y && p.x && p.y) {
            if (Math.abs(o.x - p.x) < xThreshold && Math.abs(o.y - p.y) < yThreshold) {
              //distance(o, p) < threshold) {
              foundOne = true;
            }
          }
        });
        return foundOne;
      }

      var defaultTechRadius = 8;
      var hoverTechRadius = 0;
      var radialBuffer = 10;

      function applyRandomXY(arc, d) {
        inner = arc.innerRadius + radialBuffer;
        outer = arc.outerRadius - radialBuffer;
        var r = (Math.random() * (outer - inner)) + inner;

        var angularBuffer = Math.atan(radialBuffer / r);

        var inner = arc.startAngle + angularBuffer;
        var outer = arc.endAngle - angularBuffer;
        var theta = (Math.random() * (outer - inner)) + inner;

        d.x = r * Math.cos(theta - (Math.PI / 2));
        d.y = r * Math.sin(theta - (Math.PI / 2));
      }

      var arcStatusEnter = svgArcs.selectAll("g").data(radarService.radar.data).enter().append("g").attr("class", "ring");
      var arcCategoryEnter = arcStatusEnter.selectAll("path")
        .data(function (d) {
          return d.categories;
        })
        .enter()
        .append("g")
        .attr("class", "slice");

      var k = 0;

      arcCategoryEnter.append("path")
        .attr("fill", function (d, slice, ring) {
          return colorPattern[slice];
        })
        .attr("stroke", "white")
        .attr("stroke-width", "2px")
        .attr("stroke-opacity", "1.0")
        .datum(function (d, i, j) {
          var numRings = _.size(radarService.statuses) + 1;
          var innerRadius, outerRadius;

          switch (k) {
            case 0:
              innerRadius = 0;
              outerRadius = 220;
              break;
            case 1:
              innerRadius = 220;
              outerRadius = 340;
              break;
            case 2:
              innerRadius = 340;
              outerRadius = 400;
              break;
          }

          d.arc = {
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            k_index: k
          };
          _.extend(d.arc, categoryArcs[d.label]);
          if (i === numRings - 1) {
            k++;
          }
          return d;
        })
        .attr("d", function (d) {
          return arc.innerRadius(d.arc.innerRadius).outerRadius(d.arc.outerRadius).startAngle(d.arc.startAngle).endAngle(d.arc.endAngle)(d.arc);
        })
        .on('mouseover', function (d) {
          d.active = true;
          redrawTechCircles();
        })
        .on('mouseout', function (d) {
          d.active = false;
          redrawTechCircles();
        });

      var nodeStatusEnter = svgNodes.selectAll("g").data(radarService.radar.data).enter().append("g").attr("class", "tech");

      var nodeCategoryEnter = nodeStatusEnter.selectAll("g")
        .data(function (d) {
          return d.categories;
        })
        .enter()
        .append("g")
        .datum(function (category, categoryIndex) {
          category.color = colorPattern[categoryIndex];
          return category;
        })
        .attr("class", "category");

      var technologies;
      var truncatedLabelLength = 10;

      function getTechLabelSubstring(label) {
        return (label.length <= truncatedLabelLength) ?
          label :
          label.substring(0, truncatedLabelLength - 1) + "...";
      }

      function drawTech() {
        technologies = nodeCategoryEnter.selectAll("g")
          .data(function (d) {
            return d.technologies;
          }, function (d) {
            return d.label;
          });

        $log.info("Redrawing");

        var techEnter = technologies.enter().append("g").attr("class", "tech-label")
          .on('mouseover', function (d) {
            d.active = true;
            redrawTechCircles();
          })
          .on('mouseout', function (d) {
            d.active = false;
            redrawTechCircles();
          });

        //draw inner cirlce line
        techEnter.append("circle").attr("r", defaultTechRadius)
          .datum(function (d) {
            var parentData = d3.select(this.parentNode.parentNode).datum();
            while (!d.x || !d.y || isOverlappingAnotherPoint(d)) {
              applyRandomXY(parentData.arc, d);
            }
            return d;
          })
          .style("stroke", "white")
          .style("stroke-width", "1px")
          .style("fill", "white")
          .style("opacity", "1")
          .attr("cx", function (d) {
            return d.x;
          }).attr("cy", function (d) {
          return d.y;
        });


        techEnter.append("text")
          .text(function (d) {
            return d.index;//getTechLabelSubstring(d.label);
          })
          .attr('x', function (d) {
            return parseInt(d.index) > 9 ? d.x - 6 : d.x - 3;
          })
          .attr('y', function (d) {
            return d.y + 3.5;
          })
          .attr('fill', 'black')
          .attr('font-weight', 'bold')
          .attr({
            "text-anchor": "middle",
            "font-size": function (d) {
              return defaultTechRadius / ((defaultTechRadius * 10) / 100);
            }
          });


        technologies.exit().remove();
      }

      scope.radarData = radarService.radar.data;
      scope.$watch('radarData', function () {
        drawTech();
      }, true);

      drawTech();

      function interpolateText(string, initialLength, index) {
        return function (t) {
          return t == 0 ? getTechLabelSubstring(string) : string.substring(0, Math.round((string.length - initialLength) * t) + initialLength);
          //return index;
        };
      }

      function reverseInterpolateText(string, initialLength, index) {
        return function (t) {
          var charsToRemove = t * (string.length - initialLength);
          //return t == 1 ? getTechLabelSubstring(string) : string.substring(0, string.length - charsToRemove);
          return index;
        };
      }

      function redrawTechCircles() {
        scope.$apply();

        technologies.selectAll("text")
          .style('fill', function(d){
            return d.active ? 'white' : 'black';
          })
          .transition()
          .duration(10)
          .tween("text", function (d) {
            var node = this;
            var interpolationFunction = d.active ? interpolateText : reverseInterpolateText;
            var i = interpolationFunction(d.label, Math.min(this.textContent.length, truncatedLabelLength), d.index);
            return function (t) {
              node.textContent = i(t);
              node.fill = 'white';//d.active ? 'white' : 'black';

            };
            /*if (i(1) !== this.textContent) {
             return function (t) {
             node.textContent = i(t);
             };
             }*/
          });

        technologies.selectAll("circle").transition()
          .duration(100)
          .attr("r", function (d) {
            return d.active ? hoverTechRadius : (d.radius ? d.radius : defaultTechRadius);
          });
      }

      //.on('click', function(d, i){console.log(d,i);});
      //slices.selectAll("path").data(function(d) {console.log(d); return d;})

    }
  }
}]);
