document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initCharts();
    
    // Sidebar toggle functionality
    const check = document.getElementById('check');
    const btnTwo = document.querySelector('.btn_two label');
    
    btnTwo.addEventListener('click', function() {
        document.querySelector('.sidebar_menu').classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('expanded');
    });
    
    // Notification dropdown
    const notifications = document.querySelector('.notifications');
    notifications.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    // Initialize tooltips
    initTooltips();
    
    // Simulate loading data
    simulateDataLoading();
});

function initCharts() {
    // Threat Activity Chart (Line Chart)
    const threatCtx = document.getElementById('threatActivityChart').getContext('2d');
    const threatChart = new Chart(threatCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Malware Attacks',
                data: [12, 19, 15, 27, 34, 28, 42, 38, 31, 25, 18, 22],
                borderColor: '#f72585',
                backgroundColor: 'rgba(247, 37, 133, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Unauthorized Access',
                data: [8, 12, 10, 18, 24, 20, 30, 26, 22, 16, 12, 15],
                borderColor: '#4895ef',
                backgroundColor: 'rgba(72, 149, 239, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Phishing Attempts',
                data: [5, 8, 6, 12, 18, 15, 22, 19, 14, 10, 7, 9],
                borderColor: '#4cc9f0',
                backgroundColor: 'rgba(76, 201, 240, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Incidents'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
    
    // System Health Chart (Doughnut Chart)
    const healthCtx = document.getElementById('systemHealthChart').getContext('2d');
    const healthChart = new Chart(healthCtx, {
        type: 'doughnut',
        data: {
            labels: ['Secure', 'Vulnerable', 'Critical'],
            datasets: [{
                data: [85, 10, 5],
                backgroundColor: [
                    '#4cc9f0',
                    '#f77f00',
                    '#f72585'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
    
    // Energy Distribution Chart (Bar Chart)
    const energyCtx = document.getElementById('energyDistributionChart').getContext('2d');
    const energyChart = new Chart(energyCtx, {
        type: 'bar',
        data: {
            labels: ['Residential', 'Commercial', 'Industrial', 'Public', 'Other'],
            datasets: [{
                label: 'Energy Distribution',
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.7)',
                    'rgba(72, 149, 239, 0.7)',
                    'rgba(76, 201, 240, 0.7)',
                    'rgba(63, 55, 201, 0.7)',
                    'rgba(27, 38, 59, 0.7)'
                ],
                borderColor: [
                    'rgba(67, 97, 238, 1)',
                    'rgba(72, 149, 239, 1)',
                    'rgba(76, 201, 240, 1)',
                    'rgba(63, 55, 201, 1)',
                    'rgba(27, 38, 59, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}% of total distribution`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Percentage'
                    }
                }
            }
        }
    });
}

function initTooltips() {
    // Initialize tooltips using Tippy.js or similar
    // This is a placeholder for actual tooltip implementation
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            
            this._tooltip = tooltip;
        });
        
        trigger.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

function simulateDataLoading() {
    // Simulate loading data for stat cards
    const statCards = document.querySelectorAll('.stat-card .value');
    statCards.forEach(card => {
        const target = parseInt(card.textContent);
        let current = 0;
        const increment = target / 20;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            card.textContent = Math.floor(current);
        }, 50);
    });
    
    // Simulate real-time updates
    setInterval(() => {
        const randomStat = document.querySelectorAll('.stat-card .value')[Math.floor(Math.random() * 4)];
        const current = parseInt(randomStat.textContent);
        const change = Math.floor(Math.random() * 10) - 3; // Random change between -3 and +6
        randomStat.textContent = Math.max(0, current + change);
    }, 5000);
}