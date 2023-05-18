"use strict";

var _this = this;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*-----------------------------------------------
|   Theme Configuration
-----------------------------------------------*/
var storage = {
  isDark: true
};
/*-----------------------------------------------
|   Utilities
-----------------------------------------------*/

var utils = function ($) {
  var grays = function grays() {
    var colors = {
      white: '#fff',
      100: '#f9fafd',
      200: '#edf2f9',
      300: '#d8e2ef',
      400: '#b6c1d2',
      500: '#9da9bb',
      600: '#748194',
      700: '#5e6e82',
      800: '#4d5969',
      900: '#344050',
      1000: '#232e3c',
      1100: '#0b1727',
      black: '#000'
    };

    if (storage.isDark) {
      colors = {
        white: '#0e1c2f',
        100: '#132238',
        200: '#061325',
        300: '#344050',
        400: '#4d5969',
        500: '#5e6e82',
        600: '#748194',
        700: '#9da9bb',
        800: '#b6c1d2',
        900: '#d8e2ef',
        1000: '#edf2f9',
        1100: '#f9fafd',
        black: '#fff'
      };
    }

    return colors;
  };

  var themeColors = function themeColors() {
    var colors = {
      primary: '#2c7be5',
      secondary: '#748194',
      success: '#00d27a',
      info: '#27bcfd',
      warning: '#f5803e',
      danger: '#e63757',
      light: '#f9fafd',
      dark: '#0b1727'
    };

    if (storage.isDark) {
      colors.light = grays()['100'];
      colors.dark = grays()['1100'];
    }

    return colors;
  };

  var pluginSettings = function pluginSettings() {
    var settings = {
      tinymce: {
        theme: 'oxide'
      },
      chart: {
        borderColor: 'rgba(255, 255, 255, 0.8)'
      }
    };

    if (storage.isDark) {
      settings.tinymce.theme = 'oxide-dark';
      settings.chart.borderColor = themeColors().primary;
    }

    return settings;
  };

  var Utils = {
    $window: $(window),
    $document: $(document),
    $html: $('html'),
    $body: $('body'),
    $main: $('main'),
    isRTL: function isRTL() {
      return this.$html.attr('dir') === 'rtl';
    },
    location: window.location,
    nua: navigator.userAgent,
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1540
    },
    colors: themeColors(),
    grays: grays(),
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      };
    },
    isScrolledIntoViewJS: function isScrolledIntoViewJS(element) {
      var windowHeight = window.innerHeight;
      var elemTop = this.offset(element).top;
      var elemHeight = element.offsetHeight;
      var windowScrollTop = window.scrollY;
      return elemTop <= windowScrollTop + windowHeight && windowScrollTop <= elemTop + elemHeight;
    },
    isScrolledIntoView: function isScrolledIntoView(el) {
      var $el = $(el);
      var windowHeight = this.$window.height();
      var elemTop = $el.offset().top;
      var elemHeight = $el.height();
      var windowScrollTop = this.$window.scrollTop();
      return elemTop <= windowScrollTop + windowHeight && windowScrollTop <= elemTop + elemHeight;
    },
    getCurrentScreanBreakpoint: function getCurrentScreanBreakpoint() {
      var _this2 = this;

      var currentScrean = '';
      var windowWidth = this.$window.width();
      $.each(this.breakpoints, function (index, value) {
        if (windowWidth >= value) {
          currentScrean = index;
        } else if (windowWidth >= _this2.breakpoints.xl) {
          currentScrean = 'xl';
        }
      });
      return {
        currentScrean: currentScrean,
        currentBreakpoint: this.breakpoints[currentScrean]
      };
    },
    hexToRgb: function hexToRgb(hexValue) {
      var hex;
      hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      }));
      return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    },
    rgbColor: function rgbColor(color) {
      if (color === void 0) {
        color = '#fff';
      }

      return "rgb(" + this.hexToRgb(color) + ")";
    },
    rgbaColor: function rgbaColor(color, alpha) {
      if (color === void 0) {
        color = '#fff';
      }

      if (alpha === void 0) {
        alpha = 0.5;
      }

      return "rgba(" + this.hexToRgb(color) + ", " + alpha + ")";
    },
    rgbColors: function rgbColors() {
      var _this3 = this;

      return Object.keys(this.colors).map(function (color) {
        return _this3.rgbColor(_this3.colors[color]);
      });
    },
    rgbaColors: function rgbaColors() {
      var _this4 = this;

      return Object.keys(this.colors).map(function (color) {
        return _this4.rgbaColor(_this4.colors[color]);
      });
    },
    settings: pluginSettings(_this),
    isIterableArray: function isIterableArray(array) {
      return Array.isArray(array) && !!array.length;
    },
    setCookie: function setCookie(name, value, expire) {
      var expires = new Date();
      expires.setTime(expires.getTime() + expire);
      document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
    },
    getCookie: function getCookie(name) {
      var keyValue = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return keyValue ? keyValue[2] : keyValue;
    },
    getBreakpoint: function getBreakpoint($element) {
      var classes = $element.attr('class');
      var breakpoint;

      if (classes) {
        breakpoint = this.breakpoints[classes.split(' ').filter(function (cls) {
          return cls.indexOf('navbar-expand-') === 0;
        }).pop().split('-').pop()];
      }

      return breakpoint;
    }
  };
  return Utils;
}(jQuery);

/*-----------------------------------------------
|   Animated progressbar
-----------------------------------------------*/

utils.$document.ready(function () {
  var toggle = $('#progress-toggle-animation');
  toggle.on('click', function () {
    return $('#progress-toggle').toggleClass('progress-bar-animated');
  });
});
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/

utils.$document.ready(function () {
  var $navbar = $('.navbar-theme');

  if ($navbar.length) {
    var windowHeight = utils.$window.height();
    utils.$window.scroll(function () {
      var scrollTop = utils.$window.scrollTop();
      var alpha = scrollTop / windowHeight * 2;
      alpha >= 1 && (alpha = 1);
      $navbar.css({
        'background-color': "rgba(11, 23, 39, " + alpha + ")"
      });
    }); // Fix navbar background color [after and before expand]

    var classList = $navbar.attr('class').split(' ');
    var breakpoint = classList.filter(function (c) {
      return c.indexOf('navbar-expand-') >= 0;
    })[0].split('navbar-expand-')[1];
    utils.$window.resize(function () {
      if (utils.$window.width() > utils.breakpoints[breakpoint]) {
        return $navbar.removeClass('bg-dark');
      }

      if (!$navbar.find('.navbar-toggler').hasClass('collapsed')) {
        return $navbar.addClass('bg-dark');
      }

      return null;
    }); // Top navigation background toggle on mobile

    $navbar.on('show.bs.collapse hide.bs.collapse', function (e) {
      $(e.currentTarget).toggleClass('bg-dark');
    });
  }
});

/*-----------------------------------------------
|   Bulk Actions
-----------------------------------------------*/

