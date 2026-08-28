import { useEffect, useState } from "react";
import "./App.css";

/*
=========================================================
CAPYPHYSICS SETTINGS
=========================================================
*/

const STORAGE_KEY = "capyphysics-progress-v2";

/*
Put reusable website images in:

public/images/

Example:

introCapy: "/images/capy-intro.png"
*/

const siteImages = {
  introCapy: "/images/capy-intro.png",
  happyCapy: null,
  sadCapy: null,
};

/*
=========================================================
BIG CURRICULUM TOPICS
=========================================================

The sidebar automatically checks the questions database
below and finds which questions belong to each topic.

If a topic has ZERO questions:
    → it automatically says COMING SOON.

If a topic has questions:
    → it becomes expandable.

If EVERY question in a topic is completed:
    → the big topic receives a check mark.
*/

const curriculum = [
  {
    id: "motion",
    label: "Motion",
  },

  {
    id: "forces",
    label: "Forces",
  },

  {
    id: "energy",
    label: "Energy",
  },

  {
    id: "momentum",
    label: "Momentum",
  },

  {
    id: "waves",
    label: "Waves",
  },

  {
    id: "electricity",
    label: "Electricity",
  },
];

/*
=========================================================
QUESTION DATABASE
=========================================================

THIS is the main section you will edit when you make
more questions.

Each question contains:

id
topicId
order
navLabel
title
wordProblem
prompt
sceneImage
sceneArtNote
answers
hint
equation
equationExplanation

When you eventually draw an image, change:

sceneImage: null

to:

sceneImage: "/images/motion/q01-main.png"

Same idea for answer images.
*/

