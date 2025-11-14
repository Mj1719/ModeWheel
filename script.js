// Mode Wheel v12 — with Mode Family Selector Panel
// ------------------------------------------------

// ---------- Constants ----------
const NOTES = ["C","C♯/D♭","D","D♯/E♭","E","F","F♯/G♭","G","G♯/A♭","A","A♯/B♭","B"];
const INTERVALS = ["Root","m2","M2","m3","M3","P4","Tritone","P5","m6","M6","m7","M7"];

// Mode families with noteCount + familyIndex metadata
const MODE_FAMILIES = {
   "Diatonic": {
    familyIndex: 1, // -6 / +6 = 12
    noteCount: 7,
    names: ["Ionian","Dorian","Phrygian","Lydian","Mixolydian","Aeolian","Locrian"],
    sets: [
      [0,2,4,5,7,9,11], // +2
      [0,2,3,5,7,9,10], //  0
      [0,1,3,5,7,8,10], // -2
      [0,2,4,6,7,9,11], // +3
      [0,2,4,5,7,9,10], // +1
      [0,2,3,5,7,8,10], // -1
      [0,1,3,5,6,8,10]  // -3 (flattest)
    ]
  },

  "Melodic Minor": {
    familyIndex: 2, // -7 / +7 = 14
    noteCount: 7,
    names: [
      "Melodic Minor","Dorian ♭2","Lydian Augmented",
      "Lydian Dominant","Mixolydian ♭6","Locrian ♮2","Altered"
    ],
    sets: [
      [0,2,3,5,7,9,11], // +1
      [0,1,3,5,7,9,10], // -1
      [0,2,4,6,8,9,11], // +4
      [0,2,4,6,7,9,10], // +2
      [0,2,4,5,7,8,10], //  0
      [0,2,3,5,6,8,10], // -2
      [0,1,3,4,6,8,10]  // -4 (flattest)
    ]
  },

  "Harmonic Minor": {
    familyIndex: 3, // -8 / +8
    noteCount: 7,
    names: [
      "Harmonic Minor","Locrian ♮6","Ionian Augmented",
      "Dorian ♯4","Phrygian Dominant","Lydian +2","Altered o7"
    ],
    sets: [
      [0,2,3,5,7,8,11], //  0
      [0,1,3,5,6,9,10], // -2
      [0,2,4,5,8,9,11], // +3
      [0,2,3,6,7,9,10], // +1
      [0,1,4,5,7,8,10], // -1
      [0,3,4,6,7,9,11], // +4
      [0,1,3,4,6,8,9]   // -5 (flattest)
    ]
  },

  "Harmonic Major": {
    familyIndex: 4, // -8 / +8
    noteCount: 7,
    names: [
      "Harmonic Major","Dorian ♭5","Phrygian ♭4",
      "Lydian ♭3","Mixolydian ♭2","Lydian Augmented +2","Locrian o7"
    ],
    sets: [
      [0,2,4,5,7,8,11], // +1
      [0,2,3,5,6,9,10], // -1
      [0,1,3,4,7,8,10], // -3
      [0,2,3,6,7,9,11], // +2
      [0,1,4,5,7,9,10], //  0
      [0,3,4,6,8,9,11], // +5
      [0,1,3,5,6,8,9]   // -4 (flattest)
    ]
  },

  "Neopolitan Major": {
    familyIndex: 5, // -9 / +9
    noteCount: 7,
    names: [
      "Neopolitan Major","Lydian Augmented +6","Lydian Augmented b7",
      "Lydian b6 b7","Locrian ♮2 ♮3","Atlered ♮2","Altered o3"
    ],
    sets: [
      [0,1,3,5,7,9,11], //  0
      [0,2,4,6,8,10,11], // +5
      [0,2,4,6,8,9,10], // +3
      [0,2,4,6,7,8,10], // +1
      [0,2,4,5,6,8,10], // -1
      [0,2,3,4,6,8,10], // -3
      [0,1,2,4,6,8,10]  // -5 (flattest)
    ]
  },

  "Neopolitan Minor": {
    familyIndex: 6, // -9 / +9
    noteCount: 7,
    names: [
      "Neopolitan Minor","Lydian +6","Mixolydian Augmented",
      "Aeolian #4","Locrian Dominant","Ionian +2","Altered o3 o7"
    ],
    sets: [
      [0,1,3,5,7,8,11], // -1
      [0,2,4,6,7,10,11], // +4
      [0,2,4,5,8,9,10], // +2
      [0,2,3,6,7,8,10], //  0
      [0,1,4,5,6,8,10], // -2
      [0,3,4,5,7,9,11], // +3
      [0,1,2,4,6,8,9]   // -6 (flattest)
    ]
  },

  "Ionian b2": {
    familyIndex: 7, // -9 / +9
    noteCount: 7,
    names: [
      "Ionian b2","Lydian Augmented +2 +6","Phrygian o7",
      "Harmonic Lydian","Mixolydian b5","Aeolian b4","Locrian o3"
    ],
    sets: [
      [0,1,4,5,7,9,11], // +1
      [0,3,4,6,8,10,11], // +6
      [0,1,3,5,7,8,9],  // -3
      [0,2,4,6,7,8,11], // +2
      [0,2,4,5,6,9,10], //  0
      [0,2,3,4,7,8,10], // -2
      [0,1,2,5,6,8,10]  // -4 (flattest)
    ]
  },

  "Double Harmonic": {
    familyIndex: 8, // -10 / +10
    noteCount: 7,
    names: [
      "Double Harmonic","Lydian +2 +6","Phrygian b4 o7",
      "Lydian b3 b6","Locrian ♮3 ♮6","Ionian Augmented +2","Locrian o3 o7"
    ],
    sets: [
      [0,1,4,5,7,8,11], //  0
      [0,3,4,6,7,10,11], // +5
      [0,1,3,4,7,8,9],  // -4
      [0,2,3,6,7,8,11], // +1
      [0,1,4,5,6,9,10], // -1
      [0,3,4,5,8,9,11], // +4
      [0,1,2,5,6,8,9]   // -5 (flattest)
    ]
  },

  "Heptatonic 9": {
    familyIndex: 9, // -10 / +10
    noteCount: 7,
    names: ["Mode 1","Mode 2","Mode 3","Mode 4","Mode 5","Mode 6","Mode 7"],
    sets: [
      [0,2,3,5,6,8,11],  // -1
      [0,1,3,4,6,9,10],  // -3
      [0,2,3,5,8,9,11],  // +2
      [0,1,3,6,7,9,10],  //  0
      [0,2,5,6,8,9,11],  // +5
      [0,3,4,6,7,9,10],  // +3
      [0,1,3,4,6,7,9]    // -6 (flattest)
    ]
  },

  "Heptatonic 10": {
    familyIndex: 10, // -10 / +10
    noteCount: 7,
    names: ["Mode 1","Mode 2","Mode 3","Mode 4","Mode 5","Mode 6","Mode 7"],
    sets: [
      [0,2,3,5,6,9,11],  //  0
      [0,1,3,4,7,9,10],  // -2
      [0,2,3,6,8,9,11],  // +3
      [0,1,4,6,7,9,10],  // +1
      [0,3,5,6,8,9,11],  // +6
      [0,2,3,5,6,8,9],   // -3
      [0,1,3,4,6,7,10]   // -5 (flattest)
    ]
  },

  "Harmonic Locrian": {
    familyIndex: 11, // -10 / +10
    noteCount: 7,
    names: ["Harmonic Locrian","Mode 2","Mode 3","Mode 4","Mode 5","Mode 6","Mode 7"],
    sets: [
      [0,1,3,5,6,8,11],  // -2
      [0,2,4,5,7,10,11], // +3
      [0,2,3,5,8,9,10],  // +1
      [0,1,3,6,7,8,10],  // -1
      [0,2,5,6,7,9,11],  // +4
      [0,3,4,5,7,9,10],  // +2
      [0,1,2,4,6,7,9]    // -7 (flattest)
    ]
  },

  "Lydian b2": {
    familyIndex: 12, // -10 / +10
    noteCount: 7,
    names: ["Mode 1","Mode 2","Mode 3","Lydian b2","Mode 5","Mode 6","Mode 7"],
    sets: [
      [0,2,4,5,6,9,11],  // +1
      [0,2,3,4,7,9,10],  // -1
      [0,1,2,5,7,8,10],  // -3
      [0,1,4,6,7,9,11],  // +2
      [0,3,5,6,8,10,11], // +7
      [0,2,3,5,7,8,9],   // -2
      [0,1,3,5,6,7,10]   // -4 (flattest)
    ]
  },

   "Heptatonic 13": {
    familyIndex: 13, // -11 / +11 = 22
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,4,6,8,11], // -3,
      [0,2,3,5,7,10,11], // +2,
      [0,1,3,5,8,9,10], // +0,
      [0,2,4,7,8,9,11], // +5,
      [0,2,5,6,7,9,10], // +3,
      [0,3,4,5,7,8,10], // +1,
      [0,1,2,4,5,7,9], // -8 (flattest)
    ]
  },
  "Heptatonic 14": {
    familyIndex: 14, // -11 / +11 = 22
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,5,6,9,11], // -1,
      [0,2,4,5,8,10,11], // +4,
      [0,2,3,6,8,9,10], // +2,
      [0,1,4,6,7,8,10], // +0,
      [0,3,5,6,7,9,11], // +5,
      [0,2,3,4,6,8,9], // -4,
      [0,1,2,4,6,7,10], // -6 (flattest)
    ]
  },
  "Heptatonic 15": {
    familyIndex: 15, // -11 / +11 = 22
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,4,5,6,8,11], // +0,
      [0,2,3,4,6,9,10], // -2,
      [0,1,2,4,7,8,10], // -4,
      [0,1,3,6,7,9,11], // +1,
      [0,2,5,6,8,10,11], // +6,
      [0,3,4,6,8,9,10], // +4,
      [0,1,3,5,6,7,9], // -5 (flattest)
    ]
  },
  "Heptatonic 16": {
    familyIndex: 16, // -11 / +11 = 22
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,4,7,9,11], // +0,
      [0,1,2,5,7,9,10], // -2,
      [0,1,4,6,8,9,11], // +3,
      [0,3,5,7,8,10,11], // +8,
      [0,2,4,5,7,8,9], // -1,
      [0,2,3,5,6,7,10], // -3,
      [0,1,3,4,5,8,10], // -5 (flattest)
    ]
  },
  "Heptatonic 17": {
    familyIndex: 17, // -12 / +12 = 24
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,4,7,8,11], // -2,
      [0,2,3,6,7,10,11], // +3,
      [0,1,4,5,8,9,10], // +1,
      [0,3,4,7,8,9,11], // +6,
      [0,1,4,5,6,8,9], // -3,
      [0,3,4,5,7,8,11], // +2,
      [0,1,2,4,5,8,9], // -7 (flattest)
    ]
  },
  "Heptatonic 18": {
    familyIndex: 18, // -12 / +12 = 24
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,4,5,6,8,11], // -1,
      [0,3,4,5,7,10,11], // +4,
      [0,1,2,4,7,8,9], // -5,
      [0,1,3,6,7,8,11], // +0,
      [0,2,5,6,7,10,11], // +5,
      [0,3,4,5,8,9,10], // +3,
      [0,1,2,5,6,7,9], // -6 (flattest)
    ]
  },
  "Heptatonic 19": {
    familyIndex: 19, // -12 / +12 = 24
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,4,5,6,9,11], // +0,
      [0,3,4,5,8,10,11], // +5,
      [0,1,2,5,7,8,9], // -4,
      [0,1,4,6,7,8,11], // +1,
      [0,3,5,6,7,10,11], // +6,
      [0,2,3,4,7,8,9], // -3,
      [0,1,2,5,6,7,10], // -5 (flattest)
    ]
  },
  "Heptatonic 20": {
    familyIndex: 20, // -12 / +12 = 24
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,4,7,8,11], // -1,
      [0,1,2,5,6,9,10], // -3,
      [0,1,4,5,8,9,11], // +2,
      [0,3,4,7,8,10,11], // +7,
      [0,1,4,5,7,8,9], // -2,
      [0,3,4,6,7,8,11], // +3,
      [0,1,3,4,5,8,9], // -6 (flattest)
    ]
  },
  "Heptatonic 21": {
    familyIndex: 21, // -13 / +13 = 26
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,4,6,8,11], // -4,
      [0,1,3,5,7,10,11], // +1,
      [0,2,4,6,9,10,11], // +6,
      [0,2,4,7,8,9,10], // +4,
      [0,2,5,6,7,8,10], // +2,
      [0,3,4,5,6,8,10], // +0,
      [0,1,2,3,5,7,9], // -9 (flattest)
    ]
  },
  "Heptatonic 22": {
    familyIndex: 22, // -13 / +13 = 26
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,5,6,8,11], // -3,
      [0,1,4,5,7,10,11], // +2,
      [0,3,4,6,9,10,11], // +7,
      [0,1,3,6,7,8,9], // -2,
      [0,2,5,6,7,8,11], // +3,
      [0,3,4,5,6,9,10], // +1,
      [0,1,2,3,6,7,9], // -8 (flattest)
    ]
  },
  "Heptatonic 23": {
    familyIndex: 23, // -13 / +13 = 26
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,5,7,8,11], // -2,
      [0,1,4,6,7,10,11], // +3,
      [0,3,5,6,9,10,11], // +8,
      [0,2,3,6,7,8,9], // -1,
      [0,1,4,5,6,7,10], // -3,
      [0,3,4,5,6,9,11], // +2,
      [0,1,2,3,6,8,9], // -7 (flattest)
    ]
  },
  "Heptatonic 24": {
    familyIndex: 24, // -13 / +13 = 26
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,5,7,9,11], // -1,
      [0,1,4,6,8,10,11], // +4,
      [0,3,5,7,9,10,11], // +9,
      [0,2,4,6,7,8,9], // +0,
      [0,2,4,5,6,7,10], // -2,
      [0,2,3,4,5,8,10], // -4,
      [0,1,2,3,6,8,10], // -6 (flattest)
    ]
  },
  "Heptatonic 25": {
    familyIndex: 25, // -13 / +13 = 26
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,4,7,9,11], // -1,
      [0,2,3,6,8,10,11], // +4,
      [0,1,4,6,8,9,10], // +2,
      [0,3,5,7,8,9,11], // +7,
      [0,2,4,5,6,8,9], // -2,
      [0,2,3,4,6,7,10], // -4,
      [0,1,2,4,5,8,10], // -6 (flattest)
    ]
  },
  "Heptatonic 26": {
    familyIndex: 26, // -13 / +13 = 26
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,5,6,7,11], // -3,
      [0,2,4,5,6,10,11], // +2,
      [0,2,3,4,8,9,10], // +0,
      [0,1,2,6,7,8,10], // -2,
      [0,1,5,6,7,9,11], // +3,
      [0,4,5,6,8,10,11], // +8,
      [0,1,2,4,6,7,8], // -8 (flattest)
    ]
  },
  "Heptatonic 27": {
    familyIndex: 27, // -13 / +13 = 26
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,4,6,8,11], // -2,
      [0,1,2,4,6,9,10], // -4,
      [0,1,3,5,8,9,11], // +1,
      [0,2,4,7,8,10,11], // +6,
      [0,2,5,6,8,9,10], // +4,
      [0,3,4,6,7,8,10], // +2,
      [0,1,3,4,5,7,9], // -7 (flattest)
    ]
  },
  "Heptatonic 28": {
    familyIndex: 28, // -14 / +14 = 28
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,4,5,8,11], // -4,
      [0,2,3,4,7,10,11], // +1,
      [0,1,2,5,8,9,10], // -1,
      [0,1,4,7,8,9,11], // +4,
      [0,3,6,7,8,10,11], // +9,
      [0,3,4,5,7,8,9], // +0,
      [0,1,2,4,5,6,9], // -9 (flattest)
    ]
  },
  "Heptatonic 29": {
    familyIndex: 29, // -14 / +14 = 28
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,4,6,7,11], // -4,
      [0,2,3,5,6,10,11], // +1,
      [0,1,3,4,8,9,10], // -1,
      [0,2,3,7,8,9,11], // +4,
      [0,1,5,6,7,9,10], // +2,
      [0,4,5,6,8,9,11], // +7,
      [0,1,2,4,5,7,8], // -9 (flattest)
    ]
  },
  "Heptatonic 30": {
    familyIndex: 30, // -14 / +14 = 28
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,4,6,9,11], // -2,
      [0,2,3,5,8,10,11], // +3,
      [0,1,3,6,8,9,10], // +1,
      [0,2,5,7,8,9,11], // +6,
      [0,3,5,6,7,9,10], // +4,
      [0,2,3,4,6,7,9], // -5,
      [0,1,2,4,5,7,10], // -7 (flattest)
    ]
  },
  "Heptatonic 31": {
    familyIndex: 31, // -14 / +14 = 28
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,4,6,9,11], // -1,
      [0,1,2,4,7,9,10], // -3,
      [0,1,3,6,8,9,11], // +2,
      [0,2,5,7,8,10,11], // +7,
      [0,3,5,6,8,9,10], // +5,
      [0,2,3,5,6,7,9], // -4,
      [0,1,3,4,5,7,10], // -6 (flattest)
    ]
  },
  "Heptatonic 32": {
    familyIndex: 32, // -14 / +14 = 28
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,5,6,7,11], // -2,
      [0,1,3,4,5,9,10], // -4,
      [0,2,3,4,8,9,11], // +1,
      [0,1,2,6,7,9,10], // -1,
      [0,1,5,6,8,9,11], // +4,
      [0,4,5,7,8,10,11], // +9,
      [0,1,3,4,6,7,8], // -7 (flattest)
    ]
  },
  "Heptatonic 33": {
    familyIndex: 33, // -15 / +15 = 30
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,4,6,7,11], // -5,
      [0,1,3,5,6,10,11], // +0,
      [0,2,4,5,9,10,11], // +5,
      [0,2,3,7,8,9,10], // +3,
      [0,1,5,6,7,8,10], // +1,
      [0,4,5,6,7,9,11], // +6,
      [0,1,2,3,5,7,8], // -10 (flattest)
    ]
  },
  "Heptatonic 34": {
    familyIndex: 34, // -15 / +15 = 30
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,4,7,8,11], // -3,
      [0,1,3,6,7,10,11], // +2,
      [0,2,5,6,9,10,11], // +7,
      [0,3,4,7,8,9,10], // +5,
      [0,1,4,5,6,7,9], // -4,
      [0,3,4,5,6,8,11], // +1,
      [0,1,2,3,5,8,9], // -8 (flattest)
    ]
  },
  "Heptatonic 35": {
    familyIndex: 35, // -15 / +15 = 30
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,5,6,9,11], // -2,
      [0,1,4,5,8,10,11], // +3,
      [0,3,4,7,9,10,11], // +8,
      [0,1,4,6,7,8,9], // -1,
      [0,3,5,6,7,8,11], // +4,
      [0,2,3,4,5,8,9], // -5,
      [0,1,2,3,6,7,10], // -7 (flattest)
    ]
  },
  "Heptatonic 36": {
    familyIndex: 36, // -15 / +15 = 30
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,4,5,6,7,11], // -1,
      [0,2,3,4,5,9,10], // -3,
      [0,1,2,3,7,8,10], // -5,
      [0,1,2,6,7,9,11], // +0,
      [0,1,5,6,8,10,11], // +5,
      [0,4,5,7,9,10,11], // +10,
      [0,1,3,5,6,7,8], // -6 (flattest)
    ]
  },
  "Heptatonic 37": {
    familyIndex: 37, // -16 / +16 = 32
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,6,8,11], // -5,
      [0,1,2,5,7,10,11], // +0,
      [0,1,4,6,9,10,11], // +5,
      [0,3,5,8,9,10,11], // +10,
      [0,2,5,6,7,8,9], // +1,
      [0,3,4,5,6,7,10], // -1,
      [0,1,2,3,4,7,9], // -10 (flattest)
    ]
  },
  "Heptatonic 38": {
    familyIndex: 38, // -16 / +16 = 32
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,4,5,8,11], // -5,
      [0,1,3,4,7,10,11], // +0,
      [0,2,3,6,9,10,11], // +5,
      [0,1,4,7,8,9,10], // +3,
      [0,3,6,7,8,9,11], // +8,
      [0,3,4,5,6,8,9], // -1,
      [0,1,2,3,5,6,9], // -10 (flattest)
    ]
  },
  "Heptatonic 39": {
    familyIndex: 39, // -16 / +16 = 32
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,5,6,7,11], // -4,
      [0,1,4,5,6,10,11], // +1,
      [0,3,4,5,9,10,11], // +6,
      [0,1,2,6,7,8,9], // -3,
      [0,1,5,6,7,8,11], // +2,
      [0,4,5,6,7,10,11], // +7,
      [0,1,2,3,6,7,8], // -9 (flattest)
    ]
  },
  "Heptatonic 40": {
    familyIndex: 40, // -16 / +16 = 32
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,4,5,8,11], // -3,
      [0,1,2,3,6,9,10], // -5,
      [0,1,2,5,8,9,11], // +0,
      [0,1,4,7,8,10,11], // +5,
      [0,3,6,7,9,10,11], // +10,
      [0,3,4,6,7,8,9], // +1,
      [0,1,3,4,5,6,9], // -8 (flattest)
    ]
  },
  "Heptatonic 41": {
    familyIndex: 41, // -16 / +16 = 32
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,4,5,6,7,11], // -2,
      [0,3,4,5,6,10,11], // +3,
      [0,1,2,3,7,8,9], // -6,
      [0,1,2,6,7,8,11], // -1,
      [0,1,5,6,7,10,11], // +4,
      [0,4,5,6,9,10,11], // +9,
      [0,1,2,5,6,7,8], // -7 (flattest)
    ]
  },
  "Heptatonic 42": {
    familyIndex: 42, // -16 / +16 = 32
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,4,6,7,11], // -3,
      [0,1,2,4,5,9,10], // -5,
      [0,1,3,4,8,9,11], // +0,
      [0,2,3,7,8,10,11], // +5,
      [0,1,5,6,8,9,10], // +3,
      [0,4,5,7,8,9,11], // +8,
      [0,1,3,4,5,7,8], // -8 (flattest)
    ]
  },
  "Heptatonic 43": {
    familyIndex: 43, // -17 / +17 = 34
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,4,6,9,11], // -3,
      [0,1,3,5,8,10,11], // +2,
      [0,2,4,7,9,10,11], // +7,
      [0,2,5,7,8,9,10], // +5,
      [0,3,5,6,7,8,10], // +3,
      [0,2,3,4,5,7,9], // -6,
      [0,1,2,3,5,7,10], // -8 (flattest)
    ]
  },
  "Heptatonic 44": {
    familyIndex: 44, // -17 / +17 = 34
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,4,7,9,11], // -2,
      [0,1,3,6,8,10,11], // +3,
      [0,2,5,7,9,10,11], // +8,
      [0,3,5,7,8,9,10], // +6,
      [0,2,4,5,6,7,9], // -3,
      [0,2,3,4,5,7,10], // -5,
      [0,1,2,3,5,8,10], // -7 (flattest)
    ]
  },
  "Heptatonic 45": {
    familyIndex: 45, // -17 / +17 = 34
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,4,5,7,11], // -5,
      [0,2,3,4,6,10,11], // +0,
      [0,1,2,4,8,9,10], // -2,
      [0,1,3,7,8,9,11], // +3,
      [0,2,6,7,8,10,11], // +8,
      [0,4,5,6,8,9,10], // +6,
      [0,1,2,4,5,6,8], // -10 (flattest)
    ]
  },
  "Heptatonic 46": {
    familyIndex: 46, // -17 / +17 = 34
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,4,5,9,11], // -3,
      [0,2,3,4,8,10,11], // +2,
      [0,1,2,6,8,9,10], // +0,
      [0,1,5,7,8,9,11], // +5,
      [0,4,6,7,8,10,11], // +10,
      [0,2,3,4,6,7,8], // -6,
      [0,1,2,4,5,6,10], // -8 (flattest)
    ]
  },
  "Heptatonic 47": {
    familyIndex: 47, // -18 / +18 = 36
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,6,7,11], // -6,
      [0,1,2,5,6,10,11], // -1,
      [0,1,4,5,9,10,11], // +4,
      [0,3,4,8,9,10,11], // +9,
      [0,1,5,6,7,8,9], // +0,
      [0,4,5,6,7,8,11], // +5,
      [0,1,2,3,4,7,8], // -11 (flattest)
    ]
  },
  "Heptatonic 48": {
    familyIndex: 48, // -18 / +18 = 36
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,7,8,11], // -4,
      [0,1,2,6,7,10,11], // +1,
      [0,1,5,6,9,10,11], // +6,
      [0,4,5,8,9,10,11], // +11,
      [0,1,4,5,6,7,8], // -5,
      [0,3,4,5,6,7,11], // +0,
      [0,1,2,3,4,8,9], // -9 (flattest)
    ]
  },
  "Heptatonic 49": {
    familyIndex: 49, // -18 / +18 = 36
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,4,5,7,11], // -6,
      [0,1,3,4,6,10,11], // -1,
      [0,2,3,5,9,10,11], // +4,
      [0,1,3,7,8,9,10], // +2,
      [0,2,6,7,8,9,11], // +7,
      [0,4,5,6,7,9,10], // +5,
      [0,1,2,3,5,6,8], // -11 (flattest)
    ]
  },
  "Heptatonic 50": {
    familyIndex: 50, // -18 / +18 = 36
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,4,5,9,11], // -2,
      [0,1,2,3,7,9,10], // -4,
      [0,1,2,6,8,9,11], // +1,
      [0,1,5,7,8,10,11], // +6,
      [0,4,6,7,9,10,11], // +11,
      [0,2,3,5,6,7,8], // -5,
      [0,1,3,4,5,6,10], // -7 (flattest)
    ]
  },
  "Heptatonic 51": {
    familyIndex: 51, // -20 / +20 = 40
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,5,8,11], // -6,
      [0,1,2,4,7,10,11], // -1,
      [0,1,3,6,9,10,11], // +4,
      [0,2,5,8,9,10,11], // +9,
      [0,3,6,7,8,9,10], // +7,
      [0,3,4,5,6,7,9], // -2,
      [0,1,2,3,4,6,9], // -11 (flattest)
    ]
  },
  "Heptatonic 52": {
    familyIndex: 52, // -20 / +20 = 40
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,6,9,11], // -4,
      [0,1,2,5,8,10,11], // +1,
      [0,1,4,7,9,10,11], // +6,
      [0,3,6,8,9,10,11], // +11,
      [0,3,5,6,7,8,9], // +2,
      [0,2,3,4,5,6,9], // -7,
      [0,1,2,3,4,7,10], // -9 (flattest)
    ]
  },
  "Heptatonic 53": {
    familyIndex: 53, // -20 / +20 = 40
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,4,5,9,11], // -4,
      [0,1,3,4,8,10,11], // +1,
      [0,2,3,7,9,10,11], // +6,
      [0,1,5,7,8,9,10], // +4,
      [0,4,6,7,8,9,11], // +9,
      [0,2,3,4,5,7,8], // -7,
      [0,1,2,3,5,6,10], // -9 (flattest)
    ]
  },
  "Heptatonic 54": {
    familyIndex: 54, // -20 / +20 = 40
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,4,5,7,11], // -4,
      [0,1,2,3,5,9,10], // -6,
      [0,1,2,4,8,9,11], // -1,
      [0,1,3,7,8,10,11], // +4,
      [0,2,6,7,9,10,11], // +9,
      [0,4,5,7,8,9,10], // +7,
      [0,1,3,4,5,6,8], // -9 (flattest)
    ]
  },
  "Heptatonic 55": {
    familyIndex: 55, // -21 / +21 = 42
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,5,7,11], // -7,
      [0,1,2,4,6,10,11], // -2,
      [0,1,3,5,9,10,11], // +3,
      [0,2,4,8,9,10,11], // +8,
      [0,2,6,7,8,9,10], // +6,
      [0,4,5,6,7,8,10], // +4,
      [0,1,2,3,4,6,8], // -12 (flattest)
    ]
  },
  "Heptatonic 56": {
    familyIndex: 56, // -21 / +21 = 42
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,7,9,11], // -3,
      [0,1,2,6,8,10,11], // +2,
      [0,1,5,7,9,10,11], // +7,
      [0,4,6,8,9,10,11], // +12,
      [0,2,4,5,6,7,8], // -4,
      [0,2,3,4,5,6,10], // -6,
      [0,1,2,3,4,8,10], // -8 (flattest)
    ]
  },
  "Heptatonic 57": {
    familyIndex: 57, // -21 / +21 = 42
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,4,5,6,11], // -7,
      [0,1,3,4,5,10,11], // -2,
      [0,2,3,4,9,10,11], // +3,
      [0,1,2,7,8,9,10], // +1,
      [0,1,6,7,8,9,11], // +6,
      [0,5,6,7,8,10,11], // +11,
      [0,1,2,3,5,6,7], // -12 (flattest)
    ]
  },
  "Heptatonic 58": {
    familyIndex: 58, // -21 / +21 = 42
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,3,4,5,6,11], // -6,
      [0,2,3,4,5,10,11], // -1,
      [0,1,2,3,8,9,10], // -3,
      [0,1,2,7,8,9,11], // +2,
      [0,1,6,7,8,10,11], // +7,
      [0,5,6,7,9,10,11], // +12,
      [0,1,2,4,5,6,7], // -11 (flattest)
    ]
  },
  "Heptatonic 59": {
    familyIndex: 59, // -23 / +23 = 46
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,5,9,11], // -5,
      [0,1,2,4,8,10,11], // +0,
      [0,1,3,7,9,10,11], // +5,
      [0,2,6,8,9,10,11], // +10,
      [0,4,6,7,8,9,10], // +8,
      [0,2,3,4,5,6,8], // -8,
      [0,1,2,3,4,6,10], // -10 (flattest)
    ]
  },
  "Heptatonic 60": {
    familyIndex: 60, // -24 / +24 = 48
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,4,7,11], // -8,
      [0,1,2,3,6,10,11], // -3,
      [0,1,2,5,9,10,11], // +2,
      [0,1,4,8,9,10,11], // +7,
      [0,3,7,8,9,10,11], // +12,
      [0,4,5,6,7,8,9], // +3,
      [0,1,2,3,4,5,8], // -13 (flattest)
    ]
  },
  "Heptatonic 61": {
    familyIndex: 61, // -24 / +24 = 48
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,4,8,11], // -7,
      [0,1,2,3,7,10,11], // -2,
      [0,1,2,6,9,10,11], // +3,
      [0,1,5,8,9,10,11], // +8,
      [0,4,7,8,9,10,11], // +13,
      [0,3,4,5,6,7,8], // -3,
      [0,1,2,3,4,5,9], // -12 (flattest)
    ]
  },
  "Heptatonic 62": {
    familyIndex: 62, // -24 / +24 = 48
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,5,6,11], // -8,
      [0,1,2,4,5,10,11], // -3,
      [0,1,3,4,9,10,11], // +2,
      [0,2,3,8,9,10,11], // +7,
      [0,1,6,7,8,9,10], // +5,
      [0,5,6,7,8,9,11], // +10,
      [0,1,2,3,4,6,7], // -13 (flattest)
    ]
  },
  "Heptatonic 63": {
    familyIndex: 63, // -24 / +24 = 48
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,2,3,4,5,6,11], // -5,
      [0,1,2,3,4,9,10], // -7,
      [0,1,2,3,8,9,11], // -2,
      [0,1,2,7,8,10,11], // +3,
      [0,1,6,7,9,10,11], // +8,
      [0,5,6,8,9,10,11], // +13,
      [0,1,3,4,5,6,7], // -10 (flattest)
    ]
  },
  "Heptatonic 64": {
    familyIndex: 64, // -27 / +27 = 54
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,4,6,11], // -9,
      [0,1,2,3,5,10,11], // -4,
      [0,1,2,4,9,10,11], // +1,
      [0,1,3,8,9,10,11], // +6,
      [0,2,7,8,9,10,11], // +11,
      [0,5,6,7,8,9,10], // +9,
      [0,1,2,3,4,5,7], // -14 (flattest)
    ]
  },
  "Heptatonic 65": {
    familyIndex: 65, // -27 / +27 = 54
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,4,9,11], // -6,
      [0,1,2,3,8,10,11], // -1,
      [0,1,2,7,9,10,11], // +4,
      [0,1,6,8,9,10,11], // +9,
      [0,5,7,8,9,10,11], // +14,
      [0,2,3,4,5,6,7], // -9,
      [0,1,2,3,4,5,10], // -11 (flattest)
    ]
  },
  "Heptatonic 66": {
    familyIndex: 66, // -30 / +30 = 60
    noteCount: 7,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5", "Mode 6", "Mode 7"],
    sets: [
      [0,1,2,3,4,5,11], // -10,
      [0,1,2,3,4,10,11], // -5,
      [0,1,2,3,9,10,11], // +0,
      [0,1,2,8,9,10,11], // +5,
      [0,1,7,8,9,10,11], // +10,
      [0,6,7,8,9,10,11], // +15,
      [0,1,2,3,4,5,6], // -15 (flattest)
    ]
  },

  "Chromatic": {
    familyIndex: 1,
    noteCount: 12,
    names: ["Chromatic"],
    sets: [
      [0,1,2,3,4,5,6,7,8,9,10,11],
    ]
  },
  "No Tritone": {
    familyIndex: 1,
    noteCount: 10,
    names: ["Mode 1", "Mode 2", "Mode 3", "Mode 4", "Mode 5"],
    sets: [
      [0,1,2,4,5,6,7,8,10,11],
      [0,1,3,4,5,6,7,9,10,11],
      [0,2,3,4,5,6,8,9,10,11],
      [0,1,2,3,4,6,7,8,9,10],
      [0,1,2,3,5,6,7,8,9,11],
    ]
  },
  "Nonatonic": {
    familyIndex: 1,
    noteCount: 9,
    names: ["Nonatonic 1", "Nonatonic 2", "Nonatonic 3"],
    sets: [
      [0,1,3,4,5,7,8,9,11],
      [0,2,3,4,6,7,8,10,11],
      [0,1,2,4,5,6,8,9,10],
    ]
  },
  "Octatonic": {
    familyIndex: 1,
    noteCount: 8,
    names: ["Octatonic 1", "Octatonic 2"],
    sets: [
      [0,1,3,4,6,7,9,10],
      [0,2,3,5,6,8,9,11]
    ]
  },
  "Whole tone": {
    familyIndex: 1,
    noteCount: 6,
    names: ["Whole Tone"],
    sets: [
      [0,2,4,6,8,10],
    ]
  },
  "Augmented": {
    familyIndex: 2,
    noteCount: 6,
    names: ["Augmented 1", "Augmented 2"],
    sets: [
      [0,1,4,5,8,9],
      [0,3,4,7,8,11]
    ]
  },
  Pentatonic: {
    familyIndex: 1,
    noteCount: 5,
    names: ["Major Pentatonic","Suspended Pentatonic","Blues Minor","Blues Major","Minor Pentatonic"],
    sets: [
      [0,2,4,7,9],
      [0,2,5,7,10],
      [0,3,5,8,10],
      [0,2,5,7,9],
      [0,3,5,7,10]
    ]
  },
  "Fully Diminished": {
    familyIndex: 1,
    noteCount: 4,
    names: ["Fully Diminished"],
    sets: [
      [0,3,6,9],
    ]
  },
  "Augmented Triad": {
    familyIndex: 1,
    noteCount: 3,
    names: ["Augmented Triad"],
    sets: [
      [0,4,8],
    ]
  },
  "Major Triad": {
    familyIndex: 2,
    noteCount: 3,
    names: ["Major Triad","First Inversion", "Second Inversion"],
    sets: [
      [0,4,7],
      [0,3,8],
      [0,5,9]
    ]
  },
  "Minor Triad": {
    familyIndex: 3,
    noteCount: 3,
    names: ["Minor Triad","First Inversion", "Second Inversion"],
    sets: [
      [0,3,7],
      [0,4,9],
      [0,5,8]
    ]
  },
  "Diminished Triad": {
    familyIndex: 4,
    noteCount: 3,
    names: ["Diminished Triad","First Inversion", "Second Inversion"],
    sets: [
      [0,3,6],
      [0,6,9],
      [0,3,9]
    ]
  },
  "P5 & P4": {
    familyIndex: 1,
    noteCount: 2,
    names: ["Perfect Fifth", "Perfect Fourth"],
    sets: [
      [0,7],
      [0,5],
    ]
  },
  "M2 & m7": {
    familyIndex: 2,
    noteCount: 2,
    names: ["Major Second", "Minor Seventh"],
    sets: [
      [0,2],
      [0,10],
    ]
  },
  "M6 & m3": {
    familyIndex: 3,
    noteCount: 2,
    names: ["Major Sixth", "Minor Third"],
    sets: [
      [0,9],
      [0,3],
    ]
  },
  "M3 & m6": {
    familyIndex: 4,
    noteCount: 2,
    names: ["Major Third", "Minor Sixth"],
    sets: [
      [0,4],
      [0,8],
    ]
  },
  "M7 & m2": {
    familyIndex: 5,
    noteCount: 2,
    names: ["Major Seventh", "Minor Second"],
    sets: [
      [0,11],
      [0,1],
    ]
  },
  "Tritone": {
    familyIndex: 6,
    noteCount: 2,
    names: ["Augmented Fourth", "Diminished Fifth"],
    sets: [
    [0,6], // Aug 4
    [0,6], // Dim 5 (same pattern, distinct entry)
    ]
  },
  "Unison/Octave": {
    familyIndex: 1,
    noteCount: 1,
    names: ["Unison/Octave"],
    sets: [
      [0],
    ]
  }
};