utils.$document.ready(function () {
  var checkboxBulkSelects = $('.checkbox-bulk-select');

  if (checkboxBulkSelects.length) {
    var Event = {
      CLICK: 'click'
    };
    var Selector = {
      CHECKBOX_BULK_SELECT_CHECKBOX: '.checkbox-bulk-select-target'
    };
    var ClassName = {
      D_NONE: 'd-none'
    };
    var DATA_KEY = {
      CHECKBOX_BODY: 'checkbox-body',
      CHECKBOX_ACTIONS: 'checkbox-actions',
      CHECKBOX_REPLACED_ELEMENT: 'checkbox-replaced-element'
    };
    var Attribute = {
      CHECKED: 'checked',
      INDETERMINATE: 'indeterminate'
    };
    checkboxBulkSelects.each(function (index, value) {
      var checkboxBulkAction = $(value);
      var bulkActions = $(checkboxBulkAction.data(DATA_KEY.CHECKBOX_ACTIONS));
      var replacedElement = $(checkboxBulkAction.data(DATA_KEY.CHECKBOX_REPLACED_ELEMENT));
      var rowCheckboxes = $(checkboxBulkAction.data(DATA_KEY.CHECKBOX_BODY)).find(Selector.CHECKBOX_BULK_SELECT_CHECKBOX);
      checkboxBulkAction.on(Event.CLICK, function () {
        if (checkboxBulkAction.attr(Attribute.INDETERMINATE) === Attribute.INDETERMINATE) {
          bulkActions.addClass(ClassName.D_NONE);
          replacedElement.removeClass(ClassName.D_NONE);
          checkboxBulkAction.prop(Attribute.INDETERMINATE, false).attr(Attribute.INDETERMINATE, false);
          checkboxBulkAction.prop(Attribute.CHECKED, false).attr(Attribute.CHECKED, false);
          rowCheckboxes.prop(Attribute.CHECKED, false).attr(Attribute.CHECKED, false);
        } else {
          bulkActions.toggleClass(ClassName.D_NONE);
          replacedElement.toggleClass(ClassName.D_NONE);

          if (checkboxBulkAction.attr(Attribute.CHECKED)) {
            checkboxBulkAction.prop(Attribute.CHECKED, false).attr(Attribute.CHECKED, false);
          } else {
            checkboxBulkAction.prop(Attribute.CHECKED, true).attr(Attribute.CHECKED, true);
          }

          rowCheckboxes.each(function (i, v) {
            var $this = $(v);

            if ($this.attr(Attribute.CHECKED)) {
              $this.prop(Attribute.CHECKED, false).attr(Attribute.CHECKED, false);
            } else {
              $this.prop(Attribute.CHECKED, true).attr(Attribute.CHECKED, true);
            }
          });
        }
      });
      rowCheckboxes.on(Event.CLICK, function (e) {
        var $this = $(e.target);

        if ($this.attr(Attribute.CHECKED)) {
          $this.prop(Attribute.CHECKED, false).attr(Attribute.CHECKED, false);
        } else {
          $this.prop(Attribute.CHECKED, true).attr(Attribute.CHECKED, true);
        }

        rowCheckboxes.each(function (i, v) {
          var $elem = $(v);

          if ($elem.attr(Attribute.CHECKED)) {
            checkboxBulkAction.prop(Attribute.INDETERMINATE, true).attr(Attribute.INDETERMINATE, Attribute.INDETERMINATE);
            bulkActions.removeClass(ClassName.D_NONE);
            replacedElement.addClass(ClassName.D_NONE);
            return false;
          }

          if (i === checkboxBulkAction.length) {
            checkboxBulkAction.prop(Attribute.INDETERMINATE, false).attr(Attribute.INDETERMINATE, false);
            checkboxBulkAction.prop(Attribute.CHECKED, false).attr(Attribute.CHECKED, false);
            bulkActions.addClass(ClassName.D_NONE);
            replacedElement.removeClass(ClassName.D_NONE);
          }

          return true;
        });
      });
    });
  }
});
/*-----------------------------------------------
|   Chart
-----------------------------------------------*/