const questions = [
  /*
  =========================================================
  1 — DROPPING THE BALL
  =========================================================
  */

  {
    id: "dropping-the-ball",

    topicId: "motion",

    order: 1,

    navLabel: "Dropping the Ball",

    title: "What happens when Capy drops the ball?",

    wordProblem:
      "Capy holds a ball completely still above the ground. He opens his paw and releases it.",

    prompt:
      "Which picture shows what happens immediately after Capy releases the ball?",

    sceneImage: "/images/Capy_drop_red.png_medres.png",

    sceneArtNote:
      "Draw Capy holding a ball at some height and releasing it.",

    answers: [
      {
        id: "up",

        label: "The ball moves upward",

        image: "/images/red_ball_up.png",

        artNote:
          "Draw the ball beginning to move upward.",

        correct: false,

        feedback:
          "The ball had no upward velocity when Capy released it, and nothing suddenly pushes it upward. Gravity acts downward.",
      },

      {
        id: "down",

        label: "The ball moves downward",

        image: "/images/red_ball_down.png",

        artNote:
          "Draw the ball beginning to fall straight downward.",

        correct: true,

        feedback:
          "Exactly. Once Capy releases the ball, gravity causes it to accelerate downward.",
      },

      {
        id: "sideways",

        label: "The ball moves sideways",

        image: "/images/red_ball_left.png",

        artNote:
          "Draw the ball beginning to move sideways.",

        correct: false,

        feedback:
          "Capy did not give the ball any sideways velocity. Gravity changes its motion in the downward direction.",
      },
    ],

    hint:
      "After Capy lets go, what force is acting on the ball, and which direction does that force point?",

    equation:
      "y = y₀ + v₀t + ½at²",

    equationExplanation:
      "The ball starts with v₀ = 0. Gravity gives it a downward acceleration.",

    /*
    OPTIONAL fake statistics.

    These are just for the demo analytics screen.
    */

    demoStats: {
      responses: 143,
      firstAttemptCorrect: 89,
      wordProblemUsed: 8,
      hintUsed: 12,
      equationUsed: 4,
      averageAttempts: 1.14,

      wrongAnswers: {
        up: 6,
        sideways: 5,
      },
    },
  },

  /*
  =========================================================
  2 — HEAVY VS LIGHT
  =========================================================
  */

  {
    id: "heavy-vs-light",

    topicId: "motion",

    order: 2,

    navLabel: "Heavy vs. Light",

    title: "Does a heavier ball fall faster?",

    wordProblem:
      "Capy releases a light ball and a much heavier ball from the same height at exactly the same time. Ignore air resistance.",

    prompt:
      "Which picture correctly shows when the balls hit the ground?",

    sceneImage: null,

    sceneArtNote:
      "Draw two Capys side by side. One releases a small light ball and the other releases a visibly heavy ball from the same height.",

    answers: [
      {
        id: "heavy-first",

        label: "The heavy ball lands first",

        image: null,

        artNote:
          "Draw two clocks showing the heavy ball hitting first.",

        correct: false,

        feedback:
          "It feels intuitive that the heavier ball should fall faster, but ignoring air resistance, both objects have the same gravitational acceleration.",
      },

      {
        id: "same-time",

        label: "They land at the same time",

        image: null,

        artNote:
          "Draw matching clocks showing both balls hitting at the same time.",

        correct: true,

        feedback:
          "Exactly. Ignoring air resistance, both balls accelerate downward at the same rate regardless of their mass.",
      },

      {
        id: "light-first",

        label: "The light ball lands first",

        image: null,

        artNote:
          "Draw two clocks showing the light ball hitting first.",

        correct: false,

        feedback:
          "The lighter ball does not receive a larger gravitational acceleration. Ignoring air resistance, both objects fall at the same rate.",
      },
    ],

    hint:
      "Look at the falling-motion equation. Does the mass of the ball appear anywhere in it?",

    equation:
      "y = y₀ + ½gt²",

    equationExplanation:
      "Notice that mass does not appear. Ignoring air resistance, heavy and light objects have the same gravitational acceleration.",

    demoStats: {
      responses: 136,
      firstAttemptCorrect: 68,
      wordProblemUsed: 17,
      hintUsed: 30,
      equationUsed: 13,
      averageAttempts: 1.38,

      wrongAnswers: {
        "heavy-first": 29,
        "light-first": 3,
      },
    },
  },

  /*
  =========================================================
  3 — THROWING DOWNWARD
  =========================================================
  */

  {
    id: "throwing-downward",

    topicId: "motion",

    order: 3,

    navLabel: "Throwing Downward",

    title: "What changes if Capy throws the ball downward?",

    wordProblem:
      "Two identical balls begin at the same height. Capy drops one from rest and throws the other straight downward. Both begin moving at the same time.",

    prompt:
      "Which ball reaches the ground first?",

    sceneImage: null,

    sceneArtNote:
      "Draw two Capys side by side. One simply releases a ball. The other throws a ball downward with a clear downward velocity arrow.",

    answers: [
      {
        id: "thrown-first",

        label: "The thrown ball lands first",

        image: null,

        artNote:
          "Draw clocks showing the downward-thrown ball hitting first.",

        correct: true,

        feedback:
          "Exactly. Both balls accelerate downward at the same rate, but the thrown ball already has downward velocity when the motion begins.",
      },

      {
        id: "same-time",

        label: "They land at the same time",

        image: null,

        artNote:
          "Draw matching clocks.",

        correct: false,

        feedback:
          "Their accelerations are the same, but their initial velocities are different. The thrown ball begins with downward velocity.",
      },

      {
        id: "dropped-first",

        label: "The dropped ball lands first",

        image: null,

        artNote:
          "Draw clocks showing the dropped ball hitting first.",

        correct: false,

        feedback:
          "The thrown ball begins with an advantage: it already has velocity toward the ground.",
      },
    ],

    hint:
      "Both balls have the same acceleration. What is different about their velocities at the instant the motion begins?",

    equation:
      "Δy = v₀t + ½gt²",

    equationExplanation:
      "For the dropped ball, v₀ = 0. The downward-thrown ball already has an initial velocity toward the ground.",
  },

  /*
  =========================================================
  4 — THROWING UPWARD
  =========================================================
  */

  {
    id: "throwing-upward",

    topicId: "motion",

    order: 4,

    navLabel: "Throwing Upward",

    title: "What if Capy throws the ball upward instead?",

    wordProblem:
      "Two identical balls begin at the same height. Capy drops one ball while throwing the other straight upward. Both motions begin at the same time.",

    prompt:
      "Which ball reaches the ground first?",

    sceneImage: null,

    sceneArtNote:
      "Draw one ball being dropped and another being thrown upward. Make the upward velocity arrow obvious.",

    answers: [
      {
        id: "up-first",

        label: "The upward-thrown ball lands first",

        image: null,

        artNote:
          "Draw clocks showing the upward-thrown ball hitting first.",

        correct: false,

        feedback:
          "The upward-thrown ball first moves away from the ground. It must slow down, stop, reverse direction, and then fall.",
      },

      {
        id: "same-time",

        label: "They land at the same time",

        image: null,

        artNote:
          "Draw matching clocks.",

        correct: false,

        feedback:
          "The upward-thrown ball spends additional time traveling upward before it begins falling toward the ground.",
      },

      {
        id: "dropped-first",

        label: "The dropped ball lands first",

        image: null,

        artNote:
          "Draw clocks showing the dropped ball hitting first.",

        correct: true,

        feedback:
          "Exactly. The upward-thrown ball first rises, slows to zero vertical velocity, and then reverses direction.",
      },
    ],

    hint:
      "Before the upward-thrown ball can fall toward the ground, what must happen to its upward velocity?",

    equation:
      "Δy = v₀t − ½gt²",

    equationExplanation:
      "An initial upward velocity increases the amount of time the ball remains in the air.",
  },

  /*
  =========================================================
  5 — DROP VS HORIZONTAL THROW
  =========================================================
  */

  {
    id: "drop-vs-horizontal",

    topicId: "motion",

    order: 5,

    navLabel: "Drop vs. Horizontal Throw",

    title: "Does throwing sideways change how fast a ball falls?",

    wordProblem:
      "Two identical balls begin at the same height. One is dropped while the other is thrown horizontally. They begin at the same time. Ignore air resistance.",

    prompt:
      "Which ball reaches the ground first?",

    sceneImage: null,

    sceneArtNote:
      "Draw one Capy dropping a ball and another Capy throwing a ball perfectly horizontally from the same height.",

    answers: [
      {
        id: "dropped-first",

        label: "The dropped ball lands first",

        image: null,

        artNote:
          "Draw the dropped ball's clock finishing first.",

        correct: false,

        feedback:
          "Horizontal motion does not slow the ball's downward acceleration. Both balls have identical vertical motion.",
      },

      {
        id: "same-time",

        label: "They land at the same time",

        image: null,

        artNote:
          "Draw clocks showing identical elapsed time.",

        correct: true,

        feedback:
          "Exactly. The thrown ball moves sideways while it falls, but its vertical motion is identical to the dropped ball.",
      },

      {
        id: "thrown-first",

        label: "The thrown ball lands first",

        image: null,

        artNote:
          "Draw the horizontally thrown ball's clock finishing first.",

        correct: false,

        feedback:
          "The thrown ball has more total speed, but the extra speed is horizontal. It does not increase its downward acceleration.",
      },
    ],

    hint:
      "Ignore everything happening left and right. If you look only at the vertical direction, are the two balls different?",

    equation:
      "Vertical: y = y₀ − ½gt²",

    equationExplanation:
      "Horizontal velocity does not appear in the vertical-motion equation. Horizontal and vertical motion can be treated independently.",
  },

  /*
  =========================================================
  6 — DIFFERENT HORIZONTAL SPEEDS
  =========================================================
  */

  {
    id: "different-horizontal-speeds",

    topicId: "motion",

    order: 6,

    navLabel: "Different Throwing Strengths",

    title: "What happens if Capy throws one ball harder?",

    wordProblem:
      "Two balls are thrown horizontally from the same height. The blue ball is thrown much faster than the red ball. Ignore air resistance.",

    prompt:
      "Which ball travels farther sideways before reaching the ground?",

    sceneImage: null,

    sceneArtNote:
      "Draw two horizontal launches from identical heights. Give the red ball a short horizontal velocity arrow and the blue ball a much longer arrow.",

    answers: [
      {
        id: "blue-farther",

        label: "The faster blue ball travels farther",

        image: null,

        artNote:
          "Draw the blue trajectory landing farther away than the red trajectory.",

        correct: true,

        feedback:
          "Exactly. Both remain in the air for the same amount of time, but the blue ball has more horizontal velocity and therefore travels farther sideways.",
      },

      {
        id: "same-distance",

        label: "They travel the same distance",

        image: null,

        artNote:
          "Draw both trajectories landing at the same horizontal distance.",

        correct: false,

        feedback:
          "Their flight times are the same, but their horizontal speeds are different. The faster ball covers more distance during the same time.",
      },

      {
        id: "red-farther",

        label: "The slower red ball travels farther",

        image: null,

        artNote:
          "Draw the red trajectory landing farther away than the blue trajectory.",

        correct: false,

        feedback:
          "Both balls have the same amount of time before hitting the ground. The one with greater horizontal velocity travels farther.",
      },
    ],

    hint:
      "You already know their fall times are the same. If both move for the same amount of time, which one covers more sideways distance?",

    equation:
      "Δx = vₓt",

    equationExplanation:
      "The flight time comes from the vertical motion. Greater horizontal velocity means greater horizontal distance during that time.",
  },

  /*
  =========================================================
  7 — HORIZONTAL VS ANGLED THROW
  =========================================================
  */

  {
    id: "horizontal-vs-angled",

    topicId: "motion",

    order: 7,

    navLabel: "Horizontal vs. Angled Throw",

    title: "Can an upward throw keep a ball in the air longer?",

    wordProblem:
      "Two balls are launched from the same height. The red ball is thrown horizontally. The blue ball is thrown upward at an angle. Ignore air resistance.",

    prompt:
      "Which ball stays in the air longer?",

    sceneImage: null,

    sceneArtNote:
      "Draw the red ball launched horizontally and the blue ball launched diagonally upward. Make the blue ball's upward component obvious.",

    answers: [
      {
        id: "red-longer",

        label: "The horizontal red ball",

        image: null,

        artNote:
          "Draw the red trajectory staying in flight longer.",

        correct: false,

        feedback:
          "The red ball begins falling vertically immediately. The blue ball initially has an upward velocity component.",
      },

      {
        id: "same-time",

        label: "They stay in the air for the same time",

        image: null,

        artNote:
          "Draw both trajectories with identical flight times.",

        correct: false,

        feedback:
          "This time their initial vertical velocities are different. The angled ball initially moves upward.",
      },

      {
        id: "blue-longer",

        label: "The upward-angled blue ball",

        image: null,

        artNote:
          "Draw the blue trajectory remaining in the air longer.",

        correct: true,

        feedback:
          "Exactly. The blue ball has an upward component of velocity, so it first rises before gravity reverses its vertical motion.",
      },
    ],

    hint:
      "Which ball has an initial velocity component pointing upward?",

    equation:
      "y = y₀ + vᵧ₀t − ½gt²",

    equationExplanation:
      "An upward initial vertical velocity increases the total time before the projectile reaches the ground.",
  },

  /*
  =========================================================
  8 — VELOCITY COMPONENTS
  =========================================================
  */

  {
    id: "velocity-components",

    topicId: "motion",

    order: 8,

    navLabel: "Velocity Components",

    title: "What does an angled velocity really mean?",

    wordProblem:
      "Capy throws a ball upward and to the right. Its diagonal velocity can be separated into horizontal and vertical components.",

    prompt:
      "Which picture correctly breaks the velocity into components?",

    sceneImage: null,

    sceneArtNote:
      "Draw Capy throwing a ball diagonally upward and to the right. Show one diagonal velocity arrow.",

    answers: [
      {
        id: "correct-components",

        label: "Rightward and upward components",

        image: null,

        artNote:
          "Draw the diagonal vector with a rightward horizontal component and an upward vertical component.",

        correct: true,

        feedback:
          "Exactly. The diagonal velocity can be represented by independent horizontal and vertical components.",
      },

      {
        id: "both-horizontal",

        label: "Two horizontal components",

        image: null,

        artNote:
          "Draw an incorrect diagram with both components pointing horizontally.",

        correct: false,

        feedback:
          "Two horizontal arrows cannot reproduce a velocity that also points upward.",
      },

      {
        id: "wrong-directions",

        label: "Leftward and downward components",

        image: null,

        artNote:
          "Draw an incorrect diagram with the components pointing left and down.",

        correct: false,

        feedback:
          "The components must combine to point in the same direction as the original velocity: upward and to the right.",
      },
    ],

    hint:
      "Imagine drawing a right triangle around the diagonal velocity arrow. Which two directions form that triangle?",

    equation:
      "vₓ = v cosθ     vᵧ = v sinθ",

    equationExplanation:
      "A diagonal velocity can be separated into horizontal and vertical components.",
  },

  /*
  =========================================================
  9 — COMPLEMENTARY ANGLES
  =========================================================
  */

  {
    id: "complementary-angles",

    topicId: "motion",

    order: 9,

    navLabel: "Launch Angle",

    title: "Can two different launch angles have the same range?",

    wordProblem:
      "Two balls are launched from level ground with the same speed. One is launched at 30° and the other at 60°. Both land at the same height. Ignore air resistance.",

    prompt:
      "Which ball travels farther horizontally?",

    sceneImage: null,

    sceneArtNote:
      "Draw two trajectories starting and ending at the same height. One launches at 30° and one at 60° with equal initial speed arrows.",

    answers: [
      {
        id: "30-farther",

        label: "The 30° ball travels farther",

        image: null,

        artNote:
          "Draw the 30° trajectory landing farther away.",

        correct: false,

        feedback:
          "The 30° projectile has more horizontal velocity, but the 60° projectile remains in the air longer. Those effects balance.",
      },

      {
        id: "same-range",

        label: "They travel the same distance",

        image: null,

        artNote:
          "Draw the 30° and 60° trajectories landing at the same horizontal position.",

        correct: true,

        feedback:
          "Exactly. Complementary launch angles such as 30° and 60° have the same ideal range when launch and landing heights are equal.",
      },

      {
        id: "60-farther",

        label: "The 60° ball travels farther",

        image: null,

        artNote:
          "Draw the 60° trajectory landing farther away.",

        correct: false,

        feedback:
          "The 60° projectile stays in the air longer, but it has less horizontal velocity. Those effects balance.",
      },
    ],

    hint:
      "The 30° ball has more horizontal speed. The 60° ball has more time in the air. Could those effects balance?",

    equation:
      "R = (v₀²/g) sin(2θ)",

    equationExplanation:
      "For 30° the equation contains sin(60°). For 60° it contains sin(120°). Those values are equal.",
  },

  /*
  =========================================================
  10 — MAXIMUM RANGE
  =========================================================
  */

  {
    id: "maximum-range",

    topicId: "motion",

    order: 10,

    navLabel: "Maximum Range",

    title: "Which launch angle sends the ball farthest?",

    wordProblem:
      "Capy launches identical balls from level ground at the same speed. One is launched at 30°, one at 45°, and one at 60°. Ignore air resistance.",

    prompt:
      "Which launch angle gives the greatest horizontal range?",

    sceneImage: null,

    sceneArtNote:
      "Draw Capy with three equal-length launch arrows labeled 30°, 45°, and 60°. All launches begin and end at the same height.",

    answers: [
      {
        id: "30",

        label: "30°",

        image: null,

        artNote:
          "Draw the 30° trajectory as the proposed longest-range answer.",

        correct: false,

        feedback:
          "At 30°, the ball has plenty of horizontal speed but less upward speed, so it does not remain in the air as long.",
      },

      {
        id: "45",

        label: "45°",

        image: null,

        artNote:
          "Draw the 45° trajectory as the longest-range answer.",

        correct: true,

        feedback:
          "Exactly. For an ideal projectile launched and landing at the same height, 45° gives maximum range for a fixed launch speed.",
      },

      {
        id: "60",

        label: "60°",

        image: null,

        artNote:
          "Draw the 60° trajectory as the proposed longest-range answer.",

        correct: false,

        feedback:
          "At 60°, the projectile stays in the air longer, but its horizontal velocity is smaller.",
      },
    ],

    hint:
      "A shallow angle gives lots of horizontal speed but little time in the air. A steep angle gives lots of time but less horizontal speed. Which angle gives the best balance?",

    equation:
      "R = (v₀²/g) sin(2θ)",

    equationExplanation:
      "Range is largest when sin(2θ) = 1. That happens when 2θ = 90°, giving θ = 45°.",
  },
];