// ---------- Detection ----------
function detectModeFamilyAndIndex(intervalSet) {
  const rels = Array.from(intervalSet).sort((a, b) => a - b);
  const matches = [];

  for (const [familyName, data] of Object.entries(MODE_FAMILIES)) {
    data.sets.forEach((pattern, i) => {
      if (rels.length === pattern.length && rels.every((v, j) => v === pattern[j])) {
        matches.push({ family: familyName, index: i });
      }
    });
  }

  // If multiple matches, prefer the currently active selection
  if (matches.length > 1) {
    const sameFamily = matches.find(m => m.family === activeFamilyKey && m.index === activeModeIndex);
    if (sameFamily) return sameFamily;
    const sameFamilyAny = matches.find(m => m.family === activeFamilyKey);
    if (sameFamilyAny) return sameFamilyAny;
  }

  return matches[0] || { family: "Unknown", index: -1 };
}


// ---------- Color Setup ----------
const baseHues=[0,30,60,120,200,260,300];
function interpolateHues(anchors,totalSteps){
  const result=[];
  const sections=anchors.length-1;
  const stepsPerSection=totalSteps/sections;
  for(let i=0;i<sections;i++){
    const start=anchors[i];
    const end=anchors[i+1];
    for(let j=0;j<stepsPerSection;j++){
      const t=j/stepsPerSection;
      const hue=start+(end-start)*t;
      result.push(`hsl(${hue},70%,55%)`);
    }
  }
  return result.slice(0,totalSteps);
}
const COLORS=interpolateHues(baseHues,12);

