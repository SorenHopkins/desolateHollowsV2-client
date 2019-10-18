import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Intro = () => {
  const [intro, setIntro] = useState({
    currentSection: 0
  })

  if (intro.currentSection === 0) {
    return (<section key="0">
      <h4>You stumble through the <a href="#/intro" id="1" onClick={() => setIntro({ currentSection: 1 })}>woods.</a></h4>
    </section>)
  } else if (intro.currentSection === 1) {
    return (<section key="1">
      <p>It’s dark. You can hear the cry of the owls in the trees. In the distance a wolf howls. You know where you’re <a href="#/intro" onClick={() => setIntro({ currentSection: 2 })}>going.</a></p>
    </section>)
  } else if (intro.currentSection === 2) {
    return (<section key="2">
      <p>Dry branches block your path, scratch your skin. Leaves crunch under your feet. Too loud.</p>
      <p>If only the snow would fall faster. Maybe that would disguise the sound. The howls of the wolves are getting <a href="#/intro" onClick={() => setIntro({ currentSection: 3 })}>closer.</a></p>
    </section>)
  } else if (intro.currentSection === 3) {
    return (<section key="3">
      <p>You can <a href="#/intro" id="3" onClick={() => setIntro({ currentSection: 4 })}>smell</a> it now. </p>
    </section>)
  } else if (intro.currentSection === 4) {
    return (<section key="4">
      <p>You push past the branches into the clearing. Ahead of you: a huge tree. Old, dead, hollowed out. A misshapen <a href="#/intro" onClick={() => setIntro({ currentSection: 5 })}>door</a> affixed to a misshapen opening.</p>
    </section>)
  } else if (intro.currentSection === 5) {
    return (<section key="5">
      <p>It doesn’t budge. You pull again. Still, nothing. You remind the door that you are a very powerful <a href="#/intro" onClick={() => setIntro({ currentSection: 6 })}>witch</a>, and it ought to let you through. A moment. It opens.</p>
    </section>)
  } else if (intro.currentSection === 6) {
    return (<section key="6">
      <p>It’s warm. You slam the door shut in front of you. In the center of the room a cauldron bubbles, wafting a scent of pumpkin and cinnamon. The last witch must have been cooking. All along the walls, dozens of vials of <a href="#/intro" onClick={() => setIntro({ currentSection: 7 })}>ingredients</a> are arrayed: bats wings, newts eyes, holy water…</p>
    </section>)
  } else if (intro.currentSection === 7) {
    return (<section key="7">
      <p>But no unicorn horn. Over half the ingredients are missing. The last witch wasn’t as diligent as she ought to have been. You’ll have to get to work right away. You can’t afford to leave this place a mess. But first, there’s a cot in the corner. You need some rest. You can start work <Link to="/">tomorrow.</Link></p>
    </section>)
  }
}

export default Intro
