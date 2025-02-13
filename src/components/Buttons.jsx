import React from 'react';
import styled from 'styled-components';

const Buttons = (props) => {
  return (
    <StyledWrapper>
      <button> {props.text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
     --glow-color: rgb(211, 211, 211); /* Light Gray */
   --glow-spread-color: rgba(245, 245, 245, 0.78); /* White Smoke */
   --enhanced-glow-color: rgb(220, 220, 220); /* Gainsboro */
   --btn-color: rgb(240, 240, 240); /* Platinum */

   border: .25em solid var(--glow-color);
   padding: 1em 3em;
   color: black ;
   font-size: 15px;
   font-weight: bold;
   background-color: var(--btn-color);
   border-radius: 1em;
   outline: none;
   box-shadow: 0 0 1em .25em var(--glow-color),
          0 0 4em 1em var(--glow-spread-color),
          inset 0 0 .75em .25em var(--glow-color);
   text-shadow: 0 0 .5em var(--glow-color);
   position: relative;
   transition: all 0.3s;
  }

  button::after {
   pointer-events: none;
   content: "";
   position: absolute;
   top: 120%;
   left: 0;
   height: 100%;
   width: 100%;
   background-color: var(--glow-spread-color);
   filter: blur(2em);
   opacity: .7;
   transform: perspective(1.5em) rotateX(35deg) scale(1, .6);
  }

  button:hover {
   color: black bold;
   background-color: var(--glow-color);
   box-shadow: 0 0 1em .25em var(--glow-color),
          0 0 4em 2em var(--glow-spread-color),
          inset 0 0 .75em .25em var(--glow-color);
  }

  button:active {
   box-shadow: 0 0 0.6em .25em var(--glow-color),
          0 0 2.5em 2em var(--glow-spread-color),
          inset 0 0 .5em .25em var(--glow-color);
  }`;

export default Buttons;
