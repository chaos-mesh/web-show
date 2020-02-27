import React from 'react';
import styled from 'styled-components';
import logo from '../icons/chaosmesh.png';

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
  background: (187, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(174, 248, 238, 1) 0%,
    rgba(174, 238, 255, 1) 50%,
    rgba(174, 238, 255, 1) 100%
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
    color: (106, 90, 205);
    font-weight: 400;
    margin: 0;
    padding: 0;
    margin-left: 20px;
    padding-bottom: 15px; /* align with bottom of Sandvine in Logo */
    align-self: flex-end;
  }
`;

const ImgType = styled.img`
  margin-left: 50px;
  height: 50px;
  width: 200px;
`;

const Banner = () => {
  return (
    <BannerStyles className="banner">
      <BannerSection className="banner-section banner-section-title">
        <BannerTitle className="banner-title">
            <ImgType src={logo} alt="Logo" />
          <h1 className="banner-title-text">Web Show</h1>
        </BannerTitle>
      </BannerSection>
    </BannerStyles>
  );
};

export default Banner;
