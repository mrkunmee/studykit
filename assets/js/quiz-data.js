/* ==========================================================================
   Practice Quiz — ORIGINAL question bank written for StudentKit Nigeria.
   These are original practice items, not copied past questions, and not
   affiliated with JAMB/WAEC/NECO. Only subjects/topics/difficulties that
   actually have questions here are offered in the interface.
   Each question: { subject, topic, difficulty, q, options[], answer(index), explain }
   ========================================================================== */
window.SK_QUIZ = {
  subjects: [
    { id: "math", name: "Mathematics",
      topics: [{ id: "algebra", name: "Algebra" }, { id: "arithmetic", name: "Arithmetic" }, { id: "geometry", name: "Geometry" }] },
    { id: "english", name: "English Language",
      topics: [{ id: "grammar", name: "Grammar" }, { id: "vocabulary", name: "Vocabulary" }] },
    { id: "physics", name: "Physics",
      topics: [{ id: "mechanics", name: "Mechanics" }, { id: "units", name: "Units & quantities" }] }
  ],

  questions: [
    /* ---- Mathematics: Algebra ---- */
    { subject: "math", topic: "algebra", difficulty: "Easy", q: "Solve for x: 2x + 5 = 17.",
      options: ["5", "6", "7", "11"], answer: 1, explain: "Subtract 5: 2x = 12. Divide by 2: x = 6." },
    { subject: "math", topic: "algebra", difficulty: "Easy", q: "If 3x = 21, what is x?",
      options: ["6", "7", "8", "9"], answer: 1, explain: "Divide both sides by 3: x = 21 ÷ 3 = 7." },
    { subject: "math", topic: "algebra", difficulty: "Medium", q: "Expand (x + 3)(x + 2).",
      options: ["x² + 6x + 6", "x² + 5x + 6", "x² + 5x + 5", "x² + 6x + 5"], answer: 1,
      explain: "x·x + x·2 + 3·x + 3·2 = x² + 2x + 3x + 6 = x² + 5x + 6." },
    { subject: "math", topic: "algebra", difficulty: "Medium", q: "Simplify: 2(x + 4) − 3.",
      options: ["2x + 1", "2x + 5", "2x + 11", "2x − 5"], answer: 1,
      explain: "2(x + 4) = 2x + 8, then 2x + 8 − 3 = 2x + 5." },
    { subject: "math", topic: "algebra", difficulty: "Easy", q: "Solve: x ÷ 4 = 9.",
      options: ["2.25", "13", "36", "45"], answer: 2, explain: "Multiply both sides by 4: x = 9 × 4 = 36." },

    /* ---- Mathematics: Arithmetic ---- */
    { subject: "math", topic: "arithmetic", difficulty: "Easy", q: "What is 15% of 200?",
      options: ["15", "20", "30", "45"], answer: 2, explain: "15% = 0.15, and 0.15 × 200 = 30." },
    { subject: "math", topic: "arithmetic", difficulty: "Medium", q: "Simplify: 3/4 + 1/8.",
      options: ["4/12", "5/8", "7/8", "1"], answer: 2, explain: "3/4 = 6/8, and 6/8 + 1/8 = 7/8." },
    { subject: "math", topic: "arithmetic", difficulty: "Easy", q: "Calculate: 7 × 8 − 6.",
      options: ["44", "50", "56", "62"], answer: 1, explain: "Do multiplication first: 7 × 8 = 56, then 56 − 6 = 50." },
    { subject: "math", topic: "arithmetic", difficulty: "Medium", q: "What is the average of 4, 8, 10 and 2?",
      options: ["5", "6", "7", "8"], answer: 1, explain: "Sum = 24, and 24 ÷ 4 = 6." },
    { subject: "math", topic: "arithmetic", difficulty: "Easy", q: "What is 2³ (2 to the power 3)?",
      options: ["6", "8", "9", "12"], answer: 1, explain: "2³ = 2 × 2 × 2 = 8." },

    /* ---- Mathematics: Geometry ---- */
    { subject: "math", topic: "geometry", difficulty: "Easy", q: "The interior angles of a triangle add up to how many degrees?",
      options: ["90°", "180°", "270°", "360°"], answer: 1, explain: "The three interior angles of any triangle sum to 180°." },
    { subject: "math", topic: "geometry", difficulty: "Easy", q: "Find the area of a rectangle with length 5 and width 3.",
      options: ["8", "15", "16", "30"], answer: 1, explain: "Area = length × width = 5 × 3 = 15." },
    { subject: "math", topic: "geometry", difficulty: "Easy", q: "A right angle measures how many degrees?",
      options: ["45°", "60°", "90°", "180°"], answer: 2, explain: "A right angle is exactly 90°." },
    { subject: "math", topic: "geometry", difficulty: "Medium", q: "Which formula gives the circumference of a circle of radius r?",
      options: ["πr²", "2πr", "½πr", "2r²"], answer: 1, explain: "Circumference = 2πr (equivalently πd). πr² is the area." },

    /* ---- English: Grammar ---- */
    { subject: "english", topic: "grammar", difficulty: "Easy", q: "Choose the correct word: \"She ___ to school every day.\"",
      options: ["go", "goes", "going", "gone"], answer: 1, explain: "With the singular subject \"she\" in the present tense, the verb takes -s: \"goes\"." },
    { subject: "english", topic: "grammar", difficulty: "Easy", q: "What is the plural of \"child\"?",
      options: ["childs", "childes", "children", "childrens"], answer: 2, explain: "\"Child\" has the irregular plural \"children\"." },
    { subject: "english", topic: "grammar", difficulty: "Easy", q: "What is the simple past tense of \"run\"?",
      options: ["runned", "ran", "run", "running"], answer: 1, explain: "\"Run\" is irregular; its simple past is \"ran\"." },
    { subject: "english", topic: "grammar", difficulty: "Medium", q: "Choose the correct article: \"I saw ___ elephant at the zoo.\"",
      options: ["a", "an", "the only", "no article"], answer: 1, explain: "Use \"an\" before a word beginning with a vowel sound, as in \"an elephant\"." },
    { subject: "english", topic: "grammar", difficulty: "Medium", q: "Identify the verb: \"The dog barks loudly.\"",
      options: ["dog", "barks", "loudly", "the"], answer: 1, explain: "\"Barks\" is the action word (verb). \"Loudly\" is an adverb describing it." },

    /* ---- English: Vocabulary ---- */
    { subject: "english", topic: "vocabulary", difficulty: "Easy", q: "Choose the synonym of \"happy\".",
      options: ["sad", "joyful", "angry", "tired"], answer: 1, explain: "\"Joyful\" means the same as \"happy\"." },
    { subject: "english", topic: "vocabulary", difficulty: "Medium", q: "Choose the antonym of \"ancient\".",
      options: ["old", "modern", "historic", "past"], answer: 1, explain: "\"Modern\" (recent) is the opposite of \"ancient\" (very old)." },
    { subject: "english", topic: "vocabulary", difficulty: "Easy", q: "Choose the synonym of \"big\".",
      options: ["large", "small", "tiny", "little"], answer: 0, explain: "\"Large\" means the same as \"big\"." },
    { subject: "english", topic: "vocabulary", difficulty: "Medium", q: "Which word means \"to make something better\"?",
      options: ["worsen", "improve", "damage", "ignore"], answer: 1, explain: "\"Improve\" means to make something better." },
    { subject: "english", topic: "vocabulary", difficulty: "Medium", q: "Choose the antonym of \"generous\".",
      options: ["kind", "selfish", "giving", "open"], answer: 1, explain: "\"Selfish\" is the opposite of \"generous\"." },

    /* ---- Physics: Mechanics ---- */
    { subject: "physics", topic: "mechanics", difficulty: "Medium", q: "Which formula gives average speed?",
      options: ["distance × time", "distance ÷ time", "time ÷ distance", "distance + time"], answer: 1,
      explain: "Average speed = distance travelled ÷ time taken." },
    { subject: "physics", topic: "mechanics", difficulty: "Medium", q: "The acceleration due to gravity near Earth's surface is approximately…",
      options: ["9.8 m/s²", "3.0 × 10⁸ m/s", "1.6 m/s²", "98 m/s²"], answer: 0,
      explain: "Near Earth's surface g ≈ 9.8 m/s². (1.6 m/s² is near the Moon; 3×10⁸ m/s is the speed of light.)" },
    { subject: "physics", topic: "mechanics", difficulty: "Medium", q: "Which of these is a vector quantity?",
      options: ["speed", "mass", "velocity", "time"], answer: 2, explain: "Velocity has both size and direction, so it is a vector. Speed, mass and time are scalars." },
    { subject: "physics", topic: "mechanics", difficulty: "Medium", q: "The rate of doing work is called…",
      options: ["energy", "power", "force", "momentum"], answer: 1, explain: "Power is the rate of doing work (work ÷ time)." },

    /* ---- Physics: Units & quantities ---- */
    { subject: "physics", topic: "units", difficulty: "Easy", q: "What is the SI unit of force?",
      options: ["joule", "newton", "watt", "pascal"], answer: 1, explain: "Force is measured in newtons (N)." },
    { subject: "physics", topic: "units", difficulty: "Easy", q: "What is the SI unit of energy?",
      options: ["newton", "joule", "watt", "ampere"], answer: 1, explain: "Energy (and work) is measured in joules (J)." },
    { subject: "physics", topic: "units", difficulty: "Easy", q: "What is the SI unit of electric current?",
      options: ["volt", "ampere", "ohm", "watt"], answer: 1, explain: "Electric current is measured in amperes (A)." },
    { subject: "physics", topic: "units", difficulty: "Easy", q: "Mass is measured in which SI unit?",
      options: ["newton", "kilogram", "metre", "second"], answer: 1, explain: "The SI unit of mass is the kilogram (kg)." }
  ]
};
