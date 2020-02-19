import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../icons/sandvine-logo.svg';
import { ReactComponent as Bell } from '../icons/bell-solid.svg';
import { ReactComponent as Cog } from '../icons/cog-solid.svg';
import { ReactComponent as Question } from '../icons/question-circle-solid.svg';
import { ReactComponent as Bars } from '../icons/bars.svg';

interface IBannerSectionProps {
  width: string | number;
}

interface IIconSectionProps {
  height?: string;
  alignCenter?: boolean;
  color?: string;
}
export const IconSection = styled.div<IIconSectionProps>`
  margin-left: auto;
  margin-right: 40px;
  display: flex;
  height: ${props => (props.height ? props.height : '30%')};
  width: 100%;
  stroke-width: 20;
  justify-content: flex-end;

  ${props => (props.alignCenter ? `align-items: center;` : '')}

  .badge {
    position: absolute;
    background: red;
    color: white;
    border: 1px solid white;
    border-radius: 50%;
    top: 9px;
    right: 0px;
    font-size: 12px;
    padding: 0px 3px 0px 1px;
  }
  .icon-button {
    margin-left: 10px;
    margin-right: 10px;
    stroke: ${props => (props.color ? props.color : 'white')};
    cursor: pointer;
  }
  .no-fill {
    path {
      fill: none;
    }
    :hover {
      path {
        fill: ${props => (props.color ? props.color : 'white')};
      }
    }
  }

  .fill {
    path {
      fill: ${props => (props.color ? props.color : 'white')};
    }
    :hover {
      path {
        fill: none;
      }
    }
  }
`;
const BannerStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 75px;
  width: 100%;
  background: rgb(64, 67, 66);
  background: linear-gradient(
    90deg,
    rgba(64, 67, 66, 1) 0%,
    rgba(83, 84, 85, 1) 50%,
    rgba(99, 100, 100, 1) 100%
  );
`;

const BannerSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`;

const BannerTitle = styled.div`
  display: flex;
  height: 70%;
  margin-left: 20px;
  h1 {
    font-size: 14px;
    color: white;
    font-weight: 400;
    margin: 0;
    padding: 0;
    margin-left: 20px;
    padding-bottom: 15px; /* align with bottom of Sandvine in Logo */
    align-self: flex-end;
  }
`;

const Banner = () => {
  return (
    <BannerStyles className="banner">
      <BannerSection className="banner-section banner-section-title">
        <BannerTitle className="banner-title">
          <Logo className="logo" height="100%" fill="white"></Logo>
          <h1 className="banner-title-text">Web Show</h1>
        </BannerTitle>
      </BannerSection>
      <BannerSection className="banner-section banner-section-actions">
        <IconSection className="icon-section">
          <div
            style={{
              position: 'relative',
              paddingRight: '20px'
            }}
          >
            <Bell className="bell icon-button no-fill" height="100%"></Bell>
            <span className="badge">14</span>
          </div>
          <Cog className="cog icon-button no-fill" height="100%"></Cog>
          <Question
            className="question icon-button no-fill"
            height="100%"
          ></Question>
          <Bars
            className="bars icon-button icon-button-filled fill"
            height="100%"
          ></Bars>
        </IconSection>
      </BannerSection>
    </BannerStyles>
  );
};

export default Banner;