/*
=========================================================
LOCAL STUDENT PROGRESS
=========================================================

This is already structured similarly to what we will
eventually send to a real database.

For now it NEVER leaves the person's browser.
*/

function createBlankProgress() {
  return {
    completed: false,

    attempts: 0,

    firstAttemptCorrect: null,

    revealedWordProblem: false,

    usedHint: false,

    usedEquation: false,

    wrongAnswers: [],
  };
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {};
    }

    return JSON.parse(saved);
  } catch {
    return {};
  }
}

/*
=========================================================
QUESTION ART
=========================================================
*/

function QuestionScene({ question }) {
  /*
  REAL IMAGE
  */

  if (question.sceneImage) {
    return (
      <div className="scene imageScene">
        <img
          className="sceneImage"
          src={question.sceneImage}
          alt={question.title}
        />
      </div>
    );
  }

  /*
  ARTWORK PLACEHOLDER
  */

  return (
    <div className="scene artworkPlaceholder">

      <div className="artworkPlaceholderContent">

        <span className="artworkIcon">
          ✎
        </span>

        <strong>
          Question artwork placeholder
        </strong>

        <p>
          {question.sceneArtNote}
        </p>

      </div>

    </div>
  );
}

/*
=========================================================
ANSWER ART
=========================================================
*/

