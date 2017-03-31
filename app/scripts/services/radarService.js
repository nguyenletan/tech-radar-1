angular.module('techRadarApp').factory('radarService', ['$log', '$timeout', 'localStorageWatcher',
  function ($log, $timeout, localStorageWatcher) {

    var LOCAL_STORAGE_ID = 'sadc.technologyRadarData';
    categoryName = 'Frameworks & Libraries';
    function Radar(data) {
      //this.data = defaultData;

      this.data = [
        {
          label: "Core",
          categories: [{
            label: 'Tools',
            technologies: [
              {"label": "IIS", "isNew": false, "numberOfSE": 10, "numberOfSSE": 8, "numberOfPSE": 8},
              {"label": "Tomcat", "isNew": false, "numberOfSE": 80, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Apache", "isNew": false, "numberOfSE": 100, "numberOfSSE": 50, "numberOfPSE": 5},
              {"label": "Express", "isNew": false, "numberOfSE": 20, "numberOfSSE": 20, "numberOfPSE": 3},
              {"label": "Redis", "isNew": false, "numberOfSE": 10, "numberOfSSE": 10, "numberOfPSE": 8},
              {"label": "Ehcache", "isNew": false, "numberOfSE": 10, "numberOfSSE": 10, "numberOfPSE": 10},
              {
                "label": "jUnit - NUnit - PHPUnit - OCUnit",
                "isNew": false,
                "numberOfSE": 50,
                "numberOfSSE": 20,
                "numberOfPSE": 5
              },
              {"label": "Appium", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {
                "label": "Composer - Nuget - Npm - Yarn",
                "isNew": false,
                "numberOfSE": 80,
                "numberOfSSE": 10,
                "numberOfPSE": 10
              },
              {"label": "Nginx", "isNew": false, "numberOfSE": 18, "numberOfSSE": 10, "numberOfPSE": 3},
              {"label": "Jenkin", "isNew": false, "numberOfSE": 40, "numberOfSSE": 10, "numberOfPSE": 3},
              {"label": "Grunt/Gulp", "isNew": false, "numberOfSE": 100, "numberOfSSE": 10, "numberOfPSE": 1},
              {"label": "Sass/Less/PostCss", "isNew": false, "numberOfSE": 70, "numberOfSSE": 20, "numberOfPSE": 1},
              {"label": "SQLite", "isNew": false, "numberOfSE": 154, "numberOfSSE": 16, "numberOfPSE": 6},
              {"label": "Realm", "isNew": false, "numberOfSE": 20, "numberOfSSE": 40, "numberOfPSE": 2},
              {"label": "SSIS/SSAA/SSRS", "isNew": false, "numberOfSE": 300, "numberOfSSE": 30, "numberOfPSE": 10},
              {"label": "MSSQL", "isNew": false, "numberOfSE": 280, "numberOfSSE": 90, "numberOfPSE": 1},
              {"label": "Oracle", "isNew": false, "numberOfSE": 222, "numberOfSSE": 50, "numberOfPSE": 7},
              {"label": "MySQL", "isNew": false, "numberOfSE": 333, "numberOfSSE": 20, "numberOfPSE": 2},
            ]
          },
            {
              label: 'Techniques & Languages',
              technologies: [
                {"label": "Javascript", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "HTML/CSS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "C#", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "C++", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "PHP", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Java", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "SQL", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Responsive web design", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "OOP", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Go", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Swift/Objective C", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3}
              ]
            },
            {
              label: 'Platforms',
              technologies: [{"label": "Windows", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "MS Azure", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Android", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "IOS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "JDK", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": ".NET", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "LAMP/LAEMP", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "NodeJs", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Wordpress", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Phonegap/Cordova", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Windows server", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Cocoa", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              ]
            },
            {
              label: 'Frameworks & Libraries',
              technologies: [
                {"label": "ASP.NET MVC", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Bootstrap", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": ".NET Web API", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "JSP", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Spring", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "JAX-WS/JAX-RS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "EJB3", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "JMS/MDB", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "JDBC", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "AngularJS1", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Entity Framework", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Symfony", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "jQuery", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              ]
            },
          ]
        },
        {
          label: "Non-Core",
          categories: [{
            label: 'Tools',
            technologies: [
              {"label": "MSBuild/Nant", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "TeamCity", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "MVSTS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "RedGate Ant", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Websphere MQ", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "ActiveMQ", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "HornetMQ", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "RabbitMQ", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "OSGI Platform", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Spring Integration", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Oracle SOA/ESB", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Mule ESB", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "MemCache", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "JBoss AS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Glassfish", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "WebSphere", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Lucene", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Solr", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Elastic Search", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Websphere Process", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Oracle BPM", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Yeoman", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Webpack", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Capistrano", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Vagrant", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Puppet", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Firebase", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Hadoop", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3}
            ]
          },
            {
              label: 'Techniques & Languages',
              technologies: [
                {"label": "Scala/Lift", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Groovy", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Ruby", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Python", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Typescript", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3}
              ]
            },
            {
              label: 'Platforms',
              technologies: [
                {"label": "Windows Form", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "WPF", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "XML Web Services", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "WCF", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Umbraco", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "SiteCore", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Kentico", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "DotNetNuke", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Dynamics CRM", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "MS Azure IAAS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "SharePoint", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Liferay", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "CQ5", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Drupal", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Magento", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Moodle", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Amazon Web Services", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Xamarin", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              ]
            },

            {
              label: 'Frameworks & Libraries',
              technologies: [
                {"label": "ASP.NET Web Forms", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Swing/JavaFX", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Struts", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "JSF", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Vaadin", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "WSO2", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Apache Camel", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "KendoUI", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "D3.js", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Lavarel", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Zend", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Yii", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Django", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Ruby on Rails", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Cocos2D, 3D", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "OpenGL ES", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              ]
            },

          ]
        },
        {
          label: "Adopting",
          categories: [
            {
              label: 'Tools', technologies: [
              {
                "label": "Eclipse Virgo (OSGI Server)",
                "isNew": false,
                "numberOfSE": 180,
                "numberOfSSE": 72,
                "numberOfPSE": 3
              },
              {"label": "Spark", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3}
            ]
            },
            {
              label: 'Techniques & Languages',
              technologies: [
                {"label": "F#", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Microservices", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
                {"label": "Mixed Reality", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3}
              ]
            },
            {
              label: 'Platforms', technologies: [
              {"label": "Universal Windows App", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": ".Net Core", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Spring Cloud", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Blockchain", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "IoT", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Big Data", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "JAMstack", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
            ]
            },
            {
              label: 'Frameworks & Libraries', technologies: [
              {"label": "Entity Framework Core", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "ReactJs", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "React Native", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "ASP.NET Core", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Angular4", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Lift", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "VueJs", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Machine Learning", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3},
              {"label": "Tensorflow", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3}
            ]
            },
          ]
        },

      ];

      fillIndex(this.data);
    }

    function fillIndex(data) {
      for (var item of data) {
        for (var category of item.categories) {
          var i = 0;
          for (var technology of category.technologies) {
            technology.index = i;
            i++;
          }
        }
      }
    }

    Radar.prototype.getTechnologies = function () {
      var categories = _.pluck(this.data, 'categories');
      //console.log(categories);
      return _.flatten(_.pluck(_.flatten(categories), 'technologies'));
    };

    var radarData = localStorageWatcher.syncWithLocalStorage(LOCAL_STORAGE_ID, this.data);

    var radar = new Radar(radarData);

    function getCategories() {
      var categories = _.pluck(radar.data, 'categories');

      return _.pluck(categories, 'label');
    }

    function getTechListByCategoryName() {
      var result = [];
      if (1) {
        var categories = _.flatten(_.pluck(radar.data, 'categories'));
        //categories = _.where(categories, {label: this.categoryName});

        for (var i = 0, n = categories.length; i < n; i++) {
          if (i < 4) {
            categories[i].group = 'Core';
          } else if (i < 8) {
            categories[i].group = 'Non-Core';
          } else {
            categories[i].group = 'Adopting';
          }
        }

        //console.log(categories);

        result = categories;

      }
      return result;
    }


    function getStatuses() {
      return _.pluck(radar.data, 'label');
    }

    //getTechListByCategoryName('Techniques & Languages');

    var o = {
      radar: radar,
      categories: getCategories(),
      statuses: getStatuses(),
      groupActive: 'Frameworks & Libraries',
      techList: getTechListByCategoryName()
    };
    //console.log(o);
    return o;
  }

]);
