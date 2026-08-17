/* Trio Public Garage - map data.
   EDIT THIS FILE to update stall photos and descriptions.
   Each stall has: label, type, photos[] (paths or URLs), description.
   Availability is NOT here - edit assets/availability.js for that.
   Do not change 'poly'/'lx'/'ly' (these position the stall on the map). */
window.GARAGE_DATA = {
  "meta": {
    "name": "Trio Public Garage",
    "level": "Level 1",
    "viewBox": [
      6,
      46,
      772,
      362
    ]
  },
  "types": {
    "standard": {
      "name": "Standard",
      "color": "#4a9d6e",
      "text": "#ffffff"
    },
    "compact": {
      "name": "Compact",
      "color": "#e0822e",
      "text": "#ffffff"
    },
    "subcompact": {
      "name": "Sub-Compact",
      "color": "#9b59b6",
      "text": "#ffffff"
    },
    "premium": {
      "name": "Premium",
      "color": "#fdc010",
      "text": "#231f20"
    },
    "ada": {
      "name": "ADA Accessible",
      "color": "#159bff",
      "text": "#ffffff"
    }
  },
  "footprint": [
    [
      528.5,
      62.0
    ],
    [
      726.0,
      62.0
    ],
    [
      726.0,
      367.0
    ],
    [
      188.0,
      366.0
    ],
    [
      33.0,
      221.0
    ],
    [
      210.0,
      62.0
    ],
    [
      493.9,
      62.0
    ]
  ],
  "footprintOpen": true,
  "rooms": [
    {
      "label": "ELECTRICAL RM.\nP1010",
      "x": 651,
      "y": 63,
      "w": 75,
      "h": 37,
      "ls": 4.6
    },
    {
      "label": "STAIR\n& ELEV.",
      "x": 562.0,
      "y": 179.6,
      "w": 51.0,
      "h": 26.4
    },
    {
      "label": "ELEV.\nLUBE",
      "x": 544.5,
      "y": 224.0,
      "w": 23.3,
      "h": 26.0,
      "ls": 3.8
    },
    {
      "label": "ELEC.\nMDFR",
      "x": 568.0,
      "y": 224.0,
      "w": 23.0,
      "h": 26.0,
      "ls": 3.8
    },
    {
      "label": "ELEC.\nRM.",
      "x": 590.8,
      "y": 224.0,
      "w": 23.2,
      "h": 26.0,
      "ls": 3.8
    },
    {
      "label": "STAIR\n& ELEV.",
      "x": 227.3,
      "y": 206.5,
      "w": 42.5,
      "h": 27.2
    },
    {
      "label": "TRASH",
      "x": 269.0,
      "y": 206.0,
      "w": 42.1,
      "h": 25.0,
      "ls": 4.4
    },
    {
      "label": "ELEC.\nRM.",
      "x": 284,
      "y": 231,
      "w": 27,
      "h": 31,
      "ls": 4.4
    },
    {
      "label": "H.C. W.C.",
      "x": 237.8,
      "y": 233.7,
      "w": 32.0,
      "h": 28.3,
      "ls": 4.4
    },
    {
      "label": "SPRINKLER\nRM.",
      "x": 681.0,
      "y": 318.0,
      "w": 46.0,
      "h": 49.0
    }
  ],
  "polyrooms": [
    {
      "label": "BICYCLE RACKS\n16 SPACES",
      "poly": [
        [
          170.5,
          312.6
        ],
        [
          179.2,
          323.0
        ],
        [
          201.6,
          329.1
        ],
        [
          199.2,
          364.6
        ],
        [
          188.0,
          366.0
        ],
        [
          150.9,
          331.8
        ]
      ],
      "lx": 181.6,
      "ly": 337.9,
      "ls": 4.4
    }
  ],
  "walls": [
    [
      [
        536.0,
        206.0
      ],
      [
        505.7,
        206.0
      ]
    ],
    [
      [
        537.0,
        107.0
      ],
      [
        537.0,
        163.0
      ]
    ],
    [
      [
        562.0,
        163.0
      ],
      [
        614.0,
        163.0
      ]
    ],
    [
      [
        614.0,
        163.0
      ],
      [
        614.0,
        257.0
      ]
    ],
    [
      [
        510.6,
        265.0
      ],
      [
        510.6,
        221.8
      ]
    ],
    [
      [
        510.6,
        221.8
      ],
      [
        333.0,
        221.8
      ]
    ],
    [
      [
        333.0,
        221.8
      ],
      [
        333.0,
        227.2
      ]
    ],
    [
      [
        614.0,
        257.0
      ],
      [
        510.6,
        255.6
      ]
    ],
    [
      [
        213.0,
        366.0
      ],
      [
        213.0,
        316.0
      ],
      [
        189.6,
        316.0
      ],
      [
        169.6,
        299.1
      ],
      [
        205.0,
        265.0
      ],
      [
        510.6,
        265.0
      ]
    ]
  ],
  "elevator": [
    [
      144.0,
      290.6
    ],
    [
      157.0,
      301.6
    ],
    [
      144.0,
      312.6
    ],
    [
      131.0,
      301.6
    ]
  ],
  "labels": [
    {
      "text": "FIRE RISER",
      "x": 543.5,
      "y": 135.8,
      "size": 5,
      "vertical": true
    },
    {
      "text": "P1012",
      "x": 700,
      "y": 323,
      "size": 4.4
    },
    {
      "text": "HW",
      "x": 676,
      "y": 246,
      "size": 4.0,
      "circle": true
    },
    {
      "text": "HW",
      "x": 683,
      "y": 90,
      "size": 4.0,
      "circle": true
    },
    {
      "text": "HW",
      "x": 716,
      "y": 90,
      "size": 4.0,
      "circle": true
    }
  ],
  "arrows": [
    {
      "x": 500,
      "y1": 66,
      "y2": 94,
      "dir": "down"
    },
    {
      "x": 520,
      "y1": 94,
      "y2": 66,
      "dir": "up"
    }
  ],
  "streets": [
    {
      "label": "Denny Way",
      "x": 92,
      "y": 118,
      "rot": -41,
      "size": 14
    },
    {
      "label": "Bay St.",
      "x": 758,
      "y": 300,
      "rot": 90,
      "size": 14
    },
    {
      "label": "Western Ave.",
      "x": 430,
      "y": 392,
      "rot": 0,
      "size": 14
    }
  ],
  "stalls": [
    {
      "num": 1,
      "label": "1P",
      "type": "premium",
      "poly": [
        [
          482.4,
          163
        ],
        [
          505.7,
          163
        ],
        [
          505.7,
          206
        ],
        [
          482.4,
          206
        ]
      ],
      "lx": 494.0,
      "ly": 184.5,
      "title": "Stall 1P",
      "description": "Premium stall (P). Wider than 8 feet or prime-location space with easy access.",
      "photos": [
        "photos/stall-01.jpg"
      ]
    },
    {
      "num": 2,
      "label": "2",
      "type": "standard",
      "poly": [
        [
          458.1,
          163
        ],
        [
          481.4,
          163
        ],
        [
          481.4,
          206
        ],
        [
          458.1,
          206
        ]
      ],
      "lx": 469.8,
      "ly": 184.5,
      "title": "Stall 2",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-02.jpg"
      ]
    },
    {
      "num": 3,
      "label": "3C",
      "type": "compact",
      "poly": [
        [
          433.8,
          163
        ],
        [
          457.1,
          163
        ],
        [
          457.1,
          206
        ],
        [
          433.8,
          206
        ]
      ],
      "lx": 445.5,
      "ly": 184.5,
      "title": "Stall 3C",
      "description": "Compact stall (C). Sized for smaller vehicles. Under 8 feet wide or shorter in length",
      "photos": [
        "photos/stall-03.jpg"
      ]
    },
    {
      "num": 4,
      "label": "4",
      "type": "standard",
      "poly": [
        [
          409.5,
          163
        ],
        [
          432.8,
          163
        ],
        [
          432.8,
          206
        ],
        [
          409.5,
          206
        ]
      ],
      "lx": 421.1,
      "ly": 184.5,
      "title": "Stall 4",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-04.jpg"
      ]
    },
    {
      "num": 5,
      "label": "5C",
      "type": "compact",
      "poly": [
        [
          385.2,
          163
        ],
        [
          408.5,
          163
        ],
        [
          408.5,
          206
        ],
        [
          385.2,
          206
        ]
      ],
      "lx": 396.9,
      "ly": 184.5,
      "title": "Stall 5C",
      "description": "Compact stall (C). Sized for smaller vehicles. Under 8 feet wide or shorter in length",
      "photos": [
        "photos/stall-05.jpg"
      ]
    },
    {
      "num": 6,
      "label": "6C",
      "type": "compact",
      "poly": [
        [
          360.9,
          163
        ],
        [
          384.2,
          163
        ],
        [
          384.2,
          206
        ],
        [
          360.9,
          206
        ]
      ],
      "lx": 372.5,
      "ly": 184.5,
      "title": "Stall 6C",
      "description": "Compact stall (C). Sized for smaller vehicles. Under 8 feet wide or shorter in length",
      "photos": [
        "photos/stall-06.jpg"
      ]
    },
    {
      "num": 7,
      "label": "7",
      "type": "standard",
      "poly": [
        [
          336.6,
          163
        ],
        [
          359.9,
          163
        ],
        [
          359.9,
          206
        ],
        [
          336.6,
          206
        ]
      ],
      "lx": 348.2,
      "ly": 184.5,
      "title": "Stall 7",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-07.jpg"
      ]
    },
    {
      "num": 8,
      "label": "8",
      "type": "standard",
      "poly": [
        [
          312.3,
          163
        ],
        [
          335.6,
          163
        ],
        [
          335.6,
          206
        ],
        [
          312.3,
          206
        ]
      ],
      "lx": 324.0,
      "ly": 184.5,
      "title": "Stall 8",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-08.jpg"
      ]
    },
    {
      "num": 9,
      "label": "9C",
      "type": "compact",
      "poly": [
        [
          288.0,
          163
        ],
        [
          311.3,
          163
        ],
        [
          311.3,
          206
        ],
        [
          288.0,
          206
        ]
      ],
      "lx": 299.6,
      "ly": 184.5,
      "title": "Stall 9C",
      "description": "Compact stall (C). Sized for smaller vehicles. Under 8 feet wide or shorter in length",
      "photos": [
        "photos/stall-09.jpg"
      ]
    },
    {
      "num": 10,
      "label": "10",
      "type": "standard",
      "poly": [
        [
          432.0,
          64
        ],
        [
          456.0,
          64
        ],
        [
          456.0,
          107
        ],
        [
          432.0,
          107
        ]
      ],
      "lx": 444.0,
      "ly": 85.5,
      "title": "Stall 10",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-10.jpg"
      ]
    },
    {
      "num": 11,
      "label": "11",
      "type": "standard",
      "poly": [
        [
          407.0,
          64
        ],
        [
          431.0,
          64
        ],
        [
          431.0,
          107
        ],
        [
          407.0,
          107
        ]
      ],
      "lx": 419.0,
      "ly": 85.5,
      "title": "Stall 11",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-11.jpg"
      ]
    },
    {
      "num": 12,
      "label": "12",
      "type": "standard",
      "poly": [
        [
          382.0,
          64
        ],
        [
          406.0,
          64
        ],
        [
          406.0,
          107
        ],
        [
          382.0,
          107
        ]
      ],
      "lx": 394.0,
      "ly": 85.5,
      "title": "Stall 12",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-12.jpg"
      ]
    },
    {
      "num": 13,
      "label": "13",
      "type": "standard",
      "poly": [
        [
          357.0,
          64
        ],
        [
          381.0,
          64
        ],
        [
          381.0,
          107
        ],
        [
          357.0,
          107
        ]
      ],
      "lx": 369.0,
      "ly": 85.5,
      "title": "Stall 13",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-13.jpg"
      ]
    },
    {
      "num": 14,
      "label": "14",
      "type": "standard",
      "poly": [
        [
          332.0,
          64
        ],
        [
          356.0,
          64
        ],
        [
          356.0,
          107
        ],
        [
          332.0,
          107
        ]
      ],
      "lx": 344.0,
      "ly": 85.5,
      "title": "Stall 14",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-14.jpg"
      ]
    },
    {
      "num": 15,
      "label": "15",
      "type": "standard",
      "poly": [
        [
          307.0,
          64
        ],
        [
          331.0,
          64
        ],
        [
          331.0,
          107
        ],
        [
          307.0,
          107
        ]
      ],
      "lx": 319.0,
      "ly": 85.5,
      "title": "Stall 15",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-15.jpg"
      ]
    },
    {
      "num": 16,
      "label": "16",
      "type": "standard",
      "poly": [
        [
          282.0,
          64
        ],
        [
          306.0,
          64
        ],
        [
          306.0,
          107
        ],
        [
          282.0,
          107
        ]
      ],
      "lx": 294.0,
      "ly": 85.5,
      "title": "Stall 16",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-16.jpg"
      ]
    },
    {
      "num": 17,
      "label": "17",
      "type": "standard",
      "poly": [
        [
          257.0,
          64
        ],
        [
          281.0,
          64
        ],
        [
          281.0,
          107
        ],
        [
          257.0,
          107
        ]
      ],
      "lx": 269.0,
      "ly": 85.5,
      "title": "Stall 17",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-17.jpg"
      ]
    },
    {
      "num": 18,
      "label": "18P",
      "type": "premium",
      "poly": [
        [
          232.0,
          64
        ],
        [
          256.0,
          64
        ],
        [
          256.0,
          107
        ],
        [
          232.0,
          107
        ]
      ],
      "lx": 244.0,
      "ly": 85.5,
      "title": "Stall 18P",
      "description": "Premium stall (P). Wider than 8 feet or prime-location space with easy access.",
      "photos": [
        "photos/stall-18.jpg"
      ]
    },
    {
      "num": 19,
      "label": "19P",
      "type": "premium",
      "poly": [
        [
          196,
          82
        ],
        [
          231,
          112
        ],
        [
          214,
          128
        ],
        [
          179,
          98
        ]
      ],
      "lx": 205.0,
      "ly": 105.0,
      "title": "Stall 19P",
      "description": "Premium stall (P). Wider than 8 feet or prime-location space with easy access.",
      "photos": [
        "photos/stall-19.jpg"
      ]
    },
    {
      "num": 20,
      "label": "20",
      "type": "standard",
      "poly": [
        [
          177,
          98
        ],
        [
          213,
          128
        ],
        [
          197,
          144
        ],
        [
          162,
          113
        ]
      ],
      "lx": 187.2,
      "ly": 120.8,
      "title": "Stall 20",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-20.jpg"
      ]
    },
    {
      "num": 21,
      "label": "21",
      "type": "standard",
      "poly": [
        [
          160,
          113
        ],
        [
          196,
          144
        ],
        [
          182,
          158
        ],
        [
          145,
          128
        ]
      ],
      "lx": 170.8,
      "ly": 135.8,
      "title": "Stall 21",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-21.jpg"
      ]
    },
    {
      "num": 22,
      "label": "22",
      "type": "standard",
      "poly": [
        [
          144,
          128
        ],
        [
          180,
          159
        ],
        [
          165,
          173
        ],
        [
          129,
          142
        ]
      ],
      "lx": 154.5,
      "ly": 150.5,
      "title": "Stall 22",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-22.jpg"
      ]
    },
    {
      "num": 23,
      "label": "23",
      "type": "standard",
      "poly": [
        [
          128,
          142
        ],
        [
          164,
          173
        ],
        [
          149,
          187
        ],
        [
          113,
          156
        ]
      ],
      "lx": 138.5,
      "ly": 164.5,
      "title": "Stall 23",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-23.jpg"
      ]
    },
    {
      "num": 24,
      "label": "24",
      "type": "standard",
      "poly": [
        [
          111,
          157
        ],
        [
          147,
          188
        ],
        [
          133,
          202
        ],
        [
          97,
          171
        ]
      ],
      "lx": 122.0,
      "ly": 179.5,
      "title": "Stall 24",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-24.jpg"
      ]
    },
    {
      "num": 25,
      "label": "25P",
      "type": "premium",
      "poly": [
        [
          95,
          171
        ],
        [
          131,
          203
        ],
        [
          116,
          217
        ],
        [
          80,
          186
        ]
      ],
      "lx": 105.5,
      "ly": 194.2,
      "title": "Stall 25P",
      "description": "Premium stall (P). Wider than 8 feet or prime-location space with easy access.",
      "photos": [
        "photos/stall-25.jpg"
      ]
    },
    {
      "num": 26,
      "label": "26P",
      "type": "premium",
      "poly": [
        [
          78,
          187
        ],
        [
          115,
          218
        ],
        [
          98,
          235
        ],
        [
          61,
          203
        ]
      ],
      "lx": 88.0,
      "ly": 210.8,
      "title": "Stall 26P",
      "description": "Premium stall (P). Wider than 8 feet or prime-location space with easy access.",
      "photos": [
        "photos/stall-26.jpg"
      ]
    },
    {
      "num": 27,
      "label": "27",
      "type": "ada",
      "poly": [
        [
          72.3,
          257.8
        ],
        [
          98.0,
          235.0
        ],
        [
          118.3,
          254.5
        ],
        [
          94.0,
          278.1
        ]
      ],
      "lx": 95.7,
      "ly": 256.4,
      "title": "Stall 27",
      "description": "ADA Accessible Stall",
      "photos": [
        "photos/stall-27.jpg"
      ]
    },
    {
      "num": 28,
      "label": "28P",
      "type": "premium",
      "poly": [
        [
          94.0,
          278.1
        ],
        [
          118.3,
          254.5
        ],
        [
          137.0,
          269.4
        ],
        [
          111.5,
          294.5
        ]
      ],
      "lx": 115.2,
      "ly": 274.1,
      "title": "Stall 28P",
      "description": "Premium stall (P). Wider than 8 feet or prime-location space with easy access.",
      "photos": [
        "photos/stall-28.jpg"
      ]
    },
    {
      "num": 29,
      "label": "29P",
      "type": "premium",
      "poly": [
        [
          220.0,
          316
        ],
        [
          243.5,
          316
        ],
        [
          243.5,
          363
        ],
        [
          220.0,
          363
        ]
      ],
      "lx": 231.8,
      "ly": 339.5,
      "title": "Stall 29P",
      "description": "Premium stall (P). Wider than 8 feet or prime-location space with easy access.",
      "photos": [
        "photos/stall-29.jpg"
      ]
    },
    {
      "num": 30,
      "label": "30",
      "type": "standard",
      "poly": [
        [
          244.2,
          316
        ],
        [
          267.7,
          316
        ],
        [
          267.7,
          363
        ],
        [
          244.2,
          363
        ]
      ],
      "lx": 255.9,
      "ly": 339.5,
      "title": "Stall 30",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-30.jpg"
      ]
    },
    {
      "num": 31,
      "label": "31",
      "type": "standard",
      "poly": [
        [
          268.4,
          316
        ],
        [
          291.9,
          316
        ],
        [
          291.9,
          363
        ],
        [
          268.4,
          363
        ]
      ],
      "lx": 280.1,
      "ly": 339.5,
      "title": "Stall 31",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-31.jpg"
      ]
    },
    {
      "num": 32,
      "label": "32",
      "type": "standard",
      "poly": [
        [
          292.6,
          316
        ],
        [
          316.1,
          316
        ],
        [
          316.1,
          363
        ],
        [
          292.6,
          363
        ]
      ],
      "lx": 304.4,
      "ly": 339.5,
      "title": "Stall 32",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-32.jpg"
      ]
    },
    {
      "num": 33,
      "label": "33",
      "type": "standard",
      "poly": [
        [
          316.8,
          316
        ],
        [
          340.3,
          316
        ],
        [
          340.3,
          363
        ],
        [
          316.8,
          363
        ]
      ],
      "lx": 328.6,
      "ly": 339.5,
      "title": "Stall 33",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-33.jpg"
      ]
    },
    {
      "num": 34,
      "label": "34",
      "type": "standard",
      "poly": [
        [
          341.0,
          316
        ],
        [
          364.5,
          316
        ],
        [
          364.5,
          363
        ],
        [
          341.0,
          363
        ]
      ],
      "lx": 352.8,
      "ly": 339.5,
      "title": "Stall 34",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-34.jpg"
      ]
    },
    {
      "num": 35,
      "label": "35",
      "type": "standard",
      "poly": [
        [
          365.2,
          316
        ],
        [
          388.7,
          316
        ],
        [
          388.7,
          363
        ],
        [
          365.2,
          363
        ]
      ],
      "lx": 376.9,
      "ly": 339.5,
      "title": "Stall 35",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-35.jpg"
      ]
    },
    {
      "num": 36,
      "label": "36",
      "type": "standard",
      "poly": [
        [
          389.4,
          316
        ],
        [
          412.9,
          316
        ],
        [
          412.9,
          363
        ],
        [
          389.4,
          363
        ]
      ],
      "lx": 401.1,
      "ly": 339.5,
      "title": "Stall 36",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-36.jpg"
      ]
    },
    {
      "num": 37,
      "label": "37",
      "type": "standard",
      "poly": [
        [
          413.6,
          316
        ],
        [
          437.1,
          316
        ],
        [
          437.1,
          363
        ],
        [
          413.6,
          363
        ]
      ],
      "lx": 425.4,
      "ly": 339.5,
      "title": "Stall 37",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-37.jpg"
      ]
    },
    {
      "num": 38,
      "label": "38",
      "type": "standard",
      "poly": [
        [
          437.8,
          316
        ],
        [
          461.3,
          316
        ],
        [
          461.3,
          363
        ],
        [
          437.8,
          363
        ]
      ],
      "lx": 449.5,
      "ly": 339.5,
      "title": "Stall 38",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-38.jpg"
      ]
    },
    {
      "num": 39,
      "label": "39",
      "type": "standard",
      "poly": [
        [
          462.0,
          316
        ],
        [
          485.5,
          316
        ],
        [
          485.5,
          363
        ],
        [
          462.0,
          363
        ]
      ],
      "lx": 473.8,
      "ly": 339.5,
      "title": "Stall 39",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-39.jpg"
      ]
    },
    {
      "num": 40,
      "label": "40",
      "type": "standard",
      "poly": [
        [
          486.2,
          316
        ],
        [
          509.7,
          316
        ],
        [
          509.7,
          363
        ],
        [
          486.2,
          363
        ]
      ],
      "lx": 497.9,
      "ly": 339.5,
      "title": "Stall 40",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-40.jpg"
      ]
    },
    {
      "num": 41,
      "label": "41",
      "type": "standard",
      "poly": [
        [
          510.4,
          316
        ],
        [
          533.9,
          316
        ],
        [
          533.9,
          363
        ],
        [
          510.4,
          363
        ]
      ],
      "lx": 522.1,
      "ly": 339.5,
      "title": "Stall 41",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-41.jpg"
      ]
    },
    {
      "num": 42,
      "label": "42",
      "type": "standard",
      "poly": [
        [
          534.6,
          316
        ],
        [
          558.1,
          316
        ],
        [
          558.1,
          363
        ],
        [
          534.6,
          363
        ]
      ],
      "lx": 546.3,
      "ly": 339.5,
      "title": "Stall 42",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-42.jpg"
      ]
    },
    {
      "num": 43,
      "label": "43",
      "type": "standard",
      "poly": [
        [
          558.8,
          316
        ],
        [
          582.3,
          316
        ],
        [
          582.3,
          363
        ],
        [
          558.8,
          363
        ]
      ],
      "lx": 570.5,
      "ly": 339.5,
      "title": "Stall 43",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-43.jpg"
      ]
    },
    {
      "num": 44,
      "label": "44",
      "type": "standard",
      "poly": [
        [
          583.0,
          316
        ],
        [
          606.5,
          316
        ],
        [
          606.5,
          363
        ],
        [
          583.0,
          363
        ]
      ],
      "lx": 594.8,
      "ly": 339.5,
      "title": "Stall 44",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-44.jpg"
      ]
    },
    {
      "num": 45,
      "label": "45",
      "type": "standard",
      "poly": [
        [
          607.2,
          316
        ],
        [
          630.7,
          316
        ],
        [
          630.7,
          363
        ],
        [
          607.2,
          363
        ]
      ],
      "lx": 619.0,
      "ly": 339.5,
      "title": "Stall 45",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-45.jpg"
      ]
    },
    {
      "num": 46,
      "label": "46",
      "type": "standard",
      "poly": [
        [
          631.4,
          316
        ],
        [
          654.9,
          316
        ],
        [
          654.9,
          363
        ],
        [
          631.4,
          363
        ]
      ],
      "lx": 643.1,
      "ly": 339.5,
      "title": "Stall 46",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-46.jpg"
      ]
    },
    {
      "num": 47,
      "label": "47",
      "type": "standard",
      "poly": [
        [
          655.6,
          316
        ],
        [
          679.1,
          316
        ],
        [
          679.1,
          363
        ],
        [
          655.6,
          363
        ]
      ],
      "lx": 667.3,
      "ly": 339.5,
      "title": "Stall 47",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-47.jpg"
      ]
    },
    {
      "num": 48,
      "label": "48C",
      "type": "compact",
      "poly": [
        [
          333.0,
          226
        ],
        [
          356.3,
          226
        ],
        [
          356.3,
          265
        ],
        [
          333.0,
          265
        ]
      ],
      "lx": 344.6,
      "ly": 245.5,
      "title": "Stall 48C",
      "description": "Compact stall (C). Sized for smaller vehicles. Under 8 feet wide or shorter in length",
      "photos": [
        "photos/stall-48.jpg"
      ]
    },
    {
      "num": 49,
      "label": "49C",
      "type": "compact",
      "poly": [
        [
          357.3,
          226
        ],
        [
          380.6,
          226
        ],
        [
          380.6,
          265
        ],
        [
          357.3,
          265
        ]
      ],
      "lx": 369.0,
      "ly": 245.5,
      "title": "Stall 49C",
      "description": "Compact stall (C). Sized for smaller vehicles. Under 8 feet wide or shorter in length",
      "photos": [
        "photos/stall-49.jpg"
      ]
    },
    {
      "num": 50,
      "label": "50",
      "type": "standard",
      "poly": [
        [
          381.6,
          226
        ],
        [
          404.9,
          226
        ],
        [
          404.9,
          265
        ],
        [
          381.6,
          265
        ]
      ],
      "lx": 393.2,
      "ly": 245.5,
      "title": "Stall 50",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-50.jpg"
      ]
    },
    {
      "num": 51,
      "label": "51",
      "type": "standard",
      "poly": [
        [
          405.9,
          226
        ],
        [
          429.2,
          226
        ],
        [
          429.2,
          265
        ],
        [
          405.9,
          265
        ]
      ],
      "lx": 417.5,
      "ly": 245.5,
      "title": "Stall 51",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-51.jpg"
      ]
    },
    {
      "num": 52,
      "label": "52",
      "type": "standard",
      "poly": [
        [
          430.2,
          226
        ],
        [
          453.5,
          226
        ],
        [
          453.5,
          265
        ],
        [
          430.2,
          265
        ]
      ],
      "lx": 441.9,
      "ly": 245.5,
      "title": "Stall 52",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-52.jpg"
      ]
    },
    {
      "num": 53,
      "label": "53",
      "type": "standard",
      "poly": [
        [
          454.5,
          226
        ],
        [
          477.8,
          226
        ],
        [
          477.8,
          265
        ],
        [
          454.5,
          265
        ]
      ],
      "lx": 466.1,
      "ly": 245.5,
      "title": "Stall 53",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-53.jpg"
      ]
    },
    {
      "num": 54,
      "label": "54",
      "type": "ada",
      "poly": [
        [
          478.8,
          226
        ],
        [
          502.1,
          226
        ],
        [
          502.1,
          265
        ],
        [
          478.8,
          265
        ]
      ],
      "lx": 490.5,
      "ly": 245.5,
      "title": "Stall 54",
      "description": "ADA Accessible Stall",
      "photos": [
        "photos/stall-54.jpg"
      ]
    },
    {
      "num": 55,
      "label": "55",
      "type": "standard",
      "poly": [
        [
          670,
          297.7
        ],
        [
          721.0,
          297.7
        ],
        [
          721.0,
          316.4
        ],
        [
          670,
          316.4
        ]
      ],
      "lx": 695.5,
      "ly": 307.1,
      "title": "Stall 55",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-55.jpg"
      ]
    },
    {
      "num": 56,
      "label": "56",
      "type": "standard",
      "poly": [
        [
          670,
          276.4
        ],
        [
          721.0,
          276.4
        ],
        [
          721.0,
          295.1
        ],
        [
          670,
          295.1
        ]
      ],
      "lx": 695.5,
      "ly": 285.8,
      "title": "Stall 56",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-56.jpg"
      ]
    },
    {
      "num": 57,
      "label": "57",
      "type": "standard",
      "poly": [
        [
          670,
          255.1
        ],
        [
          721.0,
          255.1
        ],
        [
          721.0,
          273.8
        ],
        [
          670,
          273.8
        ]
      ],
      "lx": 695.5,
      "ly": 264.4,
      "title": "Stall 57",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-57.jpg"
      ]
    },
    {
      "num": 58,
      "label": "58C",
      "type": "compact",
      "poly": [
        [
          670,
          233.8
        ],
        [
          721.0,
          233.8
        ],
        [
          721.0,
          252.5
        ],
        [
          670,
          252.5
        ]
      ],
      "lx": 695.5,
      "ly": 243.2,
      "title": "Stall 58C",
      "description": "Compact stall (C). Sized for smaller vehicles. Under 8 feet wide or shorter in length",
      "photos": [
        "photos/stall-58.jpg"
      ]
    },
    {
      "num": 59,
      "label": "59",
      "type": "standard",
      "poly": [
        [
          670,
          212.5
        ],
        [
          721.0,
          212.5
        ],
        [
          721.0,
          231.2
        ],
        [
          670,
          231.2
        ]
      ],
      "lx": 695.5,
      "ly": 221.8,
      "title": "Stall 59",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-59.jpg"
      ]
    },
    {
      "num": 60,
      "label": "60",
      "type": "standard",
      "poly": [
        [
          670,
          191.2
        ],
        [
          721.0,
          191.2
        ],
        [
          721.0,
          209.9
        ],
        [
          670,
          209.9
        ]
      ],
      "lx": 695.5,
      "ly": 200.5,
      "title": "Stall 60",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-60.jpg"
      ]
    },
    {
      "num": 61,
      "label": "61",
      "type": "standard",
      "poly": [
        [
          670,
          169.9
        ],
        [
          721.0,
          169.9
        ],
        [
          721.0,
          188.6
        ],
        [
          670,
          188.6
        ]
      ],
      "lx": 695.5,
      "ly": 179.2,
      "title": "Stall 61",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-61.jpg"
      ]
    },
    {
      "num": 62,
      "label": "62",
      "type": "standard",
      "poly": [
        [
          670,
          148.6
        ],
        [
          721.0,
          148.6
        ],
        [
          721.0,
          167.3
        ],
        [
          670,
          167.3
        ]
      ],
      "lx": 695.5,
      "ly": 157.9,
      "title": "Stall 62",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-62.jpg"
      ]
    },
    {
      "num": 63,
      "label": "63",
      "type": "standard",
      "poly": [
        [
          670,
          127.3
        ],
        [
          721.0,
          127.3
        ],
        [
          721.0,
          146.0
        ],
        [
          670,
          146.0
        ]
      ],
      "lx": 695.5,
      "ly": 136.7,
      "title": "Stall 63",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-63.jpg"
      ]
    },
    {
      "num": 64,
      "label": "64",
      "type": "standard",
      "poly": [
        [
          670,
          106.0
        ],
        [
          721.0,
          106.0
        ],
        [
          721.0,
          124.7
        ],
        [
          670,
          124.7
        ]
      ],
      "lx": 695.5,
      "ly": 115.3,
      "title": "Stall 64",
      "description": "Standard-size stall. Comfortably fits most sedans, SUVs and crossovers. At least 8 feet wide",
      "photos": [
        "photos/stall-64.jpg",
        "photos/stall-64-2.jpg"
      ]
    },
    {
      "num": 65,
      "label": "65",
      "type": "ada",
      "poly": [
        [
          612.6,
          64
        ],
        [
          636.6,
          64
        ],
        [
          636.6,
          107
        ],
        [
          612.6,
          107
        ]
      ],
      "lx": 624.6,
      "ly": 85.5,
      "title": "Stall 65",
      "description": "ADA Accessible Stall",
      "photos": [
        "photos/stall-65.jpg"
      ]
    },
    {
      "num": 66,
      "label": "66SC",
      "type": "subcompact",
      "poly": [
        [
          587.4,
          64
        ],
        [
          611.4,
          64
        ],
        [
          611.4,
          107
        ],
        [
          587.4,
          107
        ]
      ],
      "lx": 599.4,
      "ly": 85.5,
      "title": "Stall 66SC",
      "description": "Sub-compact stall (SC). Best suited to small cars.",
      "photos": [
        "photos/stall-66.jpg"
      ]
    },
    {
      "num": 67,
      "label": "67C",
      "type": "compact",
      "poly": [
        [
          562.2,
          64
        ],
        [
          586.2,
          64
        ],
        [
          586.2,
          107
        ],
        [
          562.2,
          107
        ]
      ],
      "lx": 574.2,
      "ly": 85.5,
      "title": "Stall 67C",
      "description": "Compact stall (C). Sized for smaller vehicles. Under 8 feet wide or shorter in length",
      "photos": [
        "photos/stall-67.jpg"
      ]
    },
    {
      "num": 68,
      "label": "68C",
      "type": "compact",
      "poly": [
        [
          537.0,
          64
        ],
        [
          561.0,
          64
        ],
        [
          561.0,
          107
        ],
        [
          537.0,
          107
        ]
      ],
      "lx": 549.0,
      "ly": 85.5,
      "title": "Stall 68C",
      "description": "Compact stall (C). Sized for smaller vehicles. Under 8 feet wide or shorter in length",
      "photos": [
        "photos/stall-68.jpg"
      ]
    },
    {
      "num": 69,
      "label": "69SC",
      "type": "subcompact",
      "poly": [
        [
          536,
          163
        ],
        [
          562.0,
          163
        ],
        [
          562.0,
          206
        ],
        [
          536,
          206
        ]
      ],
      "lx": 549.0,
      "ly": 184.5,
      "title": "Stall 69SC",
      "description": "Sub-compact stall (SC). Best suited to small cars.",
      "photos": [
        "photos/stall-69.jpg"
      ]
    }
  ]
};