function AnswerVisual({ answer }) {
  /*
  REAL IMAGE
  */

  if (answer.image) {
    return (
      <div className="answerPicture imageAnswer">

        <img
          className="answerImage"
          src={answer.image}
          alt={answer.label}
        />

      </div>
    );
  }

  /*
  ARTWORK PLACEHOLDER
  */

  return (
    <div className="answerPicture answerArtworkPlaceholder">

      <span className="smallArtworkIcon">
        ✎
      </span>

      <p>
        {answer.artNote}
      </p>

    </div>
  );
}

/*
=========================================================
FAKE ANALYTICS
=========================================================

Questions can have manually selected fake numbers
using demoStats.

If they don't, this automatically makes fake values.

Therefore adding Question 11 automatically gives it
an analytics row without additional programming.
*/

function createAutomaticDemoStats(question, index) {
  const firstAttemptCorrect =
    Math.max(
      40,
      80 - index * 4
    );

  const incorrectAnswers =
    question.answers.filter(
      (answer) =>
        !answer.correct
    );

  let remaining =
    100 -
    firstAttemptCorrect;

  const wrongAnswers = {};

  incorrectAnswers.forEach(
    (answer, wrongIndex) => {

      const answersLeft =
        incorrectAnswers.length -
        wrongIndex;

      let amount;

      if (
        wrongIndex ===
        incorrectAnswers.length - 1
      ) {
        amount = remaining;
      } else {
        amount =
          Math.round(
            remaining /
              answersLeft
          );
      }

      wrongAnswers[
        answer.id
      ] = amount;

      remaining -= amount;
    }
  );

  return {
    responses:
      105 + index * 9,

    firstAttemptCorrect,

    wordProblemUsed:
      Math.min(
        65,
        13 + index * 3
      ),

    hintUsed:
      Math.min(
        75,
        20 + index * 4
      ),

    equationUsed:
      Math.min(
        65,
        9 + index * 3
      ),

    averageAttempts:
      Number(
        (
          1.18 +
          index * 0.09
        ).toFixed(2)
      ),

    wrongAnswers,
  };
}

function getDemoStats(
  question,
  index
) {
  return (
    question.demoStats ??
    createAutomaticDemoStats(
      question,
      index
    )
  );
}

/*
=========================================================
ANALYTICS BAR
=========================================================
*/

function MetricBar({
  label,
  value,
}) {
  return (
    <div className="metricBar">

      <div className="metricHeader">

        <span>
          {label}
        </span>

        <strong>
          {value}%
        </strong>

      </div>

      <div className="metricTrack">

        <div
          className="metricFill"
          style={{
            width: `${value}%`,
          }}
        ></div>

      </div>

    </div>
  );
}

/*
=========================================================
ANALYTICS PAGE
=========================================================
*/

