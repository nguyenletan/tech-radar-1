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
              {"label": "IIS"},
              {"label": "Tomcat"},
              {"label": "Apache"},
              {"label": "Express"},
              {"label": "Redis"},
              {"label": "Ehcache"},
              {"label": "jUnit - NUnit - PHPUnit - OCUnit"},
              {"label": "Appium"},
              {"label": "Composer - Nuget - Npm - Yarn"},
              {"label": "Nginx"},
              {"label": "Jenkin"},
              {"label": "Grunt/Gulp"},
              {"label": "Sass/Less/PostCss"},
              {"label": "SQLite"},
              {"label": "Realm"},
              {"label": "SSIS/SSAA/SSRS"},
              {"label": "MSSQL"},
              {"label": "Oracle"},
              {"label": "MySQL"},
            ]
          },
            {
              label: 'Techniques & Languages',
              technologies: [
                {"label": "Javascript"},
                {"label": "HTML/CSS"},
                {"label": "C#"},
                {"label": "C++"},
                {"label": "PHP"},
                {"label": "Java"},
                {"label": "SQL"},
                {"label": "Responsive web design"},
                {"label": "OOP"},
                {"label": "Go"},
                {"label": "Swift/Objective C"},
                {"label": "Typescript"}
              ]
            },
            {
              label: 'Platforms',
              technologies: [{"label": "Windows"},
                {"label": "MS Azure"},
                {"label": "Android"},
                {"label": "IOS"},
                {"label": "JDK"},
                {"label": ".NET"},
                {"label": "LAMP/LAEMP"},
                {"label": "NodeJs"},
                {"label": "Wordpress"},
                {"label": "Phonegap/Cordova"},
                {"label": "Windows server"},
                {"label": "ADO.NET"},
                {"label": "Cocoa"},
              ]
            },
            {
              label: 'Frameworks & Libraries',
              technologies: [
                {"label": "ASP.NET MVC"},
                {"label": "Bootstrap"},
                {"label": ".NET Web API"},
                {"label": "JSP"},
                {"label": "Spring"},
                {"label": "JAX-WS/JAX-RS"},
                {"label": "EJB3"},
                {"label": "JMS/MDB"},
                {"label": "JDBC"},
                {"label": "AngularJS 1"},
                {"label": "Entity Framework"},
                {"label": "Symfony"},
                {"label": "jQuery"},
              ]
            },
          ]
        },
        {
          label: "Non-Core",
          categories: [{
            label: 'Tools',
            technologies: [
              {"label": "MSBuild/Nant"},
              {"label": "TeamCity"},
              {"label": "MVSTS"},
              {"label": "RedGate Ant"},
              {"label": "ASP.NET Web Forms"},
              {"label": "Websphere MQ"},
              {"label": "ActiveMQ"},
              {"label": "HornetMQ"},
              {"label": "RabbitMQ"},
              {"label": "OSGI Platform"},
              {"label": "Spring Integration"},
              {"label": "Oracle SOA/ESB"},
              {"label": "Mule Soft"},
              {"label": "MemCache"},
              {"label": "JBoss AS"},
              {"label": "Glassfish"},
              {"label": "WebSphere"},
              {"label": "Lucene"},
              {"label": "Solr"},
              {"label": "Elastic Search"},
              {"label": "Websphere Process"},
              {"label": "Oracle BPM"},
              {"label": "Yeoman"},
              {"label": "Webpack"},
              {"label": "Capistrano"},
              {"label": "Vagrant"},
              {"label": "Puppet"},
              {"label": "Firebase"},
              {"label": "Hadoop"}
            ]
          },
            {
              label: 'Techniques & Languages',
              technologies: [
                {"label": "Scala/Lift"},
                {"label": "Groovy"},
                {"label": "Ruby"},
                {"label": "Python"}
              ]
            },
            {
              label: 'Platforms',
              technologies: [
                {"label": "Windows Form"},
                {"label": "WPF"},
                {"label": "XML Web Services"},
                {"label": "WCF"},
                {"label": "Umbraco"},
                {"label": "SiteCore"},
                {"label": "Kentico"},
                {"label": "DotNetNuke"},
                {"label": "Dynamics CRM"},
                {"label": "MS Azure IAAS"},
                {"label": "SharePoint"},
                {"label": "Liferay"},
                {"label": "CQ5"},
                {"label": "Drupal"},
                {"label": "Magento"},
                {"label": "Moodle"},
                {"label": "Amazone Cloud"},
                {"label": "Xamarin"},
              ]
            },

            {
              label: 'Frameworks & Libraries',
              technologies: [
                {"label": "ASP.NET Web Forms"},
                {"label": "Entity Framework Core"},
                {"label": "Swing/JavaFX"},
                {"label": "Struts"},
                {"label": "JSF"},
                {"label": "Vaadin"},
                {"label": "Mule ESB"},
                {"label": "WSO2"},
                {"label": "Apache Camel"},
                {"label": "KendoUI"},
                {"label": "D3"},
                {"label": "Lavarel"},
                {"label": "Zend"},
                {"label": "Yii"},
                {"label": "Django"},
                {"label": "Ruby on Rails"},
                {"label": "Cocos2D, 3D"},
                {"label": "OpenGL ES"},
              ]
            },

          ]
        },
        {
          label: "Adopting",
          categories: [
            {
              label: 'Tools', technologies: [
              {"label": "Eclipse Virgo (OSGI Server)"},
              {"label": "Spark"}
            ]
            },
            {
              label: 'Techniques & Languages',
              technologies: [
                {"label": "Go/Go lang"}

              ]
            },
            {
              label: 'Platforms', technologies: [
              {"label": "Universal Windows App"},
              {"label": ".Net Core"},
              {"label": "Spring Cloud"}
            ]
            },
            {
              label: 'Frameworks & Libraries', technologies: [
              {"label": "ReactJs"},
              {"label": "React Native"},
              {"label": "ASP.NET Core"},
              {"label": "Angular2"},
              {"label": "Lift"},
              {"label": "VueJs"}
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
          if(i < 4){
            categories[i].group = 'Core';
          } else if( i < 8){
            categories[i].group = 'Non-Core';
          } else {
            categories[i].group = 'Adopting';
          }
        }

        console.log(categories);

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
    console.log(o);
    return o;
  }

]);
