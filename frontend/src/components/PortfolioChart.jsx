import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioChart = ({ assets }) => {
    const data = {
        labels: assets.map(a => a.coin.toUpperCase()),
        datasets: [
            {
                label: 'Portfolio Value ($)',
                data: assets.map(a => a.amount * a.buyPrice),
                backgroundColor: [
                    '#a855f7', // Purple
                    '#ec4899', // Pink
                    '#3b82f6', // Blue
                    '#14b8a6', // Teal
                    '#f59e0b', // Amber
                    '#6366f1', // Indigo
                ],
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: '#fff',
                    font: { family: 'Inter' }
                },
                position: 'bottom',
            },
            tooltip: {
                backgroundColor: 'rgba(26, 11, 46, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
            }
        },
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
    };

    if (assets.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                No data to display
            </div>
        );
    }

    return (
        <div style={{ height: '300px', position: 'relative' }}>
            <Doughnut data={data} options={options} />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -60%)',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <small className="text-white-50">Total</small>
                <h5 className="text-white fw-bold mb-0">
                    ${assets.reduce((acc, curr) => acc + (curr.amount * curr.buyPrice), 0).toFixed(0)}
                </h5>
            </div>
        </div>
    );
};

export default PortfolioChart;