function AnalyticsPage() {
  const analyticsRows =
    questions.map(
      (question, index) => ({
        question,

        stats:
          getDemoStats(
            question,
            index
          ),
      })
    );

  const totalResponses =
    analyticsRows.reduce(
      (sum, row) =>
        sum +
        row.stats.responses,

      0
    );

  const weightedFirstTry =
    totalResponses === 0
      ? 0
      : Math.round(
          analyticsRows.reduce(
            (sum, row) =>
              sum +
              row.stats.responses *
                row.stats
                  .firstAttemptCorrect,

            0
          ) / totalResponses
        );

  const weightedWordUse =
    totalResponses === 0
      ? 0
      : Math.round(
          analyticsRows.reduce(
            (sum, row) =>
              sum +
              row.stats.responses *
                row.stats
                  .wordProblemUsed,

            0
          ) / totalResponses
        );

  const weightedHintUse =
    totalResponses === 0
      ? 0
      : Math.round(
          analyticsRows.reduce(
            (sum, row) =>
              sum +
              row.stats.responses *
                row.stats.hintUsed,

            0
          ) / totalResponses
        );

  return (
    <main className="main analyticsMain">

      <div className="analyticsHeader">

        <div>

          <p className="eyebrow">
            INSTRUCTOR VIEW
          </p>

          <h2>
            Learning Analytics
          </h2>

          <p className="analyticsIntro">
            CapyPhysics is designed to
            measure more than whether a
            learner eventually reaches
            the right answer. These
            metrics show whether students
            understood the problem
            visually and which forms of
            scaffolding they needed.
          </p>

        </div>

        <div className="demoBadge">
          DEMO DATA
        </div>

      </div>

      <div className="demoWarning">

        <strong>
          These numbers are fake.
        </strong>

        {" "}

        This version is frontend-only
        and does not collect information
        from visitors. The page
        demonstrates what anonymous
        aggregate learning analytics
        could look like after a database
        is connected.

      </div>

      {/* SUMMARY */}

      <div className="analyticsSummary">

        <div className="summaryCard">

          <span className="summaryNumber">
            {questions.length}
          </span>

          <span className="summaryLabel">
            Active questions
          </span>

        </div>

        <div className="summaryCard">

          <span className="summaryNumber">
            {totalResponses}
          </span>

          <span className="summaryLabel">
            Demo responses
          </span>

        </div>

        <div className="summaryCard">

          <span className="summaryNumber">
            {weightedFirstTry}%
          </span>

          <span className="summaryLabel">
            First-attempt accuracy
          </span>

        </div>

        <div className="summaryCard">

          <span className="summaryNumber">
            {weightedHintUse}%
          </span>

          <span className="summaryLabel">
            Used conceptual hint
          </span>

        </div>

      </div>

      {/* TABLE HEADERS */}

      <div className="analyticsTableHeader">

        <span>
          QUESTION
        </span>

        <span>
          FIRST TRY
        </span>

        <span>
          WORDS
        </span>

        <span>
          HINT
        </span>

        <span>
          EQUATION
        </span>

      </div>

      {/* QUESTIONS */}

      <div className="analyticsQuestionList">

        {analyticsRows.map(
          ({
            question,
            stats,
          }) => {

            const incorrectAnswers =
              question.answers.filter(
                (answer) =>
                  !answer.correct
              );

            return (
              <details
                key={
                  question.id
                }
                className="analyticsQuestion"
              >

                <summary className="analyticsQuestionSummary">

                  <span className="analyticsQuestionName">
                    {
                      question.navLabel
                    }
                  </span>

                  <strong>
                    {
                      stats.firstAttemptCorrect
                    }%
                  </strong>

                  <span>
                    {
                      stats.wordProblemUsed
                    }%
                  </span>

                  <span>
                    {
                      stats.hintUsed
                    }%
                  </span>

                  <span>
                    {
                      stats.equationUsed
                    }%
                  </span>

                </summary>

                <div className="analyticsDetails">

                  <div className="analyticsDetailTop">

                    <div>

                      <p className="detailLabel">
                        Demo responses
                      </p>

                      <p className="detailValue">
                        {
                          stats.responses
                        }
                      </p>

                    </div>

                    <div>

                      <p className="detailLabel">
                        Average attempts
                      </p>

                      <p className="detailValue">
                        {
                          stats.averageAttempts
                        }
                      </p>

                    </div>

                  </div>

                  {/* SCAFFOLDING */}

                  <div className="metricGroup">

                    <h3>
                      Learning support used
                    </h3>

                    <MetricBar
                      label="Revealed word problem"
                      value={
                        stats.wordProblemUsed
                      }
                    />

                    <MetricBar
                      label="Used conceptual hint"
                      value={
                        stats.hintUsed
                      }
                    />

                    <MetricBar
                      label="Opened equation"
                      value={
                        stats.equationUsed
                      }
                    />

                  </div>

                  {/* ANSWER BREAKDOWN */}

                  <div className="misconceptionGroup">

                    <h3>
                      First-attempt answers
                    </h3>

                    <MetricBar
                      label="Correct answer"
                      value={
                        stats.firstAttemptCorrect
                      }
                    />

                    {incorrectAnswers.map(
                      (answer) => (
                        <MetricBar
                          key={
                            answer.id
                          }
                          label={
                            answer.label
                          }
                          value={
                            stats
                              .wrongAnswers[
                              answer.id
                            ] ?? 0
                          }
                        />
                      )
                    )}

                  </div>

                </div>

              </details>
            );
          }
        )}

      </div>

      {/* BACKEND PREVIEW */}

      <div className="analyticsArchitecture">

        <h3>
          What the future backend will
          record anonymously
        </h3>

        <div className="dataFields">

          <span>
            Question ID
          </span>

          <span>
            First attempt correct
          </span>

          <span>
            Number of attempts
          </span>

          <span>
            Wrong answers chosen
          </span>

          <span>
            Word problem revealed
          </span>

          <span>
            Hint used
          </span>

          <span>
            Equation used
          </span>

        </div>

      </div>

      <div className="analyticsExplanation">

        <h3>
          Why collect these measurements?
        </h3>

        <p>
          A question with low
          first-attempt accuracy may
          indicate that the concept or
          visual explanation needs work.
          A high rate of word-problem
          reveals could suggest that the
          picture is not communicating
          the situation clearly enough.
          High hint usage may reveal a
          difficult conceptual step,
          while the distribution of
          incorrect answers can identify
          specific misconceptions.
        </p>

      </div>

    </main>
  );
}