// ---------- Global State ----------
let baseMask=new Set([0,2,4,5,7,9,11]);
let state={
  rootIndex:0,
  noteRot:0,
  colorStep:0,
  colorRot:0
};

// Family selector state
let activeNoteCount=7;
let activeFamilyKey="Diatonic";
let activeModeIndex=0;

// ---------- Audio (pooled, warm & light) ----------
const AudioCtx = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioCtx();

// Ensure audio can start after a user gesture (Chrome/Safari policy)
document.addEventListener('pointerdown', () => {
  if (ctx.state === 'suspended') ctx.resume();
}, { once: true });

// Master output (one gentle lowpass for warmth; single node = negligible CPU)
const masterGain = ctx.createGain();
masterGain.gain.value = 0.7;

const warmthLP = ctx.createBiquadFilter();
warmthLP.type = 'lowpass';
warmthLP.frequency.value = 6000; // slightly warm, still clear
warmthLP.Q.value = 0.7;

masterGain.connect(warmthLP);
warmthLP.connect(ctx.destination);

// --- 12-note persistent pool (C..B). Each has 2 oscillators mixed to one gain. ---
// Keeps CPU flat: no per-note node creation/destruction.
const NOTE_POOL = Array.from({ length: 12 }, () => {
  // Core sine body
  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';

  // Subtle triangle for warmth (very low level)
  const osc2 = ctx.createOscillator();
  osc2.type = 'triangle';

  const triGain = ctx.createGain();
  triGain.gain.value = 0.18; // warmth amount (safe & light)

  // Per-note channel gain (we shape the envelope here)
  const chan = ctx.createGain();
  chan.gain.value = 0.0;

  // Routing
  osc1.connect(chan);
  osc2.connect(triGain).connect(chan);
  chan.connect(masterGain);

  // Run oscillators continuously; we only modulate their freq + chan gain
  const now = ctx.currentTime;
  osc1.start(now);
  osc2.start(now);

  return { osc1, osc2, gain: chan };
});

