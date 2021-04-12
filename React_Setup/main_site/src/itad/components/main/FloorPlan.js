import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './css/floor_plan.css'
import floorPlanData from './data/map_data.json'


export class FloorPlan extends Component {

    constructor(props) {
        super(props);
        // Initiate state
        this.state = {
            rows: 100,
            cols: 100,
            grid: [],
        };
    }

    getRandomGrid() {

        var rowVal = Math.floor((Math.random() * this.state.rows));
        var colVal = Math.floor((Math.random() * this.state.cols));

        while (rowVal === 0 || rowVal === this.state.rows - 1) {
            rowVal = Math.floor((Math.random() * this.state.rows));
        }

        while (colVal === 0 || colVal === this.state.rows - 1) {
            colVal = Math.floor((Math.random() * this.state.cols));
        }

        return {
            row: Math.floor((Math.random() * this.state.rows)),
            col: Math.floor((Math.random() * this.state.cols))
        }
    }

    componentDidMount() {

        // Getting map data from local file
        var map1 = floorPlanData.maps[1]['mapData'];

        const robotLocation = this.getRandomGrid();

        const grid = [];
        for (let row = 0; row < this.state.rows; row++) {

            for (let col = 0; col < this.state.cols; col++) {

                // Setting wall attribute
                var isWall = false;

                if (map1[row][col] === 1) {
                    isWall = true;
                }

                // Setting robot attribute
                var isRobot = false;

                if (robotLocation.row === row && robotLocation.col === col) {
                    isRobot = true;
                } else if (robotLocation.row === row - 1 && robotLocation.col === col) {
                    isRobot = true;
                } else if (robotLocation.row === row - 1 && robotLocation.col === col - 1) {
                    isRobot = true;
                } else if (robotLocation.row === row && robotLocation.col === col - 1) {
                    isRobot = true;
                } else if (robotLocation.row === row + 1 && robotLocation.col === col) {
                    isRobot = true;
                } else if (robotLocation.row === row + 1 && robotLocation.col === col + 1) {
                    isRobot = true;
                } else if (robotLocation.row === row && robotLocation.col === col + 1) {
                    isRobot = true;
                } else if (robotLocation.row === row + 1 && robotLocation.col === col - 1) {
                    isRobot = true;
                } else if (robotLocation.row === row - 1 && robotLocation.col === col + 1) {
                    isRobot = true;
                }

                grid.push({
                    row,
                    col,
                    isWall,
                    isRobot
                })

            }

        }
        this.setState({ grid: grid })
    }

    render() {

        const gridItems = this.state.grid.map((grid) => {
            return <div
                key={grid.row.toString() + '-' + grid.col.toString()} 
                className={
                    grid.isRobot
                    ? 'gridItem isRobot' : grid.isWall
                    ? 'gridItem isWall' : 'gridItem'
                } ></div>
        })

        return (
            
            <div className="floorplanContainer">

                <div className="grid">{gridItems}</div>

            </div>
            
        );
    }
}


export default withRouter(FloorPlan);