/*
=========================================================
COLLAPSIBLE SIDEBAR
=========================================================
*/

function Sidebar({
  currentQuestionId,
  progress,
  view,
  onQuestion,
  onAnalytics,
  onHome,
}) {
  const currentQuestion =
    questions.find(
      (question) =>
        question.id ===
        currentQuestionId
    );

  const currentTopicId =
    currentQuestion?.topicId;

  /*
  Motion starts expanded because
  that is where our current question is.
  */

  const [
    expandedTopics,
    setExpandedTopics,
  ] = useState(() => ({
    [currentTopicId]: true,
  }));

  /*
  If a user jumps into another topic
  later, automatically expand it.
  */

  useEffect(() => {
    if (!currentTopicId) {
      return;
    }

    setExpandedTopics(
      (previous) => ({
        ...previous,

        [currentTopicId]: true,
      })
    );
  }, [currentTopicId]);

  function toggleTopic(
    topicId
  ) {
    setExpandedTopics(
      (previous) => ({
        ...previous,

        [topicId]:
          !previous[
            topicId
          ],
      })
    );
  }

  return (
    <aside className="sidebar">

      {/* LOGO */}

      <button
        className="logoButton"
        onClick={onHome}
      >

        <div className="logo">

          <span className="logoCapy">
            🦫
          </span>

          <div>

            <h1>
              CapyPhysics
            </h1>

            <p>
              See physics before you
              calculate it.
            </p>

          </div>

        </div>

      </button>

      {/* TREE */}

      <div className="topicSection">

        <p className="topicHeading">
          PHYSICS MAP
        </p>

        {curriculum.map(
          (topic) => {

            const topicQuestions =
              questions
                .filter(
                  (question) =>
                    question.topicId ===
                    topic.id
                )
                .sort(
                  (a, b) =>
                    a.order -
                    b.order
                );

            const hasQuestions =
              topicQuestions.length >
              0;

            const allFinished =
              hasQuestions &&
              topicQuestions.every(
                (question) =>
                  progress[
                    question.id
                  ]?.completed
              );

            const activeTopic =
              view === "lesson" &&
              topicQuestions.some(
                (question) =>
                  question.id ===
                  currentQuestionId
              );

            const expanded =
              expandedTopics[
                topic.id
              ] ?? false;

            return (
              <div
                className="curriculumTopic"
                key={
                  topic.id
                }
              >

                {/* TOPIC WITH QUESTIONS */}

                {hasQuestions ? (

                  <button
                    className={`topicHeaderButton ${
                      activeTopic
                        ? "activeTopic"
                        : ""
                    }`}
                    onClick={() =>
                      toggleTopic(
                        topic.id
                      )
                    }
                  >

                    <span className="expandArrow">

                      {expanded
                        ? "⌄"
                        : "›"}

                    </span>

                    <span
                      className={`bigTopicStatus ${
                        allFinished
                          ? "finishedTopic"
                          : ""
                      }`}
                    >

                      {allFinished
                        ? "✓"
                        : "○"}

                    </span>

                    <span className="topicLabel">
                      {topic.label}
                    </span>

                  </button>

                ) : (

                  /*
                  TOPIC WITH NO QUESTIONS
                  */

                  <div className="topicHeaderComingSoon">

                    <span className="expandArrow mutedArrow">
                      ›
                    </span>

                    <span className="bigTopicStatus">
                      ○
                    </span>

                    <span className="topicLabel">
                      {topic.label}
                    </span>

                    <span className="bigComingSoon">
                      Coming soon
                    </span>

                  </div>
                )}

                {/* INDIVIDUAL QUESTIONS */}

                {hasQuestions &&
                  expanded && (

                    <div className="subtopics">

                      {topicQuestions.map(
                        (
                          question
                        ) => {

                          const completed =
                            progress[
                              question
                                .id
                            ]
                              ?.completed;

                          const current =
                            view ===
                              "lesson" &&
                            question.id ===
                              currentQuestionId;

                          return (
                            <button
                              key={
                                question.id
                              }
                              className={`subtopicButton ${
                                current
                                  ? "current"
                                  : ""
                              }`}
                              onClick={() =>
                                onQuestion(
                                  question.id
                                )
                              }
                            >

                              <span className="questionStatus">

                                {completed
                                  ? "✓"
                                  : current
                                    ? "●"
                                    : "○"}

                              </span>

                              <span>
                                {
                                  question.navLabel
                                }
                              </span>

                            </button>
                          );
                        }
                      )}

                    </div>
                  )}

              </div>
            );
          }
        )}

      </div>

      {/* ANALYTICS */}

      <div className="sidebarBottom">

        <button
          className={`analyticsNavButton ${
            view ===
            "analytics"
              ? "currentAnalytics"
              : ""
          }`}
          onClick={
            onAnalytics
          }
        >

          <span className="analyticsIcon">
            ▥
          </span>

          <span>
            Demo Analytics
          </span>

        </button>

      </div>

    </aside>
  );
}

/*
=========================================================
MAIN APP
=========================================================
*/