// Map frequency to pool index 0..11 (C..B around MIDI 60)
function poolIndexFromFreq(freq) {
  // nearest MIDI note
  const midi = Math.round(12 * Math.log2(freq / 440)) + 69;
  // pitch-class index relative to C4 (=60)
  let idx = (midi - 60) % 12;
  if (idx < 0) idx += 12;
  return idx;
}

// Ultra-light pluck with gentle attack & decay
function playFreq(freq, when = 0, dur = 1.6) {
  if (ctx.state === 'suspended') ctx.resume();

  const t = ctx.currentTime + when;
  const idx = poolIndexFromFreq(freq);
  const slot = NOTE_POOL[idx];

  // Set both oscillator frequencies (same pitch, different waveform)
  slot.osc1.frequency.setValueAtTime(freq, t);
  slot.osc2.frequency.setValueAtTime(freq, t);

  // Envelope on the pooled channel gain (restarts cleanly on retrigger)
  const g = slot.gain.gain;
  g.cancelScheduledValues(t);
  g.setValueAtTime(0.0001, t);
  g.exponentialRampToValueAtTime(0.33, t + 0.035); // gentle, non-clicky attack
  g.exponentialRampToValueAtTime(0.0001, t + dur); // smooth decay
}

// Helpers (unchanged)
function midiToFreq(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function noteIndexToMidi(i, octave = 4) {
  return 60 + ((i + 12) % 12) + (octave - 4) * 12;
}

// Warm-up (prevents first-note hiccup)
(() => {
  const s = ctx.createBufferSource();
  s.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
  s.connect(masterGain);
  s.start(0);
})();


// ---------- Build SVG + Event Setup ----------
document.addEventListener('DOMContentLoaded',()=>{
  const svg=document.getElementById('wheel');
  const intervalControls=document.getElementById('interval-controls');
  const keyRows=document.getElementById('key-rows');

  svg.innerHTML=`
    <defs>
      <filter id="glowFilter"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <linearGradient id="stoneGrad" x1="0" x2="1"><stop offset="0%" stop-color="#3a3b3d"/><stop offset="100%" stop-color="#222325"/></linearGradient>
    </defs>
    <g id="rings"></g>
    <g id="color-rot"></g>
    <g id="notes-rot"></g>
    <g id="outer-btns"></g>
    <circle class="center" r="34"></circle>`;

  const rings=svg.querySelector('#rings');
  const colorRotGroup=svg.querySelector('#color-rot');
  const notesRot=svg.querySelector('#notes-rot');
  const outerBtnsG=svg.querySelector('#outer-btns');

  const R_outer=210,R_middle=175,noteR=30,R_inner_end=R_middle-noteR-1;
  const R_outer_interval=R_middle+noteR+40;
  const R_inner_interval=R_middle+noteR+4;
  const degStep=30,toRad=d=>d*Math.PI/180;

  // Outer ring
  const outerRing=document.createElementNS('http://www.w3.org/2000/svg','circle');
  outerRing.setAttribute('r',R_outer);
  outerRing.setAttribute('class','stone-ring');
  rings.appendChild(outerRing);

  // Color spokes
  for(let i=0;i<12;i++){
    const angle=(i*30-90)*Math.PI/180;
    const x=Math.cos(angle)*R_inner_end;
    const y=Math.sin(angle)*R_inner_end;
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',0);line.setAttribute('y1',0);
    line.setAttribute('x2',x);line.setAttribute('y2',y);
    line.setAttribute('class','spoke');
    line.setAttribute('stroke',COLORS[i]);
    line.dataset.index=i;
    if(baseMask.has(i))line.classList.add('on');
    colorRotGroup.appendChild(line);
  }

  // Notes + labels
  for(let i=0;i<12;i++){
    const angle=(i*30-90)*Math.PI/180;
    const x=Math.cos(angle)*R_middle;
    const y=Math.sin(angle)*R_middle;
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('class','note-circle');
    c.setAttribute('r',noteR);
    c.setAttribute('cx',x);
    c.setAttribute('cy',y);
    c.dataset.index=i;
    notesRot.appendChild(c);
    const t=document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('class','note-label');
    t.setAttribute('x',x);t.setAttribute('y',y);
    t.setAttribute('text-anchor','middle');
    t.setAttribute('dominant-baseline','middle');
    t.dataset.idx=i;
    t.textContent=NOTES[i];
    t.setAttribute('font-size',/♯|♭/.test(NOTES[i])?'18px':'40px');
    notesRot.appendChild(t);
  }

  // Label orientation
  function updateNoteLabelOrientation(){
    notesRot.querySelectorAll('text.note-label').forEach(t=>{
      const x=parseFloat(t.getAttribute('x'));
      const y=parseFloat(t.getAttribute('y'));
      t.setAttribute('transform',`rotate(${-state.noteRot} ${x} ${y})`);
    });
  }
  updateNoteLabelOrientation();

  // Build interval wedges
  outerBtnsG.innerHTML='';
  outerBtnsG.setAttribute('transform','rotate(-15)');
  for(let i=0;i<12;i++){
    const startDeg=i*degStep-90;
    const endDeg=startDeg+degStep;
    const x1_outer=Math.cos(toRad(startDeg))*R_outer_interval;
    const y1_outer=Math.sin(toRad(startDeg))*R_outer_interval;
    const x2_outer=Math.cos(toRad(endDeg))*R_outer_interval;
    const y2_outer=Math.sin(toRad(endDeg))*R_outer_interval;
    const x1_inner=Math.cos(toRad(endDeg))*R_inner_interval;
    const y1_inner=Math.sin(toRad(endDeg))*R_inner_interval;
    const x2_inner=Math.cos(toRad(startDeg))*R_inner_interval;
    const y2_inner=Math.sin(toRad(startDeg))*R_inner_interval;
    const d=[`M ${x1_outer} ${y1_outer}`,
      `A ${R_outer_interval} ${R_outer_interval} 0 0 1 ${x2_outer} ${y2_outer}`,
      `L ${x1_inner} ${y1_inner}`,
      `A ${R_inner_interval} ${R_inner_interval} 0 0 0 ${x2_inner} ${y2_inner}`,
      'Z'].join(' ');
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',d);
    path.setAttribute('class','interval-wedge');
    path.dataset.idx=i;
    path.addEventListener('click',()=>toggleIntervalAtPosition(i));
    outerBtnsG.appendChild(path);
    const midDeg=startDeg+degStep/2;
    const labelR=(R_outer_interval+R_inner_interval)/2;
    const tx=Math.cos(toRad(midDeg))*labelR;
    const ty=Math.sin(toRad(midDeg))*labelR;
    const label=document.createElementNS('http://www.w3.org/2000/svg','text');
    label.setAttribute('x',tx);label.setAttribute('y',ty+4);
    label.setAttribute('text-anchor','middle');
    label.setAttribute('dominant-baseline','middle');
    label.setAttribute('class','interval-label');
    label.textContent=INTERVALS[i];
    label.setAttribute('transform',`rotate(15 ${tx} ${ty})`);
    outerBtnsG.appendChild(label);
  }
  // --- Bottom interval controls (kept hidden, still useful for debugging) ---
  const intervalButtons=[];
  for(let i=0;i<12;i++){
    const b=document.createElement('button');
    b.className='interval-btn';
    b.textContent=INTERVALS[i];
    b.dataset.idx=i;
    b.addEventListener('click',()=>toggleIntervalAtPosition(i));
    intervalControls.appendChild(b);
    intervalButtons.push(b);
  }
  intervalControls.style.display='none';

  // Click notes to play a tone
  notesRot.querySelectorAll('circle.note-circle').forEach(c=>{
    c.addEventListener('click', ()=>{
      const idx=parseInt(c.dataset.index);
      playSingleNote(idx);
    });
  });

  // ---------- Mapping / helpers bound to current DOM scope ----------
  function colorIndexAtInterval(intervalIndex){
    return (intervalIndex + state.colorStep) % 12;
  }

  function getSelectedIntervals(){
    const k=((state.colorStep%12)+12)%12;
    const sel=new Set();
    baseMask.forEach(colorIdx=>{
      const intervalIdx=((colorIdx - k)%12 + 12)%12;
      sel.add(intervalIdx);
    });
    return sel;
  }

  // Live preview helpers while dragging color ring
  function topColorIndexLive(){
    const rawTop=((Math.round(-state.colorRot/30)%12)+12)%12;
    const active=Array.from(baseMask);
    if(active.length===0) return rawTop;
    let best=active[0],bestDist=circularDistance(rawTop,best);
    for(const a of active){
      const d=circularDistance(rawTop,a);
      if(d<bestDist){best=a;bestDist=d;}
    }
    return best;
  }
  function colorIndexAtIntervalLive(intervalIndex){
    return (intervalIndex + topColorIndexLive()) % 12;
  }
  function getSelectedIntervalsLive(){
    const k=topColorIndexLive();
    const sel=new Set();
    baseMask.forEach(colorIdx=>{
      const intervalIdx=((colorIdx - k)%12 + 12)%12;
      sel.add(intervalIdx);
    });
    return sel;
  }

  function updateSpokesVisual(){
    colorRotGroup.querySelectorAll('line.spoke').forEach(line=>{
      const idx=parseInt(line.dataset.index);
      line.classList.toggle('on', baseMask.has(idx));
    });
  }

  function updateIntervalButtonsAndOuter(){
    const sel=getSelectedIntervals();
    outerBtnsG.querySelectorAll('path.interval-wedge').forEach((w,idx)=>{
      w.classList.toggle('active', sel.has(idx));
    });
    intervalButtons.forEach((btn,idx)=>{
      btn.classList.toggle('active', sel.has(idx));
    });
    renderKey(sel);
    reflectIndexUIFromCurrentSelection(sel); // keep panel synced
  }

  function updateAllVisuals(){
    updateSpokesVisual();
    updateIntervalButtonsAndOuter();
  }

  function toggleIntervalAtPosition(intervalIndex){
    const colorIdx=colorIndexAtInterval(intervalIndex);
    if(baseMask.has(colorIdx)) baseMask.delete(colorIdx); else baseMask.add(colorIdx);
    updateAllVisuals();
  }

  function getRotatedColor(intervalDeg){
    const colorIdx=colorIndexAtIntervalLive(intervalDeg);
    return COLORS[colorIdx];
  }

// ---------- Degree picker for variable-scale triads ----------
function getChordDegreesForScale(rels, idx) {
  const n = rels.length;
  let steps;

 if (n <= 2) steps = [0, 1];          // 2-note: dyad (1–2)
  else if (n === 3) steps = [0, 1, 2]; // 3-note: 1–2–3
  else if (n === 4) steps = [0, 1, 2, 3]; // 4-note: 1-2-3-4
  else if (n === 5) steps = [0, 2, 3]; // 5-note: 1–3–4
  else if (n <= 8) steps = [0, 2, 4];  // 4–8-note: 1–3–5
  else if (n <= 10) steps = [0, 3, 6]; // 9–10-note: 1–4–7
  else steps = [0, 4, 7];              // 11–12-note: 1–5–8

  // Build triad relative to this scale degree
  return steps.map(step => rels[(idx + step) % n]);
}

// ---------- Adaptive chord quality detection (robust tritone handling) ----------
function chordSymbolFromDegree(rels, idx) {
  const n = rels.length;

  // 1-note: always I
  if (n === 1) return 'I';

  // 2-note: dyad rules
  if (n === 2) {
    // Compute interval from this degree to the next degree
    const root = rels[idx];
    const other = rels[(idx + 1) % n];
    const interval = ((other - root + 12) % 12);

    let numeral = roman(idx + 1);

    // SPECIAL CASE: exact tritone dyad [0,6] — make degrees distinct
    // If the set itself is a pure tritone (difference = 6), format per-degree:
    const isPureTritone =
      ((rels[1] - rels[0] + 12) % 12) === 6 || ((rels[0] - rels[1] + 12) % 12) === 6;

    if (isPureTritone && interval === 6) {
      // First tile → Augmented Fourth (uppercase +)
      if (idx === 0) return numeral.toUpperCase() + '⁺';
      // Second tile → Diminished Fifth (lowercase °)
      return numeral.toLowerCase() + '°';
    }

    // Normal dyad logic
    switch (interval) {
      case 1: case 3: case 8: case 10: // minor intervals
        return numeral.toLowerCase();
      case 2: case 4: case 9: case 11: // major intervals
      case 5: case 7:                   // perfect 4th/5th
        return numeral.toUpperCase();
      case 6:                           // generic tritone dyad not caught above
        return numeral.toLowerCase() + '°';
      default:                          // unusual
        return numeral.toUpperCase() + '*';
    }
  }

  // 3+ notes: use adaptive triad logic
  const chordPcs = getChordDegreesForScale(rels, idx);
  const root = chordPcs[0];
  const third = chordPcs[1] ?? chordPcs[0];
  const fifth = chordPcs[2] ?? chordPcs[0];

  const thirdInt = ((third - root + 12) % 12);
  const fifthInt = ((fifth - root + 12) % 12);

  let numeral = roman(idx + 1);
  let isUpper = thirdInt >= 4;
  let suffix = '';

  if (fifthInt < 6 || fifthInt > 8) suffix = '*';
  else if (fifthInt > 7) suffix = '⁺';
  else if (fifthInt < 7) suffix = '°';

  if (!isUpper) numeral = numeral.toLowerCase();
  return numeral + suffix;
}

// ---------- Render mode tiles (auto Roman numerals) ----------
function renderKey(sel) {
  keyRows.innerHTML = '';
  const rels = Array.from(sel).sort((a, b) => a - b);
  const detected = detectModeFamilyAndIndex(sel);
  const names = MODE_FAMILIES[detected.family]?.names || [];

  rels.forEach((deg, idx) => {
    const tile = document.createElement('div');
    tile.className = 'mode-tile';
    tile.style.setProperty('--tile-color', getRotatedColor(deg));

    const col = document.createElement('div');
    col.className = 'key-col';
    tile.appendChild(col);

    // --- Roman numeral (quality-aware) ---
    const rn = document.createElement('button');
    rn.className = 'key-btn roman-btn';
    rn.textContent = chordSymbolFromDegree(rels, idx);
    rn.addEventListener('click', () => playTriadFromDegree(deg));

    // --- Mode name ---
    const nameBtn = document.createElement('button');
    nameBtn.className = 'key-btn key-name';
    if (detected.index >= 0 && names.length) {
      nameBtn.textContent = names[(detected.index + idx) % names.length];
    } else {
      nameBtn.textContent = `Mode ${idx + 1}`;
    }
    nameBtn.addEventListener('click', () => playModeFromDegree(idx));

    col.appendChild(rn);
    col.appendChild(nameBtn);
    keyRows.appendChild(tile);
  });
}

 // ===== Dragging and Rotation Logic (no-jump, smooth grab) =====

// Shared drag state
let dragging = null;
let lastAngle = 0;
let tempColorRotation = 0;
let startGroupRotation = 0;
let suppressVisualUpdate = false;

// Helper to get the current pointer angle
function getAngleFromEvent(e) {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
  return Math.atan2(loc.y, loc.x) * 180 / Math.PI;
}

// ----- Pointer Down -----
svg.addEventListener('pointerdown', (e) => {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
  const dist = Math.hypot(loc.x, loc.y);

  const R_middle = 175, noteR = 30;

  // define grab zones
  const colorInner = 20;                    // inner radius where color grab starts
  const colorOuter = R_middle * 0.85;        // outer boundary of color zone
  const noteInner  = colorOuter -6;       // inner boundary of note zone
  const noteOuter  = R_middle + noteR + 4;  // outer boundary of note zone

  // ----- color ring -----
  if (dist >= colorInner && dist < colorOuter) {
    dragging = 'color';
    tempColorRotation = 0;
    suppressVisualUpdate = true; // 🟡 freeze visuals until release

    // use exact current transform, no jump
    const currentTransform = colorRotGroup.getAttribute('transform');
    const match = currentTransform ? currentTransform.match(/rotate\((-?\d+(\.\d+)?)\)/) : null;
    startGroupRotation = match ? parseFloat(match[1]) : state.colorRot;
    state.colorRot = startGroupRotation;

    lastAngle = getAngleFromEvent(e);
    e.preventDefault();
  }

  // ----- note ring -----
  else if (dist >= noteInner && dist <= noteOuter) {
    dragging = 'notes';
    suppressVisualUpdate = true; // stop visuals mid-drag
    lastAngle = getAngleFromEvent(e);
    e.preventDefault();
  }
});


// ----- Pointer Move -----
window.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const angle = getAngleFromEvent(e);
  const delta = angle - lastAngle;
  lastAngle = angle;

  if (dragging === 'notes') {
    state.noteRot += delta;
    notesRot.setAttribute('transform', `rotate(${state.noteRot})`);
    updateNoteLabelOrientation();
    state.rootIndex = ((Math.round((-state.noteRot) / 30) % 12) + 12) % 12;
  }

  else if (dragging === 'color') {
    tempColorRotation += delta;
    const visualRotation = startGroupRotation + tempColorRotation;
    colorRotGroup.setAttribute('transform', `rotate(${visualRotation})`);
    state.colorRot = visualRotation;
  }
});


// ----- Pointer Up -----
window.addEventListener('pointerup', () => {
  if (!dragging) return;

  if (dragging === 'notes') {
    state.noteRot = Math.round(state.noteRot / 30) * 30;
    notesRot.setAttribute('transform', `rotate(${state.noteRot})`);
    updateNoteLabelOrientation();
    state.rootIndex = ((Math.round((-state.noteRot) / 30) % 12) + 12) % 12;
  }

  else if (dragging === 'color') {
    const totalRotation = startGroupRotation + tempColorRotation;
    let indexAtTop = Math.round((-totalRotation) / 30);
    indexAtTop = ((indexAtTop % 12) + 12) % 12;

    const active = Array.from(baseMask);
    if (active.length === 0) {
      state.colorStep = indexAtTop;
    } else {
      let best = active[0], bestDist = circularDistance(indexAtTop, best);
      for (const a of active) {
        const d = circularDistance(indexAtTop, a);
        if (d < bestDist) { best = a; bestDist = d; }
      }
      state.colorStep = best;
    }

const targetRotation = -state.colorStep * 30;
let startRotation = state.colorRot;

// 🩹 Fix: choose the shortest direction to target
let delta = targetRotation - startRotation;
if (delta > 180) delta -= 360;
if (delta < -180) delta += 360;

const duration = 120; // ms
const startTime = performance.now();

function animateSnap(now) {
  const t = Math.min(1, (now - startTime) / duration);
  const ease = t < 1 ? (1 - Math.cos(t * Math.PI)) / 2 : 1;
  const current = startRotation + delta * ease;
  colorRotGroup.setAttribute('transform', `rotate(${current})`);
  if (t < 1) requestAnimationFrame(animateSnap);
  else {
    state.colorRot = targetRotation;
    tempColorRotation = 0;
    updateAllVisuals();
  }
}
requestAnimationFrame(animateSnap);
  }

  suppressVisualUpdate = false;
  dragging = null;
});

// Prevent repeated resume() calls and desync on small sets
let audioReady = false;
function ensureAudioReady() {
  if (!audioReady && ctx.state === "suspended") {
    ctx.resume().then(() => (audioReady = true));
  } else {
    audioReady = true;
  }
}

// Wrap highlight calls in a single rAF batch for smoothness
const highlightQueue = new Set();
function scheduleHighlight(idx) {
  highlightQueue.add(idx);
  if (!scheduleHighlight._scheduled) {
    scheduleHighlight._scheduled = true;
    requestAnimationFrame(() => {
      highlightQueue.forEach(i => highlightNoteVisual(i));
      highlightQueue.clear();
      scheduleHighlight._scheduled = false;
    });
  }
}

// ---------- Playback ----------
function highlightNoteVisual(idx) {
  const lbl = svg.querySelector(`text.note-label[data-idx="${idx}"]`);
  const circle = svg.querySelector(`circle.note-circle[data-index="${idx}"]`);
  const intervalDeg = ((idx - state.rootIndex) % 12 + 12) % 12;
  const colorIdx = (intervalDeg + state.colorStep) % 12;
  const spoke = baseMask.has(colorIdx)
    ? svg.querySelector(`line.spoke[data-index="${colorIdx}"]`)
    : null;

  const glowColor = spoke ? spoke.getAttribute('stroke') : '#fff';

  // ✴️ helper to trigger glow animations for labels/circles
  const triggerGlow = (el) => {
    if (!el) return;
    el.classList.remove('glow-active');
    void el.offsetWidth; // restart animation
    el.style.setProperty('--glow-color', glowColor);
    el.classList.add('glow-active');
    setTimeout(() => el.classList.remove('glow-active'), 700);
  };

// 🔹 create white halo around colored spoke (visible outer glow)
if (spoke) {
  const halo = spoke.cloneNode();
  halo.removeAttribute('class');
  halo.setAttribute('stroke', 'white');
  halo.setAttribute('stroke-width', parseFloat(spoke.getAttribute('stroke-width')) + 6); // much thicker
  halo.setAttribute('stroke-linecap', 'round');
  halo.classList.add('spoke-halo');

  spoke.parentNode.insertBefore(halo, spoke); // place behind the colored spoke

  // animate halo fade
  requestAnimationFrame(() => {
    halo.style.opacity = 1;
    setTimeout(() => (halo.style.opacity = 0), 300);
    setTimeout(() => halo.remove(), 700);
  });
}

  // trigger note label and circle glows
  triggerGlow(lbl);
  triggerGlow(circle);
}

// ---------- Playback (consistent root register, correctly voiced) ----------

// Helper: get anchored MIDI so all playback starts from same base register
function anchoredMidiForNote(noteIdx) {
  const intervalFromRoot = ((noteIdx - state.rootIndex) % 12 + 12) % 12;
  const rootBase = noteIndexToMidi(state.rootIndex, 4); // reference octave
  let m = noteIndexToMidi(noteIdx, 4);
  if (intervalFromRoot === 0) return rootBase;          // tonic stays at base
  while (m <= rootBase) m += 12;                        // all others above it
  return m;
}

// ---------- Single note (click) ----------
function playSingleNote(idx) {
  if (ctx.state === 'suspended') ctx.resume();
  const midi = anchoredMidiForNote(idx);
  playFreq(midiToFreq(midi), 0, 1.0);
  highlightNoteVisual(idx);
}

// ---------- Adaptive triad playback ----------
function playTriadFromDegree(deg) {
  if (ctx.state === 'suspended') ctx.resume();

  const sel = getSelectedIntervals();
  const rels = Array.from(sel).sort((a,b)=>a-b);
  const n = rels.length;
  const i = rels.indexOf(deg);
  if (i === -1) return;

  const chordPcs = getChordDegreesForScale(rels, i);
  const noteIdxs = chordPcs.map(pc => (pc + state.rootIndex) % 12);

  // Root defines chord register
  const midis = [];
  midis[0] = anchoredMidiForNote(noteIdxs[0]);

  // Each upper voice placed above the previous
  for (let k = 1; k < noteIdxs.length; k++) {
    let m = noteIndexToMidi(noteIdxs[k], 4);
    while (m <= midis[k-1]) m += 12;
    midis[k] = m;
  }

  midis.forEach((m, k) => {
    playFreq(midiToFreq(m), k * 0.02, 1.2);
    highlightNoteVisual(noteIdxs[k]);
  });
}

// ---------- Mode (starts same as single note, ends one octave up) ----------
function playModeFromDegree(i) {
  ensureAudioReady();

  const sel = getSelectedIntervals();
  const rels = Array.from(sel).sort((a, b) => a - b);
  if (rels.length === 0) return;

  const start = i % rels.length;
  const pcs = [];
  for (let k = 0; k < rels.length; k++) pcs.push(rels[(start + k) % rels.length]);

  const baseMidi = noteIndexToMidi(state.rootIndex, 4);
  let prevMidi = null;

  pcs.forEach((pc, idx) => {
    const noteIdx = (pc + state.rootIndex) % 12;
    let midi = noteIndexToMidi(noteIdx, 4);
    if (!Number.isFinite(midi)) return;
    if (prevMidi !== null) while (midi <= prevMidi) midi += 12;

    const when = 0.02 + idx * 0.36; // <== small safe delay for first note
    const freq = midiToFreq(midi);
    if (!isFinite(freq) || freq <= 20) return;

    playFreq(freq, when, 1.0);
    setTimeout(() => scheduleHighlight(noteIdx), when * 1000);
    prevMidi = midi;
  });

  const firstIdx = (pcs[0] + state.rootIndex) % 12;
  const octaveWhen = 0.02 + pcs.length * 0.36 + 0.05;
  const octaveMidi = noteIndexToMidi(firstIdx, 5);
  const octaveFreq = midiToFreq(octaveMidi);
  if (isFinite(octaveFreq)) {
    playFreq(octaveFreq, octaveWhen, 1.0);
    setTimeout(() => scheduleHighlight(firstIdx), octaveWhen * 1000);
  }
}


  // Hook up action controls if visible
  const actionPlayMode=document.getElementById('play-mode');
  const actionPlayChords=document.getElementById('play-chords');
  const actionPlayScale=document.getElementById('play-scale');
  if(actionPlayMode) actionPlayMode.addEventListener('click', ()=>playModeSequence());
  if(actionPlayScale) actionPlayScale.addEventListener('click', ()=>playModeSequence());
  if(actionPlayChords) actionPlayChords.addEventListener('click', ()=>{
    if(ctx.state==='suspended') ctx.resume();
    const sel=getSelectedIntervals();
    const rels=Array.from(sel).sort((a,b)=>a-b);
    rels.forEach((deg,i)=>{
      const second=rels[(i+2)%rels.length];
      const third =rels[(i+4)%rels.length];
      const notes=[deg,second,third].map(d=>(d+state.rootIndex)%12);
      notes.forEach((n,j)=> playFreq(midiToFreq(noteIndexToMidi(n,4)), i*0.6 + j*0.02, 1.0));
      notes.forEach(n=> setTimeout(()=> highlightNoteVisual(n), i*600));
    });
  });


  // ---------- Mode Control Panel wiring ----------
  const notesMinus=document.getElementById('notes-minus');
  const notesPlus =document.getElementById('notes-plus');
  const notesDisplay=document.getElementById('notes-display');
  const familyPrev=document.getElementById('family-prev');
  const familyNext=document.getElementById('family-next');
  const familyDisplay=document.getElementById('family-display');
  const indexInput=document.getElementById('index-input');

  // derive unique note counts available
  function availableNoteCounts(){
    const s=new Set(Object.values(MODE_FAMILIES).map(f=>f.noteCount));
    return Array.from(s).sort((a,b)=>a-b);
  }
  function familiesForCount(n){
    return Object.keys(MODE_FAMILIES).filter(k=>MODE_FAMILIES[k].noteCount===n);
  }

  function loadModeFamily(familyKey, modeIndex=0){
    const fam=MODE_FAMILIES[familyKey];
    if(!fam) return;
    // replace baseMask with the chosen mode pattern
    baseMask=new Set(fam.sets[modeIndex]);
    activeFamilyKey=familyKey;
    activeNoteCount=fam.noteCount;
    activeModeIndex=modeIndex;

    // snap color group to the first active spoke (root defaults to nearest active)
    const active=Array.from(baseMask);
    state.colorStep = active.length ? active[0] : 0;
    colorRotGroup.setAttribute('transform', `rotate(${-state.colorStep*30})`);
    state.colorRot = -state.colorStep*30;

    // update UI
    familyDisplay.textContent=familyKey;
    notesDisplay.textContent=activeNoteCount;
    indexInput.value=`${fam.noteCount}.${fam.familyIndex}.${modeIndex+1}`;

    updateAllVisuals();
  }

  function reflectIndexUIFromCurrentSelection(sel){
    // Called after any change to intervals/rotation to keep index/labels in sync
    const { family, index } = detectModeFamilyAndIndex(sel);
    const famObj=MODE_FAMILIES[family];
    if(famObj && index>=0){
      activeFamilyKey=family;
      activeNoteCount=famObj.noteCount;
      activeModeIndex=index;
      familyDisplay.textContent=family;
      notesDisplay.textContent=activeNoteCount;
      indexInput.value=`${famObj.noteCount}.${famObj.familyIndex}.${index+1}`;
    }else{
      // Unknown / custom: show derived count, keep family label
      familyDisplay.textContent='Custom';
      notesDisplay.textContent=Array.from(sel).length;
      indexInput.value=`${Array.from(sel).length}.0.1`;
    }
  }

  // Notes ± handlers
  notesMinus.addEventListener('click',()=>{
    const counts=availableNoteCounts();
    let idx=counts.indexOf(activeNoteCount);
    if(idx<=0) idx=counts.length; // wrap
    idx--;
    const newCount=counts[idx];
    const fams=familiesForCount(newCount);
    loadModeFamily(fams[0], 0);
  });
  notesPlus.addEventListener('click',()=>{
    const counts=availableNoteCounts();
    let idx=counts.indexOf(activeNoteCount);
    idx=(idx+1)%counts.length;
    const newCount=counts[idx];
    const fams=familiesForCount(newCount);
    loadModeFamily(fams[0], 0);
  });

  // Family ⇄ handlers
  familyPrev.addEventListener('click',()=>{
    const fams=familiesForCount(activeNoteCount);
    let i=fams.indexOf(activeFamilyKey);
    if(i<=0) i=fams.length;
    i--;
    loadModeFamily(fams[i], 0);
  });
  familyNext.addEventListener('click',()=>{
    const fams=familiesForCount(activeNoteCount);
    let i=fams.indexOf(activeFamilyKey);
    i=(i+1)%fams.length;
    loadModeFamily(fams[i], 0);
  });

  // Index input handler (format n.f.m)
  indexInput.addEventListener('change',()=>{
    const v=indexInput.value.trim();
    const parts=v.split('.');
    if(parts.length!==3) return; // ignore invalid
    const [nStr,fStr,mStr]=parts;
    const n=Number(nStr), f=Number(fStr), m=Number(mStr);
    if(!Number.isFinite(n) || !Number.isFinite(f) || !Number.isFinite(m)) return;

    // find family with matching (noteCount, familyIndex)
    const matchKey = Object.keys(MODE_FAMILIES).find(k=>{
      const fam=MODE_FAMILIES[k];
      return fam.noteCount===n && fam.familyIndex===f;
    });
    if(!matchKey) return;

    const fam=MODE_FAMILIES[matchKey];
    const modeIndex=Math.min(Math.max(m-1,0), fam.sets.length-1);
    loadModeFamily(matchKey, modeIndex);
  });

  // ---------- Initial render ----------
  // Start on whatever the current active family should be (Diatonic Ionian)
  loadModeFamily(activeFamilyKey, 0);

}); // end DOMContentLoaded

// ---------- Utilities (global) ----------
function circularDistance(a,b){
  const diff=Math.abs(a-b)%12;
  return Math.min(diff, 12-diff);
}
function roman(n){
  const romans=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
  return romans[n-1]||n;
}