utils.$document.ready(function () {
  /*-----------------------------------------------
  |   Helper functions and Data
  -----------------------------------------------*/
  var chartData = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7];
  var labels = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
  /*-----------------------------------------------
  |   Chart Initialization
  -----------------------------------------------*/

  var newChart = function newChart(chart, config) {
    var ctx = chart.getContext('2d');
    return new window.Chart(ctx, config);
  };
  /*-----------------------------------------------
  |   Line Chart
  -----------------------------------------------*/


  var chartLine = document.getElementById('chart-line');

  if (chartLine) {
    var getChartBackground = function getChartBackground(chart) {
      var ctx = chart.getContext('2d');

      if (storage.isDark) {
        var _gradientFill = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);

        _gradientFill.addColorStop(0, utils.rgbaColor(utils.colors.primary, 0.5));

        _gradientFill.addColorStop(1, 'transparent');

        return _gradientFill;
      }

      var gradientFill = ctx.createLinearGradient(0, 0, 0, 250);
      gradientFill.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0)');
      return gradientFill;
    };

    var dashboardLineChart = newChart(chartLine, {
      type: 'line',
      data: {
        labels: labels.map(function (label) {
          return label.substring(0, label.length - 3);
        }),
        datasets: [{
          borderWidth: 2,
          data: chartData.map(function (d) {
            return (d * 3.14).toFixed(2);
          }),
          borderColor: utils.settings.chart.borderColor,
          backgroundColor: getChartBackground(chartLine)
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          mode: 'x-axis',
          xPadding: 20,
          yPadding: 10,
          displayColors: false,
          callbacks: {
            label: function label(tooltipItem) {
              return labels[tooltipItem.index] + " - " + tooltipItem.yLabel + " USD";
            },
            title: function title() {
              return null;
            }
          }
        },
        hover: {
          mode: 'label'
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              show: true,
              labelString: 'Month'
            },
            ticks: {
              fontColor: utils.rgbaColor('#fff', 0.7),
              fontStyle: 600
            },
            gridLines: {
              color: utils.rgbaColor('#fff', 0.1),
              zeroLineColor: utils.rgbaColor('#fff', 0.1),
              lineWidth: 1
            }
          }],
          yAxes: [{
            display: false
          }]
        }
      }
    });
    $('#dashboard-chart-select').on('change', function (e) {
      var LineDB = {
        all: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10].map(function (d) {
          return (d * 3.14).toFixed(2);
        }),
        successful: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8].map(function (d) {
          return (d * 3.14).toFixed(2);
        }),
        failed: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2].map(function (d) {
          return (d * 3.14).toFixed(2);
        })
      };
      dashboardLineChart.data.datasets[0].data = LineDB[e.target.value];
      dashboardLineChart.update();
    });
  }
  /*-----------------------------------------------
  |   Bar Chart
  -----------------------------------------------*/


  var chartBar = document.getElementById('chart-bar');

  if (chartBar) {
    newChart(chartBar, {
      type: 'bar',
      data: {
        labels: labels.slice(0, 2),
        datasets: [{
          label: 'First dataset',
          backgroundColor: [utils.rgbaColor(utils.colors.info), utils.rgbaColor(utils.colors.warning)],
          borderColor: [utils.rgbColor(utils.colors.info), utils.rgbColor(utils.colors.warning)],
          borderWidth: 2,
          data: [6, 10]
        }, {
          label: 'Second dataset',
          backgroundColor: [utils.rgbaColor(utils.colors.success), utils.rgbaColor(utils.colors.danger)],
          borderColor: [utils.rgbColor(utils.colors.success), utils.rgbColor(utils.colors.danger)],
          borderWidth: 2,
          data: [3, 7]
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  /*-----------------------------------------------
  |   Radar Chart
  -----------------------------------------------*/


  var chartRadar = document.getElementById('chart-radar');

  if (chartRadar) {
    newChart(chartRadar, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'First dataset',
          backgroundColor: utils.rgbaColor(utils.colors.warning),
          borderColor: utils.rgbColor(utils.colors.warning),
          borderWidth: 2,
          data: chartData.slice(0, 12),
          fill: 1
        }, {
          label: 'Second dataset',
          backgroundColor: utils.rgbaColor(utils.colors.danger),
          borderColor: utils.rgbColor(utils.colors.danger),
          borderWidth: 2,
          data: chartData.slice(12, 24),
          fill: 1
        }]
      },
      options: {
        maintainAspectRatio: true,
        spanGaps: false,
        elements: {
          line: {
            tension: 0.000001
          }
        }
      }
    });
  }
  /*-----------------------------------------------
  |   Pie Chart
  -----------------------------------------------*/


  var chartPie = document.getElementById('chart-pie');

  if (chartPie) {
    newChart(chartPie, {
      type: 'pie',
      data: {
        labels: labels.slice(0, 3),
        datasets: [{
          backgroundColor: utils.rgbaColors(),
          borderColor: utils.rgbColors(),
          data: chartData.slice(0, 3)
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  /*-----------------------------------------------
  |   Doughnut Chart
  -----------------------------------------------*/


  var chartDoughnut = document.getElementById('chart-doughnut');

  if (chartDoughnut) {
    newChart(chartDoughnut, {
      type: 'doughnut',
      data: {
        labels: labels.slice(0, 3),
        datasets: [{
          backgroundColor: utils.rgbColors(),
          borderColor: utils.rgbColors(),
          data: chartData.slice(0, 3)
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  /*-----------------------------------------------
  |   Polar Area Chart
  -----------------------------------------------*/


  var chartPolarArea = document.getElementById('chart-polar-area');

  if (chartPolarArea) {
    newChart(chartPolarArea, {
      type: 'polarArea',
      data: {
        labels: labels.slice(0, 3),
        datasets: [{
          backgroundColor: utils.rgbaColors(),
          borderColor: utils.rgbaColors(),
          data: chartData.slice(0, 3)
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  /* eslint-disable */

  /*-----------------------------------------------
  |   Polar Bubble
  -----------------------------------------------*/


  var colorize = function colorize(opaque, context) {
    var value = context.dataset.data[context.dataIndex];
    var x = value.x / 100;
    var y = value.y / 100;
    var r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
    var g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
    var b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
    var a = opaque ? 1 : 0.5 * value.v / 1000;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  };

  var rand = function rand(min, max) {
    var seed = _this._seed;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    _this._seed = (seed * 9301 + 49297) % 233280;
    return min + _this._seed / 233280 * (max - min);
  };

  var generateData = function generateData() {
    var data = [];
    var DATA_COUNT = 16;
    var MIN_XY = -150;
    var MAX_XY = 100;

    for (var i = 0; i < DATA_COUNT; i += 1) {
      data.push({
        x: rand(MIN_XY, MAX_XY),
        y: rand(MIN_XY, MAX_XY),
        v: rand(0, 1000)
      });
    }

    return data;
  };

  var chartBubble = document.getElementById("chart-bubble");

  if (chartBubble) {
    newChart(chartBubble, {
      type: "bubble",
      data: {
        datasets: [{
          label: ["Deer Population"],
          data: [{
            x: -10,
            y: -20,
            r: 20
          }, {
            x: 100,
            y: 0,
            r: 10
          }, {
            x: 60,
            y: 30,
            r: 20
          }, {
            x: 40,
            y: 60,
            r: 25
          }, {
            x: 80,
            y: 80,
            r: 30
          }, {
            x: 20,
            y: 30,
            r: 25
          }, {
            x: 0,
            y: 100,
            r: 5
          }],
          backgroundColor: "#2C7BE5"
        }]
      }
    });
  }
  /*-----------------------------------------------
  |   Component Line Chart
  -----------------------------------------------*/


  var componentChartLine = document.getElementById("component-chart-line");

  if (componentChartLine) {
    newChart(componentChartLine, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          borderWidth: 2,
          data: chartData.slice(2, 14).map(function (d) {
            return (d * 3.14).toFixed(2);
          }),
          borderColor: utils.rgbaColor(utils.colors.primary, 0.4),
          backgroundColor: utils.rgbaColor(utils.colors.primary)
        }, {
          borderWidth: 2,
          borderColor: "#fff",
          data: chartData.slice(3, 15).map(function (d) {
            return (d * 3.14).toFixed(2);
          }),
          backgroundColor: utils.rgbaColor(utils.colors.primary)
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          mode: "x-axis",
          xPadding: 20,
          yPadding: 10,
          displayColors: false,
          callbacks: {
            label: function label(tooltipItem) {
              return labels[tooltipItem.index] + " - " + tooltipItem.yLabel + " USD";
            },
            title: function title() {
              return null;
            }
          }
        },
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              show: true,
              labelString: "Month"
            },
            ticks: {
              fontColor: utils.rgbaColor("#000", 0.7),
              fontStyle: 600
            },
            gridLines: {
              // color: utils.rgbaColor('#000', 0.1),
              color: utils.rgbaColor("#000", 0.1),
              zeroLineColor: utils.rgbaColor("#000", 0.1),
              lineWidth: 1
            }
          }],
          yAxes: [{
            display: false
          }]
        }
      }
    });
  }
  /*-----------------------------------------------
  |   Real time user
  -----------------------------------------------*/

  /*-----------------------------------------------
  |   Bar Chart
  -----------------------------------------------*/


  var realTimeUser = document.getElementById("real-time-user");

  if (realTimeUser) {
    var realTimeUserChart = newChart(realTimeUser, {
      type: "bar",
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        datasets: [{
          label: "Users",
          backgroundColor: utils.rgbaColor("#fff", 0.3),
          data: [183, 163, 176, 172, 166, 161, 164, 159, 172, 173, 184, 163, 99, 173, 183, 167, 160, 183, 163, 176, 172, 166, 173, 188, 175],
          barPercentage: 0.9,
          categoryPercentage: 1.0
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            display: false,
            stacked: true
          }],
          xAxes: [{
            stacked: false,
            ticks: {
              display: false
            },
            gridLines: {
              color: utils.rgbaColor("#fff", 0.1),
              display: false
            }
          }]
        }
      }
    });
    var userCounterDom = $(".real-time-user");
    setInterval(function () {
      var userCounter = Math.floor(Math.random() * (120 - 60) + 60);
      /*-----------------------------------------------
      |   Remove data
      -----------------------------------------------*/

      realTimeUserChart.data.datasets.forEach(function (dataset) {
        dataset.data.shift();
      });
      realTimeUserChart.update();
      /*-----------------------------------------------
      |   Add data
      -----------------------------------------------*/

      setTimeout(function () {
        realTimeUserChart.data.datasets.forEach(function (dataset) {
          dataset.data.push(userCounter);
        });
        realTimeUserChart.update();
        userCounterDom.text(userCounter);
      }, 500);
    }, 2000);
  }
});
/*-----------------------------------------------
|   Chat
-----------------------------------------------*/

utils.$document.ready(function () {
  var Event = {
    CLICK: 'click',
    SHOWN_BS_TAB: 'shown.bs.tab',
    RESIZE: 'resize',
    KEYUP: 'keyup',
    EMOJI_BTN_CLIK: 'emojibtn.click'
  };
  var Selector = {
    CHAT_SIDEBAR: '.chat-sidebar',
    CHAT_CONTACT: '.chat-contact',
    CHAT_CONTENT_SCROLL_AREA: '.chat-content-scroll-area',
    CHAT_CONTENT_HEADER_ACTIVE: '.card-chat-pane.active .chat-content-header',
    CHAT_CONTENT_SCROLL_AREA_ACTIVE: '.card-chat-pane.active .chat-content-scroll-area',
    CARD_CHAT_PANE_ACTIVE: '.card-chat-pane.active',
    CHAT_EMOJIAREA: '.chat-editor-area .emojiarea',
    BTN_SEND: '.btn-send',
    CHAT_FILE_UPLOAD: '.chat-file-upload',
    CARD_CHAT_CONTENT: '.card-chat-content',
    EMOJIONEAREA_EDITOR: '.emojionearea-editor',
    BTN_INFO: '.btn-info',
    CONVERSATION_INFO: '.conversation-info',
    CONTACTS_LIST_SHOW: '.contacts-list-show',
    CHAT_EDITOR_AREA: '.chat-editor-area'
  };
  var ClassName = {
    UNREAD_MESSAGE: 'unread-message',
    TEXT_PRIMARY: 'text-primary',
    SHOW: 'show',
    LEFT_0: 'l-0'
  };
  var DATA_KEY = {
    TARGET: 'target',
    INDEX: 'index'
  };
  var Attribute = {
    STYLE: 'style'
  };
  var $chatSidebar = $(Selector.CHAT_SIDEBAR);
  var $chatContact = $(Selector.CHAT_CONTACT);
  var $chatEmojiarea = $(Selector.CHAT_EMOJIAREA);
  var $chatIcons = $(Selector.BTN_SEND + "," + Selector.CHAT_FILE_UPLOAD);
  var $btnSend = $(Selector.BTN_SEND);
  var initialEditorHeight = $(Selector.EMOJIONEAREA_EDITOR).outerHeight();
  var $chatContent = $(Selector.CARD_CHAT_CONTENT);
  var $scrollArea = $(Selector.CHAT_CONTENT_SCROLL_AREA);
  var $currentChatArea = document.querySelector(Selector.CHAT_CONTENT_SCROLL_AREA); // Set chat scrollbar area height

  var setChatAreaHeight = function setChatAreaHeight(chatContentArea, editorAreaHeight) {
    var chatContentHeight = chatContentArea.height();
    var calculated = chatContentHeight - editorAreaHeight;
    var chatContentHeaderHeight = $(Selector.CHAT_CONTENT_HEADER_ACTIVE).outerHeight();
    var chatArea = chatContentArea.find(Selector.CHAT_CONTENT_SCROLL_AREA_ACTIVE);
    chatArea.css({
      height: calculated - chatContentHeaderHeight
    });
  }; // Set scrollbar position


  var setScrollbarPosition = function setScrollbarPosition($chatArea) {
    if ($chatArea) {
      var scrollArea = $chatArea;
      scrollArea.scrollTop = $chatArea.scrollHeight;
    }
  };

  setTimeout(function () {
    setScrollbarPosition($currentChatArea);
  }, 700);
  utils.$document.on(Event.CLICK, Selector.CHAT_CONTACT, function (e) {
    var $this = $(e.currentTarget); // Hide contact list sidebar on responsive

    utils.$window.width() < 768 && $chatSidebar.removeClass(ClassName.LEFT_0); // Remove unread-message class when read

    $this.hasClass(ClassName.UNREAD_MESSAGE) && $this.removeClass(ClassName.UNREAD_MESSAGE);
  });
  $chatContact.on(Event.SHOWN_BS_TAB, function (e) {
    var $this = $(e.currentTarget);
    var $tab = $this.data(DATA_KEY.TARGET);
    $chatEmojiarea.length && $chatEmojiarea[0].emojioneArea.setText('');
    var editorHeight = $(Selector.EMOJIONEAREA_EDITOR).outerHeight();
    setChatAreaHeight($chatContent, editorHeight);
    $chatIcons.removeAttr(Attribute.STYLE);
    $btnSend.removeClass(ClassName.TEXT_PRIMARY); // Set scrollbar position on bottom

    var $chatArea = document.querySelector($tab + " " + Selector.CHAT_CONTENT_SCROLL_AREA);
    setScrollbarPosition($chatArea);
  }); // Detect keyup event on EmojioneArea Editor

  if ($chatEmojiarea.length) {
    $chatEmojiarea[0].emojioneArea.on(Event.KEYUP + " " + Event.EMOJI_BTN_CLIK, function ($editor) {
      var textLength = $editor.text().trim().length;
      var _$editor$ = $editor[0],
        offsetWidth = _$editor$.offsetWidth,
        clientWidth = _$editor$.clientWidth;
      var currentEditorHeight = $editor.outerHeight();
      var emojiLength = $editor.find('img').length; // Change color of submit button on keyup

      textLength || emojiLength ? $btnSend.addClass(ClassName.TEXT_PRIMARY) : $btnSend.removeClass(ClassName.TEXT_PRIMARY);

      if (currentEditorHeight !== initialEditorHeight) {
        setChatAreaHeight($chatContent, currentEditorHeight); // Set scrollbar position on bottom

        var tabContentId = $chatContent.find(Selector.CARD_CHAT_PANE_ACTIVE).attr('id');
        var $chatArea = document.querySelector("#" + tabContentId + " " + Selector.CHAT_CONTENT_SCROLL_AREA);
        setScrollbarPosition($chatArea);
      } // Align file upload and send icons when editor overflow scroll


      $chatIcons.css({
        marginRight: offsetWidth === clientWidth ? 0 : '1rem'
      });
      initialEditorHeight = currentEditorHeight;
    });
  } // Open conversation info sidebar


  utils.$document.on(Event.CLICK, Selector.BTN_INFO, function (e) {
    var $this = $(e.currentTarget);
    var dataIndex = $this.data(DATA_KEY.INDEX);
    var $info = $(Selector.CONVERSATION_INFO + "[data-" + DATA_KEY.INDEX + "='" + dataIndex + "']");
    $info.toggleClass(ClassName.SHOW);
  }); // Show contact list sidebar on responsive

  utils.$document.on(Event.CLICK, Selector.CONTACTS_LIST_SHOW, function () {
    $chatSidebar.addClass(ClassName.LEFT_0);
  }); // Set scrollbar area height on resize

  utils.$window.on(Event.RESIZE, function () {
    if ($scrollArea.length) {
      var editorCurrentHeight = $(Selector.EMOJIONEAREA_EDITOR).outerHeight();
      setChatAreaHeight($chatContent, editorCurrentHeight);
      var chatArea = document.querySelector(Selector.CHAT_CONTENT_SCROLL_AREA_ACTIVE);
      setScrollbarPosition(chatArea);
    }
  });
});
/*-----------------------------------------------
|   Copy link
-----------------------------------------------*/

utils.$document.ready(function () {
  $('#copyLinkModal').on('shown.bs.modal', function () {
    $('.invitation-link').focus().select();
  });
  utils.$document.on('click', '[data-copy]', function (e) {
    var $this = $(e.currentTarget);
    var targetID = $this.data('copy');
    $(targetID).focus().select();
    document.execCommand('copy');
    $this.attr('title', 'Copied!').tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle');
  });
});
/*-----------------------------------------------
|   Count Up
-----------------------------------------------*/

utils.$document.ready(function () {
  var $counters = $('[data-countup]');

  if ($counters.length) {
    $counters.each(function (index, value) {
      var $counter = $(value);
      var counter = $counter.data('countup');

      var toAlphanumeric = function toAlphanumeric(num) {
        var number = num;
        var abbreviations = {
          k: 1000,
          m: 1000000,
          b: 1000000000,
          t: 1000000000000
        };

        if (num < abbreviations.m) {
          number = (num / abbreviations.k).toFixed(2) + "k";
        } else if (num < abbreviations.b) {
          number = (num / abbreviations.m).toFixed(2) + "m";
        } else if (num < abbreviations.t) {
          number = (num / abbreviations.b).toFixed(2) + "b";
        } else {
          number = (num / abbreviations.t).toFixed(2) + "t";
        }

        return number;
      };

      var toComma = function toComma(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };

      var toSpace = function toSpace(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      };

      var playCountUpTriggered = false;

      var countUP = function countUP() {
        if (utils.isScrolledIntoView(value) && !playCountUpTriggered) {
          if (!playCountUpTriggered) {
            $({
              countNum: 0
            }).animate({
              countNum: counter.count
            }, {
              duration: counter.duration || 1000,
              easing: 'linear',
              step: function step() {
                $counter.text((counter.prefix ? counter.prefix : '') + Math.floor(this.countNum));
              },
              complete: function complete() {
                switch (counter.format) {
                  case 'comma':
                    $counter.text((counter.prefix ? counter.prefix : '') + toComma(this.countNum));
                    break;

                  case 'space':
                    $counter.text((counter.prefix ? counter.prefix : '') + toSpace(this.countNum));
                    break;

                  case 'alphanumeric':
                    $counter.text((counter.prefix ? counter.prefix : '') + toAlphanumeric(this.countNum));
                    break;

                  default:
                    $counter.text((counter.prefix ? counter.prefix : '') + this.countNum);
                }
              }
            });
            playCountUpTriggered = true;
          }
        }

        return playCountUpTriggered;
      };

      countUP();
      utils.$window.scroll(function () {
        countUP();
      });
    });
  }
});
/*-----------------------------------------------
|   Data table
-----------------------------------------------*/

utils.$document.ready(function () {
  var dataTables = $('.data-table');

  var customDataTable = function customDataTable(elem) {
    elem.find('.pagination').addClass('pagination-sm');
  };

  dataTables.length && dataTables.each(function (index, value) {
    var $this = $(value);
    var options = $.extend({
      responsive: true,
      dom: "<'row mx-1'<'col-sm-12 col-md-6 px-3'l><'col-sm-12 col-md-6 px-3'f>>" + "<'table-responsive'tr>" + "<'row mx-1 align-items-center justify-content-center justify-content-md-between'<'col-auto mb-2 mb-sm-0'i><'col-auto'p>>"
    }, $this.data('options'));
    $this.DataTable(options);
    var $wrpper = $this.closest('.dataTables_wrapper');
    customDataTable($wrpper);
    $this.on('draw.dt', function () {
      return customDataTable($wrpper);
    });
  });
});
/*-----------------------------------------------
|   Countdown
-----------------------------------------------*/

utils.$document.ready(function () {
  var $dataCountdowns = $('[data-countdown]');
  var DATA_KEY = {
    FALLBACK: 'countdown-fallback',
    COUNTDOWN: 'countdown'
  };

  if ($dataCountdowns.length) {
    $dataCountdowns.each(function (index, value) {
      var $dateCountdown = $(value);
      var date = $dateCountdown.data(DATA_KEY.COUNTDOWN);
      var fallback;

      if (typeof $dateCountdown.data(DATA_KEY.FALLBACK) !== typeof undefined) {
        fallback = $dateCountdown.data(DATA_KEY.FALLBACK);
      }

      $dateCountdown.countdown(date, function (event) {
        if (event.elapsed) {
          $dateCountdown.text(fallback);
        } else {
          $dateCountdown.text(event.strftime('%D days %H:%M:%S'));
        }
      });
    });
  }
});
/*-----------------------------------------------
|   Demo mode
-----------------------------------------------*/

utils.$document.ready(function () {
  var _window = window,
    location = _window.location;
  var Event = {
    CHANGE: 'change'
  };
  var Selector = {
    RTL: '#mode-rtl',
    FLUID: '#mode-fluid',
    INPUT_NAVBAR: "input[name='navbar']",
    INPUT_COLOR_SCHEME: "input[name='colorScheme']",
    NAVBAR_STYLE_TRANSPARENT: '#navbar-style-transparent',
    NAVBAR_STYLE_INVERTED: '#navbar-style-inverted',
    NAVBAR_STYLE_VIBRANT: '#navbar-style-vibrant',
    NAVBAR_STYLE_WHITE: '#navbar-style-card'
  };
  var DATA_KEY = {
    URL: 'url',
    HOME_URL: 'home-url',
    PAGE_URL: 'page-url'
  }; // Redirect on Checkbox change

  var handleChange = function handleChange(selector) {
    utils.$document.on(Event.CHANGE, selector, function (e) {
      var $this = $(e.currentTarget);
      var isChecked = $this.prop('checked');

      if (isChecked) {
        var url = $this.data(DATA_KEY.URL);
        location.replace(url);
      } else {
        var homeUrl = $this.data(DATA_KEY.HOME_URL);
        location.replace(homeUrl);
      }
    });
  };

  var handleInputChange = function handleInputChange(selector) {
    utils.$document.on(Event.CHANGE, selector, function (e) {
      var $this = $(e.currentTarget);
      var pageUrl = $this.data(DATA_KEY.PAGE_URL);
      location.replace(pageUrl);
    });
  }; // Mode checkbox handler


  handleChange(Selector.RTL);
  handleChange(Selector.FLUID);
  handleInputChange(Selector.INPUT_NAVBAR);
  handleInputChange(Selector.INPUT_COLOR_SCHEME);
  handleInputChange(Selector.NAVBAR_STYLE_TRANSPARENT);
  handleInputChange(Selector.NAVBAR_STYLE_INVERTED);
  handleInputChange(Selector.NAVBAR_STYLE_VIBRANT);
  handleInputChange(Selector.NAVBAR_STYLE_WHITE);
});
/*-----------------------------------------------
|   Documentation and Component Navigation
-----------------------------------------------*/

utils.$document.ready(function () {
  var $componentNav = $('#components-nav');

  if ($componentNav.length) {
    var loc = window.location.href;

    var _loc$split = loc.split('#');

    loc = _loc$split[0];
    var location = loc.split('/');
    var url = location[location.length - 2] + "/" + location.pop();
    var urls = $componentNav.children('li').children('a');

    for (var i = 0, max = urls.length; i < max; i += 1) {
      var dom = urls[i].href.split('/');
      var domURL = dom[dom.length - 2] + "/" + dom.pop();

      if (domURL === url) {
        var $targetedElement = $(urls[i]);
        $targetedElement.removeClass('text-800');
        $targetedElement.addClass('font-weight-medium');
        break;
      }
    }
  }
});
/*-----------------------------------------------
|   Draggable
-----------------------------------------------*/

utils.$document.ready(function () {
  var Selectors = {
    BODY: 'body',
    KANBAN_CONTAINER: '.kanban-container',
    KANBAN_ITEMS_CONTAINER: '.kanban-items-container',
    KANBAN_ITEM: '.kanban-item',
    KANBAN_COLLAPSE: "[data-collapse='kanban']",
    PS_RAILS: '.ps__rail-x, .ps__rail-y' // Perfect scrollbar rails in IE

  };
  var Events = {
    DRAG_START: 'drag:start',
    DRAG_STOP: 'drag:stop'
  };
  var columns = document.querySelectorAll(Selectors.KANBAN_ITEMS_CONTAINER);
  var container = document.querySelector(Selectors.KANBAN_CONTAINER);
  var scrollItems = $(Selectors.KANBAN_ITEMS_CONTAINER);
  var scrollableElements = [];
  scrollItems.each(function (index, item) {
    scrollableElements[index] = item;
  });

  if (columns.length) {
    // Initialize Sortable
    var sortable = new window.Draggable.Sortable(columns, {
      draggable: Selectors.KANBAN_ITEM,
      delay: 200,
      mirror: {
        appendTo: Selectors.BODY,
        constrainDimensions: true
      },
      scrollable: {
        draggable: Selectors.KANBAN_ITEM,
        scrollableElements: [].concat(scrollableElements, [container])
      }
    }); // Hide form when drag start

    sortable.on(Events.DRAG_START, function () {
      $(Selectors.KANBAN_COLLAPSE).collapse('hide');
    }); // Place forms and other contents bottom of the sortable container

    sortable.on(Events.DRAG_STOP, function (e) {
      var $this = $(e.data.source);
      var $itemContainer = $this.closest(Selectors.KANBAN_ITEMS_CONTAINER);
      var $collapse = $this.closest(Selectors.KANBAN_ITEMS_CONTAINER).find(Selectors.KANBAN_COLLAPSE);
      $this.is(':last-child') && $itemContainer.append($collapse); // For IE

      if (window.is.ie()) {
        var $rails = $itemContainer.find(Selectors.PS_RAILS);
        $itemContainer.append($rails);
      }
    });
  }
});


/*-----------------------------------------------
|   On page scroll for #id targets
-----------------------------------------------*/

utils.$document.ready(function ($) {
  $('a[data-fancyscroll]').click(function scrollTo(e) {
    // const $this = $(e.currentTarget);
    var $this = $(this);

    if (utils.location.pathname === $this[0].pathname && utils.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && utils.location.hostname === this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - ($this.data('offset') || 0)
        }, 400, 'swing', function () {
          var hash = $this.attr('href');
          window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
        });
        return false;
      }
    }

    return true;
  });
  var hash = window.location.hash;

  if (hash && document.getElementById(hash.slice(1))) {
    var $this = $(hash);
    $('html,body').animate({
      scrollTop: $this.offset().top - $("a[href='" + hash + "']").data('offset')
    }, 400, 'swing', function () {
      window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
    });
  }
});
/*-----------------------------------------------
|   File Input
-----------------------------------------------*/

utils.$document.ready(function () {
  $('.custom-file-input').on('change', function (e) {
    var $this = $(e.currentTarget);
    var fileName = $this.val().split('\\').pop();
    $this.next('.custom-file-label').addClass('selected').html(fileName);
  });
});
/*-----------------------------------------------
|   Flatpickr
-----------------------------------------------*/

utils.$document.ready(function () {
  var datetimepicker = $('.datetimepicker');
  datetimepicker.length && datetimepicker.each(function (index, value) {
    var $this = $(value);
    var options = $.extend({
      dateFormat: 'd/m/y',
      disableMobile: true
    }, $this.data('options'));
    $this.flatpickr(options);
  });
});
/*-----------------------------------------------
|   Bootstrap validation
-----------------------------------------------*/

utils.$document.ready(function () {
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply theme Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation'); // Loop over them and prevent submission

    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  }, false);
});

/*-----------------------------------------------
|   Modal
-----------------------------------------------*/

utils.$document.ready(function () {
  var Selector = {
    MODAL_THEME: '.modal-theme'
  };
  var DataKey = {
    OPTIONS: 'options'
  };
  var Events = {
    HIDDEN_BS_MODAL: 'hidden.bs.modal'
  };
  var modals = $(Selector.MODAL_THEME);
  var showModal = true;

  if (modals.length) {
    modals.each(function (index, value) {
      var $this = $(value);
      var userOptions = $this.data(DataKey.OPTIONS);
      var options = $.extend({
        autoShow: false,
        autoShowDelay: 0,
        showOnce: false
      }, userOptions);

      if (options.showOnce) {
        var modal = utils.getCookie('modal');
        showModal = modal === null;
      }

      if (options.autoShow && showModal) {
        setTimeout(function () {
          $this.modal('show');
        }, options.autoShowDelay);
      }
    });
  }

  $(Selector.MODAL_THEME).on(Events.HIDDEN_BS_MODAL, function (e) {
    var $this = $(e.currentTarget);
    var userOptions = $this.data(DataKey.OPTIONS);
    var options = $.extend({
      cookieExpireTime: 7200000,
      showOnce: false
    }, userOptions);
    options.showOnce && utils.setCookie('modal', false, options.cookieExpireTime);
  });
});
/*-----------------------------------------------
|   Navbar Top
-----------------------------------------------*/

utils.$document.ready(function () {
  var Selectors = {
    COLLAPSE: '.collapse',
    NAVBAR_NAV: '.navbar-nav',
    NAVBAR_TOP_COMBO: '.navbar-top-combo',
    NAVBAR_VERTICAL: '.navbar-vertical',
    NAVBAR_VERTICAL_DIVIDER: '.navbar-vertical-divider',
    NAVBAR_TOP_COMBO_COLLAPSE: '.navbar-top-combo .collapse',
    MOVEABLE_CONTENT: '[data-move-container]'
  };
  var CLASS_NAME = {
    FLEX_COLUMN: 'flex-column'
  };
  var DATA_KEYS = {
    MOVE_TARGET: 'move-target'
  };
  var $navbarTop = $(Selectors.NAVBAR_TOP_COMBO);
  var $navbarVertical = $(Selectors.NAVBAR_VERTICAL);
  var navbarTopBreakpoint = utils.getBreakpoint($navbarTop);
  var navbarVertcicalBreakpoint = utils.getBreakpoint($navbarVertical);

  var moveNavContent = function moveNavContent(width) {
    if (width < navbarTopBreakpoint) {
      var $navbarTopCollapse = $navbarTop.find(Selectors.COLLAPSE);
      var navbarTopContent = $navbarTopCollapse.html();

      if (navbarTopContent) {
        $navbarTopCollapse.html('');
        var divider = "<div class='navbar-vertical-divider'><hr class='navbar-vertical-hr' /></div>";
        navbarTopContent = "<div data-move-container>" + divider + navbarTopContent + "</div>";
        var targetID = $navbarTop.data(DATA_KEYS.MOVE_TARGET);
        $(navbarTopContent).insertAfter(targetID);
        navbarTopBreakpoint > navbarVertcicalBreakpoint && $(Selectors.MOVEABLE_CONTENT).find(Selectors.NAVBAR_NAV).addClass(CLASS_NAME.FLEX_COLUMN);
      }
    } else {
      var $container = $(Selectors.MOVEABLE_CONTENT);
      var $navbarNav = $container.find(Selectors.NAVBAR_NAV);
      $navbarNav.hasClass(CLASS_NAME.FLEX_COLUMN) && $navbarNav.removeClass(CLASS_NAME.FLEX_COLUMN);
      $container.find(Selectors.NAVBAR_VERTICAL_DIVIDER).remove();
      var content = $container.html();
      $container.remove();
      $(Selectors.NAVBAR_TOP_COMBO_COLLAPSE).html(content);
    }
  };

  moveNavContent(utils.$window.outerWidth());
  utils.$window.on('resize', function () {
    moveNavContent(utils.$window.outerWidth());
  });
});
/*-----------------------------------------------
|   Navbar
-----------------------------------------------*/

utils.$document.ready(function () {
  var $window = utils.$window;
  var navDropShadowFlag = true;
  var ClassName = {
    SHOW: 'show',
    NAVBAR_GLASS_SHADOW: 'navbar-glass-shadow',
    NAVBAR_VERTICAL_COLLAPSED: 'navbar-vertical-collapsed',
    NAVBAR_VERTICAL_COLLAPSE_HOVER: 'navbar-vertical-collapsed-hover'
  };
  var Selector = {
    HTML: 'html',
    NAVBAR: '.navbar:not(.navbar-vertical)',
    NAVBAR_VERTICAL: '.navbar-vertical',
    NAVBAR_VERTICAL_TOGGLE: '.navbar-vertical-toggle',
    NAVBAR_VERTICAL_COLLAPSE: '#navbarVerticalCollapse',
    NAVBAR_VERTICAL_CONTENT: '.navbar-vertical-content',
    NAVBAR_VERTICAL_COLLAPSED: '.navbar-vertical-collapsed',
    NAVBAR_VERTICAL_DROPDOWN_NAV: '.navbar-vertical .navbar-collapse .nav',
    NAVBAR_VERTICAL_COLLAPSED_DROPDOWN_NAV: '.navbar-vertical-collapsed .navbar-vertical .navbar-collapse .nav',
    MAIN_CONTENT: '.main .content',
    NAVBAR_TOP: '.navbar-top',
    OWL_CAROUSEL: '.owl-carousel',
    ECHART_RESPONSIVE: '[data-echart-responsive]'
  };
  var Events = {
    LOAD_SCROLL: 'load scroll',
    SCROLL: 'scroll',
    CLICK: 'click',
    RESIZE: 'resize',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  var $html = $(Selector.HTML);
  var $navbar = $(Selector.NAVBAR);
  var $navbarVerticalCollapse = $(Selector.NAVBAR_VERTICAL_COLLAPSE);
  var $navbarVerticalContent = $(Selector.NAVBAR_VERTICAL_CONTENT);
  var navbarVertical = $(Selector.NAVBAR_VERTICAL);
  var breakPoint = utils.getBreakpoint(navbarVertical);

  var setDropShadow = function setDropShadow($elem) {
    if ($elem.scrollTop() > 0 && navDropShadowFlag) {
      $navbar.addClass(ClassName.NAVBAR_GLASS_SHADOW);
    } else {
      $navbar.removeClass(ClassName.NAVBAR_GLASS_SHADOW);
    }
  };

  $window.on(Events.LOAD_SCROLL, function () {
    return setDropShadow($window);
  });
  $navbarVerticalContent.on('scroll', function () {
    if ($window.width() < breakPoint) {
      navDropShadowFlag = true;
      setDropShadow($navbarVerticalContent);
    }
  });
  $navbarVerticalCollapse.on(Events.SHOW_BS_COLLAPSE, function () {
    if ($window.width() < breakPoint) {
      navDropShadowFlag = false;
      setDropShadow($window);
    }
  });
  $navbarVerticalCollapse.on(Events.HIDDEN_BS_COLLAPSE, function () {
    if ($navbarVerticalCollapse.hasClass(ClassName.SHOW) && $window.width() < breakPoint) {
      navDropShadowFlag = false;
    } else {
      navDropShadowFlag = true;
    }

    setDropShadow($window);
  }); // Expand or Collapse vertical navbar on mouse over and out

  $navbarVerticalCollapse.hover(function (e) {
    setTimeout(function () {
      if ($(e.currentTarget).is(':hover')) {
        $(Selector.NAVBAR_VERTICAL_COLLAPSED).addClass(ClassName.NAVBAR_VERTICAL_COLLAPSE_HOVER);
      }
    }, 100);
  }, function () {
    $(Selector.NAVBAR_VERTICAL_COLLAPSED).removeClass(ClassName.NAVBAR_VERTICAL_COLLAPSE_HOVER);
  }); // Set navbar top width from content

  var setNavbarWidth = function setNavbarWidth() {
    var contentWidth = $(Selector.MAIN_CONTENT).width() + 30;
    $(Selector.NAVBAR_TOP).outerWidth(contentWidth);
  }; // Toggle navbar vertical collapse on click


  utils.$document.on(Events.CLICK, Selector.NAVBAR_VERTICAL_TOGGLE, function (e) {
    // Set collapse state on localStorage
    var isNavbarVerticalCollapsed = JSON.parse(localStorage.getItem('isNavbarVerticalCollapsed'));
    localStorage.setItem('isNavbarVerticalCollapsed', !isNavbarVerticalCollapsed); // Toggle class

    $html.toggleClass(ClassName.NAVBAR_VERTICAL_COLLAPSED); // Set navbar top width

    setNavbarWidth(); // Refresh Echarts

    var $echarts = document.querySelectorAll(Selector.ECHART_RESPONSIVE);

    if ($echarts.length) {
      $.each($echarts, function (item, value) {
        if ($(value).data('echart-responsive')) {
          window.echarts.init(value).resize();
        }
      });
    }

    $(e.currentTarget).trigger('navbar.vertical.toggle');
  }); // Set navbar top width on window resize

  $window.on(Events.RESIZE, function () {
    setNavbarWidth();
  });
});
/*-----------------------------------------------
|   Cookie Notice
-----------------------------------------------*/

utils.$document.ready(function () {
  var Selector = {
    NOTICE: '.notice',
    DATA_TOGGLE_NOTICE: "[data-toggle='notice']"
  };
  var DataKeys = {
    OPTIONS: 'options'
  };
  var CookieNames = {
    COOKIE_NOTICE: 'cookieNotice'
  };
  var Events = {
    CLICK: 'click',
    HIDDEN_BS_TOAST: 'hidden.bs.toast'
  };
  var $notices = $(Selector.NOTICE);
  var defaultOptions = {
    autoShow: false,
    autoShowDelay: 0,
    showOnce: false,
    cookieExpireTime: 3600000
  };
  $notices.each(function (index, value) {
    var $this = $(value);
    var options = $.extend(defaultOptions, $this.data(DataKeys.OPTIONS));
    var cookieNotice;

    if (options.showOnce) {
      cookieNotice = utils.getCookie(CookieNames.COOKIE_NOTICE);
    }

    if (options.autoShow && cookieNotice === null) {
      setTimeout(function () {
        return $this.toast('show');
      }, options.autoShowDelay);
    }
  });
  $(Selector.NOTICE).on(Events.HIDDEN_BS_TOAST, function (e) {
    var $this = $(e.currentTarget);
    var options = $.extend(defaultOptions, $this.data(DataKeys.OPTIONS));
    options.showOnce && utils.setCookie(CookieNames.COOKIE_NOTICE, false, options.cookieExpireTime);
  });
  utils.$document.on(Events.CLICK, Selector.DATA_TOGGLE_NOTICE, function (e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    var $target = $($this.attr('href'));
    $target.hasClass('show') ? $target.toast('hide') : $target.toast('show');
  });
});
/*-----------------------------------------------
|   Owl Carousel
-----------------------------------------------*/

var $carousel = $('.owl-carousel');
utils.$document.ready(function () {
  if ($carousel.length) {
    var Selector = {
      ALL_TIMELINE: '*[data-zanim-timeline]',
      ACTIVE_ITEM: '.owl-item.active'
    };
    var owlZanim = {
      zanimTimeline: function zanimTimeline($el) {
        return $el.find(Selector.ALL_TIMELINE);
      },
      play: function play($el) {
        if (this.zanimTimeline($el).length === 0) return;
        $el.find(Selector.ACTIVE_ITEM + " > " + Selector.ALL_TIMELINE).zanimation(function (animation) {
          animation.play();
        });
      },
      kill: function kill($el) {
        if (this.zanimTimeline($el).length === 0) return;
        this.zanimTimeline($el).zanimation(function (animation) {
          animation.kill();
        });
      }
    };
    $carousel.each(function (index, value) {
      var $this = $(value);
      var options = $this.data('options') || {};
      utils.isRTL() && (options.rtl = true);
      options.navText || (options.navText = ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>']);
      options.touchDrag = true;
      $this.owlCarousel($.extend(options || {}, {
        onInitialized: function onInitialized(event) {
          owlZanim.play($(event.target));
        },
        onTranslate: function onTranslate(event) {
          owlZanim.kill($(event.target));
        },
        onTranslated: function onTranslated(event) {
          owlZanim.play($(event.target));
        }
      }));
    });
  }

  var $controllers = $('[data-owl-carousel-controller]');

  if ($controllers.length) {
    $controllers.each(function (index, value) {
      var $this = $(value);
      var $thumbs = $($this.data('owl-carousel-controller'));
      $thumbs.find('.owl-item:first-child').addClass('current');
      $thumbs.on('click', '.item', function (e) {
        var thumbIndex = $(e.target).parents('.owl-item').index();
        $('.owl-item').removeClass('current');
        $(e.target).parents('.owl-item').addClass('current');
        $this.trigger('to.owl.carousel', thumbIndex, 500);
      });
      $this.on('changed.owl.carousel', function (e) {
        var itemIndex = e.item.index;
        var item = itemIndex + 1;
        $('.owl-item').removeClass('current');
        $thumbs.find(".owl-item:nth-child(" + item + ")").addClass('current');
        $thumbs.trigger('to.owl.carousel', itemIndex, 500);
      });
    });
  } // Refresh owlCarousel


  $('.navbar-vertical-toggle').on('navbar.vertical.toggle', function () {
    $carousel.length && $carousel.owlCarousel('refresh');
  });
});

/* -------------------------------------------------------------------------- */

/*                             Autocomplete Search                            */

/* -------------------------------------------------------------------------- */

utils.$document.ready(function () {
  var Selectors = {
    DROPDOWN: '.dropdown',
    SEARCH_DISMISS: '[data-dismiss="search"]',
    DROPDOWN_TOGGLE: '[data-toggle="dropdown"]',
    SEARCH_BOX: '.search-box',
    SEARCH_INPUT: '.search-input',
    SEARCH_TOGGLE: '[data-toggle="search"]'
  };
  var Events = {
    CLICK: 'click',
    FOCUS: 'focus',
    SHOW_BS_DROPDOWN: 'show.bs.dropdown'
  };
  var $searchAreas = $(Selectors.SEARCH_BOX);

  var hideSearchSuggestion = function hideSearchSuggestion(searchArea) {
    var el = searchArea.querySelector(Selectors.SEARCH_TOGGLE);
    var dropdown = $(el).dropdown();
    dropdown == null ? void 0 : dropdown.dropdown('hide');
  };

  var hideAllSearchAreas = function hideAllSearchAreas() {
    $searchAreas.each(function (index, value) {
      return hideSearchSuggestion(value);
    });
  };

  $searchAreas.each(function (index, value) {
    var input = value.querySelector(Selectors.SEARCH_INPUT);
    var btnDropdownClose = value.querySelector(Selectors.SEARCH_DISMISS);
    input.addEventListener(Events.FOCUS, function () {
      hideAllSearchAreas();
      var el = value.querySelector(Selectors.SEARCH_TOGGLE);
      var dropdown = $(el).dropdown();
      dropdown.dropdown('show');
    });
    document.addEventListener(Events.CLICK, function (_ref) {
      var target = _ref.target;
      !value.contains(target) && hideSearchSuggestion(value);
    });
    btnDropdownClose && btnDropdownClose.addEventListener(Events.CLICK, function () {
      hideSearchSuggestion(value);
      input.value = '';
    });
  });
  $(Selectors.DROPDOWN).on(Events.SHOW_BS_DROPDOWN, function () {
    return hideAllSearchAreas();
  });
});
/*-----------------------------------------------
|   Select2
-----------------------------------------------*/

utils.$document.ready(function () {
  var select2 = $('.selectpicker');
  select2.length && select2.each(function (index, value) {
    var $this = $(value);
    var options = $.extend({
      theme: 'bootstrap4'
    }, $this.data('options'));
    $this.select2(options);
  });
});
/*
  global Stickyfill
*/