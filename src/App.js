import React, { Component } from 'react';
import rotateIcon from './rotate-icon.svg';
import innerCircleIcon from './inner-circle.svg';
import outerCircleIcon from './outer-circle.svg';
import './App.css';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomColor = (min, max) => {
  min = min || 0;
  max = max || 255;
  return `rgb(${getRandomNumber(min, max)}, ${getRandomNumber(min, max)}, ${getRandomNumber(min, max)})`;
};

const getRandomGradient = angle => `
  linear-gradient(
    ${angle || getRandomNumber(0, 360)}deg, ${getRandomColor()}, ${getRandomColor()}
  )
`.trim();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotationDegree: 0,
      rotationIncrement: 1,
      gradient: getRandomGradient(),
      backgroundGradient: getRandomGradient(),
      isRotating: false,
      idCount: 1,
      innerZIndexCount: 99999999,
      outerZIndexCount: 99999998,
      innerDimension: 500,
      outerDimension: 500,
      circles: [
        {
          id: 1,
          dimension: 500,
          background: getRandomGradient(),
          zIndex: 99999999,
          rotation: 0,
        }
      ],
    };
  }

  incrementRotation = () => {
    this.setState((prevState) => {
      return {
        rotationDegree: prevState.rotationDegree + prevState.rotationIncrement,
      };
    })
  }

  addInnerCircle = () => {
    const circles = this.state.circles;
    const newId = this.state.idCount + 1
    const newDimension = this.state.innerDimension - 50;
    const newZIndex = this.state.innerZIndexCount + 1;

    console.log(`newZIndex:`, newZIndex);

    circles.push({
      id: newId,
      dimension: newDimension,
      background: getRandomGradient(),
      zIndex: newZIndex,
      rotation: 0,
    })

    this.setState({
      idCount: newId,
      innerZIndexCount: newZIndex,
      innerDimension: newDimension,
    });
  }

  addOuterCircle = () => {
    console.log(`addOuterCircle()`);
    const circles = this.state.circles;
    const newId = this.state.idCount + 1
    const newDimension = this.state.outerDimension + 50;
    const newZIndex = this.state.outerZIndexCount - 1;

    circles.push({
      id: newId,
      dimension: newDimension,
      background: getRandomGradient(),
      zIndex: newZIndex,
      rotation: 0,
    })

    this.setState({
      idCount: newId,
      outerZIndexCount: newZIndex,
      outerDimension: newDimension,
    });
  }

  rotateCircles = () => {
    const circles = this.state.circles;

    const rotatedCircles = circles.map((circle) => {
      circle.rotation = circle.rotation + this.state.rotationIncrement;
      return circle;
    })

    this.setState({ circles: rotatedCircles });
  }

  render() {
    return (
      // <div style={{ width: "500px", height: "500px" }} onClick={ () => console.log(111) }/>
      <div
      id="outer-circle-create"
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: this.state.backgroundGradient,
      }}>
        <img
        alt=""
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 999999999999,
          opacity: this.state.isRotating ? "1" : "0.3",
        }}
        src={ rotateIcon }
        onClick={ () => {
          if (!this.state.isRotating) {
            this.setState({
              interval: setInterval(this.rotateCircles, 4),
              isRotating: true,
            });
          } else {
            clearInterval(this.state.interval);

            this.setState({
              interval: null,
              isRotating: false,
            })
          }
        }}
        />

        <img
          alt=""
          style={{
            position: "absolute",
            top: "15px",
            zIndex: 999999999999,
            left: "60px",
          }}
          src={innerCircleIcon}
          onClick={ this.addInnerCircle }
        />

        <img
          alt=""
          style={{
            position: "absolute",
            top: "15px",
            zIndex: 999999999999,
            left: "110px",
          }}
          src={outerCircleIcon}
          onClick={this.addOuterCircle}
        />

        <div id="circle-container"
        className="circle-container">
          { this.state.circles.map((circle) => {
            return <div
            key={circle.id}
            id={ `circle-${ circle.id }` }
            style={{
              position: 'absolute',
              width: `${ circle.dimension }px`,
              height: `${circle.dimension}px`,
              zIndex: circle.zIndex,
              background: circle.background,
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              marginLeft: `-${circle.dimension / 2}px`,
              marginTop: `-${ circle.dimension / 2 }px`,
              transform: `rotate(${ circle.rotation }deg)`,
            }}
            />
          }) }
        </div>
      </div>
    );
  }
}

export default App;