function App() {
  const [
    started,
    setStarted,
  ] = useState(false);

  const [
    view,
    setView,
  ] = useState("lesson");

  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState(null);

  const [
    showWordProblem,
    setShowWordProblem,
  ] = useState(false);

  const [
    showHint,
    setShowHint,
  ] = useState(false);

  const [
    showEquation,
    setShowEquation,
  ] = useState(false);

  const [
    progress,
    setProgress,
  ] = useState(
    () => loadProgress()
  );

  const question =
    questions[
      currentQuestionIndex
    ];

  const isLastQuestion =
    currentQuestionIndex ===
    questions.length - 1;

  /*
  SAVE PROGRESS LOCALLY
  */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        progress
      )
    );
  }, [progress]);

  /*
  GET PROGRESS
  */

  function getQuestionProgress(
    questionId
  ) {
    return {
      ...createBlankProgress(),

      ...(progress[
        questionId
      ] ?? {}),
    };
  }

  /*
  UPDATE PROGRESS
  */

  function updateProgress(
    questionId,
    updater
  ) {
    setProgress(
      (previous) => {

        const existing = {
          ...createBlankProgress(),

          ...(previous[
            questionId
          ] ?? {}),
        };

        const updated =
          updater(
            existing
          );

        return {
          ...previous,

          [questionId]:
            updated,
        };
      }
    );
  }

  /*
  RESET SCREEN, NOT PROGRESS
  */

  function resetQuestionDisplay() {
    setSelectedAnswer(null);

    setShowWordProblem(false);

    setShowHint(false);

    setShowEquation(false);
  }

  /*
  START
  */

  function startExploring() {
    setStarted(true);

    setView("lesson");

    setCurrentQuestionIndex(0);

    resetQuestionDisplay();
  }

  /*
  ANALYTICS
  */

  function openAnalytics() {
    setStarted(true);

    setView("analytics");

    setSelectedAnswer(null);
  }

  /*
  HOME
  */

  function goHome() {
    setStarted(false);
  }

  /*
  JUMP TO QUESTION
  */

  function goToQuestionById(
    questionId
  ) {
    const index =
      questions.findIndex(
        (item) =>
          item.id ===
          questionId
      );

    if (index === -1) {
      return;
    }

    setView("lesson");

    setCurrentQuestionIndex(
      index
    );

    resetQuestionDisplay();
  }

  /*
  MOVE BY NUMBER
  */

  function goToQuestion(
    index
  ) {
    if (
      index < 0 ||
      index >=
        questions.length
    ) {
      return;
    }

    setView("lesson");

    setCurrentQuestionIndex(
      index
    );

    resetQuestionDisplay();
  }

  /*
  REVEAL WORD PROBLEM
  */

  function revealWordProblem() {
    setShowWordProblem(true);

    const existing =
      getQuestionProgress(
        question.id
      );

    if (
      !existing.completed
    ) {
      updateProgress(
        question.id,

        (current) => ({
          ...current,

          revealedWordProblem:
            true,
        })
      );
    }
  }

  /*
  HINT
  */

  function toggleHint() {
    const opening =
      !showHint;

    setShowHint(opening);

    const existing =
      getQuestionProgress(
        question.id
      );

    if (
      opening &&
      !existing.completed
    ) {
      updateProgress(
        question.id,

        (current) => ({
          ...current,

          usedHint: true,
        })
      );
    }
  }

  /*
  EQUATION
  */

  function toggleEquation() {
    const opening =
      !showEquation;

    setShowEquation(opening);

    const existing =
      getQuestionProgress(
        question.id
      );

    if (
      opening &&
      !existing.completed
    ) {
      updateProgress(
        question.id,

        (current) => ({
          ...current,

          usedEquation:
            true,
        })
      );
    }
  }

  /*
  ANSWER
  */

  function chooseAnswer(
    answer
  ) {
    const existing =
      getQuestionProgress(
        question.id
      );

    /*
    If they already completed
    this question, let them replay
    without altering the original
    local analytics record.
    */

    if (
      !existing.completed
    ) {
      updateProgress(
        question.id,

        (current) => {

          const firstAnswer =
            current.attempts ===
            0;

          return {
            ...current,

            attempts:
              current.attempts +
              1,

            firstAttemptCorrect:
              firstAnswer
                ? answer.correct
                : current.firstAttemptCorrect,

            completed:
              answer.correct
                ? true
                : current.completed,

            wrongAnswers:
              answer.correct
                ? current.wrongAnswers
                : [
                    ...current.wrongAnswers,
                    answer.id,
                  ],
          };
        }
      );
    }

    setSelectedAnswer(
      answer
    );
  }

  /*
  TRY AGAIN
  */

  function tryAgain() {
    setSelectedAnswer(null);
  }

  /*
  NEXT
  */

  function goToNextQuestion() {
    if (
      isLastQuestion
    ) {
      goToQuestion(0);
    } else {
      goToQuestion(
        currentQuestionIndex +
          1
      );
    }
  }

  /*
  PREVIOUS
  */

  function goToPreviousQuestion() {
    if (
      currentQuestionIndex >
      0
    ) {
      goToQuestion(
        currentQuestionIndex -
          1
      );
    }
  }

  /*
  RESET LOCAL TEST DATA
  */

  function resetLocalProgress() {
    setProgress({});

    localStorage.removeItem(
      STORAGE_KEY
    );

    resetQuestionDisplay();
  }

  /*
  =========================================================
  INTRO PAGE
  =========================================================
  */

  if (!started) {
    return (
      <div className="introPage">

        <div className="introContent">

          {siteImages.introCapy ? (

            <img
              className="introCapyImage"
              src={
                siteImages.introCapy
              }
              alt="CapyPhysics capybara"
            />

          ) : (

            <div className="introCapy">
              🦫
            </div>

          )}

          <p className="introEyebrow">
            WELCOME TO
          </p>

          <h1 className="introTitle">
            CapyPhysics
          </h1>

          <p className="introTagline">
            See the physics first.
            Then understand the math.
          </p>

          <p className="introDescription">
            Physics is more than
            memorizing equations.
            CapyPhysics helps you build
            an intuitive picture of what
            is happening before you
            calculate it. Predict what
            happens visually, ask for
            help when you need it, and
            then connect your intuition
            to the mathematics.
          </p>

          <div className="introSteps">

            <div className="introStep">

              <div className="introStepNumber">
                1
              </div>

              <h2>
                Predict
              </h2>

              <p>
                Start with the picture.
                Decide what you think
                should happen before
                reading the full word
                problem.
              </p>

            </div>

            <div className="introStep">

              <div className="introStepNumber">
                2
              </div>

              <h2>
                Think
              </h2>

              <p>
                Reveal the wording or
                use a conceptual hint
                only when you need more
                information.
              </p>

            </div>

            <div className="introStep">

              <div className="introStepNumber">
                3
              </div>

              <h2>
                Connect
              </h2>

              <p>
                Finally, connect the
                visual idea to the
                mathematical equation
                that describes it.
              </p>

            </div>

          </div>

          <div className="introButtons">

            <button
              className="startButton"
              onClick={
                startExploring
              }
            >
              Start Exploring →
            </button>

            <button
              className="analyticsIntroButton"
              onClick={
                openAnalytics
              }
            >
              View Demo Analytics
            </button>

          </div>

          <p className="introNote">
            You don't need to know
            the equation before you
            begin. Start with what you
            think should happen.
          </p>

        </div>

      </div>
    );
  }

  /*
  =========================================================
  MAIN WEBSITE
  =========================================================
  */

  return (
    <div className="app">

      <Sidebar
        currentQuestionId={
          question.id
        }
        progress={
          progress
        }
        view={
          view
        }
        onQuestion={
          goToQuestionById
        }
        onAnalytics={
          openAnalytics
        }
        onHome={
          goHome
        }
      />

      {view ===
      "analytics" ? (

        <div className="analyticsContainer">

          <AnalyticsPage />

          <div className="resetArea">

            <button
              className="resetProgressButton"
              onClick={
                resetLocalProgress
              }
            >
              Reset my local test progress
            </button>

          </div>

        </div>

      ) : (

        <main className="main">

          {/* HEADER */}

          <div className="lessonHeader">

            <div>

              <p className="eyebrow">

                {
                  curriculum.find(
                    (topic) =>
                      topic.id ===
                      question.topicId
                  )?.label
                }

              </p>

              <h2>
                {
                  question.title
                }
              </h2>

            </div>

            <div className="headerNavigation">

              <button
                className="previousButton"
                onClick={
                  goToPreviousQuestion
                }
                disabled={
                  currentQuestionIndex ===
                  0
                }
              >
                ← Previous
              </button>

              <div className="progress">

                {
                  currentQuestionIndex +
                  1
                }

                {" / "}

                {
                  questions.length
                }

              </div>

            </div>

          </div>

          {/* QUESTION */}

          <section className="questionCard">

            <QuestionScene
              question={
                question
              }
            />

            {/* HIDDEN WORD PROBLEM */}

            <div className="wordProblemWrapper">

              <p
                className={`wordProblemText ${
                  showWordProblem
                    ? "revealed"
                    : "hiddenWords"
                }`}
              >
                {
                  question.wordProblem
                }
              </p>

              {!showWordProblem && (

                <div className="wordProblemCover">

                  <button
                    className="revealWordsButton"
                    onClick={
                      revealWordProblem
                    }
                  >

                    <span className="revealIcon">
                      ◉
                    </span>

                    Reveal word problem

                  </button>

                  <span className="visualFirstMessage">
                    Try to understand
                    the picture first
                  </span>

                </div>

              )}

            </div>

            <h3 className="questionPrompt">
              {question.prompt}
            </h3>

            {/* ANSWERS */}

            <div className="answers">

              {question.answers.map(
                (answer) => (

                  <button
                    key={
                      answer.id
                    }
                    className={`answerCard ${
                      selectedAnswer?.id ===
                      answer.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      chooseAnswer(
                        answer
                      )
                    }
                  >

                    <AnswerVisual
                      answer={
                        answer
                      }
                    />

                    <span className="answerLabel">
                      {
                        answer.label
                      }
                    </span>

                  </button>

                )
              )}

            </div>

            {/* FEEDBACK */}

            {selectedAnswer && (

              <div className="questionOverlay">

                {selectedAnswer.correct && (

                  <div className="confetti">

                    {Array.from({
                      length: 24,
                    }).map(
                      (
                        _,
                        index
                      ) => (

                        <span
                          key={
                            index
                          }
                          className={`confettiPiece confetti${
                            (index %
                              6) +
                            1
                          }`}
                          style={{
                            left: `${
                              2 +
                              index *
                                4.2
                            }%`,

                            animationDelay: `${
                              index *
                              0.07
                            }s`,
                          }}
                        ></span>

                      )
                    )}

                  </div>

                )}

                <div className="overlayPanel">

                  {selectedAnswer.correct ? (

                    siteImages.happyCapy ? (

                      <img
                        className="feedbackCapyImage"
                        src={
                          siteImages.happyCapy
                        }
                        alt="Happy Capy"
                      />

                    ) : (

                      <div className="feedbackCapy">
                        🦫 🎉
                      </div>

                    )

                  ) : (

                    siteImages.sadCapy ? (

                      <img
                        className="feedbackCapyImage"
                        src={
                          siteImages.sadCapy
                        }
                        alt="Sad Capy"
                      />

                    ) : (

                      <div className="feedbackCapy sadCapy">
                        🦫 🥺
                      </div>

                    )

                  )}

                  <h3 className="overlayTitle">

                    {selectedAnswer.correct
                      ? "Nice job!"
                      : "Not quite yet"}

                  </h3>

                  <p className="overlayText">
                    {
                      selectedAnswer.feedback
                    }
                  </p>

                  <button
                    className={`overlayButton ${
                      selectedAnswer.correct
                        ? "nextButton"
                        : "tryAgainButton"
                    }`}
                    onClick={
                      selectedAnswer.correct
                        ? goToNextQuestion
                        : tryAgain
                    }
                  >

                    {selectedAnswer.correct
                      ? isLastQuestion
                        ? "Review from Start ↺"
                        : "Next Question →"
                      : "Try Again"}

                  </button>

                </div>

              </div>

            )}

          </section>

          {/* HELP CARDS */}

          <div className="learningCards">

            {/* HINT */}

            <button
              className={`flipCard ${
                showHint
                  ? "flipped"
                  : ""
              }`}
              onClick={
                toggleHint
              }
            >

              {!showHint ? (

                <>

                  <span className="cardIcon">
                    ?
                  </span>

                  <strong>
                    Hint
                  </strong>

                  <span>
                    Flip card
                  </span>

                </>

              ) : (

                <>

                  <strong>
                    Think about this...
                  </strong>

                  <p>
                    {
                      question.hint
                    }
                  </p>

                </>

              )}

            </button>

            {/* EQUATION */}

            <button
              className={`flipCard ${
                showEquation
                  ? "flipped"
                  : ""
              }`}
              onClick={
                toggleEquation
              }
            >

              {!showEquation ? (

                <>

                  <span className="cardIcon">
                    ∑
                  </span>

                  <strong>
                    Equation
                  </strong>

                  <span>
                    Flip card
                  </span>

                </>

              ) : (

                <>

                  <strong>
                    The math behind it
                  </strong>

                  <p className="equation">
                    {
                      question.equation
                    }
                  </p>

                  <p>
                    {
                      question
                        .equationExplanation
                    }
                  </p>

                </>

              )}

            </button>

          </div>

        </main>
      )}

    </div>
  );
}

export default App;