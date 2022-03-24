import styled from "styled-components";

const DynamicBtn = styled.button.attrs(props => ({
	disabled: props.disabled,
	onClick: props.onClick
}))`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 5px;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #fbc98f;
  color: #fff;
  position: relative;
  cursor: pointer;
  transition: width 0.3s ease-in;
  &:disabled {
  cursor: not-allowed;
  }
  &:before {
    content: "";
    position: absolute;
    left: 1px;
    top: 0;
    width: ${props => props.progress};
    height: 100%;
    background-color: #f7941e;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: ${props =>
	props.progress === "100%" ? "4px" : "0px"};
    border-bottom-right-radius: ${props =>
	props.progress === "100%" ? "4px" : "0px"};
      transition: width 0.3s ease-in;
    z-index: 0;
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 50;
    width: 100%;
    font-size: ${props => props.fontSize || '14px'};
    line-height: 20px;
    font-weight: bold;
    transform: translate(-50%, -50%);
  }
	@media (max-width: 1259px) {
		height: 41px;
	}
`;

export default DynamicBtn;