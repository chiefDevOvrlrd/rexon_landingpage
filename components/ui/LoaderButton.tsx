
import React from 'react';
import styled from 'styled-components';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> 

const LoaderButton = ({...props} : ButtonProps) => {
    return (
        <StyledWrapper>
            <button {...props}  className='loader'>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    button{
        width:13.5em;
        height: 2.7em;
        cursor: not-allowed;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 1px #000000ff;
        background-color: #000;
        padding: 20px;
    }
    
    .loader {

        display: inline-flex;
        gap: 5px;
    }
    .loader:before,
    .loader:after {
        content: "";
        width: 25px;
        aspect-ratio: 1;
        box-shadow: 0 0 0 3px inset #fff;
        animation: 2s infinite linear;
        animation-name: l3-1,l3-2;
        animation-delay: -1s,0s
    }
    .loader:after {
        --s: -1;
    }
    @keyframes l3-1 {
        0%   {border-radius:50% 0   0   50%}
        25%  {border-radius:50% 50% 0   0  }
        50%  {border-radius:0   50% 50% 0  }
        75%  {border-radius:0   0   50% 50%}
        100% {border-radius:50% 0   0   50%}
    }
    @keyframes l3-2{
        0%   {transform:scaleX(var(--s,1)) rotate(0deg)}
        100% {transform:scaleX(var(--s,1)) rotate(-360deg)}
    }
    `
;

export default LoaderButton;
