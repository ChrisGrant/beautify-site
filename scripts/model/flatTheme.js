module.exports = {
    "schemaVersion": "1.5",
    "id": "YTVK3rgVsT",
    "theme": {
        "buttonStyle": {
            "title": {
                "color": "#0000FF",
                "font": {
                    "family": "HelveticaNeue",
                    "size": 30,
                    "style": "Bold",
                    "name": "HelveticaNeue-Bold"
                }
            },
            "backgroundColor": "#1ABC9C",
            "titleShadow": {
                "color": "#AAAAAA",
                "offset": {
                    "x": 2.6,
                    "y": 1.4
                },
                "radius": 2
            },
            "stateSetters": [
                {
                    "propertyName": "backgroundColor",
                    "state": "highlighted",
                    "value": "#16A085"
                },
                {
                    "state": "highlighted",
                    "propertyName": "title",
                    "value": {
                        "color": "#FFFFFF",
                        "font": {
                            "family": "Helvetica",
                            "size": 15,
                            "style": "Bold",
                            "name": "Helvetica-Bold"
                        }
                    }
                }
            ]
        },
        "textFieldStyle": {
            "title": {
                "color": "#404E65",
                "font": {
                    "family": "HelveticaNeue",
                    "size": 0,
                    "style": "Bold",
                    "name": "HelveticaNeue-Bold"
                }
            },
            "backgroundColor": "#FFFFFF",
            "border": {
                "width": 2,
                "color": "#16A085",
                "cornerRadius": 6
            },
            "stateSetters": []
        },
        "viewControllerStyle": {
            "backgroundColor": "#EEEEEE",
            "stateSetters": []
        },
        "labelStyle": {
            "title": {
                "color": "#FF0000",
                "font": {
                    "family": "HelveticaNeue",
                    "size": 0,
                    "style": "Bold",
                    "name": "HelveticaNeue-Bold"
                }
            },
            "stateSetters": []
        },
        "switchStyle": {
            "onState": {
                "textStyle": {
                    "color": "#34495E",
                    "font": {
                        "family": "Helvetica",
                        "size": 0,
                        "style": "Bold",
                        "name": "Helvetica-Bold"
                    }
                },
                "text": "ON",
                "backgroundColor": "#34495E",
                "borderColor": "#FFFFFF",
                "textShadow": {
                    "color": "#006CAF",
                    "offset": {
                        "x": 0,
                        "y": -1
                    }
                }
            },
            "offState": {
                "textStyle": {
                    "color": "#FFFFFF",
                    "font": {
                        "family": "Helvetica",
                        "size": 0,
                        "style": "Bold",
                        "name": "Helvetica-Bold"
                    }
                },
                "text": "OFF",
                "backgroundColor": "#BDC3C7",
                "borderColor": "#FFFFFF"
            },
            "thumbBorder": {
                "width": 3,
                "color": "#34495E",
                "cornerRadius": 15
            },
            "highlightColor": "#00000000",
            "thumbBackgroundColor": "#1ABC9C",
            "border": {
                "width": 0,
                "color": "#FFFFFF",
                "cornerRadius": 15
            },
            "stateSetters": [
                {
                    "propertyName": "thumbBackgroundColor",
                    "state": "highlighted",
                    "value": "#DDDDDD"
                }
            ]
        },
        "navigationBarStyle": {
            "title": {
                "color": "#FFFFFF",
                "font": {
                    "family": "HelveticaNeue",
                    "size": 0,
                    "style": "Bold",
                    "name": "HelveticaNeue-Bold"
                }
            },
            "backgroundColor": "#2C3E50",
            "stateSetters": []
        },
        "tableViewCellStyle": {
            "title": {
                "color": "#404E64",
                "font": {
                    "family": "HelveticaNeue",
                    "size": 0,
                    "style": "Bold",
                    "name": "HelveticaNeue-Bold"
                }
            },
            "backgroundColor": "#FFFFFF",
            "border": {
                "width": 0,
                "color": "#555555",
                "cornerRadius": 0
            },
            "stateSetters": [
                {
                    "propertyName": "backgroundColor",
                    "state": "highlighted",
                    "value": "#DDDDDD"
                },
                {
                    "state": "highlighted",
                    "propertyName": "title",
                    "value": {
                        "color": "#FFFFFF",
                        "font": {
                            "family": "Helvetica",
                            "size": 0,
                            "style": "Bold",
                            "name": "Helvetica-Bold"
                        }
                    }
                }
            ]
        },
        "imageViewStyle": {
            "border": {
                "width": 3,
                "color": "#EEEEEE",
                "cornerRadius": 5
            },
            "backgroundColor": "#00000000",
            "stateSetters": []
        },
        "barButtonItemStyle": {
            "title": {
                "color": "#FFFFFF",
                "font": {
                    "family": "HelveticaNeue",
                    "size": 0,
                    "style": "Bold",
                    "name": "HelveticaNeue-Bold"
                }
            },
            "backgroundColor": "#1ABC9C",
            "border": {
                "width": 0,
                "color": "#00000000",
                "cornerRadius": 5
            },
            "stateSetters": []
        },
        "backButtonItemStyle": {
            "title": {
                "color": "#FFFFFF",
                "font": {
                    "family": "HelveticaNeue",
                    "size": 0,
                    "style": "Bold",
                    "name": "HelveticaNeue-Bold"
                }
            },
            "backgroundColor": "#1ABC9C",
            "border": {
                "width": 0,
                "color": "#FFFFFF",
                "cornerRadius": 5
            },
            "stateSetters": [
                {
                    "propertyName": "backgroundColor",
                    "state": "highlighted",
                    "value": "#16A085"
                }
            ]
        },
        "sliderStyle": {
            "barBorder": {
                "width": 0,
                "color": "#1ABC9C",
                "cornerRadius": 10
            },
            "thumbBorder": {
                "width": 0,
                "color": "#00000000",
                "cornerRadius": 25
            },
            "thumbBackgroundColor": "#16A085",
            "minimumTrackColor": "#1ABC9C",
            "maximumTrackColor": "#CCCCCC",
            "stateSetters": [
                {
                    "propertyName": "thumbBackgroundColor",
                    "state": "highlighted",
                    "value": "#DDDDDD"
                },
                {
                    "state": "highlighted",
                    "propertyName": "thumbBorder",
                    "value": {
                        "width": 5,
                        "color": "#CCCCCC",
                        "cornerRadius": 25
                    }
                }
            ]
        },
        "tabBarStyle": {
            "backgroundColor": "#00000000",
            "imageTintColor": "#00000000",
            "stateSetters": []
        }
    }
}
