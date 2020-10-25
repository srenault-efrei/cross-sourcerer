import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts'



const Chart = () => {

    const options = {
        animationEnabled: false,
        exportEnabled: false,
        theme: "light1",
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [
                { y: 94, label: "javascript", color: "#FFD400" },
                { y: 3, label: "SQL", color: 'blakc' },
                { y: 3, label: "PL/pgSQL", color: "gray" },

            ]
        }]
    }

    return (
        <div style={{ width: "300px", margin: "auto" }} >
            <CanvasJSChart options={options} />
        </div>
    )
}

export default Chart